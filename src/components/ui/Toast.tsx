"use client";

import { AlertTriangle, XCircle } from "lucide-react";

interface ToastProps {
  type: "warning" | "critical";
  message: string;
}

export function Toast({ type, message }: ToastProps) {
  const bgColor = type === "critical" ? "bg-[#EF4444]" : "bg-[#F59E0B]";
  const Icon = type === "critical" ? XCircle : AlertTriangle;

  return (
    <div className={`${bgColor} text-white p-3 rounded-lg flex items-start gap-2`}>
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <p className="text-sm flex-1">{message}</p>
    </div>
  );
}

