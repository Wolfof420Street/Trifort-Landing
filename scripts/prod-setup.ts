import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as bcrypt from "bcrypt";
import { db } from "../src/db";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";
// @ts-ignore
import { seedProjects } from "./seed-projects"; // Export it or run it inline

async function run() {
  console.log("Starting production setup...");
  
  let url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is missing");
  }

  // Safely rewrite URL to connect directly to the raw Postgres container, bypassing PgBouncer.
  // PgBouncer drops Drizzle's migration statements when running in transaction mode.
  try {
    const parsed = new URL(url);
    parsed.hostname = "postgres";
    parsed.port = "5432";
    url = parsed.toString();
    console.log("Bypassing PgBouncer: Connecting directly to Postgres instance for migrations.");
  } catch (e) {
    console.log("Failed to parse DATABASE_URL, using as-is.");
  }

  console.log("Applying migrations...");
  const migrationClient = postgres(url, { max: 1 });
  const migrationDb = drizzle(migrationClient);
  await migrate(migrationDb, { migrationsFolder: "./drizzle" });
  await migrationClient.end();
  console.log("✅ Migrations applied successfully!");

  console.log("Seeding admin user...");
  const adminEmail = process.env.ADMIN_EMAIL || "customer.care@trifort.site";
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.warn("⚠️ ADMIN_PASSWORD not found in .env. Skipping admin seed.");
  } else {
    const appClient = postgres(url, { max: 1 });
    const appDb = drizzle(appClient);
    const existingUser = await appDb.select().from(users).where(eq(users.email, adminEmail));
    if (existingUser.length === 0) {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await appDb.insert(users).values({
        name: "Trifort Admin",
        email: adminEmail,
        passwordHash: passwordHash,
        role: "admin",
      });
      console.log(`✅ Successfully created admin user: ${adminEmail}`);
    } else {
      console.log("✅ Admin user already exists.");
    }
    await appClient.end();
  }

  console.log("Seeding demo projects...");
  // Run the existing seed-projects script logic by dynamically importing it or executing it
  try {
    const { execSync } = require("child_process");
    execSync("npx tsx scripts/seed-projects.ts", { stdio: "inherit", env: { ...process.env, DATABASE_URL: url } });
    console.log("✅ Projects seeded successfully!");
  } catch (err) {
    console.error("⚠️ Project seeding failed or was already completed.");
  }

  console.log("🎉 Production setup is fully complete!");
  process.exit(0);
}

run().catch((e) => {
  console.error("❌ Setup failed:");
  console.error(e);
  process.exit(1);
});
