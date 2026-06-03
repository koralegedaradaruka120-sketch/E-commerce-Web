/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Check, CreditCard, ShieldAlert, ArrowRight } from 'lucide-react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setSubscribed(true);
        setTimeout(() => {
            setEmail('');
        }, 3000);
    };

    return (
        <footer className="bg-rich-black text-white py-16 lg:py-24 border-t border-white/10 text-left transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Upper row: branding & beautiful newsletter layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
                    <div className="lg:col-span-5 space-y-4">
                        <span className="font-serif text-3xl font-light tracking-[0.45em]">M&Aacute;ISON</span>
                        <p className="font-sans text-xs font-light leading-relaxed tracking-widest text-white/50 max-w-sm mt-3">
                            Portable architecture built to outlast trend. Masterfully designed in-house using fibers certifiable by global sustainable bodies.
                        </p>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                        <span className="font-sans text-[10px] font-bold tracking-[0.35em] text-luxury-gold uppercase block">
                            THE DIGITAL LOOKBOOK LIST
                        </span>
                        <p className="font-sans text-xs font-light tracking-wide text-white/70 max-w-lg leading-relaxed">
                            Subscribe to receive early allocations, private lookbook PDFs, and notifications regarding biannual seasonal runway departures.
                        </p>

                        <form onSubmit={handleSubscribe} className="mt-4 max-w-md">
                            {subscribed ? (
                                <div className="border border-luxury-gold/50 bg-luxury-gold/5 px-4 py-3 flex items-center gap-2 text-[10px] tracking-widest font-bold text-luxury-gold uppercase animate-fadeIn">
                                    <Check size={12} className="stroke-[3]" />
                                    <span>YOUR CORRESPONDENCE IS RECORDED. LOOKBOOKS COMMENCE WITH THE AUTUMN EQUINOX.</span>
                                </div>
                            ) : (
                                <div className="flex border-b border-white/30 focus-within:border-luxury-gold transition-colors pb-1">
                                    <input
                                        id="newsletter-email-input"
                                        type="email"
                                        required
                                        placeholder="ENTER YOUR E-MAIL CORRESPONDENCE"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent px-2 py-2 font-sans text-xs tracking-widest text-white placeholder-white/30 focus:outline-none"
                                    />
                                    <button
                                        id="newsletter-subscribe-submit"
                                        type="submit"
                                        className="p-2 hover:text-luxury-gold transition-colors"
                                        aria-label="Subscribe to e-mail"
                                    >
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Middle rows: Column grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/10">
                    
                    {/* Col 1 */}
                    <div>
                        <h4 className="font-sans text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase mb-5">
                            DEPARTMENTS
                        </h4>
                        <ul className="space-y-3 font-sans text-xs font-light text-white/60 tracking-wider">
                            <li><a href="#products-catalog-section" className="hover:text-white transition-colors">Women’s Atelier</a></li>
                            <li><a href="#products-catalog-section" className="hover:text-white transition-colors">Men’s Lab</a></li>
                            <li><a href="#products-catalog-section" className="hover:text-white transition-colors">Fine Accessories</a></li>
                            <li><a href="#products-catalog-section" className="hover:text-white transition-colors">Leather footwear</a></li>
                            <li><a href="#products-catalog-section" className="hover:text-white transition-colors">Digital Gift Vouchers</a></li>
                        </ul>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h4 className="font-sans text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase mb-5">
                            CARE & SUPPORT
                        </h4>
                        <ul className="space-y-3 font-sans text-xs font-light text-white/60 tracking-wider">
                            <li><a href="#brand-story-section" className="hover:text-white transition-colors">Garment Clean Care</a></li>
                            <li><span className="cursor-not-allowed hover:text-white/40">Secured Shipping & Duty</span></li>
                            <li><span className="cursor-not-allowed hover:text-white/40">Exchange Portals</span></li>
                            <li><span className="cursor-not-allowed hover:text-white/40">Patron Protection Law</span></li>
                            <li><span className="cursor-not-allowed hover:text-white/40">Private Consultations</span></li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="font-sans text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase mb-5">
                            CORPORATE ETHICS
                        </h4>
                        <ul className="space-y-3 font-sans text-xs font-light text-white/60 tracking-wider">
                            <li><a href="#brand-story-section" className="hover:text-white transition-colors">The Carbon Zero Pledge</a></li>
                            <li><span className="cursor-not-allowed hover:text-white/40">Northern Italy Tanneries</span></li>
                            <li><span className="cursor-not-allowed hover:text-white/40">GOTS Yarn Certification</span></li>
                            <li><span className="cursor-not-allowed hover:text-white/40">Transparency Disclosures</span></li>
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h4 className="font-sans text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase mb-5">
                            HEAD ATELIER OFFICE
                        </h4>
                        <p className="font-sans text-xs font-light text-white/60 tracking-wider leading-relaxed">
                            Maison Haute Couture Services Ltd. <br />
                            74 Via della Spiga, <br />
                            20121 Mil&aacute;no, Italy. <br />
                            <span className="mt-2 text-[10px] text-luxury-gold font-bold uppercase block tracking-widest">VISITS BY ALLOCATION ONLY</span>
                        </p>
                    </div>
                </div>

                {/* Bottom row: rights & premium credentials */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-white/40 font-sans font-light">
                    <span>&copy; {new Date().getFullYear()} MAISON HAUTE COUTURE SERVICES. ALL RIGHTS RESERVED.</span>
                    <div className="flex gap-4 items-center">
                        <span className="flex items-center gap-1.5"><CreditCard size={10} /> PCI SECURE CHANNELS</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1.5"><ShieldAlert size={10} /> TLS 1.3 LEDGER CERTIFIED</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
