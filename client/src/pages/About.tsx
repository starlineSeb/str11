import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Smooth scroll animations
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);

  return (
    <div className="starline-page-shell">
      {/* Transparent Navbar over hero */}
      <Navbar variant="transparent" />

      <main className="starline-page-main">
        {/* ===================================================================
            1. HERO: MINIMAL EDITORIAL HEADLINE & FRESH CINEMATIC IMAGE
            =================================================================== */}
        <section className="gds-hero-section" ref={heroRef}>
          {/* Parallax Background Image */}
          <div className="gds-hero-bg-container">
            <motion.div
              className="gds-hero-bg-img"
              style={{
                y: heroBgY,
                backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2400&auto=format&fit=crop')`
              }}
            />
            <div className="gds-hero-gradient-overlay" />
          </div>

          {/* Hero Content Grid: Centered Short Headline + Right Sidebar Text */}
          <div className="gds-hero-content-container">
            {/* Centered Main Title (Minimal, lowered, impactful) */}
            <div className="gds-hero-center-box">
              <span className="gds-hero-italic-kicker">inspired by people and love...</span>
              <h1 className="gds-hero-main-title">
                creative wedding cinematography &amp;<br />
                35mm storytelling
              </h1>
            </div>

            {/* Right Side Minimal Text */}
            <div className="gds-hero-right-box">
              <p className="gds-hero-right-desc">
                Crafting living heirlooms and honest visual poetry for extraordinary celebrations worldwide.
              </p>
              <Link href="/portfolio" className="gds-hero-right-link">
                <span>visit portfolio</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================================
            2. OWNER SECTION: SAJAN (CLEAN CENTERED 2-COLUMN LAYOUT)
            =================================================================== */}
        <section className="gds-owner-section">
          <div className="gds-owner-clean-container">
            <div className="gds-owner-grid">
              {/* Left: Saji Portrait */}
              <div className="gds-owner-photo-col">
                <div className="gds-owner-photo-box">
                  <img
                    src="/wd1.jpg"
                    alt="Starline Saji - Fourth Generation Director"
                    className="gds-owner-photo"
                  />
                  <span className="gds-owner-caption">
                    STARLINE SAJI // 4TH-GENERATION DIRECTOR
                  </span>
                </div>
              </div>

              {/* Right: Saji Story, Philosophy & Badges */}
              <div className="gds-owner-info-col">
                <div className="gds-owner-header">
                  <h2 className="gds-owner-name">STARLINE SAJI</h2>
                  <p className="gds-owner-subtags">
                    35+ YEARS IN BUSINESS // FOURTH-GENERATION FAMILY ATELIER
                  </p>
                </div>

                <div className="gds-owner-bio">
                  <p>
                    Starline Studios is a fourth-generation family-owned studio with over 35 years of visual storytelling heritage. We combine generational craftsmanship, creative intuition, and state-of-the-art camera and cinema technology to provide exceptional fine-art photography and cinematic wedding films.
                  </p>
                  <p>
                    Our team is dedicated to understanding each client&apos;s unique celebration vision. We design customized packages that fit your budget while delivering unforgettable, heirloom-quality results—whether you are planning an intimate church celebration, a cultural diaspora gathering, or an opulent multi-day luxury estate wedding.
                  </p>
                  <p>
                    Based in Dallas, Texas and traveling worldwide, we believe a wedding is a timeless reminder of human connection, family, and shared love. Our documentary approach creates an unhurried, calm atmosphere where real emotion unfolds naturally without stiff or artificial poses.
                  </p>
                  <p>
                    As a signature studio privilege, we provide <strong>complimentary broadcast-grade Live Streaming</strong> when you book both photography and videography collections, ensuring grandparents, overseas relatives, and distant loved ones are fully present on your day.
                  </p>
                </div>

                {/* Studio Badges */}
                <div className="gds-owner-badges">
                  <div className="gds-owner-badge-item">
                    <strong>35+ Years Heritage</strong>
                    <span>Four Generations</span>
                  </div>
                  <div className="gds-owner-badge-item">
                    <strong>Dallas Base</strong>
                    <span>Commissions Worldwide</span>
                  </div>
                  <div className="gds-owner-badge-item">
                    <strong>Dual Medium</strong>
                    <span>35mm Film + 4K Cinema</span>
                  </div>
                  <div className="gds-owner-badge-item">
                    <strong>Special Offer</strong>
                    <span>Free Live Streaming</span>
                  </div>
                </div>

                {/* Contact Us Button */}
                <div className="gds-owner-btn-wrap">
                  <Link href="/contact" className="gds-contact-btn">
                    <span>CONNECT WITH SAJI</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. FEATURED ON PUBLICATION LOGOS (ACTUAL LUXURY INDUSTRY SVG LOGOS)
            =================================================================== */}
        <section className="gds-featured-on-section">
          <div className="gds-featured-on-inner">
            <h3 className="gds-featured-on-title">featured on</h3>

            <div className="gds-logos-grid">
              {/* 1. VOGUE WEDDINGS */}
              <div className="gds-logo-item" title="Vogue Weddings">
                <div className="gds-svg-logo vogue-logo">
                  <span className="gds-logo-didone">VOGUE</span>
                  <span className="gds-logo-sub">WEDDINGS</span>
                </div>
              </div>

              {/* 2. HARPER'S BAZAAR */}
              <div className="gds-logo-item" title="Harper's Bazaar">
                <div className="gds-svg-logo bazaar-logo">
                  <span className="gds-logo-tiny">HARPER'S</span>
                  <span className="gds-logo-didone-bold">BAZAAR</span>
                </div>
              </div>

              {/* 3. BRIDES */}
              <div className="gds-logo-item" title="Brides Magazine">
                <div className="gds-svg-logo brides-logo">
                  <span className="gds-logo-modern-serif">BRIDES</span>
                </div>
              </div>

              {/* 4. THE LANE */}
              <div className="gds-logo-item" title="The Lane">
                <div className="gds-svg-logo thelane-logo">
                  <span className="gds-logo-wide-sans">THE LANE</span>
                </div>
              </div>

              {/* 5. STYLE ME PRETTY */}
              <div className="gds-logo-item" title="Style Me Pretty">
                <div className="gds-svg-logo smp-logo">
                  <span className="gds-logo-script">Style Me</span>
                  <span className="gds-logo-smp-sub">PRETTY</span>
                </div>
              </div>

              {/* 6. OVER THE MOON */}
              <div className="gds-logo-item" title="Over The Moon">
                <div className="gds-svg-logo otm-logo">
                  <span className="gds-logo-otm-title">OVER THE MOON</span>
                </div>
              </div>

              {/* 7. JUNEBUG WEDDINGS */}
              <div className="gds-logo-item" title="Junebug Weddings">
                <div className="gds-svg-logo junebug-logo">
                  <span className="gds-logo-circle-badge">★</span>
                  <span className="gds-logo-junebug-text">junebug weddings</span>
                </div>
              </div>

              {/* 8. RANGEFINDER */}
              <div className="gds-logo-item" title="Rangefinder Magazine">
                <div className="gds-svg-logo rf-logo">
                  <span className="gds-logo-rf-mono">Rf</span>
                  <span className="gds-logo-rf-sub">RANGEFINDER</span>
                </div>
              </div>

              {/* 9. WEDDING SPARROW */}
              <div className="gds-logo-item" title="Wedding Sparrow">
                <div className="gds-svg-logo sparrow-logo">
                  <svg className="gds-sparrow-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  <span className="gds-logo-sparrow-text">WEDDING SPARROW</span>
                </div>
              </div>

              {/* 10. GREEN WEDDING SHOES */}
              <div className="gds-logo-item" title="Green Wedding Shoes">
                <div className="gds-svg-logo gws-logo">
                  <span className="gds-logo-gws">green wedding shoes</span>
                </div>
              </div>

              {/* 11. CARATS & CAKE */}
              <div className="gds-logo-item" title="Carats & Cake">
                <div className="gds-svg-logo carats-logo">
                  <span className="gds-logo-carats">CARATS <span className="amp">&amp;</span> CAKE</span>
                </div>
              </div>

              {/* 12. THE ANTI-BRIDE */}
              <div className="gds-logo-item" title="The Anti-Bride">
                <div className="gds-svg-logo antibride-logo">
                  <span className="gds-logo-antibride">THE ANTI-BRIDE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            WHY CHOOSE STARLINE STUDIOS (THE HERITAGE & CRAFTSMANSHIP PILLARS)
            =================================================================== */}
        <section className="gds-why-choose-section">
          <div className="gds-why-choose-inner">
            <div className="gds-why-choose-header">
              <span className="minimal-overline">DECEMBERED ARTISTRY</span>
              <h2 className="gds-why-choose-title">WHY CHOOSE STARLINE STUDIOS</h2>
              <p className="gds-why-choose-subtitle">
                Four generations of dedication to unhurried storytelling, generational presence, and cutting-edge optical mastery.
              </p>
            </div>

            <div className="gds-why-choose-grid">
              <div className="gds-why-card">
                <span className="gds-why-num">01</span>
                <h3 className="gds-why-heading">35+ Years &amp; 4 Generations</h3>
                <p className="gds-why-desc">
                  A rare multi-generational legacy in Dallas. Decades of refined expertise ensure your memories are handled with deep reverence, technical poise, and creative continuity.
                </p>
              </div>

              <div className="gds-why-card">
                <span className="gds-why-num">02</span>
                <h3 className="gds-why-heading">State-of-the-Art Optical Mastery</h3>
                <p className="gds-why-desc">
                  We pair high-end cinema bodies (Arri, RED) and Leica prime lenses with authentic 35mm analog film rolls to yield rich skin tones and unforgettable cinematic color.
                </p>
              </div>

              <div className="gds-why-card">
                <span className="gds-why-num">03</span>
                <h3 className="gds-why-heading">Complimentary Global Live Streaming</h3>
                <p className="gds-why-desc">
                  Enjoy complimentary high-definition digital live streaming when you book both photography and videography packages, connecting family and loved ones worldwide in real time.
                </p>
              </div>

              <div className="gds-why-card">
                <span className="gds-why-num">04</span>
                <h3 className="gds-why-heading">Flexible Packages for All Budgets</h3>
                <p className="gds-why-desc">
                  From budget-conscious intimate celebrations and church directory gatherings to grand multi-day luxury estate weddings, we create customized collections designed for your needs.
                </p>
              </div>

              <div className="gds-why-card">
                <span className="gds-why-num">05</span>
                <h3 className="gds-why-heading">Personalized Customer Service</h3>
                <p className="gds-why-desc">
                  Unhurried, personal care from your initial consultation through final heirloom delivery. We guide with warmth and let your celebration breathe without stiff, forced poses.
                </p>
              </div>

              <div className="gds-why-card">
                <span className="gds-why-num">06</span>
                <h3 className="gds-why-heading">Luxury Wedding Experience</h3>
                <p className="gds-why-desc">
                  Dedicated multi-artist teams, drone cinematography, bespoke Italian leather-bound albums, and full event telecasting available for extraordinary destination celebrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. VIDEO BANNER: hero-video.mp4 WITH TESTIMONIAL & TITLE
            =================================================================== */}
        <section className="gds-quote-parallax-section">
          <div className="gds-quote-bg-container">
            <video
              className="gds-quote-bg-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/vid/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="gds-quote-dark-overlay" />
          </div>

          <div className="gds-quote-content-container">
            {/* Top Right Testimonial Quote Box */}
            <div className="gds-testimonial-box">
              <blockquote className="gds-testimonial-text">
                “We were lucky enough to have Sajan and the Starline team capture our wedding... the film is a masterclass in honest emotion and breathtaking cinematic beauty. Everything was seamless, calm, and discreet. Watching our film brings tears of joy every single time.”
              </blockquote>
              <cite className="gds-testimonial-author">
                — Victoria &amp; Harrison
              </cite>
            </div>

            {/* Bottom Left Bold Statement */}
            <div className="gds-quote-bottom-title-wrap">
              <h2 className="gds-quote-bottom-title">
                ETERNALISING REAL LOVING MEMORIES<br />
                OF THAT UNIQUE DAY IN YOUR LIFE...
              </h2>
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. VISIT OUR PORTFOLIO (3-COLUMN LUXURY CARDS)
            =================================================================== */}
        <section className="gds-portfolio-links-section">
          <div className="gds-portfolio-links-container">
            <h2 className="gds-portfolio-section-title">VISIT OUR PORTFOLIO</h2>

            <div className="gds-portfolio-3col-grid">
              {/* Card 1: Wedding Photography */}
              <Link href="/portfolio/photography" className="gds-portfolio-card">
                <div className="gds-portfolio-card-frame">
                  <img
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop"
                    alt="Starline Wedding Photography"
                    className="gds-portfolio-card-img"
                  />
                </div>
                <h3 className="gds-portfolio-card-title">WEDDING PHOTOGRAPHY</h3>
              </Link>

              {/* Card 2: Wedding Cinematography */}
              <Link href="/portfolio/videography" className="gds-portfolio-card">
                <div className="gds-portfolio-card-frame">
                  <img
                    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop"
                    alt="Starline Wedding Cinematography"
                    className="gds-portfolio-card-img"
                  />
                </div>
                <h3 className="gds-portfolio-card-title">WEDDING CINEMATOGRAPHY</h3>
              </Link>

              {/* Card 3: Destination & Lifestyle */}
              <Link href="/portfolio" className="gds-portfolio-card">
                <div className="gds-portfolio-card-frame">
                  <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop"
                    alt="Starline Travel & Lifestyle"
                    className="gds-portfolio-card-img"
                  />
                </div>
                <h3 className="gds-portfolio-card-title">TRAVEL &amp; LIFESTYLE</h3>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer showClosingCta={false} />
    </div>
  );
}
