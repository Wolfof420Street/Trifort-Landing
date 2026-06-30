import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    title: string;
    slug: string;
    category: string;
    location: string | null;
  };
  imageUrl: string;
  isLarge?: boolean;
}

export default function ProjectCard({ project, imageUrl, isLarge }: ProjectCardProps) {
  return (
    <div className={`project-card ${isLarge ? "large" : ""}`}>
      <Image 
        src={imageUrl} 
        alt={project.title} 
        fill
        className="project-img"
        sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
      />
      <div className="project-overlay">
        <div className="project-tag">{project.category}</div>
        <h3 className="project-name">{project.title}</h3>
        {project.location && <div className="project-location">{project.location}</div>}
      </div>
      <Link href={`/projects/${project.slug}`} className="project-link-arrow">
        <i className="fas fa-arrow-right"></i>
      </Link>
    </div>
  );
}
