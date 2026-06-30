import { db } from "../src/db";
import { projects, projectImages, reviews } from "../src/db/schema";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Seeding test projects and reviews...");

  // Insert Projects
  const [p1] = await db.insert(projects).values({
    title: "Modern Family Home in Runda",
    slug: "modern-family-home-runda",
    description: "A beautiful 5-bedroom luxury home with modern finishes and open-plan design.",
    category: "Residential",
    location: "Runda, Nairobi",
    status: "completed",
    completionDate: "2025-10-15",
  })
  .onConflictDoUpdate({
    target: projects.slug,
    set: { title: sql`EXCLUDED.title`, description: sql`EXCLUDED.description`, category: sql`EXCLUDED.category`, location: sql`EXCLUDED.location`, status: sql`EXCLUDED.status` }
  })
  .returning();

  const [p2] = await db.insert(projects).values({
    title: "Nairobi Commercial Plaza",
    slug: "nairobi-commercial-plaza",
    description: "A 10-story mixed-use commercial building with retail and office spaces.",
    category: "Commercial",
    location: "Westlands, Nairobi",
    status: "ongoing",
  })
  .onConflictDoUpdate({
    target: projects.slug,
    set: { title: sql`EXCLUDED.title`, description: sql`EXCLUDED.description`, category: sql`EXCLUDED.category`, location: sql`EXCLUDED.location`, status: sql`EXCLUDED.status` }
  })
  .returning();

  // Insert Project Images
  await db.insert(projectImages).values([
    {
      projectId: p1.id,
      originalUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      altText: "Front view of Modern Family Home",
      sortOrder: 0,
    },
    {
      projectId: p2.id,
      originalUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      altText: "Nairobi Commercial Plaza Exterior",
      sortOrder: 0,
    }
  ]);

  // Insert Reviews
  await db.insert(reviews).values([
    {
      name: "John Doe",
      email: "john@example.com",
      rating: 5,
      title: "Excellent Work!",
      message: "Trifort exceeded our expectations. The house was delivered on time and within budget.",
      projectType: "Residential",
      status: "published",
      verified: true,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      rating: 4,
      title: "Great communication",
      message: "Very professional team. Would recommend.",
      projectType: "Commercial",
      status: "pending",
      verified: false,
    }
  ]);

  console.log("Seeding complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
