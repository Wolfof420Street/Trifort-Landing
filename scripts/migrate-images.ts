// @ts-nocheck
import { db } from '@/db';
import { projects, projectImages } from '@/db/schema';
import { eq, ilike } from 'drizzle-orm';
import { processImage } from '@/lib/images';
import fs from 'fs/promises';
import path from 'path';

const mappings = [
  { file: 'kahoffee_cafe.png', client: 'samuel kithinji' },
  { file: 'pharmacy.png', client: 'EastPack Logistics' },
  { file: 'electronics2.png', client: 'Apex electronics Group' },
  { file: 'kahoffee4.png', client: 'Heights Properties Ltd' },
  { file: 'pharmacy1.png', client: 'Uganda Retail Holdings' },
  { file: 'grand_liqour_1.png', client: 'Grand liqour' },
  { file: 'grand_liqour_3.png', client: 'Private Client' },
];

async function main() {
  console.log("Starting image migration...");

  for (const m of mappings) {
    const project = await db.query.projects.findFirst({
      where: ilike(projects.title, `%${m.client}%`),
    });

    if (!project) {
      console.log(`Could not find project for client: ${m.client}`);
      continue;
    }

    const imgPath = path.join(process.cwd(), 'legacy', 'construction-website', 'frontend', 'images', m.file);
    try {
      const buffer = await fs.readFile(imgPath);
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects', project.id);
      const filenameBase = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      
      await processImage(buffer, uploadDir, filenameBase);

      const relativeWebp = `/uploads/projects/${project.id}/${filenameBase}.webp`;
      const relativeAvif = `/uploads/projects/${project.id}/${filenameBase}.avif`;
      const relativeThumb = `/uploads/projects/${project.id}/${filenameBase}-thumb.webp`;

      await db.insert(projectImages).values({
        projectId: project.id,
        originalUrl: relativeWebp,
        webpUrl: relativeWebp,
        avifUrl: relativeAvif,
        thumbnailUrl: relativeThumb,
        altText: `Legacy image for ${project.title}`,
        sortOrder: 0,
      });

      console.log(`Migrated ${m.file} for project: ${project.title}`);
    } catch (err) {
      console.error(`Error migrating ${m.file}:`, err);
    }
  }

  console.log("Migration complete.");
}

main().catch(console.error);
