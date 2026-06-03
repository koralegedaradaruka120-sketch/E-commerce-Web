/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Trash2, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface WishlistDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    wishlistItems: Product[];
    onRemoveFromWishlist: (product: Product) => void;
    onChooseOptions: (product: Product) => void;
}

export default function WishlistDrawer({
    isOpen,
    onClose,
    wishlistItems,
    onRemoveFromWishlist,
    onChooseOptions
}: WishlistDrawerProps) {
    if (!isOpen) return null;

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
                                MY WISHLIST
                            </span>
                            <span className="font-sans text-xs bg-luxury-gold text-rich-black px-2 py-0.5 font-bold">
                                {wishlistItems.length}
                            </span>
                        </div>
                        <button
                            id="close-wishlist-drawer"
                            onClick={onClose}
                            className="p-1.5 rounded-full hover:bg-soft-gray dark:hover:bg-white/10 text-rich-black dark:text-white hover:text-luxury-gold"
                            aria-label="Close Wishlist"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Middle list contents */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 no-scrollbar">
                        {wishlistItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-80 text-center">
                                <div className="h-12 w-12 rounded-full border border-warm-beige/40 dark:border-white/10 flex items-center justify-center mb-4 text-luxury-gold">
                                    <Heart size={20} />
                                </div>
                                <h3 className="font-serif text-base font-light tracking-wider text-rich-black dark:text-white">NO SAVED ITEMS</h3>
                                <p className="mt-2 font-sans text-xs font-light tracking-wide text-rich-black/40 dark:text-white/40 max-w-xs leading-relaxed">
                                    Tap the heart icon on any piece across our digital storefront to archive it here for your deliberate consideration.
                                </p>
                                <button
                                    id="wishlist-back-to-shop"
                                    onClick={onClose}
                                    className="mt-6 border border-rich-black dark:border-white bg-transparent px-6 py-2.5 font-sans text-[10px] font-bold tracking-widest text-rich-black dark:text-white hover:bg-rich-black hover:text-white dark:hover:bg-white dark:hover:text-rich-black transition-all"
                                >
                                    EXPLORE COLLECTIONS
                                </button>
                            </div>
                        ) : (
                            <div className="flow-root">
                                <ul className="divide-y divide-warm-beige/20 dark:divide-white/10">
                                    {wishlistItems.map((product) => (
                                        <li key={product.id} className="py-5 flex items-start gap-4">
                                            {/* Item Image */}
                                            <div className="relative h-24 w-18 flex-shrink-0 overflow-hidden bg-soft-gray dark:bg-white/15 border border-warm-beige/10">
                                                <img
                                                    className="h-full w-full object-cover object-center"
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 flex flex-col justify-between h-full gap-2 text-left">
                                                <div>
                                                    <div className="flex justify-between text-xs tracking-wider">
                                                        <h4 className="font-serif font-light text-rich-black dark:text-white text-sm">
                                                            {product.name}
                                                        </h4>
                                                        <span className="font-serif font-bold text-rich-black dark:text-white text-sm">
                                                            ${product.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 font-sans text-[9px] font-bold tracking-widest text-luxury-gold uppercase">
                                                        {product.category}
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="mt-2 flex items-center justify-between text-xs gap-2">
                                                    {/* View Options */}
                                                    <button
                                                        id={`wishlist-configure-${product.id}`}
                                                        onClick={() => onChooseOptions(product)}
                                                        className="flex-1 flex items-center justify-center gap-1.5 border border-rich-black dark:border-white bg-transparent hover:bg-rich-black hover:text-white dark:hover:bg-white dark:hover:text-rich-black py-1.5 font-sans text-[9px] font-semibold tracking-widest text-rich-black dark:text-white transition-all"
                                                    >
                                                        <ShoppingBag size={10} />
                                                        <span>CHOOSE SIZE</span>
                                                    </button>

                                                    {/* Trash from Wishlist */}
                                                    <button
                                                        id={`wishlist-remove-${product.id}`}
                                                        onClick={() => onRemoveFromWishlist(product)}
                                                        className="p-2 text-rich-black/40 dark:text-white/40 hover:text-red-500 hover:bg-red-500/5 transition-all border border-transparent hover:border-red-500/10"
                                                        aria-label="Remove from wishlist"
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

                    {/* Bottom informative panel footer */}
                    <div className="border-t border-warm-beige/20 dark:border-white/10 px-4 py-6 sm:px-6 bg-soft-gray/25 dark:bg-white/5">
                        <p className="font-sans text-[10px] text-center tracking-widest text-rich-black/40 dark:text-white/40 leading-relaxed">
                            SAVED PATTERNS ENJOY A 14-DAY PRICE PROTECTION GUARANTEE CONCURRENT WITH ATELIER ALLOCATIONS.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
