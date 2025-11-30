import React, { useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { AnalysisResult } from '../components/AnalysisResult';
import { analyzeImage } from '../services/geminiService';
import { AppState } from '../types';
import { Loader2, Sparkles, Trophy } from 'lucide-react';
import { Layout } from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const Scanner: React.FC = () => {
    const [state, setState] = useState<AppState>({
        image: null,
        isAnalyzing: false,
        result: null,
        error: null,
    });

    const [pointsEarned, setPointsEarned] = useState<number | null>(null);

    const handleImageSelected = async (base64: string) => {
        setState((prev) => ({ ...prev, image: base64, isAnalyzing: true, error: null }));
        setPointsEarned(null);

        try {
            const result = await analyzeImage(base64);
            setState((prev) => ({ ...prev, isAnalyzing: false, result }));

            // Award points logic
            const points = 50; // Base points for scanning
            const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
            localStorage.setItem('userPoints', (currentPoints + points).toString());
            setPointsEarned(points);

            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

        } catch (error) {
            setState((prev) => ({
                ...prev,
                isAnalyzing: false,
                error: error instanceof Error ? error.message : "An unexpected error occurred."
            }));
        }
    };

    const handleReset = () => {
        setState({
            image: null,
            isAnalyzing: false,
            result: null,
            error: null,
        });
        setPointsEarned(null);
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">

                <AnimatePresence mode="wait">
                    {/* State: Error */}
                    {state.error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-8 p-6 bg-red-50 border border-red-100 text-red-700 rounded-2xl max-w-md w-full text-center shadow-lg shadow-red-100/50"
                        >
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <p className="font-bold text-lg mb-1">Oops! Something went wrong.</p>
                            <p className="text-sm opacity-80 mb-4">{state.error}</p>
                            <button
                                onClick={handleReset}
                                className="px-6 py-2 bg-white border border-red-200 text-red-700 font-semibold rounded-lg hover:bg-red-50 transition-colors text-sm"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    )}

                    {/* State: Analyzing */}
                    {state.isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center space-y-8"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                                {state.image && (
                                    <div className="relative">
                                        <img
                                            src={state.image}
                                            alt="Analyzing"
                                            className="w-64 h-64 object-cover rounded-3xl shadow-2xl border-4 border-white relative z-10"
                                        />
                                        <div className="absolute inset-0 z-20 bg-black/20 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
                                            <div className="bg-white/90 p-4 rounded-2xl shadow-xl">
                                                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="text-center max-w-sm">
                                <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                                    Analyzing <Sparkles className="w-5 h-5 text-amber-400" />
                                </h3>
                                <p className="text-slate-500 mt-2">Identifying material and checking recycling rules...</p>
                            </div>
                        </motion.div>
                    )}

                    {/* State: Result */}
                    {!state.isAnalyzing && state.result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full max-w-2xl"
                        >
                            {pointsEarned && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mb-6 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 p-4 rounded-xl flex items-center justify-center gap-3 text-amber-800 font-bold shadow-sm"
                                >
                                    <Trophy className="w-6 h-6 text-amber-600" />
                                    <span>+{pointsEarned} Points Earned! Great job recycling!</span>
                                </motion.div>
                            )}
                            <AnalysisResult result={state.result} onReset={handleReset} />
                        </motion.div>
                    )}

                    {/* State: Idle (Upload) */}
                    {!state.isAnalyzing && !state.result && !state.error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center w-full"
                        >
                            <div className="text-center mb-12 max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                                    <Sparkles className="w-3 h-3" /> Ready to Scan
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                                    What are you <br />
                                    <span className="text-gradient-primary">Recycling Today?</span>
                                </h1>
                            </div>

                            <div className="w-full max-w-xl relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5">
                                    <ImageUploader onImageSelected={handleImageSelected} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </Layout>
    );
};
