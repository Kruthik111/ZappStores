"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Package, Truck, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function OrdersPage() {
    const { orders } = useCart();

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
                    ORDER <span className="text-accent-secondary">HISTORY</span>
                </h1>
                <p className="text-neutral-500 font-bold tracking-[0.3em] uppercase text-xs mt-4">
                    Vault of your past and present futuristic drops
                </p>
            </motion.div>

            {orders.length > 0 ? (
                <div className="space-y-10">
                    {orders.map((order, idx) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass rounded-[3rem] overflow-hidden border-white/5"
                        >
                            <div className="bg-white/5 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-1">Order ID</p>
                                    <h3 className="text-xl font-black text-white tracking-widest">{order.id}</h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[10px] font-black uppercase tracking-widest">
                                    <div>
                                        <p className="text-neutral-500 mb-1">DATE</p>
                                        <p className="text-white">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-neutral-500 mb-1">TOTAL</p>
                                        <p className="text-accent-neon">${order.total}</p>
                                    </div>
                                    <div>
                                        <p className="text-neutral-500 mb-1">STATUS</p>
                                        <p className="text-accent-secondary flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" />
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 group">
                                            <div className="w-16 h-16 rounded-2xl bg-black/40 overflow-hidden border border-white/10 relative">
                                                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white leading-tight mb-1 group-hover:text-accent-neon transition-colors cursor-default">{item.name}</p>
                                                <p className="text-[10px] font-black text-neutral-500">QTY: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 border-t border-white/5 flex flex-wrap gap-4">
                                <button className="bg-white/5 hover:bg-white/10 text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                                    <RefreshCw size={14} /> Buy Again
                                </button>
                                <button className="bg-white/5 hover:bg-white/10 text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                                    <ExternalLink size={14} /> View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass p-20 rounded-[4rem] text-center border-white/5"
                >
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-neutral-700">
                        <Package size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-white italic uppercase mb-4">No Orders in the vault</h2>
                    <p className="text-neutral-500 mb-10 max-w-sm mx-auto font-medium">Your digital purchase history is currently clean. Time to make your first move into the future.</p>
                    <Link href="/explore">
                        <button className="bg-white text-black px-12 py-5 rounded-2xl font-black hover:bg-accent-secondary transition-all">
                            GO TO COLLECTION
                        </button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
