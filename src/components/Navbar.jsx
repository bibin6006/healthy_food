import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { contactInfo } from "../data/siteData";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Daily menu", path: "/menu" },
  { name: "Subscription plans", path: "/plans" },
  { name: "Custom plan", path: "/custom-plan", highlight: true },
  { name: "How it works", path: "/how-it-works" },
  { name: "About us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const linkClasses = ({ isActive }) =>
    `relative font-medium text-xs lg:text-sm transition-colors duration-150 flex items-center gap-1.5 py-1 ${
      isActive
        ? "text-accent font-semibold after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-accent"
        : "text-ink hover:text-accent"
    }`;

  const cleanPhone = (contactInfo.phone || '+919072743223').replace(/\s+/g, '');

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-paper transition-shadow duration-200 ${
          scrolled ? "shadow-card border-b border-rule" : "border-b border-rule/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="FitFuel Nutrition Home">
              <img
                src="/logo.jpg"
                alt="FitFuel Nutrition Logo"
                className="h-9 w-9 object-cover rounded-control border border-primary/20 shadow-xs"
              />
              <div>
                <span className="text-lg font-display font-semibold text-ink leading-none block tracking-tight">
                  FitFuel
                </span>
                <span className="text-2xs text-muted leading-tight block">
                  Nutrition · Kottayam
                </span>
              </div>
            </Link>

            {/* Desktop navigation links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={linkClasses}
                >
                  <span>{link.name}</span>
                  {link.highlight && (
                    <span className="bg-paper-2 text-accent border border-rule-2 text-xs font-semibold px-2 py-0.5 rounded-pill">
                      Custom
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-1.5 bg-accent hover:bg-primary-dark text-accent-ink text-xs font-medium px-4 py-2 rounded-pill transition-colors shadow-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>Call Kitchen</span>
              </a>
            </div>

            {/* Hamburger button (mobile) */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-control text-ink hover:text-accent focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-200 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile slide-in drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-card border-l border-rule shadow-elevated transform transition-transform duration-200 ease-out lg:hidden flex flex-col justify-between ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between px-5 h-16 border-b border-rule">
            <div className="flex items-center gap-2">
              <img
                src="/logo.jpg"
                alt="FitFuel Nutrition Logo"
                className="h-8 w-8 object-cover rounded-control border border-primary/20"
              />
              <span className="text-base font-display font-semibold text-ink">FitFuel Nutrition</span>
            </div>
            <button
              type="button"
              onClick={closeMobile}
              className="p-1.5 rounded-control text-muted hover:text-ink cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-control font-medium text-xs transition-colors duration-150 ${
                    isActive
                      ? "bg-paper-2 text-accent font-semibold border border-rule"
                      : "text-ink hover:bg-paper"
                  }`
                }
              >
                <span>{link.name}</span>
                {link.highlight && (
                  <span className="bg-accent text-accent-ink text-xs px-2 py-0.5 rounded-pill font-semibold">
                    Custom
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-rule bg-paper/50">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs py-2.5 rounded-pill transition-colors shadow-xs"
          >
            Call {contactInfo.phone}
          </a>
        </div>
      </aside>

      <div className="h-16" />
    </>
  );
}

export default Navbar;
