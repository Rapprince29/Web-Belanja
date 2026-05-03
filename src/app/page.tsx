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
            <span className="font-black text-xl uppercase tracking-tighter">{activeProduct} ADDED!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section: Experimental Bento Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] border-b-4 border-black">
        
        {/* Left Column: Text */}
        <div className="lg:col-span-7 p-10 lg:p-20 border-r-4 border-black flex flex-col justify-center bg-white">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <div className="bg-secondary border-4 border-black px-4 py-2 inline-block mb-8 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              EXPERIMENTAL SHOPPING 2024
            </div>
            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-10 uppercase">
              REDEFINING <br />
              <span className="bg-yellow px-4 border-4 border-black">LUXURY</span>
            </h1>
            <p className="text-2xl font-bold max-w-xl mb-12 leading-tight">
              A Neo-Brutalist approach to digital commerce. Bold, raw, and absolutely immersive.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/catalog" className="brutal-btn bg-accent text-white text-2xl flex items-center gap-3">
                EXPLORE NOW <ArrowRight size={32} strokeWidth={3} />
              </Link>
              <button className="brutal-btn bg-white text-black text-2xl border-4 border-black">
                OUR STORY
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D Scene */}
        <div className="lg:col-span-5 relative bg-muted flex items-center justify-center p-10">
          <div className="w-full h-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 font-black text-xs">LIVE_3D_RENDER.EXE</div>
            <ThreeCanvas />
          </div>
        </div>
      </section>

      {/* Experimental Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-4 border-black">
        {[
          { label: "MINIMALIST", color: "bg-white", text: "Pure space." },
          { label: "BRUTAL", color: "bg-yellow", text: "Bold borders." },
          { label: "EXPERIMENTAL", color: "bg-secondary", text: "Break rules." },
          { label: "3D MOTION", color: "bg-accent", text: "Fluid art." },
        ].map((item, i) => (
          <div key={i} className={`${item.color} p-10 border-r-4 last:border-r-0 border-black group cursor-help transition-all hover:bg-black hover:text-white`}>
            <h3 className="text-4xl font-black mb-4 tracking-tighter italic">{item.label}</h3>
            <p className="font-bold text-lg opacity-60 group-hover:opacity-100">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Featured Products: Brutalist Grid */}
      <section className="p-10 lg:p-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div>
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase italic">Featured Pieces</h2>
            <div className="h-4 w-64 bg-accent border-4 border-black -mt-4 ml-4"></div>
          </div>
          <Link href="/catalog" className="brutal-btn bg-secondary text-black">
            VIEW ALL COLLECTIONS
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { id: 4, name: "MODERN LAMP", price: "$230", img: "/lamp.png", color: "bg-yellow" },
            { id: 5, name: "SILK SCARF", price: "$150", img: "/scarf.png", color: "bg-secondary" },
            { id: 6, name: "CERAMIC BOWL", price: "$85", img: "/bowl.png", color: "bg-accent" },
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
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-black text-xs italic">
                    {product.id}.COLLECTION
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-4xl font-black mb-2 tracking-tighter">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <Star size={16} fill="black" />
                      <span className="font-black text-sm uppercase">TOP RATED</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-black underline decoration-yellow decoration-8 underline-offset-4">{product.price}</div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.name);
                      }}
                      className="bg-black text-white p-4 hover:bg-yellow hover:text-black transition-colors"
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

      {/* Brutalist Footer */}
      <footer className="bg-black text-white p-10 lg:p-20 border-t-8 border-yellow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-20">
          <div className="lg:col-span-6">
            <h2 className="text-6xl lg:text-9xl font-black tracking-tighter leading-none mb-10 text-stroke">STAY BOLD.</h2>
            <p className="text-2xl font-bold max-w-md mb-10 text-yellow">Join the neo-belanja circle for exclusive drops and experimental releases.</p>
            <div className="flex border-4 border-white">
              <input type="text" placeholder="YOUR_EMAIL@XYZ.COM" className="bg-transparent p-6 flex-1 font-black uppercase focus:outline-none" />
              <button className="bg-white text-black px-10 font-black uppercase text-xl hover:bg-yellow transition-colors">JOIN</button>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-10">
            <div>
              <h4 className="font-black text-yellow text-xl mb-8 uppercase tracking-widest italic">Navigation</h4>
              <ul className="flex flex-col gap-4 font-black text-4xl tracking-tighter">
                <li><Link href="/catalog" className="hover:line-through">SHOP</Link></li>
                <li><Link href="#" className="hover:line-through">ABOUT</Link></li>
                <li><Link href="#" className="hover:line-through">STORY</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-secondary text-xl mb-8 uppercase tracking-widest italic">Social</h4>
              <ul className="flex flex-col gap-4 font-black text-4xl tracking-tighter">
                <li><Link href="#" className="hover:line-through">IG</Link></li>
                <li><Link href="#" className="hover:line-through">TW</Link></li>
                <li><Link href="#" className="hover:line-through">FB</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:row justify-between items-center pt-10 border-t-2 border-white/20 font-black text-xs tracking-[0.5em] text-white/40">
          <div>NEO BELANJA // 2024 © ALL RIGHTS RESERVED</div>
          <div className="flex gap-10 mt-6 md:mt-0">
            <Link href="#">PRIVACY_POL</Link>
            <Link href="#">TERMS_SERV</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
