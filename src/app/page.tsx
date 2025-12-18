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
import { BackgroundBubbles } from "@/components/BackgroundBubbles";

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
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 relative overflow-hidden">
      <BackgroundBubbles />
      
      <div className="relative z-10 p-4 md:p-8">
        <header className="mb-8 bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 shadow-lg -mx-4 md:-mx-8 px-4 md:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
                <span className="text-4xl">🐠</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-1">
                  Finterest
                </h1>
                <p className="text-white/90 drop-shadow">Your Virtual Aquarium</p>
                {config.name && (
                  <p className="text-lg sm:text-xl text-white/80 font-medium mt-1 drop-shadow">
                    {config.name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
          <Button
            variant="secondary"
            onClick={handleStartOver}
            className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
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
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/50 z-50">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setConfig(null);
                          router.push('/unit-selection');
                          setShowTankMenu(false);
                        }}
                        className="w-full px-3 py-2 mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg shadow-lg transition font-medium flex items-center justify-center gap-2 text-sm"
                      >
                        <Plus size={16} />
                        New Tank
                      </button>
                    </div>
                    <div className="p-2 max-h-64 overflow-y-auto border-t border-white/20">
                      {savedTanks.map((tank) => (
                        <div
                          key={tank.id}
                          className="flex items-center justify-between p-2 hover:bg-white/20 rounded cursor-pointer group/item"
                        >
                          <button
                            onClick={() => {
                              loadTank(tank.id);
                              setShowTankMenu(false);
                            }}
                            className="flex-1 text-left text-sm text-gray-900"
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
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
          >
            <Save size={18} />
            <span className="hidden sm:inline">Save Tank</span>
            <span className="sm:hidden">Save</span>
          </Button>
          <Link href="/setup" className="flex-1 sm:flex-none">
            <Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
              <Settings size={18} />
              <span className="hidden sm:inline">Edit Tank</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </Link>
          {stockedFish.length > 0 && (
            <Button
              variant="danger"
              onClick={clearTank}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm border border-red-400/50 text-white shadow-lg"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline">Clear Tank</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          )}
            </div>
          </div>
      </header>

      <div className="max-w-[1280px] mx-auto">
        <div className="mb-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-white drop-shadow-lg mb-4">Add Fish</h2>
            <FishSearch />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TankVisualizer />
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white drop-shadow-lg mb-4">Tank Status</h2>
              <BioloadMeter percentage={bioloadPercentage} />
              <div className="mt-4">
                <p className="text-sm text-white/80 drop-shadow">Health Score</p>
                <p className="text-3xl font-bold text-white drop-shadow-lg">{healthScore}/100</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white drop-shadow-lg mb-4">Current Stock</h2>
              {stockedFish.length === 0 ? (
                <p className="text-white/70">No fish added yet</p>
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
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-lg mb-4">Compatibility Issues</h2>
              {issues.length === 0 ? (
                <p className="text-green-100 font-medium bg-green-500/20 border border-green-400/30 rounded-xl p-4 text-center">✓ All checks passed!</p>
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
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-md w-full border border-white/50">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Save Tank Configuration</h2>
            <input
              type="text"
              value={tankName}
              onChange={(e) => setTankName(e.target.value)}
              placeholder="Enter tank name (e.g., Den Tank, Kid's Room)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4 text-gray-900"
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
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg shadow-lg transition"
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
    </div>
  );
}
