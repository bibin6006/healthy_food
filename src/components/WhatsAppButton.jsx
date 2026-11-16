import React from "react";
import { contactInfo } from "../data/siteData";

const WhatsAppButton = () => {
  const cleanNumber = (contactInfo.whatsapp || '919072743223').replace(/[^0-9]/g, '');

  return (
    <a
      href={`https://wa.me/${cleanNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-pill bg-whatsapp hover:bg-whatsapp-dark shadow-elevated hover:scale-105 transition-transform duration-200 whatsapp-pulse"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 md:w-7 md:h-7 fill-white"
        aria-hidden="true"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.129 6.744 3.047 9.383L1.053 31.25l6.063-1.947A15.906 15.906 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.32 22.602c-.393 1.107-1.941 2.027-3.186 2.295-.852.182-1.963.326-5.705-1.227-4.787-1.986-7.867-6.834-8.105-7.15-.228-.318-1.918-2.557-1.918-4.877s1.213-3.459 1.643-3.932c.43-.473.94-.592 1.254-.592.312 0 .627.004.9.016.29.014.678-.109.96.732.393 1.17.893 2.846.97 3.053.08.207.132.449.027.72-.107.275-.16.447-.318.689-.158.24-.332.537-.475.72-.158.203-.324.422-.14.828.186.406.826 1.363 1.773 2.209 1.219 1.088 2.246 1.424 2.564 1.584.318.158.504.131.689-.08.186-.213.799-.926 1.012-1.244.213-.318.426-.264.717-.158.293.107 1.854.875 2.172 1.033.318.158.53.24.607.369.08.131.08.762-.312 1.869z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
