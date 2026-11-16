import { Link } from "react-router-dom";
import { contactInfo } from "../data/siteData";

const Footer = () => {
  const cleanPhone = (contactInfo.phone || '+919072743223').replace(/\s+/g, '');

  return (
    <footer className="bg-primary-dark text-paper border-t border-rule-2">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-3.5" aria-label="FitFuel Nutrition">
              <img
                src="/logo.jpg"
                alt="FitFuel Nutrition Logo"
                className="h-9 w-9 object-cover rounded-control border border-paper/20 shadow-xs"
              />
              <div>
                <span className="text-xl font-display font-semibold tracking-tight text-paper block leading-none">
                  FitFuel
                </span>
                <span className="text-2xs font-medium text-paper-2 block">
                  Nutrition · Kottayam
                </span>
              </div>
            </Link>
            <p className="text-paper-2 text-xs leading-relaxed max-w-sm">
              More than meals, your wellness partner. Fresh, nutritionist-designed meals delivered daily across Kottayam.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-paper mb-3">Quick navigation</h3>
            <ul className="space-y-1.5 text-xs text-paper-2">
              {[
                { label: "Home", to: "/" },
                { label: "Daily fresh menu", to: "/menu" },
                { label: "Subscription plans", to: "/plans" },
                { label: "Design custom plan", to: "/custom-plan" },
                { label: "How it works", to: "/how-it-works" },
                { label: "About us", to: "/about" },
                { label: "Contact us", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="hover:text-accent-2 transition-colors duration-150 inline-block py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xs font-semibold text-paper mb-3">Direct contact</h3>
            <ul className="space-y-2.5 text-xs text-paper-2">
              <li className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0 text-accent-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href={`tel:${cleanPhone}`} className="hover:text-paper transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0 text-accent-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-paper transition-colors break-all">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0 text-accent-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Coverage */}
          <div>
            <h3 className="text-xs font-semibold text-paper mb-3">Kitchen schedule</h3>
            <p className="text-xs text-paper-2 leading-relaxed mb-3">
              Delivery slots across Kottayam:
            </p>
            <div className="text-xs text-paper-2 space-y-1">
              <p>Breakfast: 7:00 AM to 9:00 AM</p>
              <p>Lunch: 11:30 AM to 2:30 PM</p>
              <p>Dinner: 6:30 PM to 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-paper/15 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper-2">
          <p>© 2026 FitFuel Nutrition, Kottayam.</p>
          <p>Fresh daily nutrition with local organic ingredients.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
