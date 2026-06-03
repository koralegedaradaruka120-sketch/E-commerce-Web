/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BRAND_STORY } from '../data';
import { Sparkles, Calendar, Globe } from 'lucide-react';

export default function BrandStory() {
    const leftPortrait = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
    const rightPortrait = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';

    return (
        <section id="brand-story-section" className="bg-warm-beige/10 dark:bg-white/5 py-20 sm:py-28 border-t border-b border-warm-beige/25 dark:border-white/10 transition-colors duration-300 text-left">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Magazine Split Screen Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Frame: Two offset high-end images */}
                    <div className="lg:col-span-5 relative flex items-center justify-center p-4">
                        <div className="relative aspect-[3/4] w-2/3 overflow-hidden border border-warm-beige/30 shadow-xl">
                            <img
                                id="story-left-img"
                                src={leftPortrait}
                                alt="Atelier draft linen composition"
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="absolute right-0 bottom-0 aspect-[3/4] w-1/2 overflow-hidden border border-warm-beige/45 shadow-2xl translate-y-6 -translate-x-4">
                            <img
                                id="story-right-img"
                                src={rightPortrait}
                                alt="Atelier wool tailored shoulder"
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>

                    {/* Right Frame: Narrative text block */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <span className="font-sans text-[10px] font-bold tracking-[0.4em] text-luxury-gold uppercase">
                            CREATIVE MANIFESTO
                        </span>
                        
                        <h3 className="mt-4 font-serif text-3xl font-light tracking-wide text-rich-black dark:text-white leading-tight sm:text-4xl max-w-xl">
                            {BRAND_STORY.title}
                        </h3>

                        {/* Large italic blockquote */}
                        <div className="mt-6 border-l-[1.5px] border-luxury-gold pl-6">
                            <p className="font-serif italic text-base leading-relaxed text-rich-black/80 dark:text-white/80 max-w-lg tracking-wide">
                                &ldquo;{BRAND_STORY.quote}&rdquo;
                            </p>
                        </div>

                        {/* Story Paragraphs */}
                        <div className="mt-8 space-y-6 font-sans text-xs font-light leading-relaxed tracking-wider text-rich-black/70 dark:text-white/70 max-w-xl">
                            {BRAND_STORY.paragraphs.map((p, index) => (
                                <p key={index}>{p}</p>
                            ))}
                        </div>

                        {/* Editorial Quality assurance bullets */}
                        <div className="mt-8 border-t border-warm-beige/30 dark:border-white/10 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-serif text-sm font-semibold text-rich-black dark:text-white flex items-center gap-1.5">
                                    <Globe size={13} className="text-luxury-gold" />
                                    <span>Milano Office</span>
                                </h4>
                                <p className="mt-1.5 font-sans text-[10px] text-rich-black/50 dark:text-white/40 tracking-widest uppercase">Patterns Drafted</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-sm font-semibold text-rich-black dark:text-white flex items-center gap-1.5">
                                    <Sparkles size={13} className="text-luxury-gold" />
                                    <span>Ethical Source</span>
                                </h4>
                                <p className="mt-1.5 font-sans text-[10px] text-rich-black/50 dark:text-white/40 tracking-widest uppercase">Gots Certified</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-sm font-semibold text-rich-black dark:text-white flex items-center gap-1.5">
                                    <Calendar size={13} className="text-luxury-gold" />
                                    <span>Anti-Trend</span>
                                </h4>
                                <p className="mt-1.5 font-sans text-[10px] text-rich-black/50 dark:text-white/40 tracking-widest uppercase">Built to Wear 10+ Yrs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
