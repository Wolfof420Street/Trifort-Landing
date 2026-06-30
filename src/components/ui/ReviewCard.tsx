export default function ReviewCard({ review }: { review: any }) {
  return (
    <div style={{ background: "var(--emerald-deep)", padding: "32px", border: "1px solid rgba(255,255,255,0.07)", color: "white" }}>
      <div style={{ display: "flex", gap: "4px", color: "var(--gold)", marginBottom: "16px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className={i < review.rating ? "fas fa-star" : "far fa-star"}></i>
        ))}
      </div>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", marginBottom: "12px" }}>{review.title}</h4>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "24px" }}>
        &quot;{review.message}&quot;
      </p>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
        <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{review.name}</div>
        {review.projectType && <div style={{ fontSize: "0.7rem", color: "var(--gold-light)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{review.projectType} Project</div>}
      </div>
    </div>
  );
}
