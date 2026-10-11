"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CountUpNumber } from "./CountUpNumber";
import { MoreHorizontal } from "lucide-react";

export type MetricCardType = "points" | "reward" | "lifetime" | "approved";

export interface MetricCardProps {
  type: MetricCardType;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  subtext?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  type,
  label,
  value,
  prefix = "",
  suffix = "",
  subtext,
}) => {
  type MetricConfig = {
    gradient: string;
    illustration: string;
    alt: string;
    textColor: string;
    labelColor: string;
    isFinn?: boolean;
  };

  // Styles based on card type
  const configs: Record<MetricCardType, MetricConfig> = {
    points: {
      gradient: "bg-gradient-teal-card text-white shadow-teal-glow",
      illustration: "/mascot/front.png",
      alt: "Mr. Finn 3D Mascot",
      isFinn: true,
      textColor: "text-white",
      labelColor: "text-white/80",
    },
    reward: {
      gradient: "bg-gradient-navy-card text-white shadow-navy-glow",
      illustration: "/illustrations/coin-stack.svg",
      alt: "Glossy Coin Stack",
      textColor: "text-white",
      labelColor: "text-white/80",
    },
    lifetime: {
      gradient: "bg-gradient-teal-300-500 text-white shadow-teal-glow",
      illustration: "/illustrations/trophy-3d.svg",
      alt: "Glossy 3D Trophy",
      textColor: "text-white",
      labelColor: "text-white/80",
    },
    approved: {
      gradient: "bg-gradient-light-card text-navy shadow-soft border border-fog",
      illustration: "/illustrations/check-badge.svg",
      alt: "Glossy Check Badge",
      textColor: "text-navy",
      labelColor: "text-navy/60",
    },
  };

  const config = configs[type];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`relative h-[184px] rounded-card p-6 flex flex-col justify-between overflow-hidden select-none snap-start shrink-0 w-[275px] sm:w-[290px] md:w-auto ${config.gradient}`}
    >
      {/* Top Header: Label + Tiny "••" menu */}
      <div className="flex items-center justify-between z-10">
        <span className={`font-body font-medium text-xs tracking-normal ${config.labelColor}`}>
          {label}
        </span>
        <button
          type="button"
          aria-label="Options"
          className="p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Big Number in Bricolage Grotesque Bold */}
      <div className="z-10 my-auto">
        <div className={`font-heading font-bold text-4xl sm:text-5xl tracking-tight leading-none ${config.textColor}`}>
          {prefix && <span className="mr-0.5">{prefix}</span>}
          <CountUpNumber value={value} />
          {suffix && <span className="text-xl sm:text-2xl font-bold ml-1.5 opacity-90">{suffix}</span>}
        </div>
        {subtext && (
          <p className={`text-xs mt-1.5 font-body font-medium ${config.labelColor}`}>
            {subtext}
          </p>
        )}
      </div>

      {/* Overflowing 3D Glossy Illustration in Bottom Right */}
      <div className="absolute -bottom-3 -right-3 w-28 h-28 pointer-events-none select-none z-0 opacity-95">
        <Image
          src={config.illustration}
          alt={config.alt}
          width={112}
          height={112}
          className={`w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(12,35,66,0.18)] ${
            config.isFinn ? "scale-110 -translate-y-1" : ""
          }`}
        />
      </div>
    </motion.div>
  );
};
