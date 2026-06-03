/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent } from 'react';
import { X, Heart, Shield, HelpCircle, Star, Plus, Minus, Check, Minimize2 } from 'lucide-react';
import { Product, ColorVariant, SizeOption } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
    product: Product;
    onClose: () => void;
    onWishlistToggle: (product: Product) => void;
    isInWishlist: boolean;
    onAddToCart: (product: Product, selectedColor: ColorVariant, selectedSize: SizeOption, quantity: number) => void;
}

export default function ProductDetailModal({
    product,
    onClose,
    onWishlistToggle,
    isInWishlist,
    onAddToCart
}: ProductDetailModalProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState<ColorVariant>(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState<SizeOption>(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [addState, setAddState] = useState<'idle' | 'loading' | 'success'>('idle');

    // Hover Zoom State Ref and positioning Coordinates
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return;
        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    const handleAddToBag = () => {
        setAddState('loading');
        setTimeout(() => {
            onAddToCart(product, selectedColor, selectedSize, quantity);
            setAddState('success');
            setTimeout(() => {
                setAddState('idle');
            }, 1800);
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md">
            {/* Modal Box */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-5xl rounded-none bg-white dark:bg-rich-black overflow-hidden shadow-2xl border border-warm-beige/30 dark:border-white/10"
            >
                {/* Close Button top corner */}
                <button
                    id="close-detail-modal"
                    onClick={onClose}
                    className="absolute top-4 right-4 z-25 p-2 rounded-full bg-white/80 dark:bg-black/60 text-rich-black dark:text-white hover:text-luxury-gold dark:hover:text-luxury-gold hover:scale-105 transition-all"
                    aria-label="Close product details"
                >
                    <X size={18} />
                </button>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Panel: Image presentation */}
                    <div className="flex flex-col gap-3 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-warm-beige/20 dark:border-white/10">
                        {/* Main Image viewer with cursor tracking Magnifying Lens */}
                        <div
                            id="magnifying-lens-container"
                            ref={imageContainerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsZooming(true)}
                            onMouseLeave={() => setIsZooming(false)}
                            className="relative aspect-[3/4] w-full overflow-hidden bg-soft-gray dark:bg-rich-black cursor-crosshair border border-warm-beige/10"
                        >
                            <img
                                id="magnifying-image"
                                src={product.images[selectedImageIndex]}
                                alt={product.name}
                                className="h-full w-full object-cover object-center transition-transform duration-100"
                                style={{
                                    transform: isZooming ? 'scale(2)' : 'scale(1)',
                                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                }}
                                referrerPolicy="no-referrer"
                            />
                            {/* Zoom hint overlay */}
                            {!isZooming && (
                                <div className="absolute right-4 bottom-4 flex items-center justify-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-sans text-[8px] tracking-widest text-white/90">
                                    <Minimize2 size={10} className="rotate-45" />
                                    <span>HOVER TO ZOOM</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails list */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                                {product.images.map((img, idx) => (
                                    <button
                                        id={`thumb-image-${idx}`}
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`relative aspect-[3/4] w-16 cursor-pointer border overflow-hidden ${
                                            selectedImageIndex === idx
                                                ? 'border-luxury-gold'
                                                : 'border-warm-beige/30 dark:border-white/10 brightness-[0.7] hover:brightness-100'
                                        }`}
                                    >
                                        <img src={img} alt={`thumbnail-${idx}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Spec Sheet / Customization */}
                    <div className="flex flex-col justify-between p-6 sm:p-8 max-h-[85vh] overflow-y-auto no-scrollbar">
                        <div>
                            {/* Hierarchy / SKU */}
                            <div className="flex justify-between items-center text-rich-black/40 dark:text-white/40">
                                <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase">
                                    {product.category}
                                </span>
                                <span className="font-sans text-[9px] tracking-wider text-xs">SKU: {product.sku}</span>
                            </div>

                            {/* Name & Title */}
                            <h2 className="mt-2 font-serif text-2xl font-light tracking-wide text-rich-black dark:text-white sm:text-3xl">
                                {product.name}
                            </h2>

                            {/* Product Rating and reviews */}
                            <div className="mt-3 flex items-center gap-2">
                                <div className="flex text-luxury-gold">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            size={12}
                                            fill={s <= Math.floor(product.rating) ? "currentColor" : "none"}
                                            className="mr-0.5"
                                        />
                                    ))}
                                </div>
                                <span className="font-sans text-xs font-semibold text-rich-black dark:text-white">
                                    {product.rating} <span className="text-rich-black/40 dark:text-white/40 font-light">&bull; ({product.reviewsCount} Buyer Reviews)</span>
                                </span>
                            </div>

                            {/* Luxury PriceTag */}
                            <p className="mt-4 font-serif text-xl font-bold tracking-wider text-rich-black dark:text-white">
                                ${product.price.toLocaleString()}
                            </p>

                            {/* Narrative Paragraph */}
                            <p className="mt-5 font-sans text-xs font-light leading-relaxed tracking-wider text-rich-black/70 dark:text-white/75">
                                {product.description}
                            </p>

                            {/* Visual Color swatches selector */}
                            <div className="mt-6 border-t border-warm-beige/20 dark:border-white/10 pt-5">
                                <span className="font-sans text-[10px] font-bold tracking-widest text-rich-black dark:text-white uppercase block">
                                    Select Tone: <span className="text-luxury-gold tracking-normal italic ml-1">{selectedColor.name}</span>
                                </span>
                                <div className="mt-3 flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            id={`swatch-btn-${color.name.replace(' ', '-')}`}
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                                                selectedColor.name === color.name
                                                    ? 'border-luxury-gold scale-110'
                                                    : 'border-rich-black/20 dark:border-white/20 hover:scale-105'
                                            }`}
                                        >
                                            <span
                                                className="h-6 w-6 rounded-full"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizings Selector */}
                            <div className="mt-6 border-t border-warm-beige/20 dark:border-white/10 pt-5">
                                <div className="flex justify-between items-center">
                                    <span className="font-sans text-[10px] font-bold tracking-widest text-rich-black dark:text-white uppercase">
                                        Select Sizing
                                    </span>
                                    <button
                                        id="size-guide-toggle-button"
                                        onClick={() => setShowSizeGuide(true)}
                                        className="flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-wider text-luxury-gold hover:underline"
                                    >
                                        <HelpCircle size={10} />
                                        <span>SIZE GUIDE</span>
                                    </button>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {product.sizes.map((sz) => (
                                        <button
                                            id={`size-btn-${sz}`}
                                            key={sz}
                                            onClick={() => setSelectedSize(sz)}
                                            className={`border px-4 py-2 text-center font-sans text-xs font-semibold tracking-widest transition-all ${
                                                selectedSize === sz
                                                    ? 'border-rich-black dark:border-white bg-rich-black dark:bg-white text-white dark:text-rich-black'
                                                    : 'border-warm-beige/40 dark:border-white/10 text-rich-black dark:text-white/60 hover:border-rich-black dark:hover:border-white'
                                            }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fabric composition details pill */}
                            <div className="mt-6 bg-soft-gray dark:bg-white/5 p-4 text-left border-l-[3px] border-luxury-gold">
                                <p className="font-sans text-[9px] font-bold tracking-widest text-luxury-gold uppercase">Material & Composition</p>
                                <p className="mt-1.5 font-sans text-[11px] leading-relaxed tracking-wider text-rich-black/80 dark:text-white/80">
                                    {product.composition}
                                </p>
                            </div>
                        </div>

                        {/* Quantity, Check, and Add sequence */}
                        <div className="mt-8 border-t border-warm-beige/20 dark:border-white/10 pt-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center border border-warm-beige/40 dark:border-white/10 bg-soft-gray dark:bg-transparent">
                                    <button
                                        id="qty-decrement"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 text-rich-black dark:text-white hover:text-luxury-gold"
                                    >
                                        <Minus size={11} />
                                    </button>
                                    <span className="w-8 text-center font-sans text-xs font-semibold text-rich-black dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        id="qty-increment"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 text-rich-black dark:text-white hover:text-luxury-gold"
                                    >
                                        <Plus size={11} />
                                    </button>
                                </div>

                                <button
                                    id="add-to-bag-cta-main"
                                    disabled={addState !== 'idle'}
                                    onClick={handleAddToBag}
                                    className="flex-1 group relative flex items-center justify-center gap-3 overflow-hidden bg-rich-black dark:bg-white px-8 py-3.5 font-sans text-xs font-bold tracking-[0.25em] text-white dark:text-rich-black transition-all hover:bg-luxury-gold dark:hover:bg-luxury-gold hover:text-rich-black"
                                >
                                    {addState === 'idle' && (
                                        <>
                                            <span>ADD TO BAG</span>
                                        </>
                                    )}
                                    {addState === 'loading' && (
                                        <svg className="animate-spin h-4 w-4 text-white dark:text-rich-black" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    )}
                                    {addState === 'success' && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-green-600 font-bold">
                                            <Check size={14} className="stroke-[3]" />
                                            <span>ADDED SECURELY</span>
                                        </motion.div>
                                    )}
                                </button>

                                <button
                                    id="modal-wishlist-toggle"
                                    onClick={() => onWishlistToggle(product)}
                                    className={`flex h-11 w-11 items-center justify-center border transition-all rounded-none ${
                                        isInWishlist
                                            ? 'border-red-500 text-red-500 hover:bg-red-500/10'
                                            : 'border-warm-beige/40 dark:border-white/10 text-rich-black dark:text-white hover:border-rich-black dark:hover:border-white'
                                    }`}
                                >
                                    <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
                                </button>
                            </div>

                            {/* Brand reassurance badges */}
                            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-warm-beige/20 dark:border-white/10 pt-4">
                                <div className="flex items-center gap-2 text-[10px] tracking-wider text-rich-black/50 dark:text-white/50">
                                    <Shield size={12} className="text-luxury-gold" />
                                    <span>Carbon-neutral shipping</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] tracking-wider text-rich-black/50 dark:text-white/50">
                                    <Check size={12} className="text-luxury-gold" />
                                    <span>2-year masterwear warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Nested Sizing Guide Modal Panel */}
            <AnimatePresence>
                {showSizeGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            exit={{ y: 20 }}
                            className="w-full max-w-md bg-white dark:bg-rich-black p-6 border border-warm-beige/40 dark:border-white/20 text-rich-black dark:text-white"
                        >
                            <div className="flex justify-between items-center border-b border-warm-beige/20 dark:border-white/10 pb-3">
                                <h3 className="font-serif text-lg font-light tracking-wide">GARMENT MEASUREMENT SHEET</h3>
                                <button id="close-size-guide" onClick={() => setShowSizeGuide(false)} className="p-1 hover:text-luxury-gold">
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="mt-4 text-xs font-light text-rich-black/70 dark:text-white/70">
                                <p className="mb-4">Dimensions in centimeters (with garment laid perfectly flat):</p>
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-warm-beige/20 dark:border-white/10 font-semibold text-rich-black dark:text-white">
                                            <th className="py-2 font-sans">Size</th>
                                            <th className="py-2 font-sans">Chest Circum.</th>
                                            <th className="py-2 font-sans">Waist Metric</th>
                                            <th className="py-2 font-sans">Inseam Sleeve</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-warm-beige/10 dark:divide-white/5 font-mono">
                                        <tr className={selectedSize === 'XS' ? 'text-luxury-gold font-bold bg-luxury-gold/5' : ''}>
                                            <td className="py-2.5">XS (34)</td>
                                            <td className="py-2.5">88 cm</td>
                                            <td className="py-2.5">68 cm</td>
                                            <td className="py-2.5">81 cm</td>
                                        </tr>
                                        <tr className={selectedSize === 'S' ? 'text-luxury-gold font-bold bg-luxury-gold/5' : ''}>
                                            <td className="py-2.5">S (36)</td>
                                            <td className="py-2.5">92 cm</td>
                                            <td className="py-2.5">72 cm</td>
                                            <td className="py-2.5">82 cm</td>
                                        </tr>
                                        <tr className={selectedSize === 'M' ? 'text-luxury-gold font-bold bg-luxury-gold/5' : ''}>
                                            <td className="py-2.5">M (38)</td>
                                            <td className="py-2.5">96 cm</td>
                                            <td className="py-2.5">76 cm</td>
                                            <td className="py-2.5">83 cm</td>
                                        </tr>
                                        <tr className={selectedSize === 'L' ? 'text-luxury-gold font-bold bg-luxury-gold/5' : ''}>
                                            <td className="py-2.5">L (40)</td>
                                            <td className="py-2.5">100 cm</td>
                                            <td className="py-2.5">80 cm</td>
                                            <td className="py-2.5">84 cm</td>
                                        </tr>
                                        <tr className={selectedSize === 'XL' ? 'text-luxury-gold font-bold bg-luxury-gold/5' : ''}>
                                            <td className="py-2.5">XL (42)</td>
                                            <td className="py-2.5">106 cm</td>
                                            <td className="py-2.5">86 cm</td>
                                            <td className="py-2.5">85 cm</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="mt-5 text-[10px] italic leading-normal text-luxury-gold">
                                    * Ateliers recommend sizing down if you prefer standard tailoring over structural boxy overcoats.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
