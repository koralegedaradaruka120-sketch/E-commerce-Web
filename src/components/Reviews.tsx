/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CLIENT_REVIEWS } from '../data';
import { Review } from '../types';
import { Star, MessageSquareCode, Check, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>(CLIENT_REVIEWS);
    const [authorName, setAuthorName] = useState('');
    const [ratingVal, setRatingVal] = useState(5);
    const [commentText, setCommentText] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!authorName.trim() || !commentText.trim()) return;

        const newReview: Review = {
            id: `rev-custom-${Date.now()}`,
            author: authorName,
            rating: ratingVal,
            comment: commentText,
            date: 'Today',
            verified: true
        };

        setReviews([newReview, ...reviews]);
        setSubmitSuccess(true);
        setTimeout(() => {
            setSubmitSuccess(false);
            setIsFormOpen(false);
            setAuthorName('');
            setCommentText('');
            setRatingVal(5);
        }, 1500);
    };

    const averageRating = (reviews.reduce((sum, current) => sum + current.rating, 0) / reviews.length).toFixed(1);

    return (
        <section id="reviews-section" className="bg-white dark:bg-rich-black py-16 sm:py-24 transition-colors duration-300 text-left">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section header split */}
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-b border-warm-beige/20 dark:border-white/10 pb-8 mb-12">
                    <div>
                        <span className="font-sans text-[10px] font-bold tracking-[0.35em] text-luxury-gold uppercase block">
                            THE APPRECIATION
                        </span>
                        <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-rich-black dark:text-white sm:text-4xl">
                            Verified Client Experience
                        </h2>
                    </div>

                    {/* Numeric rating indicator */}
                    <div className="flex items-center gap-4 bg-soft-gray/50 dark:bg-white/5 border border-warm-beige/20 dark:border-white/10 p-4">
                        <div className="text-center pr-4 border-r border-warm-beige/30 dark:border-white/10">
                            <span className="font-serif text-2xl font-bold text-rich-black dark:text-white">{averageRating}</span>
                            <span className="font-sans text-[10px] tracking-wide text-rich-black/40 dark:text-white/40 block">OUT OF 5</span>
                        </div>
                        <div>
                            <div className="flex text-luxury-gold">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={11} fill={s <= Math.round(parseFloat(averageRating)) ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <span className="mt-1 font-sans text-[10px] tracking-widest text-rich-black/50 dark:text-white/50 block uppercase">
                                BASED ON {reviews.length} VERIFIED BUYERS
                            </span>
                        </div>
                    </div>
                </div>

                {/* Submissions Action Toggles */}
                <div className="mb-10 flex justify-end">
                    <button
                        id="open-review-form-btn"
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="flex items-center gap-2 border border-rich-black dark:border-white hover:bg-rich-black hover:text-white dark:hover:bg-white dark:hover:text-rich-black bg-transparent px-5 py-3 font-sans text-[10px] font-bold tracking-widest text-rich-black dark:text-white transition-all"
                    >
                        <MessageSquareCode size={13} />
                        <span>{isFormOpen ? 'CANCEL REVIEW' : 'SHARE MY FEEDBACK'}</span>
                    </button>
                </div>

                {/* Submit review Form overlay */}
                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-12"
                        >
                            <form
                                id="luxury-review-form"
                                onSubmit={handleSubmitReview}
                                className="border border-luxury-gold/30 bg-warm-beige/5 dark:bg-white/5 p-6 max-w-2xl mx-auto space-y-4"
                            >
                                <div className="flex items-center gap-2 text-luxury-gold font-sans text-xs tracking-wider font-semibold mb-2">
                                    <Sparkles size={14} />
                                    <span>YOUR EXPERIENCED ALIGNMENT</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="text-left">
                                        <label htmlFor="rev-author-name" className="font-sans text-[10px] tracking-widest font-semibold block text-rich-black dark:text-white/80 uppercase">
                                            Signature Name
                                        </label>
                                        <input
                                            id="rev-author-name"
                                            type="text"
                                            required
                                            placeholder="e.g., Alister Ward"
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                            className="mt-1.5 w-full border border-warm-beige/40 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label htmlFor="rev-rating-value" className="font-sans text-[10px] tracking-widest font-semibold block text-rich-black dark:text-white/80 uppercase">
                                            Score alignment
                                        </label>
                                        <select
                                            id="rev-rating-value"
                                            value={ratingVal}
                                            onChange={(e) => setRatingVal(Number(e.target.value))}
                                            className="mt-1.5 w-full border border-warm-beige/40 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                        >
                                            <option value={5} className="text-rich-black">Excellent &bull; 5 Stars</option>
                                            <option value={4} className="text-rich-black">Pristine &bull; 4 Stars</option>
                                            <option value={3} className="text-rich-black">Adequate &bull; 3 Stars</option>
                                            <option value={2} className="text-rich-black">Modest &bull; 2 Stars</option>
                                            <option value={1} className="text-rich-black">Unrefined &bull; 1 Star</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="text-left">
                                    <label htmlFor="rev-comment-text" className="font-sans text-[10px] tracking-widest font-semibold block text-rich-black dark:text-white/80 uppercase">
                                        Critique Commentary
                                    </label>
                                    <textarea
                                        id="rev-comment-text"
                                        required
                                        rows={3}
                                        placeholder="Critique garment weight, texture feel, sewing detail, packaging craft..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="mt-1.5 w-full border border-warm-beige/40 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                    />
                                </div>

                                <button
                                    id="submit-review-action"
                                    type="submit"
                                    disabled={submitSuccess}
                                    className="w-full flex items-center justify-center gap-2 bg-rich-black dark:bg-white text-white dark:text-rich-black py-3 font-sans text-[10px] font-bold tracking-[0.2em] hover:bg-luxury-gold dark:hover:bg-luxury-gold hover:text-rich-black transition-all"
                                >
                                    {submitSuccess ? (
                                        <div className="flex items-center gap-1 text-green-600 font-bold">
                                            <Check size={14} />
                                            <span>CRITIQUE STORED ON LEDGER</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Send size={11} />
                                            <span>SUBMIT TO ATELIER LEDGER</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Reviews card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {reviews.map((rev) => (
                        <div
                            id={`review-item-${rev.id}`}
                            key={rev.id}
                            className="bg-soft-gray/30 dark:bg-white/5 border border-warm-beige/10 dark:border-white/5 p-6 sm:p-8 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between font-sans text-xs text-rich-black/40 dark:text-white/40 mb-3">
                                    <span className="font-semibold text-rich-black dark:text-white/80">{rev.author}</span>
                                    <span>{rev.date}</span>
                                </div>

                                <div className="flex text-luxury-gold mb-3">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={11} fill={s <= rev.rating ? "currentColor" : "none"} className="mr-0.5" />
                                    ))}
                                </div>

                                <p className="font-serif italic text-sm leading-relaxed tracking-wide text-rich-black/70 dark:text-white/70">
                                    &ldquo;{rev.comment}&rdquo;
                                </p>
                            </div>

                            {rev.verified && (
                                <div className="mt-4 flex items-center gap-1.5 text-[9px] tracking-widest text-luxury-gold font-bold uppercase">
                                    <Check size={10} className="stroke-[3]" />
                                    <span>VERIFIED PATRON INVOICE ACCESS</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
