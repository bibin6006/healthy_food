import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const SectionHeading = ({ title, subtitle, light = false, center = true }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`mb-10 sm:mb-12 transition-transform transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${center ? 'text-center' : 'text-left'}`}
    >
      <h2
        className={`font-display text-section font-semibold mb-3 ${
          light ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      <div
        className={`h-0.5 w-10 bg-accent rounded-pill ${center ? 'mx-auto' : ''} mb-3`}
        aria-hidden="true"
      />
      {subtitle && (
        <p
          className={`text-sm ${
            light ? 'text-paper-2' : 'text-muted'
          } max-w-xl ${center ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
