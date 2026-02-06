import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, ChevronRight, ChevronLeft, Sparkles, BrainCircuit, Copy, Link, Zap } from 'lucide-react';

const AntiGravityCard = ({ children, className }) => {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ y: 0, scale: 1.01, transition: { duration: 0.3 } }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const DialInput = ({ label, value, onChange, options }) => {
    return (
        <div className="flex flex-col items-center space-y-3">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</span>
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-gray-800 to-black shadow-[0_5px_15px_black] flex items-center justify-center border border-gray-700/50 group cursor-pointer hover:border-purple-500/50 transition-colors">
                {/* Dial Marker */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ rotate: (options.indexOf(value) / (options.length - 1)) * 270 - 135 }}
                >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mt-2 shadow-[0_0_10px_#a855f7]"></div>
                </motion.div>

                {/* Inner Knob */}
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center shadow-inner border border-white/5">
                    <span className="text-white font-bold text-lg">{value}</span>
                </div>
            </div>
            {/* Simple click stepper for demo purposes */}
            <div className="flex space-x-1">
                {options.map(opt => (
                    <button
                        key={opt}
                        onClick={() => onChange(opt)}
                        className={`w-2 h-2 rounded-full transition-all ${value === opt ? 'bg-purple-500 w-4' : 'bg-gray-700'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const CreateAssignmentModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [dragActive, setDragActive] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [skills, setSkills] = useState([
        { name: 'Python Scripting', priority: 85 },
        { name: 'System Design', priority: 60 },
        { name: 'MLOps Pipelines', priority: 40 },
    ]);
    const [difficulty, setDifficulty] = useState('Mid');
    const [duration, setDuration] = useState('45m');
    const [generatedLink, setGeneratedLink] = useState('');

    // Reset state
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setIsScanning(false);
            setScanProgress(0);
            setGeneratedLink('');
        }
    }, [isOpen]);

    const totalComplexity = Math.round(skills.reduce((acc, curr) => acc + curr.priority, 0) / skills.length);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        startScanning();
    };

    const startScanning = () => {
        setIsScanning(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 4;
            setScanProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsScanning(false);
                    setStep(2);
                }, 500);
            }
        }, 80);
    };

    const handleSkillChange = (index, val) => {
        const newSkills = [...skills];
        newSkills[index].priority = parseInt(val);
        setSkills(newSkills);
    };

    const generateLink = () => {
        setStep(4);
        setTimeout(() => {
            setGeneratedLink(`https://skillrank.ai/test/${Math.random().toString(36).substr(2, 9)}`);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

            <AntiGravityCard className="relative w-full max-w-3xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_80px_-20px_rgba(168,85,247,0.4)] overflow-hidden flex flex-col min-h-[600px]">
                {/* Header */}
                <div className="flex justify-between items-center p-8 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
                    <div>
                        <h2 className="text-2xl font-bold text-white relative z-10 flex items-center gap-3">
                            <BrainCircuit className="text-purple-400" size={28} />
                            AI Assessment Creator
                        </h2>
                        <p className="text-gray-400 text-sm mt-1 relative z-10">Step {step} of 4: {['Upload', 'Prioritize', 'Configure', 'Launch'][step - 1]}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors relative z-10 bg-white/5 p-2 rounded-full hover:bg-white/10">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 relative z-10 flex flex-col">
                    <AnimatePresence mode='wait'>
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex-1 flex flex-col items-center justify-center"
                            >
                                <div
                                    className={`relative w-full h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-500
                                    ${dragActive ? 'border-purple-500 bg-purple-500/10 scale-[1.02]' : 'border-gray-700 hover:border-gray-500 bg-black/20'}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={!isScanning ? startScanning : undefined}
                                >
                                    {isScanning ? (
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="relative w-32 h-32 mb-6">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="64" cy="64" r="60" stroke="#333" strokeWidth="8" fill="transparent" />
                                                    <circle cx="64" cy="64" r="60" stroke="#a855f7" strokeWidth="8" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * scanProgress) / 100} className="transition-all duration-100" />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-white">{scanProgress}%</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-white animate-pulse">Analyzing Requirements...</h3>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
                                                <Upload size={36} className="text-purple-400" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Drop Job Description</h3>
                                            <p className="text-gray-400">PDF, DOCX, or TXT supported</p>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Skill Priority Engine</h3>
                                        <p className="text-gray-400 text-sm">Adjust weights to tune the AI matching algorithm.</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Total Complexity</div>
                                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                            {totalComplexity}/100
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {skills.map((skill, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: idx * 0.1, type: "spring" }}
                                            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-semibold text-lg text-white">{skill.name}</span>
                                                <span className="font-mono text-purple-400">{skill.priority}%</span>
                                            </div>
                                            <div className="relative h-2 bg-gray-800 rounded-full">
                                                <div
                                                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                                                    style={{ width: `${skill.priority}%`, boxShadow: `0 0 ${skill.priority / 5}px ${skill.priority > 80 ? '#a855f7' : '#3b82f6'}` }}
                                                />
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={skill.priority}
                                                    onChange={(e) => handleSkillChange(idx, e.target.value)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-full space-y-12"
                            >
                                <div className="w-full">
                                    <h3 className="text-lg font-semibold text-white mb-4">Target Audience</h3>
                                    <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
                                        {['Intern', 'Junior', 'Mid-Level', 'Senior', 'Staff', 'Principal'].map(role => (
                                            <button
                                                key={role}
                                                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_-5px_#a855f7] transition-all whitespace-nowrap text-sm font-medium text-gray-300 hover:text-white"
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-20">
                                    <DialInput
                                        label="Duration"
                                        value={duration}
                                        onChange={setDuration}
                                        options={['30m', '45m', '60m', '90m']}
                                    />
                                    <DialInput
                                        label="Difficulty"
                                        value={difficulty}
                                        onChange={setDifficulty}
                                        options={['Easy', 'Mid', 'Hard', 'Expert']}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                className="flex flex-col items-center justify-center h-full text-center"
                            >
                                {!generatedLink ? (
                                    <div className="relative">
                                        <div className="w-40 h-40 border-4 border-transparent border-t-purple-500 border-b-cyan-500 rounded-full animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles className="text-white animate-pulse" size={32} />
                                        </div>
                                        <p className="mt-8 text-lg font-medium text-gray-300 animate-pulse">Opening Quantum Portal...</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-full max-w-lg"
                                    >
                                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 shadow-[0_0_30px_-5px_#22c55e]">
                                            <Check size={48} className="text-green-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Assessment Ready</h3>
                                        <p className="text-gray-400 mb-8">The secure environment has been provisioned.</p>

                                        <div className="bg-black/50 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between group hover:border-purple-500 transition-colors">
                                            <div className="flex items-center space-x-3 overflow-hidden">
                                                <Link size={20} className="text-purple-400 shrink-0" />
                                                <span className="text-gray-300 truncate font-mono text-sm">{generatedLink}</span>
                                            </div>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Copy">
                                                <Copy size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                {step < 4 && (
                    <div className="p-8 border-t border-white/10 flex justify-between relative z-10 bg-black/20">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="px-6 py-3 text-gray-400 hover:text-white font-medium flex items-center transition-colors">
                                <ChevronLeft size={18} className="mr-2" /> Back
                            </button>
                        ) : <div></div>}

                        <button
                            onClick={step === 3 ? generateLink : () => setStep(step + 1)}
                            disabled={isScanning}
                            className={`px-8 py-3 rounded-xl font-bold flex items-center transition-all ${isScanning
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-gray-100 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                }`}
                        >
                            {step === 3 ? 'Launch Portal' : 'Next Step'}
                            {step !== 3 && <ChevronRight size={18} className="ml-2" />}
                        </button>
                    </div>
                )}
            </AntiGravityCard>
        </div>
    );
};

export default CreateAssignmentModal;
