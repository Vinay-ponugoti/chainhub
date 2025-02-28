'use client';

import { useState } from 'react';
import { ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlockchainCardProps {
  blockchain: {
    id: string;
    name: string;
    symbol: string;
    icon: any;
    color: string;
    description: string;
    currentPrice: string;
    change24h: string;
    marketCap: string;
    explorerUrl: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export default function BlockchainCard({ blockchain, isSelected = false, onClick }: BlockchainCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = blockchain.icon;
  
  const isPositiveChange = blockchain.change24h.startsWith('+');
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer ${
        isSelected 
          ? `shadow-lg transform scale-[1.01]` 
          : 'shadow'
      } ${
        isHovered ? 'shadow-lg transform scale-[1.01]' : 'shadow'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)`,
        borderLeft: `4px solid ${blockchain.color}`
      }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-transform ${isSelected ? 'scale-110' : ''}`}
            style={{ backgroundColor: blockchain.color }}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              {blockchain.name}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {blockchain.symbol}
              </span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {blockchain.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-lg font-bold">{blockchain.currentPrice}</div>
          <div className={`text-sm flex items-center ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
            {isPositiveChange ? 
              <TrendingUp className="h-3 w-3 mr-1" /> : 
              <TrendingDown className="h-3 w-3 mr-1" />
            }
            {blockchain.change24h}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900/50 p-3 flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Market Cap: <span className="font-medium">{blockchain.marketCap}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          onClick={(e) => {
            e.stopPropagation();
            window.open(blockchain.explorerUrl, '_blank');
          }}
        >
          <span>Explorer</span>
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </div>
      
      {/* Animated gradient border on hover or when selected */}
      {(isHovered || isSelected) && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${blockchain.color}20, transparent)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}