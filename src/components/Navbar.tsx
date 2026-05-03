"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black px-6 h-20 flex items-center justify-between">
      <Link href="/" className="text-3xl font-black tracking-tighter flex items-center gap-0">
        <span className="bg-black text-white px-3 py-1 border-2 border-black">NEO</span>
        <span className="border-2 border-black px-3 py-1">BELANJA</span>
      </Link>

      <div className="hidden md:flex items-center h-full">
        <Link href="/catalog" className="h-full flex items-center px-8 border-l-4 border-black hover:bg-yellow font-black tracking-tighter transition-colors">
          COLLECTIONS
        </Link>
        <Link href="#" className="h-full flex items-center px-8 border-l-4 border-black hover:bg-accent font-black tracking-tighter transition-colors">
          EXPERIMENTAL
        </Link>
        <Link href="#" className="h-full flex items-center px-8 border-l-4 border-black hover:bg-secondary font-black tracking-tighter transition-colors">
          STORY
        </Link>
      </div>

      <div className="flex items-center gap-0 h-full border-l-4 border-black">
        <button className="h-full px-6 hover:bg-yellow transition-colors border-r-4 border-black">
          <Search size={24} strokeWidth={3} />
        </button>
        <button className="h-full px-6 hover:bg-accent transition-colors border-r-4 border-black relative group">
          <ShoppingBag size={24} strokeWidth={3} />
          <span className="absolute top-2 right-2 bg-black text-white text-[10px] font-black px-1 border-2 border-white">3</span>
        </button>
        <button className="md:hidden px-6" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-20 left-0 w-full bg-white border-b-4 border-black p-10 flex flex-col gap-6 md:hidden z-40"
          >
            <Link href="/catalog" className="text-4xl font-black italic hover:text-accent" onClick={() => setIsOpen(false)}>COLLECTIONS</Link>
            <Link href="#" className="text-4xl font-black italic hover:text-secondary" onClick={() => setIsOpen(false)}>EXPERIMENTAL</Link>
            <Link href="#" className="text-4xl font-black italic hover:text-yellow" onClick={() => setIsOpen(false)}>STORY</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
