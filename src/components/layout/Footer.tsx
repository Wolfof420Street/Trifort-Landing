import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", color: "white", padding: "60px 40px", textAlign: "center" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", textAlign: "left" }}>
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "var(--gold)" }}>Trifort</h3>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginTop: "10px" }}>
            Transparency Through Builds. Leading construction company in Kenya.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: "0.9rem", color: "var(--gold)", marginBottom: "15px" }}>Links</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", display: "flex", flexDirection: "column", gap: "10px" }}>
            <li><Link href="/about" style={{ color: "inherit", textDecoration: "none" }}>About Us</Link></li>
            <li><Link href="/projects" style={{ color: "inherit", textDecoration: "none" }}>Projects</Link></li>
            <li><Link href="/services" style={{ color: "inherit", textDecoration: "none" }}>Services</Link></li>
            <li><Link href="/reviews" style={{ color: "inherit", textDecoration: "none" }}>Reviews</Link></li>
            <li><Link href="/subcontractor" style={{ color: "inherit", textDecoration: "none" }}>Join as Subcontractor</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: "0.9rem", color: "var(--gold)", marginBottom: "15px" }}>Contact</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", display: "flex", flexDirection: "column", gap: "10px" }}>
            <li><i className="fas fa-map-marker-alt" style={{ marginRight: "8px", color: "var(--gold)" }}></i> Nairobi, Kenya</li>
            <li><i className="fas fa-phone" style={{ marginRight: "8px", color: "var(--gold)" }}></i> +254 700 000 000</li>
            <li><i className="fas fa-envelope" style={{ marginRight: "8px", color: "var(--gold)" }}></i> info@trifort.site</li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: "60px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
        &copy; {new Date().getFullYear()} Trifort Construction. All rights reserved.
      </div>
    </footer>
  );
}
