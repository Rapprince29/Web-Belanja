"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { OrbitControls, Environment, ContactShadows, Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft, Heart, Share2, Star } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

const products = [
  { id: 1, name: "AESTHETIC VASE", price: "$120", category: "DECOR", description: "A sculptural masterpiece designed to elevate any floral arrangement with minimalist elegance." },
  { id: 2, name: "MINIMALIST CHAIR", price: "$450", category: "FURNITURE", description: "Sleek velvet comfort meeting mid-century modern design. A statement piece for your living space." },
  { id: 3, name: "LUXE TIMEPIECE", price: "$890", category: "ACCESSORIES", description: "Precision engineering meets timeless luxury. A companion for the most important moments." },
  { id: 4, name: "MODERN LAMP", price: "$230", category: "LIGHTING", description: "Soft, architectural lighting that transforms the mood of any room instantly." },
  { id: 5, name: "SILK SCARF", price: "$150", category: "FASHION", description: "Hand-finished silk with intricate patterns, draped in pure luxury and softness." },
  { id: 6, name: "CERAMIC BOWL", price: "$85", category: "DECOR", description: "Organic textures and handcrafted form, celebrating the beauty of imperfection." },
];

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = products.find(p => p.id === parseInt(params.id)) || products[0];
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // GSAP entry animation
    const ctx = gsap.context(() => {
      gsap.from(".product-title", { opacity: 0, y: 30, duration: 1, ease: "power4.out" });
      gsap.from(".product-price", { opacity: 0, x: -20, duration: 0.8, delay: 0.2, ease: "power2.out" });
      gsap.from(".product-desc", { opacity: 0, y: 20, duration: 1, delay: 0.4, ease: "power2.out" });
      gsap.from(".product-actions", { opacity: 0, y: 20, duration: 1, delay: 0.6, ease: "power2.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getGeometry = (id: number) => {
    switch(id) {
      case 1: return <cylinderGeometry args={[0.5, 0.8, 2, 32]} />; // Vase
      case 2: return <boxGeometry args={[1.2, 1.2, 1.2]} />; // Chair representation
      case 3: return <torusGeometry args={[0.8, 0.2, 16, 100]} />; // Watch
      case 4: return <coneGeometry args={[0.8, 1.5, 32]} />; // Lamp
      case 5: return <planeGeometry args={[1.5, 2]} />; // Scarf
      default: return <sphereGeometry args={[1, 32, 32]} />; // Bowl
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-background overflow-hidden relative">
      <div className="pt-32 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 h-full min-h-[calc(100vh-80px)]">
        
        {/* 3D Viewer Side */}
        <div className="relative glass rounded-[3rem] h-[50vh] lg:h-auto overflow-hidden group">
          <Link href="/catalog" className="absolute top-8 left-8 z-10 flex items-center gap-2 text-xs font-black tracking-[0.2em] hover:text-accent transition-all group-hover:-translate-x-2">
            <ChevronLeft size={20} /> BACK TO CATALOG
          </Link>
          
          <div className="absolute inset-0">
            <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 0, 4], fov: 40 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                  <mesh castShadow receiveShadow>
                    {getGeometry(product.id)}
                    <MeshDistortMaterial
                      color="#d4af37"
                      speed={2}
                      distort={0.3}
                      metalness={1}
                      roughness={0.1}
                    />
                  </mesh>
                </Float>
                <Environment preset="studio" />
              </Suspense>
              <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
              <OrbitControls autoRotate enableZoom={false} />
            </Canvas>
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className="flex flex-col justify-center pb-20">
          <div className="max-w-xl">
            <p className="text-accent font-black tracking-[0.5em] text-[10px] mb-4 uppercase">LIMITED EDITION | {product.category}</p>
            <h1 className="product-title text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">{product.name}</h1>
            
            <div className="product-price flex items-center gap-6 mb-8">
              <span className="text-4xl font-light text-white">{product.price}</span>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <div className="flex text-accent">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <span className="text-[10px] text-muted-foreground font-black tracking-widest">(4.9/5 RATING)</span>
              </div>
            </div>
            
            <p className="product-desc text-muted-foreground leading-relaxed text-lg mb-12">
              {product.description} Each piece is hand-finished in our atelier to ensure absolute perfection and unique character for the discerning collector.
            </p>

            <div className="product-actions space-y-8">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">VARIANT</span>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full border-2 border-accent bg-accent/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors">
                    <div className="w-3 h-3 rounded-full bg-white/40"></div>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-white text-black h-20 rounded-2xl font-black text-xs tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-accent transition-all hover:scale-[1.02] shadow-2xl shadow-white/5">
                  <ShoppingBag size={20} /> ADD TO CART
                </button>
                <button className="w-20 h-20 glass rounded-2xl flex items-center justify-center hover:text-accent transition-all hover:scale-[1.02]">
                  <Heart size={24} />
                </button>
                <button className="w-20 h-20 glass rounded-2xl flex items-center justify-center hover:text-accent transition-all hover:scale-[1.02]">
                  <Share2 size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
