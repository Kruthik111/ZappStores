"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart();

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
                    YOUR <span className="text-accent-primary">BAG</span>
                </h1>
                <p className="text-neutral-500 font-bold tracking-[0.3em] uppercase text-xs mt-4">
                    {cartCount} Items Selected for the Future
                </p>
            </motion.div>

            {cart.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 items-center"
                                >
                                    <div className="relative w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-grow flex flex-col gap-1 text-center md:text-left">
                                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                        <p className="text-accent-neon font-black text-lg">${item.price}</p>
                                    </div>

                                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-neutral-400"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-8 text-center font-black text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-4 text-neutral-500 hover:text-accent-primary transition-colors"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-[2.5rem] p-8 sticky top-32 border-accent-primary/20"
                        >
                            <h3 className="text-2xl font-black text-white italic tracking-tighter mb-8 uppercase">Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-neutral-400 font-bold uppercase text-xs">
                                    <span>Subtotal</span>
                                    <span className="text-white">${totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400 font-bold uppercase text-xs">
                                    <span>Shipping</span>
                                    <span className="text-accent-secondary">FREE</span>
                                </div>
                                <div className="h-px bg-white/5 my-4" />
                                <div className="flex justify-between items-end">
                                    <span className="text-neutral-400 font-black uppercase text-sm">Total</span>
                                    <span className="text-3xl font-black text-white tracking-tighter">${totalPrice}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block w-full">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg hover:bg-accent-neon transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5"
                                >
                                    GO TO CHECKOUT
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>

                            <div className="mt-8 flex items-center gap-3 p-4 bg-accent-secondary/5 rounded-2xl border border-accent-secondary/10">
                                <div className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
                                <p className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest">
                                    Secure checkout powered by FuturePay
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center gap-8"
                >
                    <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center text-neutral-700">
                        <ShoppingBag size={64} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-white italic uppercase">Your bag is empty</h2>
                        <p className="text-neutral-500 max-w-sm mx-auto">
                            Looks like you haven't picked up any gear yet. The future waits for no one.
                        </p>
                    </div>
                    <Link href="/explore">
                        <button className="bg-accent-neon text-black px-10 py-4 rounded-2xl font-black hover:shadow-[0_0_20px_rgba(0,204,255,0.4)] transition-all">
                            BROWSE DROPS
                        </button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
