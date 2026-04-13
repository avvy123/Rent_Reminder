"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color: "indigo" | "emerald" | "amber" | "rose";
}

const colorMap = {
  indigo: {
    bg: "bg-indigo-50",
    icon: "bg-indigo-100 text-indigo-600",
    ring: "ring-indigo-200",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-600",
    ring: "ring-emerald-200",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-amber-100 text-amber-600",
    ring: "ring-amber-200",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "bg-rose-100 text-rose-600",
    ring: "ring-rose-200",
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color,
}: StatsCardProps) {
  const c = colorMap[color];

  return (
    <div className="glass-card rounded-2xl p-6 group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">
            {value}
          </p>
          {trend && (
            <p
              className={`text-xs font-semibold flex items-center gap-1 ${
                trendUp ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              <span>{trendUp ? "↑" : "↓"}</span>
              {trend}
            </p>
          )}
        </div>
        <div
          className={`p-3 rounded-xl ${c.icon} ring-1 ${c.ring} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
