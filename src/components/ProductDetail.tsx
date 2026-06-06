import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Check, ShoppingBag, Ruler, Award, RefreshCw, Undo2, Heart } from 'lucide-react';
import { Product, CartItem, Review } from '../types';
import { convertAndFormatPrice, CurrencyType } from '../utils';

interface ProductDetailProps {
  key?: string;
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyType;
  onAddToCart: (item: CartItem) => void;
  darkMode: boolean;
}

export default function ProductDetail({
  product,
  isOpen,
  onClose,
  currency,
  onAddToCart,
  darkMode
}: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'reflections'>('info');
  const [isAdded, setIsAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  // Custom user-input reviews state
  const [localReviews, setLocalReviews] = useState<Review[]>(product?.reviews || []);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart({
      product,
      selectedColor,
      selectedSize,
      quantity
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newReviewItem: Review = {
      id: `local-rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment,
      isVerified: true
    };

    setLocalReviews([newReviewItem, ...localReviews]);
    setNewAuthor('');
    setNewRating(5);
    setNewComment('');
    setShowReviewForm(false);
  };

  return (
    <AnimatePresence>
      <div 
        id="product-detail-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-8 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
        />

        {/* Modal Sheet body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className={`relative w-full max-w-5xl rounded-[2.5rem] shadow-2xl z-10 overflow-hidden backdrop-blur-xl border ${
            darkMode 
              ? 'immersive-card-dark text-white' 
              : 'immersive-card-light text-stone-900'
          }`}
        >
          
          {/* Close button */}
          <button
            id="close-detail-modal-btn"
            onClick={onClose}
            aria-label="Close details"
            className={`absolute top-6 right-6 z-20 p-3 rounded-full border transition-all ${
              darkMode 
                ? 'bg-zinc-850 hover:bg-neutral-100 hover:text-zinc-950 border-zinc-800 text-neutral-400' 
                : 'bg-neutral-50 hover:bg-stone-950 hover:text-white border-neutral-200 text-neutral-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">

            {/* Left Image Show gallery area */}
            <div className={`p-8 flex flex-col justify-between items-center relative ${
              darkMode ? 'bg-black/30' : 'bg-neutral-50/40'
            }`}>
              
              {/* Product background glow design aspect */}
              <div className="absolute inset-0 transition-opacity pointer-events-none opacity-20">
                <div className={`absolute inset-12 bg-gradient-to-tr ${product.gradient3D} rounded-full blur-3xl`} />
              </div>

              {/* Tag indicator */}
              <div className="w-full flex justify-between items-center z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
                  {product.category}
                </span>
                
                <button
                  id="add-wishlist-btn"
                  onClick={() => setWishlist(!wishlist)}
                  className={`p-2 rounded-full border transition-colors ${
                    wishlist 
                      ? 'bg-rose-500/10 border-rose-500 text-rose-500' 
                      : darkMode ? 'border-zinc-800 hover:border-zinc-650' : 'border-neutral-200 hover:border-neutral-350'
                  }`}
                  aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${wishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Main Center product focal showcase */}
              <div className="relative w-4/5 aspect-square my-auto flex items-center justify-center z-10">
                <motion.img
                  layoutId={`product-image-${product.id}`}
                  src={product.images[0]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-3xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Informative service values footer */}
              <div className="w-full grid grid-cols-3 gap-2 text-center border-t border-neutral-100 dark:border-zinc-800 pt-6 mt-4 z-10">
                <div className="flex flex-col items-center">
                  <Award className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="text-[9px] uppercase tracking-wider font-semibold">2Y Warranty</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCw className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="text-[9px] uppercase tracking-wider font-semibold">Free Insured</span>
                </div>
                <div className="flex flex-col items-center">
                  <Undo2 className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="text-[9px] uppercase tracking-wider font-semibold">30D Returns</span>
                </div>
              </div>

            </div>

            {/* Right Information detail panel */}
            <div className="p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[92vh] border-l dark:border-white/10">
              
              {/* Product main headers */}
              <div className="space-y-3 mb-6">
                <div>
                  <h2 
                    id="detail-modal-title"
                    className="font-display text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-white"
                  >
                    {product.name}
                  </h2>
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-1">
                    {product.subtitle}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Rating summary */}
                  <div className="flex items-center space-x-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-500">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {localReviews.length} Verified Reflections
                  </span>
                </div>

                {/* Price tag */}
                <div id="detail-modal-pricing">
                  {product.discountPrice ? (
                    <div className="flex items-baseline space-x-3">
                      <span className="text-2xl font-mono font-bold text-stone-900 dark:text-white">
                        {convertAndFormatPrice(product.discountPrice, currency)}
                      </span>
                      <span className="text-sm font-mono text-neutral-400 line-through">
                        {convertAndFormatPrice(product.price, currency)}
                      </span>
                      <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-mono font-bold uppercase">
                        Save {convertAndFormatPrice(product.price - product.discountPrice, currency)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-mono font-bold text-stone-900 dark:text-white">
                      {convertAndFormatPrice(product.price, currency)}
                    </span>
                  )}
                </div>
              </div>

              {/* Informational Tabs navigation */}
              <div className="flex space-x-6 border-b border-neutral-100 dark:border-white/10 mb-6">
                {(['info', 'specs', 'reflections'] as const).map((tab) => (
                  <button
                    id={`detail-tab-${tab}`}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-3 text-xs uppercase tracking-widest font-semibold transition-colors focus:outline-none ${
                      activeTab === tab 
                        ? 'text-amber-500' 
                        : 'text-neutral-400 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    {tab === 'info' ? 'Story' : tab === 'specs' ? 'Engineering' : 'Reflections'}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeDetailUnderline" 
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" 
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Bodies */}
              <div className="flex-grow min-h-[180px] mb-6">
                
                {/* 1. STORY / INFO TAB */}
                {activeTab === 'info' && (
                  <div className="space-y-4 font-light text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    <p>{product.description}</p>
                    <div className="space-y-2 pt-2">
                      <h4 className="font-display font-bold text-xs uppercase tracking-widest text-stone-850 dark:text-neutral-200">
                        Signature Capabilities
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start text-xs text-neutral-500 dark:text-neutral-400">
                            <span className="text-amber-500 mr-2 font-bold">•</span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 2. SPECIFICATIONS TAB */}
                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <div 
                        key={index}
                        className="flex justify-between py-2 border-b border-neutral-100 dark:border-white/10 text-xs text-stone-800 dark:text-neutral-300 font-mono"
                      >
                        <span className="text-neutral-400">{spec.label}</span>
                        <span className="font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. REFLECTIONS / REVIEWS TAB */}
                {activeTab === 'reflections' && (
                  <div className="space-y-4">
                    {/* Add Review Trigger */}
                    {!showReviewForm ? (
                      <button
                        id="add-review-btn-trigger"
                        onClick={() => setShowReviewForm(true)}
                        className="w-full py-2.5 rounded-xl border border-dashed border-amber-500/40 hover:border-amber-500/80 text-xs font-semibold text-amber-500 uppercase tracking-widest hover:bg-amber-500/5 transition-all focus:outline-none"
                      >
                        Pen a reflection
                      </button>
                    ) : (
                      <form onSubmit={handleAddReviewSubmit} className="space-y-3 border border-neutral-100 dark:border-white/10 p-4 rounded-xl">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            id="review-author-input"
                            type="text"
                            placeholder="Your Name (e.g., Jean P.)"
                            required
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            className={`px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none ${
                              darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-200'
                            }`}
                          />
                          <div className="flex items-center space-x-1 justify-end">
                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mr-2">Stars:</span>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewRating(star)}
                                className="focus:outline-none"
                              >
                                <Star className={`w-3.5 h-3.5 ${
                                  star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-neutral-300 dark:text-zinc-700'
                                }`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        <textarea
                          id="review-comment-textarea"
                          placeholder="Frictional, acoustic, and aesthetic remarks of your purchase..."
                          rows={3}
                          required
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none ${
                            darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-200'
                          }`}
                        />

                        <div className="flex justify-end space-x-2 text-xs pt-1">
                          <button
                            id="review-form-cancel"
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="px-4 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 dark:border-zinc-800 dark:hover:bg-zinc-800 uppercase text-[10px] tracking-wider"
                          >
                            Cancel
                          </button>
                          <button
                            id="review-form-submit"
                            type="submit"
                            className="px-4 py-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 font-semibold uppercase text-[10px] tracking-wider"
                          >
                            Post Review
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                      {localReviews.length === 0 ? (
                        <p className="text-xs text-neutral-400 text-center py-6">No custom reviews written yet.</p>
                      ) : (
                        localReviews.map((rev) => (
                          <div 
                            key={rev.id} 
                            className={`p-3.5 rounded-2xl border ${
                              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-neutral-50/70 border-neutral-100'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold font-mono">{rev.author}</span>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${
                                      i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-200 dark:text-zinc-850'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light italic leading-relaxed">
                              "{rev.comment}"
                            </p>
                            <div className="flex items-center justify-between mt-2.5 text-[9px] font-mono text-neutral-400">
                              <span>{rev.date}</span>
                              {rev.isVerified && <span className="text-emerald-500 flex items-center"><Check className="w-3 h-3 mr-0.5" /> Verified purchase</span>}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Customizing Actions Tray */}
              <div className="space-y-5 border-t border-neutral-100 dark:border-zinc-800 pt-6">
                
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Color variations customizer */}
                  <div>
                    <label id="color-choice-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Finish Option
                    </label>
                    <div className="flex space-x-3 items-center">
                      {product.colors.map((color) => {
                        const isSelected = selectedColor.name === color.name;
                        return (
                          <button
                            id={`color-opt-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                            key={color.name}
                            onClick={() => setSelectedColor(color)}
                            aria-label={`Select finish color ${color.name}`}
                            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                              isSelected 
                                ? 'ring-2 ring-amber-500 border-transparent scale-110' 
                                : 'border-neutral-300 dark:border-zinc-700 hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.hex }}
                          >
                            {isSelected && (
                              <Check className={`w-3.5 h-3.5 ${
                                color.hex === '#f0ede1' || color.hex === '#eceef2' || color.hex === '#f2f3f5' || color.hex === '#cfd2d6'
                                  ? 'text-stone-900' 
                                  : 'text-white'
                              }`} />
                            )}
                          </button>
                        );
                      })}
                      <span className="text-xs font-mono font-medium truncate max-w-[80px]">
                        {selectedColor.name}
                      </span>
                    </div>
                  </div>

                  {/* Size adjustments */}
                  {product.sizes && (
                    <div>
                      <label id="size-choice-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        Circumference
                      </label>
                      <div className="flex space-x-2">
                        {product.sizes.map((sz) => {
                          const isSelected = selectedSize === sz;
                          return (
                            <button
                              id={`size-opt-${sz}`}
                              key={sz}
                              onClick={() => setSelectedSize(sz)}
                              aria-label={`Set size to ${sz}`}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono border font-semibold transition-all ${
                                isSelected
                                  ? 'bg-stone-900 text-white border-stone-900 dark:bg-white dark:text-stone-950 dark:border-white'
                                  : 'bg-transparent text-neutral-500 border-neutral-200 dark:border-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-850'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Quantity and Primary action bag add button */}
                <div className="flex items-center space-x-4 pt-1">
                  
                  {/* Quantity adjustment */}
                  <div className={`flex items-center rounded-xl border p-1 ${
                    darkMode ? 'bg-black/40 border-white/10' : 'bg-neutral-50 border-neutral-200/80'
                  }`}>
                    <button
                      id="qty-decrement-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="p-1 px-2.5 text-sm font-semibold hover:text-amber-500 focus:outline-none"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono font-bold leading-none">{quantity}</span>
                    <button
                      id="qty-increment-btn"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      aria-label="Increase quantity"
                      className="p-1 px-2.5 text-sm font-semibold hover:text-amber-500 focus:outline-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Add action */}
                  <button
                    id="add-to-cart-action-btn"
                    onClick={handleAddToCart}
                    aria-label={`Add ${quantity} units to cart`}
                    className={`flex-grow py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg focus:outline-none ${
                      isAdded 
                        ? 'bg-emerald-500 text-white shadow-emerald-500/10' 
                        : darkMode
                          ? 'bg-white text-black hover:bg-white/90 shadow-white/5'
                          : 'bg-stone-950 hover:bg-stone-850 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Masterpiece Secured</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Archive</span>
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
