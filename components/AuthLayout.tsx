import React from 'react';
import { Recycle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen w-full flex bg-slate-50">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative z-10">
                <div className="w-full max-w-md">
                    <Link to="/" className="flex items-center gap-2 mb-12 w-fit">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg shadow-emerald-200/50">
                            <Recycle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">
                            EcoScan AI
                        </span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{title}</h1>
                        <p className="text-slate-500 mb-8 text-lg">{subtitle}</p>
                        {children}
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Image/Decorative */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-teal-900/90 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
                    alt="Nature"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                />

                <div className="relative z-20 flex flex-col justify-center px-16 text-white h-full">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            Join the movement towards a <span className="text-emerald-400">cleaner planet</span>.
                        </h2>
                        <p className="text-emerald-100 text-lg max-w-md leading-relaxed">
                            Use AI to instantly identify recyclable materials and make the right choice for our environment.
                        </p>
                    </motion.div>

                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
                    <div className="absolute top-24 right-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
};
