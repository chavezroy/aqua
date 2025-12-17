"use client";

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Droplet, Fish, Waves, FolderOpen, Plus } from 'lucide-react';
import Link from 'next/link';
import { useTankStore } from '@/store/useTankStore';
import { useRouter } from 'next/navigation';
import { formatVolume } from '@/lib/unitUtils';

export function SplashScreen() {
  const router = useRouter();
  const { savedTanks, loadSavedTanks, loadTank, unitSystem, setConfig } = useTankStore();
  const [showSavedTanks, setShowSavedTanks] = useState(false);

  useEffect(() => {
    loadSavedTanks();
  }, [loadSavedTanks]);

  const handleLoadTank = (tankId: string) => {
    loadTank(tankId);
    router.push('/');
  };

  const handleNewTank = () => {
    setConfig(null);
    router.push('/unit-selection');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-600 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center size-32 bg-white/20 backdrop-blur-md rounded-full border-4 border-white/30 shadow-2xl">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Fish className="size-16 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Finterest
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Droplet className="size-5 text-cyan-200" />
            <p className="text-xl sm:text-2xl text-cyan-100">
              Your Virtual Aquarium Companion
            </p>
            <Waves className="size-5 text-cyan-200" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-base sm:text-lg text-white/90 mb-8 max-w-md mx-auto leading-relaxed"
        >
          Build the perfect aquarium community. Check fish compatibility, monitor
          tank health, and prevent common mistakes before they happen.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">🐠</div>
            <h3 className="font-semibold text-white mb-1">Species Database</h3>
            <p className="text-sm text-white/80">
              Browse compatible fish species
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="font-semibold text-white mb-1">Live Warnings</h3>
            <p className="text-sm text-white/80">
              Instant compatibility alerts
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-white mb-1">Tank Analytics</h3>
            <p className="text-sm text-white/80">
              Monitor bioload & health
            </p>
          </div>
        </motion.div>

        {/* Saved Tanks Section */}
        {savedTanks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-6"
          >
            <button
              onClick={() => setShowSavedTanks(!showSavedTanks)}
              className="text-white/90 hover:text-white text-sm font-medium flex items-center gap-2 mx-auto transition-all"
            >
              <FolderOpen className="size-4" />
              {showSavedTanks ? 'Hide' : 'View'} Saved Tanks ({savedTanks.length})
            </button>
            
            {showSavedTanks && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 max-w-2xl mx-auto"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 max-h-64 overflow-y-auto">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-semibold">Your Saved Tanks</h3>
                    <button
                      onClick={handleNewTank}
                      className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                      title="Create New Tank"
                    >
                      <Plus size={16} />
                      <span className="hidden sm:inline">New Tank</span>
                      <span className="sm:hidden">+</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedTanks.map((tank) => (
                      <button
                        key={tank.id}
                        onClick={() => handleLoadTank(tank.id)}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-left transition-all hover:scale-105"
                      >
                        <div className="font-semibold text-white mb-1">{tank.name}</div>
                        <div className="text-xs text-white/70">
                          {formatVolume(tank.config.volume_liters, unitSystem)} • {tank.stockedFish.length} {tank.stockedFish.length === 1 ? 'species' : 'species'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/unit-selection">
            <button
              className="bg-white text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 shadow-2xl text-lg px-12 py-6 h-auto font-semibold rounded-full transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <Fish className="size-5" />
              Start Building Your Tank
            </button>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-sm text-white/60 mt-8"
        >
          Help prevent fish mortality through smart planning 🌊
        </motion.p>
      </div>
    </div>
  );
}

