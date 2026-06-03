/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Heart, ShoppingBag, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
    searchValue: string;
    onSearchChange: (val: string) => void;
    onWishlistToggle: () => void;
    onCartToggle: () => void;
    cartItemsCount: number;
    wishlistItemsCount: number;
    darkMode: boolean;
    onThemeToggle: () => void;
    onNavigate: (category: 'all' | 'men' | 'women' | 'accessories' | 'shoes') => void;
    activeCategory: 'all' | 'men' | 'women' | 'accessories' | 'shoes';
}

export default function Header({
    searchValue,
    onSearchChange,
    onWishlistToggle,
    onCartToggle,
    cartItemsCount,
    wishlistItemsCount,
    darkMode,
    onThemeToggle,
    onNavigate,
    activeCategory
}: HeaderProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const categories: Array<{ id: 'all' | 'men' | 'women' | 'accessories' | 'shoes'; label: string }> = [
        { id: 'all', label: 'ALL DEPARTMENTS' },
        { id: 'women', label: 'WOMEN' },
        { id: 'men', label: 'MEN' },
        { id: 'accessories', label: 'ACCESSORIES' },
        { id: 'shoes', label: 'SHOES' }
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-warm-beige/20 dark:border-white/10 [background:rgba(255,255,255,0.8)] dark:[background:rgba(17,17,17,0.8)] glass-panel transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Left: Mobile Menu Accent & Desktop Categories */}
                    <div className="flex items-center gap-2 lg:gap-6">
                        <button 
                            id="mobile-menu-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-rich-black dark:text-white lg:hidden hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors"
                            aria-label="Toggle navigation menu"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        <nav className="hidden lg:flex lg:items-center lg:gap-8">
                            {categories.map((cat) => (
                                <button
                                    id={`nav-link-${cat.id}`}
                                    key={cat.id}
                                    onClick={() => onNavigate(cat.id)}
                                    className={`relative py-1 font-sans text-xs font-semibold tracking-widest transition-colors duration-200 outline-none ${
                                        activeCategory === cat.id 
                                            ? 'text-luxury-gold' 
                                            : 'text-rich-black/60 dark:text-white/60 hover:text-rich-black dark:hover:text-white'
                                    }`}
                                >
                                    {cat.label}
                                    {activeCategory === cat.id && (
                                        <motion.div 
                                            layoutId="activeCategoryUnderline"
                                            className="absolute bottom-0 left-0 h-[1.5px] w-full bg-luxury-gold"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Center: Monolithic Premium Logo */}
                    <div className="flex-1 text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                        <button
                            id="brand-logo-button"
                            onClick={() => onNavigate('all')}
                            className="inline-block cursor-pointer"
                        >
                            <span className="font-serif text-2xl font-light tracking-[0.45em] text-rich-black dark:text-white sm:text-3xl hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors duration-300">
                                M&Aacute;ISON
                            </span>
                        </button>
                    </div>

                    {/* Right: Search, Wishlist, Cart Drawer, Theme Switch */}
                    <div className="flex items-center gap-1 sm:gap-3">
                        {/* Search trigger */}
                        <div className="relative flex items-center">
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 220, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="hidden sm:block overflow-hidden mr-2"
                                    >
                                        <input
                                            id="desktop-search-input"
                                            type="text"
                                            placeholder="Search items..."
                                            value={searchValue}
                                            onChange={(e) => onSearchChange(e.target.value)}
                                            className="w-full border-b border-rich-black/30 dark:border-white/30 bg-transparent px-2 py-1 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none dark:focus:border-luxury-gold"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                id="desktop-search-toggle"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-rich-black dark:text-white hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors relative"
                                aria-label="Search"
                            >
                                <Search size={18} />
                            </button>
                        </div>

                        {/* Theme Switcher */}
                        <button
                            id="theme-toggle-button"
                            onClick={onThemeToggle}
                            className="p-2 text-rich-black dark:text-white hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors"
                            aria-label="Toggle theme mode"
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Saved Wishlist Toggle */}
                        <button
                            id="wishlist-toggle-button"
                            onClick={onWishlistToggle}
                            className="p-2 text-rich-black dark:text-white hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors relative"
                            aria-label="Wishlist"
                        >
                            <Heart size={18} />
                            {wishlistItemsCount > 0 && (
                                <motion.span 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[9px] font-bold text-rich-black"
                                >
                                    {wishlistItemsCount}
                                </motion.span>
                            )}
                        </button>

                        {/* Shopping Cart Toggle */}
                        <button
                            id="cart-toggle-button"
                            onClick={onCartToggle}
                            className="p-2 text-rich-black dark:text-white hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors relative"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={18} />
                            {cartItemsCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rich-black dark:bg-white text-[9px] font-bold text-white dark:text-rich-black"
                                >
                                    {cartItemsCount}
                                </motion.span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Expanded Search Block */}
            <div className="mx-auto max-w-7xl px-4 sm:hidden pb-3">
                <div className="flex items-center border-b border-rich-black/10 dark:border-white/10 px-2 py-1">
                    <Search className="text-rich-black/40 mr-2" size={14} />
                    <input
                        id="mobile-search-input"
                        type="text"
                        placeholder="Search curation..."
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-transparent font-sans text-xs tracking-widest text-rich-black dark:text-white focus:outline-none"
                    />
                    {searchValue && (
                        <button onClick={() => onSearchChange('')} className="p-1">
                            <X size={12} className="text-rich-black/40" />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Dropdown Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="lg:hidden overflow-hidden border-t border-warm-beige/20 dark:border-white/10 bg-white dark:bg-rich-black"
                    >
                        <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
                            {categories.map((cat) => (
                                <button
                                    id={`mobile-nav-link-${cat.id}`}
                                    key={cat.id}
                                    onClick={() => {
                                        onNavigate(cat.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center justify-between py-2 text-left font-sans text-sm font-semibold tracking-widest transition-colors ${
                                        activeCategory === cat.id
                                            ? 'text-luxury-gold'
                                            : 'text-rich-black dark:text-white/80 hover:text-luxury-gold'
                                    }`}
                                >
                                    <span>{cat.label}</span>
                                    {activeCategory === cat.id ? (
                                        <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
                                    ) : (
                                        <ArrowRight size={14} className="opacity-40" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
