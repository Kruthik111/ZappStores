"use client";

import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { HorizontalScrollSection } from '@/components/HorizontalScrollSection';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/constants';

export default function Home() {
  const techProducts = PRODUCTS.filter(p => p.category === 'tech').slice(0, 5);
  const apparelProducts = PRODUCTS.filter(p => p.category === 'apparel').slice(0, 5);
  const gamingProducts = PRODUCTS.filter(p => p.category === 'gaming').slice(0, 4);

  return (
    <div className="bg-black">
      <Hero image="/hero.png" />

      <div className="relative z-20 -mt-10 overflow-hidden">
        <Marquee className="bg-accent-primary transform -rotate-1 py-8 md:py-12 border-y-2 border-black" speed={15}>
          {['NEW DROPS', 'LIMITED EDITION', 'STREETWEAR', 'GAMING TECH', 'GEN Z READY'].map((text, i) => (
            <span key={i} className="text-5xl md:text-8xl font-black text-black mx-12 italic uppercase tracking-tighter">
              {text}
            </span>
          ))}
        </Marquee>
      </div>

      <HorizontalScrollSection title="TECH FOR THE FUTURE" products={techProducts} />

      <div className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[3rem] p-12 md:p-24 flex flex-col items-center text-center gap-10 border-accent-neon/20 border-2 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-neon/10 blur-[120px] -mr-48 -mt-48 rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-primary/10 blur-[120px] -ml-48 -mb-48 rounded-full" />

          <h2 className="text-5xl md:text-[8vw] font-black text-white italic tracking-tighter leading-[0.85] uppercase">
            BORN <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon to-accent-secondary">DIGITAL.</span><br />
            BUILT FOR YOU.
          </h2>
          <p className="text-neutral-500 max-w-3xl text-lg md:text-2xl leading-relaxed font-medium">
            ZAPP STORE is more than a shop. It's the core of the digital tribe. Join the movement and gear up with the highest-spec accessories on the planet.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 bg-white text-black font-black px-16 py-6 rounded-[2rem] text-2xl hover:bg-accent-neon transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            JOIN THE TRIBE
          </motion.button>
        </motion.div>
      </div>

      <HorizontalScrollSection title="THE APPAREL DROP" products={apparelProducts} />

      <div className="py-24">
        <Marquee className="bg-neutral-900/50 border-y border-white/5 py-12" direction="right" speed={30}>
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-16 mx-16">
              <span className="text-3xl font-black text-neutral-700 tracking-widest italic">FREE SHIPPING WORLDWIDE</span>
              <span className="w-4 h-4 rounded-full bg-accent-primary shadow-[0_0_20px_rgba(255,77,0,0.5)]" />
              <span className="text-3xl font-black text-neutral-700 tracking-widest italic">CRYPTO ACCEPTED</span>
              <span className="w-4 h-4 rounded-full bg-accent-neon shadow-[0_0_20px_rgba(0,204,255,0.5)]" />
              <span className="text-3xl font-black text-neutral-700 tracking-widest italic">24/7 SUPPORT</span>
              <span className="w-4 h-4 rounded-full bg-accent-secondary shadow-[0_0_20px_rgba(0,255,102,0.5)]" />
            </div>
          ))}
        </Marquee>
      </div>

      <HorizontalScrollSection title="LEVEL UP YOUR SETUP" products={gamingProducts} />

      <div className="py-40 px-6 text-center overflow-hidden">
        <h2 className="text-sm font-black tracking-[0.6em] text-accent-primary mb-12 uppercase opacity-50">Follow the energy</h2>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-6xl md:text-[12vw] font-black text-white/5 italic select-none leading-none">
          <motion.span whileHover={{ color: "rgba(0, 204, 255, 0.4)", scale: 1.05 }} className="transition-all">#ZAPPSTORE</motion.span>
          <motion.span whileHover={{ color: "rgba(255, 77, 0, 0.4)", scale: 1.05 }} className="text-white/10 transition-all">#GENZ</motion.span>
          <motion.span whileHover={{ color: "rgba(0, 255, 102, 0.4)", scale: 1.05 }} className="transition-all">#TECHTHRDS</motion.span>
          <motion.span whileHover={{ color: "rgba(255, 255, 255, 0.4)", scale: 1.05 }} className="text-accent-neon/10 transition-all">#FUTURE</motion.span>
        </div>
      </div>
    </div>
  );
}
