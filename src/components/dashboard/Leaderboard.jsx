import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const candidates = [
    { id: 1, name: "Arjun Reddy", role: "Sr. ML Engineer", score: 98, skills: { coding: 90, system: 85, ml: 95, comm: 80, problem: 92 } },
    { id: 2, name: "Sarah Connor", role: "Frontend AI Lead", score: 92, skills: { coding: 88, system: 75, ml: 60, comm: 95, problem: 85 } },
    { id: 3, name: "Chen Wei", role: "Data Scientist", score: 89, skills: { coding: 95, system: 70, ml: 90, comm: 75, problem: 88 } },
    { id: 4, name: "Priya Sharma", role: "AI Product Manager", score: 85, skills: { coding: 60, system: 80, ml: 70, comm: 98, problem: 85 } },
];

const Leaderboard = ({ onSelectCandidate }) => {
    return (
        <div className="space-y-6 relative">
            <h2 className="text-2xl font-bold text-white mb-6">Global Leaderboard</h2>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm">
                        <tr>
                            <th className="p-4 font-medium">Rank</th>
                            <th className="p-4 font-medium">Candidate</th>
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Match</th>
                            <th className="p-4 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {candidates.map((candidate, idx) => (
                            <motion.tr
                                key={candidate.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group hover:bg-white/5 transition-colors"
                            >
                                <td className="p-4 text-gray-500 font-mono">#{idx + 1}</td>
                                <td className="p-4 font-medium text-white flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                                        {candidate.name.charAt(0)}
                                    </div>
                                    <span>{candidate.name}</span>
                                    {idx === 0 && <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded ml-2 border border-yellow-500/30 animate-pulse">Top 1%</span>}
                                </td>
                                <td className="p-4 text-gray-400">{candidate.role}</td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="relative w-10 h-10 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="20" cy="20" r="16" stroke="gray" strokeWidth="3" fill="transparent" className="opacity-20" />
                                                <circle
                                                    cx="20" cy="20" r="16"
                                                    stroke={candidate.score > 90 ? '#10b981' : candidate.score > 80 ? '#3b82f6' : '#eab308'}
                                                    strokeWidth="3"
                                                    fill="transparent"
                                                    strokeDasharray={100}
                                                    strokeDashoffset={100 - candidate.score}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="absolute text-xs font-bold text-white">{candidate.score}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => onSelectCandidate(candidate)}
                                        className="text-white hover:text-purple-400 p-2 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
