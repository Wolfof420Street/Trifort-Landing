"use client";

import { useState } from "react";
import { submitReview } from "@/lib/actions/forms";

export default function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    
    const result = await submitReview(formData);
    
    if (result.error) {
      setErrorMessage(result.error);
      setStatus("error");
    } else {
      setStatus("success");
      e.currentTarget.reset();
    }
  }

  if (status === "success") {
    return (
      <div style={{ padding: "40px", background: "var(--emerald)", color: "white", textAlign: "center" }}>
        <i className="fas fa-check-circle" style={{ fontSize: "2rem", color: "var(--gold)", marginBottom: "16px" }}></i>
        <h3>Thank you for your review!</h3>
        <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Your review has been submitted and is pending moderation.</p>
        <button onClick={() => setStatus("idle")} className="btn-ghost" style={{ marginTop: "20px" }}>Submit Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {status === "error" && (
        <div style={{ padding: "16px", background: "#fee2e2", color: "#b91c1c", border: "1px solid #f87171" }}>
          {errorMessage}
        </div>
      )}
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <input name="name" required placeholder="Your Name" style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%" }} />
        <input name="email" type="email" required placeholder="Email Address" style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <select name="rating" required style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%" }}>
          <option value="">Select Rating</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <input name="projectType" placeholder="Project Type (Optional)" style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%" }} />
      </div>

      <input name="title" required placeholder="Review Title" style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%" }} />
      <textarea name="message" required placeholder="Your Review" rows={5} style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%", fontFamily: "inherit" }}></textarea>

      <button type="submit" disabled={status === "submitting"} className="btn-gold" style={{ border: "none", cursor: "pointer", width: "100%", justifyContent: "center" }}>
        {status === "submitting" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
