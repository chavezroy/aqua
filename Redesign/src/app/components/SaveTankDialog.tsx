import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SaveTankDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
}

export function SaveTankDialog({
  open,
  onOpenChange,
  onSave,
}: SaveTankDialogProps) {
  const [tankName, setTankName] = useState('');

  const handleSave = () => {
    if (tankName.trim()) {
      onSave(tankName.trim());
      setTankName('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Tank Configuration</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="text"
            placeholder="Enter tank name (e.g., Den Tank, Kid's Room)"
            value={tankName}
            onChange={(e) => setTankName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
            autoFocus
          />
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!tankName.trim()}
            className="flex-1 bg-gray-900 hover:bg-gray-800"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
