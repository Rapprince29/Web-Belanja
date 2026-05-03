"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Filter, ChevronDown, ShoppingBag, CheckCircle } from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "ABSTRACT CANVAS", price: "$120", category: "ART & ILLUSTRATION", img: "/vase.png" },
  { id: 2, name: "GEOMETRIC 3D", price: "$450", category: "3D", img: "/chair.png" },
  { id: 3, name: "KINETIC TYPE", price: "$890", category: "TYPOGRAPHY", img: "/watch.png" },
  { id: 4, name: "UI MENU KIT", price: "$230", category: "MENU INSPIRATION", img: "/lamp.png" },
  { id: 5, name: "FLUID MOTION", price: "$150", category: "TRANSITIONS", img: "/scarf.png" },
  { id: 6, name: "EDITORIAL TYPE", price: "$85", category: "TYPOGRAPHY", img: "/bowl.png" },
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
    <main className="min-h-screen pt-32 pb-20 px-8 md:px-20 bg-mesh">
      
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] glass px-8 py-4 rounded-full flex items-center gap-4 border border-white/10"
          >
            <CheckCircle className="text-white" size={20} />
            <span className="font-bold text-xs tracking-widest uppercase">{activeProduct} ADDED</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-24">
        <span className="text-white/20 font-black tracking-[0.6em] text-[10px] mb-4 block uppercase italic">ARCHIVE_COLLECTIONS</span>
        <h1 className="text-7xl lg:text-9xl font-black tracking-tighter uppercase italic leading-none mb-12">Collections</h1>
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
          <p className="text-xl font-light max-w-xl opacity-60">
            A curated selection of digital assets and artistic pieces, optimized for visual impact and performance.
          </p>
          <div className="flex-1 flex justify-end gap-6 text-[10px] font-black tracking-widest">
            <button className="flex items-center gap-3 border border-white/10 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all">
              FILTER <Filter size={14} />
            </button>
            <button className="flex items-center gap-3 border border-white/10 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all">
              SORT <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-8 mb-20 text-[10px] font-black tracking-[0.3em] opacity-40">
        {["ALL", "ART & ILLUSTRATION", "TYPOGRAPHY", "3D", "MENU INSPIRATION", "TRANSITIONS"].map((cat) => (
          <button key={cat} className="hover:opacity-100 hover:text-white transition-opacity">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.8 }}
          >
            <Link href={`/product/${product.id}`} className="group">
              <div className="aspect-square glass rounded-3xl mb-8 relative overflow-hidden">
                <Image 
                  src={product.img} 
                  alt={product.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                />
                <button 
                  onClick={(e) => addToCart(e, product.name)}
                  className="absolute bottom-6 right-6 w-14 h-14 glass rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-white hover:text-black"
                >
                  <ShoppingBag size={18} />
                </button>
              </div>
              <div className="flex justify-between items-end px-2">
                <div>
                  <span className="text-[9px] font-black tracking-[0.4em] opacity-30 block mb-2 uppercase italic">{product.category}</span>
                  <h3 className="text-3xl font-black tracking-tighter">{product.name}</h3>
                </div>
                <span className="text-2xl font-light opacity-60">{product.price}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
