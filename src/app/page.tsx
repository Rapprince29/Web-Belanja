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
    <main className="min-h-screen pt-20 bg-dot relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-10 right-10 z-[100] bg-yellow border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4"
          >
            <Zap size={32} fill="black" />
            <span className="font-black text-xl uppercase tracking-tighter">{activeProduct} SAVED!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] border-b-4 border-black">
        <div className="lg:col-span-7 p-10 lg:p-20 border-r-4 border-black flex flex-col justify-center bg-white">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <div className="bg-secondary border-4 border-black px-4 py-2 inline-block mb-8 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              CREATIVE ASSETS // 2024
            </div>
            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-10 uppercase">
              ART & <br />
              <span className="bg-yellow px-4 border-4 border-black italic">ILLUSTRATION</span>
            </h1>
            <p className="text-2xl font-bold max-w-xl mb-12 leading-tight">
              A premium marketplace for Typography, 3D assets, and Motion Inspiration.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/catalog" className="brutal-btn bg-accent text-white text-2xl flex items-center gap-3">
                BROWSE COLLECTIONS <ArrowRight size={32} strokeWidth={3} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative bg-muted flex items-center justify-center p-10">
          <div className="w-full h-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 font-black text-xs italic uppercase">3D_ELEMENTS.COLLECTION</div>
            <ThreeCanvas />
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-b-4 border-black bg-white">
        {[
          { label: "TYPOGRAPHY", color: "hover:bg-yellow" },
          { label: "3D", color: "hover:bg-secondary" },
          { label: "MENU INSPIRATION", color: "hover:bg-accent" },
          { label: "TRANSITIONS", color: "hover:bg-yellow" },
          { label: "ART & ILLUS", color: "hover:bg-secondary" },
        ].map((item, i) => (
          <Link key={i} href="/catalog" className={`${item.color} p-8 border-r-4 last:border-r-0 border-black transition-all group`}>
            <h3 className="text-2xl font-black mb-4 tracking-tighter group-hover:italic">{item.label}</h3>
            <div className="text-[10px] font-black opacity-40 group-hover:opacity-100">EXPLORE_COLLECTION.0{i+1}</div>
          </Link>
        ))}
      </section>

      {/* Featured Pieces */}
      <section className="p-10 lg:p-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div>
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase italic">Top Assets</h2>
            <div className="h-4 w-64 bg-accent border-4 border-black -mt-4 ml-4"></div>
          </div>
          <Link href="/catalog" className="brutal-btn bg-white text-black">
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { id: 3, name: "KINETIC TYPE", price: "$890", img: "/watch.png", color: "bg-accent", cat: "TYPOGRAPHY" },
            { id: 4, name: "UI MENU KIT", price: "$230", img: "/lamp.png", color: "bg-yellow", cat: "MENU" },
            { id: 5, name: "FLUID MOTION", price: "$150", img: "/scarf.png", color: "bg-secondary", cat: "TRANSITIONS" },
          ].map((product, i) => (
            <motion.div 
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="brutal-card group flex flex-col"
            >
              <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
                <div className={`aspect-square border-b-4 border-black relative overflow-hidden ${product.color}`}>
                  <Image 
                    src={product.img} 
                    alt={product.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-black text-[10px] italic">
                    {product.cat}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-4xl font-black mb-2 tracking-tighter">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <Star size={16} fill="black" />
                      <span className="font-black text-[10px] uppercase">PREMIUM_ASSET</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-black underline decoration-yellow decoration-8 underline-offset-4">{product.price}</div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.name);
                      }}
                      className="bg-black text-white p-4 hover:bg-yellow hover:text-black transition-colors z-20"
                    >
                      <ShoppingBag size={28} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
