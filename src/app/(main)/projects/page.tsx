import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import ProjectCard from "@/components/ui/ProjectCard";
import Link from "next/link";

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Our Projects | Trifort Construction",
  description: "Browse our portfolio of completed and ongoing construction projects in Kenya.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string };
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  const projectsList = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
    limit,
    offset,
    with: {
      images: {
        orderBy: (images, { asc }) => [asc(images.sortOrder)],
        limit: 1,
      }
    }
  });

  return (
    <div style={{ paddingTop: "100px", minHeight: "80vh", background: "var(--bg)" }}>
      <section className="projects-section">
        <div className="projects-header">
          <div>
            <span className="section-tag">Portfolio</span>
            <h1 className="section-title">All Projects</h1>
            <div className="gold-rule"></div>
          </div>
        </div>
        <div className="projects-grid">
          {projectsList.map((p, idx) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              imageUrl={p.images[0]?.avifUrl || p.images[0]?.webpUrl || p.images[0]?.originalUrl || "/window.svg"} 
              index={idx}
            />
          ))}
        </div>
        <div style={{ marginTop: "40px", display: "flex", gap: "16px", justifyContent: "center" }}>
          {page > 1 && (
            <Link href={`/projects?page=${page - 1}`} className="btn-ghost" style={{ color: "var(--emerald)", borderColor: "var(--emerald)" }}>
              Previous
            </Link>
          )}
          {projectsList.length === limit && (
            <Link href={`/projects?page=${page + 1}`} className="btn-ghost" style={{ color: "var(--emerald)", borderColor: "var(--emerald)" }}>
              Next
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
