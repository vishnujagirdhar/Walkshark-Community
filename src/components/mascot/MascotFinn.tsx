"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type MascotMood =
  | "hero"
  | "idle"
  | "celebrating"
  | "reviewing"
  | "empty"
  | "walking"
  | "error";

interface MascotFinnProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  speechText?: string;
  className?: string;
  interactive?: boolean; // Follows cursor subtly if true
  showBadge?: boolean;
}

const moodMicrocopy: Record<MascotMood, string> = {
  hero: "Let's walk, fam 🦈",
  idle: "Keep moving, keep earning.",
  celebrating: "Finn approved this one! 🎉",
  reviewing: "Finn's team is reviewing your proof... 🔍",
  empty: "Nothing here yet, fam! Drop your first link.",
  walking: "10,000 steps closer to your next ₹250!",
  error: "Whoops! Even sharks hit the wrong reef.",
};

const sizeClasses: Record<string, { wrapper: string; img: number; text: string }> = {
  sm: { wrapper: "w-14 h-14", img: 56, text: "text-xs" },
  md: { wrapper: "w-24 h-24", img: 96, text: "text-xs" },
  lg: { wrapper: "w-40 h-40", img: 160, text: "text-sm" },
  xl: { wrapper: "w-56 h-56", img: 224, text: "text-sm" },
  hero: { wrapper: "w-64 h-64 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px]", img: 380, text: "text-base" },
};

function getMascotAsset(mood: MascotMood): string {
  switch (mood) {
    case "hero":
      return "/mascot/with package.png";
    case "celebrating":
      return "/mascot/front.png";
    case "walking":
      return "/mascot/left.png";
    case "reviewing":
      return "/mascot/right.png";
    case "empty":
    case "error":
      return "/mascot/front.png";
    case "idle":
    default:
      return "/mascot/front.png";
  }
}

export const MascotFinn: React.FC<MascotFinnProps> = ({
  mood = "idle",
  size = "md",
  speechText,
  className = "",
  interactive = false,
  showBadge = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const text = speechText || moodMicrocopy[mood];
  const sizeConfig = sizeClasses[size] || sizeClasses.md;
  const assetSrc = getMascotAsset(mood);

  // Mouse tilt / cursor follow for hero mascot
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-200, 200], [6, -6]);
  const rotateY = useTransform(smoothX, [-200, 200], [-6, 6]);
  const translateX = useTransform(smoothX, [-200, 200], [-10, 10]);
  const translateY = useTransform(smoothY, [-200, 200], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft Rounded Speech Bubble */}
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`mb-3 relative max-w-xs sm:max-w-sm px-4 py-2 bg-white rounded-2xl shadow-soft border border-fog text-navy font-body font-medium ${sizeConfig.text} text-center z-20`}
        >
          <span>{text}</span>
          {/* Subtle bubble tail */}
          <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-fog rotate-45" />
        </motion.div>
      )}

      {/* Mascot Graphic with Smooth Motion */}
      <motion.div
        style={
          interactive
            ? {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformPerspective: 800,
              }
            : undefined
        }
        animate={
          interactive
            ? undefined
            : mood === "celebrating"
            ? {
                y: [0, -10, 0],
                rotate: [-1.5, 1.5, -1.5],
                transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
              }
            : {
                y: [0, -6, 0],
                transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
              }
        }
        className={`relative ${sizeConfig.wrapper} flex items-center justify-center filter drop-shadow-[0_14px_28px_rgba(12,35,66,0.12)]`}
      >
        {!imageError ? (
          <Image
            src={assetSrc}
            alt="Mr. Finn - WalkShark Mascot"
            width={sizeConfig.img}
            height={sizeConfig.img}
            priority={size === "hero" || size === "xl"}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain pointer-events-none"
          />
        ) : (
          /* Palette-compliant Vector Fallback */
          <div className="w-full h-full p-2 flex items-center justify-center bg-white rounded-3xl shadow-soft border border-fog">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="90" fill="#12789C" />
              <path
                d="M100 20 C100 20 120 50 140 60 C120 60 105 50 100 20 Z"
                fill="#0E6180"
              />
              <ellipse cx="100" cy="120" rx="55" ry="45" fill="#E6F2F6" />
              <circle cx="80" cy="85" r="10" fill="#FFFFFF" />
              <circle cx="82" cy="85" r="5" fill="#0C2342" />
              <circle cx="120" cy="85" r="10" fill="#FFFFFF" />
              <circle cx="122" cy="85" r="5" fill="#0C2342" />
              <path
                d="M75 115 Q100 135 125 115"
                stroke="#0C2342"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        )}

        {/* Optional Finn Badge */}
        {showBadge && (
          <div className="absolute -bottom-2 bg-navy-900 text-white text-[11px] font-body font-bold px-2.5 py-0.5 rounded-full shadow-subtle">
            Mr. Finn
          </div>
        )}
      </motion.div>
    </div>
  );
};
