"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 glass transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded group-hover:bg-white transition-colors">LUXE</span>
            <span className="text-white group-hover:text-accent transition-colors">BELANJA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black tracking-[0.3em]">
            <Link href="/catalog" className="hover:text-accent transition-all relative group">
              COLLECTIONS
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all"></span>
            </Link>
            <Link href="#" className="hover:text-accent transition-all relative group">
              THE STORY
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all"></span>
            </Link>
            <Link href="#" className="hover:text-accent transition-all relative group">
              CONCIERGE
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all"></span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="hover:text-accent transition-colors"
              title="Search"
            >
              <Search size={18} />
            </button>
            <button className="hover:text-accent transition-colors" title="Account">
              <User size={18} />
            </button>
            <button className="hover:text-accent transition-colors relative group" title="Cart">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform">0</span>
            </button>
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="glass border-t border-white/5 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-8 flex items-center gap-4">
                <Search size={24} className="text-accent" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="SEARCH FOR MASTERPIECES..." 
                  className="bg-transparent border-none text-2xl font-black tracking-tighter w-full focus:outline-none placeholder:text-white/20"
                />
                <button onClick={() => setShowSearch(false)} className="text-muted-foreground hover:text-white">CLOSE</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[60] glass backdrop-blur-3xl p-10 flex flex-col justify-center gap-10 text-4xl font-black tracking-tighter"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8"><X size={32} /></button>
            <Link href="/catalog" onClick={() => setIsOpen(false)}>COLLECTIONS</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>THE STORY</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>CONCIERGE</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
