import Link from "next/link";
import SubcontractorForm from "@/components/forms/SubcontractorForm";
import styles from "../page.module.css"; // Reuse some styles if applicable

export const metadata = {
  title: "Subcontractor Partners | Trifort Construction",
  description: "Join TRI-FORT's network of elite subcontractor partners.",
};

export default function SubcontractorPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-lines"></div>
        <div className="page-hero-content">
          <div className="hero-eyebrow">Partner Network</div>
          <h1>Build <em>With Us.</em></h1>
          <div className="hero-divider"></div>
          <p className="hero-desc">
            We partner with elite tradespeople who share our commitment to precision, safety, and uncompromising quality. Join our network of certified subcontractors.
          </p>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <span className="section-label">Benefits</span>
          <h2 className="section-title">Why Partner <em>With Trifort?</em></h2>
          <div className="gold-line"></div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", marginTop: "50px" }}>
            <div style={{ background: "rgba(215, 224, 218, 0.8)", padding: "40px 30px", border: "1px solid var(--sand)", borderLeft: "4px solid var(--gold)" }}>
              <i className="fas fa-handshake" style={{ fontSize: "2.5rem", color: "var(--gold)", marginBottom: "20px" }}></i>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, color: "var(--emerald)", marginBottom: "12px" }}>Reliable Partnerships</h3>
              <p style={{ color: "var(--charcoal)", lineHeight: 1.7, fontSize: "0.9rem", fontWeight: 300 }}>We believe in building long-term relationships with our trades based on mutual respect, timely communication, and prompt payments.</p>
            </div>
            
            <div style={{ background: "rgba(215, 224, 218, 0.8)", padding: "40px 30px", border: "1px solid var(--sand)", borderLeft: "4px solid var(--gold)" }}>
              <i className="fas fa-project-diagram" style={{ fontSize: "2.5rem", color: "var(--gold)", marginBottom: "20px" }}></i>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, color: "var(--emerald)", marginBottom: "12px" }}>Quality Projects</h3>
              <p style={{ color: "var(--charcoal)", lineHeight: 1.7, fontSize: "0.9rem", fontWeight: 300 }}>Gain access to high-profile residential and commercial builds across the country. Work on projects you'll be proud to showcase.</p>
            </div>
            
            <div style={{ background: "rgba(215, 224, 218, 0.8)", padding: "40px 30px", border: "1px solid var(--sand)", borderLeft: "4px solid var(--gold)" }}>
              <i className="fas fa-shield-alt" style={{ fontSize: "2.5rem", color: "var(--gold)", marginBottom: "20px" }}></i>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, color: "var(--emerald)", marginBottom: "12px" }}>Safe Sites</h3>
              <p style={{ color: "var(--charcoal)", lineHeight: 1.7, fontSize: "0.9rem", fontWeight: 300 }}>Safety is our primary directive. We maintain highly organized, rigorous safety protocols on every site to protect all workers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="section" style={{ background: "var(--emerald)", color: "white" }} id="application">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "4px", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500 }}>Join Us</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "white", marginTop: "12px" }}>Subcontractor Application</h2>
          </div>
          
          <div style={{ maxWidth: "800px", margin: "0 auto", background: "rgb(235, 239, 236)", padding: "50px", borderRadius: "2px" }}>
            <SubcontractorForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-light) 100%)", padding: "80px 60px", textAlign: "center", color: "white" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, marginBottom: "20px" }}>Have Questions <em>About Partnering?</em></h2>
        <p style={{ fontSize: "1rem", fontWeight: 300, marginBottom: "35px", opacity: 0.9 }}>Our partnerships team is here to help. Reach out anytime to discuss opportunities.</p>
        <Link href="/contact" style={{ display: "inline-block", padding: "16px 50px", background: "var(--gold)", color: "white", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", borderRadius: "2px", transition: "all 0.3s ease" }}>
          Contact Us
        </Link>
      </section>
    </>
  );
}
