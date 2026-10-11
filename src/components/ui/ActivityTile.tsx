"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Film, Image as ImageIcon, Compass, Users, Gift } from "lucide-react";

export interface ActivityTileProps {
  id: string;
  name: string;
  points: number;
  rewardInr: number;
  iconName: string;
  isActive?: boolean;
  progressPercent?: number;
  onClick?: () => void;
}

export const ActivityTile: React.FC<ActivityTileProps> = ({
  name,
  points,
  rewardInr,
  iconName,
  isActive = false,
  progressPercent = 65,
  onClick,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    Camera: <Camera className="w-5 h-5" />,
    Film: <Film className="w-5 h-5" />,
    Image: <ImageIcon className="w-5 h-5" />,
    Compass: <Compass className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    Gift: <Gift className="w-5 h-5" />,
  };

  const Icon = iconMap[iconName] || <Camera className="w-5 h-5" />;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`relative w-[180px] sm:w-[195px] h-[175px] shrink-0 rounded-tile p-4 text-left flex flex-col justify-between transition-all select-none snap-start ${
        isActive
          ? "bg-white border-2 border-teal-500 shadow-teal-glow"
          : "bg-white border border-fog shadow-soft hover:border-teal-300"
      }`}
    >
      {/* Top chip icon */}
      <div className="flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-button flex items-center justify-center transition-colors ${
            isActive ? "bg-teal-500 text-white" : "bg-fog text-navy"
          }`}
        >
          {Icon}
        </div>

        <span className="font-heading font-bold text-sm text-teal-600">
          +{points} pts
        </span>
      </div>

      {/* Two line activity name */}
      <div className="my-auto pt-2">
        <h4 className="font-heading font-bold text-sm text-navy leading-snug line-clamp-2">
          {name}
        </h4>
        <span className="font-body text-xs text-navy-muted">
          ₹{rewardInr} value
        </span>
      </div>

      {/* Thin teal progress bar on fog grey track */}
      <div className="w-full pt-2">
        <div className="w-full h-1.5 bg-fog rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>
    </motion.button>
  );
};
