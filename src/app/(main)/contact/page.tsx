import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact Us | Trifort Construction",
  description: "Get in touch with Trifort Construction for your next building project.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "120px", minHeight: "80vh", background: "var(--bg)", color: "var(--charcoal)", padding: "120px 40px 100px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px", alignItems: "start" }}>
        
        <div>
          <span className="section-tag">Get in Touch</span>
          <h1 className="section-title">Contact Us</h1>
          <div className="gold-rule"></div>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "rgba(42,58,48,0.7)", marginBottom: "40px" }}>
            Ready to start your next project? Reach out to us for consultations, quotes, or general inquiries.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(200,112,26,0.1)", color: "var(--gold)", display: "grid", placeItems: "center", borderRadius: "50%" }}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Location</div>
                <div style={{ color: "rgba(42,58,48,0.7)", fontSize: "0.85rem" }}>Westlands, Nairobi, Kenya</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(200,112,26,0.1)", color: "var(--gold)", display: "grid", placeItems: "center", borderRadius: "50%" }}>
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Email</div>
                <div style={{ color: "rgba(42,58,48,0.7)", fontSize: "0.85rem" }}>info@trifort.site</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(200,112,26,0.1)", color: "var(--gold)", display: "grid", placeItems: "center", borderRadius: "50%" }}>
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Phone</div>
                <div style={{ color: "rgba(42,58,48,0.7)", fontSize: "0.85rem" }}>+254 700 000 000</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "white", padding: "50px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--emerald)", marginBottom: "30px" }}>Send a Message</h2>
          <ContactForm />
        </div>

      </div>
    </div>
  );
}
