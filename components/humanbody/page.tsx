"use client";
import { Vector3, Raycaster, Mesh } from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useHelper } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group } from "three";
import { useRouter } from "next/navigation";

interface HotspotData {
  label: string;
  muscleId: number;
  rayOrigin: [number, number, number];
  rayDirection: [number, number, number];
}

const hotspots: HotspotData[] = [
  { label: "Shoulders", muscleId: 8, rayOrigin: [-0.6, 1, 0], rayDirection: [0.2, -0.2, 1] },
  { label: "Chest", muscleId: 5, rayOrigin: [-0.3, 0.8, 0], rayDirection: [0.3, -0.1, 1] },
  { label: "Biceps", muscleId: 3, rayOrigin: [0.6, 0.3, 0], rayDirection: [0, -0.1, 1] },
  { label: "Forearms", muscleId: 6, rayOrigin: [-0.9, -0.4, 0], rayDirection: [0, -0.1, 1] },
  { label: "Abs", muscleId: 1, rayOrigin: [-0.2, -0.1, 0], rayDirection: [0, -0.1, 1] },
  { label: "Legs", muscleId: 7, rayOrigin: [0.2, -0.9, 0], rayDirection: [0, -0.1, 1] },
  { label: "Calf", muscleId: 4, rayOrigin: [-0.2, -1.9, 0], rayDirection: [0, -0.1, 1] },
  { label: "Triceps", muscleId: 9, rayOrigin: [-0.6, -0.2, 0], rayDirection: [0, -0.1, 1] },
  { label: "Back", muscleId: 2, rayOrigin: [0, 0.9, -0.5], rayDirection: [0, -0.1, -1] }
];

function Hotspot({ position, label, muscleId }: { 
  position: Vector3;
  label: string;
  muscleId: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { camera } = useThree();
  const [isVisible, setIsVisible] = useState(true);
  const [screenPosition, setScreenPosition] = useState<Vector3>(new Vector3());

  useFrame(() => {
    // Calculează poziția pe ecran
    const worldPos = position.clone();
    const screenPos = worldPos.clone().project(camera);
    setScreenPosition(screenPos);

    // Verifică dacă punctul este în fața sau în spatele modelului
    const vectorToCamera = camera.position.clone().sub(worldPos).normalize();
    const dotProduct = vectorToCamera.dot(new Vector3(0, 0, 1));
    setIsVisible(dotProduct > 0);
  });

  if (!isVisible) return null;

  return (
    <Html position={position} occlude>
      <div
        onClick={() => router.push(`/exercises/${muscleId}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-pointer"
        style={{
          transform: `translate(-50%, -50%)`,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
      >
        <div className={`
          w-3 h-3 rounded-full transition-all duration-200
          ${isHovered ? 'bg-blue-500 scale-150' : 'bg-white border-2 border-gray-300'}
        `} />
        
        <div className={`
          absolute left-4 top-1/2 -translate-y-1/2
          px-3 py-1.5 rounded-lg whitespace-nowrap
          transition-all duration-200
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
          bg-white/90 backdrop-blur-sm shadow-lg
          text-sm font-medium text-gray-700
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
  const [hotspotPositions, setHotspotPositions] = useState<Map<string, Vector3>>(new Map());
  const raycaster = new Raycaster();

  useEffect(() => {
    if (!modelRef.current) return;

    const newPositions = new Map<string, Vector3>();

    hotspots.forEach(({ label, rayOrigin, rayDirection }) => {
      raycaster.set(
        new Vector3(...rayOrigin),
        new Vector3(...rayDirection).normalize()
      );

      const intersects = raycaster.intersectObject(modelRef.current!, true);
      
      if (intersects.length > 0) {
        newPositions.set(label, intersects[0].point);
      }
    });

    setHotspotPositions(newPositions);
  }, []);

  return (
    <>
      <primitive 
        ref={modelRef}
        object={gltf.scene} 
        scale={200} 
        position={[0, 0, 0]} 
      />
      {Array.from(hotspotPositions.entries()).map(([label, position]) => {
        const hotspotData = hotspots.find(h => h.label === label);
        if (!hotspotData) return null;
        
        return (
          <Hotspot
            key={label}
            position={position}
            label={label}
            muscleId={hotspotData.muscleId}
          />
        );
      })}
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
