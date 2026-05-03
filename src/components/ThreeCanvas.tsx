"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, Environment, ContactShadows, Preload, AdaptiveEvents, AdaptiveDpr } from "@react-three/drei";
import Hero3D from "./Hero3D";

const ThreeCanvas = () => {
  return (
    <div className="absolute top-0 right-0 w-full lg:w-3/4 h-screen z-0 pointer-events-none overflow-visible">
      <Canvas 
        dpr={[1, 1.5]} 
        shadows 
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 40 }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        
        <Suspense fallback={null}>
          <Hero3D />
          <Environment preset="studio" />
        </Suspense>

        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={15} 
          blur={2.5} 
          far={5} 
          resolution={256}
        />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
