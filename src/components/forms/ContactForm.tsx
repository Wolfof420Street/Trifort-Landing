"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions/forms";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    
    const result = await submitContact(formData);
    
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
        <h3>Message Sent!</h3>
        <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>We will get back to you shortly.</p>
        <button onClick={() => setStatus("idle")} className="btn-ghost" style={{ marginTop: "20px" }}>Send Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
        <input name="phone" placeholder="Phone Number" style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%" }} />
        <input name="subject" placeholder="Subject" style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%" }} />
      </div>

      <textarea name="message" required placeholder="Your Message" rows={5} style={{ padding: "16px", border: "1px solid var(--sand)", background: "transparent", outline: "none", width: "100%", fontFamily: "inherit" }}></textarea>

      <button type="submit" disabled={status === "submitting"} className="btn-gold" style={{ border: "none", cursor: "pointer", width: "100%", justifyContent: "center" }}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
