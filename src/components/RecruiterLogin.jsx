import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

const RecruiterLogin = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API check
        setTimeout(() => {
            setIsLoading(false);
            setIsVerified(true);
            // Wait for verify animation then login
            setTimeout(onLogin, 1500);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-md p-1"
            >
                {/* Iridescent Border Container */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 rounded-2xl blur opacity-75 animate-pulse"></div>

                <div className="relative bg-black/90 backdrop-blur-3xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            {isVerified ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="bg-green-500 rounded-full p-2"
                                >
                                    <Check className="text-black" size={24} strokeWidth={3} />
                                </motion.div>
                            ) : (
                                <ShieldCheck className="text-purple-400" size={32} />
                            )}
                        </div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Recruiter Access
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">Secure Gateway for SkillRank AI</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Official Email ID"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || isVerified}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300
                            ${isVerified
                                    ? 'bg-green-500 text-black'
                                    : 'bg-white text-black hover:bg-gray-100 hover:scale-[1.02]'
                                }`}
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                            ) : isVerified ? (
                                <span>Access Granted</span>
                            ) : (
                                <>
                                    <span>Enter Dashboard</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-600">
                        Top 5% Talent • AI Verified • Encrypted Session
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default RecruiterLogin;
