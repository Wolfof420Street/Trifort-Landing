'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectImage {
  id: string;
  avifUrl: string | null;
  webpUrl: string | null;
  originalUrl: string | null;
  altText: string | null;
}

interface ProjectGalleryProps {
  images: ProjectImage[];
  title: string;
  description: string;
}

export default function ProjectGallery({ images, title, description }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div 
        style={{ position: "relative", width: "100%", height: "60vh", marginBottom: "40px", cursor: "pointer" }} 
        onClick={() => setLightboxIndex(0)}
      >
        <Image 
          src={images[0].avifUrl || images[0].webpUrl || images[0].originalUrl || "/window.svg"} 
          alt={images[0].altText || title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div style={{ fontSize: "1.1rem", lineHeight: "2", marginBottom: "60px", maxWidth: "800px" }}>
        {description}
      </div>

      {images.length > 1 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {images.slice(1).map((img, idx) => (
            <div 
              key={img.id} 
              style={{ position: "relative", width: "100%", height: "40vh", cursor: "pointer" }}
              onClick={() => setLightboxIndex(idx + 1)}
            >
              <Image 
                src={img.avifUrl || img.webpUrl || img.originalUrl || "/window.svg"} 
                alt={img.altText || title}
                fill
                style={{ objectFit: "cover" }}
                priority={idx < 4}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div 
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(8, 20, 12, 0.94)", backdropFilter: "blur(16px)",
            zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={() => setLightboxIndex(null)}
        >
          <div style={{ position: "relative", width: "90%", height: "90%" }}>
            <Image 
              src={images[lightboxIndex].avifUrl || images[lightboxIndex].webpUrl || images[lightboxIndex].originalUrl || "/window.svg"}
              alt={images[lightboxIndex].altText || title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          
          <button 
            style={{ 
              position: "absolute", top: "20px", right: "30px", 
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", 
              color: "white", fontSize: "1.5rem", cursor: "pointer", 
              width: "50px", height: "50px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.3s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
          >
            <i className="fas fa-times"></i>
          </button>
          
          {images.length > 1 && (
            <>
              <button 
                style={{ 
                  position: "absolute", left: "30px", 
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", 
                  color: "white", fontSize: "1.5rem", cursor: "pointer", 
                  width: "60px", height: "60px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.3s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onClick={handlePrev}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                style={{ 
                  position: "absolute", right: "30px", 
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", 
                  color: "white", fontSize: "1.5rem", cursor: "pointer", 
                  width: "60px", height: "60px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.3s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onClick={handleNext}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
