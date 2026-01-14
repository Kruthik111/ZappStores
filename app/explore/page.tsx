"use client";

import { PRODUCTS } from '@/lib/constants';
import { ProductCard } from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const CATEGORIES = ['ALL', 'TECH', 'APPAREL', 'GAMING'];

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState('ALL');

    const filteredProducts = activeCategory === 'ALL'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category.toUpperCase() === activeCategory);

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none mb-4">
                        DIGITAL<br />
                        <span className="text-accent-primary">VAULT</span>
                    </h1>
                    <p className="text-neutral-500 font-bold tracking-[0.3em] uppercase text-xs">
                        {filteredProducts.length} S-Tier Items Available
                    </p>
                </motion.div>

                <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-8 py-3 rounded-2xl text-xs font-black tracking-widest transition-all border",
                                activeCategory === cat
                                    ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                    : "bg-transparent text-neutral-500 border-white/10 hover:border-white/30 hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProducts.map((product, i) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                        <ProductCard {...product} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
