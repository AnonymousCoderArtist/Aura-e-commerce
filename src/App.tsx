import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Mail, 
  Check, 
  ArrowRight, 
  HelpCircle, 
  Sparkles,
  RefreshCw,
  ShoppingBag,
  Star
} from 'lucide-react';
import { Product, CartItem, Order } from './types';
import { PRODUCTS } from './data';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import DCarousel from './components/DCarousel';
import Hero from './components/Hero';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Reviews from './components/Reviews';
import StudioLoader from './components/StudioLoader';
import HomeHero from './components/HomeHero';

export default function App() {
  // Loading status state
  const [isLoaded, setIsLoaded] = useState(false);

  // Global cart & currency states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY'>('USD');

  // Accessibility parameters
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState<'normal' | 'large' | 'extra'>('normal');
  const [darkMode, setDarkMode] = useState(true); // Premium dark museum atmosphere matches the high-end Codrops theme perfectly

  // Segment navigation state ('store' maps the Museum Catalog, 'carousel' the 3D rotating items, etc.)
  const [activeSegment, setActiveSegment] = useState<'store' | 'carousel' | 'hero' | 'reviews'>('store');

  // Inspect detailing modal and checkout statuses
  const [exploredProduct, setExploredProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter systems inside museum catalog space
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Sync high-contrast/text-scaling body classes onto the browser root window
  useEffect(() => {
    const root = document.documentElement;
    
    // Manage high contrast styling
    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    // Manage text scale parameters
    root.classList.remove('text-base', 'text-lg', 'text-xl');
    if (textScale === 'normal') {
      root.classList.add('text-base');
    } else if (textScale === 'large') {
      root.classList.add('text-lg');
    } else if (textScale === 'extra') {
      root.classList.add('text-xl');
    }
  }, [highContrast, textScale]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Look for identical products with exact matching color/size selections
      const existingIdx = prev.findIndex(
        i => i.product.id === item.product.id && 
             i.selectedColor.name === item.selectedColor.name &&
             i.selectedSize === item.selectedSize
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity = Math.min(item.product.stock, copy[existingIdx].quantity + item.quantity);
        return copy;
      }
      return [...prev, item];
    });
  };

  const handleUpdateCartQty = (index: number, newQty: number) => {
    setCartItems(prev => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index].quantity = newQty;
      }
      return copy;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleOrderComplete = (order: Order) => {
    // Purge cart elements on order finalization
    setCartItems([]);
  };

  // Newsletter submission
  const handleSubscribeMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  // Category list compute
  const categories = ['all', ...Array.from(new Set(PRODUCTS.map(p => p.category.toLowerCase())))];

  // Filtering products computation
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    
    const activePrice = product.discountPrice || product.price;
    const matchesPrice = activePrice <= maxPrice;

    return matchesSearch && matchesCat && matchesPrice;
  }).sort((a, b) => {
    const pA = a.discountPrice || a.price;
    const pB = b.discountPrice || b.price;

    if (sortBy === 'price-asc') return pA - pB;
    if (sortBy === 'price-desc') return pB - pA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured defaults to declaration sorted order
  });

  if (!isLoaded) {
    return <StudioLoader onComplete={() => setIsLoaded(true)} />;
  }

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 overflow-x-hidden ${
      darkMode ? 'bg-immersive-dark text-immersive-light dark-scrollbar' : 'bg-neutral-50/50 text-stone-900'
    }`}>
      
      {/* Luxury Global HUD Grid Backdrop */}
      <div className={`fixed inset-0 pointer-events-none opacity-[0.25] ${darkMode ? 'grid-bg-pattern-dark' : 'grid-bg-pattern'}`} />

      {/* Background Atmosphere Glows from Immersive UI */}
      {darkMode ? (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white opacity-[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#222] opacity-[0.05] rounded-full blur-[150px]" />
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px]" />
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px]" />
        </div>
      )}

      {/* Vertical Branding Rail from Immersive UI */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center opacity-10 pointer-events-none z-30 select-none">
        <div className="h-24 w-[1px] bg-current" />
        <div className="my-4 text-[9px] uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180 font-mono">Immersive Commerce</div>
        <div className="h-24 w-[1px] bg-current" />
      </div>

      {/* Main navigation */}
      <Navbar 
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        currency={currency}
        setCurrency={setCurrency}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        textScale={textScale}
        setTextScale={setTextScale}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSegment={activeSegment}
        setActiveSegment={setActiveSegment}
      />

      {/* Primary Structural Compartment Frame */}
      <main id="main-boutique-compartment" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Dynamic Space Layout */}
        <AnimatePresence mode="wait">
          
          {/* 1. MAIN MUSEUM INDEX SPACE */}
          {activeSegment === 'store' && (
            <motion.div
              key="space-store"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              
              {/* Luxury Intro Hero Segment */}
              <HomeHero
                products={PRODUCTS}
                currency={currency}
                onExplore={setExploredProduct}
                darkMode={darkMode}
              />

              {/* Advanced Access Filter Bar panel */}
              <div className={`p-6 rounded-3xl backdrop-blur-xl ${
                darkMode ? 'immersive-card-dark' : 'immersive-card-light'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Search input field */}
                  <div className="md:col-span-4 relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
                    <input
                      id="catalog-search-query"
                      type="text"
                      placeholder="Search design shapes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:ring-1 focus:ring-amber-500 outline-none ${
                        darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-neutral-50 border-neutral-300'
                      }`}
                    />
                  </div>

                  {/* Category Filter Pills scroll bar */}
                  <div className="md:col-span-5 flex overflow-x-auto space-x-2 py-1 scrollbar-none dark-scrollbar">
                    {categories.map((cat) => (
                      <button
                        id={`cat-filter-btn-${cat}`}
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider font-semibold border transition-all ${
                          selectedCategory === cat
                            ? 'bg-white text-black border-transparent shadow-md'
                            : darkMode
                              ? 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/20'
                              : 'bg-neutral-50 border-neutral-300 text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Pricing slider filters */}
                  <div className="md:col-span-3 flex flex-col space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span>Max Price:</span>
                      <strong className="text-stone-900 dark:text-neutral-200">${maxPrice}</strong>
                    </div>
                    <input
                      id="price-range-slider"
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-200 dark:bg-zinc-800 rounded appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                </div>

                {/* Sub Sorting row */}
                <div className="flex flex-wrap justify-between items-center pt-4 mt-4 border-t border-neutral-100 dark:border-white/10 text-xs">
                  <span className="text-neutral-400 font-mono text-[10px]">
                    Viewing {filteredProducts.length} of {PRODUCTS.length} limited creations
                  </span>

                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-400 font-mono text-[10px]">Sort:</span>
                    <select
                      id="catalog-sorting-select"
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] uppercase font-mono tracking-wider focus:ring-1 focus:ring-amber-500 outline-none ${
                        darkMode ? 'bg-black/60 border-white/10 text-white' : 'bg-neutral-50 border-neutral-300'
                      }`}
                    >
                      <option value="featured">Featured curated</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Review Index</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Primary grid containing Products */}
              {filteredProducts.length === 0 ? (
                <div className="p-16 rounded-[2.5rem] text-center border border-dashed border-neutral-300 dark:border-zinc-800">
                  <HelpCircle className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-lg">No Masterpieces Found</h3>
                  <p className="text-xs text-neutral-400 mt-2">Adjust your pricing slider or search terms to reveal shapes.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      currency={currency}
                      onExplore={setExploredProduct}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              )}

            </motion.div>
          )}

          {/* 2. 3D IMMERSIVE CAROUSEL SPACE */}
          {activeSegment === 'carousel' && (
            <motion.div
              key="space-carousel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <DCarousel
                products={PRODUCTS}
                currency={currency}
                onExplore={setExploredProduct}
                darkMode={darkMode}
              />
            </motion.div>
          )}

          {/* 3. CINEMATIC EXPLODED WATCH TOUR */}
          {activeSegment === 'hero' && (
            <motion.div
              key="space-hero"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.5 }}
            >
              <Hero
                product={PRODUCTS[0]} // Usually Onyx Chronometer
                currency={currency}
                onExplore={() => setExploredProduct(PRODUCTS[0])}
                darkMode={darkMode}
              />
            </motion.div>
          )}

          {/* 4. REVIEWS AND TESTIMONIALS */}
          {activeSegment === 'reviews' && (
            <motion.div
              key="space-reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <Reviews darkMode={darkMode} />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Global Boutique Footer */}
        <footer 
          id="global-editorial-footer"
          className={`border-t rounded-[3.5rem] p-12 md:p-16 ${
            darkMode ? 'bg-zinc-950 border-zinc-900 text-white' : 'bg-white border-neutral-200 text-stone-900'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 select-none">
            
            {/* Left section info */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex flex-col">
                <span className="font-display text-3xl font-black tracking-[0.3em]">A U R A</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.55em] text-amber-500 mt-1">Noir & Éther Studios</span>
              </div>
              
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-[340px]">
                Aura designs micro-mechanical sculptures and digital audio domes of high aesthetic contrast. Fully sustainable bio-infused graphite frames and mineral basalt stones.
              </p>

              {/* Physical retail locations */}
              <div className="space-y-2 pt-4">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-500">Museum Galleries</span>
                <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-neutral-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>Berlin Mitte</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>Tokyo Soho</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>Nolita NYC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Quick Sitemap Spaces */}
            <div className="md:col-span-3 space-y-4">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-500">Navigation Spaces</span>
              <ul className="space-y-3.5 text-xs text-neutral-400">
                {[
                  { id: 'store', label: 'Museum Catalog' },
                  { id: 'carousel', label: '3D Carousel View' },
                  { id: 'hero', label: 'Deconstruction Tour' },
                  { id: 'reviews', label: 'Testimonial Walls' }
                ].map((s) => (
                  <li key={s.id}>
                    <button
                      id={`footer-shortcut-${s.id}`}
                      onClick={() => {
                        setActiveSegment(s.id as any);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-amber-500 transition-colors uppercase tracking-wider text-[11px]"
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Newsletter Dispatch capturing */}
            <div className="md:col-span-4 space-y-4">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-500">Dispatch Dispatch</span>
              <p className="text-xs text-neutral-405 dark:text-neutral-400 font-light leading-relaxed">
                Receive confidential notifications regarding new limited additions and structural watch drops on active lists.
              </p>

              <form onSubmit={handleSubscribeMail} className="flex space-x-2">
                <input
                  id="newsletter-footer-input"
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className={`flex-grow px-4 py-2 rounded-xl text-xs border focus:ring-1 focus:ring-amber-500 outline-none ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-neutral-50 border-neutral-350 text-stone-930'
                  }`}
                />
                
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  aria-label="Subscribe to active list"
                  className="p-3 bg-stone-900 text-white dark:bg-white dark:text-stone-950 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-stone-950 rounded-xl transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <AnimatePresence>
                {newsletterSubscribed && (
                  <motion.p
                    id="newsletter-success-feedback"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-mono text-emerald-500 flex items-center col-span-2 pt-1"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    <span>Inscribed to secret newsletter list. Receipt pending.</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </div>

          <div className="border-t border-neutral-100 dark:border-zinc-900 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-neutral-400 space-y-4 sm:space-y-0 select-none">
            <span>© 2026 AURA International S.A. All rights reserved.</span>
            <span>Handmade by Google AI Studio Build</span>
          </div>
        </footer>

      </main>

      {/* DETAILED PARAMETERS CUSTOMIZER MODAL */}
      <ProductDetail
        key={exploredProduct ? exploredProduct.id : 'none'}
        product={exploredProduct!}
        isOpen={exploredProduct !== null}
        onClose={() => setExploredProduct(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
        darkMode={darkMode}
      />

      {/* FLOATING CART SIDEBAR */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        currency={currency}
        onBeginCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        darkMode={darkMode}
      />

      {/* FULL BILLING CHECKOUT SEQUENCE */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onOrderComplete={handleOrderComplete}
        darkMode={darkMode}
      />

    </div>
  );
}
