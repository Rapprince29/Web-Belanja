"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { OrbitControls, Environment, ContactShadows, Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft, Heart, Share2, Star } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

const products = [
  { id: 1, name: "ABSTRACT CANVAS", price: "$120", category: "ART & ILLUSTRATION", description: "A sculptural masterpiece designed to elevate any floral arrangement with minimalist elegance." },
  { id: 2, name: "GEOMETRIC 3D", price: "$450", category: "3D", description: "Sleek velvet comfort meeting mid-century modern design. A statement piece for your living space." },
  { id: 3, name: "KINETIC TYPE", price: "$890", category: "TYPOGRAPHY", description: "Precision engineering meets timeless luxury. A companion for the most important moments." },
  { id: 4, name: "UI MENU KIT", price: "$230", category: "MENU INSPIRATION", description: "Soft, architectural lighting that transforms the mood of any room instantly." },
  { id: 5, name: "FLUID MOTION", price: "$150", category: "TRANSITIONS", description: "Hand-finished silk with intricate patterns, draped in pure luxury and softness." },
  { id: 6, name: "EDITORIAL TYPE", price: "$85", category: "TYPOGRAPHY", description: "Organic textures and handcrafted form, celebrating the beauty of imperfection." },
];

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = products.find(p => p.id === parseInt(params.id)) || products[0];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", { opacity: 0, y: 30, duration: 1.2, stagger: 0.1, ease: "power3.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getGeometry = (id: number) => {
    switch(id) {
      case 1: return <cylinderGeometry args={[0.5, 0.8, 2, 32]} />;
      case 2: return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case 3: return <torusGeometry args={[0.8, 0.2, 16, 100]} />;
      case 4: return <coneGeometry args={[0.8, 1.5, 32]} />;
      case 5: return <planeGeometry args={[1.5, 2]} />;
      default: return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen pt-32 pb-20 px-8 md:px-20 bg-mesh overflow-hidden">
      <Link href="/catalog" className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity mb-16 uppercase italic">
        <ChevronLeft size={16} /> BACK_TO_ARCHIVE
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* 3D Visual Block */}
        <div className="fade-in glass rounded-[3rem] h-[600px] relative overflow-hidden group">
          <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 0, 4], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh castShadow receiveShadow>
                  {getGeometry(product.id)}
                  <MeshDistortMaterial
                    color="#ffffff"
                    speed={2}
                    distort={0.2}
                    metalness={1}
                    roughness={0.05}
                  />
                </mesh>
              </Float>
              <Environment preset="studio" />
            </Suspense>
            <ContactShadows position={[0, -1.2, 0]} opacity={0.3} scale={8} blur={2.5} far={4} />
            <OrbitControls autoRotate enableZoom={false} />
          </Canvas>
          <div className="absolute top-8 right-8 text-[8px] font-black tracking-[0.5em] opacity-20 uppercase italic">OBJECT_RENDER_V1.0</div>
        </div>

        {/* Content Block */}
        <div className="flex flex-col justify-center">
          <span className="fade-in text-white/40 font-black tracking-[0.6em] text-[10px] mb-6 uppercase italic">{product.category}</span>
          <h1 className="fade-in text-6xl lg:text-9xl font-black tracking-tighter mb-10 uppercase leading-none text-gradient">{product.name}</h1>
          
          <div className="fade-in flex items-center gap-10 mb-12">
            <span className="text-5xl font-light opacity-60 italic">{product.price}</span>
            <div className="flex text-white/20">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
            </div>
          </div>
          
          <p className="fade-in text-xl font-light leading-relaxed mb-16 opacity-60 max-w-md">
            {product.description} Crafted with obsessive attention to detail for the modern digital landscape.
          </p>

          <div className="fade-in flex flex-col sm:flex-row gap-6">
            <button className="flex-1 px-12 py-6 bg-white text-black rounded-full font-black text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white/90 transition-all">
              <ShoppingBag size={18} /> ADD TO COLLECTION
            </button>
            <div className="flex gap-4">
              <button className="w-20 h-20 glass rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                <Heart size={20} className="opacity-40" />
              </button>
              <button className="w-20 h-20 glass rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                <Share2 size={20} className="opacity-40" />
              </button>
            </div>
          </div>

          <div className="fade-in mt-20 pt-10 border-t border-white/5 grid grid-cols-2 gap-10 text-[8px] font-black tracking-[0.5em] opacity-20">
            <div className="flex flex-col gap-2">
              <span>FORMAT</span>
              <span className="text-white opacity-100">OBJ / GLB / FBX</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>LICENSE</span>
              <span className="text-white opacity-100">COMMERCIAL USE</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
