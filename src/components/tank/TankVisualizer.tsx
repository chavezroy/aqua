"use client";

import { useTankStore } from "@/store/useTankStore";
import { Droplet, Thermometer, Gauge, Ruler } from "lucide-react";
import { calculateSurfaceArea } from "@/lib/compatibilityEngine";
import { formatVolume, formatTemperature, formatLength, inchesToCm } from "@/lib/unitUtils";

export function TankVisualizer() {
  const { config, stockedFish, unitSystem } = useTankStore();

  if (!config) return null;

  const totalFish = stockedFish.reduce((sum, item) => sum + item.quantity, 0);
  const surfaceArea = config.dimensions 
    ? calculateSurfaceArea(
        config.dimensions.length, 
        config.dimensions.width, 
        config.dimensions.height, 
        unitSystem === "imperial" ? "inches" : "cm"
      )
    : null;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Droplet className="text-[#14B8A6]" size={24} />
        Tank Overview
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Volume</p>
          <p className="text-lg font-bold">{formatVolume(config.volume_liters, unitSystem)}</p>
          {config.dimensions && (
            <p className="text-xs text-gray-400 mt-1">
              {formatLength(config.dimensions.length, unitSystem)} × {formatLength(config.dimensions.width, unitSystem)} × {formatLength(config.dimensions.height, unitSystem)}
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <Thermometer size={12} />
            Temperature
          </p>
          <p className="text-lg font-bold">{formatTemperature(config.temperature, unitSystem)}</p>
        </div>

        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">pH Level</p>
          <p className="text-lg font-bold">{config.ph.toFixed(1)}</p>
          <p className="text-xs text-gray-400">
            {config.ph < 7 ? "Acidic" : config.ph > 7 ? "Alkaline" : "Neutral"}
          </p>
        </div>

        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <Gauge size={12} />
            Stock
          </p>
          <p className="text-lg font-bold">{totalFish}</p>
          <p className="text-xs text-gray-400">
            {stockedFish.length} {stockedFish.length === 1 ? "species" : "species"}
          </p>
        </div>
      </div>
      
      {surfaceArea && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center gap-2 text-sm">
            <Ruler className="text-[#14B8A6]" size={16} />
            <span className="text-gray-600">Surface Area:</span>
            <span className="font-semibold">
              {unitSystem === "metric" 
                ? `${surfaceArea.toFixed(0)} cm²`
                : `${(surfaceArea / 6.4516).toFixed(0)} in²`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

