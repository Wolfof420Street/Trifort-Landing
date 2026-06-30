"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // If reduced motion is preferred, immediately make all reveals visible without animation
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
        (el as HTMLElement).style.transition = 'none';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    const observeElements = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
    };

    observeElements();
    
    // Re-run on navigation
    const observer = new MutationObserver(() => observeElements());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
