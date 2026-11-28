import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  getVideographyItems,
  subscribeToPortfolioUpdates,
  type VideoFilmItem
} from "@/lib/portfolioStore";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin, Play, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const videoCategories = [
  "ALL FILMS",
  "Estates & Coastal",
  "California & West",
  "Mountain & Desert",
  "Intimate & Editorial"
] as const;

export default function VideographyPortfolio() {
  const [films, setFilms] = useState<VideoFilmItem[]>(() => getVideographyItems());
  const [activeCategory, setActiveCategory] = useState<string>("ALL FILMS");
  const [activeVideoModal, setActiveVideoModal] = useState<VideoFilmItem | null>(null);

  useEffect(() => {
    return subscribeToPortfolioUpdates(() => {
      setFilms(getVideographyItems());
    });
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const filteredFilms =
    activeCategory === "ALL FILMS"
      ? films
      : films.filter((f) => f.category === activeCategory);

  return (
    <div className="starline-page-shell">
      <Navbar variant="transparent" />

      <main className="starline-page-main">
        {/* ===================================================================
            1. FULL-BLEED CINEMATIC PARALLAX HERO BANNER
            =================================================================== */}
        <section className="portfolio-hero-section" ref={heroRef}>
          <div className="portfolio-hero-bg-container">
            <motion.div
              className="portfolio-hero-bg-img"
              style={{
                y: heroParallax,
                backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2400&auto=format&fit=crop')`
              }}
            />
            <div className="portfolio-hero-overlay" />
          </div>

          <div className="portfolio-hero-content">
            <span className="portfolio-hero-kicker">STARLINE CINEMA // COMMISSIONS</span>
            <h1 className="portfolio-hero-title">Wedding Videography Portfolio</h1>
            <p className="portfolio-hero-subtitle">
              Crafted with vintage anamorphic glass, 35mm motion picture film, and honest human
              emotion
            </p>
          </div>
        </section>

        {/* ===================================================================
            2. STICKY EDITORIAL FILTER BAR + CURATORIAL STUDIO SHORTCUT
            =================================================================== */}
        <section className="portfolio-filter-bar-section">
          <div className="portfolio-filter-container">
            <div className="portfolio-filter-tabs">
              {videoCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`portfolio-filter-tab ${activeCategory === cat ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
              <Link href="/admin" className="portfolio-admin-quick-pill" title="Manage Videography Archive">
                <SlidersHorizontal size={11} />
                <span>CURATE</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. LUXURY CINEMA SHOWCASE CARDS (2-COLUMN WIDESCREEN)
            =================================================================== */}
        <section className="portfolio-gallery-section">
          <div className="portfolio-gallery-container">
            <motion.div layout className="portfolio-video-grid-2col">
              <AnimatePresence>
                {filteredFilms.map((film, idx) => (
                  <motion.div
                    key={film.id}
                    layout
                    initial={{ opacity: 0, y: 28, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.23, 1, 0.32, 1],
                      delay: (idx % 2) * 0.06
                    }}
                    className="portfolio-video-card"
                    onClick={() => setActiveVideoModal(film)}
                  >
                    <div className="portfolio-video-thumb-frame">
                      <img
                        src={film.coverImage}
                        alt={film.title}
                        className="portfolio-video-thumb-img"
                        style={{ objectPosition: film.focalPoint || "center center" }}
                        loading="lazy"
                      />
                      <div className="portfolio-video-play-overlay">
                        <div className="portfolio-video-play-btn">
                          <Play size={24} fill="#ffffff" stroke="#ffffff" />
                        </div>
                      </div>
                      <div className="portfolio-video-badges-row">
                        <span className="portfolio-video-duration-pill">{film.duration}</span>
                        <span className="portfolio-video-format-pill">{film.camera}</span>
                      </div>
                    </div>

                    <div className="portfolio-video-info-box">
                      <div className="portfolio-video-meta-top">
                        <span className="portfolio-video-location">
                          <MapPin size={12} />
                          <span>{film.location}</span>
                        </span>
                        <span className="portfolio-video-year">{film.year}</span>
                      </div>
                      <h3 className="portfolio-video-title">{film.title}</h3>
                      <p className="portfolio-video-desc">{film.subtitle}</p>
                      <p className="portfolio-video-tech-note">{film.details}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ===================================================================
            4. DUAL-FORMAT WORKFLOW STATEMENT
            =================================================================== */}
        <section className="portfolio-statement-break">
          <div className="portfolio-statement-inner">
            <span className="minimal-overline">THE CINEMATIC MEDIUM</span>
            <blockquote className="portfolio-quote">
              “Every wedding is captured on industry-standard Arri Alexa cinema sensors paired with
              authentic 35mm and Super 8mm analog film rolls—resulting in master films of physical
              permanence and timeless emotional gravity.”
            </blockquote>
            <p className="portfolio-quote-author">— STARLINE CINEMA ATELIER</p>
          </div>
        </section>

        {/* ===================================================================
            5. BESPOKE INQUIRY BANNER
            =================================================================== */}
        <section className="portfolio-closing-cta">
          <div className="portfolio-closing-inner">
            <span className="minimal-overline">BESPOKE COMMISSIONS</span>
            <h2 className="portfolio-closing-title">Reserve Your Wedding Date</h2>
            <p className="portfolio-closing-desc">
              Operating out of Dallas, Texas with limited commissions available worldwide each
              season.
            </p>
            <div style={{ marginTop: "28px" }}>
              <Link href="/contact" className="minimal-btn-solid">
                <span>SCHEDULE A CONSULTATION</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          FULLSCREEN THEATER VIDEO PLAYER MODAL
          =================================================================== */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            className="starline-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoModal(null)}
          >
            <button
              className="starline-lightbox-close"
              onClick={() => setActiveVideoModal(null)}
              aria-label="Close Video Player"
            >
              <X size={20} />
            </button>

            <motion.div
              className="starline-video-modal-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="starline-video-player-wrap">
                <video
                  src={activeVideoModal.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="starline-video-player-tag"
                />
              </div>

              <div className="starline-video-modal-caption-bar">
                <div className="starline-video-caption-left">
                  <span className="starline-lightbox-meta-tag">
                    {activeVideoModal.location} — {activeVideoModal.year}
                  </span>
                  <h3 className="starline-lightbox-photo-title">{activeVideoModal.title}</h3>
                  <p className="starline-lightbox-photo-sub">{activeVideoModal.subtitle}</p>
                </div>
                <div className="starline-video-caption-right">
                  <span className="starline-lightbox-medium-pill">{activeVideoModal.camera}</span>
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
