import { Home, FolderOpen, Save, Settings, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SavedTank } from '../types';

interface HeaderProps {
  tankName: string;
  savedTanks: SavedTank[];
  hasFish: boolean;
  onStartOver: () => void;
  onChangeTank: (tankId: string) => void;
  onNewTank: () => void;
  onSaveTank: () => void;
  onEditTank: () => void;
  onClearTank: () => void;
  onDeleteTank: (tankId: string) => void;
}

export function Header({
  tankName,
  savedTanks,
  hasFish,
  onStartOver,
  onChangeTank,
  onNewTank,
  onSaveTank,
  onEditTank,
  onClearTank,
  onDeleteTank,
}: HeaderProps) {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
              <span className="text-4xl">🐠</span>
            </div>
            <div>
              <h1 className="font-bold text-3xl sm:text-4xl text-white drop-shadow-lg">
                Finterest
              </h1>
              <p className="text-white/90 drop-shadow">Your Virtual Aquarium</p>
              {tankName && (
                <p className="text-white/80 font-medium mt-1 drop-shadow">{tankName}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              onClick={onStartOver}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Start Over</span>
              <span className="sm:hidden">Start</span>
            </Button>

            {savedTanks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
                    <FolderOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Change Tank</span>
                    <span className="sm:hidden">Change</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-md border-white/50">
                  <div className="p-2">
                    <Button
                      onClick={onNewTank}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg"
                    >
                      New Tank
                    </Button>
                  </div>
                  <DropdownMenuSeparator />
                  {savedTanks.map((tank) => (
                    <DropdownMenuItem
                      key={tank.id}
                      className="flex items-center justify-between p-3 cursor-pointer"
                      onSelect={() => onChangeTank(tank.id)}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{tank.name}</div>
                        <div className="text-gray-500">
                          {tank.config.volume.toFixed(1)} gal • {tank.fish.length}{' '}
                          species
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTank(tank.id);
                        }}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="secondary"
              onClick={onSaveTank}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save Tank</span>
              <span className="sm:hidden">Save</span>
            </Button>

            <Button
              variant="secondary"
              onClick={onEditTank}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Tank</span>
              <span className="sm:hidden">Edit</span>
            </Button>

            {hasFish && (
              <Button
                variant="destructive"
                onClick={onClearTank}
                className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm border border-red-400/50 text-white shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear Tank</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}