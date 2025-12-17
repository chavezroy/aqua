import { create } from "zustand";
import { TankConfig, StockedFish, CompatibilityIssue, TankState, SavedTank, UnitSystem } from "@/types";
import { runCompatibilityCheck, calculateBioload, calculateSurfaceArea } from "@/lib/compatibilityEngine";

interface TankStore extends TankState {
  savedTanks: SavedTank[];
  setConfig: (config: TankConfig) => void;
  addFish: (fish: StockedFish["species"], quantity?: number) => void;
  removeFish: (fishId: string) => void;
  updateQuantity: (fishId: string, quantity: number) => void;
  clearTank: () => void;
  saveTank: (name: string) => void;
  loadTank: (tankId: string) => void;
  deleteTank: (tankId: string) => void;
  loadSavedTanks: () => void;
  setUnitSystem: (system: UnitSystem) => void;
}

const STORAGE_KEY = "aquaharmony_saved_tanks";
const UNIT_PREFERENCE_KEY = "aquaharmony_unit_system";

const loadTanksFromStorage = (): SavedTank[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveTanksToStorage = (tanks: SavedTank[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tanks));
  } catch (error) {
    console.error("Failed to save tanks to storage:", error);
  }
};

const loadUnitPreference = (): UnitSystem => {
  if (typeof window === "undefined") return "imperial";
  try {
    const stored = localStorage.getItem(UNIT_PREFERENCE_KEY);
    return (stored as UnitSystem) || "imperial";
  } catch {
    return "imperial";
  }
};

const saveUnitPreference = (system: UnitSystem) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(UNIT_PREFERENCE_KEY, system);
  } catch (error) {
    console.error("Failed to save unit preference:", error);
  }
};

export const useTankStore = create<TankStore>((set, get) => ({
  config: null,
  stockedFish: [],
  issues: [],
  bioloadPercentage: 0,
  healthScore: 100,
  savedTanks: [],
  unitSystem: loadUnitPreference(),

  setConfig: (config) => {
    set({ config });
    const state = get();
    if (state.config && state.stockedFish.length > 0) {
      const issues = runCompatibilityCheck(state.config, state.stockedFish, state.unitSystem);
      const surfaceArea = config.dimensions 
        ? calculateSurfaceArea(config.dimensions.length, config.dimensions.width, config.dimensions.height, "inches")
        : undefined;
      const bioload = calculateBioload(state.stockedFish, state.config.volume_liters, surfaceArea);
      const healthScore = Math.max(0, 100 - (issues.filter(i => i.type === "critical").length * 30) - (issues.filter(i => i.type === "warning").length * 10));
      set({ issues, bioloadPercentage: bioload, healthScore });
    }
  },

  addFish: (species, quantity = 1) => {
    const state = get();
    const existing = state.stockedFish.find((f) => f.species.id === species.id);
    
    if (existing) {
      get().updateQuantity(species.id, existing.quantity + quantity);
    } else {
      const newStocked: StockedFish[] = [...state.stockedFish, { species, quantity }];
      set({ stockedFish: newStocked });
      
      if (state.config) {
        const issues = runCompatibilityCheck(state.config, newStocked);
        const surfaceArea = state.config.dimensions 
          ? calculateSurfaceArea(state.config.dimensions.length, state.config.dimensions.width, state.config.dimensions.height, "inches")
          : undefined;
        const bioload = calculateBioload(newStocked, state.config.volume_liters, surfaceArea);
        const healthScore = Math.max(0, 100 - (issues.filter(i => i.type === "critical").length * 30) - (issues.filter(i => i.type === "warning").length * 10));
        set({ issues, bioloadPercentage: bioload, healthScore });
      }
    }
  },

  removeFish: (fishId) => {
    const state = get();
    const newStocked = state.stockedFish.filter((f) => f.species.id !== fishId);
    set({ stockedFish: newStocked });
    
    if (state.config && newStocked.length > 0) {
      const issues = runCompatibilityCheck(state.config, newStocked);
      const bioload = calculateBioload(newStocked, state.config.volume_liters);
      const healthScore = Math.max(0, 100 - (issues.filter(i => i.type === "critical").length * 30) - (issues.filter(i => i.type === "warning").length * 10));
      set({ issues, bioloadPercentage: bioload, healthScore });
    } else {
      set({ issues: [], bioloadPercentage: 0, healthScore: 100 });
    }
  },

  updateQuantity: (fishId, quantity) => {
    if (quantity <= 0) {
      get().removeFish(fishId);
      return;
    }
    
    const state = get();
    const newStocked = state.stockedFish.map((f) =>
      f.species.id === fishId ? { ...f, quantity } : f
    );
    set({ stockedFish: newStocked });
    
    if (state.config) {
      const issues = runCompatibilityCheck(state.config, newStocked);
      const bioload = calculateBioload(newStocked, state.config.volume_liters);
      const healthScore = Math.max(0, 100 - (issues.filter(i => i.type === "critical").length * 30) - (issues.filter(i => i.type === "warning").length * 10));
      set({ issues, bioloadPercentage: bioload, healthScore });
    }
  },

  clearTank: () => {
    set({
      stockedFish: [],
      issues: [],
      bioloadPercentage: 0,
      healthScore: 100,
    });
  },

  saveTank: (name: string) => {
    const state = get();
    if (!state.config) return;

    const savedTanks = loadTanksFromStorage();
    const existingIndex = savedTanks.findIndex((t) => t.name === name);

    const updatedConfig = { ...state.config, name };
    const savedTank: SavedTank = {
      id: existingIndex >= 0 ? savedTanks[existingIndex].id : Date.now().toString(),
      name,
      config: updatedConfig,
      stockedFish: [...state.stockedFish],
      createdAt: existingIndex >= 0 ? savedTanks[existingIndex].createdAt : Date.now(),
      updatedAt: Date.now(),
    };

    if (existingIndex >= 0) {
      savedTanks[existingIndex] = savedTank;
    } else {
      savedTanks.push(savedTank);
    }

    saveTanksToStorage(savedTanks);
    set({ savedTanks, config: updatedConfig });
  },

  loadTank: (tankId: string) => {
    const savedTanks = loadTanksFromStorage();
    const tank = savedTanks.find((t) => t.id === tankId);
    if (!tank) return;

    set({
      config: tank.config,
      stockedFish: tank.stockedFish,
    });

    // Recalculate compatibility
    const issues = runCompatibilityCheck(tank.config, tank.stockedFish);
    const surfaceArea = tank.config.dimensions 
      ? calculateSurfaceArea(tank.config.dimensions.length, tank.config.dimensions.width, tank.config.dimensions.height, "inches")
      : undefined;
    const bioload = calculateBioload(tank.stockedFish, tank.config.volume_liters, surfaceArea);
    const healthScore = Math.max(0, 100 - (issues.filter(i => i.type === "critical").length * 30) - (issues.filter(i => i.type === "warning").length * 10));
    
    set({ issues, bioloadPercentage: bioload, healthScore });
  },

  deleteTank: (tankId: string) => {
    const savedTanks = loadTanksFromStorage();
    const filtered = savedTanks.filter((t) => t.id !== tankId);
    saveTanksToStorage(filtered);
    set({ savedTanks: filtered });
  },

  loadSavedTanks: () => {
    const savedTanks = loadTanksFromStorage();
    set({ savedTanks });
  },

  setUnitSystem: (system: UnitSystem) => {
    saveUnitPreference(system);
    set({ unitSystem: system });
  },
}));

