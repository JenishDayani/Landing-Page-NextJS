'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useMotionValue, animate } from 'framer-motion';

// Shader code for distortion effect
const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uDelta;
  uniform float uAmplitude;
  float PI = 3.141592653589793238;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.x += sin(uv.y * PI) * uDelta.x * uAmplitude;
    newPosition.y += sin(uv.x * PI) * uDelta.y * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uAlpha;
  void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture, uAlpha);
  }
`;

// Three.js mesh component with shader
interface ModelProps {
  imageUrl: string;
  mousePos: { x: number; y: number };
  isActive: boolean;
  dimension: { width: number; height: number };
}

function DistortedImage({ imageUrl, mousePos, isActive, dimension }: ModelProps) {
  const mesh = useRef<any>(null);
  const { viewport } = useThree();
  const texture = useTexture(imageUrl);

  const opacity = useMotionValue(isActive ? 1 : 0);
  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  useEffect(() => {
    animate(opacity, isActive ? 1 : 0, {
      duration: 0.15,
      ease: 'easeOut',
      onUpdate: (latest) => {
        if (mesh.current?.material) {
          mesh.current.material.uniforms.uAlpha.value = latest;
        }
      },
    });
  }, [isActive, opacity]);

  useFrame(() => {
    if (!mesh.current?.material) return;

    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    if (Math.abs(mousePos.x - smoothX) > 1) {
      smoothMouse.x.set(lerp(smoothX, mousePos.x, 0.1));
      smoothMouse.y.set(lerp(smoothY, mousePos.y, 0.1));
      mesh.current.material.uniforms.uDelta.value = {
        x: mousePos.x - smoothX,
        y: -(mousePos.y - smoothY),
      };
    }

    if (dimension.width > 0 && dimension.height > 0) {
      const vx = (mousePos.x / dimension.width) * viewport.width - viewport.width / 2;
      const vy = viewport.height / 2 - (mousePos.y / dimension.height) * viewport.height;
      mesh.current.position.set(vx, vy, 0);
    }
  });

  const uniforms = useRef({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uTexture: { value: texture },
    uAlpha: { value: 0 },
  });

  // Update texture when imageUrl changes
  useEffect(() => {
    if (mesh.current?.material) {
      mesh.current.material.uniforms.uTexture.value = texture;
    }
  }, [texture]);

  return (
    <mesh ref={mesh} scale={[3, 3.6, 1]}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent={true}
      />
    </mesh>
  );
}

const items = [
  {
    title: 'Equity Trading',
    subtitle: 'Cash & delivery with deep research insights',
    img: '/equity.jpg',
  },
  {
    title: 'Derivatives',
    subtitle: 'Futures & options with risk-managed strategies',
    img: '/delta.png',
  },
  {
    title: 'Mutual Funds',
    subtitle: 'Goal-based portfolios curated by experts',
    img: '/mutual.jpg',
  },
  {
    title: 'IPO & Bonds',
    subtitle: 'Access to primary markets with seamless allotment',
    img: '/ipo.jpg',
  },
  {
    title: 'Commodities',
    subtitle: 'Hedge and diversify with MCX & NCDEX',
    img: '/gold.jpg',
  },
  {
    title: 'Currency',
    subtitle: 'FX pairs with tight spreads and fast fills',
    img: '/currency.jpg',
  },
];

export default function OfferShowcase2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimension, setDimension] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const updateBounds = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setDimension({ width: rect.width, height: rect.height });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setDimension({ width: rect.width, height: rect.height });
    }
    setActiveIndex(index);
  };

  const handleLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section
      id="offerings"
      className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 text-gray-900 "
    >
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-blue-600 font-semibold text-sm uppercase tracking-wider"
          >
            Trading Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
          >
            Our Offerings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Experience our complete range of trading products with interactive previews
          </motion.p>
        </motion.div>

        <div className="relative min-h-[480px]">
          {/* Three.js Canvas - positioned inside section */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              gl={{ alpha: true, antialias: true }}
              dpr={[1, 2]}
            >
              {activeIndex !== null && (
                <DistortedImage
                  imageUrl={items[activeIndex].img}
                  mousePos={mousePos}
                  isActive={activeIndex !== null}
                  dimension={dimension}
                />
              )}
            </Canvas>
          </div>

          {/* List Items */}
          <motion.ul className="relative z-10 overflow-hidden rounded-3xl border border-gray-200 bg-white/35 shadow-2xl divide-y divide-gray-100">
            {items.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * index, duration: 0.5 }}
                onMouseMove={(e) => handleMove(e, index)}
                onMouseLeave={handleLeave}
                className="relative cursor-pointer px-6 sm:px-10 py-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{item.subtitle}</p>
                  </div>
                </div>

                {/* Hover highlight */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={activeIndex === index ? { opacity: 0.15 } : { opacity: 0 }}
                  style={{
                    background:
                      'radial-gradient(circle 420px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.12) 0%, transparent 80%)',
                    '--mouse-x': `${mousePos.x}px`,
                    '--mouse-y': `${mousePos.y}px`,
                  } as React.CSSProperties}
                  transition={{ duration: 0.2 }}
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
