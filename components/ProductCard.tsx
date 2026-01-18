"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    className?: string;
}

export const ProductCard = ({ id, name, price, image, className }: ProductCardProps) => {
    const { addToCart, isInCart, updateQuantity, removeFromCart } = useCart();
    const cartItem = isInCart(id);
    const inCart = !!cartItem;
    const [showQuantityInput, setShowQuantityInput] = useState(false);
    const [quantityInput, setQuantityInput] = useState('');

    const handleQuantitySubmit = () => {
        const newQty = parseInt(quantityInput);
        if (newQty > 0 && cartItem) {
            const delta = newQty - cartItem.quantity;
            updateQuantity(id, delta);
        }
        setShowQuantityInput(false);
        setQuantityInput('');
    };

    const handleDecrement = () => {
        if (cartItem && cartItem.quantity > 1) {
            updateQuantity(id, -1);
        } else if (cartItem && cartItem.quantity === 1) {
            removeFromCart(id);
        }
    };

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

                    {inCart ? (
                        <div className="flex items-center gap-2">
                            {/* Decrement Button */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDecrement}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all"
                            >
                                <Minus size={18} />
                            </motion.button>

                            {/* Quantity Display/Input */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setQuantityInput(cartItem?.quantity.toString() || '');
                                    setShowQuantityInput(true);
                                }}
                                className="flex h-10 min-w-[3rem] px-3 items-center justify-center rounded-xl bg-white text-green-600 font-black text-lg shadow-lg border-2 border-green-500 hover:bg-green-50 transition-all"
                                title="Click to enter quantity"
                            >
                                {cartItem?.quantity}
                            </motion.button>

                            {/* Increment Button */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => addToCart({ id, name, price, image })}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white shadow-lg shadow-green-500/20 hover:bg-green-600 transition-all"
                            >
                                <Plus size={18} />
                            </motion.button>
                        </div>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => addToCart({ id, name, price, image })}
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary text-white shadow-xl shadow-accent-primary/20 hover:bg-accent-primary/80 transition-all hover:rotate-3"
                        >
                            <ShoppingCart size={22} />
                        </motion.button>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-accent-neon/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Quantity Input Modal */}
            <AnimatePresence>
                {showQuantityInput && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-[2.5rem] z-20 flex items-center justify-center p-6"
                        onClick={() => setShowQuantityInput(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 w-full max-w-[250px] shadow-2xl"
                        >
                            <h4 className="text-lg font-black text-gray-800 mb-4">Set Quantity</h4>
                            <input
                                type="number"
                                min="1"
                                value={quantityInput}
                                onChange={(e) => setQuantityInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleQuantitySubmit();
                                    if (e.key === 'Escape') setShowQuantityInput(false);
                                }}
                                autoFocus
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-bold text-gray-800 focus:border-green-500 focus:outline-none mb-4"
                                placeholder="Enter quantity"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowQuantityInput(false)}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleQuantitySubmit}
                                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
                                >
                                    Set
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
