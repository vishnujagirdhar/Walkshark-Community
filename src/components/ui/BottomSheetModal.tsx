"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
}) => {
  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Blurred Navy-tinted backdrop (Navy at 40% opacity) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm transition-opacity"
          />

          {/* Dialog Card on desktop / Bottom Sheet on mobile */}
          <motion.div
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className={`relative w-full sm:max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-t-sheet sm:rounded-card shadow-soft p-6 sm:p-8 z-10 ${className}`}
          >
            {/* Mobile Drag Handle */}
            <div className="sm:hidden flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-fog rounded-full" />
            </div>

            {title && (
              <div className="flex items-center justify-between pb-3 border-b border-fog mb-4">
                <h3 className="font-heading font-bold text-lg text-navy">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-fog flex items-center justify-center text-navy font-bold text-sm hover:bg-fog-border transition-colors"
                >
                  ✕
                </button>
              </div>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
