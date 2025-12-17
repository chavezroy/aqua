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
        <span className="text-sm font-medium">Bioload Capacity</span>
        <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-full transition-all duration-300 rounded-full"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>
    </div>
  );
}

