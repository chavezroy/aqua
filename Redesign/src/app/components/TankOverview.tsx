import { Droplet, Thermometer, Gauge, Ruler } from 'lucide-react';
import { TankConfig } from '../types';

interface TankOverviewProps {
  config: TankConfig;
  stockCount: number;
  speciesCount: number;
}

export function TankOverview({
  config,
  stockCount,
  speciesCount,
}: TankOverviewProps) {
  const surfaceArea =
    config.length && config.width ? config.length * config.width : null;

  const getPhClassification = (ph: number) => {
    if (ph < 7) return 'Acidic';
    if (ph > 7) return 'Alkaline';
    return 'Neutral';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <Droplet className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-semibold text-white text-xl">Tank Overview</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Volume */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30">
          <div className="text-white/80 mb-1">Volume</div>
          <div className="font-bold text-white text-xl">
            {config.volume.toFixed(1)} gal
          </div>
          {config.length && config.width && config.height && (
            <div className="text-white/70 mt-1">
              {config.length.toFixed(1)}" × {config.width.toFixed(1)}" ×{' '}
              {config.height.toFixed(1)}"
            </div>
          )}
        </div>

        {/* Temperature */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30">
          <div className="flex items-center gap-1 text-white/80 mb-1">
            <Thermometer className="w-3 h-3" />
            <span>Temperature</span>
          </div>
          <div className="font-bold text-white text-xl">
            {config.temperature.toFixed(1)}°F
          </div>
        </div>

        {/* pH Level */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30">
          <div className="text-white/80 mb-1">pH Level</div>
          <div className="font-bold text-white text-xl">
            {config.ph.toFixed(1)}
          </div>
          <div className="text-white/70">
            {getPhClassification(config.ph)}
          </div>
        </div>

        {/* Stock */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30">
          <div className="flex items-center gap-1 text-white/80 mb-1">
            <Gauge className="w-3 h-3" />
            <span>Stock</span>
          </div>
          <div className="font-bold text-white text-xl">{stockCount}</div>
          <div className="text-white/70">
            {speciesCount} {speciesCount === 1 ? 'species' : 'species'}
          </div>
        </div>
      </div>

      {/* Surface Area */}
      {surfaceArea && (
        <div className="border-t border-white/20 mt-6 pt-4">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Ruler className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Surface Area:</span>
            <span className="font-bold">{surfaceArea.toFixed(0)} in²</span>
          </div>
        </div>
      )}
    </div>
  );
}