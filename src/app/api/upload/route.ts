import { NextResponse } from 'next/server';
import { db } from '@/db';
import { projectImages, projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { processImage } from '@/lib/images';



const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    // 1. Auth Check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Rate Limiting (reusing existing pattern)
    // Next.js App Router Request doesn't have direct IP easily, checking headers
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success } = await checkRateLimit({ ip, action: 'image_upload', maxAttempts: 50, lockoutMinutes: 60 });
    if (!success) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // 3. Body Parsing & Max File Size
    // Check Content-Length first
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    const altText = formData.get('altText') as string;

    if (!file || !projectId || !altText) {
      return NextResponse.json({ error: 'Missing required fields (file, projectId, altText)' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 });
    }

    // Check project exists
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 4. Magic Byte Check via file-type
    const fileType = await import('file-type');
    const ftAny = fileType as any;
    const fileTypeFromBuffer = ftAny.fileTypeFromBuffer || ftAny.default?.fileTypeFromBuffer || ftAny.default?.fromBuffer || ftAny.fromBuffer;
    
    if (!fileTypeFromBuffer) {
       console.error("fileTypeFromBuffer not found in:", fileType);
       return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const type = await fileTypeFromBuffer(buffer);

    // Hard reject if not a recognized safe image format
    if (!type || !['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic'].includes(type.mime)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP, and AVIF are allowed.' }, { status: 415 });
    }

    // 5. Image Processing with Sharp
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects', projectId);
    const filenameBase = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    
    await processImage(buffer, uploadDir, filenameBase);

    // 6. DB Insertion
    const relativeWebp = `/uploads/projects/${projectId}/${filenameBase}.webp`;
    const relativeAvif = `/uploads/projects/${projectId}/${filenameBase}.avif`;
    const relativeThumb = `/uploads/projects/${projectId}/${filenameBase}-thumb.webp`;

    // get current max sortOrder
    const existingImages = await db.query.projectImages.findMany({
      where: eq(projectImages.projectId, projectId),
    });
    const maxSort = existingImages.reduce((max, img) => Math.max(max, img.sortOrder), -1);

    const [inserted] = await db.insert(projectImages).values({
      projectId,
      // INTENTIONAL: The true original file is intentionally discarded for security reasons.
      // We store the WebP processed version as the base "originalUrl" to satisfy the DB schema
      // while guaranteeing that no raw user payload is ever preserved on disk.
      originalUrl: relativeWebp,
      webpUrl: relativeWebp,
      avifUrl: relativeAvif,
      thumbnailUrl: relativeThumb,
      altText,
      sortOrder: maxSort + 1,
    }).returning();

    return NextResponse.json({ success: true, image: inserted });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
