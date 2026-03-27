"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ShieldModel } from "./ShieldModel";

export function GateScene({ progress }: { progress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 5]} intensity={0.8} />
        <ShieldModel progress={progress} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
