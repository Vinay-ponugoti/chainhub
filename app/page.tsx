'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Database, Shield, Zap, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlockchainType } from '@/src/types';
import ResultCard from '@/components/ResultCard';
import { useEffect } from 'react';




export default function Home() {
  const [searchResult, setSearchResult] = useState<BlockchainType | null>(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 


  const handleSearch = async (hash: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Direct API calls instead of using route handlers
      const cleanHash = hash.toLowerCase().trim();
      
      if (/^0x([A-Fa-f0-9]{64})$/.test(cleanHash)) {
        // Try Ethereum
        const ethResponse = await fetch(
          `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
        );
        const ethData = await ethResponse.json();
        if (ethData.result) {
          const receiptResponse = await fetch(
            `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${hash}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
          );
          const receiptData = await receiptResponse.json();
          
          setSearchResult({
            hash,
            from: ethData.result.from,
            to: ethData.result.to,
            value: `${parseInt(ethData.result.value, 16) / 1e18} ETH`,
            status: receiptData.result?.status === '0x1' ? 'success' : 'failed',
            blockNumber: parseInt(ethData.result.blockNumber, 16),
            timestamp: Date.now(),
            chain: 'ethereum',
            explorerUrl: `https://etherscan.io/tx/${hash}`
          });
          return;
        }

        // Try BSC if not found on Ethereum
        const bscResponse = await fetch(
          `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${process.env.NEXT_PUBLIC_BSCSCAN_API_KEY}`
        );
        const bscData = await bscResponse.json();
        if (bscData.result) {
          const receiptResponse = await fetch(
            `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionReceipt&txhash=${hash}&apikey=${process.env.NEXT_PUBLIC_BSCSCAN_API_KEY}`
          );
          const receiptData = await receiptResponse.json();
          
          setSearchResult({
            hash,
            from: bscData.result.from,
            to: bscData.result.to,
            value: `${parseInt(bscData.result.value, 16) / 1e18} BNB`,
            status: receiptData.result?.status === '0x1' ? 'success' : 'failed',
            blockNumber: parseInt(bscData.result.blockNumber, 16),
            timestamp: Date.now(),
            chain: 'bsc',
            explorerUrl: `https://bscscan.com/tx/${hash}`
          });
          return;
        }
      }

      // Try Bitcoin
      if (/^[A-Fa-f0-9]{64}$/.test(cleanHash)) {
        const btcResponse = await fetch(`https://blockchain.info/rawtx/${hash}?format=json`);
        if (btcResponse.ok) {
          const data = await btcResponse.json();
          setSearchResult({
            hash,
            from: data.inputs[0]?.prev_out?.addr || 'Unknown',
            to: data.out[0]?.addr || 'Multiple Recipients',
            value: (data.out.reduce((sum: number, output: any) => sum + output.value, 0) / 100000000).toFixed(8) + ' BTC',
            status: 'success',
            blockNumber: data.block_height || 0,
            timestamp: data.time * 1000,
            chain: 'bitcoin',
            explorerUrl: `https://www.blockchain.com/explorer/transactions/btc/${hash}`
          });
          return;
        }
      }

      throw new Error('Transaction not found or invalid hash format');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionHash.trim()) {
      handleSearch(transactionHash.trim());
    }
  };

  const handleDoubleClick = () => {
    setTransactionHash('');
    setSearchResult(null);
    setError(null);
  };

  const handleFocus = () => {
    if (searchResult) {
      setTransactionHash('');
      setSearchResult(null);
      setError(null);
    }
  };


 

  return (
    <main className="min-h-screen bg-gradient-pattern relative">
      <div className="absolute inset-0 bg-grid"></div>
      <div className="relative">
        <Header onSearch={handleSearch} />
        
        <div className="max-w-[1200px] mx-auto px-4 pt-40 pb-16">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            {/* Hero Section */}
            <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-br from-blue-600/90 to-blue-800/90 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <h1 className="relative text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
                Blockchain Explorer
              </h1>
              <p className="relative text-lg text-blue-100 mb-8">
                Explore transactions across multiple blockchains in one place
              </p>

              {/* Search Form */}
              <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter transaction hash"
                      value={transactionHash}
                      onChange={(e) => setTransactionHash(e.target.value)}
                      onDoubleClick={handleDoubleClick}
                      onFocus={handleFocus}
                      className="w-full h-14 pl-12 pr-32 text-lg bg-white/90 dark:bg-gray-800/90 border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      autoFocus
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Button
                      type="submit"
                      disabled={isLoading || !transactionHash.trim()}
                      className="absolute right-2 top-2 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isLoading ? 'Searching...' : 'Search'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-200">{error}</p>
                )}
              </form>
            </div>

            {/* Search Result */}
            {searchResult && (
              <div className="max-w-2xl mx-auto mb-16">
                <ResultCard 
                  result={searchResult} 
                  onClose={() => setSearchResult(null)}
                />
              </div>
            )}

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { 
                  icon: Database, 
                  label: 'Multi-Chain Support', 
                  description: 'Search across Bitcoin, Ethereum, and BSC networks', 
                  color: 'from-purple-500/90 to-purple-600/90'
                },
                { 
                  icon: Shield, 
                  label: 'Real-Time Data', 
                  description: 'Get instant transaction status updates', 
                  color: 'from-green-500/90 to-green-600/90'
                },
                { 
                  icon: Zap, 
                  label: 'Fast & Reliable', 
                  description: 'Lightning-fast transaction lookups', 
                  color: 'from-yellow-500/90 to-yellow-600/90'
                },
              ].map((feature, index) => (
                <div
                  key={feature.label}
                  className="group p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${feature.color} p-3.5 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-full w-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    
    </main>
  );
}