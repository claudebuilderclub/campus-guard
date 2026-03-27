"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ShieldModel } from "./ShieldModel";

export function GateScene({ progress }: { progress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 6], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 5]} intensity={1.5} />
        <directionalLight position={[-2, 3, 2]} intensity={0.5} color="#a5b4fc" />
        <ShieldModel progress={progress} />
      </Suspense>
    </Canvas>
  );
}
