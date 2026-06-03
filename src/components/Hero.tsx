/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowDown, HelpCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
    onShopNowClick: () => void;
    onCategoryNavigate: (category: 'all' | 'men' | 'women' | 'accessories' | 'shoes') => void;
}

export default function Hero({ onShopNowClick, onCategoryNavigate }: HeroProps) {
    const bannerImage = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1920&q=80';

    return (
        <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-soft-gray dark:bg-rich-black">
            {/* Cinematic Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    id="hero-background-image"
                    src={bannerImage}
                    alt="MAISON Haute Couture Summer Campaign"
                    className="h-full w-full object-cover object-center brightness-[0.85] dark:brightness-[0.65] transition-all duration-700"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/70 via-rich-black/10 to-transparent" />
            </div>

            {/* Immersive Contents layout */}
            <div className="relative z-10 flex h-full items-end pb-16 sm:pb-24">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl text-left text-white">
                        {/* Staggered metadata tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-4 flex items-center gap-3"
                        >
                            <span className="h-[1px] w-8 bg-luxury-gold" />
                            <p className="font-sans text-xs font-semibold tracking-[0.3em] text-luxury-gold">
                                COUTURE VOL. II / ETHICAL ATELIER
                            </p>
                        </motion.div>

                        {/* Large Editorial Serif Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="font-serif text-4xl font-extralight tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight"
                        >
                            The Poetry of <br />
                            <span className="italic font-normal font-serif">Silhouette</span>
                        </motion.h1>

                        {/* Spacious description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="mt-6 font-sans text-sm font-light leading-relaxed tracking-widest text-white/80 max-w-lg"
                        >
                            Introducing a masterclass in modern restraint. Structured profiles engineered from organic Belgian linens, worsted wool, and Mongolian cashmere. Crafted to endure space, time, and trend.
                        </motion.p>

                        {/* Action buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                        >
                            <button
                                id="hero-shop-collection-button"
                                onClick={onShopNowClick}
                                className="group relative z-10 flex items-center justify-center gap-3 border border-white bg-white px-8 py-4 font-sans text-xs font-semibold tracking-[0.25em] text-rich-black transition-all duration-300 hover:bg-transparent hover:text-white"
                            >
                                <span>SHOP COLLECTION</span>
                                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </button>

                            <div className="flex gap-2">
                                <button
                                    id="hero-lnk-women"
                                    onClick={() => onCategoryNavigate('women')}
                                    className="flex-1 border border-white/20 hover:border-white/90 bg-black/20 hover:bg-black/40 px-5 py-4 font-sans text-[11px] font-semibold tracking-widest text-white transition-all duration-300"
                                >
                                    FOR WOMEN
                                </button>
                                <button
                                    id="hero-lnk-men"
                                    onClick={() => onCategoryNavigate('men')}
                                    className="flex-1 border border-white/20 hover:border-white/90 bg-black/20 hover:bg-black/40 px-5 py-4 font-sans text-[11px] font-semibold tracking-widest text-white transition-all duration-300"
                                >
                                    FOR MEN
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator prompt */}
            <div className="absolute right-4 bottom-8 z-10 hidden lg:flex flex-col items-center gap-4 text-white/50">
                <span className="font-sans text-[10px] tracking-[0.4em] rotate-90 origin-right translate-x-2.5 pb-8 font-light">
                    EXPLORE DOWN
                </span>
                <motion.button
                    id="hero-scroll-prompt-button"
                    onClick={onShopNowClick}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="p-3 rounded-full border border-white/20 hover:border-white/80 bg-rich-black/10 hover:bg-rich-black/40 text-white transition-colors cursor-pointer"
                    aria-label="Scroll down to products"
                >
                    <ArrowDown size={14} />
                </motion.button>
            </div>
        </section>
    );
}
