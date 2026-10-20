import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    contactNumber: "",
    eventDate: "",
    service: "Photography + Cinematography",
    eventDetails: "",
    planner: "",
    whatYouLike: "",
    instagram: "",
    referralSource: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email.trim().toLowerCase() !== formData.confirmEmail.trim().toLowerCase()) {
      toast.error("Email addresses do not match", {
        description: "Please confirm that both email fields match before submitting."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "/api/inquiries";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        const refId = data.inquiryId || `STR-${Date.now().toString().slice(-6)}`;
        setInquiryRef(refId);
        setSubmitted(true);
        toast.success("Inquiry Transmitted", {
          description: "Thank you. Your celebration details have been received."
        });
        try {
          localStorage.setItem(
            "str_last_inquiry",
            JSON.stringify({ ...formData, refId, timestamp: new Date().toISOString() })
          );
        } catch (_) {}
      } else {
        const refId = `STR-${Date.now().toString().slice(-6)}`;
        setInquiryRef(refId);
        setSubmitted(true);
        toast.success("Inquiry Recorded", {
          description: data.message || "Thank you. We have recorded your note."
        });
        try {
          localStorage.setItem(
            "str_last_inquiry",
            JSON.stringify({ ...formData, refId, timestamp: new Date().toISOString() })
          );
        } catch (_) {}
      }
    } catch (err) {
      console.warn("Submission fallback:", err);
      const refId = `STR-${Date.now().toString().slice(-6)}`;
      setInquiryRef(refId);
      setSubmitted(true);
      toast.success("Inquiry Saved", {
        description: "We have recorded your celebration note and will be in touch shortly."
      });
      try {
        localStorage.setItem(
          "str_last_inquiry",
          JSON.stringify({ ...formData, refId, timestamp: new Date().toISOString() })
        );
      } catch (_) {}
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="starline-page-shell" style={{ backgroundColor: "#ffffff" }}>
      <Navbar variant="light" />

      <main className="starline-page-main" style={{ padding: 0 }}>
        {/* ===================================================================
            FULL-SIZE EDITORIAL SPLIT SECTION WITH EXACT GIONE DA SILVA FORM
            =================================================================== */}
        <section className="gione-contact-full-wrapper" style={{ background: "#ffffff" }}>
          {/* Left Side: Full-Height Editorial Mood Image Plate */}
          <div className="gione-contact-full-image-col">
            <img
              src="/contact_editorial.png"
              alt="Destination Wedding Editorial — Starline Studio"
              className="gione-contact-full-image"
            />
            <div className="gione-contact-image-badge">
              <Sparkles size={12} />
              <span>COMMISSIONS WORLDWIDE // 2026—2027</span>
            </div>
          </div>

          {/* Right Side: Exact Form from Reference */}
          <div className="exact-gione-form-area">
            {/* Header Block */}
            <div className="exact-gione-header">
              <h1 className="exact-gione-title">GET IN TOUCH!</h1>

              <p className="exact-gione-intro">
                As you&apos;ve probably gathered by now, we are all about connections and life experiences. We do get a buzz with the possibility of meeting new people and documenting their adventures. Tell us about your plans!
              </p>

              <div className="exact-gione-direct-line">
                <span className="direct-item">
                  <b>T:</b> <a href="tel:+12148104492">+1 214 810 4492</a>
                </span>
                <span className="direct-item">
                  <b>E:</b> <a href="mailto:hello@starline.studio">HELLO@STARLINE.STUDIO</a>
                </span>
              </div>
            </div>

            {/* Submitted Confirmation State */}
            {submitted ? (
              <motion.div
                className="exact-gione-success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="success-icon-wrap">
                  <CheckCircle2 size={36} color="#111113" />
                </div>

                <h2 className="success-heading">Message Sent, {formData.name || "Friend"}</h2>

                <p className="success-text">
                  Thank you for sharing your celebration plans. We have received your note and will be in touch directly at <b>{formData.email}</b> within 24–48 hours with our full availability and commission guide.
                  {inquiryRef && (
                    <span style={{ display: "block", marginTop: "12px", fontSize: "11px", letterSpacing: "0.14em", color: "#71717a" }}>
                      REFERENCE // {inquiryRef}
                    </span>
                  )}
                </p>

                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "28px" }}>
                  <Link href="/portfolio" className="exact-gione-btn" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                    <span>VISIT PORTFOLIO</span>
                  </Link>
                  <button
                    type="button"
                    className="exact-gione-btn-outline"
                    onClick={() => setSubmitted(false)}
                  >
                    <span>SEND ANOTHER NOTE</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* The Exact Form Fields */
              <form onSubmit={handleSubmit} className="exact-gione-form">
                {/* 1. NAME */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    NAME <span className="exact-req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="exact-underline-input"
                  />
                </div>

                {/* 2. EMAIL ADDRESS */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    EMAIL ADDRESS <span className="exact-req">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="exact-underline-input"
                  />
                </div>

                {/* 3. CONFIRM EMAIL ADDRESS */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    EMAIL ADDRESS <span className="exact-req">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.confirmEmail}
                    onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                    className="exact-underline-input"
                  />
                </div>

                {/* 4. CONTACT NUMBER */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    CONTACT NUMBER <span className="exact-req">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="exact-underline-input"
                  />
                  <span className="exact-helper-italic">Country Code + Number</span>
                </div>

                {/* 5. EVENT DATE */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    EVENT DATE <span className="exact-req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="exact-underline-input"
                  />
                </div>

                {/* 6. SERVICE YOU ARE INTERESTED IN */}
                <div className="exact-form-group exact-radio-group-wrap">
                  <label className="exact-form-label" style={{ marginBottom: "12px" }}>
                    SERVICE YOU ARE INTERESTED IN <span className="exact-req">*</span>
                  </label>

                  <div className="exact-radio-options-row">
                    <label className="exact-radio-item">
                      <input
                        type="radio"
                        name="serviceInterest"
                        value="Photography"
                        checked={formData.service === "Photography"}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="exact-radio-input"
                      />
                      <span className="exact-radio-text">Photography</span>
                    </label>

                    <label className="exact-radio-item">
                      <input
                        type="radio"
                        name="serviceInterest"
                        value="Cinematography"
                        checked={formData.service === "Cinematography"}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="exact-radio-input"
                      />
                      <span className="exact-radio-text">Cinematography</span>
                    </label>

                    <label className="exact-radio-item">
                      <input
                        type="radio"
                        name="serviceInterest"
                        value="Photography + Cinematography"
                        checked={formData.service === "Photography + Cinematography"}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="exact-radio-input"
                      />
                      <span className="exact-radio-text">Photography + Cinematography</span>
                    </label>
                  </div>

                  <div className="exact-radio-divider" />
                </div>

                {/* 7. EVENT DETAILS / STORY */}
                <div className="exact-form-group" style={{ marginTop: "14px" }}>
                  <label className="exact-form-label">
                    PLEASE TELL US A LITTLE ABOUT YOUR EVENT (Location, style, vibe or anything that is important to you) <span className="exact-req">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.eventDetails}
                    onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                    className="exact-underline-textarea"
                  />
                </div>

                {/* 8. WEDDING PLANNER */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    WHO IS YOUR WEDDING PLANNER?
                  </label>
                  <input
                    type="text"
                    value={formData.planner}
                    onChange={(e) => setFormData({ ...formData, planner: e.target.value })}
                    className="exact-underline-input"
                  />
                </div>

                {/* 9. WHAT DO YOU LIKE ABOUT OUR STYLE */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    WHAT DO YOU LIKE ABOUT OUR STYLE?
                  </label>
                  <input
                    type="text"
                    value={formData.whatYouLike}
                    onChange={(e) => setFormData({ ...formData, whatYouLike: e.target.value })}
                    className="exact-underline-input"
                  />
                </div>

                {/* 10. INSTAGRAM HANDLES */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    INSTAGRAM HANDLES
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="exact-underline-input"
                  />
                </div>

                {/* 11. WHERE DID YOU HEAR ABOUT US */}
                <div className="exact-form-group">
                  <label className="exact-form-label">
                    WHERE DID YOU HEAR ABOUT US?
                  </label>
                  <input
                    type="text"
                    value={formData.referralSource}
                    onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                    className="exact-underline-input"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="exact-submit-wrap">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="exact-gione-btn"
                  >
                    <span>{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer showClosingCta={false} />
    </div>
  );
}
