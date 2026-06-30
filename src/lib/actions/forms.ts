"use server";

import { z } from "zod";
import { db } from "@/db";
import { contacts, subcontractors, quotes, reviews } from "@/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { after } from "next/server";
import { sendEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
});

const subcontractorSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  contact: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  trade: z.string().min(2, "Trade is required"),
  experience: z.string().optional(),
  serviceArea: z.string().optional(),
  message: z.string().optional(),
});

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  projectType: z.string().min(2, "Project type is required"),
  details: z.string().optional(),
});

const reviewSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  rating: z.coerce.number().min(1).max(5),
  title: z.string().min(2, "Title is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  projectType: z.string().optional(),
});

async function getClientIp() {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") || "127.0.0.1";
}

export async function submitContact(formData: FormData) {
  const ip = await getClientIp();
  const rateLimit = await checkRateLimit({ ip, action: "submit_contact", maxAttempts: 5, lockoutMinutes: 60 });
  if (!rateLimit.success) return { error: rateLimit.error };

  try {
    const rawData = Object.fromEntries(formData.entries());
    const data = contactSchema.parse(rawData);
    await db.insert(contacts).values({ ...data, status: "new" });

    after(async () => {
      await sendEmail({
        subject: `New Contact Submission: ${data.name}`,
        html: `<p><strong>Name:</strong> ${data.name}</p>
               <p><strong>Email:</strong> ${data.email}</p>
               <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
               <p><strong>Subject:</strong> ${data.subject || "N/A"}</p>
               <p><strong>Message:</strong></p>
               <p>${data.message.replace(/\n/g, '<br>')}</p>`,
      });
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.errors ? err.errors[0].message : "Submission failed" };
  }
}

export async function submitSubcontractor(formData: FormData) {
  const ip = await getClientIp();
  const rateLimit = await checkRateLimit({ ip, action: "submit_subcontractor", maxAttempts: 5, lockoutMinutes: 60 });
  if (!rateLimit.success) return { error: rateLimit.error };

  try {
    const rawData = Object.fromEntries(formData.entries());
    const data = subcontractorSchema.parse(rawData);
    await db.insert(subcontractors).values({ ...data, status: "pending" });

    after(async () => {
      await sendEmail({
        subject: `New Subcontractor Application: ${data.company}`,
        html: `<p><strong>Company:</strong> ${data.company}</p>
               <p><strong>Contact Name:</strong> ${data.contact}</p>
               <p><strong>Email:</strong> ${data.email}</p>
               <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
               <p><strong>Trade:</strong> ${data.trade}</p>
               <p><strong>Experience:</strong> ${data.experience || "N/A"}</p>
               <p><strong>Service Area:</strong> ${data.serviceArea || "N/A"}</p>
               <p><strong>Message:</strong></p>
               <p>${(data.message || "N/A").replace(/\n/g, '<br>')}</p>`,
      });
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.errors ? err.errors[0].message : "Submission failed" };
  }
}

export async function submitQuote(formData: FormData) {
  const ip = await getClientIp();
  const rateLimit = await checkRateLimit({ ip, action: "submit_quote", maxAttempts: 5, lockoutMinutes: 60 });
  if (!rateLimit.success) return { error: rateLimit.error };

  try {
    const rawData = Object.fromEntries(formData.entries());
    const data = quoteSchema.parse(rawData);
    await db.insert(quotes).values({ ...data, status: "new" });

    after(async () => {
      await sendEmail({
        subject: `New Quote Request: ${data.name}`,
        html: `<p><strong>Name:</strong> ${data.name}</p>
               <p><strong>Email:</strong> ${data.email}</p>
               <p><strong>Phone:</strong> ${data.phone}</p>
               <p><strong>Project Type:</strong> ${data.projectType}</p>
               <p><strong>Details:</strong></p>
               <p>${(data.details || "N/A").replace(/\n/g, '<br>')}</p>`,
      });
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.errors ? err.errors[0].message : "Submission failed" };
  }
}

export async function submitReview(formData: FormData) {
  const ip = await getClientIp();
  const rateLimit = await checkRateLimit({ ip, action: "submit_review", maxAttempts: 5, lockoutMinutes: 60 });
  if (!rateLimit.success) return { error: rateLimit.error };

  try {
    const rawData = Object.fromEntries(formData.entries());
    const data = reviewSchema.parse(rawData);
    // User requested: "Confirm review submissions default to status = 'pending'"
    await db.insert(reviews).values({ ...data, status: "pending", verified: false });
    return { success: true };
  } catch (err: any) {
    return { error: err.errors ? err.errors[0].message : "Submission failed" };
  }
}
