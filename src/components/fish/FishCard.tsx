"use client";

import { Species } from "@/types";
import { useTankStore } from "@/store/useTankStore";
import { Minus, Plus, X, Thermometer, Droplet } from "lucide-react";
import { formatVolume, celsiusToFahrenheit, inchesToCm, cmToInches } from "@/lib/unitUtils";

interface FishCardProps {
  fish: Species;
  quantity: number;
}

export function FishCard({ fish, quantity }: FishCardProps) {
  const { updateQuantity, removeFish, unitSystem } = useTankStore();
  
  // Convert fish size based on unit system
  const fishSize = unitSystem === "imperial" 
    ? `${cmToInches(fish.adult_size_cm).toFixed(1)}"`
    : `${fish.adult_size_cm} cm`;
  
  // Convert temperature range
  const tempMin = unitSystem === "imperial"
    ? celsiusToFahrenheit(fish.parameters.temp_min).toFixed(0)
    : fish.parameters.temp_min.toFixed(0);
  const tempMax = unitSystem === "imperial"
    ? celsiusToFahrenheit(fish.parameters.temp_max).toFixed(0)
    : fish.parameters.temp_max.toFixed(0);
  const tempUnit = unitSystem === "imperial" ? "°F" : "°C";

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">{fish.common_name}</h3>
          <p className="text-sm text-gray-500 italic">{fish.scientific_name}</p>
        </div>
        <button
          onClick={() => removeFish(fish.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-3 space-y-1">
        <p>Size: {fishSize}</p>
        <p>Min Tank: {formatVolume(fish.min_tank_liters, unitSystem)}</p>
        <div className="flex items-center gap-1 mt-2">
          <Thermometer size={14} className="text-gray-400" />
          <span className="text-xs">
            {tempMin}-{tempMax}{tempUnit}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Droplet size={14} className="text-gray-400" />
          <span className="text-xs">
            pH {fish.parameters.ph_min}-{fish.parameters.ph_max}
          </span>
        </div>
        <div className="mt-2">
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
            fish.social.aggression === "peaceful" 
              ? "bg-green-100 text-green-700"
              : fish.social.aggression === "semi-aggressive"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}>
            {fish.social.aggression}
          </span>
          {fish.social.schooling_required && (
            <span className="ml-2 inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
              Schooling
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQuantity(fish.id, quantity - 1)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Minus size={18} />
        </button>
        <span className="font-semibold w-8 text-center">{quantity}</span>
        <button
          onClick={() => updateQuantity(fish.id, quantity + 1)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}

