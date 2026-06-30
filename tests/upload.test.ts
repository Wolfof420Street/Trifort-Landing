import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import sharp from 'sharp';
import { eq } from 'drizzle-orm';
import { POST } from '@/app/api/upload/route';
import { db } from '@/db';
import { projects, projectImages } from '@/db/schema';
import * as auth from '@/lib/auth';
import * as rateLimit from '@/lib/rate-limit';
import fs from 'fs/promises';
import path from 'path';

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  verifyToken: vi.fn(),
  getCurrentUser: vi.fn(),
}));

vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn(),
}));

describe('Upload API', () => {
  let projectId: string;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Setup authenticated user
    (auth.getCurrentUser as any).mockResolvedValue({ id: 'user-1', role: 'admin', name: 'Admin', type: 'access' });
    (rateLimit.checkRateLimit as any).mockResolvedValue({ success: true });

    // Create a dummy project for the test
    const randomSlug = `test-upload-project-${Date.now()}`;
    const [inserted] = await db.insert(projects).values({
      title: 'Test Upload Project',
      slug: randomSlug,
      description: 'Upload test',
      category: 'Residential',
    }).returning();
    projectId = inserted.id;
  });

  afterEach(async () => {
    if (projectId) {
      await db.delete(projects).where(eq(projects.id, projectId));
    }
  });

  it('rejects files with invalid magic bytes (415)', async () => {
    // Create a fake file that claims to be a JPEG but is actually text
    const textBytes = new TextEncoder().encode('Not an image file, maybe an exploit script');
    const blob = new Blob([textBytes], { type: 'image/jpeg' });
    
    const formData = new FormData();
    formData.append('file', blob, 'fake.jpg');
    formData.append('projectId', projectId);
    formData.append('altText', 'Test fake image');

    const req = new Request('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    });

    const res = await POST(req);
    expect(res.status).toBe(415);
    const data = await res.json();
    expect(data.error).toMatch(/Invalid file type/);
  });

  it('rejects unauthenticated uploads (401)', async () => {
    (auth.getCurrentUser as any).mockResolvedValue(null);
    const req = new Request('http://localhost/api/upload', { method: 'POST' });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('rejects oversized uploads (413)', async () => {
    const req = new Request('http://localhost/api/upload', { 
      method: 'POST',
      headers: new Headers({ 'content-length': (11 * 1024 * 1024).toString() })
    });
    const res = await POST(req);
    expect(res.status).toBe(413);
  });

  it('enforces rate limiting (429)', async () => {
    (rateLimit.checkRateLimit as any).mockResolvedValue({ success: false });
    const req = new Request('http://localhost/api/upload', { method: 'POST' });
    const res = await POST(req);
    expect(res.status).toBe(429);
  });

  it('processes a valid image and validates generated metadata', async () => {
    // 1x1 transparent PNG:
    const pngHex = "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082";
    const pngBuffer = Buffer.from(pngHex, 'hex');
    const blob = new Blob([pngBuffer], { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', blob, 'real.png');
    formData.append('projectId', projectId);
    formData.append('altText', 'Valid image');

    const req = new Request('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    
    expect(data.success).toBe(true);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects', projectId);
    const webpFilename = data.image.webpUrl.split('/').pop();
    const avifFilename = data.image.avifUrl.split('/').pop();
    const thumbFilename = data.image.thumbnailUrl.split('/').pop();

    const webpPath = path.join(uploadDir, webpFilename);
    const avifPath = path.join(uploadDir, avifFilename);
    const thumbPath = path.join(uploadDir, thumbFilename);

    // Validate actual metadata with sharp
    const webpMeta = await sharp(webpPath).metadata();
    expect(webpMeta.format).toBe('webp');
    expect(webpMeta.width).toBe(1);

    const avifMeta = await sharp(avifPath).metadata();
    expect(avifMeta.format).toBe('heif'); // sharp identifies avif under heif family
    expect(avifMeta.width).toBe(1);

    const thumbMeta = await sharp(thumbPath).metadata();
    expect(thumbMeta.format).toBe('webp');
    // Thumbnail was resized with fit: 'cover', given 1x1 it might stretch or scale.
    // We just verify it successfully reads as an image.
    expect(thumbMeta.width).toBeDefined();

    // Clean up files
    await fs.rm(uploadDir, { recursive: true, force: true });
  });
});
