import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Cpu, Compass, ShieldCheck, Sparkles, Box } from 'lucide-react';
import { Product } from '../types';
import { convertAndFormatPrice, CurrencyType } from '../utils';

interface HomeHeroProps {
  products: Product[];
  currency: CurrencyType;
  onExplore: (p: Product) => void;
  darkMode: boolean;
}

export default function HomeHero({
  products,
  currency,
  onExplore,
  darkMode
}: HomeHeroProps) {
  // Focus on Onyx Chronometer as the primary showcase
  const heroProduct = products.find(p => p.id === 'chronometer') || products[0];
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax mouse effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const currentColor = heroProduct.colors[selectedColorIdx] || heroProduct.colors[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-sm transition-all duration-700 ${
        darkMode 
          ? 'immersive-card-dark text-white border-white/5' 
          : 'immersive-card-light text-stone-900 border-neutral-100'
      }`}
    >
      {/* Immersive cinematic background meshes & color nodes */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Responsive ambient glowing light orbs */}
        <motion.div 
          animate={{
            x: mousePos.x * -40,
            y: mousePos.y * -40,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
          style={{ backgroundImage: `radial-gradient(circle at center, rgba(245,158,11,0.1) 0%, transparent 60%)` }}
          className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full blur-[100px] opacity-75 md:opacity-100"
        />
        <motion.div 
          animate={{
            x: mousePos.x * 25,
            y: mousePos.y * 25,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
          style={{ backgroundImage: `radial-gradient(circle at center, rgba(168,85,247,0.06) 0%, transparent 70%)` }}
          className="absolute -bottom-40 -left-20 w-[550px] h-[550px] rounded-full blur-[120px] opacity-75"
        />

        {/* Micro coordinate grid pattern */}
        <div className={`absolute inset-0 opacity-[0.25] pointer-events-none ${darkMode ? 'grid-bg-pattern-dark' : 'grid-bg-pattern'}`} />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Editorial content */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 select-none text-left">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-amber-500/10 bg-amber-500/[0.03] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-amber-500">
              Curation Showcase Year 2026
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-stone-950 dark:text-white">
              The Pure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 gold-text-gradient">
                Onyx System.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 font-light leading-relaxed max-w-lg">
              Presenting a delicate synergy of sculptural basalt and titanium automatic horology. An engineering statement housing a Miyota Core calibre, fully sandblasted for optical-grade reflectivity.
            </p>
          </div>

          {/* Interactive swatch picker directly within Hero */}
          <div className="space-y-3.5 pb-2">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              Select Curative Sheath Finish
            </span>
            <div className="flex space-x-3">
              {heroProduct.colors.map((color, idx) => (
                <button
                  id={`hero-swatch-${idx}`}
                  key={color.name}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`relative p-1 rounded-full transition-all focus:outline-none ${
                    selectedColorIdx === idx 
                      ? 'ring-1 ring-amber-500' 
                      : 'ring-0'
                  }`}
                  title={color.name}
                >
                  <span 
                    className="block w-6 h-6 rounded-full border border-white/10" 
                    style={{ backgroundColor: color.hex }}
                  />
                  {selectedColorIdx === idx && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              Active Selection: <span className="text-amber-500 font-semibold">{currentColor.name}</span>
            </p>
          </div>

          {/* Key micro-specs */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-100 dark:border-white/5 max-w-md text-xs font-mono">
            <div className="space-y-1">
              <span className="block text-[8px] uppercase tracking-wider text-neutral-400">Core Movement</span>
              <strong className="block text-stone-900 dark:text-neutral-200">Miyota 9015</strong>
            </div>
            <div className="space-y-1">
              <span className="block text-[8px] uppercase tracking-wider text-neutral-400">Tactile Bezel</span>
              <strong className="block text-stone-900 dark:text-neutral-200">Grade 5 Ti</strong>
            </div>
            <div className="space-y-1">
              <span className="block text-[8px] uppercase tracking-wider text-neutral-400">Glass Lens</span>
              <strong className="block text-stone-900 dark:text-neutral-200">Double Sapphire</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              id="hero-primary-cta"
              onClick={() => onExplore(heroProduct)}
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-xl bg-amber-500 hover:bg-amber-600 text-stone-950 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <span>Explore Masterpiece Spec</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-3 text-[10px] font-mono text-neutral-400 uppercase tracking-widest self-center sm:self-auto pl-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Insured Fedex Shipping</span>
            </div>
          </div>

        </div>

        {/* Right 3D-oriented Glass Card representing the masterpiece */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[360px] md:min-h-[420px] perspective-1000">
          
          {/* Animated orbital rings backing */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-80 h-80 rounded-full border border-dashed border-white/20 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[260px] h-[260px] rounded-full border border-white/10 animate-[spin_40s_linear-reverse_infinite]" />
          </div>

          {/* Floating 3D Plate */}
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
              rotateY: mousePos.x * 24, // 3D rotate horizontal based on mouse pos
              rotateX: -mousePos.y * 24, // 3D rotate vertical
              y: isHovered ? -10 : 0
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className={`relative w-full max-w-[340px] aspect-[4/5] rounded-[2rem] p-6 flex flex-col justify-between items-center transition-all shadow-2xl overflow-hidden preserve-3d ${
              darkMode 
                ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.01] border border-white/15' 
                : 'bg-white border border-neutral-105 shadow-black/5'
            }`}
          >
            {/* 3D dynamic reflection light sheen */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `linear-gradient(${135 + mousePos.x * 45}deg, rgba(255,255,255,0.4) 0%, transparent 60%)`
              }}
            />

            {/* Stage header info */}
            <div className="w-full flex justify-between items-center text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
              <span className="flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-amber-500" />
                3D Hologram Preview
              </span>
              <span className="text-amber-500 font-bold">{heroProduct.tag}</span>
            </div>

            {/* Glowing circular target */}
            <div className="absolute inset-0 m-auto w-52 h-52 bg-amber-500/5 rounded-full filter blur-xl pointer-events-none" />

            {/* Scaled product image centerpiece */}
            <div className="relative w-[85%] aspect-square flex items-center justify-center transform-gpu select-none transition-transform duration-500 hover:scale-105">
              <motion.img
                key={selectedColorIdx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={heroProduct.images[0]}
                alt={heroProduct.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-zoom-in"
                referrerPolicy="no-referrer"
                style={{
                  // Dynamically shift visual balance filter based on color index
                  filter: selectedColorIdx === 1 
                    ? 'contrast(0.95) saturate(0.4) brightness(1.2)' 
                    : selectedColorIdx === 2
                    ? 'hue-rotate(30deg) saturate(1.2) brightness(1.05)'
                    : 'none'
                }}
              />
            </div>

            {/* Detail tag footer */}
            <div className="w-full text-center space-y-1 select-none">
              <h3 className="font-display text-base font-bold tracking-tight text-stone-900 dark:text-white">
                {heroProduct.name}
              </h3>
              <p className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                {currentColor.name} • {convertAndFormatPrice(heroProduct.discountPrice || heroProduct.price, currency)}
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
