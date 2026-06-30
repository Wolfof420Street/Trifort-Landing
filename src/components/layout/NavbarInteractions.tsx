"use client";

import { useEffect, useState } from "react";

export default function NavbarInteractions() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector(".header");
    if (!header) return;

    if (isOpen) {
      header.classList.add("nav-open");
    } else {
      header.classList.remove("nav-open");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (!header) return;
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button 
      className="nav-toggle" 
      aria-label="Toggle menu"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span></span>
      <span></span>
    </button>
  );
}
