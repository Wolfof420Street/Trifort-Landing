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
  index?: number;
}

export default function ProjectCard({ project, imageUrl, isLarge, index = 0 }: ProjectCardProps) {
  const delayClass = `reveal-delay-${(index % 3) + 1}`;
  return (
    <Link href={`/projects/${project.slug}`} className={`project-card reveal ${delayClass}`}>
      <Image 
        src={imageUrl} 
        alt={project.title} 
        fill
        className="project-img"
        sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        priority={index < 6}
      />
      <div className="project-overlay"></div>
      <div className="project-body">
        <div className="project-tag">{project.category}</div>
        <h3 className="project-name">{project.title}</h3>
        {project.location && <div className="project-location">{project.location}</div>}
      </div>
      <div className="project-link-arrow">
        <i className="fas fa-arrow-right"></i>
      </div>
    </Link>
  );
}
