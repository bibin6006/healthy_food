import React from "react";
import { Link } from "react-router-dom";

function PlanCard({ plan }) {
  const { slug, title, shortDescription, image, benefits, deliveryTime, pricing } = plan;

  return (
    <div className="bg-card rounded-card border border-rule transition-transform duration-200 hover:-translate-y-0.5 shadow-card overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image with overlay */}
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

          {deliveryTime && (
            <span className="absolute top-3 right-3 bg-paper text-ink text-xs font-medium px-2.5 py-0.5 rounded-pill border border-rule">
              {deliveryTime}
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <h3 className="text-lg font-display font-semibold text-paper drop-shadow-sm">{title}</h3>
            {pricing && (
              <span className="text-xs font-semibold text-paper bg-ink/70 px-2.5 py-1 rounded-pill border border-white/20">
                ₹{pricing.weekly}/wk
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-muted leading-relaxed mb-4">
            {shortDescription}
          </p>

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <ul className="space-y-2 mb-4">
              {benefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-ink">
                  <span className="text-accent font-semibold leading-none mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 border-t border-rule/60 flex items-center justify-between">
        <Link
          to={`/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-primary-dark transition-colors"
        >
          <span>View weekly menu and macros</span>
        </Link>
      </div>
    </div>
  );
}

export default PlanCard;
