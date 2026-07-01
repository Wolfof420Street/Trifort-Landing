import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectGallery from "@/components/ui/ProjectGallery";

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params;
  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, p.slug),
    with: { images: { limit: 1 } }
  });

  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | Trifort Construction`,
    description: project.description,
    openGraph: {
      images: project.images[0] ? [project.images[0].avifUrl || project.images[0].webpUrl || project.images[0].originalUrl] : [],
    }
  };
}

export default async function ProjectDetailPage({ params }: any) {
  const p = await params;
  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, p.slug),
    with: {
      images: {
        orderBy: (images, { asc }) => [asc(images.sortOrder)],
      }
    }
  });

  console.log("=> Requested slug:", p.slug);
  console.log("=> Found project:", project?.id);

  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": project.images[0]?.avifUrl || project.images[0]?.webpUrl || project.images[0]?.originalUrl,
    "dateCreated": project.createdAt,
    "author": {
      "@type": "Organization",
      "name": "Trifort Construction"
    }
  };

  return (
    <div style={{ paddingTop: "120px", minHeight: "80vh", background: "var(--bg)", color: "var(--charcoal)", padding: "120px 40px 40px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <span className="section-tag">{project.category}</span>
        <h1 className="section-title" style={{ marginBottom: "20px" }}>{project.title}</h1>
        {project.location && <div style={{ fontSize: "0.8rem", color: "var(--gold)", marginBottom: "40px", textTransform: "uppercase", letterSpacing: "2px" }}>{project.location}</div>}
        
        <ProjectGallery images={project.images as any[]} title={project.title} description={project.description} />

        {project.videoUrl && (
          <div style={{ marginTop: "60px", marginBottom: "40px" }}>
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Project Walkthrough</h2>
            <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px", background: "var(--emerald-deep)" }}>
              <iframe
                src={project.videoUrl}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
