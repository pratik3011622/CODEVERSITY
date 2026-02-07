import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onLogin, onJoin, onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    return (
        <nav
            className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10"
        >
            {/* Logo - shifted to leftmost */}
            <div className="absolute left-0 pl-4 lg:pl-8 pt-2 lg:pt-3 cursor-pointer">
                <span className="text-2xl font-bold text-white">
                    DevScoreAI
                </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-8 h-20">
                <button className="text-gray-300 hover:text-white text-sm font-medium" onClick={() => { onNavigate('landing'); }}>Home</button>
                <button className="text-gray-300 hover:text-white text-sm font-medium" onClick={() => { onNavigate('about'); }}>About</button>
                <button className="text-gray-300 hover:text-white text-sm font-medium" onClick={() => { onNavigate('contact'); }}>Contact</button>

                {/* Candidate Dropdown */}
                <div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown('candidate')}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <button
                        className="text-gray-300 group-hover:text-white text-sm font-medium flex items-center space-x-1 py-4"
                    >
                        <span>Candidate</span>
                    </button>
                    {activeDropdown === 'candidate' && (
                        <div className="absolute top-full left-0 mt-0 w-40 bg-black border border-white/10 rounded-lg shadow-xl overflow-hidden py-1">
                            <button
                                onClick={() => { onLogin('candidate'); setActiveDropdown(null); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { onJoin('candidate'); setActiveDropdown(null); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                                Join
                            </button>
                        </div>
                    )}
                </div>

                {/* Recruiter Dropdown */}
                <div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown('recruiter')}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <button
                        className="text-gray-300 group-hover:text-white text-sm font-medium flex items-center space-x-1 py-4"
                    >
                        <span>Recruiter</span>
                    </button>
                    {activeDropdown === 'recruiter' && (
                        <div className="absolute top-full left-0 mt-0 w-40 bg-black border border-white/10 rounded-lg shadow-xl overflow-hidden py-1">
                            <button
                                onClick={() => { onLogin('recruiter'); setActiveDropdown(null); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { onJoin('recruiter'); setActiveDropdown(null); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                                Join
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center ml-auto pr-4">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-300 hover:text-white p-2"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black border-b border-white/10">
                    <div className="px-6 py-4 space-y-4 flex flex-col">
                        <button className="text-gray-300 hover:text-white text-sm font-medium text-left" onClick={() => { onNavigate('landing'); setIsMobileMenuOpen(false); }}>Home</button>
                        <button className="text-gray-300 hover:text-white text-sm font-medium text-left" onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }}>About</button>
                        <button className="text-gray-300 hover:text-white text-sm font-medium text-left" onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }}>Contact</button>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Candidate</div>
                        <button onClick={() => { onLogin('candidate'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white text-sm font-medium text-left pl-4">Login</button>
                        <button onClick={() => { onJoin('candidate'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white text-sm font-medium text-left pl-4">Join</button>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Recruiter</div>
                        <button onClick={() => { onLogin('recruiter'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white text-sm font-medium text-left pl-4">Login</button>
                        <button onClick={() => { onJoin('recruiter'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white text-sm font-medium text-left pl-4">Join</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
