"use client";

import { motion } from "motion/react";
import { Thermometer, Ruler, Droplet } from "lucide-react";
import { useTankStore } from "@/store/useTankStore";
import { useRouter } from "next/navigation";
import { UnitSystem } from "@/types";

export function UnitSelectionScreen() {
  const router = useRouter();
  const { setUnitSystem } = useTankStore();

  const handleSelectUnit = (system: UnitSystem) => {
    setUnitSystem(system);
    router.push("/setup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-600 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 80 + 20,
              height: Math.random() * 80 + 20,
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
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Choose Your Unit System
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Select your preferred measurement system for this session
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {/* Imperial Option */}
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onClick={() => handleSelectUnit("imperial")}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 hover:border-white/40 hover:bg-white/20 transition-all text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                <Ruler className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Imperial</h2>
            </div>
            <div className="space-y-2 text-white/80">
              <div className="flex items-center gap-2">
                <Droplet size={16} />
                <span>Gallons (gal)</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler size={16} />
                <span>Inches (in)</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer size={16} />
                <span>Fahrenheit (°F)</span>
              </div>
            </div>
          </motion.button>

          {/* Metric Option */}
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onClick={() => handleSelectUnit("metric")}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 hover:border-white/40 hover:bg-white/20 transition-all text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                <Ruler className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Metric</h2>
            </div>
            <div className="space-y-2 text-white/80">
              <div className="flex items-center gap-2">
                <Droplet size={16} />
                <span>Liters (L)</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler size={16} />
                <span>Centimeters (cm)</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer size={16} />
                <span>Celsius (°C)</span>
              </div>
            </div>
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white/70 text-sm mt-8"
        >
          You can change this later in settings
        </motion.p>
      </div>
    </div>
  );
}

