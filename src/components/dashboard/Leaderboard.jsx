import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { X, Award, ChevronRight } from 'lucide-react';

const candidates = [
    { id: 1, name: "Arjun Reddy", role: "Sr. ML Engineer", score: 98, skills: { coding: 90, system: 85, ml: 95, comm: 80, problem: 92 } },
    { id: 2, name: "Sarah Connor", role: "Frontend AI Lead", score: 92, skills: { coding: 88, system: 75, ml: 60, comm: 95, problem: 85 } },
    { id: 3, name: "Chen Wei", role: "Data Scientist", score: 89, skills: { coding: 95, system: 70, ml: 90, comm: 75, problem: 88 } },
    { id: 4, name: "Priya Sharma", role: "AI Product Manager", score: 85, skills: { coding: 60, system: 80, ml: 70, comm: 98, problem: 85 } },
];

const Leaderboard = () => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    return (
        <div className="space-y-6 relative">
            <h2 className="text-2xl font-bold text-white mb-6">Top Candidates</h2>

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
                                        onClick={() => setSelectedCandidate(candidate)}
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

            {/* AI Summary Popup */}
            <AnimatePresence>
                {selectedCandidate && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed right-0 top-0 h-screen w-96 bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[70] p-6 overflow-y-auto"
                    >
                        <button onClick={() => setSelectedCandidate(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>

                        <div className="mt-8 space-y-6">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto flex items-center justify-center text-3xl font-bold text-white mb-4">
                                    {selectedCandidate.name.charAt(0)}
                                </div>
                                <h3 className="text-2xl font-bold text-white">{selectedCandidate.name}</h3>
                                <p className="text-gray-400">{selectedCandidate.role}</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
                                    AI Recommended
                                </div>
                                <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                                    <Award size={16} className="mr-2 text-yellow-400" />
                                    Match Analysis
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {selectedCandidate.name} shows exceptional proficiency in ML algorithms and System Design, perfectly aligning with the senior requirements. Strong communicator.
                                </p>
                            </div>

                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                        { subject: 'Coding', A: selectedCandidate.skills.coding, fullMark: 100 },
                                        { subject: 'System Design', A: selectedCandidate.skills.system, fullMark: 100 },
                                        { subject: 'ML Ops', A: selectedCandidate.skills.ml, fullMark: 100 },
                                        { subject: 'Communication', A: selectedCandidate.skills.comm, fullMark: 100 },
                                        { subject: 'Problem Solving', A: selectedCandidate.skills.problem, fullMark: 100 },
                                    ]}>
                                        <PolarGrid stroke="#374151" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar name="Skills" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Leaderboard;
