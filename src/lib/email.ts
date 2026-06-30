import nodemailer from "nodemailer";
import * as Sentry from "@sentry/nextjs";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS, // Note: Use app-specific password if 2FA is enabled
  },
});

export async function sendEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"Trifort Builders" <${process.env.ZOHO_SMTP_USER || "customer.care@trifort.site"}>`,
      to: "customer.care@trifort.site",
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    Sentry.captureException(error);
    return { success: false, error };
  }
}
