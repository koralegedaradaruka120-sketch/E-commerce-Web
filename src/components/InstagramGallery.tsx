/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { INSTAGRAM_POSTS } from '../data';
import { Heart, MessageCircle, Instagram, BellRing, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function InstagramGallery() {
    const [followed, setFollowed] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleFollowAtelierDoc = () => {
        setFollowed(!followed);
        const nextToast = !followed 
            ? 'JOURNAL SUBSCRIPTIONS ACTIVE &bull; COMPLIMENTARY LOOKBOOKS SYNCED'
            : 'JOURNAL DISCONNECTED';
        setToastMessage(nextToast);
        setTimeout(() => setToastMessage(null), 3500);
    };

    return (
        <section id="instagram-section" className="bg-soft-gray/30 dark:bg-white/5 py-12 sm:py-16 transition-colors duration-300 relative text-center">
            {/* Elegant Floating Toast */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-100 bg-rich-black dark:bg-white text-white dark:text-rich-black border border-luxury-gold px-6 py-2.5 shadow-xl glass-panel text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
                    >
                        <BellRing size={12} className="text-luxury-gold animate-bounce" />
                        <span dangerouslySetInnerHTML={{ __html: toastMessage }} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Heading */}
                <div className="mb-10 text-center">
                    <span className="font-sans text-[10px] font-bold tracking-[0.4em] text-luxury-gold uppercase">
                        ATELIER JOURNAL
                    </span>
                    <h3 className="mt-3 font-serif text-2xl font-light tracking-wide text-rich-black dark:text-white">
                        Digital Dossier @MAISON_JOURNAL
                    </h3>
                </div>

                {/* 6 Grid layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 select-none">
                    {INSTAGRAM_POSTS.map((post) => (
                        <div
                            id={`insta-post-${post.id}`}
                            key={post.id}
                            className="group relative aspect-square overflow-hidden bg-soft-gray dark:bg-white/5 border border-warm-beige/10"
                        >
                            <img
                                className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                                src={post.image}
                                alt={`Atelier story grid ${post.id}`}
                                referrerPolicy="no-referrer"
                            />
                            {/* Glassmorphic overlay displaying dummy metrics */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex gap-4 text-white text-xs font-sans tracking-widest font-semibold">
                                    <span className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors cursor-pointer">
                                        <Heart size={14} fill="currentColor" />
                                        <span>{post.likes}</span>
                                    </span>
                                    <span className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors cursor-pointer">
                                        <MessageCircle size={14} fill="currentColor" />
                                        <span>{post.comments}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Direct follow CTA */}
                <div className="mt-10 flex justify-center">
                    <button
                        id="insta-follow-cta"
                        onClick={handleFollowAtelierDoc}
                        className={`flex items-center gap-3 border px-6 py-3 font-sans text-[10px] font-bold tracking-[0.25em] transition-all duration-300 ${
                            followed
                                ? 'border-luxury-gold bg-luxury-gold text-rich-black'
                                : 'border-rich-black dark:border-white hover:bg-rich-black hover:text-white dark:hover:bg-white dark:hover:text-rich-black text-rich-black dark:text-white'
                        }`}
                    >
                        {followed ? (
                            <>
                                <Check size={11} className="stroke-[3]" />
                                <span>SUBSCRIBED</span>
                            </>
                        ) : (
                            <>
                                <Instagram size={11} />
                                <span>FOLLOW DIARY DOCUMENTS</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
