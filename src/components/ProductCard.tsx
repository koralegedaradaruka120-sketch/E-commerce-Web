/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
    key?: string | number;
    product: Product;
    onQuickView: (product: Product) => void;
    onWishlistToggle: (product: Product) => void;
    isInWishlist: boolean;
    onAddToCartDirect: (product: Product) => void;
}

export default function ProductCard({
    product,
    onQuickView,
    onWishlistToggle,
    isInWishlist,
    onAddToCartDirect
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (product.images.length > 1) {
            setCurrentImageIndex(1);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setCurrentImageIndex(0);
    };

    return (
        <div
            id={`product-card-${product.id}`}
            className="group relative flex flex-col overflow-hidden bg-transparent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Visual Frame */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-soft-gray dark:bg-rich-black border border-warm-beige/10 dark:border-white/5">
                {/* Product Tag */}
                {product.tag && (
                    <span className="absolute top-4 left-4 z-10 bg-rich-black dark:bg-white text-white dark:text-rich-black px-3 py-1 font-sans text-[9px] font-bold tracking-[0.2em] uppercase">
                        {product.tag}
                    </span>
                )}

                {/* Wishlist Button */}
                <button
                    id={`wishlist-toggle-${product.id}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onWishlistToggle(product);
                    }}
                    className={`absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-rich-black shadow-sm transition-all duration-300 hover:scale-115 ${
                        isInWishlist 
                            ? 'text-red-500 hover:text-red-600' 
                            : 'text-rich-black dark:text-white hover:text-luxury-gold dark:hover:text-luxury-gold'
                    }`}
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart size={15} fill={isInWishlist ? "currentColor" : "none"} />
                </button>

                {/* Image Canvas with Hover Swap */}
                <img
                    id={`product-card-image-${product.id}`}
                    className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                />

                {/* Glassmorphism Controls Overlay on Desktop */}
                <div className="absolute inset-x-0 bottom-4 z-10 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden sm:block">
                    <div className="flex gap-2 justify-center [background:rgba(255,255,255,0.9)] dark:[background:rgba(17,17,17,0.95)] border border-warm-beige/20 dark:border-white/10 p-2 shadow-lg glass-panel">
                        <button
                            id={`quick-view-btn-${product.id}`}
                            onClick={() => onQuickView(product)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 hover:bg-soft-gray dark:hover:bg-white/10 font-sans text-[10px] font-bold tracking-[0.15em] text-rich-black dark:text-white transition-colors"
                        >
                            <Eye size={12} />
                            <span>QUICK VIEW</span>
                        </button>
                        <button
                            id={`add-to-cart-direct-${product.id}`}
                            onClick={() => onAddToCartDirect(product)}
                            className="flex-1 flex items-center justify-center gap-2 bg-rich-black dark:bg-white hover:bg-luxury-gold dark:hover:bg-luxury-gold py-2 px-3 font-sans text-[10px] font-bold tracking-[0.15em] text-white dark:text-rich-black transition-colors"
                        >
                            <ShoppingCart size={11} />
                            <span>ADD TO BAG</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Direct Quick Access Controls always visible */}
                <div className="absolute bottom-4 right-4 z-10 sm:hidden flex flex-col gap-2">
                    <button
                        id={`mob-quick-view-${product.id}`}
                        onClick={() => onQuickView(product)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-rich-black text-rich-black dark:text-white shadow-md"
                        aria-label="Quick View Product"
                    >
                        <Eye size={14} />
                    </button>
                    <button
                        id={`mob-add-to-bag-${product.id}`}
                        onClick={() => onAddToCartDirect(product)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-luxury-gold text-rich-black shadow-md font-bold"
                        aria-label="Add to Bag Direct"
                    >
                        <ShoppingCart size={14} />
                    </button>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="mt-4 flex flex-col items-center text-center">
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] text-luxury-gold uppercase">
                    {product.category}
                </span>
                <h3 className="mt-1 font-serif text-base font-light tracking-wide text-rich-black dark:text-white group-hover:text-luxury-gold transition-colors duration-200">
                    {product.name}
                </h3>
                {/* Modern Stars Rating */}
                <div className="mt-1 flex items-center gap-1">
                    <div className="flex text-luxury-gold">
                        <Star size={10} fill="currentColor" />
                    </div>
                    <span className="font-sans text-[9px] font-medium text-rich-black/40 dark:text-white/40 tracking-wider">
                        {product.rating} &bull; {product.reviewsCount} reviews
                    </span>
                </div>
                <p className="mt-2 font-serif text-sm font-semibold tracking-wider text-rich-black dark:text-white">
                    ${product.price.toLocaleString()}
                </p>
                {/* Display Small Swatches indicator for premium feel */}
                <div className="mt-3 flex gap-1.5 items-center justify-center">
                    {product.colors.map((color, idx) => (
                        <span 
                            key={idx}
                            title={color.name}
                            className="h-2 w-2 rounded-full ring-1 ring-rich-black/20 dark:ring-white/20"
                            style={{ backgroundColor: color.hex }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
