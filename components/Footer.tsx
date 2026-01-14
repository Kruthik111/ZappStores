import { Github, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './Logo';

export const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/5 pt-32 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    <div className="md:col-span-1">
                        <Link href="/">
                            <Logo className="mb-8" />
                        </Link>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-[250px]">
                            Engineered for the digital native. The ultimate destination for tech-infused lifestyle.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Github].map((Icon, i) => (
                                <a key={i} href="#" className="h-12 w-12 flex items-center justify-center rounded-2xl glass text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10 text-neutral-500">Shop</h3>
                        <ul className="space-y-6 text-sm font-bold">
                            {['New Drops', 'Headphones', 'Gaming Gear', 'Apparel'].map(item => (
                                <li key={item}>
                                    <Link href="/explore" className="text-neutral-400 hover:text-accent-neon transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10 text-neutral-500">Support</h3>
                        <ul className="space-y-6 text-sm font-bold">
                            {['Shipping', 'Returns', 'Contact', 'FAQ'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-neutral-400 hover:text-accent-neon transition-colors">{item}</Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/orders" className="text-accent-secondary hover:text-white transition-colors">My Orders</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10 text-neutral-500">Join the tribe</h3>
                        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">Early access to drops and exclusive community rewards.</p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-accent-primary transition-colors pr-16"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-xl hover:bg-accent-primary hover:text-white transition-all">
                                <ArrowUpRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em] gap-8">
                    <p>© 2026 ZAPP STORE. BORN DIGITAL.</p>
                    <div className="flex gap-12">
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
