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
  const part1Ref = useRef<THREE.Mesh>(null);
  const part2Ref = useRef<THREE.Mesh>(null);
  const part3Ref = useRef<THREE.Mesh>(null);

  // Memoize geometries and materials for performance
  const geometries = useMemo(() => ({
    core: new THREE.OctahedronGeometry(1, 0),
    part1: new THREE.BoxGeometry(0.8, 0.05, 0.8),
    part2: new THREE.BoxGeometry(1.2, 0.05, 1.2),
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (part1Ref.current && part2Ref.current && part3Ref.current) {
        gsap.to(part1Ref.current.position, {
          y: 2,
          x: -1,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: 0.5, // Smoother scrub
          }
        });
        gsap.to(part2Ref.current.position, {
          y: -2,
          x: 1,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          }
        });
        gsap.to(part3Ref.current.rotation, {
          y: Math.PI,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003; // Throttled rotation speed
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={part3Ref} geometry={geometries.core} castShadow>
          <MeshDistortMaterial color="#d4af37" speed={1.5} distort={0.2} metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh ref={part1Ref} position={[0, 0.6, 0]} geometry={geometries.part1} castShadow>
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} transparent opacity={0.6} />
        </mesh>

        <mesh ref={part2Ref} position={[0, -0.6, 0]} geometry={geometries.part2} castShadow>
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

export default Hero3D;
