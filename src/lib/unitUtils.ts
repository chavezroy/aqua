import { UnitSystem } from "@/types";

// Temperature conversions
export function fahrenheitToCelsius(f: number): number {
  return (f - 32) * (5 / 9);
}

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

// Volume conversions
export function gallonsToLiters(g: number): number {
  return g * 3.78541;
}

export function litersToGallons(l: number): number {
  return l / 3.78541;
}

// Length conversions
export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

// Format temperature based on unit system
export function formatTemperature(tempF: number, unitSystem: UnitSystem): string {
  if (unitSystem === "metric") {
    const tempC = fahrenheitToCelsius(tempF);
    return `${tempC.toFixed(1)}°C`;
  }
  return `${tempF.toFixed(0)}°F`;
}

// Format volume based on unit system
export function formatVolume(liters: number, unitSystem: UnitSystem): string {
  if (unitSystem === "metric") {
    return `${liters.toFixed(1)} L`;
  }
  const gallons = litersToGallons(liters);
  return `${gallons.toFixed(1)} gal`;
}

// Format length based on unit system
export function formatLength(inches: number, unitSystem: UnitSystem): string {
  if (unitSystem === "metric") {
    const cm = inchesToCm(inches);
    return `${cm.toFixed(1)} cm`;
  }
  return `${inches.toFixed(1)}"`;
}

// Get temperature range for slider based on unit system
export function getTemperatureRange(unitSystem: UnitSystem): { min: number; max: number; step: number } {
  if (unitSystem === "metric") {
    return { min: 15, max: 32, step: 0.5 }; // 15-32°C
  }
  return { min: 60, max: 90, step: 1 }; // 60-90°F
}

// Convert temperature from display unit to internal (Fahrenheit)
export function convertTemperatureToF(value: number, unitSystem: UnitSystem): number {
  if (unitSystem === "metric") {
    return celsiusToFahrenheit(value);
  }
  return value;
}

// Convert temperature from internal (Fahrenheit) to display unit
export function convertTemperatureFromF(valueF: number, unitSystem: UnitSystem): number {
  if (unitSystem === "metric") {
    return fahrenheitToCelsius(valueF);
  }
  return valueF;
}

