"use client";

import { AlertTriangle, XCircle } from "lucide-react";

interface ToastProps {
  type: "warning" | "critical";
  message: string;
}

export function Toast({ type, message }: ToastProps) {
  const bgClass = type === "critical" 
    ? "bg-red-500/20 border border-red-400/30 text-red-100" 
    : "bg-orange-500/20 border border-orange-400/30 text-orange-100";
  const Icon = type === "critical" ? XCircle : AlertTriangle;

  return (
    <div className={`${bgClass} p-3 rounded-xl flex items-start gap-2 backdrop-blur-sm`}>
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <p className="text-sm flex-1">{message}</p>
    </div>
  );
}

