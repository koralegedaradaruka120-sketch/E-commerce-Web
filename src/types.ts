/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorVariant {
  name: string;
  hex: string;
}

export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    details: string[];
    composition: string;
    care: string[];
    category: 'men' | 'women' | 'accessories' | 'shoes';
    images: string[];
    colors: ColorVariant[];
    sizes: SizeOption[];
    tag?: 'New' | 'Best Seller' | 'Trending';
    rating: number;
    reviewsCount: number;
    sku: string;
}

export interface CartItem {
    id: string; // Unique id combining product ID, selected color name, and selected size
    product: Product;
    selectedColor: ColorVariant;
    selectedSize: SizeOption;
    quantity: number;
}

export interface WishlistItem {
    product: Product;
    addedAt: number;
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
}

export interface CheckoutDetails {
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
