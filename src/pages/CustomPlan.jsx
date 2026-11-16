import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { contactInfo } from '../data/siteData';

export default function CustomPlan() {
  const { addInquiry } = useData();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    goal: 'Weight Loss',
    customGoal: '',
    foodPreference: 'Non-Vegetarian',
    customFoodPreference: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const goalOptions = [
    { id: 'Weight Loss', label: 'Weight Loss', description: 'Calorie deficit with high satiety' },
    { id: 'Muscle Gain', label: 'Muscle Gain', description: 'High-protein meals for lean mass' },
    { id: 'Maintain Weight', label: 'Maintain Weight', description: 'Balanced energy and macronutrients' },
    { id: 'General Wellness', label: 'General Wellness', description: 'Clean, wholesome everyday meals' },
    { id: 'Custom', label: 'Custom Goal', description: 'Specify your own fitness target' },
  ];

  const foodOptions = [
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Non-Vegetarian', label: 'Non-Vegetarian' },
    { id: 'Eggetarian', label: 'Eggetarian' },
    { id: 'Vegan', label: 'Vegan' },
    { id: 'High-Protein', label: 'High-Protein Focus' },
    { id: 'Keto / Low-Carb', label: 'Keto or Low-Carb' },
    { id: 'Custom', label: 'Custom Preferences' },
  ];

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please provide your full name.';
    if (!formData.age || Number(String(formData.age).replace(/[^0-9]/g, '')) <= 0) {
      nextErrors.age = 'Please enter a valid age.';
    }
    if (!formData.height.trim()) nextErrors.height = 'Please enter your height (e.g. 175 cm or 5 ft 8 in).';
    if (!formData.weight || Number(String(formData.weight).replace(/[^0-9.]/g, '')) <= 0) {
      nextErrors.weight = 'Please enter your weight in kg (e.g. 70).';
    }
    if (formData.goal === 'Custom' && !formData.customGoal.trim()) {
      nextErrors.customGoal = 'Please specify your custom goal.';
    }
    if (formData.foodPreference === 'Custom' && !formData.customFoodPreference.trim()) {
      nextErrors.customFoodPreference = 'Please describe your food preference.';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Smooth scroll to top of form or first error
      const formEl = document.getElementById('custom-plan-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    setErrors({});

    const finalGoal = formData.goal === 'Custom' ? formData.customGoal.trim() : formData.goal;
    const finalPreference =
      formData.foodPreference === 'Custom'
        ? formData.customFoodPreference.trim()
        : formData.foodPreference;

    const cleanHeight = formData.height.trim();
    const cleanWeight = formData.weight.trim().toLowerCase().includes('kg')
      ? formData.weight.trim()
      : `${formData.weight.trim()} kg`;

    // Build the formatted WhatsApp message with all user-selected options
    const lines = [
      '*FITFUEL NUTRITION: CUSTOM PLAN REQUEST*',
      '----------------------------------------',
      '*Customer Information:*',
      `• Name: ${formData.name.trim()}`,
      `• Age: ${formData.age} years`,
      `• Height: ${cleanHeight}`,
      `• Weight: ${cleanWeight}`,
      '',
      '*Health & Nutrition Goals:*',
      `• Primary Goal: ${finalGoal}`,
      `• Food Preference: ${finalPreference}`,
      '',
      '*Additional Information / Requirements:*',
      formData.message.trim() ? `• ${formData.message.trim()}` : '• None provided',
      '----------------------------------------',
      '_Submitted via FitFuel Nutrition Custom Plan Builder_',
    ];

    const messageText = lines.join('\n');
    const cleanNumber = (contactInfo.whatsapp || '919072743223').replace(/[^0-9]/g, '');
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(messageText)}`;

    // Persist to backup storage
    try {
      addInquiry({
        type: 'custom_plan',
        name: formData.name.trim(),
        phone: contactInfo.phone,
        age: formData.age,
        height: cleanHeight,
        weight: cleanWeight,
        goal: finalGoal,
        foodPreference: finalPreference,
        message: formData.message.trim(),
        targetCalories: 'Calculated upon review',
      });
    } catch (err) {
      console.warn('Inquiry record note:', err);
    }

    setRedirectUrl(waUrl);
    setIsSubmitted(true);

    // Direct redirection - works reliably without being blocked by popup blockers
    window.location.href = waUrl;
  };

  return (
    <div className="bg-paper min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink font-medium">Custom Plan</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-block text-xs font-semibold text-accent border border-rule-2 rounded-pill px-3 py-1 mb-3">
            Nutritionist Consultation
          </span>
          <h1 className="text-display-s sm:text-display font-display text-ink font-semibold leading-tight">
            Design Your Custom Nutrition Plan
          </h1>
          <p className="lead text-muted mt-3">
            Share your biometrics, target goals, and food preferences. We will tailor a personalized meal schedule and connect you directly with our nutritionist via WhatsApp.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card rounded-card border border-rule p-6 sm:p-10 shadow-card">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-pill bg-paper-2 border border-rule-2 flex items-center justify-center mx-auto text-accent">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-semibold text-ink">
                Your Custom Plan Details Are Ready
              </h2>
              <p className="text-sm text-muted max-w-md mx-auto">
                WhatsApp should open automatically with your prefilled details. If it did not open, click the button below to connect with our kitchen directly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-medium text-sm px-6 py-3 rounded-pill transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.129 6.744 3.047 9.383L1.053 31.25l6.063-1.947A15.906 15.906 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.32 22.602c-.393 1.107-1.941 2.027-3.186 2.295-.852.182-1.963.326-5.705-1.227-4.787-1.986-7.867-6.834-8.105-7.15-.228-.318-1.918-2.557-1.918-4.877s1.213-3.459 1.643-3.932c.43-.473.94-.592 1.254-.592.312 0 .627.004.9.016.29.014.678-.109.96.732.393 1.17.893 2.846.97 3.053.08.207.132.449.027.72-.107.275-.16.447-.318.689-.158.24-.332.537-.475.72-.158.203-.324.422-.14.828.186.406.826 1.363 1.773 2.209 1.219 1.088 2.246 1.424 2.564 1.584.318.158.504.131.689-.08.186-.213.799-.926 1.012-1.244.213-.318.426-.264.717-.158.293.107 1.854.875 2.172 1.033.318.158.53.24.607.369.08.131.08.762-.312 1.869z" />
                  </svg>
                  <span>Open WhatsApp Message</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="border border-rule-2 text-ink hover:bg-paper-2 font-medium text-sm px-6 py-3 rounded-pill transition-colors cursor-pointer"
                >
                  Edit Information
                </button>
              </div>
            </div>
          ) : (
            <form id="custom-plan-form" onSubmit={handleSubmit} className="space-y-8" noValidate>
              {Object.keys(errors).length > 0 && (
                <div className="p-4 rounded-control bg-error/10 border border-error/30 text-error text-xs flex items-center gap-2.5">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>Please fill in the required fields marked in red to continue.</span>
                </div>
              )}

              {/* Section: Biometrics */}
              <div>
                <h2 className="text-xl font-display font-semibold text-ink mb-1">
                  1. Personal Details
                </h2>
                <p className="text-xs text-muted mb-5">
                  Used by our nutritionist to evaluate baseline caloric requirements.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="custom-name" className="block text-xs font-semibold text-ink mb-1.5">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="custom-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Arun George"
                      className={`w-full px-4 py-2.5 rounded-control border bg-paper text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        errors.name ? 'border-error' : 'border-rule'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                  </div>

                  {/* Age */}
                  <div>
                    <label htmlFor="custom-age" className="block text-xs font-semibold text-ink mb-1.5">
                      Age (Years) <span className="text-error">*</span>
                    </label>
                    <input
                      id="custom-age"
                      type="number"
                      min="12"
                      max="100"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 29"
                      className={`w-full px-4 py-2.5 rounded-control border bg-paper text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        errors.age ? 'border-error' : 'border-rule'
                      }`}
                    />
                    {errors.age && <p className="text-xs text-error mt-1">{errors.age}</p>}
                  </div>

                  {/* Height */}
                  <div>
                    <label htmlFor="custom-height" className="block text-xs font-semibold text-ink mb-1.5">
                      Height <span className="text-error">*</span>
                    </label>
                    <input
                      id="custom-height"
                      type="text"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      placeholder="e.g. 172 cm or 5 ft 8 in"
                      className={`w-full px-4 py-2.5 rounded-control border bg-paper text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        errors.height ? 'border-error' : 'border-rule'
                      }`}
                    />
                    {errors.height && <p className="text-xs text-error mt-1">{errors.height}</p>}
                  </div>

                  {/* Weight */}
                  <div>
                    <label htmlFor="custom-weight" className="block text-xs font-semibold text-ink mb-1.5">
                      Current Weight (kg) <span className="text-error">*</span>
                    </label>
                    <input
                      id="custom-weight"
                      type="number"
                      step="0.5"
                      min="30"
                      max="200"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="e.g. 74"
                      className={`w-full px-4 py-2.5 rounded-control border bg-paper text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        errors.weight ? 'border-error' : 'border-rule'
                      }`}
                    />
                    {errors.weight && <p className="text-xs text-error mt-1">{errors.weight}</p>}
                  </div>
                </div>
              </div>

              {/* Section: Primary Goal */}
              <div className="pt-6 border-t border-rule">
                <h2 className="text-xl font-display font-semibold text-ink mb-1">
                  2. Primary Health Goal
                </h2>
                <p className="text-xs text-muted mb-4">
                  Select your primary fitness objective or enter a custom goal.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {goalOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`relative flex flex-col p-4 rounded-control border transition-colors cursor-pointer ${
                        formData.goal === opt.id
                          ? 'border-accent bg-paper-2'
                          : 'border-rule bg-paper hover:border-rule-2'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-ink">{opt.label}</span>
                        <input
                          type="radio"
                          name="goal"
                          value={opt.id}
                          checked={formData.goal === opt.id}
                          onChange={() => setFormData({ ...formData, goal: opt.id })}
                          className="accent-primary"
                        />
                      </div>
                      <span className="text-xs text-muted">{opt.description}</span>
                    </label>
                  ))}
                </div>

                {formData.goal === 'Custom' && (
                  <div className="mt-4">
                    <label htmlFor="custom-goal-text" className="block text-xs font-semibold text-ink mb-1.5">
                      Specify Your Custom Goal <span className="text-error">*</span>
                    </label>
                    <input
                      id="custom-goal-text"
                      type="text"
                      value={formData.customGoal}
                      onChange={(e) => setFormData({ ...formData, customGoal: e.target.value })}
                      placeholder="e.g. Marathon training endurance diet, PCOS insulin balance..."
                      className={`w-full px-4 py-2.5 rounded-control border bg-paper text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        errors.customGoal ? 'border-error' : 'border-rule'
                      }`}
                    />
                    {errors.customGoal && (
                      <p className="text-xs text-error mt-1">{errors.customGoal}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Section: Food Preferences */}
              <div className="pt-6 border-t border-rule">
                <h2 className="text-xl font-display font-semibold text-ink mb-1">
                  3. Food Preferences
                </h2>
                <p className="text-xs text-muted mb-4">
                  Choose your dietary style or specify custom food requirements.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {foodOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, foodPreference: opt.id })}
                      className={`px-4 py-2 rounded-pill text-xs font-medium border transition-colors cursor-pointer ${
                        formData.foodPreference === opt.id
                          ? 'bg-accent text-accent-ink border-accent'
                          : 'bg-paper text-ink border-rule hover:border-rule-2'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {formData.foodPreference === 'Custom' && (
                  <div className="mt-4">
                    <label htmlFor="custom-pref-text" className="block text-xs font-semibold text-ink mb-1.5">
                      Specify Your Custom Dietary Preferences <span className="text-error">*</span>
                    </label>
                    <input
                      id="custom-pref-text"
                      type="text"
                      value={formData.customFoodPreference}
                      onChange={(e) =>
                        setFormData({ ...formData, customFoodPreference: e.target.value })
                      }
                      placeholder="e.g. Dairy-free, low-sodium, no shellfish, gluten-sensitive..."
                      className={`w-full px-4 py-2.5 rounded-control border bg-paper text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        errors.customFoodPreference ? 'border-error' : 'border-rule'
                      }`}
                    />
                    {errors.customFoodPreference && (
                      <p className="text-xs text-error mt-1">{errors.customFoodPreference}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Section: Additional Message */}
              <div className="pt-6 border-t border-rule">
                <h2 className="text-xl font-display font-semibold text-ink mb-1">
                  4. Additional Information
                </h2>
                <p className="text-xs text-muted mb-3">
                  Any special dietary instructions, delivery preferences, or medical notes for our chef.
                </p>

                <textarea
                  id="custom-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. I work at the Kottayam Medical College and prefer lunch delivered between 12:30 PM and 1:00 PM."
                  className="w-full px-4 py-2.5 rounded-control border border-rule bg-paper text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted text-center sm:text-left">
                  <span>Direct submission to our nutritionist at Kottayam via WhatsApp.</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-primary-dark text-accent-ink font-medium text-sm px-8 py-3.5 rounded-pill transition-colors shadow-sm cursor-pointer"
                >
                  <span>Submit & Open WhatsApp</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
