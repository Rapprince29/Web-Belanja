"use client";

import ThreeCanvas from "@/components/ThreeCanvas";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ShoppingBag, CheckCircle, Zap } from "lucide-react";
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
    <main className="min-h-screen bg-mesh overflow-hidden relative">
      
      {/* Elegant Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] glass px-8 py-4 rounded-full flex items-center gap-4 border border-white/10"
          >
            <CheckCircle className="text-white" size={20} />
            <span className="font-bold text-xs tracking-widest uppercase">{activeProduct} ADDED TO COLLECTION</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section: Minimalist & Experimental */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 md:px-20 hero-section">
        <ThreeCanvas />
        
        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/40 font-black tracking-[0.8em] text-[10px] mb-8 block uppercase">EXPERIMENTAL_COLLECTION_2024</span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-10 text-gradient">
              ART & <br />
              ILLUSTRATION
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-light max-w-xl mx-auto mb-12 leading-relaxed">
              Where minimalist aesthetics meet complex motion design. Explore the future of creative assets.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link href="/catalog" className="px-12 py-5 bg-white text-black rounded-full font-black text-[10px] tracking-[0.4em] hover:bg-white/90 hover:scale-105 transition-all">
                EXPLORE COLLECTIONS
              </Link>
              <button className="text-white/40 hover:text-white transition-colors font-black text-[10px] tracking-[0.4em]">
                OUR MANIFESTO
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-white/20 to-white/40"></div>
          <span className="text-white/20 text-[8px] font-black tracking-[0.5em] uppercase">SCROLL</span>
        </div>
      </section>

      {/* Experimental Asymmetric Section */}
      <section className="py-40 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-40"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 uppercase italic">Experimental <br /> Thinking.</h2>
            <p className="text-white/60 text-xl font-light leading-relaxed mb-10">
              We break standard UI patterns to create immersive digital experiences that resonate with the modern creator.
            </p>
            <div className="flex gap-10">
              <div className="text-white">
                <div className="text-4xl font-black mb-2">99.9%</div>
                <div className="text-[10px] font-black tracking-widest opacity-40">PRECISION</div>
              </div>
              <div className="text-white">
                <div className="text-4xl font-black mb-2">24/7</div>
                <div className="text-[10px] font-black tracking-widest opacity-40">INSPIRATION</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { id: 3, name: "KINETIC TYPE", price: "$890", img: "/watch.png", cat: "TYPOGRAPHY" },
            { id: 4, name: "UI MENU KIT", price: "$230", img: "/lamp.png", cat: "MENU" },
            { id: 5, name: "FLUID MOTION", price: "$150", img: "/scarf.png", cat: "TRANSITIONS" },
            { id: 6, name: "EDITORIAL TYPE", price: "$85", img: "/bowl.png", cat: "TYPOGRAPHY" },
          ].map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.id}`}>
                <div className="aspect-[3/4] glass rounded-3xl mb-8 relative overflow-hidden">
                  <Image 
                    src={product.img} 
                    alt={product.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product.name);
                    }}
                    className="absolute bottom-8 right-8 w-16 h-16 glass rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-white hover:text-black"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] font-black tracking-[0.4em] opacity-40 block mb-2 uppercase">{product.cat}</span>
                    <h3 className="text-2xl font-black tracking-tighter">{product.name}</h3>
                  </div>
                  <span className="text-xl font-light opacity-60">{product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-20 px-6 md:px-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-20">
          <div className="max-w-md">
            <h2 className="text-5xl font-black tracking-tighter mb-8 uppercase italic">Stay Inspired.</h2>
            <div className="flex border-b border-white/20 pb-4">
              <input type="text" placeholder="YOUR_EMAIL@XYZ.COM" className="bg-transparent flex-1 font-black text-xs tracking-widest focus:outline-none" />
              <button className="text-white hover:opacity-60 transition-opacity font-black text-[10px] tracking-widest">JOIN</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[10px] font-black tracking-[0.4em] opacity-40">
            <div className="flex flex-col gap-6">
              <span className="text-white opacity-100">SOCIAL</span>
              <Link href="#" className="hover:opacity-100">INSTAGRAM</Link>
              <Link href="#" className="hover:opacity-100">TWITTER</Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-white opacity-100">INFO</span>
              <Link href="#" className="hover:opacity-100">SHIPPING</Link>
              <Link href="#" className="hover:opacity-100">RETURNS</Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-[8px] font-black tracking-[0.5em] opacity-20">
          <span>MASTERPIECE // 2024</span>
          <span>CRAFTED FOR THE DISRUPTORS</span>
        </div>
      </footer>
    </main>
  );
}
