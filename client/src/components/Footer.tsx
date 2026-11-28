import { useState } from "react";
import { Link } from "wouter";

interface FooterProps {
  showClosingCta?: boolean;
}

export default function Footer({ showClosingCta = false }: FooterProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), firstName: firstName.trim(), lastName: lastName.trim() })
        });
      } catch (_) {}

      setIsSubscribed(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 6000);
    }
  };

  const seoLocationsCol1 = [
    "DALLAS TEXAS WEDDING PHOTOGRAPHER",
    "NEWPORT RHODE ISLAND WEDDING VIDEO",
    "NAPA VALLEY WEDDING VIDEOGRAPHER",
    "BIG SUR WEDDING VIDEOGRAPHER",
    "ASPEN COLORADO WEDDING VIDEO",
    "SANTA BARBARA WEDDING PHOTOGRAPHER"
  ];

  const seoLocationsCol2 = [
    "SEDONA ARIZONA WEDDING VIDEO",
    "CHARLESTON MANOR WEDDING VIDEOGRAPHER",
    "LAKE TAHOE CALIFORNIA WEDDING VIDEOGRAPHER",
    "MAUI HAWAII WEDDING VIDEO",
    "JACKSON HOLE WYOMING WEDDING VIDEOGRAPHER",
    "PALM BEACH FLORIDA WEDDING VIDEO"
  ];

  return (
    <footer className="exact-reference-footer">
      {/* Top Handle Pill */}
      <div className="exact-footer-top-handle">
        <a
          href="https://www.instagram.com/starlinestudios_/"
          target="_blank"
          rel="noreferrer"
          className="exact-footer-handle-link"
        >
          @starlinestudios_
        </a>
      </div>

      {/* Main Multi-Column Content Area */}
      <div className="exact-footer-main-container">
        <div className="exact-footer-grid">
          {/* Column 1: Brand Logo, Nav Links & Tagline */}
          <div className="exact-footer-col exact-col-brand">
            <Link href="/" className="exact-footer-logo-link">
              <img
                src="/Str_logo.png"
                alt="Starline Studio Logo"
                className="exact-footer-logo-img"
              />
            </Link>

            {/* 2-Column Nav Grid */}
            <div className="exact-footer-nav-2col">
              <div className="exact-nav-col">
                <Link href="/portfolio/videography" className="exact-footer-link">VIDEOGRAPHY</Link>
                <Link href="/about" className="exact-footer-link">ABOUT</Link>
                <Link href="/journal" className="exact-footer-link">JOURNAL</Link>
              </div>
              <div className="exact-nav-col">
                <Link href="/portfolio/photography" className="exact-footer-link">PHOTOGRAPHY</Link>
                <Link href="/investment" className="exact-footer-link">INVESTMENT</Link>
                <Link href="/contact" className="exact-footer-link">CONTACT</Link>
              </div>
            </div>

            {/* Editorial Tagline */}
            <div className="exact-footer-tagline-wrap">
              <h3 className="exact-footer-serif-headline">
                Telling stories through beautiful<br />
                and meaningful imagery...
              </h3>
              <p className="exact-footer-sub-tagline">
                PHOTOGRAPHY | CINEMATOGRAPHY | TRAVEL &amp; LIFESTYLE | EDUCATION
              </p>
            </div>
          </div>

          {/* Column 2: SEO Locations Col 1 */}
          <div className="exact-footer-col exact-col-seo">
            <ul className="exact-seo-links-list">
              {seoLocationsCol1.map((loc, idx) => (
                <li key={`loc1-${idx}`}>
                  <Link href="/portfolio" className="exact-seo-item-link">{loc}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: SEO Locations Col 2 */}
          <div className="exact-footer-col exact-col-seo">
            <ul className="exact-seo-links-list">
              {seoLocationsCol2.map((loc, idx) => (
                <li key={`loc2-${idx}`}>
                  <Link href="/portfolio" className="exact-seo-item-link">{loc}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Vertical Featured Editorial Photo */}
          <div className="exact-footer-col exact-col-photo">
            <div className="exact-footer-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop"
                alt="Editorial Destination Bride Still"
                className="exact-footer-photo-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 5: Stay Up To Date Mailing Form */}
          <div className="exact-footer-col exact-col-subscribe">
            <h2 className="exact-subscribe-title">STAY UP TO DATE</h2>
            <p className="exact-subscribe-subtitle">
              Sign up for our mail list and stay up to date with tips, freebies and inspiration
            </p>

            {isSubscribed ? (
              <div className="exact-subscribe-success">
                <span>✓ Thank you for subscribing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="exact-subscribe-form">
                <input
                  type="text"
                  autoComplete="given-name"
                  enterKeyHint="next"
                  placeholder="FIRST NAME"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="exact-subscribe-input"
                  required
                />
                <input
                  type="text"
                  autoComplete="family-name"
                  enterKeyHint="next"
                  placeholder="LAST NAME"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="exact-subscribe-input"
                  required
                />
                <input
                  type="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="email"
                  enterKeyHint="send"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="exact-subscribe-input"
                  required
                />
                <button type="submit" className="exact-subscribe-button">
                  SUBSCRIBE NOW
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar with Socials and Copyright */}
      <div className="exact-footer-bottom-bar">
        <div className="exact-footer-bottom-inner">
          <p className="exact-footer-copyright">
            © 2026 Starline Studios — 4th Generation Wedding Photography &amp; Cinematic Videography (35+ Years in Business)
          </p>

          {/* Social Icons */}
          <div className="exact-footer-socials">
            <a
              href="https://www.instagram.com/starlinestudios_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @starlinestudios_"
              className="social-brand-link is-instagram"
            >
              <span className="social-brand-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span className="social-brand-label">@starlinestudios_</span>
            </a>
          </div>

          {/* Monogram emblem icon & Admin Studio link on right */}
          <div className="exact-footer-monogram" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/admin"
              className="exact-seo-item-link"
              style={{ fontSize: "9px", letterSpacing: "0.22em", opacity: 0.7 }}
            >
              ATELIER ADMIN
            </Link>
            <span className="exact-monogram-circle">✦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
