"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

interface LaptopModelProps {
  scrollProgress: MotionValue<number>;
}

export function LaptopModel({ scrollProgress }: LaptopModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const keyboardKeys = useMemo(() => {
    const keys: { x: number; z: number }[] = [];
    const rows = 5;
    const cols = 12;
    const keySize = 0.18;
    const gap = 0.04;
    const startX = -((cols - 1) * (keySize + gap)) / 2;
    const startZ = -((rows - 1) * (keySize + gap)) / 2 - 0.15;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        keys.push({
          x: startX + col * (keySize + gap),
          z: startZ + row * (keySize + gap),
        });
      }
    }
    return keys;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const progress = scrollProgress.get();

    if (progress <= 0.3) {
      // Gentle auto-rotation
      groupRef.current.rotation.y += 0.15 * delta;
    } else if (progress <= 0.6) {
      // Lerp Y rotation to PI/4
      const t = (progress - 0.3) / 0.3;
      const target = Math.PI / 4;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        target,
        t * 0.05
      );
    } else {
      // Lerp scale and position
      const t = (progress - 0.6) / 0.4;
      const scale = THREE.MathUtils.lerp(1.0, 0.7, t);
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        2,
        t * 0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        1,
        t * 0.05
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Base deck */}
        <RoundedBox args={[3, 0.15, 2]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Screen lid - tilted back ~20deg */}
        <group position={[0, 1.0, -0.85]} rotation={[-0.35, 0, 0]}>
          <RoundedBox args={[2.8, 1.8, 0.08]} radius={0.03} smoothness={4}>
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.9}
              roughness={0.2}
            />
          </RoundedBox>

          {/* Screen display - slightly in front of lid */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[2.4, 1.4]} />
            <meshStandardMaterial
              color="#1e3a5f"
              emissive="#2563eb"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>

        {/* Keyboard keys */}
        {keyboardKeys.map((key, i) => (
          <mesh key={i} position={[key.x, 0.09, key.z]}>
            <boxGeometry args={[0.18, 0.03, 0.18]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        ))}

        {/* Trackpad */}
        <RoundedBox
          args={[0.8, 0.02, 0.5]}
          radius={0.01}
          smoothness={4}
          position={[0, 0.09, 0.55]}
        >
          <meshStandardMaterial color="#475569" />
        </RoundedBox>
      </group>
    </Float>
  );
}
