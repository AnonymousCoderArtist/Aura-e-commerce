import React, { useState } from 'react';
import { ShoppingBag, Eye, HelpCircle, Sun, Moon, Sparkles, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  setCurrency: (c: 'USD' | 'EUR' | 'GBP' | 'JPY') => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  textScale: 'normal' | 'large' | 'extra';
  setTextScale: (s: 'normal' | 'large' | 'extra') => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  activeSegment: 'store' | 'carousel' | 'hero' | 'reviews';
  setActiveSegment: (s: 'store' | 'carousel' | 'hero' | 'reviews') => void;
}

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
};

export default function Navbar({
  cartCount,
  onCartToggle,
  currency,
  setCurrency,
  highContrast,
  setHighContrast,
  textScale,
  setTextScale,
  darkMode,
  setDarkMode,
  activeSegment,
  setActiveSegment
}: NavbarProps) {
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

  const toggleAccessibility = () => setShowAccessMenu(!showAccessMenu);
  const toggleCurrency = () => setShowCurrencyMenu(!showCurrencyMenu);

  return (
    <header 
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        darkMode ? 'bg-immersive-dark/85 border-b border-white/5' : 'bg-white/80 border-b border-neutral-100'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Boutique Branded Typography Logo */}
        <div className="flex items-center space-x-2">
          <button 
            id="logo-brand-btn"
            onClick={() => setActiveSegment('store')}
            className="group flex flex-col items-start focus:outline-none"
            aria-label="AURA Boutique Home"
          >
            <span className="font-display text-2xl font-bold tracking-[0.25em] text-stone-900 dark:text-white transition-colors">
              A U R A
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 group-hover:text-amber-500 transition-colors">
              Noir & Éther
            </span>
          </button>
        </div>

        {/* Dynamic Spatial Sections Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Store Spaces">
          {[
            { id: 'store', label: 'Museum Catalog' },
            { id: 'carousel', label: '3D Carousel' },
            { id: 'hero', label: 'Interactive Tour' },
            { id: 'reviews', label: 'Reflections' }
          ].map((seg) => (
            <button
              id={`nav-seg-${seg.id}`}
              key={seg.id}
              onClick={() => setActiveSegment(seg.id as any)}
              className={`relative font-sans text-xs uppercase tracking-[0.2em] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500 py-2 px-1 ${
                activeSegment === seg.id 
                  ? 'text-stone-950 dark:text-white' 
                  : 'text-neutral-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {seg.label}
              {activeSegment === seg.id && (
                <motion.span 
                  layoutId="navTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Interactive Performance Controls & Cart */}
        <div className="flex items-center space-x-3">
          
          {/* Currency Dropdown */}
          <div className="relative">
            <button
              id="currency-selector-btn"
              onClick={toggleCurrency}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider focus:ring-1 focus:ring-amber-500 transition-all ${
                darkMode
                  ? 'bg-white/[0.04] border-white/10 text-neutral-300 hover:bg-white/[0.08]'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
              aria-label="Change currency"
              aria-expanded={showCurrencyMenu}
            >
              <span>{currencySymbols[currency]}</span>
              <span className="font-medium">{currency}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            <AnimatePresence>
              {showCurrencyMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowCurrencyMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-32 rounded-xl shadow-2xl z-20 backdrop-blur-xl p-1 focus:outline-none ${
                      darkMode ? 'immersive-card-dark text-white' : 'bg-white border-neutral-100 text-stone-900'
                    }`}
                  >
                    {(['USD', 'EUR', 'GBP', 'JPY'] as const).map((curr) => (
                      <button
                        id={`curr-opt-${curr}`}
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setShowCurrencyMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono tracking-wider flex items-center justify-between hover:bg-amber-500 hover:text-white transition-colors`}
                      >
                        <span>{currencySymbols[curr]} {curr}</span>
                        {currency === curr && <Check className="w-3. h-3" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Accessibility Adjustments Menu */}
          <div className="relative">
            <button
              id="accessibility-settings-btn"
              onClick={toggleAccessibility}
              className={`p-2 rounded-full border focus:ring-1 focus:ring-amber-500 transition-all ${
                darkMode
                  ? 'bg-white/[0.04] border-white/10 text-neutral-300 hover:bg-white/[0.08] hover:border-white/20'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-150 hover:border-neutral-400'
              } ${highContrast ? 'border-amber-500' : ''}`}
              aria-label="Universal Accessibility Tools"
              aria-expanded={showAccessMenu}
            >
              <Eye className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {showAccessMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowAccessMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl z-20 backdrop-blur-xl p-4 text-xs ${
                      darkMode ? 'immersive-card-dark text-white' : 'bg-white border-neutral-100 text-stone-900'
                    }`}
                  >
                    <p className="font-semibold tracking-wider uppercase text-[10px] text-neutral-400 mb-3 flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-500 animate-pulse" />
                      Accessibility Settings
                    </p>

                    {/* High Contrast Mode */}
                    <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-zinc-850">
                      <span className="font-medium">High Contrast Assist</span>
                      <button
                        id="toggle-contrast-btn"
                        onClick={() => setHighContrast(!highContrast)}
                        className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                          highContrast 
                            ? 'bg-amber-500 text-white' 
                            : darkMode ? 'bg-zinc-850 hover:bg-zinc-800 text-neutral-300' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {highContrast ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>

                    {/* Font Sizing Controls */}
                    <div className="flex flex-col py-2.5">
                      <span className="font-medium mb-2 block">Text Scale</span>
                      <div className="grid grid-cols-3 gap-1">
                        {(['normal', 'large', 'extra'] as const).map((sz) => (
                          <button
                            id={`text-sz-opt-${sz}`}
                            key={sz}
                            onClick={() => setTextScale(sz)}
                            className={`py-1.5 rounded-lg font-medium text-center border uppercase text-[9px] tracking-wider transition-all ${
                              textScale === sz
                                ? 'bg-stone-900 text-white border-stone-900 dark:bg-white dark:text-stone-950 dark:border-white'
                                : 'bg-transparent text-neutral-500 border-neutral-200 dark:border-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {sz === 'normal' ? 'A' : sz === 'large' ? 'A+' : 'A++'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Museum Lighting Switch (Dark Mode) */}
          <button
            id="dark-mode-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border transition-all focus:ring-1 focus:ring-amber-500 ${
              darkMode
                ? 'bg-white/[0.04] border-white/10 text-amber-400 hover:bg-white/[0.08]'
                : 'bg-neutral-50 border-neutral-200 text-stone-700 hover:bg-neutral-100'
            }`}
            aria-label={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Elegant Floating Cart Trigger */}
          <button
            id="shopping-cart-nav-btn"
            onClick={onCartToggle}
            className={`relative p-3 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 overflow-visible ${
              darkMode
                ? 'bg-white text-zinc-950 hover:bg-neutral-100 border-transparent'
                : 'bg-stone-950 text-white hover:bg-stone-850 border-transparent'
            }`}
            aria-label={`Open shopping cart detailing ${cartCount} elements`}
          >
            <ShoppingBag className="w-4 h-4" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-white text-[9px] font-bold font-mono rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>

      </div>
    </header>
  );
}
