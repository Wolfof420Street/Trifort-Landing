import "dotenv/config";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import { db } from "../src/db";
import { users } from "../src/db/schema";

const adminsToSeed = [
  { email: "fortune@trifort.site", name: "Fortune" },
  { email: "kabugi@trifort.site", name: "Kabugi" },
  { email: "djamila@trifort.site", name: "Djamila" },
];

async function seedAdmins() {
  console.log("Starting admin seeding process...\n");

  for (const admin of adminsToSeed) {
    // 1. Generate password at runtime
    const plainPassword = crypto.randomBytes(16).toString("hex");
    
    // 2. Hash with bcrypt (12 rounds)
    const passwordHash = await bcrypt.hash(plainPassword, 12);

    // 3. Insert with onConflictDoNothing on email
    const result = await db
      .insert(users)
      .values({
        name: admin.name,
        email: admin.email,
        passwordHash: passwordHash,
      })
      .onConflictDoNothing({ target: users.email })
      .returning({ id: users.id });

    // 4. Clearly indicate if created or skipped
    if (result.length > 0) {
      console.log(`✅ NEW ADMIN CREATED`);
      console.log(`Name:     ${admin.name}`);
      console.log(`Email:    ${admin.email}`);
      console.log(`Password: ${plainPassword}`);
      console.log(`(Make sure to copy this password now, it will not be shown again)\n`);
    } else {
      console.log(`⏭️  SKIPPED: Admin ${admin.email} already exists.\n`);
    }
  }

  console.log("Seeding complete.");
  process.exit(0);
}

seedAdmins().catch((err) => {
  console.error("Fatal error during seeding:", err);
  process.exit(1);
});
