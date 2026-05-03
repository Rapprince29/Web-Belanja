"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

const Hero3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2, 1]} />
        <MeshDistortMaterial
          color="#d4af37"
          speed={3}
          distort={0.2}
          radius={1}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      
      {/* Decorative elements */}
      <mesh position={[2, 1, -1]} scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshWobbleMaterial color="#1e3a8a" speed={2} factor={0.5} metalness={0.9} />
      </mesh>
    </Float>
  );
};

export default Hero3D;
