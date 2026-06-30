import { describe, it, expect, vi } from "vitest";
import { db } from "../src/db";
import { contacts, subcontractors, quotes, reviews } from "../src/db/schema";
import { submitContact, submitSubcontractor, submitQuote, submitReview } from "../src/lib/actions/forms";
import { desc } from "drizzle-orm";

vi.mock("next/headers", () => ({
  headers: vi.fn(() => new Map([["x-forwarded-for", "192.168.1.1"]])),
}));

describe("Form Server Actions Integration", () => {
  it("should insert a contact", async () => {
    const formData = new FormData();
    formData.append("name", "Alice Test");
    formData.append("email", "alice@example.com");
    formData.append("message", "This is a test contact message.");
    
    const res = await submitContact(formData);
    expect(res.success).toBe(true);

    const c = await db.query.contacts.findFirst({ orderBy: [desc(contacts.createdAt)] });
    console.log("=> DB Contact:", c);
    expect(c?.name).toBe("Alice Test");
  });

  it("should insert a subcontractor", async () => {
    const formData = new FormData();
    formData.append("company", "Bob Plumbing Co");
    formData.append("contact", "Bob Builder");
    formData.append("email", "bob@example.com");
    formData.append("trade", "Plumbing");
    
    const res = await submitSubcontractor(formData);
    expect(res.success).toBe(true);

    const s = await db.query.subcontractors.findFirst({ orderBy: [desc(subcontractors.createdAt)] });
    console.log("=> DB Subcontractor:", s);
    expect(s?.company).toBe("Bob Plumbing Co");
  });

  it("should insert a quote", async () => {
    const formData = new FormData();
    formData.append("name", "Charlie Test");
    formData.append("email", "charlie@example.com");
    formData.append("phone", "1234567890");
    formData.append("projectType", "Commercial");
    
    const res = await submitQuote(formData);
    expect(res.success).toBe(true);

    const q = await db.query.quotes.findFirst({ orderBy: [desc(quotes.createdAt)] });
    console.log("=> DB Quote:", q);
    expect(q?.name).toBe("Charlie Test");
  });

  it("should insert a review", async () => {
    const formData = new FormData();
    formData.append("name", "Dave Reviewer");
    formData.append("email", "dave@example.com");
    formData.append("rating", "5");
    formData.append("title", "Great work!");
    formData.append("message", "Test review message minimum 10 chars.");
    
    const res = await submitReview(formData);
    expect(res.success).toBe(true);

    const r = await db.query.reviews.findFirst({ orderBy: [desc(reviews.createdAt)] });
    console.log("=> DB Review:", r);
    expect(r?.name).toBe("Dave Reviewer");
    expect(r?.status).toBe("pending");
  });
});
