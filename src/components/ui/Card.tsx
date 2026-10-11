"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "white" | "teal" | "navy" | "light" | "fog" | "yellow" | "blue" | "offwhite" | "dark";
  hoverEffect?: boolean;
  className?: string;
  badge?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "white",
  hoverEffect = false,
  className,
  badge,
  ...props
}) => {
  // Map old brutalist variants gracefully into strict palette
  const variantStyles = {
    white: "bg-white text-navy shadow-soft",
    offwhite: "bg-white text-navy shadow-soft",
    // Teal gradient
    teal: "bg-gradient-teal-card text-white shadow-teal-glow",
    blue: "bg-gradient-teal-card text-white shadow-teal-glow",
    // Navy gradient
    navy: "bg-gradient-navy-card text-white shadow-navy-glow",
    dark: "bg-gradient-navy-card text-white shadow-navy-glow",
    // Light card: white to fog grey
    light: "bg-gradient-light-card text-navy shadow-soft border border-fog",
    yellow: "bg-teal-50 text-navy shadow-soft border border-teal-100", // Yellow mapped to soft teal 50
    fog: "bg-fog text-navy shadow-subtle",
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, boxShadow: "0 14px 36px rgba(12, 35, 66, 0.12)" } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={twMerge(
        clsx(
          "relative rounded-card p-6 sm:p-7 transition-all overflow-hidden",
          variantStyles[variant] || variantStyles.white,
          className
        )
      )}
      {...props}
    >
      {badge && (
        <div className="absolute top-4 right-5 z-10">
          {badge}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export const BrutalistCard = Card;
