/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { motion } from 'motion/react';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
    onProceedToCheckout: () => void;
}

export default function CartDrawer({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onProceedToCheckout
}: CartDrawerProps) {
    const [promoCode, setPromoCode] = useState('');
    const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);
    const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

    if (!isOpen) return null;

    // Delivery limit calculation: complimentary worldwide express above $500
    const shippingThreshold = 500;
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const amountToFreeShipping = Math.max(0, shippingThreshold - subtotal);
    const shippingCost = subtotal > shippingThreshold || subtotal === 0 ? 0 : 45;

    const discountAmount = activeDiscount ? (subtotal * activeDiscount.percent) / 100 : 0;
    const estimateTaxAndDuties = subtotal * 0.08; // 8% luxury duties estimate
    const total = subtotal - discountAmount + shippingCost + estimateTaxAndDuties;

    const handleApplyPromo = () => {
        const cleanCode = promoCode.trim().toUpperCase();
        if (cleanCode === 'MAISON10') {
            setActiveDiscount({ code: 'MAISON10', percent: 10 });
            setPromoFeedback('MAISON10 - 10% OFF APPLIED');
        } else if (cleanCode === 'WELCOME15') {
            setActiveDiscount({ code: 'WELCOME15', percent: 15 });
            setPromoFeedback('WELCOME15 - 15% OFF WELCOME CREDIT');
        } else {
            setPromoFeedback('PROMO CODE UNRECOGNIZED');
            setTimeout(() => setPromoFeedback(null), 3000);
        }
        setPromoCode('');
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop cover with blur click closing */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 sm:pl-16">
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
                    className="w-screen max-w-md bg-white dark:bg-rich-black shadow-2xl flex flex-col justify-between border-l border-warm-beige/30 dark:border-white/10"
                >
                    {/* Header Panel */}
                    <div className="px-4 py-6 sm:px-6 border-b border-warm-beige/20 dark:border-white/10 flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <span className="font-serif text-lg font-light tracking-widest text-rich-black dark:text-white">
                                SHOPPING BAG
                            </span>
                            <span className="font-sans text-xs bg-soft-gray dark:bg-white/15 text-rich-black dark:text-white px-2 py-0.5 font-bold">
                                {cartItems.reduce((sum, current) => sum + current.quantity, 0)}
                            </span>
                        </div>
                        <button
                            id="close-cart-drawer"
                            onClick={onClose}
                            className="p-1.5 rounded-full hover:bg-soft-gray dark:hover:bg-white/10 text-rich-black dark:text-white hover:text-luxury-gold"
                            aria-label="Close Shopping Bag"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Middle list contents */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 no-scrollbar">
                        {/* Free Shipping Dynamic Progress */}
                        {subtotal > 0 && (
                            <div className="mb-6 bg-warm-beige/10 dark:bg-white/5 border border-luxury-gold/20 p-4">
                                <div className="flex justify-between items-center text-xs tracking-wider font-sans mb-2">
                                    <span className="font-semibold text-rich-black dark:text-white">COURIER PRE-CLEARANCE</span>
                                    <span className="text-luxury-gold font-bold">
                                        {amountToFreeShipping > 0 ? `$${amountToFreeShipping} away from Free Shipping` : 'FREE PRIORITY DELIVERY UNLOCKED'}
                                    </span>
                                </div>
                                <div className="w-full bg-warm-beige/20 dark:bg-white/10 h-1 rounded-sm overflow-hidden">
                                    <div
                                        className="bg-luxury-gold h-full transition-all duration-300"
                                        style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-80 text-center">
                                <div className="h-12 w-12 rounded-full border border-warm-beige/40 dark:border-white/10 flex items-center justify-center mb-4 text-luxury-gold">
                                    <AlertCircle size={20} />
                                </div>
                                <h3 className="font-serif text-base font-light tracking-wider text-rich-black dark:text-white">YOUR BAG IS EMPTY</h3>
                                <p className="mt-2 font-sans text-xs font-light tracking-wide text-rich-black/40 dark:text-white/40 max-w-xs leading-relaxed">
                                    Explore our new collections designed in-house to form pristine wardrobes that transcend time.
                                </p>
                                <button
                                    id="cart-continue-browsing"
                                    onClick={onClose}
                                    className="mt-6 border border-rich-black dark:border-white bg-transparent px-6 py-2.5 font-sans text-[10px] font-bold tracking-widest text-rich-black dark:text-white hover:bg-rich-black hover:text-white dark:hover:bg-white dark:hover:text-rich-black transition-all"
                                >
                                    CONTINUE BROWSING
                                </button>
                            </div>
                        ) : (
                            <div className="flow-root">
                                <ul className="divide-y divide-warm-beige/20 dark:divide-white/10">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="py-5 flex items-start gap-4">
                                            {/* Item Image */}
                                            <div className="relative h-24 w-18 flex-shrink-0 overflow-hidden bg-soft-gray dark:bg-white/5 border border-warm-beige/10">
                                                <img
                                                    className="h-full w-full object-cover object-center"
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 flex flex-col justify-between h-full gap-1 text-left">
                                                <div>
                                                    <div className="flex justify-between text-xs tracking-wider">
                                                        <h4 className="font-serif font-light text-rich-black dark:text-white text-sm max-w-[200px]">
                                                            {item.product.name}
                                                        </h4>
                                                        <span className="font-serif font-bold text-rich-black dark:text-white text-sm">
                                                            ${(item.product.price * item.quantity).toLocaleString()}
                                                        </span>
                                                    </div>
                                                    {/* Color swatch & size indicators */}
                                                    <div className="mt-1 flex flex-wrap gap-2 items-center text-[10px] font-semibold text-rich-black/50 dark:text-white/50 tracking-widest font-sans">
                                                        <span className="flex items-center gap-1">
                                                            COLOR:
                                                            <span
                                                                className="inline-block h-2 w-2 rounded-full"
                                                                style={{ backgroundColor: item.selectedColor.hex }}
                                                            />
                                                            {item.selectedColor.name}
                                                        </span>
                                                        <span>&bull;</span>
                                                        <span>SIZE: {item.selectedSize}</span>
                                                    </div>
                                                </div>

                                                {/* Edit controls & Trash */}
                                                <div className="mt-3 flex items-center justify-between text-xs">
                                                    {/* Quantity adjustment */}
                                                    <div className="flex items-center border border-warm-beige/40 dark:border-white/10 bg-soft-gray dark:bg-transparent">
                                                        <button
                                                            id={`cart-qty-dec-${item.id}`}
                                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 px-2.5 text-rich-black/60 dark:text-white/60 hover:text-luxury-gold"
                                                        >
                                                            <Minus size={9} />
                                                        </button>
                                                        <span className="w-6 text-center font-sans font-bold text-[11px] text-rich-black dark:text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            id={`cart-qty-inc-${item.id}`}
                                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 px-2.5 text-rich-black/60 dark:text-white/60 hover:text-luxury-gold"
                                                        >
                                                            <Plus size={9} />
                                                        </button>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        id={`cart-remove-${item.id}`}
                                                        onClick={() => onRemoveItem(item.id)}
                                                        className="p-2 text-rich-black/40 dark:text-white/40 hover:text-red-500 hover:bg-red-500/5 transition-all"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Bottom calculation fields */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-warm-beige/20 dark:border-white/10 px-4 py-6 sm:px-6 bg-soft-gray/35 dark:bg-white/5 space-y-4">
                            {/* Promo Code Input Box */}
                            <div className="flex gap-2">
                                <input
                                    id="promo-code-input"
                                    type="text"
                                    placeholder="PROMO CODE (MAISON10 - WELCOME15)"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="flex-1 border border-warm-beige/40 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 font-sans text-[10px] tracking-widest text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                />
                                <button
                                    id="apply-promo-btn"
                                    onClick={handleApplyPromo}
                                    className="border border-rich-black dark:border-white bg-rich-black dark:bg-white text-white dark:text-rich-black px-4 py-2 font-sans text-[9px] font-bold tracking-widest hover:bg-luxury-gold dark:hover:bg-luxury-gold hover:text-rich-black transition-colors"
                                >
                                    APPLY
                                </button>
                            </div>

                            {/* Promo Code Response Feedback */}
                            {promoFeedback && (
                                <p className={`font-sans text-[10px] tracking-widest font-bold ${
                                    promoFeedback.includes('OFF') ? 'text-green-600' : 'text-red-500'
                                }`}>
                                    {promoFeedback}
                                </p>
                            )}

                            {/* Line Calculations */}
                            <div className="space-y-2 text-xs tracking-wider">
                                <div className="flex justify-between font-sans text-rich-black/60 dark:text-white/60">
                                    <span>BAG SUBTOTAL</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                {activeDiscount && (
                                    <div className="flex justify-between font-sans text-green-600 font-bold">
                                        <span>PROMO APPLIED ({activeDiscount.code})</span>
                                        <span>-${discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-sans text-rich-black/60 dark:text-white/60">
                                    <span>EST. DUTIES & TAXES (8%)</span>
                                    <span>${estimateTaxAndDuties.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-sans text-rich-black/60 dark:text-white/60">
                                    <span>SHIPPING METHODS</span>
                                    <span>{shippingCost === 0 ? 'FREE (Priority Courier)' : `$${shippingCost}`}</span>
                                </div>
                                <div className="border-t border-warm-beige/20 dark:border-white/10 pt-3 flex justify-between font-serif text-sm font-semibold text-rich-black dark:text-white">
                                    <span>ESTIMATED TOTAL</span>
                                    <span className="text-luxury-gold font-bold">${total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Complete Action Button */}
                            <button
                                id="cart-drawer-checkout-cta"
                                onClick={onProceedToCheckout}
                                className="w-full flex items-center justify-center gap-2 bg-rich-black dark:bg-white py-4 font-sans text-xs font-bold tracking-[0.25em] text-white dark:text-rich-black hover:bg-luxury-gold dark:hover:bg-luxury-gold hover:text-rich-black transition-all shadow-md"
                            >
                                <Lock size={12} />
                                <span>SECURE CHECKOUT</span>
                            </button>

                            <p className="font-sans text-[9px] text-center tracking-widest text-rich-black/30 dark:text-white/30">
                                COMPLIMENTARY CODES GRANTED OFFLINE FOR SELECT PATRONS.
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
