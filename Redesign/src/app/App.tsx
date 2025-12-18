import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { Header } from './components/Header';
import { TankOverview } from './components/TankOverview';
import { TankStatus } from './components/TankStatus';
import { AddFish } from './components/AddFish';
import { CurrentStock } from './components/CurrentStock';
import { CompatibilityIssues } from './components/CompatibilityIssues';
import { SaveTankDialog } from './components/SaveTankDialog';
import { SetupTank } from './components/SetupTank';
import { BackgroundBubbles } from './components/BackgroundBubbles';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './components/ui/alert-dialog';
import { TankConfig, TankFish, SavedTank, CompatibilityIssue, Fish } from './types';

type ViewMode = 'setup' | 'dashboard';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('setup');
  const [tankConfig, setTankConfig] = useState<TankConfig>({
    volume: 51.9,
    length: 40,
    width: 20,
    height: 15,
    temperature: 75,
    ph: 7.0,
    hasFilter: true,
  });
  const [tankFish, setTankFish] = useState<TankFish[]>([]);
  const [savedTanks, setSavedTanks] = useState<SavedTank[]>([]);
  const [currentTankId, setCurrentTankId] = useState<string | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tankToDelete, setTankToDelete] = useState<string | null>(null);

  // Load saved tanks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('finterest-tanks');
    if (saved) {
      try {
        setSavedTanks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved tanks', e);
      }
    }
  }, []);

  // Save tanks to localStorage whenever they change
  useEffect(() => {
    if (savedTanks.length > 0) {
      localStorage.setItem('finterest-tanks', JSON.stringify(savedTanks));
    }
  }, [savedTanks]);

  // Calculate bioload and compatibility
  const totalBioload = tankFish.reduce(
    (sum, fish) => sum + fish.bioload * fish.quantity,
    0
  );
  const maxBioload = tankConfig.volume * 1.5; // 1.5 bioload units per gallon
  const bioloadPercentage = (totalBioload / maxBioload) * 100;

  const calculateCompatibilityIssues = (): CompatibilityIssue[] => {
    const issues: CompatibilityIssue[] = [];

    tankFish.forEach((fish) => {
      // Tank size check
      if (fish.minTankSize > tankConfig.volume) {
        issues.push({
          type: 'critical',
          message: `${fish.commonName} requires minimum ${fish.minTankSize.toFixed(
            1
          )} gal tank, but tank is only ${tankConfig.volume.toFixed(1)} gal`,
        });
      }

      // Temperature check
      const [minTemp, maxTemp] = fish.temperatureRange;
      if (
        tankConfig.temperature < minTemp ||
        tankConfig.temperature > maxTemp
      ) {
        issues.push({
          type: 'warning',
          message: `${fish.commonName} prefers ${minTemp}-${maxTemp}°F, but tank is ${tankConfig.temperature}°F`,
        });
      }

      // pH check
      const [minPh, maxPh] = fish.phRange;
      if (tankConfig.ph < minPh || tankConfig.ph > maxPh) {
        issues.push({
          type: 'warning',
          message: `${fish.commonName} prefers pH ${minPh}-${maxPh}, but tank pH is ${tankConfig.ph}`,
        });
      }

      // Schooling check
      if (fish.schoolingRequired && fish.minSchoolSize) {
        if (fish.quantity < fish.minSchoolSize) {
          issues.push({
            type: 'warning',
            message: `${fish.commonName} requires a school of at least ${fish.minSchoolSize}, but only ${fish.quantity} added`,
          });
        }
      }
    });

    // Aggression compatibility
    tankFish.forEach((fish1, i) => {
      tankFish.slice(i + 1).forEach((fish2) => {
        // Size difference predation check
        const sizeDiff = Math.abs(fish1.size - fish2.size);
        const largerFish = fish1.size > fish2.size ? fish1 : fish2;
        const smallerFish = fish1.size > fish2.size ? fish2 : fish1;
        
        if (sizeDiff / smallerFish.size > 0.5) {
          issues.push({
            type: 'warning',
            message: `${largerFish.commonName} may prey on ${smallerFish.commonName} (size difference > 50%)`,
          });
        }

        // Aggression check
        if (
          fish1.aggression === 'aggressive' ||
          fish2.aggression === 'aggressive'
        ) {
          issues.push({
            type: 'warning',
            message: `${fish1.commonName} and ${fish2.commonName} may be incompatible due to aggression`,
          });
        }
      });
    });

    return issues;
  };

  const issues = calculateCompatibilityIssues();
  const healthScore = Math.max(
    0,
    100 -
      issues.filter((i) => i.type === 'critical').length * 25 -
      issues.filter((i) => i.type === 'warning').length * 5
  );

  const stockCount = tankFish.reduce((sum, fish) => sum + fish.quantity, 0);
  const speciesCount = tankFish.length;

  const currentTankName = savedTanks.find((t) => t.id === currentTankId)?.name || '';

  const handleSetupComplete = (config: TankConfig) => {
    setTankConfig(config);
    setViewMode('dashboard');
  };

  const handleAddFish = (fish: Fish) => {
    const existingFish = tankFish.find((f) => f.id === fish.id);
    if (existingFish) {
      setTankFish(
        tankFish.map((f) =>
          f.id === fish.id ? { ...f, quantity: f.quantity + 1 } : f
        )
      );
      toast.success(`Added another ${fish.commonName}`);
    } else {
      setTankFish([...tankFish, { ...fish, quantity: 1 }]);
      toast.success(`Added ${fish.commonName} to tank`);
    }
  };

  const handleUpdateQuantity = (fishId: string, delta: number) => {
    setTankFish((prev) => {
      return prev
        .map((f) => {
          if (f.id === fishId) {
            const newQuantity = f.quantity + delta;
            return newQuantity > 0 ? { ...f, quantity: newQuantity } : null;
          }
          return f;
        })
        .filter((f): f is TankFish => f !== null);
    });
  };

  const handleRemoveFish = (fishId: string) => {
    const fish = tankFish.find((f) => f.id === fishId);
    setTankFish(tankFish.filter((f) => f.id !== fishId));
    if (fish) {
      toast.info(`Removed ${fish.commonName} from tank`);
    }
  };

  const handleStartOver = () => {
    setViewMode('setup');
    setTankFish([]);
    setCurrentTankId(null);
    toast.info('Starting over with a new tank');
  };

  const handleNewTank = () => {
    setViewMode('setup');
    setTankFish([]);
    setCurrentTankId(null);
  };

  const handleSaveTank = (name: string) => {
    const newTank: SavedTank = {
      id: currentTankId || Date.now().toString(),
      name,
      config: tankConfig,
      fish: tankFish,
      savedAt: Date.now(),
    };

    if (currentTankId) {
      setSavedTanks(savedTanks.map((t) => (t.id === currentTankId ? newTank : t)));
      toast.success(`Updated "${name}"`);
    } else {
      setSavedTanks([...savedTanks, newTank]);
      setCurrentTankId(newTank.id);
      toast.success(`Saved "${name}"`);
    }
  };

  const handleChangeTank = (tankId: string) => {
    const tank = savedTanks.find((t) => t.id === tankId);
    if (tank) {
      setTankConfig(tank.config);
      setTankFish(tank.fish);
      setCurrentTankId(tank.id);
      setViewMode('dashboard');
      toast.success(`Loaded "${tank.name}"`);
    }
  };

  const handleDeleteTank = (tankId: string) => {
    setTankToDelete(tankId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteTank = () => {
    if (tankToDelete) {
      const tank = savedTanks.find((t) => t.id === tankToDelete);
      setSavedTanks(savedTanks.filter((t) => t.id !== tankToDelete));
      if (currentTankId === tankToDelete) {
        setCurrentTankId(null);
      }
      if (tank) {
        toast.success(`Deleted "${tank.name}"`);
      }
      setTankToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleEditTank = () => {
    setViewMode('setup');
  };

  const handleClearTank = () => {
    setTankFish([]);
    toast.info('Cleared all fish from tank');
  };

  if (viewMode === 'setup') {
    return (
      <SetupTank initialConfig={tankConfig} onComplete={handleSetupComplete} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 relative overflow-hidden">
      <BackgroundBubbles />
      
      <div className="relative z-10">
        <Header
          tankName={currentTankName}
          savedTanks={savedTanks}
          hasFish={tankFish.length > 0}
          onStartOver={handleStartOver}
          onChangeTank={handleChangeTank}
          onNewTank={handleNewTank}
          onSaveTank={() => setSaveDialogOpen(true)}
          onEditTank={handleEditTank}
          onClearTank={handleClearTank}
          onDeleteTank={handleDeleteTank}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              <AddFish onAddFish={handleAddFish} />
              <TankOverview
                config={tankConfig}
                stockCount={stockCount}
                speciesCount={speciesCount}
              />
              <TankStatus
                bioloadPercentage={bioloadPercentage}
                healthScore={healthScore}
              />
              <CurrentStock
                fish={tankFish}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFish={handleRemoveFish}
              />
            </div>

            {/* Sidebar - Right 1/3 */}
            <div>
              <CompatibilityIssues issues={issues} />
            </div>
          </div>
        </main>
      </div>

      <SaveTankDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onSave={handleSaveTank}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tank</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "
              {savedTanks.find((t) => t.id === tankToDelete)?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteTank}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster position="top-right" />
    </div>
  );
}