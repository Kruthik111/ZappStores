"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 750);
        };

        // Trigger immediately on mount
        triggerGlitch();

        // Then trigger every 5 seconds
        const interval = setInterval(triggerGlitch, 5000);

        return () => clearInterval(interval);
    }, []);

    const generateSparks = useCallback(() => {
        return Array.from({ length: 8 }).map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent-primary rounded-full blur-[1px]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 60,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: Math.random() * 0.2
                }}
            />
        ));
    }, []);

    return (
        <div className={cn("relative cursor-pointer group", className)}>
            <div className={cn(
                "relative z-10 text-2xl md:text-3xl font-black italic tracking-tighter transition-all duration-75",
                isGlitching && "text-white scale-[1.02] -skew-x-12",
                !isGlitching && "text-white"
            )}>
                <span className={cn(isGlitching && "glitch-active block")}>
                    ZAPP<span className="text-accent-primary">.</span>STORE
                </span>
            </div>

            {/* Electric Glow */}
            <AnimatePresence>
                {isGlitching && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-accent-primary/20 blur-xl -z-10"
                        />
                        <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-visible">
                            {generateSparks()}
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Background "Shock" flash */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isGlitching ? {
                    opacity: [0, 0.3, 0],
                    scale: [1, 1.1, 1],
                } : { opacity: 0 }}
                transition={{
                    duration: 0.15,
                    repeat: 2,
                    repeatDelay: 0.05
                }}
                className="absolute inset-0 bg-white/10 blur-2xl -z-10"
            />
        </div>
    );
};
