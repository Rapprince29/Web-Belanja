"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Filter, ChevronDown, ShoppingBag, CheckCircle } from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "AESTHETIC VASE", price: "$120", category: "DECOR", img: "/vase.png" },
  { id: 2, name: "MINIMALIST CHAIR", price: "$450", category: "FURNITURE", img: "/chair.png" },
  { id: 3, name: "LUXE TIMEPIECE", price: "$890", category: "ACCESSORIES", img: "/watch.png" },
  { id: 4, name: "MODERN LAMP", price: "$230", category: "LIGHTING", img: "/lamp.png" },
  { id: 5, name: "SILK SCARF", price: "$150", category: "FASHION", img: "/scarf.png" },
  { id: 6, name: "CERAMIC BOWL", price: "$85", category: "DECOR", img: "/bowl.png" },
];

export default function Catalog() {
  const [showToast, setShowToast] = useState(false);
  const [activeProduct, setActiveProduct] = useState("");

  const addToCart = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveProduct(name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-20 relative">
      
      {/* Toast Notification */}
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

      <header className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4">COLLECTIONS</h1>
        <p className="text-muted-foreground max-w-md">Browse our curated selection of high-end products designed for the modern lifestyle.</p>
      </header>

      <div className="flex flex-col md:row justify-between items-start md:items-center gap-6 mb-12 py-6 border-y border-white/5">
        <div className="flex gap-8 text-sm font-bold tracking-widest text-muted-foreground">
          <button className="text-white hover:text-accent transition-colors">ALL</button>
          <button className="hover:text-white transition-colors">DECOR</button>
          <button className="hover:text-white transition-colors">FURNITURE</button>
          <button className="hover:text-white transition-colors">ACCESSORIES</button>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-bold border border-white/10 px-4 py-2 rounded-full hover:border-accent transition-colors">
            <Filter size={16} /> FILTER
          </button>
          <button className="flex items-center gap-2 text-sm font-bold border border-white/10 px-4 py-2 rounded-full hover:border-accent transition-colors">
            SORT BY <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group cursor-pointer"
          >
            <div className="relative">
              <Link href={`/product/${product.id}`}>
                <div className="aspect-square glass rounded-3xl mb-6 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                    <Image 
                      src={product.img} 
                      alt={product.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </Link>
              
              {/* Add to Cart Quick Action */}
              <button 
                onClick={(e) => addToCart(e, product.name)}
                className="absolute top-6 right-6 p-4 glass rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-black"
                title="Add to Cart"
              >
                <ShoppingBag size={20} />
              </button>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] tracking-[0.3em] font-bold text-accent mb-1 uppercase">{product.category}</p>
                <h3 className="text-xl font-bold">{product.name}</h3>
              </div>
              <p className="text-lg font-medium text-muted-foreground">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
