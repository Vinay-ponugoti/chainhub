import { create } from 'zustand';
import { persist, PersistOptions, createJSONStorage } from 'zustand/middleware';
import { StateCreator } from 'zustand';
import { Stats } from '@/src/types';

interface StatsData {
  bitcoin: Stats;
  ethereum: Stats;
  bsc: Stats;
  [key: string]: Stats;
}

interface Block {
  chain: string;
  number?: number;
  hash?: string;
  timestamp?: number;
  transactions?: any[];
}

interface BlockchainStore {
  blocks: Record<string, Block>;
  transactions: Record<string, any[]>;
  stats: Record<string, Stats>;
  fetchStats: (chain: string) => Promise<void>;
}

type BlockchainPersist = (
  config: StateCreator<BlockchainStore>,
  options: PersistOptions<BlockchainStore>
) => StateCreator<BlockchainStore>;

const persistConfig: PersistOptions<BlockchainStore> = {
  name: 'blockchain-store',
  storage: typeof window !== 'undefined' 
    ? createJSONStorage(() => localStorage)
    : undefined,
};

export const useBlockchainStore = create<BlockchainStore>()(
  (persist as BlockchainPersist)(
    (set) => ({
      blocks: {},
      transactions: {},
      stats: {},
      fetchStats: async (chain: string) => {
        const statsData: StatsData = {
          bitcoin: { totalTransactions: 850000000, avgBlockTime: "9.75", activeAddresses: 1250000, marketCap: "1250.00" },
          ethereum: { totalTransactions: 2100000000, avgBlockTime: "12.50", activeAddresses: 2800000, marketCap: "389.50" },
          bsc: { totalTransactions: 3500000000, avgBlockTime: "3.00", activeAddresses: 1800000, marketCap: "87.30" },
        };
        
        set((state) => ({
          stats: { ...state.stats, [chain]: statsData[chain] },
        }));
      },
    }),
    persistConfig
  )
);