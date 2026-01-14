"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProductCard } from './ProductCard';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface HorizontalScrollSectionProps {
    title: string;
    products: Product[];
}

export const HorizontalScrollSection = ({ title, products }: HorizontalScrollSectionProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    useEffect(() => {
        const calculateRange = () => {
            if (contentRef.current) {
                const contentWidth = contentRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                // We want to stop when the right edge of the content hits the right edge of the viewport
                setScrollRange(-(contentWidth - viewportWidth));
            }
        };

        calculateRange();
        window.addEventListener('resize', calculateRange);
        return () => window.removeEventListener('resize', calculateRange);
    }, [products]);

    const x = useTransform(scrollYProgress, [0.1, 0.9], [0, scrollRange]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-transparent">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-20 left-6 md:left-20 z-10 pointer-events-none">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none mix-blend-difference"
                    >
                        {title}
                    </motion.h2>
                </div>

                <motion.div
                    ref={contentRef}
                    style={{ x }}
                    className="flex gap-12 pl-[15vw] pr-20 items-center"
                >
                    {products.map((product) => (
                        <div key={product.id} className="w-[380px] md:w-[500px] shrink-0">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
