import React from 'react';
import { Recycle, LogIn, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const points = parseInt(localStorage.getItem('userPoints') || '0');

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userPoints');
        navigate('/login');
    };

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 glass-panel border-b-0 rounded-b-2xl mx-4 mt-4"
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg shadow-emerald-200/50">
                        <Recycle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gradient-primary tracking-tight">
                        EcoScan AI
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 font-medium text-sm">
                                <span>🌱 {points} pts</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        location.pathname !== '/login' && location.pathname !== '/register' && (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>Sign In</span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </motion.header>
    );
};
