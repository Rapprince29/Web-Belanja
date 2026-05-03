"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const part1Ref = useRef<THREE.Mesh>(null);
  const part2Ref = useRef<THREE.Mesh>(null);
  const part3Ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (groupRef.current && part1Ref.current && part2Ref.current && part3Ref.current) {
      // Exploded view animation on scroll
      gsap.to(part1Ref.current.position, {
        y: 2,
        x: -1,
        z: 1,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
      gsap.to(part2Ref.current.position, {
        y: -2,
        x: 1,
        z: -1,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
      gsap.to(part3Ref.current.rotation, {
        y: Math.PI * 2,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Core Part */}
        <mesh ref={part3Ref} castShadow>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color="#d4af37" speed={2} distort={0.3} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Floating Parts that explode */}
        <mesh ref={part1Ref} position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} transparent opacity={0.8} />
        </mesh>

        <mesh ref={part2Ref} position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
};

export default Hero3D;
