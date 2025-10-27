"use client";

import { useEffect } from "react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/60 p-4">
      <div
        className="
          relative bg-white dark:bg-[#111] rounded-lg shadow-2xl text-center flex flex-col overflow-hidden
          w-[90%] sm:w-[80%] md:w-[70%] lg:max-w-lg 
          h-[75%] sm:h-[80%] md:h-[83%]
        "
      >
        {/* 🎥 الفيديو */}
        <div className="flex-1 overflow-hidden mb-3 sm:mb-4 rounded-lg">
          <video
            autoPlay
            controls
            loop
            playsInline
            className="w-full h-full object-cover rounded-lg shadow-md"
          >
            <source
              src="https://res.cloudinary.com/dj8hypsia/video/upload/v1761588636/VID-20251027-WA0020_x6vvna.mp4"
              type="video/mp4"
            />
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>

        {/* المحتوى النصي */}
        <div
          className="
            flex flex-col items-center justify-center flex-none 
            px-2 sm:px-4 pb-4 sm:pb-5
            border-t border-gray-200 border-white dark:border-[#111]
          "
        >
          <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
            أهلاً بيك في شركة نايس
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-5">
            نتمنى لك تجربة تسوق ممتعة
          </p>

          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 border-2 border-blue-400 text-[#111] border-[#111] bg-blue-600 font-semibold rounded-md hover:bg-blue-700 transition"
          >
            ادخل للموقع
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
