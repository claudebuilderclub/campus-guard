"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import { LaptopModel } from "./LaptopModel";
import { ParticleField } from "./ParticleField";

export function HeroScene({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <LaptopModel scrollProgress={scrollProgress} />
        <ParticleField />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
