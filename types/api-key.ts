export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  expires: string;
  status: 'active' | 'expired' | 'revoked';
} 