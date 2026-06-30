import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import ReviewCard from "@/components/ui/ReviewCard";
import ReviewForm from "@/components/forms/ReviewForm";

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export const metadata = {
  title: "Client Reviews | Trifort Construction",
  description: "Read what our clients have to say about working with Trifort Construction.",
};

export default async function ReviewsPage() {
  const publishedReviews = await db.query.reviews.findMany({
    where: eq(reviews.status, "published"),
    orderBy: [desc(reviews.createdAt)],
  });

  return (
    <div style={{ paddingTop: "120px", minHeight: "80vh", background: "var(--bg)", color: "var(--charcoal)", padding: "120px 40px 100px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <span className="section-tag">Testimonials</span>
          <h1 className="section-title">Client Reviews</h1>
          <div className="gold-rule" style={{ margin: "20px auto 0" }}></div>
        </div>

        {publishedReviews.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "30px", marginBottom: "100px" }}>
            {publishedReviews.map(r => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", marginBottom: "100px", color: "var(--charcoal)", opacity: 0.6 }}>
            No reviews published yet.
          </div>
        )}

        <div style={{ maxWidth: "800px", margin: "0 auto", background: "white", padding: "60px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", color: "var(--emerald)" }}>Leave a Review</h2>
            <p style={{ color: "rgba(42,58,48,0.7)", marginTop: "10px" }}>We value your feedback.</p>
          </div>
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}
