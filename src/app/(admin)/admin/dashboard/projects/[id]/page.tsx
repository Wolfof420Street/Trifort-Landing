import { db } from '@/db';
import { projects, projectImages } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import EditProjectForm from './edit-form';

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, params.id),
    with: {
      images: {
        orderBy: [asc(projectImages.sortOrder)],
      }
    }
  });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <EditProjectForm project={project} initialImages={project.images} />
    </div>
  );
}
