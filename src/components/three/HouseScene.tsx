"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function Windows() {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C8882A",
        emissive: "#C8882A",
        emissiveIntensity: 0.85,
        metalness: 0.2,
        roughness: 0.35,
      }),
    [],
  );
  return (
    <group>
      <mesh position={[-0.35, 0.15, 0.51]} material={mat}>
        <boxGeometry args={[0.22, 0.2, 0.05]} />
      </mesh>
      <mesh position={[0.35, 0.15, 0.51]} material={mat}>
        <boxGeometry args={[0.22, 0.2, 0.05]} />
      </mesh>
    </group>
  );
}

function HouseBody() {
  const wall = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1D6A47",
        metalness: 0.15,
        roughness: 0.55,
      }),
    [],
  );
  const roof = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0D3D24",
        metalness: 0.1,
        roughness: 0.45,
      }),
    [],
  );
  return (
    <group>
      <mesh position={[0, 0, 0]} material={wall} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.85, 1]} />
      </mesh>
      <mesh
        position={[0, 0.72, 0]}
        rotation={[0, 0, 0]}
        material={roof}
        castShadow
      >
        <coneGeometry args={[0.95, 0.55, 4]} />
      </mesh>
      <Windows />
    </group>
  );
}

function EnergyParticles({ count = 280 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      const gold = Math.random() > 0.45;
      colors[i * 3] = gold ? 0.78 : 0.45;
      colors[i * 3 + 1] = gold ? 0.53 : 0.85;
      colors[i * 3 + 2] = gold ? 0.16 : 0.55;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <float32BufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <float32BufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function RotatingHouse() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.35;
  });
  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <HouseBody />
      </Float>
      <EnergyParticles />
    </group>
  );
}

export function HouseScene() {
  return (
    <div className="h-[min(420px,55vh)] w-full min-h-[280px] md:h-[min(480px,70vh)]">
      <Canvas
        camera={{ position: [2.4, 1.2, 2.8], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <color attach="background" args={["#0D3D24"]} />
        <fog attach="fog" args={["#0D3D24", 4, 14]} />
        <ambientLight intensity={0.35} />
        <directionalLight
          castShadow
          position={[4, 6, 3]}
          intensity={1.1}
          color="#E8F5EE"
        />
        <pointLight position={[-2, 1.5, 2]} intensity={0.6} color="#C8882A" />
        <Suspense fallback={null}>
          <Stars radius={80} depth={40} count={1800} factor={3} saturation={0} />
          <RotatingHouse />
        </Suspense>
      </Canvas>
    </div>
  );
}
