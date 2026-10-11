"use client";

import React from "react";
import { MascotFinn, MascotMood } from "../mascot/MascotFinn";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface MascotMessageProps {
  mood?: MascotMood;
  title?: string;
  message: string;
  className?: string;
  variant?: "white" | "teal" | "fog" | "yellow" | "blue";
  size?: "sm" | "md" | "lg";
  action?: React.ReactNode;
}

export const MascotMessage: React.FC<MascotMessageProps> = ({
  mood = "idle",
  title,
  message,
  className,
  variant = "white",
  size = "md",
  action,
}) => {
  const variantStyles = {
    white: "bg-white text-navy shadow-soft border border-fog",
    teal: "bg-teal-50 text-navy shadow-soft border border-teal-100",
    fog: "bg-fog text-navy shadow-subtle",
    yellow: "bg-teal-50 text-navy shadow-soft border border-teal-100",
    blue: "bg-teal-50 text-navy shadow-soft border border-teal-100",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 sm:p-6 rounded-card transition-all",
          variantStyles[variant] || variantStyles.white,
          className
        )
      )}
    >
      <div className="flex-shrink-0">
        <MascotFinn mood={mood} size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"} showBadge={false} />
      </div>
      <div className="flex-1 text-center sm:text-left">
        {title && (
          <h4 className="font-heading font-bold text-base sm:text-lg text-navy tracking-tight mb-1">
            {title}
          </h4>
        )}
        <p className="text-sm font-body text-navy-muted leading-relaxed">{message}</p>
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
};
