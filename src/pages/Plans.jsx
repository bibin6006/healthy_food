import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Modal, { EnquiryForm } from '../components/Modal';
import SectionHeading from '../components/SectionHeading';

const tabs = ['All plans', 'Breakfast', 'Lunch', 'Dinner', 'Combo'];

export default function Plans() {
  const { plans } = useData();
  const [activeTab, setActiveTab] = useState('All plans');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [pricingToggle, setPricingToggle] = useState('monthly');

  const filteredPlans =
    activeTab === 'All plans'
      ? plans
      : plans.filter(
          (plan) =>
            plan.title.toLowerCase().includes(activeTab.toLowerCase()) ||
            plan.slug.toLowerCase().includes(activeTab.toLowerCase())
        );

  const openEnquiry = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

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
            <span className="text-ink font-medium">Meal plans</span>
          </nav>
          <span className="inline-block text-xs font-semibold text-accent border border-rule-2 rounded-pill px-3 py-1 mb-3">
            Subscriptions across Kottayam
          </span>
          <h1 className="text-display-s sm:text-display font-display font-semibold text-ink tracking-tight mb-3">
            Subscriptions for Every Goal
          </h1>
          <p className="lead text-muted max-w-2xl mx-auto">
            Choose a recurring chef-crafted meal plan, or build your custom nutrition plan.
          </p>
        </div>
      </section>

      {/* Main Listing */}
      <section className="py-16 md:py-20 border-b border-rule">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            title="Explore Subscription Plans"
            subtitle="Prepared fresh each morning and delivered to your doorstep in Kottayam."
          />

          {/* Filter Tabs & Billing Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 mb-10">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-pill text-xs font-medium border transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-accent text-accent-ink border-accent'
                      : 'bg-card text-ink border-rule hover:border-rule-2'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center gap-2.5 bg-card px-3.5 py-1.5 rounded-pill border border-rule text-xs">
              <span className={pricingToggle === 'weekly' ? 'font-semibold text-ink' : 'text-muted'}>
                Weekly
              </span>
              <button
                type="button"
                onClick={() => setPricingToggle((prev) => (prev === 'weekly' ? 'monthly' : 'weekly'))}
                className="w-10 h-5 rounded-pill bg-paper-2 border border-rule relative p-0.5 transition-colors cursor-pointer"
                aria-label="Toggle weekly or monthly pricing"
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-pill bg-accent transition-transform ${
                    pricingToggle === 'monthly' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={pricingToggle === 'monthly' ? 'font-semibold text-ink' : 'text-muted'}>
                Monthly <span className="text-accent text-2xs font-semibold">(Best value)</span>
              </span>
            </div>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-card rounded-card border border-rule overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-accent">
                      {plan.title}
                    </span>
                    <span className="text-2xs text-muted font-medium bg-paper px-2.5 py-0.5 rounded-pill border border-rule">
                      Kottayam daily delivery
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-ink mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="py-4 border-y border-rule mb-6 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-display font-semibold text-ink">
                          ₹{pricingToggle === 'weekly' ? plan.pricing?.weekly : plan.pricing?.monthly}
                        </span>
                        <span className="text-xs text-muted">
                          /{pricingToggle === 'weekly' ? 'week' : 'month'}
                        </span>
                      </div>
                      <p className="text-2xs text-muted mt-0.5">
                        {pricingToggle === 'weekly'
                          ? `Billed weekly (₹${plan.pricing?.monthly}/month equivalent)`
                          : `Billed monthly (saves ₹${(plan.pricing?.weekly * 4) - plan.pricing?.monthly} per month)`}
                      </p>
                    </div>

                    <Link
                      to={`/${plan.slug}`}
                      className="text-xs font-medium text-accent hover:underline"
                    >
                      View details
                    </Link>
                  </div>

                  {/* What is Included */}
                  <div>
                    <h4 className="text-xs font-semibold text-ink mb-3">
                      What is included
                    </h4>
                    <ul className="space-y-2">
                      {plan.includes &&
                        plan.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-muted">
                            <svg
                              className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => openEnquiry(plan)}
                    className="w-full bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs py-3 rounded-pill transition-colors cursor-pointer shadow-sm"
                  >
                    Subscribe to {plan.title}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <p className="text-center text-muted py-12 text-sm">
              No plans found for the selected category.
            </p>
          )}
        </div>
      </section>

      {/* Custom Plan Callout */}
      <section className="py-16 bg-paper-2 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-section font-display font-semibold text-ink mb-3">
            Need a Personalized Diet Plan?
          </h2>
          <p className="lead text-muted mx-auto mb-8">
            Our clinical nutritionists can calculate your exact calories, protein, carbs, and fat requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              to="/custom-plan"
              className="bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs px-8 py-3.5 rounded-pill transition-colors shadow-sm"
            >
              Build your custom plan
            </Link>
            <Link
              to="/contact"
              className="border border-rule-2 hover:border-accent text-ink hover:text-accent font-medium text-xs px-8 py-3.5 rounded-pill transition-colors bg-card"
            >
              Talk to nutritionist
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedPlan ? `Subscribe to ${selectedPlan.title}` : 'Meal plan subscription'}
      >
        <p className="text-xs text-muted mb-6">
          Fill in your details and our Kottayam kitchen will verify your delivery location and timing.
        </p>
        <EnquiryForm
          planName={selectedPlan?.title}
          onSuccess={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
