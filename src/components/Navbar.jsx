import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onLogin }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent
            ${isScrolled ? 'backdrop-blur-xl bg-black/50 border-white/10' : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 cursor-pointer group">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 group-hover:opacity-80 transition-opacity">
                            SkillRank AI
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</a>
                        <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">How it Works</a>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
                            <button
                                onClick={() => onLogin('candidate')}
                                className="text-gray-300 hover:text-white text-sm font-medium px-3 py-2 transition-colors"
                            >
                                Candidate Login
                            </button>
                        </div>
                        <button
                            onClick={() => onLogin('recruiter')}
                            className="bg-white text-black hover:bg-gray-100 text-sm font-medium px-4 py-2 rounded-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            Recruiter Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-4 flex flex-col">
                            <a href="#features" className="text-gray-300 hover:text-white text-sm font-medium">Features</a>
                            <a href="#how-it-works" className="text-gray-300 hover:text-white text-sm font-medium">How it Works</a>
                            <div className="h-px bg-white/10 my-2" />
                            <button className="text-gray-300 hover:text-white text-sm font-medium text-left">
                                Candidate Login
                            </button>
                            <button onClick={onLogin} className="bg-white text-black hover:bg-gray-100 text-sm font-medium px-4 py-2 rounded-lg text-center cursor-pointer">
                                Recruiter Login
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
