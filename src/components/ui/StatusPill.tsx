import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Clock, Check, X, Tag } from "lucide-react";

export type StatusType =
  | "pending"
  | "approved"
  | "rejected"
  | "value"
  | "teal"
  | "navy"
  | "fog"
  | "white"
  // Legacy mappings for backwards-compatibility:
  | "yellow"
  | "blue"
  | "black"
  | "green"
  | "red"
  | "neutral";

export interface StatusPillProps {
  status?: StatusType;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: StatusType; // alias
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  variant,
  children,
  icon,
  size = "md",
  className,
}) => {
  const currentStatus = status || variant || "pending";

  // Strict palette status rules
  const getStatusConfig = () => {
    switch (currentStatus) {
      case "approved":
      case "green":
        return {
          style: "bg-teal-100 text-teal-700",
          defaultIcon: <Check className="w-3 h-3 stroke-[2.5]" />,
          label: "Approved",
        };
      case "rejected":
      case "red":
        return {
          style: "bg-navy-900 text-white",
          defaultIcon: <X className="w-3 h-3 stroke-[2.5]" />,
          label: "Rejected",
        };
      case "value":
        return {
          style: "bg-white text-navy border border-fog",
          defaultIcon: null,
          label: "",
        };
      case "teal":
      case "blue":
        return {
          style: "bg-teal-50 text-teal-700",
          defaultIcon: null,
          label: "",
        };
      case "navy":
      case "black":
        return {
          style: "bg-navy-900 text-white",
          defaultIcon: null,
          label: "",
        };
      case "white":
        return {
          style: "bg-white text-navy border border-fog shadow-subtle",
          defaultIcon: null,
          label: "",
        };
      case "pending":
      case "yellow":
      case "fog":
      case "neutral":
      default:
        return {
          style: "bg-fog text-navy",
          defaultIcon: <Clock className="w-3 h-3 stroke-[2]" />,
          label: "Pending",
        };
    }
  };

  const config = getStatusConfig();

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs rounded-full",
    md: "px-3 py-1 text-xs rounded-full",
    lg: "px-4 py-1.5 text-sm rounded-full",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 font-body font-medium select-none capitalize",
          config.style,
          sizeStyles[size],
          className
        )
      )}
    >
      {icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : (
        config.defaultIcon && <span className="flex-shrink-0">{config.defaultIcon}</span>
      )}
      <span>{children ?? config.label}</span>
    </span>
  );
};

export const BrutalistBadge = StatusPill;
