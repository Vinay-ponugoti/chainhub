'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Clock, XCircle, ArrowRight, Zap } from 'lucide-react';
import { BlockchainType } from '@/src/types';

interface RecentTransactionsProps {
  transactions: BlockchainType[];
  onSelectTransaction?: (transaction: BlockchainType) => void;
  speed?: 'slow' | 'medium' | 'fast';
  onSpeedChange?: (speed: 'slow' | 'medium' | 'fast') => void;
}

export default function RecentTransactions({ 
  transactions, 
  onSelectTransaction,
  speed = 'medium',
  onSpeedChange
}: RecentTransactionsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleTransactions, setVisibleTransactions] = useState<BlockchainType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update visible transactions when the transactions prop changes
  useEffect(() => {
    if (transactions.length > 0) {
      setVisibleTransactions(transactions.slice(0, 10));
    }
  }, [transactions, visibleTransactions]); // Add visibleTransactions to dependency array

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getChainIcon = (chain: string) => {
    switch (chain) {
      case 'bitcoin':
        return <span className="text-[#f7931a] font-bold">₿</span>;
      case 'ethereum':
        return <span className="text-[#627eea] font-bold">Ξ</span>;
      case 'bsc':
        return <span className="text-[#f3ba2f] font-bold">B</span>;
      default:
        return null;
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) {
      return 'Just now';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    } else {
      return `${Math.floor(diff / 86400000)}d ago`;
    }
  };

  const truncateHash = (hash: string) => {
    if (hash.length <= 16) return hash;
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  return (
    <div className="space-y-4">
      {/* Speed Control */}
      {onSpeedChange && (
        <div className="mb-4 mt-1">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              <span>Transaction Speed</span>
            </div>
            <div className="relative h-6 w-[120px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
                style={{ 
                  width: speed === 'slow' ? '33%' : speed === 'medium' ? '66%' : '100%',
                  opacity: 0.8
                }}
              />
              <div className="absolute inset-0 flex">
                {(['slow', 'medium', 'fast'] as const).map((s) => (
                  <button
                    key={s}
                    className={`flex-1 h-full text-xs font-medium transition-colors duration-300 z-10 ${
                      speed === s 
                        ? 'text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                    onClick={() => onSpeedChange(s)}
                  >
                    {s === 'slow' ? '1x' : s === 'medium' ? '2x' : '3x'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="space-y-3 overflow-hidden" ref={containerRef}>
        {visibleTransactions.map((tx, index) => (
          <div 
            key={`${tx.hash}-${index}`}
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors relative cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800 animate-fade-in"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelectTransaction && onSelectTransaction(tx)}
            style={{
              animation: `fade-in 0.3s ease-out forwards, slide-in 0.3s ease-out forwards`,
              animationDelay: `${index * 0.05}s`
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  {getChainIcon(tx.chain)}
                </div>
                <div className="font-mono text-sm truncate max-w-[120px]">
                  {truncateHash(tx.hash)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {getStatusIcon(tx.status)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 min-w-[50px] text-right">
                  {formatTime(tx.timestamp)}
                </div>
              </div>
            </div>
            
            {hoveredIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                <span 
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium"
                >
                  View Details
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in {
          from { transform: translateY(-20px); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}