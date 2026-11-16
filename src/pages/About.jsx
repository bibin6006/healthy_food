import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import TeamCard from '../components/TeamCard';
import { team } from '../data/siteData';

const values = [
  {
    iconName: 'leaf',
    title: 'Fresh & organic',
    description:
      'Using only certified organic local ingredients sourced directly from trusted farmers in and around Kottayam.',
  },
  {
    iconName: 'lab',
    title: 'Science-backed nutrition',
    description:
      'Every single meal on our menu is carefully designed and approved by certified nutritionists to meet your dietary goals.',
  },
  {
    iconName: 'community',
    title: 'Community first',
    description:
      'We support local farmers and small producers, strengthening the Kottayam food ecosystem with every delivered meal.',
  },
  {
    iconName: 'recycle',
    title: 'Responsible kitchen',
    description:
      'From eco-friendly packaging to a strict zero food waste policy, we care for the environment as much as your health.',
  },
];

const whyPoints = [
  'Certified organic ingredients sourced from local Kottayam farms',
  'Daily menus designed and audited by registered nutritionists',
  'Fresh daily morning preparation with zero frozen meals',
  'Flexible subscription plans with pause and cancel controls',
  'Reliable morning and evening doorstep delivery across Kottayam',
];

const ValueIcon = ({ name }) => {
  if (name === 'leaf') {
    return (
      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }
  if (name === 'lab') {
    return (
      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    );
  }
  if (name === 'community') {
    return (
      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.2a1.8 1.8 0 0 0 1.7-1.2 1.8 1.8 0 0 0-.4-2l-3.5-3.8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export default function About() {
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
            <span className="text-ink font-medium">About us</span>
          </nav>
          <span className="inline-block text-xs font-semibold text-accent border border-rule-2 rounded-pill px-3 py-1 mb-3">
            Kottayam, Kerala
          </span>
          <h1 className="text-display-s sm:text-display font-display font-semibold text-ink tracking-tight mb-4">
            Fresh Nutrition with Integrity
          </h1>
          <p className="lead text-muted max-w-2xl mx-auto">
            We cook wholesome, nutritionist-designed meals every morning for families in Kottayam.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-20 border-b border-rule">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold text-accent mb-2 block">
                Our origins
              </span>
              <h2 className="text-section font-display font-semibold text-ink mb-6">
                Fresh food cooked with intent
              </h2>
              <div className="space-y-4 text-sm text-muted leading-relaxed">
                <p>
                  FitFuel Nutrition was born in the heart of Kottayam from a straightforward belief: wholesome nutrition should be accessible, delicious, and consistent every day.
                </p>
                <p>
                  Our founders saw working professionals and busy households struggling to balance long work hours with fresh meal prep. What began as a dedicated kitchen delivering to a few homes rapidly grew through honest recommendations.
                </p>
                <p>
                  Today, every recipe is planned with certified clinical nutritionists. We partner directly with organic growers across Kottayam district, providing balanced macros without artificial additives or frozen compromises.
                </p>
              </div>
            </div>

            <div className="rounded-card overflow-hidden border border-rule bg-card">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80"
                alt="Cloud kitchen prep station with fresh organic ingredients"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-paper-2 border-b border-rule">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            title="Core Kitchen Values"
            subtitle="The nutritional standards and ethical sourcing guidelines that guide every single dish."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {values.map((v, index) => (
              <div
                key={index}
                className="bg-card rounded-card border border-rule p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-pill bg-paper border border-rule flex items-center justify-center mb-4">
                    <ValueIcon name={v.iconName} />
                  </div>
                  <h3 className="text-base font-display font-semibold text-ink mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 border-b border-rule">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading
            title="Why Kottayam Trusts Us"
            subtitle="Clear commitments to quality, hygiene, and dietary accountability."
          />

          <div className="mt-10 space-y-3.5">
            {whyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 bg-card rounded-control p-4 border border-rule"
              >
                <div className="w-6 h-6 rounded-pill bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-sm text-ink leading-relaxed font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (No fake photos) */}
      <section className="py-16 md:py-20 bg-paper-2 border-b border-rule">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading
            title="Our Nutrition Team"
            subtitle="Led by certified clinical nutritionists and professional culinary directors in Kottayam."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-section font-display font-semibold text-ink mb-3">
            Build Your Personal Wellness Plan
          </h2>
          <p className="lead text-muted mx-auto mb-8">
            Tell our clinical nutritionists your personal health goals, and receive a customized dietary routine on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              to="/custom-plan"
              className="bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs px-8 py-3.5 rounded-pill transition-colors shadow-sm"
            >
              Start custom nutrition plan
            </Link>
            <Link
              to="/contact"
              className="border border-rule-2 hover:border-accent text-ink hover:text-accent font-medium text-xs px-8 py-3.5 rounded-pill transition-colors bg-paper"
            >
              Contact our kitchen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
