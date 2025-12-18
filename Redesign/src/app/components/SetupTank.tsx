import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { TankConfig } from '../types';

interface SetupTankProps {
  initialConfig?: TankConfig;
  onComplete: (config: TankConfig) => void;
}

export function SetupTank({ initialConfig, onComplete }: SetupTankProps) {
  const [config, setConfig] = useState<TankConfig>(
    initialConfig || {
      volume: 20,
      length: 24,
      width: 12,
      height: 16,
      temperature: 75,
      ph: 7.0,
      hasFilter: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(config);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl" />
      </div>

      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative z-10 border border-white/50">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl mx-auto mb-4 border-4 border-white/50">
            <span className="text-5xl">🐠</span>
          </div>
          <h1 className="font-bold text-4xl mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Setup Your Tank
          </h1>
          <p className="text-gray-600">
            Configure your aquarium parameters
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Volume */}
          <div>
            <Label htmlFor="volume" className="text-gray-700">Tank Volume (gallons)</Label>
            <Input
              id="volume"
              type="number"
              step="0.1"
              value={config.volume}
              onChange={(e) =>
                setConfig({ ...config, volume: parseFloat(e.target.value) })
              }
              required
              className="border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="length" className="text-gray-700">Length (inches)</Label>
              <Input
                id="length"
                type="number"
                step="0.1"
                value={config.length || ''}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    length: parseFloat(e.target.value) || undefined,
                  })
                }
                className="border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <Label htmlFor="width" className="text-gray-700">Width (inches)</Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                value={config.width || ''}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    width: parseFloat(e.target.value) || undefined,
                  })
                }
                className="border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-gray-700">Height (inches)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={config.height || ''}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    height: parseFloat(e.target.value) || undefined,
                  })
                }
                className="border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Temperature and pH */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temperature" className="text-gray-700">Temperature (°F)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                value={config.temperature}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    temperature: parseFloat(e.target.value),
                  })
                }
                required
                className="border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <Label htmlFor="ph" className="text-gray-700">pH Level</Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={config.ph}
                onChange={(e) =>
                  setConfig({ ...config, ph: parseFloat(e.target.value) })
                }
                required
                className="border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-xl py-6 text-lg"
          >
            {initialConfig ? 'Update Tank' : 'Create Tank'}
          </Button>
        </form>
      </div>
    </div>
  );
}