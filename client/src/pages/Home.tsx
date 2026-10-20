/**
 * STARLINE / ULTRA-MINIMALIST LUXURY EDITORIAL & CINEMATOGRAPHY
 * Inspired by Gione da Silva (gionedasilva.com)
 * Pure White Canvas, Deep Black Typography, Minimal Lines, Large Cinematic 16:9 Visuals,
 * Automatic Slideshows, Dallas Atelier Heritage, and Consultation Appointment Booking.
 */
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calendar, Check, Clock, MapPin, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

// Slideshow images for Featured Film 1 (Newport)
const newportSlideshow = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
];

// Slideshow images for Featured Film 2 (Napa Valley)
const napaSlideshow = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&auto=format&fit=crop"
];

export default function Home() {
  // Slideshow active index states
  const [slideIdx1, setSlideIdx1] = useState(0);
  const [slideIdx2, setSlideIdx2] = useState(0);

  // Dynamic Typewriter Writing strictly for "Starline"
  const starlineText = "Starline";
  const [typedStarline, setTypedStarline] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Appointment Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    destination: "",
    weddingDate: ""
  });
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  // Continuous Fluid Writing & Deleting Animation Loop for "Starline" only
  useEffect(() => {
    let typingSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && typedStarline === starlineText) {
      setIsTypingDone(true);
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
        setIsTypingDone(false);
      }, 3500);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && typedStarline === "") {
      setIsDeleting(false);
      return;
    }

    const timer = setTimeout(() => {
      setTypedStarline((prev) =>
        isDeleting
          ? starlineText.substring(0, prev.length - 1)
          : starlineText.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedStarline, isDeleting]);

  // Continuous auto slideshow timer
  useEffect(() => {
    const timer1 = setInterval(() => {
      setSlideIdx1((prev) => (prev + 1) % newportSlideshow.length);
    }, 3200);

    const timer2 = setInterval(() => {
      setSlideIdx2((prev) => (prev + 1) % napaSlideshow.length);
    }, 3500);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  // Handle appointment form submission
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAppointment(true);

    setTimeout(() => {
      setIsSubmittingAppointment(false);
      setAppointmentSuccess(true);
    }, 600);
  };

  const closeAppointmentModal = () => {
    setIsModalOpen(false);
    setAppointmentSuccess(false);
    setModalForm({
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      destination: "",
      weddingDate: ""
    });
  };

  return (
    <div className="starline-page-shell">
      <Navbar variant="transparent" />

      <main className="starline-page-main">
        {/* ===================================================================
            1. HERO: CINEMATIC FULLSCREEN AMBIENT VIDEO LOOP
            =================================================================== */}
        <section className="minimal-hero" id="top">
          <div className="minimal-hero-video-wrap">
            <video
              className="minimal-hero-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/vid/hero_poster.jpg"
            >
              <source
                src={import.meta.env.VITE_HERO_VIDEO_URL || "/vid/new_section_img_optimized.mp4"}
                type="video/mp4"
              />
              <source
                src="/vid/new_section_img.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="minimal-hero-content">
            <h1 className="minimal-hero-title">
              TELLING STORIES THAT OUTLAST THE SEASON
            </h1>
            <p className="minimal-hero-kicker">
              DALLAS, TEXAS &amp; DESTINATIONS WORLDWIDE
            </p>
          </div>
        </section>

        {/* ===================================================================
            2. IMMERSIVE AUTOMATIC WRITING ANIMATION: "WELCOME TO STARLINE"
               (Static "Welcome to" with typewriter on "Starline" only)
            =================================================================== */}
        <section className="starline-welcome-writing-banner">
          <div className="starline-welcome-writing-inner">
            <span className="welcome-kicker">CINEMATIC ATELIER</span>
            <div className="welcome-typewriter-wrap">
              <h2 className="welcome-typewriter-text">
                <span className="welcome-static-prefix">WELCOME TO&nbsp;</span>
                <span className="welcome-dynamic-word">
                  {typedStarline}
                  <span className="typewriter-cursor">|</span>
                </span>
              </h2>
            </div>
            <p className="welcome-sub-note">
              HANDCRAFTED DESTINATION WEDDING CINEMA &amp; 35MM FINE ART PHOTOGRAPHY
            </p>
          </div>
        </section>

        {/* ===================================================================
            3. COMPANY DETAILS & KNOW MORE ABOUT US (DALLAS ATELIER + WD1.JPG)
            =================================================================== */}
        <section className="minimal-section dallas-about-section">
          <div className="dallas-about-grid">
            {/* Left Side: Company Details & Know More Button */}
            <div className="dallas-about-left">
              <span className="minimal-statement-tag">DALLAS ATELIER // EST. 2023</span>
              <h2 className="dallas-about-heading">
                Operating Since 2023 In Dallas &amp; Capturing Stories Nationwide
              </h2>

              <p className="dallas-about-lead">
                Founded in Dallas, Texas in 2023, Starline Atelier crafts living heirlooms of cinema and fine-art 35mm analog photography for couples seeking unhurried grace, honest human connection, and enduring memory.
              </p>

              <p className="dallas-about-body">
                We believe the most poignant moments occur in between the staged poses: a quiet breath before the ceremony, the golden light grazing an evening table, and spontaneous laughter shared among closest loved ones. We travel wherever an extraordinary celebration unfolds—from Dallas private estates and Newport oceanfront mansions to Napa Valley vineyards and Big Sur coastal cliffs.
              </p>

              {/* Studio Badges */}
              <div className="dallas-about-badges-row">
                <div className="dallas-badge-item">
                  <span className="badge-title">HOME BASE</span>
                  <span className="badge-val">Dallas, Texas</span>
                </div>
                <div className="dallas-badge-item">
                  <span className="badge-title">EXPERIENCE</span>
                  <span className="badge-val">Operating Since 2023</span>
                </div>
                <div className="dallas-badge-item">
                  <span className="badge-title">MEDIUMS</span>
                  <span className="badge-val">35mm Film + 4K Cinema</span>
                </div>
              </div>

              {/* Know More About Us Button */}
              <div className="dallas-about-cta-wrap">
                <Link href="/about" className="minimal-btn-solid">
                  <span>KNOW MORE ABOUT US</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Side: High-End Framed Portrait Image (wd1.jpg) */}
            <div className="dallas-about-right">
              <div className="dallas-portrait-frame">
                <img
                  src="/wd1.jpg"
                  alt="Starline Atelier Editorial Wedding Photography Dallas"
                  className="dallas-portrait-img"
                  loading="lazy"
                />
                <div className="dallas-portrait-badge">
                  <Sparkles size={13} />
                  <span>STARLINE ATELIER // DALLAS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. FEATURED COMMISSIONS: CONTINUOUS AUTOMATIC IMAGE SLIDESHOWS
               - Tab 1 (Newport): Left to Right layout (Slideshow on Left, Story on Right)
               - Tab 2 (Napa Valley): Right to Left layout (Story on Left, Slideshow on Right)
            =================================================================== */}
        <section className="gione-featured-section">
          <div className="gione-featured-header">
            <span className="minimal-overline">CINEMATIC COMMISSIONS</span>
            <h2 className="minimal-section-title">FEATURED CINEMA FILMS</h2>
          </div>

          <div className="gione-showcase-wrap">
            {/* Showcase 1: Newport (Left to Right: Slideshow on Left, Story on Right) */}
            <div className="gione-featured-duo">
              {/* Left Column: Continuous Auto Image Slideshow */}
              <div className="gione-slideshow-col" aria-label="Newport Wedding Slideshow">
                <div className="gione-slideshow-container">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`newport-slide-${slideIdx1}`}
                      src={newportSlideshow[slideIdx1]}
                      alt={`Newport Rhode Island Wedding Still ${slideIdx1 + 1}`}
                      className="gione-slideshow-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  <div className="gione-slideshow-dots">
                    {newportSlideshow.map((_, idx) => (
                      <span
                        key={`dot1-${idx}`}
                        className={`gione-slide-dot ${slideIdx1 === idx ? "is-active" : ""}`}
                        onClick={() => setSlideIdx1(idx)}
                      />
                    ))}
                  </div>
                  <span className="gione-slideshow-tag">NEWPORT // LIVE CINEMA</span>
                </div>
              </div>

              {/* Right Column: Premium Light Blue Written Story Box */}
              <div className="gione-story-col theme-light-blue">
                <div className="gione-story-inner">
                  <p className="gione-story-overline">FEATURED FILM:</p>
                  <h3 className="gione-story-heading">
                    OCEANFRONT ESTATE<br />
                    NEWPORT,<br />
                    RHODE ISLAND
                  </h3>
                  <p className="gione-story-desc">
                    An iconic coastal celebration across historic oceanfront mansions and twilight Atlantic ocean breezes
                  </p>
                  <Link href="/portfolio/videography" className="gione-story-btn">
                    <span>EXPLORE FILM</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Showcase 2: Napa Valley (Right to Left: Story on Left, Slideshow on Right) */}
            <div className="gione-featured-duo is-reversed">
              {/* Slideshow on Right */}
              <div className="gione-slideshow-col" aria-label="Napa Valley Wedding Slideshow">
                <div className="gione-slideshow-container">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`napa-slide-${slideIdx2}`}
                      src={napaSlideshow[slideIdx2]}
                      alt={`Napa Valley Vineyard Wedding Still ${slideIdx2 + 1}`}
                      className="gione-slideshow-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  <div className="gione-slideshow-dots">
                    {napaSlideshow.map((_, idx) => (
                      <span
                        key={`dot2-${idx}`}
                        className={`gione-slide-dot ${slideIdx2 === idx ? "is-active" : ""}`}
                        onClick={() => setSlideIdx2(idx)}
                      />
                    ))}
                  </div>
                  <span className="gione-slideshow-tag">NAPA VALLEY // 35MM EMULSION</span>
                </div>
              </div>

              {/* Light Blue Written Story Box on Left */}
              <div className="gione-story-col theme-light-blue">
                <div className="gione-story-inner">
                  <p className="gione-story-overline">FEATURED FILM:</p>
                  <h3 className="gione-story-heading">
                    ELEGANT &amp; HEARTFELT<br />
                    NAPA VALLEY<br />
                    CALIFORNIA
                  </h3>
                  <p className="gione-story-desc">
                    A stunning harvest celebration overlooking rolling vineyard hills and private stone courtyards in Napa Valley
                  </p>
                  <Link href="/portfolio/videography" className="gione-story-btn">
                    <span>EXPLORE FILM</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. PRIVATE APPOINTMENT / CONSULTATION SECTION
            =================================================================== */}
        <section className="starline-appointment-section">
          <div className="starline-appointment-card">
            <span className="minimal-overline">EXCLUSIVE COMMISSIONS</span>
            <h2 className="starline-appointment-title">
              Reserve a Private Consultation
            </h2>
            <p className="starline-appointment-subtitle">
              Schedule an unhurried conversation with our studio directors to discuss your celebration itinerary, lighting schedules, and bespoke cinematography proposal.
            </p>

            <div className="starline-appointment-meta-row">
              <div className="appointment-meta-item">
                <Clock size={16} />
                <span>30-Minute Video Consultation</span>
              </div>
              <div className="appointment-meta-item">
                <MapPin size={16} />
                <span>Dallas Atelier or Worldwide Remote</span>
              </div>
              <div className="appointment-meta-item">
                <Calendar size={16} />
                <span>Limited to 18 Celebrations / Season</span>
              </div>
            </div>

            <div className="starline-appointment-btn-wrap">
              <button
                className="minimal-btn-solid appointment-book-trigger"
                onClick={() => setIsModalOpen(true)}
              >
                <span>RESERVE A CONSULTATION</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          CONSULTATION REQUEST MODAL POPUP
          =================================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="appointment-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAppointmentModal}
          >
            <motion.div
              className="appointment-modal-box"
              initial={{ scale: 0.93, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 16 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="appointment-modal-close"
                onClick={closeAppointmentModal}
                aria-label="Close consultation modal"
              >
                <X size={20} />
              </button>

              <div className="appointment-modal-header">
                <span className="minimal-overline">STARLINE ATELIER</span>
                <h3 className="appointment-modal-title">Schedule a Private Consultation</h3>
                <p className="appointment-modal-desc">
                  Please provide your celebration details below and Sajan will confirm your consultation time within 24 hours.
                </p>
              </div>

              {appointmentSuccess ? (
                <div className="appointment-success-state">
                  <div className="appointment-success-icon">
                    <Check size={28} />
                  </div>
                  <h4>Consultation Request Received</h4>
                  <p>
                    Thank you. We have received your inquiry and will reach out to confirm your private video consultation time shortly.
                  </p>
                  <button
                    className="minimal-btn-solid"
                    style={{ marginTop: "20px" }}
                    onClick={closeAppointmentModal}
                  >
                    <span>CLOSE WINDOW</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAppointmentSubmit} className="appointment-modal-form">
                  <div className="appointment-field-group">
                    <label className="appointment-field-label">FULL NAME *</label>
                    <input
                      type="text"
                      placeholder="e.g. Victoria Sterling"
                      value={modalForm.fullName}
                      onChange={(e) => setModalForm({ ...modalForm, fullName: e.target.value })}
                      className="appointment-modal-input"
                      required
                    />
                  </div>

                  <div className="appointment-field-grid-2">
                    <div className="appointment-field-group">
                      <label className="appointment-field-label">PHONE NUMBER *</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={modalForm.phoneNumber}
                        onChange={(e) => setModalForm({ ...modalForm, phoneNumber: e.target.value })}
                        className="appointment-modal-input"
                        required
                      />
                    </div>

                    <div className="appointment-field-group">
                      <label className="appointment-field-label">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        placeholder="victoria@sterling.com"
                        value={modalForm.emailAddress}
                        onChange={(e) => setModalForm({ ...modalForm, emailAddress: e.target.value })}
                        className="appointment-modal-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="appointment-field-grid-2">
                    <div className="appointment-field-group">
                      <label className="appointment-field-label">WEDDING DESTINATION *</label>
                      <input
                        type="text"
                        placeholder="e.g. Dallas, TX or Newport, RI"
                        value={modalForm.destination}
                        onChange={(e) => setModalForm({ ...modalForm, destination: e.target.value })}
                        className="appointment-modal-input"
                        required
                      />
                    </div>

                    <div className="appointment-field-group">
                      <label className="appointment-field-label">ESTIMATED WEDDING DATE *</label>
                      <input
                        type="text"
                        placeholder="e.g. October 2026"
                        value={modalForm.weddingDate}
                        onChange={(e) => setModalForm({ ...modalForm, weddingDate: e.target.value })}
                        className="appointment-modal-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="appointment-modal-submit-row">
                    <button
                      type="submit"
                      disabled={isSubmittingAppointment}
                      className="appointment-submit-button"
                    >
                      <span>{isSubmittingAppointment ? "SCHEDULING..." : "CONFIRM CONSULTATION REQUEST"}</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer showClosingCta={false} />
    </div>
  );
}
