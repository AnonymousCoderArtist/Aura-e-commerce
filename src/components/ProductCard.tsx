import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { convertAndFormatPrice, CurrencyType } from '../utils';

interface ProductCardProps {
  key?: string;
  product: Product;
  currency: CurrencyType;
  onExplore: (p: Product) => void;
  darkMode: boolean;
}

export default function ProductCard({
  product,
  currency,
  onExplore,
  darkMode
}: ProductCardProps) {
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, hover: false });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative position inside the card bounding box
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert positions to percentages of card dimensions
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // Rotational limit factors (max 12 deg tilt)
    const rotateY = -((px - 50) / 50) * 12;
    const rotateX = ((py - 50) / 50) * 12;

    setCoords({ rotateX, rotateY, hover: true });
    setGlare({ x: px, y: py });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, hover: false });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <div 
      className="perspective-1000 w-full"
      onClick={() => onExplore(product)}
    >
      <motion.div
        ref={cardRef}
        id={`product-card-${product.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: coords.rotateX,
          rotateY: coords.rotateY,
          scale: coords.hover ? 1.02 : 1
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
        className={`relative w-full rounded-3xl overflow-hidden cursor-pointer preserve-3d transition-all duration-300 shadow-sm ${
          darkMode 
            ? 'immersive-card-dark text-white hover:shadow-2xl hover:shadow-white/5' 
            : 'immersive-card-light text-stone-900 hover:shadow-2xl hover:shadow-stone-900/5'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Holographic dynamic light shimmer sheath overlay */}
        <div 
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: coords.hover ? 0.35 : 0,
            background: `radial-gradient(circle 220px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Card tag */}
        {product.tag && (
          <span 
            id={`tag-${product.id}`}
            className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-semibold bg-black/90 text-white border border-white/10 shadow-sm"
          >
            {product.tag}
          </span>
        )}

        {/* Product Interactive Stage */}
        <div 
          className="relative w-full aspect-square flex items-center justify-center p-8 overflow-hidden"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Subtle background abstract ring backing */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <div className="w-4/5 h-4/5 rounded-full border border-current animate-[spin_60s_linear_infinite]" />
          </div>

          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain object-center select-none transition-transform duration-500 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Editorial Informational Footer Segment */}
        <div 
          className={`p-6 border-t ${
            darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-50 bg-neutral-50/30'
          }`}
          style={{ transform: 'translateZ(10px)' }}
        >
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <span>{product.category}</span>
            <span className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-stone-850 dark:text-neutral-200">{product.rating.toFixed(1)}</span>
            </span>
          </div>

          <h3 className="font-display text-lg font-bold tracking-tight mb-1 truncate text-stone-950 dark:text-white">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-505 dark:text-neutral-450 font-light truncate mb-4">
            {product.subtitle}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div id={`price-label-${product.id}`} className="flex flex-col">
              {product.discountPrice ? (
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-mono font-semibold text-stone-950 dark:text-white">
                    {convertAndFormatPrice(product.discountPrice, currency)}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 line-through">
                    {convertAndFormatPrice(product.price, currency)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-mono font-semibold text-stone-950 dark:text-white">
                  {convertAndFormatPrice(product.price, currency)}
                </span>
              )}
            </div>

            <button
              id={`explore-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onExplore(product);
              }}
              aria-label={`Explore more details of ${product.name}`}
              className={`p-2.5 rounded-full border transition-all focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                darkMode 
                  ? 'border-white/15 bg-white/5 text-white hover:bg-white hover:text-black hover:border-transparent' 
                  : 'border-neutral-200 bg-white text-stone-900 hover:bg-stone-950 hover:text-white hover:border-transparent'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
