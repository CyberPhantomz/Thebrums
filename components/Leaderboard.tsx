import React from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_LEADERBOARD = [
    { id: 1, name: "Sarah Green", points: 2450, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Mike Rivers", points: 1980, avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Emma Woods", points: 1650, avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "David Chen", points: 1200, avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Lisa Park", points: 890, avatar: "https://i.pravatar.cc/150?u=5" },
];

export const Leaderboard: React.FC = () => {
    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <h2 className="text-xl font-bold">Top Recyclers</h2>
                </div>
                <p className="text-slate-400 text-sm">This week's champions</p>
            </div>

            <div className="p-4">
                {MOCK_LEADERBOARD.map((user, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={user.id}
                        className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        <div className="w-8 font-bold text-slate-400 text-center">
                            {index === 0 ? <Crown className="w-6 h-6 text-amber-400 mx-auto" /> :
                                index === 1 ? <Medal className="w-6 h-6 text-slate-400 mx-auto" /> :
                                    index === 2 ? <Medal className="w-6 h-6 text-amber-700 mx-auto" /> :
                                        `#${index + 1}`}
                        </div>

                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />

                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{user.name}</h3>
                            <p className="text-xs text-slate-500">Recycling Hero</p>
                        </div>

                        <div className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                            {user.points} pts
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
