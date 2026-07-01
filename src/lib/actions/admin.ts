'use server';

import { db } from '@/db';
import { contacts, quotes, subcontractors, reviews, projects, projectImages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// Reusable auth check for all admin actions
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
}

function formatYouTubeUrl(url: string | null | undefined): string | null {
  if (!url || !url.trim()) return null;
  const trimmed = url.trim();
  
  // If already an embed, pass through
  if (trimmed.startsWith('https://www.youtube.com/embed/')) {
    return trimmed;
  }
  
  // Match youtube.com/watch?v=ID or youtu.be/ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  
  throw new Error("Invalid YouTube URL. Please provide a valid youtube.com/watch or youtu.be link.");
}

export async function toggleContactStatus(id: string, newStatus: 'new' | 'read' | 'replied') {
  await requireAdmin();
  await db.update(contacts).set({ status: newStatus }).where(eq(contacts.id, id));
  revalidatePath('/admin/dashboard/contacts');
}

export async function toggleQuoteStatus(id: string, newStatus: 'new' | 'reviewed' | 'contacted') {
  await requireAdmin();
  await db.update(quotes).set({ status: newStatus }).where(eq(quotes.id, id));
  revalidatePath('/admin/dashboard/quotes');
}

export async function toggleSubcontractorStatus(id: string, newStatus: 'pending' | 'approved' | 'rejected') {
  await requireAdmin();
  await db.update(subcontractors).set({ status: newStatus }).where(eq(subcontractors.id, id));
  revalidatePath('/admin/dashboard/subcontractors');
}

export async function toggleReviewStatus(id: string, newStatus: 'pending' | 'published' | 'rejected') {
  await requireAdmin();
  await db.update(reviews).set({ status: newStatus }).where(eq(reviews.id, id));
  // A review toggle affects the public reviews page
  revalidatePath('/reviews');
  revalidatePath('/admin/dashboard/reviews');
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath('/projects');
  revalidatePath('/admin/dashboard/projects');
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const location = formData.get('location') as string;
  const status = formData.get('status') as any;

  if (!title || !slug || !description || !category) {
    throw new Error('Missing required fields');
  }

  const [inserted] = await db.insert(projects).values({
    title,
    slug,
    description,
    category,
    location,
    status,
  }).returning();

  revalidatePath('/projects');
  return inserted;
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const location = formData.get('location') as string;
  const status = formData.get('status') as any;
  const rawVideoUrl = formData.get('videoUrl') as string | null;

  if (!title || !slug || !description || !category) {
    throw new Error('Missing required fields');
  }

  const videoUrl = formatYouTubeUrl(rawVideoUrl);

  await db.update(projects).set({
    title,
    slug,
    description,
    category,
    location,
    status,
    videoUrl,
  }).where(eq(projects.id, id));

  revalidatePath('/projects');
  revalidatePath(`/admin/dashboard/projects/${id}`);
  revalidatePath('/admin/dashboard/projects');
}

export async function deleteProjectImage(imageId: string) {
  await requireAdmin();
  
  // We need the projectId to revalidate paths
  const image = await db.query.projectImages.findFirst({
    where: (img, { eq }) => eq(img.id, imageId)
  });

  if (!image) return;

  await db.delete(projectImages).where(eq(projectImages.id, imageId));
  
  // Note: For a robust system we would also delete the files from disk here.
  // But for the scope of project parity, updating the DB is the core requirement.
  
  revalidatePath('/projects');
  revalidatePath(`/admin/dashboard/projects/${image.projectId}`);
}
