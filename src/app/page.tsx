"use client";

import ThreeCanvas from "@/components/ThreeCanvas";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [activeProduct, setActiveProduct] = useState("");

  const addToCart = (name: string) => {
    setActiveProduct(name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <main className="min-h-screen bg-transparent overflow-hidden relative">
      <ThreeCanvas />
      
      {/* Immersive Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] glass px-12 py-5 rounded-full flex items-center gap-4 border border-white/20 shadow-2xl"
          >
            <CheckCircle className="text-white animate-pulse" size={24} />
            <span className="font-black text-[10px] tracking-[0.5em] uppercase italic">{activeProduct} ADDED TO UNIVERSE</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section: WebGL Immersive */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 md:px-20 hero-section">
        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/30 font-black tracking-[1em] text-[8px] mb-12 block uppercase italic">IMMERSIVE_WEBGL_EXPERIENCE_V2</span>
            <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.8] mb-12 text-gradient uppercase italic">
              DEEP <br />
              SPACE
            </h1>
            <p className="text-white/40 text-sm md:text-base font-black tracking-[0.2em] max-w-xl mx-auto mb-16 leading-relaxed uppercase">
              Navigating the boundaries of 3D commerce. Explore curated assets in a high-performance WebGL environment.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <Link href="/catalog" className="px-16 py-6 glass text-white rounded-full font-black text-[10px] tracking-[0.5em] hover:bg-white hover:text-black hover:scale-110 transition-all duration-700 uppercase">
                ENTER ARCHIVE
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Cinematic Navigation */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 text-right">
          {["01_ART", "02_TYPE", "03_3D", "04_MOT"].map((nav, i) => (
            <motion.div 
              key={nav}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="text-white/20 group-hover:text-white transition-all text-[8px] font-black tracking-[0.5em] mb-2">{nav}</div>
              <div className="h-px w-0 group-hover:w-full bg-white transition-all duration-700 ml-auto"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experimental Floating Cards Section */}
      <section className="relative py-40 px-6 md:px-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 uppercase italic text-gradient">The New <br /> Standard.</h2>
            <p className="text-white/30 text-xs font-black tracking-[0.3em] leading-loose uppercase mb-12">
              Every asset is a world of its own. Optimized for Three.js and high-end motion design.
            </p>
            <div className="w-20 h-1 bg-white/20"></div>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-20">
            {[
              { id: 3, name: "KINETIC TYPE", price: "$890", img: "/watch.png", cat: "TYPOGRAPHY" },
              { id: 4, name: "UI MENU KIT", price: "$230", img: "/lamp.png", cat: "MENU" },
            ].map((product, i) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -20, scale: 1.02 }}
                className="group relative"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-[4/5] glass rounded-[3rem] overflow-hidden relative border border-white/5 group-hover:border-white/20 transition-all duration-700">
                    <Image 
                      src={product.img} 
                      alt={product.name}
                      fill
                      className="object-cover opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-[2s] ease-out grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-1000"></div>
                    
                    <div className="absolute bottom-10 left-10">
                      <span className="text-[8px] font-black tracking-[0.5em] text-white/40 block mb-4 italic">{product.cat}</span>
                      <h3 className="text-4xl font-black tracking-tighter text-white">{product.name}</h3>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.name);
                      }}
                      className="absolute top-10 right-10 w-20 h-20 glass rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 hover:bg-white hover:text-black"
                    >
                      <ShoppingBag size={24} />
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Footer */}
      <footer className="relative py-40 px-6 md:px-20 border-t border-white/5 z-10">
        <div className="text-center mb-40">
          <h2 className="text-[10rem] md:text-[20rem] font-black tracking-tighter text-stroke-white opacity-5 select-none leading-none mb-0">FUTURE</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 -mt-20 relative z-10">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase">Join the Vision</h3>
            <div className="flex glass rounded-full px-8 py-4 border border-white/10 max-w-md w-full">
              <input type="text" placeholder="YOUR_FREQUENCY@SPACE.COM" className="bg-transparent flex-1 font-black text-[10px] tracking-widest focus:outline-none uppercase" />
              <button className="text-white hover:opacity-40 transition-opacity font-black text-[10px] tracking-widest uppercase">TRANSMIT</button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-[8px] font-black tracking-[0.8em] opacity-10">
          <span>WEBGL_ENGINE_V2 // 2024</span>
          <span>BEYOND THE HORIZON</span>
        </div>
      </footer>
    </main>
  );
}
