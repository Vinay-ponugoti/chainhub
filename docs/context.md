'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  ArrowRight, Database, Shield, 
  Bitcoin, Coins, ExternalLink,
  Clock, CheckCircle, XCircle, ChevronDown,
  Zap, BarChart3, Globe, Filter,
  ArrowUpDown, ArrowDown, ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlockchainType } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecentTransactions from '@/components/RecentTransactions';
import StatsCard from '@/components/StatsCard';
import BlockchainCard from '@/components/BlockchainCard';
import ResultCard from '@/components/ResultCard';

// Function to generate random transaction data
const generateRandomTransaction = (chain?: 'bitcoin' | 'ethereum' | 'bsc'): BlockchainType => {
  const chains = ['bitcoin', 'ethereum', 'bsc'] as const;
  const randomChain = chain || chains[Math.floor(Math.random() * chains.length)];
  
  const randomHash = {
    bitcoin: `000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    ethereum: `0x742d35Cc6634C0532925a3b844Bc454e4438f4${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`,
    bsc: `0x742d35Cc6634C0532925a3b844Bc454e4438f5${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`
  };

  const randomValues = {
    bitcoin: `${(Math.random() * 0.1).toFixed(5)} BTC`,
    ethereum: `${(Math.random() * 2).toFixed(3)} ETH`,
    bsc: `${(Math.random() * 20).toFixed(1)} BNB`
  };

  const randomAddresses = {
    bitcoin: {
      from: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      to: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'
    },
    ethereum: {
      from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      to: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72'
    },
    bsc: {
      from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      to: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72'
    }
  };

  return {
    hash: randomHash[randomChain],
    from: randomAddresses[randomChain].from,
    to: randomAddresses[randomChain].to,
    value: randomValues[randomChain],
    status: Math.random() > 0.2 ? 'success' : (Math.random() > 0.5 ? 'pending' : 'failed'),
    blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
    timestamp: Date.now() - Math.floor(Math.random() * 10000000),
    chain: randomChain
  };
};

// Generate stats for each blockchain
const generateStats = (chain: string) => {
  const statsData = {
    bitcoin: {
      totalTransactions: 850000000,
      avgBlockTime: "9.75",
      activeAddresses: 1250000,
      marketCap: "1250.00"
    },
    ethereum: {
      totalTransactions: 2100000000,
      avgBlockTime: "12.50",
      activeAddresses: 2800000,
      marketCap: "389.50"
    },
    bsc: {
      totalTransactions: 3500000000,
      avgBlockTime: "3.00",
      activeAddresses: 1800000,
      marketCap: "87.30"
    },
    solana: {
      totalTransactions: 180000000000,
      avgBlockTime: "0.40",
      activeAddresses: 1500000,
      marketCap: "52.10"
    },
    cardano: {
      totalTransactions: 75000000,
      avgBlockTime: "20.00",
      activeAddresses: 950000,
      marketCap: "15.80"
    },
    polkadot: {
      totalTransactions: 45000000,
      avgBlockTime: "6.00",
      activeAddresses: 420000,
      marketCap: "8.40"
    },
    avalanche: {
      totalTransactions: 850000000,
      avgBlockTime: "2.00",
      activeAddresses: 680000,
      marketCap: "12.30"
    },
    polygon: {
      totalTransactions: 3800000000,
      avgBlockTime: "2.10",
      activeAddresses: 1200000,
      marketCap: "6.70"
    },
    cosmos: {
      totalTransactions: 120000000,
      avgBlockTime: "6.50",
      activeAddresses: 380000,
      marketCap: "3.40"
    },
    algorand: {
      totalTransactions: 350000000,
      avgBlockTime: "3.70",
      activeAddresses: 290000,
      marketCap: "1.20"
    }
  };
  
  return statsData[chain as keyof typeof statsData] || statsData.bitcoin;
};

// Blockchain data
const blockchains = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: Bitcoin,
    color: '#f7931a',
    description: 'The original cryptocurrency',
    currentPrice: '$65,432.18',
    change24h: '+2.4%',
    marketCap: '$1.2T',
    explorerUrl: 'https://blockchair.com/bitcoin'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: Database,
    color: '#627eea',
    description: 'Smart contract platform',
    currentPrice: '$3,245.67',
    change24h: '+1.8%',
    marketCap: '$389.5B',
    explorerUrl: 'https://etherscan.io'
  },
  {
    id: 'bsc',
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    icon: Coins,
    color: '#f3ba2f',
    description: 'Fast and low-cost transactions',
    currentPrice: '$567.89',
    change24h: '-0.5%',
    marketCap: '$87.3B',
    explorerUrl: 'https://bscscan.com'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    icon: Zap,
    color: '#14f195',
    description: 'High-performance blockchain',
    currentPrice: '$123.45',
    change24h: '+5.2%',
    marketCap: '$52.1B',
    explorerUrl: 'https://solscan.io'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    icon: Shield,
    color: '#0033ad',
    description: 'Proof-of-stake blockchain platform',
    currentPrice: '$0.45',
    change24h: '+0.8%',
    marketCap: '$15.8B',
    explorerUrl: 'https://cardanoscan.io'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    icon: Globe,
    color: '#e6007a',
    description: 'Multi-chain technology',
    currentPrice: '$6.78',
    change24h: '-1.2%',
    marketCap: '$8.4B',
    explorerUrl: 'https://polkascan.io'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    icon: BarChart3,
    color: '#e84142',
    description: 'Open, programmable smart contracts platform',
    currentPrice: '$34.56',
    change24h: '+3.1%',
    marketCap: '$12.3B',
    explorerUrl: 'https://snowtrace.io'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    icon: Database,
    color: '#8247e5',
    description: 'Ethereum scaling solution',
    currentPrice: '$0.67',
    change24h: '+1.5%',
    marketCap: '$6.7B',
    explorerUrl: 'https://polygonscan.com'
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    symbol: 'ATOM',
    icon: Globe,
    color: '#2e3148',
    description: 'Ecosystem of blockchains',
    currentPrice: '$8.90',
    change24h: '-0.7%',
    marketCap: '$3.4B',
    explorerUrl: 'https://mintscan.io'
  },
  {
    id: 'algorand',
    name: 'Algorand',
    symbol: 'ALGO',
    icon: Shield,
    color: '#000000',
    description: 'Pure proof-of-stake blockchain',
    currentPrice: '$0.15',
    change24h: '+0.3%',
    marketCap: '$1.2B',
    explorerUrl: 'https://algoexplorer.io'
  }
];

export default function ExplorerPage() {
  const [recentTransactions, setRecentTransactions] = useState<BlockchainType[]>([]);
  const [selectedChain, setSelectedChain] = useState<string>('bitcoin');
  const [isClient, setIsClient] = useState(false);
  const [visibleBlockchains, setVisibleBlockchains] = useState(6);
  const [filteredBlockchains, setFilteredBlockchains] = useState(blockchains);
  const [visibleTransactions, setVisibleTransactions] = useState(10);
  const [searchResult, setSearchResult] = useState<BlockchainType | null>(null);
  const [sortOption, setSortOption] = useState<string>('marketCap');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [transactionSpeed, setTransactionSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Set isClient to true once component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate initial data
  useEffect(() => {
    if (isClient) {
      // Initial batch of transactions
      updateTransactions(selectedChain);
    }
  }, [isClient, selectedChain]);

  // Handle transaction speed changes
  useEffect(() => {
    if (isClient) {
      // Clear existing interval
      if (intervalId) {
        clearInterval(intervalId);
      }
      
      // Set up interval for real-time updates based on speed
      const intervalTimes = {
        slow: 5000,
        medium: 2500,
        fast: 1000
      };
      
      const newIntervalId = setInterval(() => {
        addNewTransaction(selectedChain);
      }, intervalTimes[transactionSpeed]);
      
      setIntervalId(newIntervalId);
      
      return () => {
        if (newIntervalId) clearInterval(newIntervalId);
      };
    }
  }, [isClient, selectedChain, transactionSpeed]);

  // Sort blockchains when sort option changes
  useEffect(() => {
    sortBlockchains();
  }, [sortOption, sortDirection]);

  const updateTransactions = (chain: string) => {
    const transactions = [];
    for (let i = 0; i < 20; i++) {
      if (chain === 'all') {
        transactions.push(generateRandomTransaction());
      } else {
        const chainType = chain as 'bitcoin' | 'ethereum' | 'bsc';
        if (['bitcoin', 'ethereum', 'bsc'].includes(chain)) {
          transactions.push(generateRandomTransaction(chainType));
        } else {
          // For other chains, default to bitcoin for now
          transactions.push(generateRandomTransaction('bitcoin'));
        }
      }
    }
    setRecentTransactions(transactions);
  };

  const addNewTransaction = useCallback((chain: string) => {
    let newTransaction;
    
    if (chain === 'all') {
      newTransaction = generateRandomTransaction();
    } else {
      const chainType = chain as 'bitcoin' | 'ethereum' | 'bsc';
      if (['bitcoin', 'ethereum', 'bsc'].includes(chain)) {
        newTransaction = generateRandomTransaction(chainType);
      } else {
        // For other chains, default to bitcoin for now
        newTransaction = generateRandomTransaction('bitcoin');
      }
    }
    
    // Add new transaction at the beginning and limit the total number
    setRecentTransactions(prev => [
      newTransaction,
      ...prev.slice(0, 19) // Keep only the 20 most recent transactions
    ]);
  }, []);

  const handleChainSelect = (chain: string) => {
    setSelectedChain(chain);
    
    // If a specific blockchain is selected, move it to the top of the list
    if (chain !== 'all' && chain !== 'bitcoin' && chain !== 'ethereum') {
      const selectedBlockchain = blockchains.find(b => b.id === chain);
      if (selectedBlockchain) {
        const remainingBlockchains = blockchains.filter(b => b.id !== chain);
        setFilteredBlockchains([selectedBlockchain, ...remainingBlockchains]);
      } else {
        setFilteredBlockchains(blockchains);
      }
    } else {
      setFilteredBlockchains(blockchains);
    }
    
    updateTransactions(chain);
  };

  const showMoreBlockchains = () => {
    setVisibleBlockchains(filteredBlockchains.length);
  };

  const showMoreTransactions = () => {
    setVisibleTransactions(prev => Math.min(prev + 10, recentTransactions.length));
  };

  const handleBlockchainCardClick = (blockchainId: string) => {
    setSelectedChain(blockchainId);
  };

  const handleTransactionSelect = (transaction: BlockchainType) => {
    setSearchResult(transaction);
  };

  const sortBlockchains = () => {
    const sorted = [...filteredBlockchains].sort((a, b) => {
      let valueA, valueB;
      
      switch (sortOption) {
        case 'name':
          valueA = a.name;
          valueB = b.name;
          return sortDirection === 'asc' 
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        
        case 'price':
          valueA = parseFloat(a.currentPrice.replace(/[^0-9.-]+/g, ""));
          valueB = parseFloat(b.currentPrice.replace(/[^0-9.-]+/g, ""));
          break;
          
        case 'change':
          valueA = parseFloat(a.change24h.replace(/[^0-9.-]+/g, "")) * (a.change24h.includes('-') ? -1 : 1);
          valueB = parseFloat(b.change24h.replace(/[^0-9.-]+/g, "")) * (b.change24h.includes('-') ? -1 : 1);
          break;
          
        case 'marketCap':
        default:
          valueA = parseFloat(a.marketCap.replace(/[^0-9.-]+/g, ""));
          valueB = parseFloat(b.marketCap.replace(/[^0-9.-]+/g, ""));
          break;
      }
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      
      return 0;
    });
    
    setFilteredBlockchains(sorted);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Get the selected blockchain data
  const selectedBlockchainData = blockchains.find(b => b.id === selectedChain) || blockchains[0];

  return (
    <main className="min-h-screen bg-gradient-pattern relative">
      <div className="absolute inset-0 bg-grid"></div>
      <div className="relative">
        <Header activeLink="explorer" />
        
        <div className="max-w-[1200px] mx-auto px-4 pt-28 pb-16">
          {/* Explorer Header */}
          <div className="max-w-4xl mx-auto text-center mb-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-700 bg-clip-text text-transparent mb-4">
              Blockchain Explorer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              View transaction details across multiple blockchains
            </p>
          </div>

          {/* Search Result */}
          {searchResult && (
            <div className="max-w-4xl mx-auto mb-12">
              <ResultCard 
                result={searchResult} 
                onClose={() => setSearchResult(null)}
              />
            </div>
          )}

          {/* Main Content */}
          {isClient && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - Stats */}
              <div className="lg:col-span-4 space-y-6">
                {/* Network Stats with Animation */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-500 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Network Stats</h2>
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: selectedBlockchainData.color }}
                    >
                      <selectedBlockchainData.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-4 transition-all duration-500 transform">
                    <StatsCard 
                      chain={selectedChain}
                      stats={generateStats(selectedChain)}
                    />
                  </div>
                </div>
                
                {/* Recent Transactions with See More */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Live Transactions</h2>
                    <div 
                      className="text-sm font-medium px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${selectedBlockchainData.color}20`,
                        color: selectedBlockchainData.color
                      }}
                    >
                      {selectedBlockchainData.name}
                    </div>
                  </div>
                  
                  <RecentTransactions 
                    transactions={recentTransactions}
                    onSelectTransaction={handleTransactionSelect}
                    speed={transactionSpeed}
                    onSpeedChange={setTransactionSpeed}
                  />
                </div>
              </div>
              
              {/* Right Column - Blockchain Explorer Section */}
              <div className="lg:col-span-8">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Blockchain Explorers</h2>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium px-2">Sort by:</span>
                        <select 
                          className="bg-transparent border-0 text-sm p-1 pr-6 focus:ring-0 cursor-pointer"
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                        >
                          <option value="marketCap">Market Cap</option>
                          <option value="name">Name</option>
                          <option value="price">Price</option>
                          <option value="change">Price Change</option>
                        </select>
                        <button 
                          onClick={toggleSortDirection}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {sortDirection === 'asc' ? 
                            <ArrowUp className="h-4 w-4 text-gray-600 dark:text-gray-300" /> : 
                            <ArrowDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredBlockchains.slice(0, visibleBlockchains).map((blockchain) => (
                      <BlockchainCard 
                        key={blockchain.id}
                        blockchain={blockchain}
                        isSelected={selectedChain === blockchain.id}
                        onClick={() => handleBlockchainCardClick(blockchain.id)}
                      />
                    ))}
                    
                    {visibleBlockchains < filteredBlockchains.length && (
                      <div className="text-center mt-6">
                        <Button
                          variant="outline"
                          onClick={showMoreBlockchains}
                          className="group"
                        >
                          <span>See More</span>
                          <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </main>
  );
}


------------------------------------------------------------------------------------------------------------


'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Clock, XCircle, ArrowRight, Zap } from 'lucide-react';
import { BlockchainType } from '@/types';

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
      // Add new transactions one by one with a slight delay
      const addTransactionsWithDelay = async () => {
        // First, identify new transactions that aren't in the current visible list
        const existingHashes = new Set(visibleTransactions.map(tx => tx.hash));
        const newTransactions = transactions.filter(tx => !existingHashes.has(tx.hash));
        
        // If there are new transactions, add them one by one with animation
        if (newTransactions.length > 0) {
          // Add first new transaction immediately
          setVisibleTransactions(prev => [newTransactions[0], ...prev.slice(0, 9)]);
          
          // Add remaining transactions with delay
          for (let i = 1; i < newTransactions.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            setVisibleTransactions(prev => [newTransactions[i], ...prev.slice(0, 9)]);
          }
        }
      };
      
      addTransactionsWithDelay();
    }
  }, [transactions]);

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