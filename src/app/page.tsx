"use client";

import { useEffect, useState } from "react";
import { useTankStore } from "@/store/useTankStore";
import { BioloadMeter } from "@/components/tank/BioloadMeter";
import { TankVisualizer } from "@/components/tank/TankVisualizer";
import { FishSearch } from "@/components/fish/FishSearch";
import { FishCard } from "@/components/fish/FishCard";
import { Toast } from "@/components/ui/Toast";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SplashScreen } from "@/components/SplashScreen";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Settings, Trash2, FolderOpen, Save, Home, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast, ToastContainer } from "@/components/ui/ToastNotification";
import { AlertDialog } from "@/components/ui/AlertDialog";

export default function Dashboard() {
  const router = useRouter();
  const { config, stockedFish, issues, bioloadPercentage, healthScore, clearTank, savedTanks, loadSavedTanks, loadTank, deleteTank, saveTank, setConfig } =
    useTankStore();
  const [showLoading, setShowLoading] = useState(true);
  const [showTankMenu, setShowTankMenu] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [tankName, setTankName] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; tankId: string; tankName: string }>({
    open: false,
    tankId: "",
    tankName: "",
  });
  const { toasts, removeToast, showToast } = useToast();

  useEffect(() => {
    loadSavedTanks();
    if (config?.name) {
      setTankName(config.name);
    }
  }, [loadSavedTanks, config]);

  const handleSave = () => {
    if (!tankName.trim()) {
      showToast("warning", "Please enter a tank name");
      return;
    }
    saveTank(tankName.trim());
    setShowSaveDialog(false);
    showToast("success", `Tank "${tankName.trim()}" saved successfully!`);
    setTankName("");
  };

  const handleDeleteClick = (tankId: string, name: string) => {
    setDeleteDialog({ open: true, tankId, tankName: name });
  };

  const handleDeleteConfirm = () => {
    deleteTank(deleteDialog.tankId);
    if (config?.name === deleteDialog.tankName) {
      clearTank();
      setConfig(null);
    }
    showToast("success", `Tank "${deleteDialog.tankName}" deleted successfully`);
    setDeleteDialog({ open: false, tankId: "", tankName: "" });
  };

  const handleStartOver = () => {
    clearTank();
    setConfig(null);
    showToast("info", "Returned to start screen");
  };

  // Loading screen sequence
  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }

  // Splash screen (only if no config)
  if (!config) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            🐠 AquaHarmony
          </h1>
          <p className="text-gray-600 mb-1">Your Virtual Aquarium</p>
          {config.name && (
            <p className="text-lg sm:text-xl text-gray-500 font-medium">
              {config.name}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
          <Button
            variant="secondary"
            onClick={handleStartOver}
            className="flex items-center justify-center gap-2"
            title="Start Over - Return to start screen"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Start Over</span>
            <span className="sm:hidden">Start</span>
          </Button>
          {savedTanks.length > 0 && (
            <div className="relative w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={() => setShowTankMenu(!showTankMenu)}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <FolderOpen size={18} />
                <span className="hidden sm:inline">Change Tank</span>
                <span className="sm:hidden">Change</span>
              </Button>
              {showTankMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowTankMenu(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setConfig(null);
                          router.push('/unit-selection');
                          setShowTankMenu(false);
                        }}
                        className="w-full px-3 py-2 mb-2 bg-[#14B8A6] text-white rounded-lg hover:bg-[#0D9488] transition font-medium flex items-center justify-center gap-2 text-sm"
                      >
                        <Plus size={16} />
                        New Tank
                      </button>
                    </div>
                    <div className="p-2 max-h-64 overflow-y-auto border-t border-gray-200">
                      {savedTanks.map((tank) => (
                        <div
                          key={tank.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer group/item"
                        >
                          <button
                            onClick={() => {
                              loadTank(tank.id);
                              setShowTankMenu(false);
                            }}
                            className="flex-1 text-left text-sm"
                          >
                            <div className="font-medium">{tank.name}</div>
                            <div className="text-xs text-gray-500">
                              {tank.config.volume_gallons.toFixed(1)} gal • {tank.stockedFish.length} species
                            </div>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(tank.id, tank.name);
                            }}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <Button
            variant="secondary"
            onClick={() => setShowSaveDialog(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            <Save size={18} />
            <span className="hidden sm:inline">Save Tank</span>
            <span className="sm:hidden">Save</span>
          </Button>
          <Link href="/setup" className="flex-1 sm:flex-none">
            <Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center gap-2">
              <Settings size={18} />
              <span className="hidden sm:inline">Edit Tank</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </Link>
          {stockedFish.length > 0 && (
            <Button
              variant="danger"
              onClick={clearTank}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline">Clear Tank</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          )}
        </div>
      </header>

      <div className="mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Add Fish</h2>
          <FishSearch />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TankVisualizer />
          
          <div className="bg-white rounded-lg shadow p-6 mb-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Tank Status</h2>
            <BioloadMeter percentage={bioloadPercentage} />
            <div className="mt-4">
              <p className="text-sm text-gray-600">Health Score</p>
              <p className="text-3xl font-bold">{healthScore}/100</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Stock</h2>
            {stockedFish.length === 0 ? (
              <p className="text-gray-500">No fish added yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stockedFish.map((stocked) => (
                  <FishCard
                    key={stocked.species.id}
                    fish={stocked.species}
                    quantity={stocked.quantity}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Compatibility Issues</h2>
            {issues.length === 0 ? (
              <p className="text-green-600 font-medium">✓ All checks passed!</p>
            ) : (
              <div className="space-y-2">
                {issues.map((issue, idx) => (
                  <Toast key={idx} type={issue.type} message={issue.message} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Save Tank Configuration</h2>
            <input
              type="text"
              value={tankName}
              onChange={(e) => setTankName(e.target.value)}
              placeholder="Enter tank name (e.g., Den Tank, Kid's Room)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, tankId: "", tankName: "" })}
        onConfirm={handleDeleteConfirm}
        title="Delete Tank"
        message={`Are you sure you want to delete "${deleteDialog.tankName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}
