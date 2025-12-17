"use client";

import { useTankStore } from "@/store/useTankStore";
import { UnitSystem } from "@/types";
import { Thermometer } from "lucide-react";

export function UnitToggle() {
  const { unitSystem, setUnitSystem } = useTankStore();

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
      <button
        onClick={() => setUnitSystem("imperial")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          unitSystem === "imperial"
            ? "bg-[#0F172A] text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Imperial
      </button>
      <button
        onClick={() => setUnitSystem("metric")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          unitSystem === "metric"
            ? "bg-[#0F172A] text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Metric
      </button>
    </div>
  );
}

