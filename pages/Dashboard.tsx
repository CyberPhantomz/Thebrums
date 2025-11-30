import React from 'react';
import { Layout } from '../components/Layout';
import { Leaderboard } from '../components/Leaderboard';
import { ArrowRight, Sparkles, ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-12 items-start pt-8">

                {/* Left: Hero Section */}
                <div className="flex-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" /> Gamified Recycling
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                            Recycle Smart. <br />
                            <span className="text-gradient-primary">Earn Rewards.</span>
                        </h1>

                        <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
                            Join the community making a difference. Scan your waste, identify recyclables, and climb the leaderboard.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            {localStorage.getItem('isAuthenticated') === 'true' ? (
                                <Link
                                    to="/scan"
                                    className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                                >
                                    Go to Scanner <ArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2"
                                    >
                                        Get Started <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
                                    >
                                        <ScanLine className="w-5 h-5" /> Scan Item
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200"
                    >
                        <div>
                            <div className="text-3xl font-bold text-slate-900">10k+</div>
                            <div className="text-sm text-slate-500">Items Scanned</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">5k+</div>
                            <div className="text-sm text-slate-500">Active Users</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">2T</div>
                            <div className="text-sm text-slate-500">CO2 Saved</div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Leaderboard */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full lg:w-96"
                >
                    <Leaderboard />
                </motion.div>

            </div>

        </Layout>
    );
};
