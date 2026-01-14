"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    speed?: number;
    className?: string;
}

export const Marquee = ({ children, direction = 'left', speed = 20, className }: MarqueeProps) => {
    return (
        <div className={cn("flex overflow-hidden select-none gap-4 py-4 shrink-0", className)}>
            <motion.div
                animate={{
                    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                }}
                className="flex min-w-full shrink-0 items-center justify-around gap-4 whitespace-nowrap"
            >
                <div className="flex shrink-0 items-center justify-around gap-12 px-6">
                    {children}
                </div>
                <div className="flex shrink-0 items-center justify-around gap-12 px-6">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};
