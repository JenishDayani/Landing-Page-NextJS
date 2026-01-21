'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, type MouseEvent } from 'react';

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

export default function OfferShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent<HTMLDivElement>, index: number) => {
    setActiveIndex(index);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section
      id="what-we-offer"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8 text-gray-900 "
    >
      <div className="max-w-6xl mx-auto" ref={containerRef}>
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
            Our Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Explore the segments we serve, hover to see a quick visual for each offering.
          </motion.p>
        </motion.div>

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white divide-y divide-gray-100 shadow-xl">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="relative cursor-pointer"
              onMouseMove={(event) => handleMove(event, index)}
              onMouseEnter={(event) => handleMove(event, index)}
              onMouseLeave={handleLeave}
              onTouchStart={() => setActiveIndex(index)}
              onTouchEnd={handleLeave}
            >
              <div className="flex items-center justify-between px-6 sm:px-10 py-5 sm:py-6">
                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl font-semibold tracking-tight">{item.title}</div>
                  <div className="text-sm sm:text-base text-gray-600">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              key={items[activeIndex].title}
              className="pointer-events-none fixed w-60 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-blue-100 z-50"
              style={{ left: position.x, top: position.y }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              exit={{ opacity: 0, scale: 0.85, rotate: -4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-cyan-400/10" />
              <Image
                src={items[activeIndex].img}
                alt={items[activeIndex].title}
                fill
                sizes="(min-width: 1024px) 320px, 240px"
                className="object-cover"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
