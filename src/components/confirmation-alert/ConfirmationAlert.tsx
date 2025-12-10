"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components";
import { Loader2 } from "lucide-react";

export const ConfirmationAlert = ({
  isOpen,
  onClose,
  title,
  description,
  actionFunction,
  text = "Delete",
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  actionFunction: () => void;
  text: string;
  isLoading?: boolean;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="border-0 w-full p-4 pt-0 shadow-popup [&>button]:cursor-pointer"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <h4 className="text-xl text-neutral-900 font-bold">{title}</h4>
          {description && (
            <h5 className="font-medium text-gray-500">{description}</h5>
          )}

          <div className="justify-between flex gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onClose}
              className="flex-1 cursor-pointer"
            >
              No
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              onClick={actionFunction}
              className="flex-1 cursor-pointer"
            >
              {text} {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
