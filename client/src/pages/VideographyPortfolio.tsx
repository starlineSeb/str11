import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Film, MapPin, Play, Sparkles, Volume2, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "wouter";

interface VideoFilmItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Estates & Coastal" | "California & West" | "Mountain & Desert" | "Intimate & Editorial";
  location: string;
  year: string;
  coverImage: string;
  videoUrl: string;
  duration: string;
  camera: string;
  details: string;
}

const videographyFilms: VideoFilmItem[] = [
  {
    id: "film-1",
    title: "Oceanfront Estate // Newport",
    subtitle: "Gilded Age mansions along the Atlantic Cliff Walk",
    category: "Estates & Coastal",
    location: "Newport, Rhode Island",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/new_section_img_optimized.mp4",
    duration: "4:32",
    camera: "Arri Alexa Mini LF // 35mm Anamorphic",
    details: "Shot on Arri Alexa Mini LF & Cooke Anamorphic Primes with live orchestral score"
  },
  {
    id: "film-2",
    title: "Meadowood Vineyard // Napa Valley",
    subtitle: "Harvest golden hour & private courtyard candlelit banquet",
    category: "California & West",
    location: "Napa Valley, California",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/hero-video.mp4",
    duration: "5:18",
    camera: "RED V-Raptor // Leica Summilux",
    details: "Shot on RED V-Raptor 8K VV & Leica Summilux glass with Super 8mm analog textures"
  },
  {
    id: "film-3",
    title: "High Sierra Twilight Vows",
    subtitle: "Glacial granite reflection and quiet mountain stillness",
    category: "Mountain & Desert",
    location: "Lake Tahoe, California",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/new_section_img_optimized.mp4",
    duration: "3:45",
    camera: "35mm Analog Cine Film Hybrid",
    details: "Natural Twilight & Kodak Vision3 500T 35mm motion picture film stock"
  },
  {
    id: "film-4",
    title: "Dallas Atelier Bespoke Celebration",
    subtitle: "Modern Texas architectural romance & black-tie evening",
    category: "Intimate & Editorial",
    location: "Dallas, Texas",
    year: "2026",
    coverImage: "/wd1.jpg",
    videoUrl: "/vid/new_section_img_optimized.mp4",
    duration: "3:20",
    camera: "Arri 4K Cinema + 35mm Emulsion",
    details: "Dallas Home Base Signature Commission with custom acoustic arrangement"
  },
  {
    id: "film-5",
    title: "Sedona Red Rock Canyon Story",
    subtitle: "Piñon pine breeze and starlit open-air harvest table",
    category: "Mountain & Desert",
    location: "Sedona, Arizona",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/hero-video.mp4",
    duration: "6:10",
    camera: "4K Master Cinema + Super 8",
    details: "Documentary Audio Recording & Handcrafted Super 8mm color emulsion"
  },
  {
    id: "film-6",
    title: "Big Sur Redwood Headlands",
    subtitle: "Pacific ocean spray and emotional personal vows",
    category: "California & West",
    location: "Big Sur, California",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/hero-video.mp4",
    duration: "4:50",
    camera: "Arri Alexa Mini LF Cinema",
    details: "Natural coastal light and multi-track spatial audio master"
  }
];

const videoCategories = [
  "ALL FILMS",
  "Estates & Coastal",
  "California & West",
  "Mountain & Desert",
  "Intimate & Editorial"
] as const;

export default function VideographyPortfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL FILMS");
  const [activeVideoModal, setActiveVideoModal] = useState<VideoFilmItem | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const filteredFilms = activeCategory === "ALL FILMS"
    ? videographyFilms
    : videographyFilms.filter((f) => f.category === activeCategory);

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
              Crafted with vintage anamorphic glass, 35mm motion picture film, and honest human emotion
            </p>
          </div>
        </section>

        {/* ===================================================================
            2. LUXURY CINEMA SHOWCASE CARDS (2-COLUMN WIDESCREEN)
            =================================================================== */}
        <section className="portfolio-gallery-section">
          <div className="portfolio-gallery-container">
            <motion.div layout className="portfolio-video-grid-2col">
              <AnimatePresence>
                {filteredFilms.map((film, idx) => (
                  <motion.div
                    key={film.id}
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.23, 1, 0.32, 1],
                      delay: (idx % 2) * 0.15
                    }}
                    className="portfolio-video-card"
                    onClick={() => setActiveVideoModal(film)}
                  >
                    <div className="portfolio-video-thumb-frame">
                      <img
                        src={film.coverImage}
                        alt={film.title}
                        className="portfolio-video-thumb-img"
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
              “Every wedding is captured on industry-standard Arri Alexa cinema sensors paired with authentic 35mm and Super 8mm analog film rolls—resulting in master films of physical permanence and timeless emotional gravity.”
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
              Operating out of Dallas, Texas with limited commissions available worldwide each season.
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
