import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';

const steps = [
  {
    step: '01',
    title: 'Choose a plan or customize',
    description:
      'Select a breakfast, lunch, dinner, or full-day combo plan, or submit a personalized health goal for custom macros.',
  },
  {
    step: '02',
    title: 'Confirm diet preferences',
    description:
      'Tell us your dietary style (vegetarian, high-protein, diabetic-friendly, low-sodium) and preferred delivery time slots.',
  },
  {
    step: '03',
    title: 'Cooked fresh every morning',
    description:
      'Our kitchen starts at 5:00 AM using fresh organic produce from local Kottayam farms. No pre-cooked sauces or frozen stocks.',
  },
  {
    step: '04',
    title: 'Doorstep hot delivery',
    description:
      'Delivered in eco-friendly insulated packaging to your home or office during your selected delivery window across Kottayam.',
  },
];

const healthBenefits = [
  {
    iconName: 'energy',
    title: 'Sustained energy',
    description: 'Complex carbohydrates and lean proteins avoid midday blood sugar spikes.',
  },
  {
    iconName: 'scale',
    title: 'Weight management',
    description: 'Clinically portioned meals keep daily caloric intake right on target.',
  },
  {
    iconName: 'digest',
    title: 'Gut health & digestion',
    description: 'High dietary fiber and fermented local ingredients support healthy digestion.',
  },
  {
    iconName: 'sleep',
    title: 'Restorative recovery',
    description: 'Light, nutrient-dense dinners support restful sleep and overnight muscle repair.',
  },
  {
    iconName: 'shield',
    title: 'Immune support',
    description: 'Fresh micronutrients, antioxidants, and cold-pressed oils strengthen immunity.',
  },
  {
    iconName: 'clarity',
    title: 'Mental focus',
    description: 'Clean nutrition without heavy additives promotes clarity and daily productivity.',
  },
];

const BenefitIcon = ({ name }) => {
  if (name === 'energy') {
    return (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  if (name === 'scale') {
    return (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </svg>
    );
  }
  if (name === 'digest') {
    return (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }
  if (name === 'sleep') {
    return (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    );
  }
  if (name === 'shield') {
    return (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.1 6.26 5.07 7.4.3.12.43.43.43.76V20a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1.84c0-.33.13-.64.43-.76C17.9 16.26 20 13.37 20 10a8 8 0 0 0-8-8z" />
    </svg>
  );
};

export default function HowItWorks() {
  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="bg-card border-b border-rule py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-xs text-muted mb-4 flex justify-center items-center gap-2">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink font-medium">How it works</span>
          </nav>
          <span className="inline-block text-xs font-semibold text-accent border border-rule-2 rounded-pill px-3 py-1 mb-3">
            Simple 4-step routine
          </span>
          <h1 className="text-display-s sm:text-display font-display font-semibold text-ink tracking-tight mb-3">
            How Our Kitchen Operates
          </h1>
          <p className="lead text-muted max-w-2xl mx-auto">
            From local farm sourcing to hot morning doorstep delivery across Kottayam.
          </p>
        </div>
      </section>

      {/* 4-Step Timeline */}
      <section className="py-16 md:py-20 border-b border-rule">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-card p-6 border border-rule flex flex-col sm:flex-row sm:items-center gap-5"
              >
                <div className="w-14 h-14 rounded-pill bg-paper border border-rule-2 text-accent font-display font-semibold text-lg flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-display font-semibold text-ink mb-1">
                    {item.title}
                  </h2>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Benefits Grid */}
      <section className="py-16 md:py-20 bg-paper-2 border-b border-rule">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            title="Benefits of Daily Nutrition"
            subtitle="How consistent clinical meal planning changes daily stamina and long-term health."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {healthBenefits.map((b, idx) => (
              <div
                key={idx}
                className="bg-card rounded-card p-6 border border-rule flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-pill bg-paper border border-rule flex items-center justify-center mb-4">
                    <BenefitIcon name={b.iconName} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-ink mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-section font-display font-semibold text-ink mb-3">
            Ready to Begin Your Wellness Routine?
          </h2>
          <p className="lead text-muted mx-auto mb-8">
            Select an existing subscription plan or create your custom macros on WhatsApp today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              to="/plans"
              className="bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs px-8 py-3.5 rounded-pill transition-colors shadow-sm"
            >
              Explore subscription plans
            </Link>
            <Link
              to="/custom-plan"
              className="border border-rule-2 hover:border-accent text-ink hover:text-accent font-medium text-xs px-8 py-3.5 rounded-pill transition-colors bg-paper"
            >
              Build custom plan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
