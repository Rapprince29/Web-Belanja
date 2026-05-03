"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-20 px-6 md:px-20 border-t border-white/5 bg-[#080808]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-6 tracking-tighter"
          >
            JOIN THE <span className="text-accent italic">ELITE.</span>
          </motion.h2>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Subscribe to receive updates, access to exclusive deals, and more. We promise only excellence.
          </p>
          <div className="flex gap-2 max-w-md">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="bg-white/5 border border-white/10 px-6 py-4 rounded-full flex-1 focus:outline-none focus:border-accent transition-colors"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-accent transition-colors"
            >
              JOIN
            </motion.button>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-[10px] tracking-[0.3em] text-accent uppercase">NAVIGATION</h4>
          <ul className="flex flex-col gap-4 text-muted-foreground text-sm font-medium">
            <li><Link href="/catalog" className="hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-4 h-px bg-accent transition-all"></span> COLLECTIONS</Link></li>
            <li><Link href="/about" className="hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-4 h-px bg-accent transition-all"></span> OUR STORY</Link></li>
            <li><Link href="/contact" className="hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-4 h-px bg-accent transition-all"></span> CONTACT</Link></li>
            <li><Link href="/shipping" className="hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-4 h-px bg-accent transition-all"></span> SHIPPING</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-[10px] tracking-[0.3em] text-accent uppercase">SOCIAL</h4>
          <ul className="flex flex-col gap-4 text-muted-foreground text-sm font-medium">
            <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2">INSTAGRAM</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2">PINTEREST</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2">TWITTER</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] tracking-[0.4em] font-black text-muted-foreground uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          SYSTEMS OPERATIONAL
        </div>
        <div>© 2024 LUXE BELANJA. CRAFTED FOR EXCELLENCE.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
          <a href="#" className="hover:text-white transition-colors">TERMS</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
