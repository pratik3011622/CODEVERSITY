import React from 'react';
import { motion } from 'framer-motion';
import SearchInput from './SearchInput';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 z-10"
                >
                    <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-4">
                        ✨ Revolutionizing Recruitment with AI
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                        Hire on <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Skill</span>, <br />
                        Not Just Resumes.
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                        Our AI analyzes role requirements to generate role-specific assessments, ensuring you find the perfect match based on actual capability.
                    </p>

                    <div className="pt-4">
                        <SearchInput />
                    </div>

                    <div className="flex items-center space-x-8 pt-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-black bg-gray-700 flex items-center justify-center text-xs text-white`}>
                                    User
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-gray-400">
                            Trusted by <span className="text-white font-semibold">500+</span> companies
                        </div>
                    </div>
                </motion.div>

                {/* Right Content - 3D Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative flex justify-center items-center h-full"
                >
                    <div className="relative w-full aspect-square max-w-lg">
                        {/* Iridescent Orb / Geometric Shape Simulation */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                        <div className="absolute inset-10 border border-white/20 rounded-full backdrop-blur-3xl bg-white/5 shadow-2xl overflow-hidden flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-1000 ease-in-out">
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-50"></div>
                            {/* Inner Geometric shapes */}
                            <div className="w-32 h-32 border border-purple-400/50 rounded-xl transform rotate-45 absolute top-1/4 left-1/4 animate-float"></div>
                            <div className="w-40 h-40 border border-blue-400/50 rounded-full absolute bottom-1/4 right-1/4 animate-float" style={{ animationDelay: '1s' }}></div>

                            <div className="relative z-10 text-center p-8 backdrop-blur-md bg-black/30 rounded-2xl border border-white/10">
                                <div className="text-4xl font-bold text-white mb-2">98%</div>
                                <div className="text-sm text-gray-300">Match Accuracy</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
