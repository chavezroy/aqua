import { Species, TankConfig, StockedFish, CompatibilityIssue, UnitSystem } from "@/types";
import { formatTemperature, formatVolume, celsiusToFahrenheit } from "./unitUtils";

export function validateTemperature(
  fish: Species,
  tankTemp: number,
  unitSystem: UnitSystem = "imperial"
): CompatibilityIssue | null {
  const tempC = (tankTemp - 32) * (5 / 9); // Convert F to C
  if (tempC < fish.parameters.temp_min || tempC > fish.parameters.temp_max) {
    const fishTempMin = unitSystem === "imperial" 
      ? celsiusToFahrenheit(fish.parameters.temp_min).toFixed(0)
      : fish.parameters.temp_min.toFixed(0);
    const fishTempMax = unitSystem === "imperial"
      ? celsiusToFahrenheit(fish.parameters.temp_max).toFixed(0)
      : fish.parameters.temp_max.toFixed(0);
    const tempUnit = unitSystem === "imperial" ? "°F" : "°C";
    const tankTempDisplay = formatTemperature(tankTemp, unitSystem);
    
    return {
      type: "warning",
      message: `${fish.common_name} prefers ${fishTempMin}-${fishTempMax}${tempUnit}, but tank is ${tankTempDisplay}`,
      fishId: fish.id,
    };
  }
  return null;
}

export function validatePH(
  fish: Species,
  tankPH: number
): CompatibilityIssue | null {
  if (tankPH < fish.parameters.ph_min || tankPH > fish.parameters.ph_max) {
    return {
      type: "warning",
      message: `${fish.common_name} prefers pH ${fish.parameters.ph_min}-${fish.parameters.ph_max}, but tank is ${tankPH}`,
      fishId: fish.id,
    };
  }
  return null;
}

export function validateTankSize(
  fish: Species,
  tankVolume: number,
  unitSystem: UnitSystem = "imperial"
): CompatibilityIssue | null {
  if (tankVolume < fish.min_tank_liters) {
    const minTankDisplay = formatVolume(fish.min_tank_liters, unitSystem);
    const tankVolumeDisplay = formatVolume(tankVolume, unitSystem);
    
    return {
      type: "critical",
      message: `${fish.common_name} requires minimum ${minTankDisplay} tank, but tank is only ${tankVolumeDisplay}`,
      fishId: fish.id,
    };
  }
  return null;
}

export function validateAggression(
  fish1: Species,
  fish2: Species
): CompatibilityIssue | null {
  const sizeDiff = Math.abs(fish1.adult_size_cm - fish2.adult_size_cm);
  const largerSize = Math.max(fish1.adult_size_cm, fish2.adult_size_cm);
  const sizeDiffPercent = (sizeDiff / largerSize) * 100;

  if (
    (fish1.social.aggression === "aggressive" ||
      fish2.social.aggression === "aggressive") &&
    sizeDiffPercent > 50
  ) {
    const aggressive = fish1.social.aggression === "aggressive" ? fish1 : fish2;
    const peaceful = fish1.social.aggression === "aggressive" ? fish2 : fish1;
    return {
      type: "warning",
      message: `${aggressive.common_name} may prey on ${peaceful.common_name} (size difference > 50%)`,
    };
  }
  return null;
}

export function validateSchooling(
  fish: Species,
  quantity: number
): CompatibilityIssue | null {
  if (fish.social.schooling_required && quantity < (fish.social.min_group_size || 6)) {
    return {
      type: "warning",
      message: `${fish.common_name} requires a school of at least ${fish.social.min_group_size || 6}, but only ${quantity} added`,
      fishId: fish.id,
    };
  }
  return null;
}

export function calculateSurfaceArea(
  length: number,
  width: number,
  height: number,
  unit: "inches" | "cm" = "inches"
): number {
  // Convert to cm if needed
  const lengthCm = unit === "inches" ? length * 2.54 : length;
  const widthCm = unit === "inches" ? width * 2.54 : width;
  const heightCm = unit === "inches" ? height * 2.54 : height;
  
  // Surface area in cm² (top surface)
  return lengthCm * widthCm;
}

export function calculateBioload(
  stockedFish: StockedFish[],
  tankVolume: number,
  surfaceArea?: number
): number {
  const totalBioload = stockedFish.reduce(
    (sum, item) => sum + item.species.bioload_score * item.quantity,
    0
  );
  
  // If surface area is provided, use it for more accurate calculation
  // Otherwise use volume-based calculation
  let maxBioload: number;
  if (surfaceArea) {
    // Base bioload capacity: approximately 1cm² per liter of surface area
    maxBioload = (surfaceArea / 100) * 0.5; // Convert cm² to approximate bioload capacity
  } else {
    maxBioload = tankVolume * 0.5; // Fallback: 0.5 bioload per liter
  }
  
  return Math.min((totalBioload / maxBioload) * 100, 100);
}

export function runCompatibilityCheck(
  config: TankConfig,
  stockedFish: StockedFish[],
  unitSystem: UnitSystem = "imperial"
): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];

  stockedFish.forEach((stocked) => {
    const { species, quantity } = stocked;

    // Temperature check
    const tempIssue = validateTemperature(species, config.temperature, unitSystem);
    if (tempIssue) issues.push(tempIssue);

    // pH check
    const phIssue = validatePH(species, config.ph);
    if (phIssue) issues.push(phIssue);

    // Tank size check
    const sizeIssue = validateTankSize(species, config.volume_liters, unitSystem);
    if (sizeIssue) issues.push(sizeIssue);

    // Schooling check
    const schoolingIssue = validateSchooling(species, quantity);
    if (schoolingIssue) issues.push(schoolingIssue);

    // Aggression check against other fish
    stockedFish.forEach((other) => {
      if (other.species.id !== species.id) {
        const aggressionIssue = validateAggression(species, other.species);
        if (aggressionIssue) issues.push(aggressionIssue);
      }
    });
  });

  return issues;
}

