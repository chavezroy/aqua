import { Plus, Minus, X, Thermometer, Droplet } from 'lucide-react';
import { TankFish } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface CurrentStockProps {
  fish: TankFish[];
  onUpdateQuantity: (fishId: string, delta: number) => void;
  onRemoveFish: (fishId: string) => void;
}

export function CurrentStock({
  fish,
  onUpdateQuantity,
  onRemoveFish,
}: CurrentStockProps) {
  const getAggressionBadge = (aggression: string) => {
    switch (aggression) {
      case 'peaceful':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Peaceful
          </Badge>
        );
      case 'semi-aggressive':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Semi-aggressive
          </Badge>
        );
      case 'aggressive':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Aggressive
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🐠</span>
        <h2 className="font-semibold text-white text-xl">Current Stock</h2>
      </div>

      {fish.length === 0 ? (
        <p className="text-white/70 text-center py-8">No fish added yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fish.map((f) => (
            <div
              key={f.id}
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 hover:shadow-xl transition-all hover:bg-white/25"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{f.commonName}</h3>
                  <p className="text-white/70 italic">{f.scientificName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFish(f.id)}
                  className="text-white/60 hover:text-red-400 hover:bg-red-500/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-3 text-white/80">
                <div>Size: {f.size.toFixed(1)}"</div>
                <div>Min Tank: {f.minTankSize.toFixed(1)} gal</div>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-3.5 h-3.5 text-white/60" />
                  <span>
                    {f.temperatureRange[0]}-{f.temperatureRange[1]}°F
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="w-3.5 h-3.5 text-white/60" />
                  <span>
                    pH {f.phRange[0]}-{f.phRange[1]}
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {getAggressionBadge(f.aggression)}
                {f.schoolingRequired && (
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    Schooling
                  </Badge>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(f.id, -1)}
                  disabled={f.quantity <= 1}
                  className="w-8 h-8 p-0 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-semibold w-8 text-center text-white">{f.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(f.id, 1)}
                  className="w-8 h-8 p-0 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}