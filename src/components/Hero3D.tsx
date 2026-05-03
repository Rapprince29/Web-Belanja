"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Memoize geometries for performance
  const geometries = useMemo(() => ({
    core: new THREE.IcosahedronGeometry(1.2, 0),
    ring1: new THREE.TorusGeometry(2, 0.02, 16, 100),
    ring2: new THREE.TorusGeometry(2.4, 0.01, 16, 100),
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (coreRef.current && ring1Ref.current && ring2Ref.current) {
        // Complex exploded/expanded view on scroll
        gsap.to(ring1Ref.current.scale, {
          x: 2, y: 2, z: 2,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
        gsap.to(ring2Ref.current.rotation, {
          x: Math.PI * 2,
          z: Math.PI,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
        gsap.to(coreRef.current.position, {
          y: 3,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.01;
    if (ring2Ref.current) ring2Ref.current.rotation.y -= 0.01;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Luxury Core */}
        <mesh ref={coreRef} geometry={geometries.core} castShadow>
          <MeshDistortMaterial 
            color="#d4af37" 
            speed={2} 
            distort={0.4} 
            metalness={1} 
            roughness={0.1} 
            emissive="#d4af37"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Cinematic Rings */}
        <mesh ref={ring1Ref} geometry={geometries.ring1} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} transparent opacity={0.3} />
        </mesh>

        <mesh ref={ring2Ref} geometry={geometries.ring2} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
};

export default Hero3D;
