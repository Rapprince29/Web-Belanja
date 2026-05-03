"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Filter, ChevronDown, ShoppingBag, Zap } from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "AESTHETIC VASE", price: "$120", category: "DECOR", img: "/vase.png", color: "bg-yellow" },
  { id: 2, name: "MINIMALIST CHAIR", price: "$450", category: "FURNITURE", img: "/chair.png", color: "bg-secondary" },
  { id: 3, name: "LUXE TIMEPIECE", price: "$890", category: "ACCESSORIES", img: "/watch.png", color: "bg-accent" },
  { id: 4, name: "MODERN LAMP", price: "$230", category: "LIGHTING", img: "/lamp.png", color: "bg-yellow" },
  { id: 5, name: "SILK SCARF", price: "$150", category: "FASHION", img: "/scarf.png", color: "bg-secondary" },
  { id: 6, name: "CERAMIC BOWL", price: "$85", category: "DECOR", img: "/bowl.png", color: "bg-accent" },
];

export default function Catalog() {
  const [showToast, setShowToast] = useState(false);
  const [activeProduct, setActiveProduct] = useState("");

  const addToCart = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveProduct(name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-20 bg-dot">
      
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-24 right-6 z-[100] bg-black text-white border-4 border-yellow p-6 shadow-[8px_8px_0px_0px_rgba(255,255,0,1)] font-black uppercase flex items-center gap-4"
          >
            <Zap size={24} className="text-yellow" />
            <span>{activeProduct} SAVED!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-20">
        <h1 className="text-7xl lg:text-9xl font-black tracking-tighter uppercase italic mb-6">Collections</h1>
        <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
          <p className="text-2xl font-bold max-w-xl leading-tight">
            Experimental silhouettes and brutalist forms. Curated for the modern disruptor.
          </p>
          <div className="flex-1 flex justify-end gap-4">
            <div className="bg-white border-4 border-black px-6 py-4 font-black flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              FILTER <Filter size={20} />
            </div>
            <div className="bg-white border-4 border-black px-6 py-4 font-black flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              SORT <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="brutal-card group flex flex-col h-full bg-white">
              <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
                <div className={`aspect-square border-b-4 border-black relative overflow-hidden ${product.color}`}>
                  <Image 
                    src={product.img} 
                    alt={product.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 font-black text-xs">
                    MODEL_ID: {product.id}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black tracking-[0.3em] text-accent uppercase block mb-2">{product.category}</span>
                    <h3 className="text-4xl font-black tracking-tighter mb-6">{product.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-black bg-yellow px-2 border-2 border-black">{product.price}</div>
                    <button 
                      onClick={(e) => addToCart(e, product.name)}
                      className="bg-black text-white p-4 hover:bg-accent transition-colors"
                    >
                      <ShoppingBag size={28} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
