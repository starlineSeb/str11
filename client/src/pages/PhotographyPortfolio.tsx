import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  getPhotographyItems,
  subscribeToPortfolioUpdates,
  type PhotoItem
} from "@/lib/portfolioStore";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const categories = [
  "ALL COMMISSIONS",
  "Estates & Coastal",
  "California & West",
  "Mountain & Desert",
  "Intimate & Editorial"
] as const;

export default function PhotographyPortfolio() {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => getPhotographyItems());
  const [activeCategory, setActiveCategory] = useState<string>("ALL COMMISSIONS");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    return subscribeToPortfolioUpdates(() => {
      setPhotos(getPhotographyItems());
    });
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const filteredPhotos =
    activeCategory === "ALL COMMISSIONS"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredPhotos.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredPhotos.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <div className="starline-page-shell">
      <Navbar variant="transparent" />

      <main className="starline-page-main">
        {/* ===================================================================
            1. FULL-BLEED EDITORIAL PARALLAX HERO BANNER
            =================================================================== */}
        <section className="portfolio-hero-section" ref={heroRef}>
          <div className="portfolio-hero-bg-container">
            <motion.div
              className="portfolio-hero-bg-img"
              style={{
                y: heroParallax,
                backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2400&auto=format&fit=crop')`
              }}
            />
            <div className="portfolio-hero-overlay" />
          </div>

          <div className="portfolio-hero-content">
            <span className="portfolio-hero-kicker">STARLINE ATELIER // 35MM ARCHIVE</span>
            <h1 className="portfolio-hero-title">Wedding Photography Portfolio</h1>
            <p className="portfolio-hero-subtitle">
              Living heirlooms of natural light, quiet grace, and 35mm analog emulsion
            </p>
          </div>
        </section>

        {/* ===================================================================
            2. STICKY EDITORIAL FILTER BAR + CURATORIAL STUDIO SHORTCUT
            =================================================================== */}
        <section className="portfolio-filter-bar-section">
          <div className="portfolio-filter-container">
            <div className="portfolio-filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`portfolio-filter-tab ${activeCategory === cat ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                >
                  {cat}
                </button>
              ))}
              <Link href="/admin" className="portfolio-admin-quick-pill" title="Manage Photography Archive">
                <SlidersHorizontal size={11} />
                <span>CURATE</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. CURATED EDITORIAL GALLERY (LOCKED 4:5 ALIGNMENT ARCHITECTURE)
            =================================================================== */}
        <section className="portfolio-gallery-section">
          <div className="portfolio-gallery-container">
            <motion.div layout className="portfolio-photo-grid">
              <AnimatePresence>
                {filteredPhotos.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.23, 1, 0.32, 1],
                      delay: (idx % 3) * 0.05
                    }}
                    className="portfolio-photo-card"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <div className="portfolio-photo-inner">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="portfolio-photo-img"
                        style={{ objectPosition: photo.focalPoint || "center center" }}
                        loading="lazy"
                      />
                      <div className="portfolio-photo-overlay">
                        <div className="portfolio-photo-top-meta">
                          <span className="portfolio-badge-pill">{photo.medium}</span>
                          <span className="portfolio-badge-pill">{photo.year}</span>
                        </div>
                        <div className="portfolio-photo-bottom-meta">
                          <h3 className="portfolio-card-heading">{photo.title}</h3>
                          <p className="portfolio-card-location">
                            <MapPin size={12} />
                            <span>{photo.location}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ===================================================================
            4. EDITORIAL CRAFT PHILOSOPHY BREAK
            =================================================================== */}
        <section className="portfolio-statement-break">
          <div className="portfolio-statement-inner">
            <span className="minimal-overline">THE PHOTOGRAPHIC APPROACH</span>
            <blockquote className="portfolio-quote">
              “We look for the quiet moments in between: the deep breath before walking down the
              aisle, the golden light grazing an evening banquet, and spontaneous laughter shared
              with those you love most.”
            </blockquote>
            <p className="portfolio-quote-author">— SAJAN // PRINCIPAL ARTIST</p>
          </div>
        </section>

        {/* ===================================================================
            5. BESPOKE INQUIRY BANNER
            =================================================================== */}
        <section className="portfolio-closing-cta">
          <div className="portfolio-closing-inner">
            <span className="minimal-overline">BESPOKE COMMISSIONS</span>
            <h2 className="portfolio-closing-title">Document Your Celebration</h2>
            <p className="portfolio-closing-desc">
              Operating out of Dallas, Texas and accepting 18 bespoke wedding commissions worldwide
              each year.
            </p>
            <div style={{ marginTop: "28px" }}>
              <Link href="/contact" className="minimal-btn-solid">
                <span>INQUIRE FOR YOUR DATE</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          FULLSCREEN LUXURY LIGHTBOX MODAL
          =================================================================== */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="starline-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="starline-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            <button
              className="starline-lightbox-nav prev"
              onClick={handlePrevPhoto}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="starline-lightbox-nav next"
              onClick={handleNextPhoto}
              aria-label="Next Photo"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              className="starline-lightbox-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="starline-lightbox-img-wrap">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="starline-lightbox-img"
                />
              </div>

              <div className="starline-lightbox-caption-bar">
                <div className="starline-lightbox-caption-left">
                  <span className="starline-lightbox-meta-tag">
                    {activePhoto.location} — {activePhoto.year}
                  </span>
                  <h3 className="starline-lightbox-photo-title">{activePhoto.title}</h3>
                  <p className="starline-lightbox-photo-sub">{activePhoto.subtitle}</p>
                </div>
                <div className="starline-lightbox-caption-right">
                  <span className="starline-lightbox-medium-pill">{activePhoto.medium}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer showClosingCta={false} />
    </div>
  );
}
