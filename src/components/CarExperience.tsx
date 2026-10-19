import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, RotateCw, Sparkles, Droplets, ZoomIn, ShieldCheck, Check } from 'lucide-react';

interface PaintOption {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
}

const PAINT_OPTIONS: PaintOption[] = [
  {
    id: 'black-ceramic',
    name: '9H Ceramic Deep Black',
    color: '#08090C',
    roughness: 0.12,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  },
  {
    id: 'velocity-lime',
    name: 'Velocity Electric Lime',
    color: '#C6FF3D',
    roughness: 0.18,
    metalness: 0.65,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  },
  {
    id: 'stealth-matte',
    name: 'Stealth Satin Matte',
    color: '#15181E',
    roughness: 0.58,
    metalness: 0.4,
    clearcoat: 0.15,
    clearcoatRoughness: 0.35,
  },
  {
    id: 'liquid-platinum',
    name: 'Liquid Platinum Silver',
    color: '#D8DFE8',
    roughness: 0.12,
    metalness: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  },
  {
    id: 'rosso-supercar',
    name: 'Rosso Performance Red',
    color: '#C9141D',
    roughness: 0.14,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  },
];

export const CarExperience: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedPaint, setSelectedPaint] = useState<PaintOption>(PAINT_OPTIONS[0]);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [webGLError, setWebGLError] = useState(false);

  // References
  const bodyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setWebGLError(true);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080b);
    scene.fog = new THREE.FogExp2(0x06080b, 0.035);

    // Realistic HDRI Studio Environment Map for Specular Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnvironment = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(roomEnvironment).texture;
    scene.environment = envMap;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.6, 1.8, -3.4);
    cameraRef.current = camera;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.03; // Keep camera above the floor
    controls.minDistance = 2.0;
    controls.maxDistance = 8.5;
    controls.target.set(0, 0.5, 0);
    controlsRef.current = controls;

    // Calibrated Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const overheadLight = new THREE.DirectionalLight(0xffffff, 2.5);
    overheadLight.position.set(0, 7, 0);
    overheadLight.castShadow = true;
    overheadLight.shadow.mapSize.width = 2048;
    overheadLight.shadow.mapSize.height = 2048;
    overheadLight.shadow.bias = -0.0001;
    scene.add(overheadLight);

    const rimLight = new THREE.DirectionalLight(0xC6FF3D, 2.2);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    const softFill = new THREE.DirectionalLight(0xffffff, 1.2);
    softFill.position.set(5, 2, 4);
    scene.add(softFill);

    // Glossy Dark Studio Floor
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x06080b,
      roughness: 0.2,
      metalness: 0.8,
      envMapIntensity: 0.5,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Electric Lime Studio Perimeter Halo
    const ringGeo = new THREE.RingGeometry(3.5, 3.53, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xC6FF3D,
      side: THREE.DoubleSide,
      opacity: 0.35,
      transparent: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.005;
    scene.add(ring);

    // Precision Car Paint Material with Deep Clearcoat
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedPaint.color),
      metalness: selectedPaint.metalness,
      roughness: selectedPaint.roughness,
      clearcoat: selectedPaint.clearcoat,
      clearcoatRoughness: selectedPaint.clearcoatRoughness,
      reflectivity: 1.0,
      envMapIntensity: 1.8,
    });
    bodyMaterialRef.current = bodyMaterial;

    const detailsMaterial = new THREE.MeshStandardMaterial({
      color: 0x1A1D24,
      metalness: 0.95,
      roughness: 0.2,
      envMapIntensity: 1.2,
    });

    const caliperMaterial = new THREE.MeshStandardMaterial({
      color: 0xC6FF3D,
      metalness: 0.3,
      roughness: 0.2,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.0,
      transmission: 0.95,
      transparent: true,
      thickness: 0.4,
    });

    // Load Real Ferrari GLTF Model with Draco Decoders
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let carModel: THREE.Group | null = null;

    gltfLoader.load(
      '/models/ferrari.glb',
      (gltf) => {
        carModel = gltf.scene;

        carModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const name = mesh.name.toLowerCase();

            if (name === 'body' || name.includes('car_body') || name.includes('paint')) {
              mesh.material = bodyMaterial;
            } else if (name.includes('rim') || name.includes('wheel')) {
              mesh.material = detailsMaterial;
            } else if (name.includes('caliper') || name.includes('brake')) {
              mesh.material = caliperMaterial;
            } else if (name.includes('glass') || name.includes('window')) {
              mesh.material = glassMaterial;
            } else if (name.includes('trim') || name.includes('carbon') || name.includes('diffuser')) {
              mesh.material = detailsMaterial;
            }
          }
        });

        // Ensure specific named parts get assigned
        const bodyPart = carModel.getObjectByName('body');
        if (bodyPart && (bodyPart as THREE.Mesh).isMesh) {
          (bodyPart as THREE.Mesh).material = bodyMaterial;
        }

        const glassPart = carModel.getObjectByName('glass');
        if (glassPart && (glassPart as THREE.Mesh).isMesh) {
          (glassPart as THREE.Mesh).material = glassMaterial;
        }

        ['rim_fl', 'rim_fr', 'rim_rl', 'rim_rr', 'trim'].forEach((partName) => {
          const part = carModel?.getObjectByName(partName);
          if (part && (part as THREE.Mesh).isMesh) {
            (part as THREE.Mesh).material = detailsMaterial;
          }
        });

        // Scale & Position
        carModel.position.set(0, 0, 0);
        scene.add(carModel);

        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        } else {
          setLoadProgress(90);
        }
      },
      (err) => {
        console.error('Failed to load Ferrari GLB model:', err);
        setWebGLError(true);
      }
    );

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.autoRotate = isRotating;
        controlsRef.current.autoRotateSpeed = 1.2;
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      dracoLoader.dispose();
      renderer.dispose();
      pmremGenerator.dispose();
    };
  }, []);

  // Update Paint Material on Swatch Click
  useEffect(() => {
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.set(selectedPaint.color);
      bodyMaterialRef.current.roughness = selectedPaint.roughness;
      bodyMaterialRef.current.metalness = selectedPaint.metalness;
      bodyMaterialRef.current.clearcoat = selectedPaint.clearcoat;
      bodyMaterialRef.current.clearcoatRoughness = selectedPaint.clearcoatRoughness;
      bodyMaterialRef.current.needsUpdate = true;
    }
  }, [selectedPaint]);

  // Handle Inspection Zone Focus
  const handleHotspotClick = (index: number) => {
    setActiveHotspot(activeHotspot === index ? null : index);
    setIsRotating(false);

    if (!cameraRef.current || !controlsRef.current) return;

    if (index === 0) {
      // Front Ceramic Hood
      cameraRef.current.position.set(2.8, 1.4, -2.6);
      controlsRef.current.target.set(0, 0.4, -0.6);
    } else if (index === 1) {
      // BBS Alloy Wheels & Lime Caliper
      cameraRef.current.position.set(2.4, 0.7, 0.8);
      controlsRef.current.target.set(1.0, 0.35, 0.8);
    } else if (index === 2) {
      // Aerodynamic Rear Diffuser & Exhaust
      cameraRef.current.position.set(-3.2, 1.1, 2.4);
      controlsRef.current.target.set(0, 0.5, 1.2);
    } else if (index === 3) {
      // Cabin Glass & Cockpit
      cameraRef.current.position.set(-1.8, 1.6, -1.2);
      controlsRef.current.target.set(0, 0.8, 0);
    }
    controlsRef.current.update();
  };

  const handleResetCamera = () => {
    setActiveHotspot(null);
    setIsRotating(true);
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(4.6, 1.8, -3.4);
      controlsRef.current.target.set(0, 0.5, 0);
      controlsRef.current.update();
    }
  };

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#080A0D] overflow-hidden border-t border-b border-white/[0.06]">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none studio-glow opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#15191F] border border-white/10 text-[#C6FF3D] mb-4">
            <Eye className="w-3.5 h-3.5" />
            <span>PHOTOREALISTIC 3D VEHICLE STUDIO</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight">
            EVERY DETAIL MATTERS.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted font-normal leading-relaxed">
            Inspect our signature mirror-finish ceramic clearcoat on an authentic supercar in 360°. Rotate freely, switch bespoke paint finishes, and zoom in on precision detailing zones.
          </p>
        </div>

        {/* 3D Canvas Viewport Container */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#15191F]/90 to-[#080A0D] shadow-2xl shadow-black h-[540px] sm:h-[680px] w-full">
          
          {/* Canvas Mount */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Loading Indicator */}
          {!isLoaded && !webGLError && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#080A0D]/90 backdrop-blur-md">
              <div className="w-14 h-14 rounded-full border-2 border-white/10 border-t-[#C6FF3D] animate-spin mb-4" />
              <span className="font-display font-black text-lg text-white uppercase tracking-wider">
                LOADING 3D SUPERCAR MODEL
              </span>
              <span className="text-xs font-mono text-[#C6FF3D] mt-1">
                PREPARING CLEARCOAT SHADERS {loadProgress > 0 ? `(${loadProgress}%)` : ''}
              </span>
            </div>
          )}

          {/* WebGL Fallback if not supported */}
          {webGLError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/90 text-center">
              <img
                src="/images/hero-car.jpg"
                alt="Velocity Luxury Car"
                className="w-full max-w-lg rounded-xl mb-4 opacity-80"
              />
              <p className="text-sm text-muted">WebGL graphics unavailable. View our photographic transformation gallery below.</p>
            </div>
          )}

          {/* Top Bar Overlays: Lighting Toggle & Orbit Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`p-2.5 rounded-xl backdrop-blur-md border text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  isRotating
                    ? 'bg-[#C6FF3D]/10 border-[#C6FF3D]/40 text-[#C6FF3D]'
                    : 'bg-[#15191F]/80 border-white/10 text-muted hover:text-white'
                }`}
                title="Toggle Auto-Rotation"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span className="hidden sm:inline">{isRotating ? 'Auto Orbit ON' : 'Paused'}</span>
              </button>

              {activeHotspot !== null && (
                <button
                  onClick={handleResetCamera}
                  className="px-3 py-2 rounded-xl backdrop-blur-md bg-[#15191F]/80 border border-white/10 text-xs font-semibold text-white hover:text-lime transition-colors flex items-center gap-1.5"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-lime" />
                  <span>Reset Camera</span>
                </button>
              )}
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-[#C6FF3D] tracking-wider hidden sm:inline bg-black/60 px-3 py-1.5 rounded-xl border border-[#C6FF3D]/20">
                DRAG TO ORBIT 360° • SCROLL TO ZOOM
              </span>
            </div>
          </div>

          {/* Sleek Inspection Zone Control Bar at Top (Unobstructed view of car) */}
          <div className="absolute top-16 left-4 right-4 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-wrap items-center justify-center gap-2 bg-[#080A0D]/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 pointer-events-auto shadow-xl">
              <span className="text-[10px] font-mono text-muted uppercase px-2 hidden md:inline">
                INSPECT ZONE:
              </span>
              {[
                { id: 0, label: 'Ceramic Bonnet' },
                { id: 1, label: 'Alloy & Caliper' },
                { id: 2, label: 'Rear Diffuser' },
                { id: 3, label: 'Cockpit Glass' },
              ].map((zone) => {
                const isActive = activeHotspot === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => handleHotspotClick(zone.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#C6FF3D] text-[#080A0D] shadow-lime-subtle'
                        : 'text-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#080A0D]' : 'bg-[#C6FF3D]'}`} />
                    <span>{zone.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hotspot Info Drawer if one is active */}
          {activeHotspot !== null && (
            <div className="absolute top-28 left-4 right-4 sm:left-auto sm:right-6 sm:w-88 backdrop-blur-2xl bg-[#080A0D]/95 border border-[#C6FF3D]/50 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-30">
              <div className="flex items-start justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6FF3D]">
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {activeHotspot === 0 && '9H Ceramic Shield Bonnet'}
                    {activeHotspot === 1 && 'Forged Wheel & Caliper Seal'}
                    {activeHotspot === 2 && 'Carbon Diffuser & Exhaust'}
                    {activeHotspot === 3 && 'Optic Hydrophobic Glass'}
                  </span>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-muted hover:text-white text-xs p-1"
                >
                  ✕
                </button>
              </div>
              <p className="mt-3 text-xs text-white/90 leading-relaxed">
                {activeHotspot === 0 && 'Multi-stage machine compounding removes swirl marks, holograms, and micro-scratches before locking in a high-solid 9H ceramic shield with 3-year hydrophobic gloss guarantee.'}
                {activeHotspot === 1 && 'Acid-free iron fallout dissolve removes corrosive brake dust from alloy barrels, finished with ceramic rim coating and high-temperature caliper seal.'}
                {activeHotspot === 2 && 'Stainless steel quad exhaust tips hand-polished to mirror luster, carbon fiber aerodynamic fins sealed with UV-blocking nano protective film.'}
                {activeHotspot === 3 && 'Ultra-clear nanotech glass coating applied to windshield and side windows, repelling water droplets at highway speeds for supreme driving clarity.'}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#C6FF3D] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>INCLUDED IN ULTIMATE DETAIL PACKAGE</span>
              </div>
            </div>
          )}

          {/* Bottom Bar: Real-time Paint Finish Selector */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl bg-[#080A0D]/90 border border-white/15 rounded-2xl p-4 shadow-2xl z-20">
            <div className="flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-lime" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                FINISH: <span className="text-[#C6FF3D]">{selectedPaint.name}</span>
              </span>
            </div>

            {/* Paint Swatches */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PAINT_OPTIONS.map((paint) => {
                const isSelected = selectedPaint.id === paint.id;
                return (
                  <button
                    key={paint.id}
                    onClick={() => {
                      setSelectedPaint(paint);
                      setIsRotating(false);
                    }}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'border-[#C6FF3D] bg-[#1C222A] text-white shadow-lime-subtle'
                        : 'border-white/10 bg-[#15191F]/80 text-muted hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 shadow-sm"
                      style={{ backgroundColor: paint.color }}
                    />
                    <span className="text-[11px] font-medium hidden md:inline">{paint.name.split(' ')[0]}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#C6FF3D]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
