export const metadata = {
  title: "About Us | Trifort Construction",
  description: "Learn more about our history, our values, and our commitment to building transparency.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "120px", minHeight: "80vh", background: "var(--bg)", color: "var(--charcoal)", padding: "120px 40px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <span className="section-tag">Who we are</span>
        <h1 className="section-title">About Trifort</h1>
        <div className="gold-rule" style={{ margin: "20px auto 40px" }}></div>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.9", color: "rgba(42,58,48,0.8)" }}>
          Trifort Construction is a leading builder in Kenya, dedicated to delivering transparency through every phase of construction. From residential homes to commercial skyscrapers, our commitment is to quality, integrity, and client satisfaction.
        </p>
      </div>
    </div>
  );
}
