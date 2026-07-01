import { db } from "../src/db";
import { projects, projectImages } from "../src/db/schema";
import { inArray } from "drizzle-orm";

async function main() {
  console.log("Cleaning up fake Unsplash projects...");

  // 1. Delete the fake projects (their images will cascade delete automatically)
  const fakeSlugs = ["modern-family-home-runda", "nairobi-commercial-plaza"];
  await db.delete(projects).where(inArray(projects.slug, fakeSlugs));

  console.log("Seeding real projects...");

  // 2. Define projects
  const seedProjects = [
    {
      slug: "kileleshwa-kahoffee-cafe",
      title: "Kileleshwa Kahoffee Cafe",
      status: "completed" as const,
      category: "Commercial",
      location: "Kileleshwa, Nairobi",
      completionDate: "2021-01-01",
      description: "Client: Samuel Kithinji | Value: KSh 1M\n\nA high-turnover commercial café fit-out designed for efficiency and modern aesthetic. Delivered on time with full cost transparency.",
      videoUrl: null
    },
    {
      slug: "athi-river-pharmacy",
      title: "Athi River Pharmacy",
      status: "completed" as const,
      category: "Commercial",
      location: "Athi River, Machakos",
      completionDate: "2022-01-01",
      description: "Client: EastPack Logistics | Value: KSh 6M\n\nFull pharmacy unit construction and fit-out to regulatory standards. Delivered to specification with full documentation.",
      videoUrl: null
    },
    {
      slug: "upperhill-electronics-plaza",
      title: "Upperhill Electronics Business Plaza",
      status: "ongoing" as const,
      category: "Commercial",
      location: "Upperhill, Nairobi",
      completionDate: "2026-01-01",
      description: "Client: Apex Electronics Group | Value: KSh 2.1M\n\nPremium electronics retail plaza specialising in curated technology solutions and smart devices. Currently in superstructure phase.",
      videoUrl: null
    },
    {
      slug: "kahoffee-cafe-phase-2",
      title: "Kahoffee Cafe Phase 2",
      status: "completed" as const,
      category: "Commercial",
      location: "Kileleshwa, Nairobi",
      completionDate: "2026-01-01",
      description: "Client: Heights Properties Ltd | Value: KSh 1.4M\n\n7-unit mid-rise commercial development with rooftop garden terrace. Foundation and fit-out completed to an exacting standard.",
      videoUrl: null
    },
    {
      slug: "kampala-pharmacy-uganda",
      title: "Kampala Pharmacy Uganda",
      status: "completed" as const,
      category: "Commercial",
      location: "Kampala, Uganda",
      completionDate: "2023-01-01",
      description: "Client: Uganda Retail Holdings | Value: KSh 500K\n\nTRI-FORT's first cross-border project — a full pharmacy build in central Kampala establishing our regional East African network.",
      videoUrl: null
    },
    {
      slug: "dar-es-salaam-grand-liquor",
      title: "Dar es Salaam Grand Liquor Shop",
      status: "completed" as const,
      category: "Commercial",
      location: "Dar es Salaam, Tanzania",
      completionDate: "2024-01-01",
      description: "Client: Grand Liquor | Value: KSh 1.2M\n\nA luxuriously modern liquor retail shop with spacious interior, premium finishes, and contemporary amenities.",
      videoUrl: null
    },
    {
      slug: "ngong-optics",
      title: "Ngong Optics",
      status: "completed" as const,
      category: "Commercial",
      location: "Ngong, Kajiado",
      completionDate: "2024-01-01",
      description: "Client: Private Client | Value: KSh 1M\n\nStone and timber vernacular optical shop construction. A technically demanding build finished to an uncompromising standard.",
      videoUrl: null
    }
  ];

  // 3. Insert Projects
  for (const p of seedProjects) {
    await db.insert(projects).values(p).onConflictDoNothing({ target: projects.slug });
  }

  // 4. Fetch all projects to map slugs to UUIDs
  const allProjects = await db.select().from(projects);
  const projectMap = new Map(allProjects.map(p => [p.slug, p.id]));

  // 5. Define Images (mapped to slugs)
  const seedImages = [
    { slug: "kileleshwa-kahoffee-cafe", file: "/uploads/projects/kileleshwa/1782718194045-144969116" },
    { slug: "athi-river-pharmacy", file: "/uploads/projects/athi-river/1782718090779-479384101" },
    { slug: "athi-river-pharmacy", file: "/uploads/projects/athi-river/1782718199258-397597684" },
    { slug: "upperhill-electronics-plaza", file: "/uploads/projects/upperhill/1782718097849-350221874" },
    { slug: "upperhill-electronics-plaza", file: "/uploads/projects/upperhill/1782718205705-37938510" },
    { slug: "kahoffee-cafe-phase-2", file: "/uploads/projects/kahohe/1782718107376-643559638" },
    { slug: "kahoffee-cafe-phase-2", file: "/uploads/projects/kahohe/1782718213938-40567326" },
    { slug: "kampala-pharmacy-uganda", file: "/uploads/projects/pharmacy/1782718119290-287076438" },
    { slug: "kampala-pharmacy-uganda", file: "/uploads/projects/pharmacy/1782718225814-638020352" },
    { slug: "dar-es-salaam-grand-liquor", file: "/uploads/projects/dar/1782718234084-438078743" },
    { slug: "ngong-optics", file: "/uploads/projects/ngong/1782718241086-465622859" }
  ];

  // 6. Wipe existing images for seeded projects to prevent duplication, then re-insert
  for (const slug of seedProjects.map(p => p.slug)) {
      const pid = projectMap.get(slug);
      if(pid) {
          await db.delete(projectImages).where(inArray(projectImages.projectId, [pid]));
      }
  }

  // 7. Insert Images
  const slugCounts: Record<string, number> = {};
  
  for (const img of seedImages) {
    const projectId = projectMap.get(img.slug);
    if (!projectId) continue;

    if (slugCounts[img.slug] === undefined) {
      slugCounts[img.slug] = 0;
    }

    await db.insert(projectImages).values({
      projectId,
      originalUrl: `${img.file}.webp`,
      webpUrl: `${img.file}.webp`,
      avifUrl: `${img.file}.avif`,
      thumbnailUrl: `${img.file}-thumb.webp`,
      altText: `Project image for ${img.slug}`,
      sortOrder: slugCounts[img.slug]
    });
    
    slugCounts[img.slug]++;
  }

  console.log("Seeding complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
