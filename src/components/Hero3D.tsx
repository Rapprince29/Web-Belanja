"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, MeshWobbleMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const geometries = useMemo(() => ({
    main: new THREE.IcosahedronGeometry(2, 2),
    wire: new THREE.IcosahedronGeometry(2.2, 2),
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (groupRef.current) {
        gsap.to(groupRef.current.position, {
          y: 5,
          z: -5,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
        gsap.to(groupRef.current.rotation, {
          x: Math.PI,
          z: Math.PI / 2,
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
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Solid Core with WebGL Distortion */}
      <mesh ref={meshRef} geometry={geometries.main} castShadow>
        <MeshDistortMaterial
          color="#ffffff"
          speed={3}
          distort={0.4}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Experimental Wireframe Overlay */}
      <mesh ref={wireRef} geometry={geometries.wire}>
        <meshStandardMaterial 
          wireframe 
          color="#ffffff" 
          transparent 
          opacity={0.1} 
        />
      </mesh>

      {/* Point Cloud Aura */}
      <Points positions={new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 6)}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

export default Hero3D;
