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
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <Droplet className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white drop-shadow-lg">Tank Overview</h3>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30">
          <p className="text-xs text-white/80 mb-1">Volume</p>
          <p className="text-lg font-bold text-white">{formatVolume(config.volume_liters, unitSystem)}</p>
          {config.dimensions && (
            <p className="text-xs text-white/70 mt-1">
              {formatLength(config.dimensions.length, unitSystem)} × {formatLength(config.dimensions.width, unitSystem)} × {formatLength(config.dimensions.height, unitSystem)}
            </p>
          )}
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30">
          <p className="text-xs text-white/80 mb-1 flex items-center gap-1">
            <Thermometer size={12} />
            Temperature
          </p>
          <p className="text-lg font-bold text-white">{formatTemperature(config.temperature, unitSystem)}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30">
          <p className="text-xs text-white/80 mb-1">pH Level</p>
          <p className="text-lg font-bold text-white">{config.ph.toFixed(1)}</p>
          <p className="text-xs text-white/70">
            {config.ph < 7 ? "Acidic" : config.ph > 7 ? "Alkaline" : "Neutral"}
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30">
          <p className="text-xs text-white/80 mb-1 flex items-center gap-1">
            <Gauge size={12} />
            Stock
          </p>
          <p className="text-lg font-bold text-white">{totalFish}</p>
          <p className="text-xs text-white/70">
            {stockedFish.length} {stockedFish.length === 1 ? "species" : "species"}
          </p>
        </div>
      </div>
      
      {surfaceArea && (
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-sm text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Ruler className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Surface Area:</span>
            <span className="font-bold">
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

