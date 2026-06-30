"use client";

import { useState } from "react";
import { submitSubcontractor } from "@/lib/actions/forms";

export default function SubcontractorForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    
    const result = await submitSubcontractor(formData);
    
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
      <div style={{ padding: "40px", background: "var(--emerald)", color: "white", textAlign: "center", borderRadius: "2px" }}>
        <i className="fas fa-check-circle" style={{ fontSize: "2.5rem", color: "var(--gold)", marginBottom: "16px" }}></i>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", marginBottom: "10px" }}>Application Received!</h3>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
          Thank you for your interest in partnering with TRI-FORT CONSTRUCTION. Our team will review your details and get back to you shortly.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-ghost" style={{ marginTop: "24px" }}>Submit Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {status === "error" && (
        <div style={{ padding: "16px", background: "#fee2e2", color: "#b91c1c", border: "1px solid #f87171", borderRadius: "2px" }}>
          {errorMessage}
        </div>
      )}
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="company" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Company Name *</label>
          <input id="company" name="company" required placeholder="Your Company Ltd" style={{ padding: "14px 16px", border: "1px solid var(--sand)", background: "var(--cream)", outline: "none", width: "100%", borderRadius: "2px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="contact" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Primary Contact *</label>
          <input id="contact" name="contact" required placeholder="Contact Person" style={{ padding: "14px 16px", border: "1px solid var(--sand)", background: "var(--cream)", outline: "none", width: "100%", borderRadius: "2px" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="email" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email Address *</label>
          <input id="email" name="email" type="email" required placeholder="contact@company.com" style={{ padding: "14px 16px", border: "1px solid var(--sand)", background: "var(--cream)", outline: "none", width: "100%", borderRadius: "2px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="phone" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Phone Number *</label>
          <input id="phone" name="phone" required placeholder="+254 700 000 000" style={{ padding: "14px 16px", border: "1px solid var(--sand)", background: "var(--cream)", outline: "none", width: "100%", borderRadius: "2px" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="trade" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Primary Trade / Specialty *</label>
          <select id="trade" name="trade" required style={{ padding: "14px 16px", border: "1px solid var(--sand)", background: "var(--cream)", outline: "none", width: "100%", borderRadius: "2px", color: "var(--charcoal)" }}>
            <option value="">Select your trade</option>
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="hvac">HVAC</option>
            <option value="carpentry">Carpentry</option>
            <option value="masonry">Masonry</option>
            <option value="painting">Painting & Finishing</option>
            <option value="roofing">Roofing</option>
            <option value="flooring">Flooring</option>
            <option value="landscaping">Landscaping</option>
            <option value="concrete">Concrete & Foundation</option>
            <option value="steel">Structural Steel</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="experience" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Years of Experience *</label>
          <input id="experience" name="experience" type="number" min="0" required placeholder="Years" style={{ padding: "14px 16px", border: "1px solid var(--sand)", background: "var(--cream)", outline: "none", width: "100%", borderRadius: "2px" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label htmlFor="serviceArea" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Primary Service Area *</label>
        <input id="serviceArea" name="serviceArea" required placeholder="e.g., Nairobi, Mombasa" style={{ padding: "14px 16px", border: "1px solid var(--sand)", background: "var(--cream)", outline: "none", width: "100%", borderRadius: "2px" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label htmlFor="message" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tell Us About Your Experience</label>
        <textarea id="message" name="message" placeholder="Share your background, notable projects, and why you'd like to partner with TRI-FORT..." rows={5} style={{ padding: "14px 16px", border: "1px solid var(--sand)", background: "var(--cream)", outline: "none", width: "100%", fontFamily: "inherit", borderRadius: "2px" }}></textarea>
      </div>

      <button type="submit" disabled={status === "submitting"} style={{ padding: "18px", background: "var(--emerald)", color: "white", border: "none", borderRadius: "2px", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease", opacity: status === "submitting" ? 0.7 : 1 }}>
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
