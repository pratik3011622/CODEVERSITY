import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Award, ShieldAlert, Play, ArrowLeft } from 'lucide-react';
import { proctorService } from '../../services/ProctorService';

const CandidateProfile = ({ candidate, onBack }) => {
    const snapshots = proctorService.getSnapshots();
    const replayEvents = proctorService.getReplay();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
                <ArrowLeft size={20} />
                <span>Back to Leaderboard</span>
            </button>

            {/* Header Card */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white">
                        {candidate.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">{candidate.name}</h2>
                        <p className="text-xl text-gray-400">{candidate.role}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-2xl font-bold text-green-400">{candidate.score}% Match</span>
                            <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-500/30">Top 1%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Explainable AI Section */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Award size={24} className="text-yellow-400" />
                        <h3 className="text-xl font-bold text-white">Explainable AI Analysis</h3>
                    </div>

                    {/* Match Analysis */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative overflow-hidden mb-6">
                        <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                            AI Recommended
                        </div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                            <Award size={16} className="mr-2 text-yellow-400" />
                            Match Analysis
                        </h4>
                        <p className="text-gray-400 leading-relaxed">
                            {candidate.name} shows exceptional proficiency in ML algorithms and System Design, 
                            perfectly aligning with the senior requirements. Strong communicator with proven 
                            problem-solving abilities demonstrated through complex project implementations.
                        </p>
                    </div>

                    {/* Skills Radar Chart */}
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                { subject: 'Coding', A: candidate.skills.coding, fullMark: 100 },
                                { subject: 'System Design', A: candidate.skills.system, fullMark: 100 },
                                { subject: 'ML Ops', A: candidate.skills.ml, fullMark: 100 },
                                { subject: 'Communication', A: candidate.skills.comm, fullMark: 100 },
                                { subject: 'Problem Solving', A: candidate.skills.problem, fullMark: 100 },
                            ]}>
                                <PolarGrid stroke="#374151" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Skills" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Integrity Report Section */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldAlert size={24} className="text-red-400" />
                        <h3 className="text-xl font-bold text-white">Integrity Report</h3>
                    </div>

                    {/* Proctor Snapshots */}
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-300 mb-3">Proctor Snapshots</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {snapshots.length === 0 ? (
                                <p className="text-gray-500 text-sm col-span-2">No snapshots recorded.</p>
                            ) : (
                                snapshots.slice(0, 4).map((snap) => (
                                    <div key={snap.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                                        <img src={snap.image} alt="Snapshot" className="w-full h-24 object-cover opacity-60" />
                                        <div className="p-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-400">+{snap.timeOffset}s</span>
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${snap.reason.includes('Suspect') ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                                    {snap.reason}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Session Replay */}
                    <div className="bg-[#1e1e1e] rounded-xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                            <Play size={18} className="text-green-400" />
                            <span className="text-lg font-semibold text-white">Session Replay</span>
                        </div>
                        <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                            <p className="text-sm text-gray-400 mb-2">
                                {replayEvents.length > 0 ? `${replayEvents.length} events recorded during the assessment session` : 'No recording data available'}
                            </p>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                    View Full Replay
                                </button>
                                <button className="flex-1 bg-white/5 text-gray-300 hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Download Report
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Integrity Score Summary */}
                    <div className="mt-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShieldAlert size={20} className="text-green-400" />
                                <span className="font-medium text-white">Overall Integrity Score</span>
                            </div>
                            <span className="text-2xl font-bold text-green-400">98%</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            Candidate maintained high compliance with assessment guidelines throughout the session.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CandidateProfile;
