import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Mic, Code, BrainCircuit, CheckCircle, FileText, Lock } from 'lucide-react';
import OrbitingProctor from './OrbitingProctor';
import CodeSanctuary from './CodeSanctuary';
import MCQSession from './MCQSession';
import SubjectiveSession from './SubjectiveSession';
import ComplianceBanner from '../common/ComplianceBanner';

// Central Core
const DataCore = () => (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-40">
        <div className="relative w-full h-full animate-[spin_60s_linear_infinite]">
            <div className="absolute inset-0 rounded-full border border-purple-500/20 mix-blend-screen skew-x-12 animate-[spin_20s_linear_infinite_reverse]"></div>
            <div className="absolute inset-10 rounded-full border border-blue-500/20 mix-blend-screen skew-y-12 animate-[spin_15s_linear_infinite]"></div>
            <div className="absolute inset-20 rounded-full border border-cyan-500/20 mix-blend-screen animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl"></div>
        </div>
    </div>
);

// Stage Switcher (Read-Only / Progress Indicator)
const StageSwitcher = ({ currentStage }) => (
    <div className="flex items-center justify-center space-x-8 mb-8 relative z-20">
        {[
            { id: 'mcq', label: 'Knowledge', icon: BrainCircuit },
            { id: 'subjective', label: 'Architecture', icon: FileText },
            { id: 'coding', label: 'Code', icon: Code },
            { id: 'interview', label: 'Interview', icon: Mic },
        ].map((stage, idx) => {
            const isActive = currentStage === stage.id;
            // Determine if passed
            const isPassed = determinePassed(currentStage, stage.id);

            return (
                <div
                    key={stage.id}
                    className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-500 ${isActive
                        ? 'bg-white/10 border border-white/20 text-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]'
                        : isPassed ? 'text-green-400 opacity-60' : 'text-gray-600 opacity-40'
                        }`}
                >
                    {isPassed ? <CheckCircle size={18} /> : <stage.icon size={18} className={isActive ? 'text-purple-400' : ''} />}
                    <span className="font-medium">{stage.label}</span>
                    {isActive && (
                        <motion.div
                            layoutId="active-stage"
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                        />
                    )}
                    {!isActive && !isPassed && <Lock size={12} className="ml-2" />}
                </div>
            )
        })}
    </div>
);

const determinePassed = (current, target) => {
    const stages = ['mcq', 'subjective', 'coding', 'interview', 'complete'];
    return stages.indexOf(current) > stages.indexOf(target);
};

const AssessmentLayout = () => {
    const [anomaly, setAnomaly] = useState(null);
    const [stage, setStage] = useState('mcq'); // 'mcq' | 'subjective' | 'coding' | 'interview' | 'complete'

    const triggerAnomaly = (msg) => {
        setAnomaly(msg);
        setTimeout(() => setAnomaly(null), 2000);
    };

    const nextStage = () => {
        const flow = {
            'mcq': 'subjective',
            'subjective': 'coding',
            'coding': 'interview',
            'interview': 'complete'
        };
        setStage(flow[stage]);
    };

    return (
        <div className={`min-h-screen bg-black text-white relative overflow-hidden flex flex-col ${anomaly ? 'animate-shake' : ''}`}>
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px) rotate(-1deg); box-shadow: inset 0 0 50px red; }
                    75% { transform: translateX(5px) rotate(1deg); box-shadow: inset 0 0 50px red; }
                }
                .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
            `}</style>

            <DataCore />
            <ComplianceBanner />
            <OrbitingProctor onAnomaly={triggerAnomaly} />

            {/* Anomaly Overlay */}
            <AnimatePresence>
                {anomaly && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-red-500/10 backdrop-blur-md border border-red-500/50 px-8 py-4 rounded-2xl flex items-center space-x-4 shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                            <AlertTriangle size={32} className="text-red-500 animate-bounce" />
                            <div>
                                <h2 className="text-xl font-bold text-red-100">ANOMALY DETECTED</h2>
                                <p className="text-red-300">{anomaly}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-8 relative z-10 pt-24">
                <StageSwitcher currentStage={stage} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={stage}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1"
                    >
                        {stage === 'mcq' && <MCQSession onComplete={nextStage} />}

                        {stage === 'subjective' && <SubjectiveSession onComplete={nextStage} />}

                        {stage === 'coding' && (
                            <div className="h-[600px]">
                                <CodeSanctuary onComplete={nextStage} onAnomaly={triggerAnomaly} />
                            </div>
                        )}

                        {stage === 'interview' && (
                            <div className="h-[600px] flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl relative overflow-hidden flex-col">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse shadow-[0_0_50px_rgba(168,85,247,0.4)] flex items-center justify-center mb-8">
                                    <Mic size={48} className="text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">AI Interview Active</h2>
                                <p className="text-gray-400 mb-8">"Describe a challenge you faced with distributed systems."</p>
                                <button
                                    onClick={nextStage}
                                    className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                                >
                                    Finish Interview
                                </button>
                            </div>
                        )}

                        {stage === 'complete' && (
                            <div className="h-[600px] flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                                <CheckCircle size={80} className="text-green-500 mb-6" />
                                <h2 className="text-4xl font-bold text-white mb-4">Assessment Complete</h2>
                                <p className="text-gray-400 text-xl">Your sessions have been digitized and uploaded.</p>
                                <div className="mt-8">
                                    <a href="/" className="text-purple-400 hover:text-purple-300 underline">Return to Dashboard</a>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AssessmentLayout;
