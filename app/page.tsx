'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsageData, mockApiKeys } from '@/lib/mock-data';
import {
  Activity,
  KeyRound,
  AlertTriangle,
  ShieldCheck,
  Ban,
  Copy,
  MoreVertical,
  Plus,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ApiKeysTable } from '@/components/api-keys-table';
import { NewApiKeyDialog } from '@/components/new-api-key-dialog';
import { useState } from 'react';
import type { ApiKey } from '@/types/api-key';

export default function Home() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyDialogOpen, setNewKeyDialogOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const handleEditKey = (key: any) => {
    // Implement edit functionality
    console.log('Edit key:', key);
  };

  const handleRevokeKey = (key: ApiKey) => {
    setApiKeys((prevKeys) => prevKeys.filter((k) => k.id !== key.id));
    toast.success('API key revoked successfully');
  };

  const handleCreateKey = (name: string, content: string) => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name,
      key: content,
      created: new Date().toISOString(),
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    };
    setApiKeys((prevKeys) => [...prevKeys, newKey]);
    setNewKeyDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Lock className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Your Vault</h1>
        </div>
        <Button onClick={() => setNewKeyDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New API Key
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsageData.totalRequests.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
            <KeyRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsageData.activeKeys}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Keys</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsageData.expiredKeys}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revoked Keys</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsageData.revokedKeys}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <ApiKeysTable 
            apiKeys={apiKeys}
            onEdit={handleEditKey}
            onRevoke={handleRevokeKey}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUsageData.dailyRequests.slice(-5).map((day) => (
                <div
                  key={day.date}
                  className="flex items-center justify-between"
                >
                  <div className="text-sm">{day.date}</div>
                  <div className="text-sm font-medium">
                    {day.requests.toLocaleString()} requests
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <ShieldCheck className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-lg font-medium">All Systems Secure</div>
                <div className="text-sm text-muted-foreground">
                  No security incidents detected
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NewApiKeyDialog
        open={newKeyDialogOpen}
        onOpenChange={setNewKeyDialogOpen}
        onCreateKey={handleCreateKey}
      />
    </div>
  );
}