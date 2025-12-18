"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Zap, Thermometer, Droplet, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useTankStore } from "@/store/useTankStore";
import { Species } from "@/types";
import { validateTemperature, validatePH, validateTankSize, validateSchooling } from "@/lib/compatibilityEngine";
import { formatTemperature } from "@/lib/unitUtils";
import { ResultSheet } from "./ResultSheet";

interface ScanResult {
  fish: Species;
  confidence: number;
  image?: string;
}

export function VisualSearchCamera() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { config, addFish, unitSystem } = useTankStore();

  // Redirect if no tank configured
  useEffect(() => {
    if (!config) {
      router.push("/");
    }
  }, [config, router]);

  // Initialize camera
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !navigator.mediaDevices) {
      return;
    }

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        // Fallback: show mock camera view
      }
    };

    initCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Mock AI identification - in real app, this would call an AI service
  const identifyFish = async (): Promise<ScanResult | null> => {
    // Simulate scanning delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo: randomly select a fish from database
    // In production, this would use actual image recognition
    const fishDataModule = await import("@/lib/fishDatabase.json");
    // Handle JSON import - it's a direct array
    const fishArray = (fishDataModule.default || fishDataModule || []) as Species[];
    if (fishArray.length === 0) {
      throw new Error("No fish data available");
    }
    const randomFish = fishArray[Math.floor(Math.random() * fishArray.length)];

    return {
      fish: randomFish,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
    };
  };

  const handleCapture = async () => {
    if (isScanning) return;

    setIsScanning(true);

    try {
      const result = await identifyFish();
      if (result) {
        setScanResult(result);
        setShowResult(true);
      }
    } catch (error) {
      console.error("Error identifying fish:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    router.back();
  };

  const handleRescan = () => {
    setShowResult(false);
    setScanResult(null);
  };

  const handleAddToTank = () => {
    if (scanResult) {
      addFish(scanResult.fish);
      // Show success message or navigate back
      router.push("/");
    }
  };

  // Calculate compatibility checks
  const getCompatibilityChecks = () => {
    if (!scanResult || !config) {
      return null;
    }

    const { fish } = scanResult;
    const tempIssue = validateTemperature(fish, config.temperature, unitSystem);
    const phIssue = validatePH(fish, config.ph);
    const sizeIssue = validateTankSize(fish, config.volume_liters, unitSystem);
    const schoolingIssue = validateSchooling(fish, 1);

    return {
      temperature: {
        value: formatTemperature(config.temperature, unitSystem),
        compatible: !tempIssue,
        issue: tempIssue,
      },
      ph: {
        value: config.ph.toFixed(1),
        compatible: !phIssue,
        issue: phIssue,
      },
      tankSize: {
        compatible: !sizeIssue,
        issue: sizeIssue,
      },
      social: {
        compatible: !schoolingIssue,
        issue: schoolingIssue,
      },
    };
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900">
      {/* Layer 1: Camera Viewport */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/90 pointer-events-none" />
      </div>

      {/* Layer 2: HUD Overlay */}
      {!showResult && (
        <div className="absolute inset-0 z-10 flex flex-col">
          {/* Top Bar Controls */}
          <div className="flex justify-between items-start p-4 pt-12">
            <button
              onClick={handleClose}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition"
            >
              <X size={24} />
            </button>

            <div className="bg-black/40 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
              <span className="text-teal-300 text-xs font-medium tracking-wider uppercase">
                AI SCANNER ACTIVE
              </span>
            </div>

            <button
              onClick={() => setFlashOn(!flashOn)}
              className={`w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border ${
                flashOn ? "border-teal-400" : "border-white/10"
              } flex items-center justify-center text-white hover:bg-black/60 transition`}
            >
              <Zap size={24} className={flashOn ? "text-teal-400" : ""} />
            </button>
          </div>

          {/* Center: Reticle */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className={`relative w-64 h-64 border-2 rounded-lg transition-all duration-300 ${
                isScanning
                  ? "scale-110 border-teal-400 shadow-[0_0_40px_rgba(20,184,166,0.3)]"
                  : "border-white/20"
              }`}
            >
              {/* Corner Brackets */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-teal-400" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-teal-400" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-teal-400" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-teal-400" />

              {/* Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse" />
                  <div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                    style={{
                      animation: "scan 2s linear infinite",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="pb-8 px-4 space-y-4">
            {/* Zoom Slider */}
            <div className="flex justify-center gap-2">
              {[0.5, 1, 2].map((zoom) => (
                <button
                  key={zoom}
                  onClick={() => setZoomLevel(zoom)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    zoomLevel === zoom
                      ? "bg-teal-500 text-slate-900"
                      : "bg-black/40 border border-white/10 text-white"
                  }`}
                >
                  {zoom}x
                </button>
              ))}
            </div>

            {/* Shutter Button */}
            <div className="flex justify-center">
              <button
                onClick={handleCapture}
                disabled={isScanning}
                className="relative w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-teal-500 transition-all ${
                    isScanning ? "animate-pulse scale-90" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Layer 3: Result Sheet */}
      {showResult && scanResult && (
        <ResultSheet
          result={scanResult}
          compatibility={getCompatibilityChecks()}
          onRescan={handleRescan}
          onAddToTank={handleAddToTank}
          onClose={handleClose}
        />
      )}

    </div>
  );
}
