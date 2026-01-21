'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

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

export default function OfferShowcase3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-100px' });
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    // Set initial position for all images
    gsap.set('.swipeimage', { yPercent: -50, xPercent: -50 });

    let firstEnter: boolean;

    // Setup for each list item
    const containers = gsap.utils.toArray<HTMLElement>('.gsap-container');
    
    containers.forEach((el) => {
      const image = el.querySelector<HTMLImageElement>('img.swipeimage');
      if (!image) return;

      const setX = gsap.quickTo(image, 'x', { duration: 0.4, ease: 'power3' });
      const setY = gsap.quickTo(image, 'y', { duration: 0.4, ease: 'power3' });

      const align = (e: MouseEvent) => {
        if (firstEnter) {
          setX(e.clientX, e.clientX);
          setY(e.clientY, e.clientY);
          firstEnter = false;
        } else {
          setX(e.clientX);
          setY(e.clientY);
        }
      };

      const startFollow = () => document.addEventListener('mousemove', align);
      const stopFollow = () => document.removeEventListener('mousemove', align);

      const fade = gsap.to(image, {
        autoAlpha: 1,
        ease: 'none',
        paused: true,
        duration: 0.1,
        onReverseComplete: stopFollow,
      });

      el.addEventListener('mouseenter', (e) => {
        firstEnter = true;
        fade.play();
        startFollow();
        align(e as any);
      });

      el.addEventListener('mouseleave', () => fade.reverse());
    });

    return () => {
      // Cleanup
      containers.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <section
      id="solutions"
      className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8 text-gray-900 "
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
            Complete Solutions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
          >
            Trading Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Explore our comprehensive trading products with smooth cursor-following previews
          </motion.p>
        </motion.div>

        <motion.ul
          ref={listRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl divide-y divide-gray-100"
        >
          {items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="gsap-container relative cursor-pointer px-6 sm:px-10 py-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                className="swipeimage fixed top-0 left-0 w-[350px] h-[350px] object-cover rounded-2xl shadow-2xl opacity-0 invisible pointer-events-none z-50"
                src={item.img}
                alt={item.title}
              />
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{item.subtitle}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
