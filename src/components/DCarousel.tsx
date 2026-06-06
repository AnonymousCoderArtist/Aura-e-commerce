import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { convertAndFormatPrice, CurrencyType } from '../utils';

interface DCarouselProps {
  products: Product[];
  currency: CurrencyType;
  onExplore: (p: Product) => void;
  darkMode: boolean;
}

export default function DCarousel({
  products,
  currency,
  onExplore,
  darkMode
}: DCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    
    // Check circular wrap-around
    let adjustedDiff = diff;
    const count = products.length;
    if (diff < -count / 2) adjustedDiff += count;
    if (diff > count / 2) adjustedDiff -= count;

    const isActive = adjustedDiff === 0;
    const isPrev = adjustedDiff === -1 || (adjustedDiff === count - 1 && count > 2);
    const isNext = adjustedDiff === 1 || (adjustedDiff === -(count - 1) && count > 2);

    if (isActive) {
      return {
        zIndex: 30,
        transform: 'translate3d(0, 0, 150px) scale(1) rotateY(0deg)',
        opacity: 1,
        pointerEvents: 'auto' as const
      };
    } else if (isPrev) {
      return {
        zIndex: 10,
        transform: 'translate3d(-60%, 0, 0px) scale(0.8) rotateY(40deg)',
        opacity: 0.45,
        pointerEvents: 'auto' as const
      };
    } else if (isNext) {
      return {
        zIndex: 10,
        transform: 'translate3d(60%, 0, 0px) scale(0.8) rotateY(-40deg)',
        opacity: 0.45,
        pointerEvents: 'auto' as const
      };
    } else {
      return {
        zIndex: 0,
        transform: 'translate3d(0, 0, -300px) scale(0.5) rotateY(0deg)',
        opacity: 0,
        pointerEvents: 'none' as const
      };
    }
  };

  const activeProduct = products[activeIndex];

  return (
    <section 
      id="immersive-3d-carousel"
      className="relative w-full min-h-[640px] md:min-h-[750px] flex items-center justify-center py-16 overflow-hidden rounded-[3rem]"
    >
      {/* Background radial/linear glowing gradients */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-20 dark:opacity-35 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${activeProduct.gradient3D} blur-3xl`} />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-transparent to-neutral-100/10 dark:to-neutral-950/20" />
      </div>

      {/* Grid Pattern overlays */}
      <div className={`absolute inset-0 pointer-events-none opacity-40 ${darkMode ? 'grid-bg-pattern-dark' : 'grid-bg-pattern'}`} />

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Heading Tag */}
        <div className="text-center mb-12 select-none">
          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-500 font-bold mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500 uppercase" />
            3D Spatial Carousel Experience
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            Rotate the Fine Art
          </h2>
          <p className="text-xs text-neutral-400 mt-2 font-sans uppercase tracking-widest">
            Drag, tap, or navigate to inspect geometries
          </p>
        </div>

        {/* The 3D Stage Ring Container */}
        <div className="relative w-full h-[360px] md:h-[450px] flex items-center justify-center perspective-1000">
          <div className="relative w-full max-w-[320px] md:max-w-[420px] h-full flex items-center justify-center">
            {products.map((product, idx) => {
              const cardLayout = getCardStyle(idx);
              const isActive = idx === activeIndex;

              return (
                <div
                  id={`carousel-item-${product.id}`}
                  key={product.id}
                  onClick={() => {
                    if (!isActive) setActiveIndex(idx);
                  }}
                  className="absolute w-full h-full transition-all duration-700 ease-out preserve-3d cursor-pointer"
                  style={{
                    zIndex: cardLayout.zIndex,
                    transform: cardLayout.transform,
                    opacity: cardLayout.opacity,
                    pointerEvents: cardLayout.pointerEvents
                  }}
                >
                  {/* Decorative glass backplane */}
                  <div className={`absolute inset-0 rounded-[2.5rem] shadow-2xl transition-all duration-300 pointer-events-none backdrop-blur-xl ${
                    isActive 
                      ? 'shadow-black/25 dark:shadow-white/5 ring-1 ring-white/20' 
                      : 'shadow-black/5 ring-0'
                    } ${
                      darkMode ? 'immersive-card-dark' : 'bg-white/95 border border-neutral-100'
                  }`} />

                  {/* Highlight Glow for active card */}
                  {isActive && (
                    <div className="absolute inset-0 -m-1 rounded-[2.75rem] bg-gradient-to-r from-amber-500 to-amber-600 blur-sm opacity-10 pointer-events-none -z-10" />
                  )}

                  {/* Inner Content Card layout */}
                  <div className="relative w-full h-full flex flex-col p-6 items-center justify-between text-center select-none">
                    
                    {/* Top minimal title element */}
                    <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                      <span>{product.category}</span>
                      <span className="text-amber-500">{product.tag || 'Bespoke'}</span>
                    </div>

                    {/* Highly centered item display */}
                    <div className="relative w-3/4 aspect-square flex items-center justify-center transition-transform duration-500 hover:scale-105">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Text values summary */}
                    <div className="w-full pb-2">
                      <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-stone-900 dark:text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs font-mono font-medium text-amber-500 tracking-wider mb-3">
                        {convertAndFormatPrice(product.price, currency)}
                      </p>

                      {/* Direct click configuration action */}
                      {isActive && (
                        <motion.button
                          id={`carousel-inspect-btn-${product.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onExplore(product);
                          }}
                          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            darkMode
                              ? 'bg-white text-stone-950 hover:bg-neutral-100'
                              : 'bg-stone-950 text-white hover:bg-stone-850'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Meticulous Inspect</span>
                        </motion.button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel manual rotating buttons */}
        <div className="flex items-center justify-center space-x-6 mt-8">
          <button
            id="carousel-prev-btn"
            onClick={prevSlide}
            aria-label="Previous masterpiece"
            className={`p-4 rounded-full border transition-all focus:outline-none focus:ring-1 focus:ring-amber-500 hover:-translate-x-0.5 active:translate-x-0 ${
              darkMode 
                ? 'border-white/10 bg-white/5 text-white hover:bg-white hover:text-black hover:border-transparent' 
                : 'border-neutral-200 bg-white text-stone-900 hover:bg-neutral-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-2.5">
            {products.map((_, i) => (
              <button
                id={`carousel-dot-${i}`}
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i+1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i 
                    ? 'w-7 bg-white' 
                    : darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-neutral-200 hover:bg-neutral-300'
                }`}
              />
            ))}
          </div>

          <button
            id="carousel-next-btn"
            onClick={nextSlide}
            aria-label="Next masterpiece"
            className={`p-4 rounded-full border transition-all focus:outline-none focus:ring-1 focus:ring-amber-500 hover:translate-x-0.5 active:translate-x-0 ${
              darkMode 
                ? 'border-white/10 bg-white/5 text-white hover:bg-white hover:text-black hover:border-transparent' 
                : 'border-neutral-200 bg-white text-stone-900 hover:bg-neutral-50'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
