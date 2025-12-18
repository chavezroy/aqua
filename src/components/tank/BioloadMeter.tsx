"use client";

interface BioloadMeterProps {
  percentage: number;
}

export function BioloadMeter({ percentage }: BioloadMeterProps) {
  const getColor = () => {
    if (percentage < 50) return "#22C55E"; // Algae Green
    if (percentage < 80) return "#F59E0B"; // Ammonia Yellow
    return "#EF4444"; // Coral Red
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-white drop-shadow">Bioload Capacity</span>
        <span className="text-sm font-medium text-white drop-shadow">{percentage.toFixed(1)}%</span>
      </div>
      <div className="relative w-full h-6 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border border-white/30 shadow-inner">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 shadow-lg"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>
    </div>
  );
}

