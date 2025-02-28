'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// -----------
import ComingSoonOverlay from '@/components/ComingSoonOverlay';
// ----------

interface HeaderProps {
  onSearch?: (hash: string) => void;
  activeLink?: string;
}

export default function Header({ onSearch, activeLink }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue.trim());
    }
  };

  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark');
      setIsDarkMode(!isDarkMode);
    }
  };

  const handleExplorerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="mx-auto px-4 max-w-7xl">
        <div className={`glass-card rounded-2xl transition-all duration-300 animate-float ${
          isScrolled ? 'shadow-lg' : 'shadow-xl'
        }`}>
          <header className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                {/* Updated Logo */}
                <Link href="/" className="flex items-center gap-1 transition-transform hover:scale-105 group">
                  <div className="h-8 w-8 flex items-center justify-center">
                    <Image
                      src="/icon.png"
                      alt="ChainHub Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-orbitron text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
                    CHAINHUB
                  </span>
                </Link>

                {/* Desktop Navigation - Moved next to logo */}
                <nav className="hidden md:flex items-center gap-6">
                  <Link 
                    href="/" 
                    className={`nav-link px-3 py-2 transition-colors ${
                      activeLink === 'home' 
                        ? 'text-blue-600 dark:text-blue-400 font-medium active' 
                        : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                    }`}
                  >
                    Home
                  </Link>
                  {/* Change Link to button for Explorer */}
                  <button 
                    onClick={handleExplorerClick}
                    className={`nav-link px-3 py-2 transition-colors ${
                      activeLink === 'explorer' 
                        ? 'text-blue-600 dark:text-blue-400 font-medium active' 
                        : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                    }`}
                  >
                    Explorer
                  </button>

                </nav>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-3">
                {onSearch && (
                  <form onSubmit={handleSubmit} className="hidden md:block">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search transaction..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-[220px] h-10 pl-4 pr-10 bg-gray-100/80 dark:bg-gray-800/80 border-transparent focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300 focus:w-[280px]"
                      />
                      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}

                <button 
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <button 
                  className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mobile menu - simplified */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
                <nav className="flex flex-col gap-3">
                  <Link 
                    href="/" 
                    className={`px-3 py-2 rounded-lg ${
                      activeLink === 'home' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/explorer" 
                    className={`px-3 py-2 rounded-lg ${
                      activeLink === 'explorer' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Explorer
                  </Link>
                </nav>

                {/* Mobile search */}
                {onSearch && (
                  <form onSubmit={handleSubmit} className="mt-4 px-3">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search transaction hash..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full h-10 pl-4 pr-10 bg-gray-100 dark:bg-gray-800 border-transparent focus:border-blue-500 rounded-lg"
                      />
                      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </header>
        </div>
      </div>

     {/* Coming Soon Overlay */}
      {showComingSoon && (
        <ComingSoonOverlay onClose={() => setShowComingSoon(false)} />
      )}
    </div>
  );
}