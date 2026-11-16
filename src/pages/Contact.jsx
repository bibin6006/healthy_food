import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { contactInfo } from '../data/siteData';
import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number.';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please let us know how we can help you.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    console.log('Healthy Food Cloud Kitchen - Contact Submission:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 400);
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
            <span className="text-ink font-medium">Contact us</span>
          </nav>
          <span className="inline-block text-xs font-semibold text-accent border border-rule-2 rounded-pill px-3 py-1 mb-3">
            Direct kitchen assistance
          </span>
          <h1 className="text-display-s sm:text-display font-display font-semibold text-ink tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="lead text-muted max-w-2xl mx-auto">
            Reach our Kottayam cloud kitchen team for dietary questions and meal subscriptions.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Contact Info */}
      <section className="py-16 md:py-20 border-b border-rule">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-card rounded-card p-6 sm:p-8 border border-rule">
              <h2 className="text-2xl font-display font-semibold text-ink mb-2">
                Send our kitchen a message
              </h2>
              <p className="text-xs text-muted mb-6">
                Fill out the form below. We usually reply within two hours during kitchen hours.
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-paper rounded-control border border-accent/40 text-xs text-ink flex items-start gap-3">
                  <div className="w-5 h-5 rounded-pill bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Thank you for your enquiry</p>
                    <p className="text-muted mt-0.5">Our nutritionist team in Kottayam will contact you shortly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-ink mb-1">
                    Your full name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Anjali Nair"
                    className={`w-full px-3.5 py-2.5 rounded-control border bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                      errors.name ? 'border-error' : 'border-rule'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-ink mb-1">
                      Phone number <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9072743223"
                      className={`w-full px-3.5 py-2.5 rounded-control border bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        errors.phone ? 'border-error' : 'border-rule'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-ink mb-1">
                      Email address <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. anjali@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-control border bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        errors.email ? 'border-error' : 'border-rule'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-ink mb-1">
                    Your message or dietary question <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your dietary goals, health conditions, or delivery inquiries..."
                    className={`w-full px-3.5 py-2.5 rounded-control border bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                      errors.message ? 'border-error' : 'border-rule'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-error mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs py-3 rounded-pill transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending message...' : 'Submit message'}
                </button>
              </form>
            </div>

            {/* Right Column: Contact Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-card rounded-card p-6 border border-rule">
                <h3 className="text-lg font-display font-semibold text-ink mb-4">
                  Kitchen coordinates
                </h3>

                <div className="space-y-4 text-xs">
                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-pill bg-paper border border-rule flex items-center justify-center text-accent flex-shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xs font-semibold text-muted">Phone orders</p>
                      <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="font-semibold text-ink hover:text-accent transition-colors text-sm">
                        {contactInfo.phone}
                      </a>
                      <p className="text-muted mt-0.5">Mon to Sun: 6:30 AM to 9:30 PM</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-pill bg-paper border border-rule flex items-center justify-center text-whatsapp flex-shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.765.457 3.486 1.328 5.004L2 22l5.093-1.336A10.024 10.024 0 0 0 12.031 22c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.286c-1.543 0-3.051-.414-4.37-1.2l-.313-.186-3.242.85.865-3.16-.204-.324a8.232 8.232 0 0 1-1.267-4.435c0-4.57 3.717-8.286 8.286-8.286 4.57 0 8.286 3.717 8.286 8.286 0 4.57-3.716 8.286-8.286 8.286z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xs font-semibold text-muted">WhatsApp desk</p>
                      <a
                        href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-ink hover:text-accent transition-colors text-sm"
                      >
                        {contactInfo.whatsapp}
                      </a>
                      <p className="text-muted mt-0.5">Instant menu recommendations and custom plans</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-pill bg-paper border border-rule flex items-center justify-center text-accent flex-shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xs font-semibold text-muted">Email address</p>
                      <a href={`mailto:${contactInfo.email}`} className="font-semibold text-ink hover:text-accent transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-pill bg-paper border border-rule flex items-center justify-center text-accent flex-shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xs font-semibold text-muted">Kitchen headquarters</p>
                      <p className="font-semibold text-ink">{contactInfo.address}</p>
                      <p className="text-muted">{contactInfo.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Window Card */}
              <div className="bg-card rounded-card p-6 border border-rule text-xs">
                <h4 className="font-display font-semibold text-ink text-sm mb-2">
                  Delivery slots across Kottayam
                </h4>
                <div className="space-y-1.5 text-muted">
                  <div className="flex justify-between py-1 border-b border-rule">
                    <span>Breakfast slot</span>
                    <span className="font-medium text-ink">7:00 AM to 9:00 AM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-rule">
                    <span>Lunch slot</span>
                    <span className="font-medium text-ink">11:30 AM to 2:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Dinner slot</span>
                    <span className="font-medium text-ink">6:30 PM to 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="py-16 bg-paper-2">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            title="Our Kitchen in Kottayam"
            subtitle="Central cloud kitchen delivering fresh meals across Kottayam town and surrounding areas."
          />

          <div className="mt-8 overflow-hidden rounded-card border border-rule shadow-sm bg-card">
            <iframe
              title="Healthy Food Cloud Kitchen Location in Kottayam"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62947.88609538356!2d76.48834465499256!3d9.591566777322967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba16c6b435f%3A0xbe2b02f68f8dd06e!2sKottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
