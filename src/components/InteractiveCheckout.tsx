/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Loader2, CheckCircle2, Ticket, FileCode, Printer, Check } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveCheckoutProps {
    cartItems: CartItem[];
    onOrderCompleted: () => void;
    onQuitCheckout: () => void;
}

interface ShippingForm {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export default function InteractiveCheckout({
    cartItems,
    onOrderCompleted,
    onQuitCheckout
}: InteractiveCheckoutProps) {
    const [step, setStep] = useState<'details' | 'processing' | 'receipt'>('details');
    const [form, setForm] = useState<ShippingForm>({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Italy',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const [currentLoadingMessage, setCurrentLoadingMessage] = useState('Initiating cryptographic secure tunnels...');

    // Totals calculations
    const shippingThreshold = 500;
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shippingCost = subtotal > shippingThreshold ? 0 : 45;
    const taxesAndDuties = subtotal * 0.08;
    const finalTotal = subtotal + shippingCost + taxesAndDuties;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');

        // Elegant step loading messages sequence
        const messages = [
            'Verifying bank tokenization gates...',
            'Conducting fraud pre-clearance tests...',
            'Archiving digital invoice to decentralized vaults...',
            'Generating bespoke garment allocation ledger...'
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < messages.length) {
                setCurrentLoadingMessage(messages[index]);
                index++;
            } else {
                clearInterval(interval);
                setStep('receipt');
            }
        }, 1100);
    };

    const handleCompleteSuccessReceipt = () => {
        onOrderCompleted(); // Clear actual cart items
        onQuitCheckout();   // Retrun home
    };

    return (
        <section className="min-h-screen bg-soft-gray dark:bg-rich-black py-12 sm:py-20 px-4 transition-colors duration-300">
            <div className="mx-auto max-w-4xl">
                
                {/* Upper navigate-back row */}
                {step === 'details' && (
                    <button
                        id="back-to-catalog"
                        onClick={onQuitCheckout}
                        className="mb-8 flex items-center gap-2 font-sans text-xs font-semibold tracking-widest text-rich-black/60 dark:text-white/60 hover:text-luxury-gold transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>RETURN TO EXPERIMENT STORE</span>
                    </button>
                )}

                {/* Left/Right layout */}
                <AnimatePresence mode="wait">
                    {step === 'details' && (
                        <motion.div
                            key="details-pane"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left items-start"
                        >
                            {/* Step Form Box */}
                            <form
                                id="checkout-secure-form"
                                onSubmit={handleFormSubmit}
                                className="md:col-span-7 bg-white dark:bg-rich-black border border-warm-beige/30 dark:border-white/10 p-6 sm:p-8 space-y-6"
                            >
                                <div className="flex items-center gap-2 border-b border-warm-beige/25 dark:border-white/10 pb-4">
                                    <ShieldCheck className="text-luxury-gold" size={18} />
                                    <h2 className="font-serif text-lg tracking-wider text-rich-black dark:text-white">SECURE PATRON CHECKOUT</h2>
                                </div>

                                {/* Area 1: Contact */}
                                <div className="space-y-4">
                                    <h3 className="font-sans text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase">01. CONTACT EMAIL</h3>
                                    <input
                                        id="checkout-email"
                                        type="email"
                                        required
                                        placeholder="patron@domain.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                    />
                                </div>

                                {/* Area 2: Delivery */}
                                <div className="space-y-4 border-t border-warm-beige/10 dark:border-white/5 pt-6">
                                    <h3 className="font-sans text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase">02. SHIPPING CORRESPONDENCE</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            id="checkout-firstname"
                                            type="text"
                                            required
                                            placeholder="First Name"
                                            value={form.firstName}
                                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                            className="w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                        />
                                        <input
                                            id="checkout-lastname"
                                            type="text"
                                            required
                                            placeholder="Last Name"
                                            value={form.lastName}
                                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                            className="w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                        />
                                    </div>
                                    <input
                                        id="checkout-address"
                                        type="text"
                                        required
                                        placeholder="Full Physical Address"
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        className="w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                    />
                                    <div className="grid grid-cols-3 gap-4">
                                        <input
                                            id="checkout-city"
                                            type="text"
                                            required
                                            placeholder="City"
                                            value={form.city}
                                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                                            className="col-span-2 w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                        />
                                        <input
                                            id="checkout-postal"
                                            type="text"
                                            required
                                            placeholder="Zip/Postal"
                                            value={form.postalCode}
                                            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                                            className="w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-sans text-xs tracking-wider text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Area 3: Payment details */}
                                <div className="space-y-4 border-t border-warm-beige/10 dark:border-white/5 pt-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-sans text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase">03. SECURED VAULT PAYMENT</h3>
                                        <div className="flex gap-1">
                                            <span className="h-4 w-6 bg-rich-black dark:bg-white/10 text-white border border-white/20 rounded-[2px] text-[8px] font-bold flex items-center justify-center tracking-normal">VISA</span>
                                            <span className="h-4 w-6 bg-rich-black dark:bg-white/10 text-white border border-white/20 rounded-[2px] text-[8px] font-bold flex items-center justify-center tracking-normal">MC</span>
                                        </div>
                                    </div>
                                    <input
                                        id="checkout-cardnumber"
                                        type="text"
                                        required
                                        maxLength={19}
                                        placeholder="CARD NUMBER (4111 8888 ...)"
                                        value={form.cardNumber}
                                        onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                                        className="w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-serif text-sm tracking-[0.2em] text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            id="checkout-expiry"
                                            type="text"
                                            required
                                            maxLength={5}
                                            placeholder="MM/YY"
                                            value={form.expiryDate}
                                            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                                            className="w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-sans text-xs tracking-widest text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none text-center"
                                        />
                                        <input
                                            id="checkout-cvv"
                                            type="password"
                                            required
                                            maxLength={4}
                                            placeholder="CVV"
                                            value={form.cvv}
                                            onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                                            className="w-full border border-warm-beige/40 dark:border-white/10 bg-transparent px-3 py-2.5 font-sans text-xs tracking-widest text-rich-black dark:text-white focus:border-luxury-gold focus:outline-none text-center"
                                        />
                                    </div>
                                </div>

                                {/* Complete sequence triggers */}
                                <button
                                    id="checkout-submit-cta"
                                    type="submit"
                                    className="w-full bg-rich-black dark:bg-white text-white dark:text-rich-black py-4 font-sans text-xs font-bold tracking-[0.25em] hover:bg-luxury-gold dark:hover:bg-luxury-gold hover:text-rich-black transition-colors shadow-lg"
                                >
                                    AUTHORIZE TRANSACTIONS LIMIT (${finalTotal.toLocaleString()})
                                </button>

                                <div className="text-center font-sans text-[9px] text-rich-black/30 dark:text-white/30 tracking-widest leading-relaxed">
                                    TRANSACTIONS ARE SIGNED ENCRYPTED BY AES-256 DIGITAL ENVELOPE PROTECTING PATRON ANONYMITY.
                                </div>
                            </form>

                            {/* Right: Order preview summary sheet */}
                            <div className="md:col-span-5 bg-white dark:bg-rich-black border border-warm-beige/30 dark:border-white/10 p-6 space-y-6">
                                <h3 className="font-serif text-base font-light tracking-wide text-rich-black dark:text-white border-b border-warm-beige/25 dark:border-white/10 pb-3">
                                    GARMENT REQUISITIONS
                                </h3>

                                <ul className="divide-y divide-warm-beige/10 dark:divide-white/5 max-h-72 overflow-y-auto no-scrollbar">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="py-3 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <img src={item.product.images[0]} alt={item.product.name} className="h-12 w-9 object-cover border border-warm-beige/20" referrerPolicy="no-referrer" />
                                                <div className="text-left leading-normal">
                                                    <h4 className="font-serif text-xs font-light text-rich-black dark:text-white">{item.product.name}</h4>
                                                    <p className="font-sans text-[9px] text-rich-black/40 dark:text-white/40 tracking-wider">
                                                        QTY: {item.quantity} &bull; SIZ: {item.selectedSize}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="font-serif text-xs font-bold text-rich-black dark:text-white">
                                                ${(item.product.price * item.quantity).toLocaleString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-warm-beige/20 dark:border-white/10 pt-4 space-y-2 text-xs tracking-wider">
                                    <div className="flex justify-between text-rich-black/50 dark:text-white/40">
                                        <span>TOTAL MERCHANDISE</span>
                                        <span>${subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-rich-black/50 dark:text-white/40">
                                        <span>DUTY CLEARANCE (8%)</span>
                                        <span>${taxesAndDuties.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-rich-black/50 dark:text-white/40">
                                        <span>EXPRESS SHIPPING</span>
                                        <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                                    </div>
                                    <div className="border-t border-warm-beige/20 dark:border-white/10 pt-3 flex justify-between font-serif text-sm font-semibold text-rich-black dark:text-white">
                                        <span>FINAL TOTAL</span>
                                        <span className="text-luxury-gold">${finalTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step Processing Loading Stage */}
                    {step === 'processing' && (
                        <motion.div
                            key="processing-pane"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white dark:bg-rich-black border border-warm-beige/30 dark:border-white/10 p-12 text-center max-w-xl mx-auto flex flex-col items-center justify-center space-y-6"
                        >
                            <Loader2 size={36} className="text-luxury-gold animate-spin stroke-[1.5]" />
                            <h3 className="font-serif text-lg tracking-widest text-rich-black dark:text-white uppercase">AUTHORIZING SECURED CONTRACTS</h3>
                            <p className="font-sans text-xs font-light text-rich-black/40 dark:text-white/40 tracking-widest animate-pulse">
                                {currentLoadingMessage}
                            </p>
                        </motion.div>
                    )}

                    {/* Step Invoice Receipt Summary Sheet */}
                    {step === 'receipt' && (
                        <motion.div
                            key="receipt-pane"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-rich-black border border-luxury-gold/50 p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl space-y-8 text-left relative overflow-hidden"
                        >
                            {/* Visual Gold security outline label */}
                            <div className="absolute right-0 top-0 bg-luxury-gold text-rich-black font-semibold text-[8px] tracking-[0.3em] font-sans px-8 py-2 rotate-45 translate-x-7 translate-y-4">
                                PAID SECURE
                            </div>

                            <div className="text-center space-y-2">
                                <span className="font-serif text-2xl font-light tracking-[0.4em] block text-luxury-gold">M&Aacute;ISON</span>
                                <span className="font-sans text-[10px] tracking-widest text-rich-black/40 dark:text-white/40 block">TRANSACTIONS RECEIPT RECORD</span>
                            </div>

                            <div className="border-t border-b border-warm-beige/20 dark:border-white/10 py-4 grid grid-cols-2 gap-4 font-sans text-xs text-rich-black/60 dark:text-white/60">
                                <div className="space-y-1 text-left">
                                    <p className="font-semibold text-rich-black dark:text-white text-[9px] tracking-widest uppercase">TRANSACTION SECURE ID</p>
                                    <p className="font-mono text-luxury-gold font-semibold">TXN-MSN-{Math.floor(100000 + Math.random() * 900000)}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="font-semibold text-rich-black dark:text-white text-[9px] tracking-widest uppercase">DATE COMPLETED</p>
                                    <p>{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>

                            {/* Patron details */}
                            <div className="space-y-2 font-sans text-xs">
                                <h4 className="font-bold text-[9px] tracking-widest text-luxury-gold uppercase">PATRON SHIPPING ASSIGNMENT</h4>
                                <div className="bg-soft-gray/50 dark:bg-white/5 p-4 text-left font-light leading-relaxed text-rich-black/85 dark:text-white/85">
                                    <p className="font-semibold text-rich-black dark:text-white">{form.firstName} {form.lastName}</p>
                                    <p>{form.address}</p>
                                    <p>{form.city}, {form.postalCode}</p>
                                    <p>{form.country}</p>
                                    <p className="mt-2 text-rich-black/40 dark:text-white/40 text-[10px]">CORRESPONDENCE COPIED TO: <span className="font-mono underline text-luxury-gold">{form.email}</span></p>
                                </div>
                            </div>

                            {/* Itemized Requisition lists */}
                            <div className="space-y-3 font-sans text-xs">
                                <h4 className="font-bold text-[9px] tracking-widest text-luxury-gold uppercase">REQUISITIONED ARTICLES</h4>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-warm-beige/20 dark:border-white/10 font-bold text-[9px] tracking-wider text-rich-black/40 dark:text-white/40">
                                            <th className="py-2">ARTICLE</th>
                                            <th className="py-2 text-center">QTY</th>
                                            <th className="py-2 text-right">METRIC COST</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-warm-beige/10 dark:divide-white/5 font-light">
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td className="py-3 flex items-center gap-2">
                                                    <span className="font-serif text-xs">{item.product.name}</span>
                                                    <span className="text-[9px] font-bold text-luxury-gold bg-luxury-gold/10 px-1.5 py-0.5">{item.selectedSize}</span>
                                                </td>
                                                <td className="py-3 text-center">{item.quantity}</td>
                                                <td className="py-3 text-right font-mono font-semibold">${(item.product.price * item.quantity).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Receipt math lines */}
                            <div className="border-t border-warm-beige/20 dark:border-white/10 pt-4 space-y-2 font-sans text-xs text-rich-black/60 dark:text-white/60">
                                <div className="flex justify-between">
                                    <span>MERCHANDISE SUB</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>MEDITERRANEAN DUTY CLEARANCE (8%)</span>
                                    <span>${taxesAndDuties.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>PRIORITY COURIER DELIVERY</span>
                                    <span>{shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost}`}</span>
                                </div>
                                <div className="border-t border-luxury-gold/50 pt-3 flex justify-between font-serif text-sm font-semibold text-rich-black dark:text-white">
                                    <span className="text-luxury-gold font-bold">TOTAL REMITTANCE APPLIED</span>
                                    <span className="text-luxury-gold font-bold">${finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Print / Actions triggers */}
                            <div className="border-t border-warm-beige/20 dark:border-white/10 pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <button
                                    id="checkout-print-invoice"
                                    onClick={() => window.print()}
                                    className="flex items-center gap-1.5 font-sans text-[10px] font-bold tracking-widest text-luxury-gold hover:underline"
                                >
                                    <Printer size={13} />
                                    <span>PRINT DIGITAL LEDGER SHEET</span>
                                </button>

                                <button
                                    id="checkout-exit-receipt"
                                    onClick={handleCompleteSuccessReceipt}
                                    className="w-full sm:w-auto bg-rich-black dark:bg-white text-white dark:text-rich-black px-8 py-3.5 font-sans text-xs font-bold tracking-[0.25em] hover:bg-luxury-gold dark:hover:bg-luxury-gold hover:text-rich-black transition-colors"
                                >
                                    EXIT SECURED SESSION
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
