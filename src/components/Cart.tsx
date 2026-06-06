import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Award } from 'lucide-react';
import { CartItem } from '../types';
import { convertAndFormatPrice, CurrencyType } from '../utils';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  currency: CurrencyType;
  onBeginCheckout: () => void;
  darkMode: boolean;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  currency,
  onBeginCheckout,
  darkMode
}: CartProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0); // e.g. 10 for 10%
  const [promoError, setPromoError] = useState('');
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculative aggregates (prices initially in USD)
  const usdSubtotal = cartItems.reduce((acc, item) => {
    const rawPrice = item.product.discountPrice || item.product.price;
    return acc + (rawPrice * item.quantity);
  }, 0);

  const discountAmount = usdSubtotal * (discountPercent / 100);
  const discountedSubtotal = usdSubtotal - discountAmount;

  // Insured Carbon-neutral shipping: $25.00 USD, or FREE if subtotal above $1000
  const usdShipping = usdSubtotal > 1000 || usdSubtotal === 0 ? 0 : 25;
  
  // Tax 8.5%
  const usdTax = discountedSubtotal * 0.085;

  const usdTotal = discountedSubtotal + usdShipping + usdTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPromo = promoCode.trim().toUpperCase();
    if (cleanPromo === 'AURA10') {
      setDiscountPercent(10);
      setPromoError('');
      setShowPromoSuccess(true);
    } else {
      setPromoError('Invalid coupon code. Try "AURA10" instead.');
      setShowPromoSuccess(false);
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="cart-overlay-container"
        className="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading-title"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-950/45 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className={`w-screen max-w-md flex flex-col h-full shadow-2xl overflow-hidden border-l ${
              darkMode 
                ? 'bg-immersive-dark/95 border-white/5 text-white' 
                : 'bg-white border-neutral-150 text-stone-900'
            }`}
          >
            {/* Nav Header */}
            <div className="p-6 border-b border-neutral-100 dark:border-white/5 flex justify-between items-center bg-transparent">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-amber-500 animate-pulse" />
                <h3 
                  id="cart-heading-title"
                  className="font-display text-lg font-bold tracking-tight text-neutral-800 dark:text-neutral-100"
                >
                  Shopping Collection
                </h3>
                <span className="font-mono text-[10px] bg-neutral-100 dark:bg-zinc-900 px-2.5 py-0.5 rounded-full font-bold">
                  {cartItems.length}
                </span>
              </div>
              
              <button
                id="close-cart-sidebar"
                onClick={onClose}
                aria-label="Close cart"
                className={`p-2 rounded-full border transition-colors ${
                  darkMode 
                    ? 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5' 
                    : 'border-neutral-200 text-neutral-500 hover:text-stone-900 hover:bg-neutral-50'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Elements Scroll container */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 dark-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center p-8 select-none">
                  <div className="w-20 h-20 rounded-full bg-neutral-50 dark:bg-white/[0.02] flex items-center justify-center mb-4 border border-dashed border-neutral-200 dark:border-white/10">
                    <ShoppingBag className="w-8 h-8 text-neutral-300" />
                  </div>
                  <h4 className="font-display font-semibold mb-2">Architectural Empty State</h4>
                  <p className="text-xs text-neutral-400 max-w-[240px] leading-relaxed">
                    You have not curated any luxury items in your archive bag yet. Explore the design room catalog to add one.
                  </p>
                  <button
                    id="find-masterpiece-btn"
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shadow-lg"
                  >
                    View Masterpieces
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => {
                  const productPrice = item.product.discountPrice || item.product.price;
                  return (
                    <motion.div
                      id={`cart-item-${item.product.id}`}
                      key={`${item.product.id}-${index}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`p-4 rounded-2xl flex space-x-4 relative transition-all shadow-sm ${
                        darkMode 
                          ? 'immersive-card-dark text-white' 
                          : 'bg-neutral-50/50 border border-neutral-100 hover:border-neutral-200'
                      }`}
                    >
                      {/* Thumbnail frame */}
                      <div className="w-20 h-20 rounded-xl bg-white dark:bg-zinc-950 p-2 flex items-center justify-center border dark:border-white/10 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details row */}
                      <div className="flex-grow min-w-0 pr-4">
                        <h4 className="font-display text-sm font-bold truncate text-neutral-900 dark:text-white">
                          {item.product.name}
                        </h4>
                        
                        {/* Specifications selections label */}
                        <div className="flex flex-wrap gap-1.5 items-center mt-1">
                          <span className="text-[9px] font-mono bg-stone-900/10 text-stone-850 dark:bg-white/10 dark:text-zinc-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                            {item.selectedColor.name}
                          </span>
                          
                          {item.selectedSize && (
                            <span className="text-[9px] font-mono bg-stone-900/10 text-stone-850 dark:bg-white/10 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                              {item.selectedSize}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          
                          {/* Mini quantity editor */}
                          <div className="flex items-center rounded-lg border border-neutral-200 dark:border-white/10">
                            <button
                              id={`qty-dec-${index}`}
                              onClick={() => onUpdateQty(index, Math.max(1, item.quantity - 1))}
                              aria-label="Decrease quantity"
                              className="px-2 py-0.5 text-xs hover:text-amber-500 font-bold focus:outline-none"
                            >
                              -
                            </button>
                            <span className="px-2 text-[10px] font-mono font-bold">{item.quantity}</span>
                            <button
                              id={`qty-inc-${index}`}
                              onClick={() => onUpdateQty(index, Math.min(item.product.stock, item.quantity + 1))}
                              aria-label="Increase quantity"
                              className="px-2 py-0.5 text-xs hover:text-amber-500 font-bold focus:outline-none"
                            >
                              +
                            </button>
                          </div>

                          {/* Line total price */}
                          <span className="text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                            {convertAndFormatPrice(productPrice * item.quantity, currency)}
                          </span>

                        </div>
                      </div>

                      {/* Trash action */}
                      <button
                        id={`cart-trash-${index}`}
                        onClick={() => onRemoveItem(index)}
                        aria-label={`Remove ${item.product.name} from collection`}
                        className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
                          darkMode ? 'text-neutral-400 hover:text-rose-400' : 'text-neutral-400 hover:text-rose-500'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Price Calculations and checkout */}
            {cartItems.length > 0 && (
              <div className={`p-6 border-t font-sans ${
                darkMode ? 'border-white/5 bg-immersive-dark' : 'border-neutral-100 bg-neutral-50/20'
              }`}>
                {/* Coupon Code section */}
                <form onSubmit={handleApplyPromo} className="flex space-x-2 mb-4">
                  <div className="relative flex-grow">
                    <input
                      id="promo-code-input"
                      type="text"
                      placeholder="Promo (AURA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none uppercase font-mono tracking-widest ${
                        darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-neutral-250 text-stone-900'
                      }`}
                    />
                    <Tag className="w-3.5 h-3.5 absolute right-3 top-2.5 text-neutral-400" />
                  </div>
                  <button
                    id="apply-promo-btn"
                    type="submit"
                    className="px-4 bg-stone-900 text-white dark:bg-white dark:text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Apply
                  </button>
                </form>

                {/* Promo Error or Success Feedback feedback */}
                {promoError && <p id="promo-error-msg" className="text-[10px] text-rose-500 font-mono mb-3">{promoError}</p>}
                {showPromoSuccess && (
                  <div id="promo-success-alert" className="flex items-center space-x-1.5 text-emerald-500 text-[10px] font-mono mb-3">
                    <Check className="w-3.5 h-3.5" />
                    <span>AURA10 Authenticated! 10% markdown applied.</span>
                  </div>
                )}

                {/* Computational list block */}
                <div className="space-y-2 mb-4 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                  <div className="flex justify-between">
                    <span>Base Subtotal</span>
                    <span>{convertAndFormatPrice(usdSubtotal, currency)}</span>
                  </div>
                  
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-500 font-semibold">
                      <span>Interactive Markdown ({discountPercent}%)</span>
                      <span>-{convertAndFormatPrice(discountAmount, currency)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      Insured Secure Courier
                      <Award className="w-3 h-3 text-amber-500" />
                    </span>
                    <span>{usdShipping === 0 ? 'FREE' : convertAndFormatPrice(usdShipping, currency)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Regulatory Tax (8.5%)</span>
                    <span>{convertAndFormatPrice(usdTax, currency)}</span>
                  </div>

                  <div className="border-t border-neutral-100 dark:border-white/10 pt-3 flex justify-between text-sm font-semibold text-neutral-800 dark:text-white">
                    <span>Aggregate Total</span>
                    <span>{convertAndFormatPrice(usdTotal, currency)}</span>
                  </div>
                </div>

                {/* Launch checkout flow action */}
                <button
                  id="cart-checkout-proceed-btn"
                  onClick={onBeginCheckout}
                  className={`w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2 shadow-lg ${
                    darkMode 
                      ? 'bg-white text-stone-950 hover:bg-neutral-100' 
                      : 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-amber-500/10'
                  }`}
                >
                  <span>Initiate Insured Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
