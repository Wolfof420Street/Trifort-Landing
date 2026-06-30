import Link from "next/link";
import NavbarInteractions from "./NavbarInteractions";

export default function Navbar() {
  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo-wrap">
          <div className="logo-text-block">
            <span className="logo-name">Trifort</span>
            <span className="logo-tagline">Construction</span>
          </div>
        </Link>
        <nav className="nav-menu">
          <Link href="/" className="nav-item">Home</Link>
          <Link href="/about" className="nav-item">About</Link>
          <Link href="/projects" className="nav-item">Projects</Link>
          <Link href="/services" className="nav-item">Services</Link>
          <Link href="/contact" className="nav-item">Contact</Link>
          <a href="https://estimator.trifort.site" target="_blank" rel="noopener noreferrer" className="nav-item">Estimator</a>
        </nav>
        <NavbarInteractions />
      </div>
    </header>
  );
}
