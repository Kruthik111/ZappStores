"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const Hero = ({ image }: { image: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt="Hero Model"
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block glass px-4 py-2 rounded-full mb-6"
                    >
                        <span className="text-[10px] font-black tracking-[0.4em] text-accent-neon uppercase">EST. 2026 // GENERATION ALPHA READY</span>
                    </motion.div>

                    <h1 className="text-[15vw] md:text-[10vw] font-black text-white tracking-tighter leading-[0.85] mb-12 italic uppercase">
                        OWN THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-accent-neon to-accent-secondary">
                            FUTURE.
                        </span>
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05, rotate: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex items-center gap-3 bg-white text-black px-10 py-5 rounded-3xl font-black text-xl hover:bg-accent-neon transition-all overflow-hidden"
                        >
                            <span className="relative z-10">SHOP THE DROP</span>
                            <ArrowRight size={24} className="relative z-10 transition-transform group-hover:translate-x-2" />
                            <div className="absolute inset-0 bg-neutral-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </motion.button>

                        <button className="text-white font-bold text-lg hover:text-accent-neon transition-colors border-b-2 border-white/20 hover:border-accent-neon pb-1">
                            EXPLORE GEAR
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Floating Elements (Micro-interactions) */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-32 h-32 glass rounded-full opacity-20 hidden md:block"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 w-48 h-48 glass rounded-[3rem] opacity-10 hidden md:block"
            />
        </section>
    );
};
