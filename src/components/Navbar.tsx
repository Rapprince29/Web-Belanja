"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded">LUXE</span>
          <span className="text-white">BELANJA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="/catalog" className="hover:text-accent transition-colors">COLLECTIONS</Link>
          <Link href="/about" className="hover:text-accent transition-colors">STORY</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">CONCIERGE</Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="hover:text-accent transition-colors">
            <Search size={20} />
          </button>
          <button className="hover:text-accent transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute top-20 left-0 w-full p-6 flex flex-col gap-6 text-lg font-medium"
        >
          <Link href="/catalog" onClick={() => setIsOpen(false)}>COLLECTIONS</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>STORY</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>CONCIERGE</Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
