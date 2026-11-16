import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { contactInfo } from '../data/siteData';
import Modal, { EnquiryForm } from '../components/Modal';
import SectionHeading from '../components/SectionHeading';

const MacroIcon = ({ type }) => {
  if (type === 'fire') {
    return (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    );
  }
  if (type === 'protein') {
    return (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" x2="6" y1="1" y2="4" />
        <line x1="10" x2="10" y1="1" y2="4" />
        <line x1="14" x2="14" y1="1" y2="4" />
      </svg>
    );
  }
  if (type === 'fiber') {
    return (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
};

export default function PlanDetail({ planId }) {
  const { plans } = useData();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState('monthly');

  const currentPlanId = planId || params.id || params.slug;
  const plan = plans.find(
    (p) =>
      p.id === currentPlanId ||
      p.slug === currentPlanId ||
      p.slug === `/${currentPlanId}`
  );

  if (!plan) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center bg-paper py-20">
        <h1 className="text-display-s font-display font-semibold text-ink mb-3">Plan not found</h1>
        <p className="lead text-muted mb-6">Sorry, we could not find the meal plan you are looking for.</p>
        <Link
          to="/plans"
          className="bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs px-6 py-3 rounded-pill transition-colors shadow-sm"
        >
          View all plans
        </Link>
      </div>
    );
  }

  const cleanPhone = (contactInfo.phone || '+919072743223').replace(/\s+/g, '');

  return (
    <div className="bg-paper text-ink">
      {/* Hero Section */}
      <section className="relative min-h-[380px] md:min-h-[440px] flex items-center justify-center text-paper overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 z-0">
          <img
            src={plan.heroImage}
            alt={plan.title}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-primary-dark/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          <nav className="flex justify-center items-center gap-2 text-xs text-paper-2 mb-4">
            <Link to="/" className="hover:text-paper transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/plans" className="hover:text-paper transition-colors">Plans</Link>
            <span aria-hidden="true">/</span>
            <span className="text-paper font-medium">{plan.title}</span>
          </nav>

          <span className="inline-block text-xs font-semibold text-accent-2 border border-paper/20 rounded-pill px-3 py-1 mb-3 bg-paper/10">
            Fresh daily meal plan
          </span>
          <h1 className="text-display-s sm:text-display font-display font-semibold text-paper tracking-tight mb-3">
            {plan.title}
          </h1>
          <p className="lead text-paper-2 max-w-2xl mx-auto mb-8">
            {plan.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs px-8 py-3.5 rounded-pill transition-colors cursor-pointer shadow-sm"
            >
              Subscribe now: ₹{plan.pricing[selectedBilling]}
            </button>
            <a
              href={`tel:${cleanPhone}`}
              className="border border-paper/40 hover:border-paper text-paper font-medium text-xs px-8 py-3.5 rounded-pill transition-colors bg-paper/10"
            >
              Call kitchen: {contactInfo.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Nutrition at a Glance */}
      {plan.nutrition && (
        <section className="py-16 bg-paper-2 border-b border-rule">
          <div className="container mx-auto px-4 max-w-5xl">
            <SectionHeading
              title="Nutrition at a Glance"
              subtitle="Carefully balanced macronutrients designed by certified clinical nutritionists."
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              <div className="bg-card rounded-card p-5 text-center border border-rule">
                <div className="w-10 h-10 rounded-pill bg-paper border border-rule flex items-center justify-center mx-auto mb-3">
                  <MacroIcon type="fire" />
                </div>
                <p className="text-2xs text-muted font-medium">Avg calories</p>
                <p className="text-xl font-display font-semibold text-ink num mt-0.5">{plan.nutrition.avgCalories}</p>
                <p className="text-2xs text-muted mt-0.5">Per meal serving</p>
              </div>

              <div className="bg-card rounded-card p-5 text-center border border-rule">
                <div className="w-10 h-10 rounded-pill bg-paper border border-rule flex items-center justify-center mx-auto mb-3">
                  <MacroIcon type="protein" />
                </div>
                <p className="text-2xs text-muted font-medium">Lean protein</p>
                <p className="text-xl font-display font-semibold text-accent num mt-0.5">{plan.nutrition.protein}</p>
                <p className="text-2xs text-muted mt-0.5">Satiety and repair</p>
              </div>

              <div className="bg-card rounded-card p-5 text-center border border-rule">
                <div className="w-10 h-10 rounded-pill bg-paper border border-rule flex items-center justify-center mx-auto mb-3">
                  <MacroIcon type="fiber" />
                </div>
                <p className="text-2xs text-muted font-medium">Dietary fiber</p>
                <p className="text-xl font-display font-semibold text-ink num mt-0.5">{plan.nutrition.fiber}</p>
                <p className="text-2xs text-muted mt-0.5">Gut microbiome support</p>
              </div>

              <div className="bg-card rounded-card p-5 text-center border border-rule">
                <div className="w-10 h-10 rounded-pill bg-paper border border-rule flex items-center justify-center mx-auto mb-3">
                  <MacroIcon type="carbs" />
                </div>
                <p className="text-2xs text-muted font-medium">Complex carbs</p>
                <p className="text-xl font-display font-semibold text-ink num mt-0.5">{plan.nutrition.carbs}</p>
                <p className="text-2xs text-muted mt-0.5">Clean sustained energy</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sample Weekly Menu */}
      {plan.sampleMenu && plan.sampleMenu.length > 0 && (
        <section className="py-16 md:py-20 border-b border-rule">
          <div className="container mx-auto px-4 max-w-5xl">
            <SectionHeading
              title="Sample Weekly Menu"
              subtitle="Rotated every week to ensure dietary diversity and fresh local ingredients."
            />

            <div className="mt-10 overflow-hidden rounded-card border border-rule bg-card">
              <div className="hidden sm:block">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-paper border-b border-rule text-ink font-semibold">
                      <th className="py-3.5 px-6">Day</th>
                      <th className="py-3.5 px-6">Chef fresh meal</th>
                      <th className="py-3.5 px-6 text-center">Calories</th>
                      <th className="py-3.5 px-6 text-center">Protein</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    {plan.sampleMenu.map((item) => (
                      <tr key={item.day} className="hover:bg-paper-2 transition-colors">
                        <td className="py-3.5 px-6 font-semibold text-ink whitespace-nowrap">
                          {item.day}
                        </td>
                        <td className="py-3.5 px-6 text-muted">
                          {item.meal}
                        </td>
                        <td className="py-3.5 px-6 text-center font-medium text-ink num">
                          {item.calories} kcal
                        </td>
                        <td className="py-3.5 px-6 text-center font-medium text-accent num">
                          {item.protein}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="sm:hidden divide-y divide-rule text-xs">
                {plan.sampleMenu.map((item) => (
                  <div key={item.day} className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-ink">{item.day}</span>
                      <div className="flex gap-2 text-2xs">
                        <span className="bg-paper text-ink px-2 py-0.5 rounded-pill border border-rule num">
                          {item.calories} kcal
                        </span>
                        <span className="bg-paper text-accent px-2 py-0.5 rounded-pill border border-rule num">
                          {item.protein}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted mt-1">{item.meal}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-2xs text-muted mt-3">
              * Menu items change weekly based on organic farm harvests in Kottayam district.
            </p>
          </div>
        </section>
      )}

      {/* What is Included & Benefits */}
      <section className="py-16 bg-paper-2 border-b border-rule">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What is Included */}
            <div className="bg-card rounded-card p-6 sm:p-8 border border-rule flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-display font-semibold text-ink mb-4">
                  What is included in this plan
                </h3>
                <ul className="space-y-3">
                  {plan.includes &&
                    plan.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-muted">
                        <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Health Benefits */}
            <div className="bg-card rounded-card p-6 sm:p-8 border border-rule flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-display font-semibold text-ink mb-4">
                  Key wellness benefits
                </h3>
                <ul className="space-y-3">
                  {plan.benefits &&
                    plan.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-muted">
                        <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Card */}
      <section className="py-16 md:py-20 text-center">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="bg-card rounded-card p-8 border border-rule">
            <span className="text-xs font-semibold text-accent mb-2 block">
              {plan.title} Subscription
            </span>
            <h2 className="text-2xl font-display font-semibold text-ink mb-4">
              Simple, transparent pricing
            </h2>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-paper p-1 rounded-pill border border-rule mb-6 text-xs">
              <button
                type="button"
                onClick={() => setSelectedBilling('weekly')}
                className={`px-4 py-1.5 rounded-pill font-medium transition-colors cursor-pointer ${
                  selectedBilling === 'weekly'
                    ? 'bg-accent text-accent-ink'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setSelectedBilling('monthly')}
                className={`px-4 py-1.5 rounded-pill font-medium transition-colors cursor-pointer ${
                  selectedBilling === 'monthly'
                    ? 'bg-accent text-accent-ink'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Monthly
              </button>
            </div>

            <div className="mb-4">
              <span className="text-4xl font-display font-semibold text-ink num">
                ₹{plan.pricing[selectedBilling]}
              </span>
              <span className="text-xs text-muted"> / {selectedBilling}</span>
            </div>

            <p className="text-xs text-muted mb-6">
              Free doorstep delivery across Kottayam. Pause or adjust delivery dates anytime via WhatsApp.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs py-3.5 rounded-pill transition-colors cursor-pointer shadow-sm"
            >
              Subscribe to {plan.title}
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Subscribe to ${plan.title}`}
      >
        <p className="text-xs text-muted mb-6">
          Fill in your details below and our team will connect with you to confirm your delivery address, dietary preferences, and start date.
        </p>
        <EnquiryForm
          planName={plan.title}
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
