'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ApiKeyDetailsDialogProps {
  apiKey: {
    id: string;
    name: string;
    key: string;
    created: string;
    expires: string;
    status: 'active' | 'expired' | 'revoked';
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApiKeyDetailsDialog({ apiKey, open, onOpenChange }: ApiKeyDetailsDialogProps) {
  if (!apiKey) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{apiKey.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-muted px-2 py-1 rounded">{apiKey.key}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(apiKey.key)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Created</label>
              <div className="text-sm">
                {new Date(apiKey.created).toLocaleDateString()}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Expires</label>
              <div className="text-sm">
                {new Date(apiKey.expires).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            <div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  apiKey.status === 'active' ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" :
                  apiKey.status === 'expired' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" :
                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                )}
              >
                {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 