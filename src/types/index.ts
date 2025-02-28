export interface BlockchainType {
  chain: 'ethereum' | 'bsc' | 'bitcoin' | 'polygon' | 'avalanche' | 'solana';
  hash: string;
  from: string;
  to: string;
  value: string;
  status: 'success' | 'pending' | 'failed';
  blockNumber?: number;
  timestamp: number;
  explorerUrl?: string;
}

export interface Stats {
  totalTransactions: number;
  avgBlockTime: string;
  activeAddresses: number;
  marketCap: string;
}

export interface Classification {
  type: 'transaction';
  chain: 'ethereum' | 'bsc' | 'bitcoin';
}

