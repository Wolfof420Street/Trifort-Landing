"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    let ticking = false;

    const updateProgress = () => {
      if (!barRef.current) return;
      const y = window.scrollY;
      const h = document.body.scrollHeight - window.innerHeight;
      if (h > 0) {
        barRef.current.style.width = `${(y / h) * 100}%`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        frameId = requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div id="progressBar" ref={barRef}></div>;
}
