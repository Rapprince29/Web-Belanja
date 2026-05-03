"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'h-16 glass' : 'h-24 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
          <span className="text-white group-hover:text-muted-foreground transition-colors uppercase italic">MASTER</span>
          <span className="text-white font-light tracking-[0.3em]">PIECE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 text-[10px] font-black tracking-[0.3em]">
          {["TYPOGRAPHY", "3D", "TRANSITIONS", "ILLUSTRATION"].map((item) => (
            <Link key={item} href="/catalog" className="text-white/60 hover:text-white transition-all relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <button className="text-white/60 hover:text-white transition-colors"><Search size={18} /></button>
          <button className="text-white/60 hover:text-white transition-colors relative group">
            <ShoppingBag size={18} />
            <span className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center gap-12 md:hidden z-40"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white"><X size={32} /></button>
            {["TYPOGRAPHY", "3D", "TRANSITIONS", "ILLUSTRATION"].map((item) => (
              <Link key={item} href="/catalog" className="text-4xl font-black italic text-white hover:text-white/60" onClick={() => setIsOpen(false)}>{item}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
