"use client";

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    className?: string;
}

export const ProductCard = ({ id, name, price, image, className }: ProductCardProps) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={cn(
                "glass group relative overflow-hidden rounded-[2.5rem] p-5 transition-all duration-500",
                className
            )}
        >
            <div className="aspect-square overflow-hidden rounded-[2rem] bg-neutral-900 relative">
                <img
                    src={image}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            <div className="mt-6 px-2 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{name}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Price</span>
                        <span className="text-2xl font-black text-accent-neon">${price}</span>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart({ id, name, price, image })}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary text-white shadow-xl shadow-accent-primary/20 hover:bg-accent-primary/80 transition-all hover:rotate-3"
                    >
                        <ShoppingCart size={22} />
                    </motion.button>
                </div>
            </div>

            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-accent-neon/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.div>
    );
};
