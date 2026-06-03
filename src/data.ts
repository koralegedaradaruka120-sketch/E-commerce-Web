/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from './types';

export const LUXURY_PRODUCTS: Product[] = [
  {
    id: 'product-1',
    name: 'Maison Cashmere Overcoat',
    price: 1250,
    description: 'An unstructured double-breasted overcoat tailored from exceptional double-faced organic virgin wool and rare Inner Mongolian cashmere. Defined by natural shoulders, hand-finished stitched lapels, and an elegant fluid silhouette.',
    details: [
      'Luxurious double-faced weave',
      'Intricate hand-stitched detailing on margins',
      'Concealed horn-button closure',
      'Wide peak lapel with canvas structure',
      'Delivered with an organic linen dust coat bag',
      'Ethically sourced fibers certifiable by GOTS'
    ],
    composition: '85% Organic Virgin Wool, 15% Mongolia Cashmere. Undercollar: 100% Calf Suede.',
    care: [
      'Dry clean only by leather/wool specialist',
      'Do not wash or tumble dry',
      'Store hanging on broad luxury wooden hangers'
    ],
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Warm Beige', hex: '#EAE3D8' },
      { name: 'Rich Black', hex: '#111111' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tag: 'New',
    rating: 4.9,
    reviewsCount: 38,
    sku: 'MSN-CO-BE-001'
  },
  {
    id: 'product-2',
    name: 'Tailored Wool Blazer',
    price: 890,
    description: 'Structured tailoring inspired by Italian heritage. Constructed from lightweight high-twist worsted wool with canvassed chest lining and hand-carved natural horn buttons.',
    details: [
      'Full floating canvas construction',
      'Slightly padded shoulders',
      'Dual rear vents for effortless movement',
      'Functional surgical cuffs with four buttons',
      'Genuine undercollar felt'
    ],
    composition: '100% Worsted Super 120s Wool. Lining: 100% Breathable Bemberg Cupro.',
    care: [
      'Professional dry clean only',
      'Steam gently from 15cm distance',
      'Brush with soft horsehair garment brush after wear'
    ],
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Rich Black', hex: '#111111' },
      { name: 'Soft Gray', hex: '#8C8C8C' },
      { name: 'Warm Beige', hex: '#D2C3B1' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tag: 'Best Seller',
    rating: 4.8,
    reviewsCount: 42,
    sku: 'MSN-BL-BK-002'
  },
  {
    id: 'product-3',
    name: 'Atelier Ribbon Silk Dress',
    price: 950,
    description: 'A mesmerizing fluid maxi dress cut from premium heavyweight silk crepe-de-chine. Designed with an elegant backless drape, high mock-neck collar, and premium waist ribbons that sway dynamically.',
    details: [
      'Made from heavy 22 momme silk crepe',
      'Asymmetric draping across front and back',
      'Hidden hand-stitched side zip closure',
      'Raw raw silk inner seams to defend luster',
      'Premium ribbon design for bespoke waist adjustment'
    ],
    composition: '100% Mulberry Silk Crepe-de-Chine.',
    care: [
      'Dry clean only by silk specialist',
      'Iron very cool under protective press cloth',
      'Do not wring or spray with perfume directly'
    ],
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Rich Black', hex: '#111111' },
      { name: 'Luxury Rose Gold', hex: '#D7B49B' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    tag: 'Trending',
    rating: 5.0,
    reviewsCount: 16,
    sku: 'MSN-DR-WT-003'
  },
  {
    id: 'product-4',
    name: 'Stitch-Detail Linen Trench',
    price: 780,
    description: 'A structural double-breasted trench coat built from pre-washed European flax linen. Softly structured, featuring prominent tone-on-tone pick stitching along all major seams.',
    details: [
      'Cut from premium long-staple linen',
      'Hand-crafted tortoiseshell resin buttons',
      'Removable belt with leather slide buckle',
      'Epaulets and functional storm flap',
      'Fully bound internal seams with silk bias'
    ],
    composition: '100% European Flax Organic Linen. Trim: 100% Genuine Nappa Leather.',
    care: [
      'Dry clean or hand wash delicate cycle cold',
      'Lay flat to dry naturally in shade',
      'Linen wrinkles naturally, celebrate its characteristic texture'
    ],
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Warm Beige', hex: '#EAE3D8' },
      { name: 'Olive Drab', hex: '#585D4E' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.7,
    reviewsCount: 29,
    sku: 'MSN-TR-LN-004'
  },
  {
    id: 'product-5',
    name: 'Relaxed Merino Knitwear',
    price: 390,
    description: 'A heavyweight, beautifully boxy knitwear piece spun from extra-fine Italian merino wool. Provides exceptional thermal regulation, natural elastic properties, and unparalleled cloud-like softness.',
    details: [
      'Heavy-gauge 7G cardigan style stitch',
      'Dropped shoulder and mock neck collar',
      'Slightly cropped hem for modern styling pairing',
      'Signature minimal knit line down center back',
      'Reinforced cuffs and collar ribs'
    ],
    composition: '100% Extra-fine Italian Merino Wool.',
    care: [
      'Hand wash inside out with wool detergent in cold water',
      'Never wring; roll in towel to squeeze out water',
      'Dry flat to prevent stretching out of dimensions'
    ],
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Warm Beige', hex: '#EAE3D8' },
      { name: 'Rich Black', hex: '#111111' },
      { name: 'Soft Gray', hex: '#E0E0E0' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tag: 'New',
    rating: 4.9,
    reviewsCount: 54,
    sku: 'MSN-KN-MR-005'
  },
  {
    id: 'product-6',
    name: 'Minimalist Calf-Skin Tote',
    price: 1450,
    description: 'An architectural carryall masterfully constructed from full-grain French calfskin leather. It exhibits geometric clean panels, hand-painted edge dyes, and a luxurious suede lining with modular pocket organizer.',
    details: [
      'Sourced from certified Tannery in Alsace, France',
      'Entirely stitched by master leather ateliers',
      'Includes detachable interior zip pouch with key clip',
      'Magnetic lock concealed within leather fibers',
      'Embossed gold foil signature inside'
    ],
    composition: '100% Full-grain French Calf Leather. Lining: 100% Suede Leather.',
    care: [
      'Wipe clean occasionally with microfiber sponge',
      'Apply high-quality neutral leather conditioner twice a year',
      'Protect from intense water exposure or wet grease stains'
    ],
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Rich Black', hex: '#111111' },
      { name: 'Cognac Gold', hex: '#AD7145' },
      { name: 'Alabaster White', hex: '#F0EFEB' }
    ],
    sizes: ['M'],
    tag: 'Best Seller',
    rating: 4.9,
    reviewsCount: 22,
    sku: 'MSN-BG-CS-006'
  },
  {
    id: 'product-7',
    name: 'Maison No. 7 Extrait de Parfum',
    price: 210,
    description: 'A delicate yet lingering luxury fragrance combining top notes of crisp bergamot and dry cedarwood with hearts of luxurious Florentine iris, on a smooth warm base of white amber and rich sandalwood.',
    details: [
      'High concentration 30% concentration Extrait de Parfum',
      'Hand-blended and bottled in Grasse, France',
      'Heavy Italian magnetic cap bottle with polished gold letters',
      'Rich, layered dry-down that stays on skin for 12+ hours',
      'Unisex olfactive structure designed for all seasons'
    ],
    composition: 'Alcohol Denat., Fragrance (Parfum), Water (Aqua), Linalool, Coumarin.',
    care: [
      'Store away from intense direct sunlight',
      'Keep in a cool dry cabinet rather than high humidity shower rooms',
      'Avoid high temperatures for fragrance stability'
    ],
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Pure Gold', hex: '#C8A96B' }
    ],
    sizes: ['S'],
    tag: 'Trending',
    rating: 4.8,
    reviewsCount: 67,
    sku: 'MSN-FR-PF-007'
  },
  {
    id: 'product-8',
    name: 'Aura Suede Chelsea Boot',
    price: 620,
    description: 'A modern classic, sleek chelsea silhouette constructed with premium water-resistant calf suede and authentic crepe soles. Designed to contour elegantly around the ankle.',
    details: [
      'Handmade in Porto, Portugal',
      'Constructed with strong stitch-down Blake welting',
      'Stretchy dual side panels with reinforced elastic bounds',
      'Extra padded calf leather insole with premium footbed support',
      'Sleek woven back pull-tabs'
    ],
    composition: '100% Fine Italian Calf Suede Leather. Sole: 100% Natural Hevea Crepe Rubber.',
    care: [
      'Spray with high-durability suede protector before first wear',
      'Brush away dirt with specialized brass-wire suede brush in one direction',
      'Do not apply standard leather polish or cream waxes'
    ],
    category: 'shoes',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Warm Beige', hex: '#D2C3B1' },
      { name: 'Rich Black', hex: '#111111' }
    ],
    sizes: ['M', 'L'],
    rating: 4.6,
    reviewsCount: 15,
    sku: 'MSN-SH-SU-008'
  },
  {
    id: 'product-9',
    name: 'Modernist Sleek Slide',
    price: 490,
    description: 'Sculpted sandals utilizing single-panel luxury vachetta leather. Minimal, sophisticated, and perfect for warm luxury resort escapes.',
    details: [
      'Vegetable-tanned double vachetta leather upper',
      'Molded micro-heel for comfortable posture',
      'Slightly cushioned layer beneath calf alignment',
      'Hand-burnished leather outsole edges'
    ],
    composition: '100% Full-grain Vachetta Leather upper & footbed.',
    care: [
      'Avoid walking in wet mud or deep water puddles',
      'Condition upper occasionally with leather wax',
      'Wipe footbed clean with water dampened soft washcloth'
    ],
    category: 'shoes',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Warm Beige', hex: '#EAE3D8' },
      { name: 'Rich Black', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L'],
    tag: 'New',
    rating: 4.5,
    reviewsCount: 19,
    sku: 'MSN-SH-SL-009'
  },
  {
    id: 'product-10',
    name: 'Monolith Acetate Eyewear',
    price: 310,
    description: 'Architectural thick-rim sunglasses with sculptural temples, custom raw copper internal reinforcement wire, and premium 100% UVA/UVB Carl Zeiss glass lenses.',
    details: [
      'Individually hand-polished organic plant-based acetate',
      'Ultra durable 5-barrel hinge setup with gold plating',
      'Non-reflective dark tint lenses certified by Carl Zeiss',
      'Includes gold-stamped premium magnetic leather fold-box'
    ],
    composition: '100% Eco-Acetate. 18k Gold plated metal rivets.',
    care: [
      'Rinse away saltwater or grime under cold run tapwater',
      'Only clean with included microfiber cloth',
      'Do not rest face-down on hard concrete surfaces'
    ],
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Rich Black', hex: '#111111' },
      { name: 'Warm Beige', hex: '#EAE3D8' }
    ],
    sizes: ['M'],
    rating: 4.8,
    reviewsCount: 31,
    sku: 'MSN-AC-SG-010'
  }
];

export const CLIENT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Râstova',
    rating: 5,
    comment: 'The cashmere overcoat is breathtaking. The drape, the heavy weight of the fabric, and the exquisite hand-stitching along the lapels feel like couture. Absolute masterpiece.',
    date: 'April 14, 2026',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    rating: 5,
    comment: 'Exceptional tailoring. The worsted wool blazer fits like a glove around the shoulders with a beautiful high armhole that maintains perfect sleek lines during movement.',
    date: 'May 02, 2026',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Chiara Gualtieri',
    rating: 5,
    comment: 'Fast shipping and beautifully packaged with cedar wood blocks and fabric hanger bags. The leather handle stitch on the calf-skin tote bag is symmetric work of art.',
    date: 'May 18, 2026',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Jonathan Choi',
    rating: 4,
    comment: 'No. 7 is a magnificent woody iris. Sophisticated dry-down with noticeable, mature amber notes. A very solid formulation which isn’t overly synthetic at all.',
    date: 'June 01, 2026',
    verified: true
  }
];

export const BRAND_STORY = {
  quote: "L’ÉLEGANCE DE LA SIMPLICITÉ — THE BEAUTY OF THE RAW METALS AND REFINED FABRICS JOINED TO FORM PIECES INTENDED TO WITHSTAND TIME.",
  title: "A Study in Restraint and Form",
  subtitle: "Est. 2024",
  paragraphs: [
    "At MAISON, we dismiss the noisy cycle of micro-trends. We design for longevity, viewing clothing as portable architecture. Every seam is engineered, every textile selected for its tactile feedback, weight, and lifespan.",
    "Guided by an editorial aesthetic inspired by Swiss typography and Mediterranean color theory, our collections synthesize raw fabrics with precise silhouettes. Each piece represents a continuous search for harmony, designed in-house and built across family-owned tanneries and ateliers in Northern Italy, Portugal, and France.",
    "Our carbon-neutral supply chain respects the environment. We employ GOTS-certified organic virgin wool, heavyweight Mulberry silks, and genuine vegetable-tanned French calfskins—materials that grow more beautiful with time and carry a story of precise artisan handcraft."
  ]
};

export const INSTAGRAM_POSTS = [
  {
    id: 'ins-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    likes: '1.4k',
    comments: '42'
  },
  {
    id: 'ins-2',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    likes: '2.8k',
    comments: '98'
  },
  {
    id: 'ins-3',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    likes: '1.9k',
    comments: '36'
  },
  {
    id: 'ins-4',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80',
    likes: '3.2k',
    comments: '115'
  },
  {
    id: 'ins-5',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=400&q=80',
    likes: '2.1k',
    comments: '67'
  },
  {
    id: 'ins-6',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
    likes: '4.5k',
    comments: '182'
  }
];
