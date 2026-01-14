"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Logo } from './Logo';

const SUGGESTIONS = [
    "Wireless Headphones",
    "Gaming Chair",
    "Oversized Hoodie",
    "Cyber Sneakers",
    "Mechanical Keyboard",
    "Smartwatch Ultra"
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { cartCount } = useCart();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['NEW DROPS', 'TECH', 'APPAREL', 'GAMING'];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6",
                isScrolled ? "glass py-3" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Logo />
                </Link>

                <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-neutral-400">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            href="/explore"
                            className="hover:text-white transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        href="/search"
                        className="text-neutral-400 hover:text-white transition-colors p-2 glass rounded-full"
                    >
                        <Search size={20} />
                    </Link>

                    <Link href="/cart" className="relative text-neutral-400 hover:text-white transition-colors p-2 glass rounded-full">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-primary text-[10px] font-black text-white shadow-lg shadow-accent-primary/40"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-neutral-400 hover:text-white transition-colors p-2 glass rounded-full z-[110]"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[105] md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href="/explore"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-4xl font-black italic tracking-tighter text-white hover:text-accent-primary transition-colors"
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
