import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { faqItems, investmentTiers } from "@/data/studioData";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="starline-page-shell">
      <Navbar variant="light" />

      <main className="starline-page-main">
        {/* Minimalist Hero */}
        <section className="portfolio-hero">
          <p className="minimal-overline">Pricing &amp; Collections // 35+ Years Heritage</p>
          <h1 className="portfolio-title">
            Transparent Pricing,<br />
            Built Around Presence
          </h1>
          <p className="portfolio-subtitle">
            We work thoughtfully with your budget and offer customized packages to meet your celebration needs without compromising quality. Serving weddings from intimate gatherings to grand luxury events.
          </p>
        </section>

        {/* Special Offer Callout Banner */}
        <section className="starline-privilege-callout-banner" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="starline-privilege-callout-inner">
            <span className="privilege-sparkle">✦</span>
            <span className="privilege-text">
              <strong>SPECIAL OFFER:</strong> Book Photography and Videography together and receive <strong>FREE Live Streaming</strong> coverage of your event for remote and overseas family.
            </span>
            <Link href="/contact" className="privilege-link">
              <span>INQUIRE NOW →</span>
            </Link>
          </div>
        </section>

        {/* Minimalist Editorial Pricing List (Zero Boxed Cards) */}
        <section className="minimal-section" style={{ paddingTop: 0 }}>
          <div className="minimal-pricing-list">
            {investmentTiers.map((tier, idx) => (
              <div key={tier.id} className="minimal-tier-row">
                <div className="minimal-tier-left">
                  <span>0{idx + 1} / {tier.coverage}</span>
                  <h3>{tier.name}</h3>
                </div>

                <div className="minimal-tier-center">
                  <p>{tier.tagline}</p>
                  <ul className="minimal-tier-inclusions">
                    {tier.inclusions.map((inc, i) => (
                      <li key={i}>
                        <span style={{ opacity: 0.4 }}>—</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="minimal-tier-right">
                  <span className="minimal-tier-price">{tier.price}</span>
                  <span className="minimal-tier-price-sub">All-inclusive base travel & tax</span>
                  <Link href={`/contact?package=${tier.id}`} className="minimal-text-link">
                    <span>Reserve Date</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bespoke Multi-Day Invitation */}
        <section className="minimal-quote-section">
          <div className="minimal-quote-inner">
            <p className="minimal-quote-title">Bespoke Voyages & Multi-Day</p>
            <blockquote className="minimal-quote-text">
              “Planning a multi-day destination voyage or custom celebration across Newport, Napa Valley, Aspen, or remote wilderness? We create tailored multi-destination proposals crafted around your itinerary.”
            </blockquote>
            <div style={{ marginTop: "32px" }}>
              <Link href="/contact" className="minimal-text-link">
                <span>Request Bespoke Proposal</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Minimalist Clean FAQ Accordion */}
        <section className="minimal-section">
          <div style={{ maxWidth: "840px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <p className="minimal-overline">Frequently Asked Questions</p>
              <h2 style={{ fontFamily: "var(--font-display-condensed)", fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                Common Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {faqItems.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    style={{
                      borderBottom: "1px solid var(--line-subtle)",
                      padding: "24px 0"
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "18px",
                        background: "transparent",
                        border: 0,
                        padding: 0,
                        color: "var(--ink-primary)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "15px",
                        fontWeight: 500,
                        textAlign: "left",
                        cursor: "pointer"
                      }}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.25s ease",
                          opacity: 0.6
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div style={{ paddingTop: "14px", color: "var(--ink-muted)", fontSize: "14px", fontWeight: 300, lineHeight: "1.85" }}>
                            <p style={{ margin: 0 }}>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer showClosingCta={true} />
    </div>
  );
}
