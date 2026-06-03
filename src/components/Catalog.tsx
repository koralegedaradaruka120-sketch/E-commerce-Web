/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, Check, Sparkles, RefreshCw, X } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

interface CatalogProps {
    products: Product[];
    onQuickView: (product: Product) => void;
    onWishlistToggle: (product: Product) => void;
    wishlistItems: Product[];
    onAddToCartDirect: (product: Product) => void;
    activeCategory: 'all' | 'men' | 'women' | 'accessories' | 'shoes';
    onNavigate: (category: 'all' | 'men' | 'women' | 'accessories' | 'shoes') => void;
    searchValue: string;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';
type PriceRange = 'all' | 'under-500' | '500-1000' | 'over-1000';

export default function Catalog({
    products,
    onQuickView,
    onWishlistToggle,
    wishlistItems,
    onAddToCartDirect,
    activeCategory,
    onNavigate,
    searchValue
}: CatalogProps) {
    const [selectedSort, setSelectedSort] = useState<SortOption>('default');
    const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>('all');
    const [selectedColorFilter, setSelectedColorFilter] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Categories buttons list
    const categories: Array<{ id: 'all' | 'men' | 'women' | 'accessories' | 'shoes'; label: string }> = [
        { id: 'all', label: 'ALL COLLECTIONS' },
        { id: 'women', label: "WOMEN'S ATELIER" },
        { id: 'men', label: "MEN'S LAB" },
        { id: 'accessories', label: 'FINE ACCESSORIES' },
        { id: 'shoes', label: 'SHOES' }
    ];

    // Colors list for filter swatches
    const filterColors = [
        { name: 'Warm Beige', hex: '#EAE3D8' },
        { name: 'Rich Black', hex: '#111111' },
        { name: 'Pure White', hex: '#FFFFFF' },
        { name: 'Soft Gray', hex: '#F5F5F5' }
    ];

    // Clear reset filters action
    const handleResetFilters = () => {
        setSelectedPriceRange('all');
        setSelectedColorFilter('all');
        setSelectedSort('default');
    };

    // Advanced search logic, category mapping, with reactive filters
    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            // Category checking
            if (activeCategory !== 'all' && item.category !== activeCategory) {
                return false;
            }

            // Keyword checking (Title, composition description matching)
            if (searchValue) {
                const keyword = searchValue.toLowerCase();
                const matchesName = item.name.toLowerCase().includes(keyword);
                const matchesDesc = item.description.toLowerCase().includes(keyword);
                const matchesComp = item.composition.toLowerCase().includes(keyword);
                if (!matchesName && !matchesDesc && !matchesComp) {
                    return false;
                }
            }

            // Price range checking
            if (selectedPriceRange !== 'all') {
                if (selectedPriceRange === 'under-500' && item.price >= 500) return false;
                if (selectedPriceRange === '500-1000' && (item.price < 500 || item.price > 1000)) return false;
                if (selectedPriceRange === 'over-1000' && item.price <= 1000) return false;
            }

            // Color Swatch option checking
            if (selectedColorFilter !== 'all') {
                const hasColor = item.colors.some((col) => col.name.toLowerCase() === selectedColorFilter.toLowerCase());
                if (!hasColor) return false;
            }

            return true;
        }).sort((a, b) => {
            if (selectedSort === 'price-asc') return a.price - b.price;
            if (selectedSort === 'price-desc') return b.price - a.price;
            if (selectedSort === 'rating') return b.rating - a.rating;
            return 0; // Default curated ID index order
        });
    }, [products, activeCategory, searchValue, selectedPriceRange, selectedColorFilter, selectedSort]);

    return (
        <section id="products-catalog-section" className="scroll-mt-24 bg-white dark:bg-rich-black py-16 sm:py-24 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Heading with Brand storytelling */}
                <div className="text-center max-w-xl mx-auto mb-12">
                    <span className="font-sans text-[10px] font-bold tracking-[0.35em] text-luxury-gold uppercase block">
                        THE COLLECTION
                    </span>
                    <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-rich-black dark:text-white sm:text-4xl">
                        Curated Restraint & Detail
                    </h2>
                    <p className="mt-3 font-sans text-xs font-light text-rich-black/50 dark:text-white/40 tracking-widest leading-relaxed">
                        A rigorous selection of architectural shapes engineered with premium tactile feedback, tailored for modular ease.
                    </p>
                </div>

                {/* Categories filtering bar */}
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2.5 pb-8 border-b border-warm-beige/20 dark:border-white/10">
                    {categories.map((cat) => (
                        <button
                            id={`cat-filter-tab-${cat.id}`}
                            key={cat.id}
                            onClick={() => onNavigate(cat.id)}
                            className={`px-5 py-2.5 font-sans text-[10px] font-bold tracking-widest transition-all ${
                                activeCategory === cat.id
                                    ? 'bg-rich-black dark:bg-white text-white dark:text-rich-black text-xs font-bold'
                                    : 'text-rich-black/60 dark:text-white/60 bg-soft-gray dark:bg-white/5 hover:bg-warm-beige/20 dark:hover:bg-white/10 hover:text-rich-black dark:hover:text-white'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Controls toolbar */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    {/* Left: Filters selector toggler and count */}
                    <div className="flex items-center gap-4">
                        <button
                            id="toggle-filter-panel"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 border border-warm-beige/40 dark:border-white/10 px-4 py-2 text-xs font-bold tracking-widest text-rich-black dark:text-white hover:border-luxury-gold transition-colors"
                        >
                            <SlidersHorizontal size={13} />
                            <span>{showFilters ? 'CLOSE FILTERS' : 'ADVANCED FILTERS'}</span>
                        </button>

                        <span className="font-sans text-xs tracking-widest text-rich-black/40 dark:text-white/40">
                            SHOWING: <span className="text-rich-black dark:text-white font-bold">{filteredProducts.length} pieces</span>
                        </span>
                    </div>

                    {/* Right: sorting trigger dropdown */}
                    <div className="flex items-center gap-3">
                        <span className="font-sans text-[10px] tracking-widest font-bold text-rich-black/40 dark:text-white/40">SORT BY</span>
                        <div className="relative">
                            <select
                                id="sorting-dropdown"
                                value={selectedSort}
                                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                                className="appearance-none border border-warm-beige/40 dark:border-white/10 bg-transparent pr-10 pl-4 py-2 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                            >
                                <option value="default" className="text-rich-black">CURATED ALBUM</option>
                                <option value="price-asc" className="text-rich-black">PRICE: LOW TO HIGH</option>
                                <option value="price-desc" className="text-rich-black">PRICE: HIGH TO LOW</option>
                                <option value="rating" className="text-rich-black">TOP CUSTOMER RATING</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-rich-black/50 dark:text-white/50 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Filter Expanded Panel Block */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-6 border-b border-warm-beige/20 dark:border-white/10 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left bg-soft-gray/50 dark:bg-white/5 p-6 animate-fadeIn">
                                {/* Option List 1: Price range */}
                                <div>
                                    <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] text-rich-black dark:text-white uppercase mb-4">
                                        PRICE TIER
                                    </h4>
                                    <div className="flex flex-col gap-2.5 font-sans text-xs">
                                        {[
                                            { id: 'all', label: 'All Allocations' },
                                            { id: 'under-500', label: 'Under $500' },
                                            { id: '500-1000', label: '$500 - $1,000' },
                                            { id: 'over-1000', label: 'Over $1,000' }
                                        ].map((pOpt) => (
                                            <button
                                                id={`filter-price-${pOpt.id}`}
                                                key={pOpt.id}
                                                onClick={() => setSelectedPriceRange(pOpt.id as PriceRange)}
                                                className={`flex items-center gap-2 text-left tracking-wide ${
                                                    selectedPriceRange === pOpt.id
                                                        ? 'text-luxury-gold font-bold'
                                                        : 'text-rich-black/60 dark:text-white/60 hover:text-rich-black dark:hover:text-white'
                                                }`}
                                            >
                                                <span className={`h-1.5 w-1.5 rounded-full ${selectedPriceRange === pOpt.id ? 'bg-luxury-gold' : 'bg-transparent'}`} />
                                                <span>{pOpt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Option List 2: Fabric colors */}
                                <div>
                                    <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] text-rich-black dark:text-white uppercase mb-4">
                                        FABRIC TONES
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            id="filter-color-all"
                                            onClick={() => setSelectedColorFilter('all')}
                                            className={`border px-3 py-1 font-sans text-[10px] font-semibold tracking-wider transition-all ${
                                                selectedColorFilter === 'all'
                                                    ? 'border-rich-black dark:border-white bg-rich-black dark:bg-white text-white dark:text-rich-black'
                                                    : 'border-warm-beige/30 dark:border-white/10 text-rich-black dark:text-white'
                                            }`}
                                        >
                                            All Tones
                                        </button>
                                        {filterColors.map((color) => (
                                            <button
                                                id={`filter-color-${color.name.replace(' ', '-')}`}
                                                key={color.name}
                                                onClick={() => setSelectedColorFilter(color.name)}
                                                className={`flex items-center gap-1.5 border px-3 py-1 font-sans text-[10px] font-semibold tracking-wider transition-all ${
                                                    selectedColorFilter === color.name
                                                        ? 'border-luxury-gold text-luxury-gold'
                                                        : 'border-warm-beige/30 dark:border-white/10 text-rich-black dark:text-white'
                                                }`}
                                            >
                                                <span className="h-2 w-2 rounded-full inline-block border border-rich-black/10 dark:border-white/10" style={{ backgroundColor: color.hex }} />
                                                <span>{color.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Option List 3: Fast actions & Reset resets */}
                                <div className="flex flex-col justify-end items-start gap-4">
                                    <p className="font-sans text-[10px] tracking-wide text-rich-black/40 dark:text-white/40 leading-relaxed italic">
                                        * Resetting options restores default curation ranking as arranged by the creative director.
                                    </p>
                                    <button
                                        id="reset-all-filters-btn"
                                        onClick={handleResetFilters}
                                        className="flex items-center gap-2 border border-red-500/30 dark:border-red-500/20 hover:border-red-500 hover:bg-red-500/5 text-rich-black dark:text-white font-sans text-[10px] font-bold tracking-[0.2em] px-4 py-2 transition-all"
                                    >
                                        <X size={12} className="text-red-500" />
                                        <span>RESET SELECTIONS</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty product query backup page */}
                {filteredProducts.length === 0 ? (
                    <div className="mt-12 py-20 text-center border-t border-dashed border-warm-beige/30 dark:border-white/10">
                        <h4 className="font-serif text-lg font-light tracking-widest text-rich-black dark:text-white">NO ALIGNED PIECES</h4>
                        <p className="mt-2 font-sans text-xs font-light text-rich-black/40 dark:text-white/40 max-w-sm mx-auto leading-relaxed">
                            No garments match your current active descriptors. Reset filtering selections or test other query terms.
                        </p>
                        <button
                            id="back-to-all-action"
                            onClick={() => {
                                handleResetFilters();
                                onNavigate('all');
                            }}
                            className="mt-6 border border-rich-black dark:border-white bg-transparent px-6 py-2.5 font-sans text-[10px] font-bold tracking-widest text-rich-black dark:text-white"
                        >
                            RESTORE FULL CATALOG
                        </button>
                    </div>
                ) : (
                    /* Elegant Bento Grid of items */
                    <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 select-none">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onQuickView={onQuickView}
                                onWishlistToggle={onWishlistToggle}
                                isInWishlist={wishlistItems.some((wi) => wi.id === product.id)}
                                onAddToCartDirect={onAddToCartDirect}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
