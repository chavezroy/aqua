import { Progress } from './ui/progress';

interface TankStatusProps {
  bioloadPercentage: number;
  healthScore: number;
}

export function TankStatus({ bioloadPercentage, healthScore }: TankStatusProps) {
  const getBioloadColor = (percentage: number) => {
    if (percentage > 80) return '#EF4444'; // red
    if (percentage > 50) return '#F59E0B'; // orange
    return '#22C55E'; // green
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📊</span>
        <h2 className="font-semibold text-white text-xl">Tank Status</h2>
      </div>

      {/* Bioload Meter */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-white">Bioload Capacity</span>
          <span className="font-medium text-white">{bioloadPercentage.toFixed(1)}%</span>
        </div>
        <div className="relative w-full h-6 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border border-white/30 shadow-inner">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 shadow-lg"
            style={{
              width: `${Math.min(bioloadPercentage, 100)}%`,
              backgroundColor: getBioloadColor(bioloadPercentage),
            }}
          />
        </div>
      </div>

      {/* Health Score */}
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
        <div className="text-white/80 mb-2">Health Score</div>
        <div className="font-bold text-4xl text-white drop-shadow-lg">{healthScore}/100</div>
      </div>
    </div>
  );
}