"use client";

import { motion } from "motion/react";
import { Thermometer, Droplet, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Species } from "@/types";
import { CompatibilityIssue } from "@/types";

interface ScanResult {
  fish: Species;
  confidence: number;
  image?: string;
}

interface CompatibilityChecks {
  temperature: {
    value: string;
    compatible: boolean;
    issue: CompatibilityIssue | null;
  };
  ph: {
    value: string;
    compatible: boolean;
    issue: CompatibilityIssue | null;
  };
  tankSize: {
    compatible: boolean;
    issue: CompatibilityIssue | null;
  };
  social: {
    compatible: boolean;
    issue: CompatibilityIssue | null;
  };
}

interface ResultSheetProps {
  result: ScanResult;
  compatibility: CompatibilityChecks | null;
  onRescan: () => void;
  onAddToTank: () => void;
  onClose: () => void;
}

export function ResultSheet({
  result,
  compatibility,
  onRescan,
  onAddToTank,
  onClose,
}: ResultSheetProps) {
  const { fish, confidence } = result;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "15%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-x-0 bottom-0 z-20 bg-slate-900 rounded-t-3xl shadow-2xl border-t border-slate-700 max-h-[85vh] overflow-y-auto"
    >
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium px-3 py-1 rounded-full">
                {confidence}% MATCH
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">{fish.common_name}</h2>
            <p className="text-slate-400 italic">{fish.scientific_name}</p>
          </div>
          {/* Thumbnail placeholder */}
          <div className="w-24 h-24 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center">
            <span className="text-4xl">🐠</span>
          </div>
        </div>

        {/* Compatibility Engine Integration */}
        {compatibility && (
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-4 mb-6">
            <h3 className="text-white font-semibold mb-4">Tank Compatibility</h3>
            
            <div className="space-y-3">
              {/* Temperature Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Thermometer className="text-slate-400" size={20} />
                  <span className="text-white">Temperature</span>
                  <span className="text-slate-400">{compatibility.temperature.value}</span>
                </div>
                {compatibility.temperature.compatible ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : (
                  <XCircle className="text-red-400" size={20} />
                )}
              </div>

              {/* pH Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Droplet className="text-slate-400" size={20} />
                  <span className="text-white">pH Level</span>
                  <span className="text-slate-400">{compatibility.ph.value}</span>
                </div>
                {compatibility.ph.compatible ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : (
                  <XCircle className="text-red-400" size={20} />
                )}
              </div>

              {/* Tank Size Check */}
              {!compatibility.tankSize.compatible && compatibility.tankSize.issue && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-red-300 text-sm">{compatibility.tankSize.issue.message}</p>
                  </div>
                </div>
              )}

              {/* Social/Aggression Warning */}
              {!compatibility.social.compatible && compatibility.social.issue && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-yellow-300 text-sm">{compatibility.social.issue.message}</p>
                  </div>
                </div>
              )}

              {/* Temperature Warning */}
              {!compatibility.temperature.compatible && compatibility.temperature.issue && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-yellow-300 text-sm">{compatibility.temperature.issue.message}</p>
                  </div>
                </div>
              )}

              {/* pH Warning */}
              {!compatibility.ph.compatible && compatibility.ph.issue && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-yellow-300 text-sm">{compatibility.ph.issue.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onRescan}
            className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg font-medium hover:bg-slate-700 transition"
          >
            Rescan
          </button>
          <button
            onClick={onAddToTank}
            className="flex-1 px-6 py-3 bg-teal-500 text-slate-900 font-bold rounded-lg shadow-lg hover:bg-teal-400 transition"
          >
            Add to Tank
          </button>
        </div>
      </div>
    </motion.div>
  );
}
