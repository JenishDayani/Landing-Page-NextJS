'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !stripRef.current) return;

    const wrapper = wrapperRef.current;
    const strip = stripRef.current;

    let pinWrapWidth: number;
    let horizontalScrollLength: number;

    const refresh = () => {
      pinWrapWidth = strip.scrollWidth;
      horizontalScrollLength = pinWrapWidth - window.innerWidth;
    };

    refresh();

    const scrollTween = gsap.to(strip, {
      x: () => -horizontalScrollLength,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: wrapper,
        scrub: 1,
        start: 'center center',
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true,
      },
    });

    ScrollTrigger.addEventListener('refreshInit', refresh);

    return () => {
      scrollTween.scrollTrigger?.kill();
      ScrollTrigger.removeEventListener('refreshInit', refresh);
    };
  }, []);

  const images = [
    '/delta.png',
    '/ipo.jpg',
    '/gold.jpg',
    '/delta.png',
    '/ipo.jpg',
    '/gold.jpg',
    '/delta.png',
    '/ipo.jpg',
    '/gold.jpg',
  ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Our Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Explore Our Trading Success
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Scroll through our visual journey of achievements
            </p>
          </div>
        </div>

        <div ref={wrapperRef} className="horiz-gallery-wrapper overflow-hidden">
          <div
            ref={stripRef}
            className="horiz-gallery-strip flex flex-nowrap will-change-transform"
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="project-wrap flex-shrink-0 w-[33vw] min-w-[280px] p-4 sm:p-8"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white border border-gray-100">
                  <img
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-bold">
                        Trading Success {index + 1}
                      </h3>
                      <p className="text-blue-100 text-sm mt-1">
                        Client Achievement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
