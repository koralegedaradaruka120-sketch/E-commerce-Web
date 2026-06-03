/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LUXURY_PRODUCTS } from './data';
import { Product, CartItem, ColorVariant, SizeOption } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import BrandStory from './components/BrandStory';
import Reviews from './components/Reviews';
import InstagramGallery from './components/InstagramGallery';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import InteractiveCheckout from './components/InteractiveCheckout';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ShoppingBag, Heart, Star, Check, Sparkles } from 'lucide-react';

export default function App() {
    // Mode toggle theme state
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('maison-dark-mode');
        return saved === 'true';
    });

    // View states: 'homepage' | 'checkout'
    const [activeView, setActiveView] = useState<'homepage' | 'checkout'>('homepage');

    // Shopping search string
    const [searchValue, setSearchValue] = useState('');

    // Catalog Active Department Category
    const [activeCategory, setActiveCategory] = useState<'all' | 'men' | 'women' | 'accessories' | 'shoes'>('all');

    // Cart Items persisting local list
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('maison-cart-bag');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { return []; }
        }
        return [];
    });

    // Wishlist Items persisting local list
    const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
        const saved = localStorage.getItem('maison-wishlist-saved');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { return []; }
        }
        return [];
    });

    // Quickview modal active product
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Drawers visibility triggers
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // Global Floating look and feel notification toast
    const [globalToast, setGlobalToast] = useState<{ message: string; type: 'success' | 'wishlist' | 'info' } | null>(null);

    // Sync HTML theme element class with dark-mode trigger
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('maison-dark-mode', String(darkMode));
    }, [darkMode]);

    // Save cart state updates
    useEffect(() => {
        localStorage.setItem('maison-cart-bag', JSON.stringify(cartItems));
    }, [cartItems]);

    // Save wishlist state updates
    useEffect(() => {
        localStorage.setItem('maison-wishlist-saved', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Scroll back to top on view changes
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Category navigation click
    const handleNavigateCategory = (cat: 'all' | 'men' | 'women' | 'accessories' | 'shoes') => {
        setActiveView('homepage');
        setActiveCategory(cat);
        // Scroll smoothly to catalog
        setTimeout(() => {
            scrollToSection('products-catalog-section');
        }, 80);
    };

    // Direct Add to Cart from grid using default options (First Color, First Sizing)
    const handleAddToCartDirect = (product: Product) => {
        const defaultColor = product.colors[0];
        const defaultSize = product.sizes[0] || 'M';
        const uniqueKeyId = `${product.id}-${defaultColor.name.replace(' ', '-')}-${defaultSize}`;

        setCartItems((prevItems) => {
            const existingIndex = prevItems.findIndex((item) => item.id === uniqueKeyId);
            if (existingIndex > -1) {
                const refreshed = [...prevItems];
                refreshed[existingIndex] = {
                    ...refreshed[existingIndex],
                    quantity: refreshed[existingIndex].quantity + 1
                };
                return refreshed;
            } else {
                return [...prevItems, {
                    id: uniqueKeyId,
                    product,
                    selectedColor: defaultColor,
                    selectedSize: defaultSize,
                    quantity: 1
                }];
            }
        });

        // Trigger gorgeous notification toast
        setGlobalToast({
            message: `Allocated 1x ${product.name} (${defaultSize} in ${defaultColor.name}) to your Shopping Bag.`,
            type: 'success'
        });
        setTimeout(() => setGlobalToast(null), 3800);
    };

    // Detailed Add to Cart from quickview modal spec sheet
    const handleAddToCartDetailed = (product: Product, selectedColor: ColorVariant, selectedSize: SizeOption, quantity: number) => {
        const uniqueKeyId = `${product.id}-${selectedColor.name.replace(' ', '-')}-${selectedSize}`;

        setCartItems((prevItems) => {
            const existingIndex = prevItems.findIndex((item) => item.id === uniqueKeyId);
            if (existingIndex > -1) {
                const refreshed = [...prevItems];
                refreshed[existingIndex] = {
                    ...refreshed[existingIndex],
                    quantity: refreshed[existingIndex].quantity + quantity
                };
                return refreshed;
            } else {
                return [...prevItems, {
                    id: uniqueKeyId,
                    product,
                    selectedColor,
                    selectedSize,
                    quantity
                }];
            }
        });

        // Trigger gorgeous notification toast
        setGlobalToast({
            message: `Allocated ${quantity}x ${product.name} (${selectedSize} in ${selectedColor.name}) to your Shopping Bag.`,
            type: 'success'
        });
        setTimeout(() => setGlobalToast(null), 3800);
    };

    // Remove item from shopping bag
    const handleRemoveItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Update quantity counter
    const handleUpdateQuantity = (id: string, nextQty: number) => {
        if (nextQty <= 0) {
            handleRemoveItem(id);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item))
        );
    };

    // Toggle items inside stored wishlist
    const handleWishlistToggle = (product: Product) => {
        const index = wishlistItems.findIndex((item) => item.id === product.id);
        if (index > -1) {
            setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
            setGlobalToast({
                message: `Archived copy of ${product.name} has been removed from saved files.`,
                type: 'info'
            });
        } else {
            setWishlistItems((prev) => [...prev, product]);
            setGlobalToast({
                message: `Archived ${product.name} on the digital saved files.`,
                type: 'wishlist'
            });
        }
        setTimeout(() => setGlobalToast(null), 3500);
    };

    // Choose sizing options inside Wishlist Drawer
    const handleChooseOptions = (product: Product) => {
        setIsWishlistOpen(false);
        setSelectedProduct(product);
    };

    // Switch to step 2: Secured checkout viewport
    const handleProceedToCheckout = () => {
        setIsCartOpen(false);
        setActiveView('checkout');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Clear cart upon complete checkout process success
    const handleOrderCompleted = () => {
        setCartItems([]);
        localStorage.removeItem('maison-cart-bag');
    };

    const handleQuitCheckout = () => {
        setActiveView('homepage');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-rich-black transition-colors duration-300 text-rich-black dark:text-white antialiased">
            
            {/* Immersive Alert Toasts */}
            <AnimatePresence>
                {globalToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 35, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 25, scale: 0.9 }}
                        className="fixed bottom-6 left-6 z-100 flex max-w-sm sm:max-w-md items-center gap-3 border border-luxury-gold/50 bg-rich-black dark:bg-white text-white dark:text-rich-black px-5 py-4 shadow-2xl glass-panel text-xs tracking-wider uppercase"
                    >
                        {globalToast.type === 'success' && <ShoppingBag size={14} className="text-luxury-gold shrink-0" />}
                        {globalToast.type === 'wishlist' && <Heart size={14} fill="currentColor" className="text-luxury-gold shrink-0" />}
                        {globalToast.type === 'info' && <AlertCircle size={14} className="text-luxury-gold shrink-0" />}
                        
                        <div className="flex-1 font-sans text-left font-semibold leading-relaxed">
                            {globalToast.message}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Menu & Interactive Options */}
            <Header
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                onWishlistToggle={() => setIsWishlistOpen(true)}
                onCartToggle={() => setIsCartOpen(true)}
                cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                wishlistItemsCount={wishlistItems.length}
                darkMode={darkMode}
                onThemeToggle={() => setDarkMode(!darkMode)}
                onNavigate={handleNavigateCategory}
                activeCategory={activeCategory}
            />

            {/* Direct multi-pane display routes */}
            <AnimatePresence mode="wait">
                {activeView === 'homepage' ? (
                    <motion.main
                        key="homepage-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* 1. Cinematic Hero image */}
                        <Hero
                            onShopNowClick={() => scrollToSection('products-catalog-section')}
                            onCategoryNavigate={handleNavigateCategory}
                        />

                        {/* 2. Interactive Product Catalog */}
                        <Catalog
                            products={LUXURY_PRODUCTS}
                            onQuickView={setSelectedProduct}
                            onWishlistToggle={handleWishlistToggle}
                            wishlistItems={wishlistItems}
                            onAddToCartDirect={handleAddToCartDirect}
                            activeCategory={activeCategory}
                            onNavigate={(cat) => handleNavigateCategory(cat)}
                            searchValue={searchValue}
                        />

                        {/* 3. Luxury Brand Story Philosophy */}
                        <BrandStory />

                        {/* 4. Customer Verified Reviews */}
                        <Reviews />

                        {/* 5. Minimalist Instagram grid */}
                        <InstagramGallery />
                    </motion.main>
                ) : (
                    <motion.main
                        key="checkout-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <InteractiveCheckout
                            cartItems={cartItems}
                            onOrderCompleted={handleOrderCompleted}
                            onQuitCheckout={handleQuitCheckout}
                        />
                    </motion.main>
                )}
            </AnimatePresence>

            {/* Premium high-end footer */}
            <Footer />

            {/* Left/Right Action Side-Drawers */}
            <AnimatePresence>
                {/* Cart Shopping Bag Slider */}
                {isCartOpen && (
                    <CartDrawer
                        isOpen={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                        cartItems={cartItems}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                        onProceedToCheckout={handleProceedToCheckout}
                    />
                )}

                {/* Stored Saved Wishlist Slider */}
                {isWishlistOpen && (
                    <WishlistDrawer
                        isOpen={isWishlistOpen}
                        onClose={() => setIsWishlistOpen(false)}
                        wishlistItems={wishlistItems}
                        onRemoveFromWishlist={handleWishlistToggle}
                        onChooseOptions={handleChooseOptions}
                    />
                )}

                {/* Immersive Spec sheet quick-view overlay */}
                {selectedProduct && (
                    <ProductDetailModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onWishlistToggle={handleWishlistToggle}
                        isInWishlist={wishlistItems.some((wi) => wi.id === selectedProduct.id)}
                        onAddToCart={handleAddToCartDetailed}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
