import "dotenv/config";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { users } from "../src/db/schema";



async function main() {
  const adminEmail = "customer.care@trifort.site";
  const adminPassword = "";

  console.log("Seeding admin user...");

  try {
    const existingUser = await db.select().from(users).where(eq(users.email, adminEmail));
    if (existingUser.length > 0) {

      console.log("Admin user already exists. Exiting.");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);

    await db.insert(users).values({
      name: "Trifort Admin",
      email: adminEmail,
      passwordHash: passwordHash,
      role: "admin",
    });

    console.log(`Successfully created admin user: ${adminEmail}`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
}

main();
