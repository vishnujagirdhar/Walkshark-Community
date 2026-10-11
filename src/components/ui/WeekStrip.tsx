"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

interface WeekStripProps {
  onSelectDate?: (dayIndex: number) => void;
  activityDays?: number[]; // indices of days with activity, e.g. [1, 3, 5]
  className?: string;
}

export const WeekStrip: React.FC<WeekStripProps> = ({
  onSelectDate,
  activityDays = [0, 2, 4], // sample days with activity
  className = "",
}) => {
  // Current week generator (Mon - Sun)
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // Monday = 0
  const [selectedDay, setSelectedDay] = useState(currentDayIndex);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Calculate dates of the current week
  const weekDates = days.map((day, idx) => {
    const d = new Date();
    const diff = idx - currentDayIndex;
    d.setDate(today.getDate() + diff);
    return {
      name: day,
      dateNum: d.getDate(),
      index: idx,
      hasActivity: activityDays.includes(idx),
    };
  });

  const handleDayClick = (idx: number) => {
    setSelectedDay(idx);
    if (onSelectDate) onSelectDate(idx);
  };

  return (
    <div className={`w-full overflow-x-auto no-scrollbar py-2 select-none ${className}`}>
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-max">
        {weekDates.map((item) => {
          const isActive = selectedDay === item.index;

          return (
            <motion.button
              key={item.index}
              onClick={() => handleDayClick(item.index)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`relative flex flex-col items-center justify-between transition-all rounded-tile ${
                isActive
                  ? "w-16 h-24 bg-gradient-teal-card text-white shadow-teal-glow -translate-y-1 p-2.5"
                  : "w-14 h-20 bg-white text-navy shadow-subtle border border-fog hover:border-teal-300 p-2"
              }`}
            >
              {/* Date Number in Bricolage Grotesque Bold */}
              <span
                className={`font-heading font-bold ${
                  isActive ? "text-xl text-white" : "text-base text-navy"
                }`}
              >
                {item.dateNum}
              </span>

              {/* Weekday small below */}
              <span
                className={`font-body text-xs ${
                  isActive ? "text-white/90 font-medium" : "text-navy-muted font-normal"
                }`}
              >
                {item.name}
              </span>

              {/* Active icon or activity dot */}
              {isActive ? (
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-1">
                  <Bell className="w-3 h-3 text-white" />
                </div>
              ) : item.hasActivity ? (
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1" />
              ) : (
                <div className="w-1.5 h-1.5 mt-1" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
