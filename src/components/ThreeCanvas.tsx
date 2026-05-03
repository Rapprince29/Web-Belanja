"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, Environment, ContactShadows, Preload, AdaptiveEvents, AdaptiveDpr, Float } from "@react-three/drei";
import Hero3D from "./Hero3D";
import BackgroundParticles from "./BackgroundParticles";

const ThreeCanvas = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
        
        <Suspense fallback={null}>
          <BackgroundParticles />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Hero3D />
          </Float>
          <Environment preset="night" />
        </Suspense>

        <ContactShadows 
          position={[0, -3, 0]} 
          opacity={0.2} 
          scale={20} 
          blur={3} 
          far={10} 
          resolution={256}
        />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
