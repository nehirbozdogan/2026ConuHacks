
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF,
  Html,
  Stage,
  useProgress,
  Environment,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';

// Fix for JSX intrinsic elements types in environments where @react-three/fiber types are missing
const Primitive = 'primitive' as any;
const Group = 'group' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

// Boeing 777 GLB Model
const CUSTOM_MODEL_URL = 'https://dl.dropboxusercontent.com/scl/fi/tl3d3znowgntig3wwir9c/boeing_777_airplane.glb?rlkey=ih00mx8h2bl0zsyk9lb3led1a&raw=1'; 

const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-6 w-64 text-center">
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white font-mono text-[10px] tracking-[0.3em] uppercase">
            Initializing Hangar
          </p>
          <p className="text-blue-400 font-mono text-xl font-bold">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </Html>
  );
};

const ExternalModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Clean high-end white aviation paint
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#ffffff',
          metalness: 0.1,
          roughness: 0.1,
          envMapIntensity: 1.2
        });
      }
    });
  }, [scene]);

  return (
    <Stage 
      intensity={0.6} 
      environment="city" 
      adjustCamera={false} 
      shadows={false}
    >
      {/* Use cast constant to avoid JSX intrinsic element error on primitive */}
      <Primitive object={scene} />
    </Stage>
  );
};

interface Props {
  onEnter: () => void;
}

const ThreeHangar: React.FC<Props> = ({ onEnter }) => {
  return (
    <div className="w-full h-full relative bg-[#000000]">
      <div className="absolute inset-0 z-0">
        <Canvas 
          gl={{ antialias: true }} 
          camera={{ position: [30, 100, 30], fov: 45, far: 100000 }}
        >
          <Suspense fallback={<LoadingScreen />}>
            {/* 
                UNIFORM BACKGROUND STARS
                - Massive radius (50000) so we are deep inside.
                - Large depth (1000) for parallax effect.
                - fade={false} to prevent that "orb/sphere" look.
            */}
            <Stars 
              radius={50000} 
              depth={1000} 
              count={40000} 
              factor={4} 
              saturation={0} 
              fade={false} 
              speed={0.05} 
            />
            
            {/* 
                PLANE SCALE (0.04) and POSITION (Y=12)
                Scaled down by another 1.5x from 0.06 to 0.04 as per user request.
                Use cast constant to avoid JSX intrinsic element error on group
            */}
            <Group position={[0, 12, 0]} scale={0.04} rotation={[0.1, -Math.PI / 1.5, 0]}> 
              <ExternalModel url={CUSTOM_MODEL_URL} />
            </Group>
            
            {/* Use cast constants for lights to avoid JSX intrinsic element error on ambientLight and pointLight */}
            <AmbientLight intensity={1.5} />
            <PointLight position={[120, 120, 120]} intensity={5.0} color="#ffffff" />
            <Environment preset="night" />
            
            <OrbitControls 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.1}
              makeDefault
              minDistance={30}
              maxDistance={500}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.8}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* 
          UI Overlay
          pb-32 maintains the layout base for positioning.
      */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-32 px-6 text-center pointer-events-none">
        <div className="mb-4 flex flex-col items-center">
          {/* 
              SKYBOUND TITLE
              Shifted 10mm (38px) down as previously requested.
          */}
          <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-blue-600
drop-shadow-[0_0_80px_rgba(37,99,235,0.6)] select-none uppercase italic leading-none transform translate-y-[38px]">
            SKYBOUND
          </h3>
          <div className="h-4" />
        </div>

        {/* 
            ENTER HANGAR BUTTON
            Shifted 5mm (approximately 19px) down as requested.
        */}
        <button 
          onClick={() => onEnter()}
          className="pointer-events-auto group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-700 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 shadow-[0_0_80px_rgba(255,255,255,0.2)] overflow-hidden transform translate-y-[19px]"
        >
          <span className="relative z-10">Enter Hangar</span>
          <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <svg className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThreeHangar;
