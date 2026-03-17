"use client";
import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  actionLabel: string;
  disabled?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
 
}: ModalProps) => {
   
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;
  

  return (
    <Dialog 
    open={isOpen} onOpenChange={handleClose}>
      
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {body}
          <DialogFooter className="mt-4">
            <div className="
              flex justify-center
              ">
              {footer}
            </div>
            <Button type="submit" disabled={disabled}>
              {actionLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};