"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
    const { cart, totalPrice, placeOrder } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            placeOrder();
            setIsProcessing(false);
            setIsSuccess(true);

            // Redirect to orders after 3 seconds
            setTimeout(() => {
                router.push("/orders");
            }, 3000);
        }, 2500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-12 rounded-[3rem] text-center max-w-md border-accent-secondary/30"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-24 h-24 bg-accent-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8 text-accent-secondary"
                    >
                        <CheckCircle2 size={56} />
                    </motion.div>
                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Order Confirmed</h2>
                    <p className="text-neutral-400 mb-8 leading-relaxed">
                        Your items have been beamed to our fulfillment center. You'll receive a neural link update soon.
                    </p>
                    <p className="text-xs font-bold text-accent-secondary uppercase tracking-[0.2em] animate-pulse">
                        Redirecting to your orders vault...
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <Link href="/cart" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors uppercase font-black text-xs tracking-widest mb-12">
                <ArrowLeft size={16} />
                Back to Bag
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none mb-4">
                            SECURE <span className="text-accent-neon">INTEL</span>
                        </h1>
                        <p className="text-neutral-500 font-bold tracking-[0.3em] uppercase text-[10px]">Step 2 of 2: Shipping & Payment</p>
                    </motion.div>

                    <form onSubmit={handleCheckout} className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <Truck size={14} className="text-accent-neon" /> Shipping Destination
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="FIRST NAME" className="glass w-full rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-neon transition-colors" />
                                <input required placeholder="LAST NAME" className="glass w-full rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-neon transition-colors" />
                            </div>
                            <input required placeholder="SHIPPING ADDRESS" className="glass w-full rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-neon transition-colors" />
                            <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="CITY" className="glass w-full rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-neon transition-colors" />
                                <input required placeholder="COUNTRY" className="glass w-full rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-neon transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <CreditCard size={14} className="text-accent-primary" /> Neural Payment
                            </h3>
                            <div className="glass p-6 rounded-[2.5rem] border-accent-primary/20 space-y-4">
                                <input required placeholder="CARD NUMBER" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-primary transition-colors" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input required placeholder="EXP (MM/YY)" className="bg-white/5 border border-white/10 w-full rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-primary transition-colors" />
                                    <input required placeholder="CVC" className="bg-white/5 border border-white/10 w-full rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-primary transition-colors" />
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={isProcessing || cart.length === 0}
                            className={cn(
                                "w-full py-6 rounded-[2rem] font-black text-xl transition-all relative overflow-hidden",
                                isProcessing ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" : "bg-white text-black hover:bg-accent-neon hover:scale-[1.02] active:scale-[0.98]"
                            )}
                        >
                            {isProcessing ? "INITIALIZING SECURE LINK..." : `PURCHASE FOR $${totalPrice}`}
                            {isProcessing && (
                                <div className="absolute bottom-0 left-0 h-1 bg-accent-neon animate-[progress_2s_ease-in-out]" style={{ width: '100%' }} />
                            )}
                        </button>
                    </form>
                </div>

                <div>
                    <div className="glass rounded-[3rem] p-10 overflow-hidden relative">
                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-8">Summary Preview</h3>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-white/5 overflow-hidden border border-white/5 shrink-0 relative">
                                            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white line-clamp-1">{item.name}</p>
                                            <p className="text-[10px] items-center flex gap-2 font-black text-neutral-500 uppercase">
                                                QTY: {item.quantity} <span className="w-1 h-1 rounded-full bg-neutral-600" /> ${item.price}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-white">${item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
                            <div className="flex justify-between text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                <span>Total Charge</span>
                                <span className="text-white text-lg font-black tracking-tighter">${totalPrice}</span>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-white/5 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3 text-neutral-400">
                                <ShieldCheck size={16} className="text-accent-secondary" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">End-to-end encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
