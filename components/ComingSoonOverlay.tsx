'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComingSoonOverlayProps {
  onClose: () => void;
}

export default function ComingSoonOverlay({ onClose }: ComingSoonOverlayProps) {
  const router = useRouter();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose} // Close overlay when clicking anywhere
    >
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"
      ></div>
      
      {/* Content */}
      <div 
        className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-gray-100 dark:border-gray-700 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent clicks on content from closing overlay
      >
        {/* Change the single quote to &apos; */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">We&apos;re working hard to bring you this feature soon!</p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </Button>
        
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
            <AlertCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our blockchain explorer is currently in development. We're working hard to bring you a powerful tool to explore transactions across multiple blockchains.
          </p>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
          
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onClose}
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}