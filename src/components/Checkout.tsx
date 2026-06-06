import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Truck, CheckCircle2, ShoppingBag, X, Calendar, Lock, Sparkles, ChevronRight, Package, Ship, Clock } from 'lucide-react';
import { CartItem, Order } from '../types';
import { convertAndFormatPrice, CurrencyType } from '../utils';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: CurrencyType;
  onOrderComplete: (order: Order) => void;
  darkMode: boolean;
}

export default function Checkout({
  isOpen,
  onClose,
  cartItems,
  currency,
  onOrderComplete,
  darkMode
}: CheckoutProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Delivery, 2: Payment, 3: Completed Tracking Tracker

  // Step 1 values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  // Step 2 values
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Completed simulated order details
  const [finalOrder, setFinalOrder] = useState<Order | null>(null);
  const [trackingStep, setTrackingStep] = useState<0 | 1 | 2 | 3>(0);

  if (!isOpen) return null;

  // Pricing values (USD standard logic initially)
  const usdSubtotal = cartItems.reduce((acc, item) => {
    const rawPrice = item.product.discountPrice || item.product.price;
    return acc + (rawPrice * item.quantity);
  }, 0);

  const usdShipping = usdSubtotal > 1000 ? 0 : 25;
  const usdTax = usdSubtotal * 0.085;
  const usdTotal = usdSubtotal + usdShipping + usdTax;

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !address.trim() || !city.trim() || !zip.trim()) return;
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || !cardExpiry.trim() || !cardCVV.trim()) return;

    // Mask card digits
    const masked = `•••• •••• •••• ${cardNumber.slice(-4) || '4242'}`;

    const orderMeta: Order = {
      id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cartItems],
      subtotal: usdSubtotal,
      shipping: usdShipping,
      tax: usdTax,
      total: usdTotal,
      customerName: name,
      email: email,
      address: address,
      city: city,
      zipCode: zip,
      cardNumberMasked: masked,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'processing'
    };

    setFinalOrder(orderMeta);
    setStep(3);
    onOrderComplete(orderMeta);

    // Simulate ticking of tracking progress milestones over time
    const tracker1 = setTimeout(() => setTrackingStep(1), 3500);
    const tracker2 = setTimeout(() => setTrackingStep(2), 7000);
    const tracker3 = setTimeout(() => setTrackingStep(3), 11000);

    return () => {
      clearTimeout(tracker1);
      clearTimeout(tracker2);
      clearTimeout(tracker3);
    };
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card input blocks of 4
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 2) {
      setCardExpiry(`${value.substring(0, 2)}/${value.substring(2, 4)}`);
    } else {
      setCardExpiry(value);
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardCVV(value);
  };

  return (
    <AnimatePresence>
      <div 
        id="checkout-overlay-wrapper"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-8 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-dialog-header"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 3 ? undefined : onClose} // Don't let users snap close during completed status timeline
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className={`relative w-full max-w-4xl rounded-[2.5rem] shadow-2xl z-10 overflow-hidden backdrop-blur-xl border ${
            darkMode 
              ? 'immersive-card-dark text-white' 
              : 'immersive-card-light text-stone-900'
          }`}
        >
          
          {/* Close button (disabled in final tracking view to ensure reading receipt) */}
          {step !== 3 && (
            <button
              id="close-checkout-modal-btn"
              onClick={onClose}
              aria-label="Cancel checkout"
              className={`absolute top-6 right-6 z-20 p-3 rounded-full border transition-all ${
                darkMode 
                  ? 'bg-zinc-850 hover:bg-neutral-100 hover:text-zinc-950 border-zinc-800 text-neutral-400' 
                  : 'bg-neutral-50 hover:bg-stone-950 hover:text-white border-neutral-200 text-neutral-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">

            {/* Left informational cart preview panel */}
            <div className={`md:col-span-4 p-8 flex flex-col justify-between ${
              darkMode ? 'bg-black/30 border-r border-white/5' : 'bg-neutral-50/40 border-r border-neutral-200'
            }`}>
              
              <div className="select-none">
                <span className="text-[9px] uppercase tracking-[0.35em] text-amber-500 font-bold mb-3 block">
                  Archive Checkout
                </span>
                <h3 id="checkout-dialog-header" className="font-display text-lg font-bold tracking-tight mb-6">
                  Order Summary
                </h3>

                {/* Items previews list */}
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 dark-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 text-xs">
                      <div className="w-12 h-12 rounded-lg bg-white dark:bg-zinc-950 p-1 flex items-center justify-center border dark:border-white/10 flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-semibold truncate">{item.product.name}</h4>
                        <p className="text-[10px] font-mono text-neutral-400">
                          {item.quantity}x {item.selectedColor.name}
                        </p>
                      </div>
                      <span className="font-mono font-medium text-neutral-500 dark:text-neutral-300">
                        {convertAndFormatPrice((item.product.discountPrice || item.product.price) * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total tallies */}
              <div className="border-t border-neutral-200 dark:border-white/10 pt-6 mt-6 font-mono text-xs text-neutral-500 dark:text-neutral-400 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{convertAndFormatPrice(usdSubtotal, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Carriage</span>
                  <span>{usdShipping === 0 ? 'FREE' : convertAndFormatPrice(usdShipping, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Regulatory Tax (8.5%)</span>
                  <span>{convertAndFormatPrice(usdTax, currency)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-stone-900 dark:text-white pt-2 border-t border-neutral-150 dark:border-white/10">
                  <span>Total Due</span>
                  <span>{convertAndFormatPrice(usdTotal, currency)}</span>
                </div>
              </div>

            </div>

            {/* Right form input processes */}
            <div className="md:col-span-8 p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[92vh]">
              
              {/* Progress Stepper milestones */}
              {step !== 3 && (
                <div className="flex items-center space-x-4 mb-8 select-none">
                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      step === 1 ? 'bg-amber-500 text-stone-950 font-black' : 'bg-emerald-500 text-white'
                    }`}>
                      {step === 2 ? '✓' : '1'}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold ${
                      step === 1 ? 'text-stone-900 dark:text-white' : 'text-neutral-400'
                    }`}>Carriage Delivery</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      step === 2 ? 'bg-amber-500 text-stone-950 font-black' : 'bg-neutral-100 dark:bg-white/5 text-neutral-400'
                    }`}>
                      2
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold ${
                      step === 2 ? 'text-stone-900 dark:text-white' : 'text-neutral-400'
                    }`}>Secured Payment</span>
                  </div>
                </div>
              )}

              {/* Step Forms rendering */}
              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: CARRIAGE DETAILS */}
                  {step === 1 && (
                    <motion.form
                      key="step1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onSubmit={handleDeliverySubmit}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 mb-2 select-none">
                        <Truck className="w-5 h-5 text-amber-500" />
                        <h4 className="font-display font-bold text-base">Insured Carriage Delivery Information</h4>
                      </div>

                      <div className="space-y-3 font-sans">
                        <div>
                          <label id="full-name-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                            Full Name
                          </label>
                          <input
                            id="checkout-name-input"
                            type="text"
                            required
                            placeholder="Arthur Pendelton"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs ${
                              darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label id="email-address-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                            Email Address (Invoice dispatch)
                          </label>
                          <input
                            id="checkout-email-input"
                            type="email"
                            required
                            placeholder="arthur@pendelton.co"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs ${
                              darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label id="street-address-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                            Street Address
                          </label>
                          <input
                            id="checkout-address-input"
                            type="text"
                            required
                            placeholder="14 Avant-Garde Boulevard, Studio 4"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs ${
                              darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label id="city-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                              City / Region
                            </label>
                            <input
                              id="checkout-city-input"
                              type="text"
                              required
                              placeholder="Berlin"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs ${
                                darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                              }`}
                            />
                          </div>

                          <div>
                            <label id="postal-zip-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                              Postal / ZIP Code
                            </label>
                            <input
                              id="checkout-zip-input"
                              type="text"
                              required
                              placeholder="10115"
                              value={zip}
                              onChange={(e) => setZip(e.target.value)}
                              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs ${
                                darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        id="checkout-step1-submit"
                        type="submit"
                        className="w-full mt-6 py-4 bg-stone-900 text-white dark:bg-white dark:text-stone-950 rounded-xl text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                      >
                        <span>Proceed To Secured Payment</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.form>
                  )}

                  {/* STEP 2: SECURED PAYMENT CARDS & 3D ROTATE CVV FLIPPING */}
                  {step === 2 && (
                    <motion.form
                      key="step2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onSubmit={handlePaymentSubmit}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-2 select-none">
                        <CreditCard className="w-5 h-5 text-amber-500" />
                        <h4 className="font-display font-bold text-base">Secured Credit Card Billing Gateway</h4>
                      </div>

                      {/* Interactive 3D physical Card widget */}
                      <div className="perspective-1000 w-full flex justify-center py-2 select-none">
                        <motion.div
                          animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                          className="relative w-full max-w-[340px] aspect-[1.586/1] preserve-3d"
                        >
                          {/* Card Face FRONT side */}
                          <div className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between backface-hidden shadow-xl border ${
                            darkMode 
                              ? 'bg-gradient-to-tr from-neutral-800 to-zinc-900 text-white border-zinc-750' 
                              : 'bg-gradient-to-tr from-stone-900 to-neutral-850 text-white border-stone-800'
                          }`}>
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-mono tracking-[0.2em] font-medium opacity-65">AURA CARTE</span>
                              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                            </div>

                            <div className="font-mono text-base tracking-[0.15em] font-bold py-2">
                              {cardNumber || '•••• •••• •••• 4242'}
                            </div>

                            <div className="flex justify-between items-end font-mono text-[10px] uppercase">
                              <div className="max-w-[70%]">
                                <span className="opacity-50 block text-[8px] mb-0.5">Holder</span>
                                <span className="font-bold truncate block">{cardHolder || 'Arthur Pendelton'}</span>
                              </div>
                              <div>
                                <span className="opacity-50 block text-[8px] mb-0.5">Expiry</span>
                                <span className="font-bold text-right block">{cardExpiry || '12/28'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card Face BACK side */}
                          <div className={`absolute inset-0 rounded-2xl flex flex-col justify-between backface-hidden shadow-xl border p-6 bg-gradient-to-tr from-stone-905 to-neutral-850 text-white border-stone-800`}
                               style={{ transform: 'rotateY(180deg)' }}>
                            <div className="w-full h-8 bg-black -mx-6 mt-1" />
                            <div className="flex justify-end items-center space-x-3 text-right">
                              <span className="text-[8px] font-mono opacity-50 uppercase">CVV Strip</span>
                              <div className="bg-white text-stone-900 font-mono px-3 py-1.5 rounded text-xs tracking-widest font-bold">
                                {cardCVV || '•••'}
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-[8px] font-mono opacity-40">
                              <span>Secure Signature Room</span>
                              <span>ATM Global Cert.</span>
                            </div>
                          </div>

                        </motion.div>
                      </div>

                      <div className="space-y-4 font-sans text-xs">
                        <div>
                          <label id="card-holder-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            id="payment-holder-input"
                            type="text"
                            required
                            placeholder="Arthur Pendelton"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            onFocus={() => setIsCardFlipped(false)}
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs ${
                              darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label id="card-number-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                            Credit Card Number
                          </label>
                          <input
                            id="payment-number-input"
                            type="text"
                            required
                            placeholder="4242 4242 4242 4242"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            onFocus={() => setIsCardFlipped(false)}
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs font-mono tracking-wider ${
                              darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label id="card-expiry-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-amber-500" />
                              Expiry (MM/YY)
                            </label>
                            <input
                              id="payment-expiry-input"
                              type="text"
                              required
                              placeholder="12/28"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              onFocus={() => setIsCardFlipped(false)}
                              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs font-mono ${
                                darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                              }`}
                            />
                          </div>

                          <div>
                            <label id="card-cvv-label" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-amber-500" />
                              CVV Security Code
                            </label>
                            <input
                              id="payment-cvv-input"
                              type="password"
                              required
                              placeholder="•••"
                              value={cardCVV}
                              onChange={handleCVVChange}
                              onFocus={() => setIsCardFlipped(true)}
                              onBlur={() => setIsCardFlipped(false)}
                              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none text-xs font-mono ${
                                darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-250 text-stone-900'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-6">
                        <button
                          id="payment-back-btn"
                          type="button"
                          onClick={() => setStep(1)}
                          className={`w-1/3 py-4 rounded-xl border transition-all text-xs font-bold uppercase tracking-wider ${
                            darkMode 
                              ? 'border-white/10 text-neutral-400 hover:bg-white/5' 
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          Back
                        </button>
                        <button
                          id="submit-secured-payment"
                          type="submit"
                          className={`flex-grow py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2 ${
                            darkMode 
                              ? 'bg-white text-stone-950 hover:bg-neutral-100 shadow-white/5' 
                              : 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-amber-500/10'
                          }`}
                        >
                          <span>Pay {convertAndFormatPrice(usdTotal, currency)}</span>
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* STEP 3: ORDER COMPLETED RECEIPT & PROGRESS TIMELINE */}
                  {step === 3 && finalOrder && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 text-center"
                    >
                      <div className="flex flex-col items-center select-none">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h4 className="font-display font-bold text-xl tracking-tight">Order Authenticated!</h4>
                        <p className="text-xs text-neutral-400 mt-1 font-mono uppercase tracking-widest">
                          Receipt ID: {finalOrder.id}
                        </p>
                      </div>

                      {/* Receipt paper graphic */}
                      <div className={`p-6 rounded-2xl border text-left space-y-4 text-xs font-mono select-none ${
                        darkMode ? 'bg-black/40 border-white/10' : 'bg-neutral-50 border-neutral-200'
                      }`}>
                        <div className="border-b border-dashed border-neutral-300 dark:border-white/5 pb-3 flex justify-between">
                          <span>Date Purchased:</span>
                          <strong>{finalOrder.date}</strong>
                        </div>
                        <div className="border-b border-dashed border-neutral-300 dark:border-white/5 pb-3 flex justify-between">
                          <span>Consignee:</span>
                          <strong>{finalOrder.customerName}</strong>
                        </div>
                        <div className="border-b border-dashed border-neutral-300 dark:border-white/5 pb-3 space-y-1">
                          <span className="block opacity-55">Destination Address:</span>
                          <strong className="block">{finalOrder.address}, {finalOrder.city} - {finalOrder.zipCode}</strong>
                        </div>
                        <div className="pb-1 flex justify-between">
                          <span>Settled via:</span>
                          <strong>{finalOrder.cardNumberMasked}</strong>
                        </div>
                      </div>

                      {/* Interactive Logistics milestone timeline */}
                      <div className="pt-4 text-left font-sans select-none">
                        <h5 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-amber-500" />
                          Insured Delivery Life Progress Status
                        </h5>

                        <div className="relative pl-6 space-y-6 border-l border-neutral-350 dark:border-white/5 ml-3">
                          
                          {/* Mile 0 */}
                          <div className="relative">
                            <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white ring-4 ring-white dark:ring-zinc-900 border border-emerald-600">
                              ✓
                            </span>
                            <div className="text-xs">
                              <h6 className="font-bold text-stone-900 dark:text-white">Order Vaulted</h6>
                              <p className="text-neutral-500 dark:text-neutral-400 text-[10px] font-light">Custom specifications logged inside archive vaults.</p>
                            </div>
                          </div>

                          {/* Mile 1 */}
                          <div className="relative">
                            <span className={`absolute -left-[30px] top-1 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-zinc-900 border ${
                              trackingStep >= 1 ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-amber-500 animate-pulse text-stone-950 border-amber-600'
                            }`}>
                              {trackingStep >= 1 ? '✓' : '•'}
                            </span>
                            <div className="text-xs">
                              <h6 className={`font-bold ${trackingStep >= 1 ? 'text-stone-900 dark:text-white' : 'text-neutral-400'}`}>
                                Quality Securing and Polishing
                              </h6>
                              <p className="text-neutral-500 dark:text-neutral-400 text-[10px] font-light">
                                Microscopic cleaning and laser calibrations checked by master watchmakers.
                              </p>
                            </div>
                          </div>

                          {/* Mile 2 */}
                          <div className="relative">
                            <span className={`absolute -left-[30px] top-1 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-zinc-900 border ${
                              trackingStep >= 2 ? 'bg-emerald-500 text-white border-emerald-600' : trackingStep === 1 ? 'bg-amber-500 animate-pulse text-stone-950 border-amber-600' : 'bg-neutral-100 dark:bg-zinc-800 border-neutral-250 dark:border-zinc-700'
                            }`}>
                              {trackingStep >= 2 ? '✓' : '•'}
                            </span>
                            <div className="text-xs">
                              <h6 className={`font-bold ${trackingStep >= 2 ? 'text-stone-900 dark:text-white' : 'text-neutral-400'}`}>
                                Insured Handover to Carriage
                              </h6>
                              <p className="text-neutral-500 dark:text-neutral-400 text-[10px] font-light">
                                Dispatched using high-integrity armored transit containers for courier transport.
                              </p>
                            </div>
                          </div>

                          {/* Mile 3 */}
                          <div className="relative">
                            <span className={`absolute -left-[30px] top-1 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-zinc-900 border ${
                              trackingStep >= 3 ? 'bg-emerald-500 text-white border-emerald-600' : trackingStep === 2 ? 'bg-amber-500 animate-pulse text-stone-950 border-amber-600' : 'bg-neutral-100 dark:bg-zinc-800 border-neutral-250 dark:border-zinc-700'
                            }`}>
                              {trackingStep >= 3 ? '✓' : '•'}
                            </span>
                            <div className="text-xs">
                              <h6 className={`font-bold ${trackingStep >= 3 ? 'text-stone-900 dark:text-white font-black' : 'text-neutral-400'}`}>
                                Flight Dispatch Transit
                              </h6>
                              <p className="text-neutral-500 dark:text-neutral-400 text-[10px] font-light">
                                Tracking numbers are texted to {finalOrder.email} instantly.
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Exit receipt action */}
                      <button
                        id="checkout-complete-finish-btn"
                        onClick={onClose}
                        className="w-full mt-4 py-4 bg-stone-900 text-white dark:bg-white dark:text-stone-950 rounded-xl text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
                      >
                        Return To Museum Storefront
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
