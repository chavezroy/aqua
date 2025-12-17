"use client";

import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./Button";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  variant = "default",
}: AlertDialogProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {variant === "destructive" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                      <AlertTriangle className="text-[#EF4444]" size={20} />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600">{message}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                {onConfirm && (
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    className="min-w-[80px]"
                  >
                    {cancelText}
                  </Button>
                )}
                <Button
                  variant={variant === "destructive" ? "danger" : "primary"}
                  onClick={onConfirm ? handleConfirm : onClose}
                  className="min-w-[80px]"
                >
                  {onConfirm ? confirmText : "OK"}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

