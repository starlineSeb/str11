import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

interface NavbarProps {
  variant?: "dark" | "light" | "transparent";
}

export default function Navbar({ variant = "dark" }: NavbarProps) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownHover, setDropdownHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownHover(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "/portfolio",
      label: "Portfolio",
      hasDropdown: true,
      subItems: [
        { href: "/portfolio/videography", label: "Videography" },
        { href: "/portfolio/photography", label: "Photography" },
        { href: "/portfolio", label: "Full Archive" }
      ]
    },
    { href: "/investment", label: "Investment" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <>
      <header
        className={`starline-global-header ${isScrolled ? "is-scrolled" : ""} variant-${variant}`}
      >
        <div className="starline-header-inner">
          <Link href="/" className="starline-brand-box">
            <img
              src="/Str_logo.png"
              alt="Starline Studio Logo"
              className="starline-brand-logo-img"
            />
            <div className="starline-brand-text">
              <span className="starline-brand-title">STARLINE</span>
              <span className="starline-brand-sub">STUDIO // ATELIER</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="starline-desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link, idx) => {
              const isCurrent =
                location === link.href ||
                (link.subItems && link.subItems.some((s) => location === s.href));

              if (link.hasDropdown) {
                return (
                  <div
                    key={`${link.href}-${idx}`}
                    className="nav-dropdown-wrapper"
                    onMouseEnter={() => setDropdownHover(true)}
                    onMouseLeave={() => setDropdownHover(false)}
                  >
                    <Link
                      href={link.href}
                      className={`starline-nav-link dropdown-trigger ${isCurrent ? "is-active" : ""}`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={12}
                        className={`dropdown-arrow ${dropdownHover ? "is-open" : ""}`}
                      />
                    </Link>

                    <AnimatePresence>
                      {dropdownHover && (
                        <motion.div
                          className="nav-dropdown-menu"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`nav-dropdown-item ${location === sub.href ? "is-active" : ""}`}
                            >
                              <span>{sub.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={`${link.href}-${idx}`}
                  href={link.href}
                  className={`starline-nav-link ${isCurrent ? "is-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <div className="starline-header-actions">
            <button
              className="starline-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="starline-mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="starline-mobile-drawer-inner">
              <nav className="starline-mobile-nav-list">
                {navLinks.map((link, idx) => {
                  const isActive =
                    location === link.href ||
                    (link.subItems && link.subItems.some((s) => location === s.href));

                  return (
                    <div key={`${link.href}-mob-${idx}`} className="starline-mob-group">
                      <Link
                        href={link.href}
                        className={`starline-mobile-nav-item ${isActive ? "is-active" : ""}`}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={15} />
                      </Link>

                      {link.subItems && (
                        <div className="starline-mob-sublist">
                          {link.subItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`starline-mob-subitem ${location === sub.href ? "is-active" : ""}`}
                            >
                              <span>— {sub.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="starline-mobile-footer-info">
                <p>STARLINE ATELIER</p>
                <p>DALLAS • NEWPORT • NAPA VALLEY • BIG SUR</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
