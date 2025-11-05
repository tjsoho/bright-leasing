/* ************************************************************
                        NOTES
************************************************************ */
// Thank you modal component for contact form success
// Displays a branded modal with logo, image, title, and message
// Styled inline with homepage design
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { BWestButton } from "@/components/ui/b-west-button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleBold: boolean;
  message: string;
  messageBold: boolean;
  image: string;
  logo: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function ThankYouModal({
  isOpen,
  onClose,
  title,
  titleBold,
  message,
  messageBold,
  image,
  logo,
}: ThankYouModalProps) {
  /* ************************************************************
                            HOOKS
    ************************************************************ */
  const [logoError, setLogoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset error states when modal opens or image/logo changes
  useEffect(() => {
    if (isOpen) {
      setLogoError(false);
      setImageError(false);
    }
  }, [isOpen, logo, image]);

  /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
  const isValidImage = (src: string | undefined): boolean => {
    if (!src) return false;
    const trimmed = src.trim();
    const isValid =
      trimmed !== "" &&
      trimmed !== "/placeholder.jpg" &&
      trimmed !== "undefined" &&
      trimmed !== "null";

    // Debug logging
    if (isOpen) {
      console.log("Image validation:", { src, trimmed, isValid });
    }

    return isValid;
  };

  const isExternalUrl = (url: string): boolean => {
    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("//")
    );
  };

  /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  /* ************************************************************
                            RENDER
    ************************************************************ */
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4 md:p-6"
          >
            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] max-w-4xl w-full relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* ************************************************************
                                MODAL CONTENT - SPLIT LAYOUT
                            ************************************************************ */}
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                {/* ************************************************************
                                    LEFT COLUMN - IMAGE WITH BRAND YELLOW BG
                                ************************************************************ */}
                <div className="relative bg-brand-yellow flex items-center justify-center p-8 lg:p-12 order-2 lg:order-1">
                  {isValidImage(image) && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <div className="relative w-full h-full flex items-center max-h-[400px]">
                        <Image
                          src={image}
                          alt="Thank you"
                          height={400}
                          width={400}
                          className="object-contain"
                          onError={() => {
                            console.error("Image failed to load:", image);
                            setImageError(true);
                          }}
                          onLoad={() => {
                            console.log("Image loaded successfully:", image);
                            setImageError(false);
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* ************************************************************
                                    RIGHT COLUMN - CONTENT (CENTERED)
                                ************************************************************ */}
                <div className="flex flex-col justify-center items-center text-center px-8 py-12 lg:px-12 lg:py-16 order-1 lg:order-2">
                  {/* Logo */}
                  {isValidImage(logo) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mb-8"
                    >
                      <Image
                        src={logo}
                        alt="Bright Leasing Logo"
                        width={140}
                        height={56}
                        className="h-14 w-auto object-contain mx-auto"
                        onError={() => {
                          console.error("Logo failed to load:", logo);
                          setLogoError(true);
                        }}
                        onLoad={() => {
                          console.log("Logo loaded successfully:", logo);
                          setLogoError(false);
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Title */}
                  {title && title.trim() !== "" && (
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`text-5xl md:text-6xl lg:text-7xl font-bold text-brand-black mb-6 leading-[1.1] ${titleBold ? "h1-bold" : ""}`}
                    >
                      {title}
                    </motion.h2>
                  )}

                  {/* Message */}
                  {message && message.trim() !== "" && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-8 ${messageBold ? "p-bold" : ""}`}
                    >
                      {message}
                    </motion.p>
                  )}

                  {/* Close Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full flex justify-center"
                  >
                    <BWestButton
                      text="Close"
                      onClick={onClose}
                      className="w-full max-w-xs"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
