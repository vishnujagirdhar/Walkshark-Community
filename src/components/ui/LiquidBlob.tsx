"use client";

import React from "react";

interface LiquidBlobProps {
  className?: string;
  color?: string;
}

export const LiquidBlob: React.FC<LiquidBlobProps> = ({
  className = "",
  color = "bg-teal-300/15",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none filter blur-3xl rounded-full animate-blob-pulse ${color} ${className}`}
    />
  );
};
