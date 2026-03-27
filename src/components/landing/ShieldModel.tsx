"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface ShieldModelProps {
  progress: number;
}

export function ShieldModel({ progress }: ShieldModelProps) {
  const barrierRef = useRef<THREE.Mesh>(null);
  const shieldGroupRef = useRef<THREE.Group>(null);
  const shieldMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const checkmarkRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const blueColor = new THREE.Color("#2563eb");
  const greenColor = new THREE.Color("#059669");

  useFrame((_, delta) => {
    timeRef.current += delta;

    // Shield glow and barrier animation based on progress
    if (progress <= 0.33) {
      // Phase 1: Shield glows, barrier stays horizontal
      const t = progress / 0.33;
      if (shieldMaterialRef.current) {
        shieldMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          0.2,
          0.6,
          t
        );
        shieldMaterialRef.current.emissive.copy(blueColor);
        shieldMaterialRef.current.color.copy(blueColor);
      }
      if (barrierRef.current) {
        barrierRef.current.rotation.z = 0;
      }
      if (checkmarkRef.current) {
        checkmarkRef.current.scale.setScalar(0);
      }
    } else if (progress <= 0.66) {
      // Phase 2: Shield pulses, checkmark fades in
      const t = (progress - 0.33) / 0.33;
      if (shieldMaterialRef.current) {
        const pulse =
          0.3 + 0.5 * (0.5 + 0.5 * Math.sin(timeRef.current * 4));
        shieldMaterialRef.current.emissiveIntensity = pulse;
        shieldMaterialRef.current.emissive.copy(blueColor);
        shieldMaterialRef.current.color.copy(blueColor);
      }
      if (checkmarkRef.current) {
        const scale = THREE.MathUtils.lerp(0, 1, t);
        checkmarkRef.current.scale.setScalar(scale);
      }
      if (barrierRef.current) {
        barrierRef.current.rotation.z = 0;
      }
    } else {
      // Phase 3: Barrier lifts, shield turns green
      const t = (progress - 0.66) / 0.34;
      if (barrierRef.current) {
        barrierRef.current.rotation.z = THREE.MathUtils.lerp(
          0,
          -Math.PI / 2,
          t
        );
      }
      if (shieldMaterialRef.current) {
        const lerpedColor = blueColor.clone().lerp(greenColor, t);
        shieldMaterialRef.current.color.copy(lerpedColor);
        shieldMaterialRef.current.emissive.copy(lerpedColor);
        shieldMaterialRef.current.emissiveIntensity = 0.6;
      }
      if (checkmarkRef.current) {
        checkmarkRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group>
      {/* Left gate post */}
      <mesh position={[-1.8, 0, 0]}>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Right gate post */}
      <mesh position={[1.8, 0, 0]}>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Crossbar */}
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[3.9, 0.2, 0.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Boom barrier - pivots from right post */}
      <group position={[1.65, 1.3, 0]}>
        <mesh ref={barrierRef} position={[-1.25, 0, 0]}>
          <boxGeometry args={[2.5, 0.08, 0.08]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>

      {/* Shield icon - circle + cone combined */}
      <group ref={shieldGroupRef} position={[0, 0.8, 0.3]}>
        {/* Shield body (circle) */}
        <mesh>
          <circleGeometry args={[0.5, 32, 0, Math.PI]} />
          <meshStandardMaterial
            ref={shieldMaterialRef}
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Shield top half */}
        <mesh>
          <circleGeometry args={[0.5, 32, Math.PI, Math.PI]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Shield bottom point (cone) */}
        <mesh position={[0, -0.55, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.5, 0.6, 32]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Checkmark */}
        <group ref={checkmarkRef} position={[0, 0.05, 0.05]}>
          <Line
            points={[
              [-0.2, 0, 0],
              [-0.05, -0.2, 0],
              [0.25, 0.2, 0],
            ]}
            color="white"
            lineWidth={3}
          />
        </group>
      </group>
    </group>
  );
}
