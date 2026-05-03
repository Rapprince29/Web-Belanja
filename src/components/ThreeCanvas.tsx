"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, Environment, ContactShadows, Preload, AdaptiveEvents, AdaptiveDpr } from "@react-three/drei";
import Hero3D from "./Hero3D";

const ThreeCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas 
        dpr={[1, 1.5]} // Limit DPR for performance
        shadows 
        gl={{ antialias: false, powerPreference: "high-performance" }} // Faster rendering
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <Hero3D />
          <Environment preset="city" />
        </Suspense>

        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.3} 
          scale={8} 
          blur={3} 
          far={4} 
          resolution={256} // Lower resolution shadows for perf
        />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
