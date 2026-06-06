import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Watch, Eye, Shield, SlidersHorizontal, Cpu } from 'lucide-react';
import { Product } from '../types';
import { convertAndFormatPrice, CurrencyType } from '../utils';

interface HeroProps {
  product: Product; // Usually Onyx Chronometer for cinematic breakdown
  currency: CurrencyType;
  onExplore: () => void;
  darkMode: boolean;
}

export default function Hero({
  product,
  currency,
  onExplore,
  darkMode
}: HeroProps) {
  const [explosionFactor, setExplosionFactor] = useState(0); // 0 (assembled) to 100 (fully exploded)
  const [activeLayer, setActiveLayer] = useState<'dome' | 'dial' | 'movement' | 'strap' | null>(null);

  // Layer details
  const layers = [
    {
      id: 'dome',
      name: 'Curved Sapphire Dome',
      desc: 'Highly scratch-resistant optical crystal with specialized double anti-reflective lining.',
      offsetY: -95,
      scale: 1.15,
      opacity: 0.75
    },
    {
      id: 'dial',
      name: 'Nocturnal Matte Dial',
      desc: 'Deep titanium sweep backing embedded with warm copper increments and minimalist layout.',
      offsetY: -35,
      scale: 1.05,
      opacity: 0.9
    },
    {
      id: 'movement',
      name: 'Miyota 9015 Core',
      desc: 'Japanese Calibre mechanical auto-winding assembly with high-beat precision sweep second.',
      offsetY: 25,
      scale: 0.95,
      opacity: 0.85
    },
    {
      id: 'strap',
      name: '钛 Core Strap & Chassis',
      desc: 'Grade 5 aerospace titanium alloy container and rich, full-grain stitched calf skin black leather.',
      offsetY: 85,
      scale: 0.85,
      opacity: 1
    }
  ];

  return (
    <section 
      id="cinematic-interactive-tour"
      className={`relative w-full rounded-[3rem] p-8 md:p-12 overflow-hidden backdrop-blur-xl transition-all ${
        darkMode 
          ? 'immersive-card-dark text-white' 
          : 'immersive-card-light text-stone-900'
      }`}
    >
      {/* Background grids */}
      <div className={`absolute inset-0 pointer-events-none opacity-[0.25] ${darkMode ? 'grid-bg-pattern-dark' : 'grid-bg-pattern'}`} />

      {/* Decorative linear glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Informational Editorial Segment */}
        <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8 z-10 select-none">
          <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-amber-500 mb-4 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            Macro-Mechanical Engineering
          </span>
          
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1] text-stone-900 dark:text-white">
            Cinematic Deconstruction
          </h1>
          
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-8">
            Interact with the structural integrity of the <strong className="font-semibold text-stone-900 dark:text-amber-500">{product.name}</strong>. Drag the explosive slider to separate the premium double-curved sapphire glass from the core mechanical automatic movement.
          </p>

          {/* Interactive exploded controller */}
          <div className="w-full space-y-4 mb-8">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                Inter-Layer Depth
              </span>
              <span className="font-bold text-amber-500 text-sm">{explosionFactor}%</span>
            </div>

            <div className="relative w-full flex items-center">
              <input
                id="hero-explosion-slider"
                type="range"
                min="0"
                max="100"
                value={explosionFactor}
                onChange={(e) => setExplosionFactor(Number(e.target.value))}
                aria-label="Exploded view depth slider"
                className="w-full h-1 bg-neutral-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="flex justify-between text-[9px] font-mono uppercase tracking-wider text-neutral-400">
              <span>Assembled Shell</span>
              <span>Exploded View</span>
            </div>
          </div>

          {/* Active Layer Details */}
          <div className={`w-full min-h-[96px] rounded-2xl p-4 transition-all border ${
            darkMode ? 'bg-black/50 border-white/10' : 'bg-white border-neutral-250/50'
          }`}>
            <AnimatePresence mode="wait">
              {activeLayer ? (
                <motion.div
                  key={activeLayer}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-1"
                >
                  <p className="text-[10px] font-mono tracking-widest uppercase text-amber-500 font-bold mb-1">
                    Component Inspected
                  </p>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                    {layers.find(l => l.id === activeLayer)?.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                    {layers.find(l => l.id === activeLayer)?.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col justify-center items-center py-2 text-center"
                >
                  <Layers className="w-5 h-5 text-neutral-400 mb-1.5 animate-bounce" />
                  <p className="text-[11px] text-neutral-400 uppercase tracking-widest font-mono">
                    Hover components to inspect
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            id="hero-tour-action-btn"
            onClick={onExplore}
            className={`mt-8 inline-flex items-center space-x-3 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-xl focus:ring-1 focus:ring-amber-500 ${
              darkMode
                ? 'bg-white text-black hover:bg-white/90'
                : 'bg-stone-950 text-white hover:bg-stone-850'
            }`}
          >
            <Watch className="w-4 h-4" />
            <span>Customize This Element</span>
          </button>
        </div>

        {/* Right Exploded Visual Area */}
        <div className="lg:col-span-7 h-[450px] sm:h-[550px] relative flex items-center justify-center perspective-1000">
          
          {/* Depth coordinate rings */}
          <div className="absolute inset-x-8 inset-y-12 border border-dashed border-neutral-300 dark:border-zinc-800 rounded-[2.5rem] pointer-events-none opacity-40 flex items-center justify-center">
            <div className="w-3/4 h-3/4 border border-dashed border-neutral-300 dark:border-zinc-800 rounded-full" />
          </div>

          {/* Exploded Layers */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 preserve-3d">
            {layers.map((layer) => {
              // Target offset expands with explosionFactor percentage
              const factorPercent = explosionFactor / 100;
              const calculatedOffsetY = layer.offsetY * factorPercent;
              const isSelected = activeLayer === layer.id;

              return (
                <motion.div
                  id={`hero-layer-${layer.id}`}
                  key={layer.id}
                  onMouseEnter={() => setActiveLayer(layer.id as any)}
                  onMouseLeave={() => setActiveLayer(null)}
                  onClick={() => setActiveLayer(layer.id as any)}
                  style={{
                    y: calculatedOffsetY,
                    scale: isSelected ? layer.scale * 1.05 : layer.scale,
                    zIndex: layers.length + (layer.offsetY < 0 ? -Math.round(layer.offsetY) : Math.round(layer.offsetY)),
                    opacity: isSelected ? 1 : layer.opacity
                  }}
                  className="absolute inset-0 flex items-center justify-center cursor-help transition-all duration-300"
                >
                  <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                    
                    {/* Concentric helper frame ring */}
                    {isSelected && (
                      <motion.div 
                        layoutId="inspectedRing"
                        className="absolute inset-0 border border-amber-500/40 rounded-full animate-[ping_2s_infinite]" 
                      />
                    )}

                    <img
                      src={product.images[0]}
                      alt={layer.name}
                      onError={(e) => {
                        // Fallback image handling
                        (e.target as any).src = 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&auto=format&fit=crop&q=80';
                      }}
                      className={`w-full h-full object-contain filter transition-all duration-300 select-none ${
                        isSelected ? 'drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]' : 'drop-shadow-2xl'
                      }`}
                      style={{
                        clipPath: layer.id === 'dome' 
                          ? 'circle(50% at 50% 25%)'
                          : layer.id === 'dial' 
                          ? 'circle(35% at 50% 50%)'
                          : layer.id === 'movement'
                          ? 'circle(40% at 50% 60%)'
                          : 'none', // strap has full representation
                        filter: layer.id === 'dome'
                          ? 'invert(0.1) brightness(1.25) opacity(0.8) saturate(0.2)'
                          : layer.id === 'movement'
                          ? 'contrast(0.9) brightness(0.8) hue-rotate(45deg)'
                          : 'none'
                      }}
                      referrerPolicy="no-referrer"
                    />

                    {/* Horizontal leader guides */}
                    {isSelected && (
                      <div className="absolute left-1/2 top-1/2 w-48 h-[1px] bg-amber-500 origin-left hidden md:block">
                        <span className="absolute right-0 -top-4 font-mono text-[9px] uppercase tracking-wider text-amber-500 bg-zinc-950 px-2 py-0.5 border border-amber-500/20 rounded">
                          {layer.name}
                        </span>
                      </div>
                    )}

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
