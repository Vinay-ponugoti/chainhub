import { useState } from 'react';
import { Copy, Share2, FileText, Shield, ExternalLink, CheckCircle, Clock, XCircle, X } from 'lucide-react';
import { BlockchainType } from '@/src/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ResultCardProps {
  result: BlockchainType;
  onClose: () => void;
}

export default function ResultCard({ result, onClose }: ResultCardProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getChainIcon = () => {
    switch (result.chain) {
      case 'bitcoin':
        return (
          <div className="h-12 w-12 rounded-full bg-[#f7931a] flex items-center justify-center">
            <span className="text-2xl font-bold text-white">₿</span>
          </div>
        );
      case 'ethereum':
        return (
          <div className="h-12 w-12 rounded-full bg-[#627eea] flex items-center justify-center">
            <span className="text-2xl font-bold text-white">Ξ</span>
          </div>
        );
      case 'bsc':
        return (
          <div className="h-12 w-12 rounded-full bg-[#f3ba2f] flex items-center justify-center">
            <span className="text-2xl font-bold text-white">B</span>
          </div>
        );
    }
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  
  const getExplorerUrl = () => {
    switch (result.chain) {
      case 'bitcoin':
        return `https://blockchain.com/explorer/transactions/btc/${result.hash}`;
      case 'ethereum':
        return `https://etherscan.io/tx/${result.hash}`;
      case 'bsc':
        return `https://bscscan.com/tx/${result.hash}`;
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          {getChainIcon()}
          <div>
            <h2 className="text-2xl font-bold capitalize">
              {result.chain} transaction
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                {getStatusIcon()}
                {result.status}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {new Date(result.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">HASH</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                onClick={() => copyToClipboard(result.hash)}
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                onClick={() => {
                  const url = window.location.href;
                  copyToClipboard(url);
                }}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                onClick={() => window.print()}
              >
                <FileText className="h-4 w-4 mr-1" />
                Receipt
              </Button>
            </div>
          </div>
          <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl break-all">
            {result.hash}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">TRANSACTION STATUS</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">In block</span>
              <span className="font-mono font-medium">
                {result.blockNumber ? result.blockNumber.toLocaleString() : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Time</span>
              <span className="font-mono font-medium">
                {result.timestamp ? new Date(result.timestamp).toUTCString() : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">FROM</h3>
            <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl break-all">
              {result.from}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">TO</h3>
            <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl break-all">
              {result.to}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">VALUE</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <span className="text-xl font-bold">{result.value}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">PRIVACY SCORE</h3>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <Shield className="h-6 w-6 text-blue-500" />
              <div>
                <span className="text-xl font-bold text-blue-500">51</span>
                <span className="ml-2 text-gray-500 dark:text-gray-400">Moderate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            className="w-full sm:w-auto"
            onClick={() => window.open(getExplorerUrl(), '_blank')}
          >
            <span>View in Explorer</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}