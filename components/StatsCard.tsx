'use client';

import { BarChart3, Clock, Users, DollarSign } from 'lucide-react';

interface StatsCardProps {
  chain: string;
  stats: {
    totalTransactions: number;
    avgBlockTime: string;
    activeAddresses: number;
    marketCap: string;
  };
}

export default function StatsCard({ chain, stats }: StatsCardProps) {
  const getChainClass = () => {
    switch (chain) {
      case 'bitcoin':
        return 'chain-bitcoin';
      case 'ethereum':
        return 'chain-ethereum';
      case 'bsc':
        return 'chain-bsc';
      case 'solana':
        return 'chain-solana';
      case 'avalanche':
        return 'chain-avalanche';
      case 'polygon':
        return 'chain-polygon';
      default:
        return 'chain-bitcoin';
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className={`${getChainClass()}`}>
      <div className="bg-white dark:bg-gray-900 rounded-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">Transactions</span>
            </div>
            <div className="text-lg font-bold">
              {formatNumber(stats.totalTransactions)}
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">Block Time</span>
            </div>
            <div className="text-lg font-bold">
              {stats.avgBlockTime}s
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">Active Addresses</span>
            </div>
            <div className="text-lg font-bold">
              {formatNumber(stats.activeAddresses)}
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">Market Cap</span>
            </div>
            <div className="text-lg font-bold">
              ${stats.marketCap}B
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}