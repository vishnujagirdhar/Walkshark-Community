"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface LiquidProgressBarProps {
  current: number;
  target: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export const LiquidProgressBar: React.FC<LiquidProgressBarProps> = ({
  current,
  target,
  label,
  sublabel,
  className,
}) => {
  const percentage = Math.min(Math.max(Math.round((current / (target || 1)) * 100), 0), 100);

  return (
    <div className={twMerge(clsx("w-full space-y-2 select-none", className))}>
      {(label || sublabel) && (
        <div className="flex items-center justify-between text-xs font-body font-medium">
          <span className="text-navy">{label}</span>
          <span className="text-teal-600 font-bold">{percentage}% ({current} / {target} pts)</span>
        </div>
      )}

      {/* Progress Track: Fog Grey with 16px radius */}
      <div className="relative h-4 sm:h-5 w-full bg-fog rounded-full overflow-hidden p-0.5">
        {/* Animated Workshop Teal Fill with subtle shimmer */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full overflow-hidden shadow-teal-glow"
        >
          {/* Subtle wave shimmer in white opacity */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-pulse" />
        </motion.div>
      </div>

      {sublabel && (
        <p className="text-xs font-body text-navy-muted pt-0.5">{sublabel}</p>
      )}
    </div>
  );
};
