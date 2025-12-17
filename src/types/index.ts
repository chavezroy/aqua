export interface Species {
  id: string;
  common_name: string;
  scientific_name: string;
  adult_size_cm: number;
  bioload_score: number;
  min_tank_liters: number;
  parameters: {
    temp_min: number;
    temp_max: number;
    ph_min: number;
    ph_max: number;
  };
  social: {
    aggression: "peaceful" | "semi-aggressive" | "aggressive";
    schooling_required: boolean;
    min_group_size?: number;
  };
}

export interface TankConfig {
  name?: string;
  volume_liters: number;
  volume_gallons: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  filter_capacity: number;
  temperature: number;
  ph: number;
}

export interface SavedTank {
  id: string;
  name: string;
  config: TankConfig;
  stockedFish: StockedFish[];
  createdAt: number;
  updatedAt: number;
}

export interface StockedFish {
  species: Species;
  quantity: number;
}

export interface CompatibilityIssue {
  type: "warning" | "critical";
  message: string;
  fishId?: string;
}

export type UnitSystem = "imperial" | "metric";

export interface TankState {
  config: TankConfig | null;
  stockedFish: StockedFish[];
  issues: CompatibilityIssue[];
  bioloadPercentage: number;
  healthScore: number;
  unitSystem: UnitSystem;
}

