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
  const shieldMeshRef = useRef<THREE.Mesh>(null);
  const shieldConeRef = useRef<THREE.Mesh>(null);
  const checkmarkRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const blueColor = new THREE.Color("#2563eb");
  const greenColor = new THREE.Color("#059669");

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (progress <= 0.33) {
      const t = progress / 0.33;
      const color = blueColor.clone();
      if (shieldMeshRef.current) {
        (shieldMeshRef.current.material as THREE.MeshBasicMaterial).color.copy(color);
        (shieldMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 + t * 0.3;
      }
      if (shieldConeRef.current) {
        (shieldConeRef.current.material as THREE.MeshBasicMaterial).color.copy(color);
      }
      if (barrierRef.current) barrierRef.current.rotation.z = 0;
      if (checkmarkRef.current) checkmarkRef.current.scale.setScalar(0);
    } else if (progress <= 0.66) {
      const t = (progress - 0.33) / 0.33;
      const pulse = 0.7 + 0.3 * Math.sin(timeRef.current * 4);
      if (shieldMeshRef.current) {
        (shieldMeshRef.current.material as THREE.MeshBasicMaterial).color.copy(blueColor);
        (shieldMeshRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
      if (checkmarkRef.current) checkmarkRef.current.scale.setScalar(t);
      if (barrierRef.current) barrierRef.current.rotation.z = 0;
    } else {
      const t = (progress - 0.66) / 0.34;
      if (barrierRef.current) {
        barrierRef.current.rotation.z = THREE.MathUtils.lerp(0, -Math.PI / 2, t);
      }
      const lerpedColor = blueColor.clone().lerp(greenColor, t);
      if (shieldMeshRef.current) {
        (shieldMeshRef.current.material as THREE.MeshBasicMaterial).color.copy(lerpedColor);
        (shieldMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 1;
      }
      if (shieldConeRef.current) {
        (shieldConeRef.current.material as THREE.MeshBasicMaterial).color.copy(lerpedColor);
      }
      if (checkmarkRef.current) checkmarkRef.current.scale.setScalar(1);
    }
  });

  return (
    <group>
      {/* Left gate post */}
      <mesh position={[-1.8, 0, 0]}>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshPhongMaterial color="#334155" shininess={60} />
      </mesh>

      {/* Right gate post */}
      <mesh position={[1.8, 0, 0]}>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshPhongMaterial color="#334155" shininess={60} />
      </mesh>

      {/* Crossbar */}
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[3.9, 0.2, 0.2]} />
        <meshPhongMaterial color="#475569" shininess={40} />
      </mesh>

      {/* Boom barrier - pivots from right post */}
      <group position={[1.65, 1.3, 0]}>
        <mesh ref={barrierRef} position={[-1.25, 0, 0]}>
          <boxGeometry args={[2.5, 0.1, 0.1]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Shield icon */}
      <group position={[0, 0.6, 0.3]}>
        {/* Shield body (circle) */}
        <mesh ref={shieldMeshRef}>
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        {/* Shield bottom point */}
        <mesh ref={shieldConeRef} position={[0, -0.55, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.7} />
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
