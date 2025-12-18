// Fish and Tank Types
export interface Fish {
  id: string;
  commonName: string;
  scientificName: string;
  minTankSize: number; // in gallons
  size: number; // in inches
  temperatureRange: [number, number]; // in Fahrenheit
  phRange: [number, number];
  aggression: 'peaceful' | 'semi-aggressive' | 'aggressive';
  schoolingRequired: boolean;
  minSchoolSize?: number;
  bioload: number; // bioload contribution
}

export interface TankFish extends Fish {
  quantity: number;
}

export interface TankConfig {
  volume: number; // in gallons
  length?: number; // in inches
  width?: number; // in inches
  height?: number; // in inches
  temperature: number; // in Fahrenheit
  ph: number;
  hasFilter: boolean;
}

export interface SavedTank {
  id: string;
  name: string;
  config: TankConfig;
  fish: TankFish[];
  savedAt: number;
}

export interface CompatibilityIssue {
  type: 'warning' | 'critical';
  message: string;
}
