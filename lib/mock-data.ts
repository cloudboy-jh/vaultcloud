// Mock data for VaultCloud
export const mockApiKeys: {
  id: string;
  name: string;
  key: string;
  created: string;
  expires: string;
  status: 'active' | 'expired' | 'revoked';
}[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'sk_live_2eF9...',
    created: '2024-03-15T10:00:00Z',
    expires: '2025-03-15T10:00:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'sk_dev_8hJ7...',
    created: '2024-02-01T08:30:00Z',
    expires: '2024-08-01T08:30:00Z',
    status: 'active',
  },
  {
    id: '3',
    name: 'Test Environment',
    key: 'sk_test_5kL9...',
    created: '2024-01-15T14:20:00Z',
    expires: '2024-04-15T14:20:00Z',
    status: 'expired',
  },
];

export const mockUsageData = {
  totalRequests: 1457823,
  activeKeys: 2,
  expiredKeys: 1,
  revokedKeys: 0,
  dailyRequests: [
    { date: '2024-03-10', requests: 15234 },
    { date: '2024-03-11', requests: 14876 },
    { date: '2024-03-12', requests: 16543 },
    { date: '2024-03-13', requests: 15987 },
    { date: '2024-03-14', requests: 17234 },
    { date: '2024-03-15', requests: 16432 },
    { date: '2024-03-16', requests: 15876 },
  ],
};

export const mockLogs = [
  {
    id: '1',
    timestamp: '2024-03-16T15:23:45Z',
    apiKey: 'sk_live_2eF9...',
    path: '/api/v1/users',
    responseTime: 234,
    status: 200,
  },
  {
    id: '2',
    timestamp: '2024-03-16T15:22:30Z',
    apiKey: 'sk_live_2eF9...',
    path: '/api/v1/transactions',
    responseTime: 456,
    status: 200,
  },
  {
    id: '3',
    timestamp: '2024-03-16T15:21:15Z',
    apiKey: 'sk_dev_8hJ7...',
    path: '/api/v1/products',
    responseTime: 123,
    status: 400,
  },
];