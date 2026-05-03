"use client";

import ThreeCanvas from "@/components/ThreeCanvas";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-mesh overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 md:px-20">
        <ThreeCanvas />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-accent font-bold tracking-[0.5em] text-sm mb-4 block">PREMIUM COLLECTION 2024</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
              THE ART OF <br />
              <span className="text-gradient">ELEGANCE</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              Experience the future of commerce with our immersive 3D shopping experience. Crafted for those who appreciate the finer things.
            </p>
            
            <div className="flex items-center gap-4">
              <button className="bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                SHOP NOW <ArrowRight size={20} />
              </button>
              <button className="border border-white/10 hover:bg-white/5 px-8 py-4 rounded-full font-bold transition-colors">
                VIEW STORY
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground text-xs font-bold tracking-widest"
        >
          SCROLL TO EXPLORE
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6 md:px-20 bg-background relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">SELECTED PIECES</h2>
            <div className="h-1 w-20 bg-accent"></div>
          </div>
          <button className="text-accent font-bold flex items-center gap-2 hover:gap-4 transition-all">
            VIEW ALL COLLECTIONS <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="aspect-[4/5] glass rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                <div className="w-32 h-32 bg-accent/20 rounded-full blur-3xl absolute group-hover:scale-150 transition-transform duration-700"></div>
                <div className="text-accent font-bold text-4xl opacity-20 group-hover:opacity-100 transition-opacity">0{i}</div>
                <button className="absolute bottom-6 right-6 p-4 bg-white text-black rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ShoppingBag size={20} />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-1">AESTHETIC PIECE {i}</h3>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest">Minimalist Design</p>
                </div>
                <div className="text-right">
                  <div className="text-accent font-bold">$299.00</div>
                  <div className="flex items-center gap-1 text-xs mt-1">
                    <Star size={10} fill="currentColor" className="text-accent" />
                    <span className="text-muted-foreground">4.9</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
