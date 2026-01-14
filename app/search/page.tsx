"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/constants';
import { ProductCard } from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import { Search, TrendingUp, Sparkles, Tag, ArrowRight, X, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORY_DISCOVERY = [
    { name: 'TECH', image: 'https://images.unsplash.com/photo-1420406676079-b8491f2d07c8?q=80&w=1171&auto=format&fit=crop&q=80&w=400', color: 'from-blue-500/20 to-cyan-500/20' },
    { name: 'APPAREL', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400', color: 'from-purple-500/20 to-pink-500/20' },
    { name: 'GAMING', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400', color: 'from-red-500/20 to-orange-500/20' },
    { name: 'ACCESSORIES', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400', color: 'from-emerald-500/20 to-teal-500/20' },
];

const BRANDS = ['NIKE', 'ADIDAS', 'SONY', 'APPLE', 'RAZER', 'LOGITECH', 'SAMSUNG', 'ASUS'];

function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || "";
    const [inputValue, setInputValue] = useState(query);

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            router.push(`/search?q=${encodeURIComponent(inputValue)}`);
        } else {
            router.push('/search');
        }
    };

    const results = query ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    ) : [];

    return (
        <div className="fixed inset-0 z-[110] bg-black overflow-y-auto custom-scrollbar">
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen relative">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="fixed top-8 left-6 md:left-12 p-4 glass rounded-2xl text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 group z-[120]"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">Back</span>
                </motion.button>

                {/* Search Input Area */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 relative group"
                >
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-accent-neon transition-colors" size={24} />
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search for items, brands, or categories..."
                            className="w-full bg-white/5 border-2 border-white/5 rounded-[2.5rem] pl-16 pr-24 py-6 text-xl md:text-2xl font-bold focus:outline-none focus:border-accent-neon/50 focus:bg-white/10 transition-all placeholder:text-neutral-600"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {inputValue && (
                                <button
                                    type="button"
                                    onClick={() => { setInputValue(""); router.push('/search'); }}
                                    className="p-2 hover:bg-white/10 rounded-full text-neutral-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="bg-white text-black px-6 py-3 rounded-2xl font-black text-xs tracking-widest hover:bg-accent-neon transition-all"
                            >
                                SEARCH
                            </button>
                        </div>
                    </form>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!query ? (
                        <motion.div
                            key="discovery"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-20"
                        >
                            {/* Categories */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <Sparkles size={20} className="text-accent-primary" />
                                    <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Explore Categories</h2>
                                </div>
                                <div className="flex md:grid md:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
                                    {CATEGORY_DISCOVERY.map((cat, i) => (
                                        <motion.button
                                            key={cat.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => router.push(`/search?q=${cat.name}`)}
                                            className="group relative flex-shrink-0"
                                        >
                                            <div className={cn(
                                                "w-24 h-24 md:w-full md:h-auto md:aspect-square rounded-full overflow-hidden border-2 border-white/5 relative bg-gradient-to-br transition-all duration-500 group-hover:scale-105 group-hover:border-accent-neon",
                                                cat.color
                                            )}>
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-[10px] md:text-lg font-black text-white tracking-widest group-hover:scale-110 transition-transform">{cat.name}</span>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </section>

                            {/* Brands */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <TrendingUp size={20} className="text-accent-secondary" />
                                    <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Trending Brands</h2>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {BRANDS.map((brand, i) => (
                                        <motion.button
                                            key={brand}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => router.push(`/search?q=${brand}`)}
                                            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-secondary hover:bg-accent-secondary/10 transition-all font-black text-xs tracking-[0.2em] text-neutral-400 hover:text-white"
                                        >
                                            {brand}
                                        </motion.button>
                                    ))}
                                </div>
                            </section>

                            {/* Offers / Banner */}
                            <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 p-12 border border-white/5">
                                <div className="relative z-10 max-w-lg">
                                    <div className="flex items-center gap-2 mb-4 text-accent-neon">
                                        <Tag size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Limited Time Offer</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-6 leading-none">
                                        UNLOCK <span className="text-accent-neon">20% OFF</span> YOUR FIRST DROP
                                    </h3>
                                    <p className="text-neutral-400 mb-8 font-medium">Use code <span className="text-white font-bold">NEOBASE</span> at checkout. Valid on all 2026 collection items.</p>
                                    <button className="bg-white text-black px-10 py-4 rounded-xl font-black text-xs tracking-widest hover:bg-accent-neon transition-all flex items-center gap-2 group">
                                        REDEEM NOW <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale opacity-20 hidden md:block" />
                            </section>

                            {/* Recommended */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <Sparkles size={20} className="text-accent-neon" />
                                    <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Recommended for you</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {PRODUCTS.slice(0, 3).map((product) => (
                                        <ProductCard key={product.id} {...product} />
                                    ))}
                                </div>
                            </section>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="mb-12 flex justify-between items-end">
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-2">
                                        Results for: <span className="text-accent-neon">"{query}"</span>
                                    </h1>
                                    <p className="text-neutral-500 font-bold tracking-widest uppercase text-xs">
                                        Found {results.length} item{results.length !== 1 ? 's' : ''} in the digital vault
                                    </p>
                                </div>
                            </div>

                            {results.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {results.map((product, i) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <ProductCard {...product} />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center glass rounded-[3rem] border-white/5">
                                    <p className="text-2xl font-bold text-neutral-600 italic uppercase mb-8">No signals detected in this frequency</p>
                                    <button
                                        onClick={() => { setInputValue(""); router.push('/search'); }}
                                        className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest hover:bg-white hover:text-black transition-all"
                                    >
                                        BACK TO DISCOVERY
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="pt-32 px-6 text-white text-center font-black animate-pulse">SYNCING WITH VAULT...</div>}>
            <SearchResults />
        </Suspense>
    );
}
