import { Instagram, Youtube } from "lucide-react";
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
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="exact-footer-handle-link"
        >
          @starline.cinema
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
                  placeholder="FIRST NAME"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="exact-subscribe-input"
                  required
                />
                <input
                  type="text"
                  placeholder="LAST NAME"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="exact-subscribe-input"
                  required
                />
                <input
                  type="email"
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
            © 2026 Starline Studio — Destination Wedding Photographer and Videographer
          </p>

          {/* Social Icons */}
          <div className="exact-footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={17} />
            </a>
            <a href="https://vimeo.com" target="_blank" rel="noreferrer" aria-label="Vimeo">
              <span style={{ fontWeight: 700, fontSize: "14px", fontStyle: "italic", fontFamily: "serif" }}>v</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <span style={{ fontWeight: 700, fontSize: "14px", fontFamily: "sans-serif" }}>f</span>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
              <span style={{ fontWeight: 700, fontSize: "14px", fontFamily: "serif", fontStyle: "italic" }}>P</span>
            </a>
          </div>

          {/* Monogram emblem icon on right */}
          <div className="exact-footer-monogram">
            <span className="exact-monogram-circle">✦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
