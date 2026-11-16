import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useData } from '../context/DataContext';
import SectionHeading from '../components/SectionHeading';
import PlanCard from '../components/PlanCard';
import FeatureCard from '../components/FeatureCard';
import TeamCard from '../components/TeamCard';
import { Modal, EnquiryForm } from '../components/Modal';
import { features } from '../data/plans';
import { team, testimonials, faqs, contactInfo } from '../data/siteData';

/* ──────────────────────────────────────────────
   Section 1: HERO
   Visible at 1280x800 without scrolling.
   Headline: 6 words. Sentence: 11 words.
   ────────────────────────────────────────────── */
function HeroSection() {
  const animRef = useScrollAnimation();

  return (
    <section className="bg-paper-2 border-b border-rule w-full py-12 md:py-20">
      <div
        ref={animRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10 lg:gap-14"
      >
        {/* Left copy */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block text-xs font-semibold text-accent border border-rule-2 rounded-pill px-3 py-1 mb-4">
            Kottayam Fresh Cloud Kitchen
          </span>
          <h1 className="text-display-s sm:text-display font-display font-semibold text-ink leading-tight tracking-tight">
            Fresh Healthy Meals Delivered to You
          </h1>
          <p className="lead text-muted mt-3 max-w-lg mx-auto md:mx-0">
            Nutritionist-designed breakfast, lunch, and dinner plans delivered daily in Kottayam.
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5 justify-center md:justify-start items-center">
            <Link
              to="/custom-plan"
              className="bg-accent hover:bg-primary-dark text-accent-ink px-6 py-3.5 rounded-pill font-medium text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Design custom plan</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </Link>
            <Link
              to="/plans"
              className="border border-rule-2 hover:border-accent text-ink hover:text-accent px-6 py-3.5 rounded-pill font-medium text-xs sm:text-sm transition-colors bg-card"
            >
              View meal plans
            </Link>
            <Link
              to="/menu"
              className="text-xs font-medium text-muted hover:text-ink transition-colors underline ml-1"
            >
              Explore daily menu
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 relative w-full max-w-lg">
          <div className="rounded-card overflow-hidden shadow-card border border-rule bg-card">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&h=500&fit=crop"
              alt="Fresh balanced organic meal bowl"
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
          <div className="absolute top-4 left-4 bg-paper/95 text-ink text-xs font-medium px-3 py-1 rounded-pill border border-rule shadow-sm">
            100% natural ingredients
          </div>
          <div className="absolute bottom-4 right-4 bg-card/95 text-accent font-medium text-xs px-3 py-1 rounded-pill border border-rule shadow-sm">
            Daily doorstep delivery
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 2: ABOUT TEASER
   ────────────────────────────────────────────── */
function AboutTeaser() {
  const animRef = useScrollAnimation();

  return (
    <section ref={animRef} className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHeading
        title="Know About FitFuel Nutrition"
        subtitle="Dedicated to clean, wholesome nutrition cooked fresh each morning in Kottayam"
      />
      <div className="max-w-3xl mx-auto text-center text-ink-2 space-y-4 text-sm sm:text-base leading-relaxed">
        <p>
          At FitFuel Nutrition, we believe that eating well should be straightforward. Our nutritionist-designed meals are prepared fresh every day using locally sourced ingredients, ensuring the right balance of taste and nutrition on your plate.
        </p>
        <p className="text-muted">
          Based in Kottayam, we deliver wholesome breakfast, lunch, and dinner plans directly to your doorstep so you can stay consistent with your health goals without the stress of daily grocery shopping and meal preparation.
        </p>
      </div>
      <div className="text-center mt-8">
        <Link
          to="/about"
          className="inline-block border border-rule-2 hover:border-accent text-ink hover:text-accent rounded-pill px-6 py-2.5 text-xs font-medium transition-colors bg-card shadow-xs"
        >
          Read our story and mission
        </Link>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 3: PLANS FOR EVERY GOAL
   ────────────────────────────────────────────── */
function PlansSection() {
  const { plans } = useData();
  const animRef = useScrollAnimation();

  const displayPlans = plans.filter((p) => p.slug !== 'combo').slice(0, 3);

  return (
    <section ref={animRef} className="max-w-6xl mx-auto px-4 py-16 border-t border-rule">
      <SectionHeading
        title="Plans for Every Goal"
        subtitle="Choose the meal plan suited to your daily routine and schedule"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {displayPlans.map((plan) => (
          <PlanCard key={plan.slug} plan={plan} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 4: FEATURE STRIP
   ────────────────────────────────────────────── */
function FeatureStrip() {
  const animRef = useScrollAnimation();

  return (
    <section ref={animRef} className="bg-paper-2 py-16 border-y border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 4.5: CUSTOM PLAN PROMO BANNER
   ────────────────────────────────────────────── */
function CustomPlanBanner() {
  const animRef = useScrollAnimation();

  return (
    <section ref={animRef} className="py-16 md:py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-primary-dark rounded-card p-8 sm:p-12 text-paper border border-rule-2 shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-center lg:text-left">
              <span className="inline-block text-xs font-medium text-accent-2 border border-accent-2/40 rounded-pill px-3 py-1 mb-3">
                Personalized Nutrition Service
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-paper leading-tight">
                Need a Custom Calorie & Macro Target?
              </h2>
              <p className="text-paper-2 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl">
                Just like Healthiqo, we customize meal schedules for weight loss, lean muscle gain, maintenance, or specific dietary preferences. Share your height, weight, and fitness goal, and we will format your plan directly on WhatsApp.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-6 max-w-md mx-auto lg:mx-0 text-center text-xs">
                <div className="bg-white/5 rounded-control p-2.5 border border-white/10">
                  <p className="font-semibold text-accent-2">Customized</p>
                  <p className="text-paper-2 text-[11px] mt-0.5">Macro targets</p>
                </div>
                <div className="bg-white/5 rounded-control p-2.5 border border-white/10">
                  <p className="font-semibold text-accent-2">Kottayam</p>
                  <p className="text-paper-2 text-[11px] mt-0.5">Daily delivery</p>
                </div>
                <div className="bg-white/5 rounded-control p-2.5 border border-white/10">
                  <p className="font-semibold text-accent-2">WhatsApp</p>
                  <p className="text-paper-2 text-[11px] mt-0.5">Instant booking</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center gap-3">
              <Link
                to="/custom-plan"
                className="w-full sm:w-auto bg-accent hover:bg-accent-2 hover:text-ink text-accent-ink font-medium text-xs sm:text-sm px-6 py-3.5 rounded-pill transition-colors text-center shadow-xs"
              >
                Design custom plan
              </Link>
              <Link
                to="/menu"
                className="text-xs text-paper-2 hover:text-paper transition-colors underline"
              >
                Or check today’s fresh menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 5: MEET OUR TEAM
   Photos removed as requested by user.
   Typography & credentials focused.
   ────────────────────────────────────────────── */
function TeamSection() {
  const animRef = useScrollAnimation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section ref={animRef} className="max-w-6xl mx-auto px-4 py-16 border-t border-rule">
      <SectionHeading
        title="Meet Our Team"
        subtitle="Certified clinical nutritionists and chefs dedicated to healthy culinary craft in Kottayam"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-6 mt-10">
        {team.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
      <div className="text-center mt-10">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="border border-rule-2 hover:border-accent text-ink hover:text-accent rounded-pill px-6 py-2.5 text-xs font-medium transition-colors bg-card shadow-xs cursor-pointer whitespace-nowrap"
        >
          Connect with our nutrition team
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Connect with our team">
        <EnquiryForm onSuccess={() => setModalOpen(false)} />
      </Modal>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 6: TESTIMONIALS SLIDER
   Clean typographic initials, no stock faces.
   ────────────────────────────────────────────── */
function TestimonialsSlider() {
  const animRef = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section ref={animRef} className="bg-paper-2 py-16 md:py-24 border-y border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Customer Experiences"
          subtitle="Real reviews from subscribers across Kottayam"
        />

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="w-full shrink-0 px-3">
                <div className="bg-card rounded-card border border-rule p-8 max-w-xl mx-auto text-center flex flex-col items-center shadow-card">
                  <div className="w-12 h-12 rounded-pill bg-paper-2 border border-rule-2 flex items-center justify-center font-display font-semibold text-accent text-sm mb-4 select-none">
                    {t.initials || 'HF'}
                  </div>
                  <blockquote className="text-ink text-sm sm:text-base leading-relaxed italic mb-4 max-w-lg">
                    “{t.text}”
                  </blockquote>
                  <div>
                    <p className="font-semibold text-xs text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-8 h-8 rounded-pill border border-rule-2 bg-card text-ink hover:text-accent flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`w-2 h-2 rounded-pill transition-colors cursor-pointer ${
                    idx === current ? 'bg-accent w-4' : 'bg-rule-2'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="w-8 h-8 rounded-pill border border-rule-2 bg-card text-ink hover:text-accent flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 7: FAQ ACCORDION
   ────────────────────────────────────────────── */
function FaqAccordion() {
  const animRef = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section ref={animRef} className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about subscriptions and delivery in Kottayam"
      />

      <div className="mt-10 space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-rule rounded-card overflow-hidden bg-card transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-xs sm:text-sm text-ink hover:bg-paper transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <span className="text-sm font-semibold ml-4 shrink-0 text-muted">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-xs text-muted leading-relaxed border-t border-rule/50 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 8: CTA BANNER
   ────────────────────────────────────────────── */
function CtaBanner() {
  const animRef = useScrollAnimation();
  const cleanPhone = (contactInfo.phone || '+919072743223').replace(/\s+/g, '');

  return (
    <section ref={animRef} className="bg-primary-dark w-full py-16 border-t border-rule-2">
      <div className="max-w-4xl mx-auto px-4 text-center text-paper">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-paper">
          Ready to Start Your Wellness Journey?
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-paper-2 max-w-xl mx-auto leading-relaxed">
          Take the first step toward clean, hassle-free nutrition. Select a weekly plan or create a custom nutrition schedule today.
        </p>
        <div className="mt-7 flex flex-wrap gap-3.5 justify-center">
          <Link
            to="/custom-plan"
            className="bg-accent hover:bg-accent-2 hover:text-ink text-accent-ink px-6 py-3 rounded-pill font-medium text-xs sm:text-sm transition-colors shadow-xs"
          >
            Design custom plan
          </Link>
          <a
            href={`tel:${cleanPhone}`}
            className="border border-paper/40 hover:border-paper text-paper px-6 py-3 rounded-pill font-medium text-xs sm:text-sm transition-colors"
          >
            Call {contactInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   HOME PAGE
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutTeaser />
      <PlansSection />
      <FeatureStrip />
      <CustomPlanBanner />
      <TeamSection />
      <TestimonialsSlider />
      <FaqAccordion />
      <CtaBanner />
    </>
  );
}
