"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "navy" | "outline" | "danger" | "ghost" | "accent" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  icon,
  className,
  disabled,
  ...props
}) => {
  // Strict brand palette variants
  const variantStyles = {
    // Primary: Teal gradient with soft teal glow
    primary:
      "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-teal-glow hover:opacity-95 active:opacity-90",
    accent:
      "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-teal-glow hover:opacity-95 active:opacity-90",
    // Secondary / White: White with hairline Fog Grey border and Deep Navy text
    secondary:
      "bg-white text-navy border border-fog shadow-subtle hover:bg-fog-light active:bg-fog",
    white:
      "bg-white text-navy border border-fog shadow-subtle hover:bg-fog-light active:bg-fog",
    // Navy card button
    navy:
      "bg-gradient-navy-card text-white shadow-navy-glow hover:opacity-95 active:opacity-90",
    outline:
      "bg-transparent text-navy border border-fog hover:bg-white active:bg-fog-light",
    danger:
      "bg-navy-900 text-white shadow-navy-glow hover:bg-navy-700",
    ghost:
      "bg-transparent text-navy hover:bg-teal-50 active:bg-teal-100",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs min-h-[38px] rounded-button",
    md: "px-5 py-2.5 text-sm min-h-[46px] rounded-button", // >= 44px touch target
    lg: "px-6 py-3.5 text-base min-h-[52px] rounded-button",
    xl: "px-8 py-4 text-base min-h-[56px] rounded-button",
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -2 }}
      whileTap={disabled || isLoading ? undefined : { y: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      disabled={disabled || isLoading}
      className={twMerge(
        clsx(
          "relative inline-flex items-center justify-center font-heading font-bold select-none text-center cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
          variantStyles[variant] || variantStyles.primary,
          sizeStyles[size],
          fullWidth && "w-full",
          (disabled || isLoading) && "opacity-50 cursor-not-allowed transform-none shadow-none",
          className
        )
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span className="font-body text-xs font-normal">Please wait...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </span>
      )}
    </motion.button>
  );
};

export const BrutalistButton = Button;
