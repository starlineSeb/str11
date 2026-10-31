import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { studioStories, type StoryItem } from "@/data/studioData";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Camera, Film, MapPin, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Portfolio() {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const exhibitionWorks: (StoryItem & {
    formatTag: string;
    edition: string;
    priceTag?: string;
  })[] = [
    {
      id: "newport-monograph",
      title: "Monograph I: Newport",
      subtitle: "Gilded Age oceanfront mansions and twilight Atlantic breezes",
      category: "Intimate Celebrations",
      location: "Newport, Rhode Island",
      year: "2026",
      coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop"
      ],
      fieldNotes: "A multi-day coastal celebration documented across the historic grand lawns of Cliff Walk and Rosecliff. Shot entirely on bespoke anamorphic glass and natural 35mm film emulsions.",
      details: {
        camera: "Arri Alexa Mini LF & Leica M11",
        light: "Atlantic Ocean Mist & Candlelight",
        season: "Autumn Solstice 2026",
        guests: "80 Guests"
      },
      formatTag: "35MM + 4K CINEMA",
      edition: "SERIES 01 // 2026"
    },
    {
      id: "napa-monograph",
      title: "Monograph II: Napa Valley",
      subtitle: "Golden vineyard hills and sun-drenched stone courtyards",
      category: "Intimate Celebrations",
      location: "Napa Valley, California",
      year: "2026",
      coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
      ],
      fieldNotes: "Overlooking rolling vineyard terraces, this private estate celebration was captured with a documentary sensitivity prioritizing unrehearsed laughter and harvest champagne toasts.",
      details: {
        camera: "RED V-Raptor & Hasselblad 500C/M",
        light: "Golden California Dusk & Amber Torches",
        season: "Summer 2026",
        guests: "120 Guests"
      },
      formatTag: "KODAK 500T EMULSION",
      edition: "SERIES 02 // 2026"
    },
    {
      id: "big-sur-cliffs",
      title: "Monograph III: Big Sur",
      subtitle: "Pacific coastal cliffs and ancient redwood vows",
      category: "Intimate Celebrations",
      location: "Big Sur, California",
      year: "2025",
      coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop"
      ],
      fieldNotes: "Captured amid towering ancient redwoods and sea-spray headlands along Highway 1. The sunset painted the Pacific in radiant rose gold.",
      details: {
        camera: "Leica SL2-S & 35mm Summilux",
        light: "Golden Sunset & Ocean Glow",
        season: "Late Spring 2025"
      },
      formatTag: "35MM LEICA STILLS",
      edition: "SERIES 03 // 2025"
    },
    {
      id: "high-sierra",
      title: "Monograph IV: High Sierra",
      subtitle: "A silent twilight over glacial granite water",
      category: "Wild Landscapes",
      location: "High Sierra & Lake Tahoe, California",
      year: "2026",
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop"
      ],
      fieldNotes: "Standing at the edge of the glacial shelf as the wind died down. The blue hour in the Sierra creates a cool gradient across the water that no studio light could ever manufacture.",
      details: {
        camera: "Medium Format Digital & 35mm Portra 400",
        light: "Natural Twilight / Blue Hour",
        season: "Late Autumn 2026"
      },
      formatTag: "MEDIUM FORMAT 120",
      edition: "SERIES 04 // 2026"
    }
  ];

  return (
    <div className="starline-page-shell mucha-page-bg">
      <Navbar variant="light" />

      <main className="starline-page-main">
        {/* ===================================================================
            SECTION 1: MUCHA MUSEUM HERO (ARCHITECTURAL GRID + ARCH FRAME + GRAND PERSPECTIVE)
            =================================================================== */}
        <section className="mucha-hero-section">
          {/* Subtle drafting guideline background overlay */}
          <div className="mucha-drafting-lines" />

          <div className="mucha-hero-grid">
            {/* Left Content Column */}
            <div className="mucha-hero-left">
              <h1 className="mucha-hero-display-title">
                STARLINE ARCHIVE
              </h1>

              <div className="mucha-hero-narrative-row">
                <div className="mucha-hero-copy">
                  <p className="mucha-hero-subtitle">
                    A curated archive of living wedding cinema and 35mm fine art photography, documenting love across Newport, Napa Valley, Big Sur, and iconic destinations nationwide.
                  </p>
                  
                  <a href="#exhibition" className="mucha-see-more-link">
                    <span>Explore Archive</span>
                    <div className="mucha-circle-arrow">⟶</div>
                  </a>
                </div>

                {/* Arch-Framed Portrait */}
                <div className="mucha-arch-portrait">
                  <img
                    src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop"
                    alt="Archival Portrait"
                    className="mucha-arch-img"
                  />
                  <div className="mucha-arch-badge">35MM</div>
                </div>
              </div>
            </div>

            {/* Right Perspective Gallery Image Column */}
            <div className="mucha-hero-right">
              <div className="mucha-gallery-perspective-frame">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
                  alt="Starline Museum Gallery Exhibition Hall"
                  className="mucha-perspective-img"
                />
                <div className="mucha-perspective-overlay">
                  <span className="mucha-perspective-tag">THE PERMANENT COLLECTION // ATELIER</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: ABOUT THE WORKS (ROSE MARBLE PLINTH + OVERLAPPING FRAME + RED SEAL)
            =================================================================== */}
        <section className="mucha-about-section">
          <div className="mucha-about-grid">
            {/* Left Marble Plinth & Overlapping Framed View */}
            <div className="mucha-about-left">
              <div className="mucha-marble-pillar" />
              
              <div className="mucha-overlapping-frame">
                <img
                  src="/wd1.jpg"
                  alt="Starline Atelier Gallery Exhibition"
                  className="mucha-overlapping-img"
                />
                
                {/* Floating Red Circular Seal Stamp */}
                <div className="mucha-red-seal">
                  <span>MORE</span>
                </div>
              </div>
            </div>

            {/* Right Narrative Copy Block */}
            <div className="mucha-about-right">
              <h2 className="mucha-about-display-title">
                ABOUT
              </h2>

              <div className="mucha-about-text-wrap">
                <p className="mucha-about-paragraph">
                  Starline Studios is a fourth-generation family-owned atelier with over 35 years of visual storytelling heritage. We provide bespoke fine-art photography and cinematic videography for all wedding styles—from intimate celebrations, engagement sessions, and church directory gatherings to grand luxury estate weddings and worldwide destination celebrations.
                </p>
                <p className="mucha-about-paragraph">
                  Every package is customized to meet your unique celebration needs and vision without compromising quality. As a signature studio privilege, all dual photography and videography commissions receive complimentary broadcast-grade live streaming coverage so overseas and remote loved ones can share in your celebration.
                </p>
                <p className="mucha-about-hours">
                  Dallas Atelier &amp; Destination Commissions worldwide.<br />
                  35+ Years in Business // Fourth-Generation Family Studio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: EXHIBITION SERIES (4 ARCHIVAL CARDS + MARBLE BASELINE + ROTATING SEAL)
            =================================================================== */}
        <section className="mucha-exhibition-section" id="exhibition">
          <div className="mucha-exhibition-header">
            <h2 className="mucha-exhibition-title">
              STARLINE GALLERY
            </h2>

            {/* Rotating Circular Stamp Badge */}
            <div className="mucha-stamp-badge-wrap">
              <div className="mucha-circular-stamp">
                <svg viewBox="0 0 100 100" className="mucha-stamp-svg">
                  <path
                    id="stampCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="mucha-stamp-text">
                    <textPath href="#stampCirclePath" startOffset="0%">
                      • STARLINE ATELIER • THE ARCHIVE COLLECTION
                    </textPath>
                  </text>
                </svg>
                <div className="mucha-stamp-center">
                  <span>SEE ALL</span>
                </div>
              </div>
            </div>
          </div>

          {/* The 4 Museum Archival Cards */}
          <div className="mucha-cards-grid">
            {exhibitionWorks.map((work, idx) => (
              <div
                key={work.id}
                className="mucha-art-card"
                onClick={() => setSelectedStory(work)}
                role="button"
                tabIndex={0}
                aria-label={`View ${work.title}`}
              >
                <div className="mucha-card-inner">
                  {/* Artwork Image Container with Smooth Hover Reveal */}
                  <div className="mucha-card-img-wrap">
                    <img
                      src={work.coverImage}
                      alt={work.title}
                      className="mucha-card-img"
                      loading="lazy"
                    />

                    {/* Smooth Hover Overlay Revealing Name & Details */}
                    <div className="mucha-card-hover-overlay">
                      <div className="mucha-card-hover-inner">
                        <span className="mucha-hover-badge">{work.formatTag}</span>
                        <h4 className="mucha-hover-title">{work.title}</h4>
                        <p className="mucha-hover-loc">{work.location}</p>
                        <div className="mucha-hover-cta">
                          <span>VIEW ARCHIVE</span>
                          <ArrowUpRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean Museum Metadata Footer */}
                  <div className="mucha-card-info">
                    <span className="mucha-card-series">{work.edition}</span>
                    <h3 className="mucha-card-title">{work.title}</h3>
                    <div className="mucha-card-action">
                      <span>INQUIRE</span>
                      <span className="mucha-card-arrow">⟶</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Marble Baseline Plinth */}
          <div className="mucha-marble-baseline" />
        </section>

        {/* ===================================================================
            SECTION 4: ATELIER & LOCATION MAP (SPLIT IVORY & CHARCOAL ARCHITECTURE)
            =================================================================== */}
        <section className="mucha-location-section">
          <div className="mucha-location-grid">
            {/* Left Cream Card */}
            <div className="mucha-location-left">
              <div className="mucha-sparkle-icon">
                <Sparkles size={16} />
              </div>

              <h2 className="mucha-location-heading">
                STARLINE ATELIER<br />
                DALLAS &amp; BEYOND:
              </h2>

              <div className="mucha-location-address">
                <p>DALLAS DESIGN DISTRICT ATELIER</p>
                <p>DALLAS, TEXAS // EST. 2023</p>
                <p className="mucha-location-hours">
                  COMMISSIONS BY PRIVATE INVITATION<br />
                  WORLDWIDE DESTINATION ROUTING
                </p>
              </div>

              <Link href="/contact" className="mucha-location-btn">
                <span>INQUIRE FOR DATES</span>
                <span className="mucha-btn-arrow">⟶</span>
              </Link>
            </div>

            {/* Right Map & Architecture Still */}
            <div className="mucha-location-right">
              <div className="mucha-map-frame">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
                  alt="Worldwide Destination Route Map"
                  className="mucha-map-img"
                />
                <div className="mucha-map-pin">
                  <MapPin size={22} className="mucha-pin-icon" />
                  <span className="mucha-pin-label">PHILADELPHIA / GLOBAL</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Story Deep-Dive Lightbox Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            className="story-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              className="story-modal-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="story-modal-header">
                <div>
                  <span className="story-modal-cat">{selectedStory.category}</span>
                  <h2 className="story-modal-title">{selectedStory.title}</h2>
                  <p style={{ fontSize: "12px", color: "var(--ink-subtle)", margin: "4px 0 0" }}>
                    {selectedStory.location} — {selectedStory.year}
                  </p>
                </div>
                <button
                  className="story-modal-close-btn"
                  onClick={() => setSelectedStory(null)}
                  aria-label="Close story"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="story-modal-body">
                <div className="story-modal-gallery">
                  {selectedStory.galleryImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`${selectedStory.title} ${idx + 1}`} />
                  ))}
                </div>

                <div className="story-modal-notes">
                  <p style={{ margin: 0 }}>{selectedStory.fieldNotes}</p>
                </div>

                <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                  <Link
                    href={`/contact?story=${selectedStory.id}`}
                    className="minimal-text-link"
                    onClick={() => setSelectedStory(null)}
                  >
                    <span>Inquire for Similar Commission</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer showClosingCta={true} />
    </div>
  );
}
