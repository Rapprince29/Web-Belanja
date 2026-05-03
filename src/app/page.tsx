"use client";

import ThreeCanvas from "@/components/ThreeCanvas";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ShoppingBag, CheckCircle } from "lucide-react";
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
    <main className="relative min-h-screen bg-mesh overflow-hidden">
      
      {/* Global Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] glass px-8 py-4 rounded-2xl flex items-center gap-4 border border-accent/20"
          >
            <CheckCircle className="text-accent" />
            <span className="font-bold text-sm tracking-widest">{activeProduct} ADDED TO CART</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 md:px-20 hero-section">
        <ThreeCanvas />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-accent font-bold tracking-[0.5em] text-sm mb-4 block">PREMIUM COLLECTION 2024</span>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-6">
              THE ART OF <br />
              <span className="text-gradient italic">ELEGANCE</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              Experience the future of commerce with our immersive 3D shopping experience. Crafted for those who appreciate the finer things.
            </p>
            
            <div className="flex items-center gap-4">
              <Link href="/catalog" className="bg-accent text-accent-foreground px-10 py-5 rounded-full font-black text-xs tracking-[0.2em] flex items-center gap-2 hover:scale-105 hover:bg-white transition-all shadow-lg shadow-accent/20">
                START SHOPPING <ArrowRight size={18} />
              </Link>
              <button className="border border-white/10 hover:bg-white/5 px-10 py-5 rounded-full font-black text-xs tracking-[0.2em] transition-all">
                OUR STORY
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute right-20 bottom-20 hidden lg:flex flex-col gap-10 text-right z-10">
          {[
            { label: "CURATED ITEMS", value: "250+" },
            { label: "WORLDWIDE DELIVERY", value: "FREE" },
            { label: "CLIENT SATISFACTION", value: "100%" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            >
              <div className="text-accent font-black text-4xl mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-[10px] tracking-[0.3em] font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-40 px-6 md:px-20 bg-background relative z-10">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-5xl font-bold tracking-tighter mb-4">SELECTED PIECES</h2>
            <div className="h-1 w-24 bg-accent"></div>
          </div>
          <Link href="/catalog" className="text-accent font-black text-xs tracking-[0.3em] flex items-center gap-2 hover:gap-4 transition-all">
            VIEW ALL COLLECTIONS <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { id: 4, name: "MODERN LAMP", price: "$230", img: "/lamp.png" },
            { id: 5, name: "SILK SCARF", price: "$150", img: "/scarf.png" },
            { id: 6, name: "CERAMIC BOWL", price: "$85", img: "/bowl.png" },
          ].map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="aspect-[4/5] glass rounded-[2.5rem] mb-8 relative overflow-hidden flex items-center justify-center">
                <Image 
                  src={product.img} 
                  alt={product.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                />
                <button 
                  onClick={() => addToCart(product.name)}
                  className="absolute bottom-8 right-8 p-5 bg-white text-black rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent"
                >
                  <ShoppingBag size={24} />
                </button>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                  <p className="text-muted-foreground text-[10px] tracking-[0.3em] font-bold">LIMITED EDITION</p>
                </div>
                <div className="text-right">
                  <div className="text-accent font-bold text-xl">{product.price}</div>
                  <div className="flex items-center gap-1 text-xs mt-2 justify-end">
                    <Star size={12} fill="currentColor" className="text-accent" />
                    <span className="text-muted-foreground font-bold">5.0</span>
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
