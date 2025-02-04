'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ApiKeyDetailsDialog } from './api-key-details-dialog';
import { useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  expires: string;
  status: 'active' | 'expired' | 'revoked';
}

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  onEdit?: (key: ApiKey) => void;
  onRevoke?: (key: ApiKey) => void;
}

export function ApiKeysTable({ apiKeys, onEdit, onRevoke }: ApiKeysTableProps) {
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow 
              key={key.id}
              className="hover:bg-muted/50"
            >
              <TableCell className="font-medium">{key.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <code className="bg-muted px-2 py-1 rounded">{key.key}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(key.key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{new Date(key.created).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(key.expires).toLocaleDateString()}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    key.status === 'active' ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" :
                    key.status === 'expired' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" :
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  )}
                >
                  {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setSelectedKey(key);
                      setDialogOpen(true);
                    }}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => onRevoke?.(key)}
                    >
                      Revoke
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ApiKeyDetailsDialog
        apiKey={selectedKey}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
} 