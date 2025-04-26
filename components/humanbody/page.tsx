"use client";
import { Vector3 } from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Group } from "three";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";


interface HotspotProps {
    position: Vector3 | [number, number, number];
    label: string;
    muscleId: number;
    attachTo?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    isActive?: boolean;
}

function Hotspot({ position, label, muscleId, onClick, isActive }: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/exercises/${muscleId}`);
  };

  return (
    <Html position={position} zIndexRange={[10, 0]}>
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group
          relative
          flex
          items-center
          gap-2
          cursor-pointer 
          ${isActive ? 'z-50' : 'z-10'}
        `}
      >
        {/* Punct de ancorare */}
        <div className={`
          w-3 
          h-3 
          rounded-full
          ${isActive || isHovered 
            ? 'bg-blue-500 scale-150' 
            : 'bg-white border-2 border-gray-300'}
          transition-all
          duration-200
        `} />
        
        {/* Etichetă */}
        <div className={`
          absolute
          left-4
          px-3 
          py-1.5 
          rounded-lg
          whitespace-nowrap
          ${isActive || isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-2'}
          transition-all
          duration-200
          bg-white/90
          backdrop-blur-sm
          shadow-lg
          text-sm
          font-medium
          ${isActive ? 'text-blue-600' : 'text-gray-700'}
        `}>
          {label}
        </div>
      </div>
    </Html>
  );
}

function MeshComponent() {
  const fileUrl = "/models/ecorche_anatomy_study.glb";
  const gltf = useLoader(GLTFLoader, fileUrl);
  const modelRef = useRef<Group>();
  const { camera, scene } = useThree();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const points: { pos: [number, number, number]; label: string; muscleId: number }[] = [
    { pos: [-0.6, 0.9, 0], label: "Shoulders", muscleId: 8 },
    { pos: [-0.3, 0.7, 0.3], label: "Chest", muscleId: 5 },
    { pos: [0.7, 0.3, -0.06], label: "Biceps", muscleId: 3 },
    { pos: [-0.9, -0.3, -0.06], label: "Forearms", muscleId: 6 },
    { pos: [-0.2, -0.2, 0.26], label: "Abs", muscleId: 1 },
    { pos: [-0.4, -1, 0.2], label: "Legs", muscleId: 7 },
    { pos: [-0.35, -2.2, -0.45], label: "Calf", muscleId: 4 },
    { pos: [0.6, 0.5, -0.48], label: "Triceps", muscleId: 9 },
    { pos: [-0.3, 0.3, -0.47], label: "Back", muscleId: 2 },
  ];

  const handleClick = (muscleId: number) => {
    if (isAuthenticated) {
      router.push(`/exercises/${muscleId}`);
    } else {
      toast({
        title: "Autentificare necesară",
        description: "Pentru a vedea detaliile exercițiilor, vă rugăm să vă conectați în aplicație.",
        variant: "destructive",
      });
    }
  };

  return(
    <>
      <primitive 
        ref={modelRef}
        object={gltf.scene} 
        scale={200} 
        position={[0, 0, 0]} 
      />
      {points.map((pt, idx) => (
        <group key={idx}>
          <mesh
            position={pt.pos}
            onPointerOver={() => setHoveredIdx(idx)}
            onPointerOut={() => setHoveredIdx(null)}
            onClick={() => handleClick(pt.muscleId)}
          >
            <sphereGeometry args={[0.06, 32, 32]} />
            <meshStandardMaterial color={hoveredIdx === idx ? "orange" : "lime"} />
          </mesh>
          {hoveredIdx === idx && (
            <Html position={[pt.pos[0], pt.pos[1] + 0.2, pt.pos[2]]}>
              <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-foreground shadow-lg cursor-pointer">
                {pt.label}
              </div>
            </Html>
          )}
        </group>
      ))}
    </>
  );
}

export function Shiba() {
  return (
    <div className="flex justify-center items-center h-screen bg-background text-foreground">
       <Canvas className="h-full w-full bg-background">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
        <MeshComponent />
      </Canvas>
    </div>
  );
}