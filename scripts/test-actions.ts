import { db } from "../src/db";
import { contacts, subcontractors, quotes, reviews } from "../src/db/schema";
import { submitContact, submitSubcontractor, submitQuote, submitReview } from "../src/lib/actions/forms";
import { desc } from "drizzle-orm";

async function main() {
  console.log("Testing Server Actions...");

  // Mock Request headers
  global.Request = class MockRequest {
    headers = new Map([["x-forwarded-for", "192.168.1.1"]]);
  } as any;

  // 1. Submit Contact
  const contactForm = new FormData();
  contactForm.append("name", "Alice Test");
  contactForm.append("email", "alice@example.com");
  contactForm.append("message", "This is a test contact message.");
  await submitContact(contactForm);

  // 2. Submit Subcontractor
  const subForm = new FormData();
  subForm.append("company", "Bob Plumbing Co");
  subForm.append("contact", "Bob Builder");
  subForm.append("email", "bob@example.com");
  subForm.append("trade", "Plumbing");
  await submitSubcontractor(subForm);

  // 3. Submit Quote
  const quoteForm = new FormData();
  quoteForm.append("name", "Charlie Test");
  quoteForm.append("email", "charlie@example.com");
  quoteForm.append("phone", "1234567890");
  quoteForm.append("projectType", "Commercial");
  await submitQuote(quoteForm);

  // 4. Submit Review
  const reviewForm = new FormData();
  reviewForm.append("name", "Dave Reviewer");
  reviewForm.append("email", "dave@example.com");
  reviewForm.append("rating", "5");
  reviewForm.append("title", "Great work!");
  reviewForm.append("message", "Test review message minimum 10 chars.");
  await submitReview(reviewForm);

  console.log("--- Querying DB ---");
  const c = await db.query.contacts.findFirst({ orderBy: [desc(contacts.createdAt)] });
  console.log("Contact:", c);

  const s = await db.query.subcontractors.findFirst({ orderBy: [desc(subcontractors.createdAt)] });
  console.log("Subcontractor:", s);

  const q = await db.query.quotes.findFirst({ orderBy: [desc(quotes.createdAt)] });
  console.log("Quote:", q);

  const r = await db.query.reviews.findFirst({ orderBy: [desc(reviews.createdAt)] });
  console.log("Review:", r);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
