import { useState, useEffect, useCallback } from "react";

function Modal({ isOpen, onClose, title, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      } bg-ink/65`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-card bg-card p-6 sm:p-8 shadow-elevated border border-rule transition-transform transition-opacity duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-rule">
          <h2 className="text-lg font-display font-semibold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-pill text-muted hover:text-ink flex items-center justify-center transition-colors cursor-pointer text-base"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>
  );
}

function EnquiryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    goal: "Weight Loss",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Phone must be a valid 10-digit number.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-10 h-10 rounded-pill bg-paper-2 text-accent border border-rule flex items-center justify-center mx-auto mb-3">
          ✓
        </div>
        <p className="text-sm font-display font-semibold text-ink">
          Enquiry received
        </p>
        <p className="text-xs text-muted mt-1">
          Our Kottayam kitchen team will reach out to you shortly.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-control border border-rule bg-paper px-3.5 py-2 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="modal-name" className="block text-xs font-medium text-ink mb-1">
          Full Name <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="modal-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Arun George"
          className={inputClasses}
        />
        {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="modal-phone" className="block text-xs font-medium text-ink mb-1">
          Phone Number <span className="text-error">*</span>
        </label>
        <input
          type="tel"
          id="modal-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          className={inputClasses}
        />
        {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="modal-goal" className="block text-xs font-medium text-ink mb-1">
          Primary Health Goal
        </label>
        <select
          id="modal-goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Maintain Weight">Maintain Weight</option>
          <option value="General Wellness">General Wellness</option>
          <option value="Other">Custom Requirements</option>
        </select>
      </div>

      <div>
        <label htmlFor="modal-message" className="block text-xs font-medium text-ink mb-1">
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="modal-message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your dietary goals or location in Kottayam..."
          className={`${inputClasses} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-error">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-pill bg-accent py-2.5 text-accent-ink font-medium text-xs hover:bg-primary-dark transition-colors cursor-pointer shadow-xs"
      >
        Submit Enquiry
      </button>
    </form>
  );
}

export { Modal, EnquiryForm };
export default Modal;
