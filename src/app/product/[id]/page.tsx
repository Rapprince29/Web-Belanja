"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Environment, ContactShadows, Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft, Heart, Share2 } from "lucide-react";
import Link from "next/link";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
      <div className="pt-32 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 h-full min-h-[calc(100vh-80px)]">
        {/* 3D Viewer Side */}
        <div className="relative glass rounded-[3rem] h-[50vh] lg:h-auto overflow-hidden">
          <Link href="/catalog" className="absolute top-8 left-8 z-10 flex items-center gap-2 text-sm font-bold tracking-widest hover:text-accent transition-colors">
            <ChevronLeft size={20} /> BACK TO CATALOG
          </Link>
          
          <div className="absolute inset-0">
            <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 4], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <Suspense fallback={null}>
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                  <mesh castShadow receiveShadow>
                    <octahedronGeometry args={[1, 0]} />
                    <MeshDistortMaterial
                      color="#d4af37"
                      speed={2}
                      distort={0.4}
                      radius={1}
                      metalness={0.9}
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
        <div className="flex flex-col justify-center pb-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent font-black tracking-[0.5em] text-xs mb-4">LIMITED EDITION</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">AESTHETIC PIECE {params.id}</h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-light text-muted-foreground">$299.00</span>
              <div className="h-6 w-px bg-white/10"></div>
              <div className="flex text-accent">
                {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                <span className="ml-2 text-xs text-muted-foreground font-bold">(42 REVIEWS)</span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              A masterpiece of modern design, blending sculptural form with high-performance materials. Each piece is hand-finished to ensure absolute perfection.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-accent bg-accent/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-accent"></div>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/40"></div>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-white text-black h-16 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-accent transition-colors">
                  <ShoppingBag size={20} /> ADD TO CART
                </button>
                <button className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:text-accent transition-colors">
                  <Heart size={20} />
                </button>
                <button className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:text-accent transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
