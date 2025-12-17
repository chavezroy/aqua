"use client";

import { useState, useEffect } from "react";
import { useTankStore } from "@/store/useTankStore";
import { TankConfig } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { 
  convertTemperatureToF, 
  convertTemperatureFromF, 
  getTemperatureRange,
  formatTemperature 
} from "@/lib/unitUtils";
import { useToast, ToastContainer } from "@/components/ui/ToastNotification";

export default function Setup() {
  const router = useRouter();
  const { setConfig, saveTank, savedTanks, loadSavedTanks, unitSystem } = useTankStore();
  const [volume, setVolume] = useState("");
  const [temperature, setTemperature] = useState(75);
  const [ph, setPh] = useState(7.0);
  const [filterCapacity, setFilterCapacity] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [volumeError, setVolumeError] = useState("");
  const [tankName, setTankName] = useState("");
  const { toasts, removeToast, showToast } = useToast();

  // Get temperature range based on unit system
  const tempRange = getTemperatureRange(unitSystem);
  const displayTemp = convertTemperatureFromF(temperature, unitSystem);

  const handleReset = () => {
    setVolume("");
    setTemperature(75);
    setPh(7.0);
    setFilterCapacity("");
    setLength("");
    setWidth("");
    setHeight("");
    setVolumeError("");
  };

  const calculateVolumeFromDimensions = () => {
    if (length && width && height) {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const h = parseFloat(height);
      
      if (l > 0 && w > 0 && h > 0) {
        // Convert to cm if needed (dimensions are always in the current unit system)
        const lengthCm = unitSystem === "imperial" ? l * 2.54 : l;
        const widthCm = unitSystem === "imperial" ? w * 2.54 : w;
        const heightCm = unitSystem === "imperial" ? h * 2.54 : h;
        
        // Calculate volume in liters (cm³ to liters)
        const volumeLiters = (lengthCm * widthCm * heightCm) / 1000;
        return volumeLiters;
      }
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolumeError("");
    
    let volumeLiters: number;
    let volumeGallons: number;
    
    // Try to calculate from dimensions first, fallback to manual input
    const calculatedVolume = calculateVolumeFromDimensions();
    if (calculatedVolume) {
      volumeLiters = calculatedVolume;
      volumeGallons = calculatedVolume / 3.78541;
    } else {
      const volumeNum = parseFloat(volume);
      if (isNaN(volumeNum) || volumeNum <= 0) {
        setVolumeError("Please enter a valid volume or tank dimensions");
        return;
      }
      // Convert based on unit system
      if (unitSystem === "metric") {
        volumeLiters = volumeNum;
        volumeGallons = volumeNum / 3.78541;
      } else {
        volumeLiters = volumeNum * 3.78541;
        volumeGallons = volumeNum;
      }
    }

    // Convert temperature to Fahrenheit for storage
    const tempF = convertTemperatureToF(displayTemp, unitSystem);

    const config: TankConfig = {
      name: tankName.trim() || undefined,
      volume_liters: volumeLiters,
      volume_gallons: volumeGallons,
      filter_capacity: parseFloat(filterCapacity) || 0,
      temperature: tempF,
      ph,
      dimensions: length && width && height ? {
        length: parseFloat(length),
        width: parseFloat(width),
        height: parseFloat(height),
      } : undefined,
    };

    setConfig(config);
    
    // If tank name is provided, save the tank automatically
    if (tankName.trim()) {
      saveTank(tankName.trim());
      showToast("success", `Tank "${tankName.trim()}" saved successfully!`);
    }
    
    router.push("/");
  };

  const config = useTankStore((state) => state.config);

  useEffect(() => {
    loadSavedTanks();
    if (config && !length && !width && !height && !volume) {
      // Set volume based on unit system
      if (unitSystem === "metric") {
        setVolume(config.volume_liters.toString());
      } else {
        setVolume(config.volume_gallons.toString());
      }
      setTemperature(convertTemperatureFromF(config.temperature, unitSystem));
      setPh(config.ph);
      setFilterCapacity(config.filter_capacity.toString());
      setTankName(config.name || "");
      if (config.dimensions) {
        setLength(config.dimensions.length.toString());
        setWidth(config.dimensions.width.toString());
        setHeight(config.dimensions.height.toString());
      }
    }
  }, [unitSystem]);


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8FAFC]">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-6">Tank Configuration</h1>
        
        {/* Tank Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Tank Name (Optional)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tankName}
              onChange={(e) => setTankName(e.target.value)}
              placeholder="e.g., Den Tank, Kid's Room, Kitchen Bowl"
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            />
            {tankName.trim() && (
              <button
                type="button"
                onClick={() => setShowSaveDialog(true)}
                className="px-4 py-1.5 text-sm bg-[#14B8A6] text-white rounded-lg hover:bg-[#0D9488] transition flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
            )}
          </div>
        </div>

        {/* Saved Tanks List */}
        {savedTanks.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">Saved Tanks:</p>
            <div className="flex flex-wrap gap-2">
              {savedTanks.map((tank) => (
                <button
                  key={tank.id}
                  type="button"
                  onClick={() => {
                    if (unitSystem === "metric") {
                      setVolume(tank.config.volume_liters.toString());
                    } else {
                      setVolume(tank.config.volume_gallons.toString());
                    }
                    setTemperature(convertTemperatureFromF(tank.config.temperature, unitSystem));
                    setPh(tank.config.ph);
                    setFilterCapacity(tank.config.filter_capacity.toString());
                    setTankName(tank.name);
                    if (tank.config.dimensions) {
                      setLength(tank.config.dimensions.length.toString());
                      setWidth(tank.config.dimensions.width.toString());
                      setHeight(tank.config.dimensions.height.toString());
                    }
                  }}
                  className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  {tank.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tank Dimensions (Optional)</label>
            <p className="text-xs text-gray-500 mb-2">Enter dimensions to auto-calculate volume</p>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Length"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] text-sm"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Width"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] text-sm"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Height"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] text-sm"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Dimensions in {unitSystem === "imperial" ? "inches" : "centimeters"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tank Volume {length && width && height ? "(Auto-calculated)" : ""}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className={`flex-1 px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] ${
                  volumeError ? "border-red-500" : "border-gray-300"
                }`}
                required={!length || !width || !height}
                min="0"
                step="0.1"
                disabled={!!(length && width && height)}
                placeholder={unitSystem === "metric" ? "Liters" : "Gallons"}
              />
              <span className="px-3 py-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                {unitSystem === "metric" ? "L" : "gal"}
              </span>
            </div>
            {volumeError && (
              <p className="mt-1 text-xs text-red-500">{volumeError}</p>
            )}
            {length && width && height && calculateVolumeFromDimensions() && (
              <p className="mt-1 text-xs text-[#14B8A6]">
                Calculated: {calculateVolumeFromDimensions()!.toFixed(2)}L ({calculateVolumeFromDimensions()! / 3.78541} gal)
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Temperature: {formatTemperature(temperature, unitSystem)}
            </label>
            <input
              type="range"
              min={tempRange.min}
              max={tempRange.max}
              step={tempRange.step}
              value={displayTemp}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setTemperature(convertTemperatureToF(newValue, unitSystem));
              }}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTemperature(convertTemperatureToF(tempRange.min, unitSystem), unitSystem)}</span>
              <span>{formatTemperature(convertTemperatureToF(tempRange.max, unitSystem), unitSystem)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              pH: {ph.toFixed(1)}
            </label>
            <input
              type="range"
              min="5.0"
              max="9.0"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Filter Capacity ({unitSystem === "metric" ? "LPH" : "GPH"})
            </label>
            <input
              type="number"
              value={filterCapacity}
              onChange={(e) => setFilterCapacity(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
              min="0"
              placeholder={unitSystem === "metric" ? "Liters per hour" : "Gallons per hour"}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Reset to Standard
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition font-medium"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
