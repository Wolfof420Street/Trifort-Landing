"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    // Disable if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let frameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const animateCursor = () => {
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      frameId = requestAnimationFrame(animateCursor);
    };

    const onMouseEnter = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
      ring.style.opacity = '0.2';
    };

    const onMouseLeave = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.opacity = '0.5';
    };

    // Attach global mouse move
    document.addEventListener('mousemove', onMouseMove);
    frameId = requestAnimationFrame(animateCursor);

    // Attach hover effects to interactive elements
    const attachHovers = () => {
      document.querySelectorAll('a, button, [class*="service-card"], [class*="mosaic-cell"], [class*="process-card"], [class*="testimonial-card"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    attachHovers();
    
    // Setup a MutationObserver to re-attach hover events when DOM changes (e.g. Next.js navigation)
    const observer = new MutationObserver(() => attachHovers());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursorRing" ref={ringRef}></div>
    </>
  );
}
