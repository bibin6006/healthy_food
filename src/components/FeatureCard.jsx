import React from "react";

function FeatureCard(props) {
  const item = props.feature || props;
  const { title, description } = item;

  // Render contextual icon based on title
  const renderIcon = () => {
    if (title.toLowerCase().includes('organic')) {
      return (
        <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9-4.97 0-9 4.03-9 9 0 4.14 2.8 7.62 6.66 8.66" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
        </svg>
      );
    }
    if (title.toLowerCase().includes('delivery')) {
      return (
        <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" rx="2" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  };

  return (
    <div className="bg-card rounded-card p-6 sm:p-8 hover:-translate-y-0.5 shadow-card transition-transform duration-200 border border-rule text-left flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 bg-paper-2 rounded-pill flex items-center justify-center mb-5 border border-rule">
          {renderIcon()}
        </div>
        <h3 className="text-base font-display font-semibold text-ink mb-2">{title}</h3>
        <p className="text-xs text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
