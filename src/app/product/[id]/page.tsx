"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { OrbitControls, Environment, ContactShadows, Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft, Heart, Share2, Star, Zap } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

const products = [
  { id: 1, name: "AESTHETIC VASE", price: "$120", category: "DECOR", description: "A sculptural masterpiece designed to elevate any floral arrangement with minimalist elegance.", color: "bg-yellow" },
  { id: 2, name: "MINIMALIST CHAIR", price: "$450", category: "FURNITURE", description: "Sleek velvet comfort meeting mid-century modern design. A statement piece for your living space.", color: "bg-secondary" },
  { id: 3, name: "LUXE TIMEPIECE", price: "$890", category: "ACCESSORIES", description: "Precision engineering meets timeless luxury. A companion for the most important moments.", color: "bg-accent" },
  { id: 4, name: "MODERN LAMP", price: "$230", category: "LIGHTING", description: "Soft, architectural lighting that transforms the mood of any room instantly.", color: "bg-yellow" },
  { id: 5, name: "SILK SCARF", price: "$150", category: "FASHION", description: "Hand-finished silk with intricate patterns, draped in pure luxury and softness.", color: "bg-secondary" },
  { id: 6, name: "CERAMIC BOWL", price: "$85", category: "DECOR", description: "Organic textures and handcrafted form, celebrating the beauty of imperfection.", color: "bg-accent" },
];

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = products.find(p => p.id === parseInt(params.id)) || products[0];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brutal-box", { scale: 0, rotation: -10, duration: 1, ease: "back.out(1.7)" });
      gsap.from(".brutal-text", { x: 100, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" });
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
    <main ref={containerRef} className="min-h-screen pt-32 pb-20 px-6 md:px-20 bg-dot overflow-hidden">
      <Link href="/catalog" className="brutal-btn bg-white mb-10 inline-flex items-center gap-2">
        <ChevronLeft size={24} /> RETURN_TO_COLLECTIONS
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* 3D Visual Block */}
        <div className="lg:col-span-7 brutal-box border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] bg-white h-[600px] relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 font-black text-xs uppercase italic">Object_View: {product.name}</div>
          <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 0, 4], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh castShadow receiveShadow>
                  {getGeometry(product.id)}
                  <MeshDistortMaterial
                    color={product.id % 2 === 0 ? "#00ffff" : "#ffff00"}
                    speed={2}
                    distort={0.4}
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
          <div className={`absolute bottom-0 right-0 w-32 h-32 ${product.color} border-t-4 border-l-4 border-black`}></div>
        </div>

        {/* Content Block */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="bg-black text-white p-10 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,255,255,1)]">
            <p className="brutal-text text-secondary font-black tracking-[0.3em] text-xs mb-4 uppercase italic">Premium Release // {product.category}</p>
            <h1 className="brutal-text text-6xl lg:text-8xl font-black tracking-tighter mb-8 uppercase leading-none">{product.name}</h1>
            
            <div className="brutal-text flex items-center gap-6 mb-10">
              <span className="text-5xl font-black text-yellow italic">{product.price}</span>
              <div className="flex text-yellow">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="currentColor" />)}
              </div>
            </div>
            
            <p className="brutal-text text-lg font-bold leading-tight mb-12 opacity-80">
              {product.description} A bold statement in neo-brutalist craftsmanship.
            </p>

            <div className="brutal-text flex gap-4">
              <button className="flex-1 brutal-btn bg-yellow text-black text-xl flex items-center justify-center gap-4 hover:bg-secondary">
                <ShoppingBag size={24} strokeWidth={3} /> ADD_TO_CART
              </button>
              <button className="brutal-btn bg-white text-black hover:bg-accent">
                <Heart size={24} strokeWidth={3} />
              </button>
            </div>
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="brutal-card p-6 bg-secondary font-black text-xs uppercase tracking-widest italic">Authentic Design</div>
            <div className="brutal-card p-6 bg-accent font-black text-xs uppercase tracking-widest italic">Limited Supply</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
