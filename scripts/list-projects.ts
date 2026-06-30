import { db } from '@/db';
import { projects } from '@/db/schema';

async function main() {
  const allProjects = await db.select({ id: projects.id, title: projects.title }).from(projects);
  console.log(JSON.stringify(allProjects, null, 2));
}

main().catch(console.error);
