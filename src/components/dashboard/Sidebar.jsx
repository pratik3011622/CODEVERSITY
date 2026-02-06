import React from 'react';
import { LayoutDashboard, FileCheck, Award, Settings, LogOut, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ currentView, setView, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'create', label: 'Assessments', icon: FileCheck },
        { id: 'results', label: 'Leaderboard', icon: Award },
        { id: 'integrity', label: 'Integrity Report', icon: ShieldAlert },
    ];

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="w-64 h-screen fixed left-0 top-0 z-50 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col"
        >
            <div className="p-8">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Recruiter
                </h2>
            </div>

            <div className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
                            ${isActive
                                    ? 'bg-purple-600/20 border border-purple-500/30 text-white'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon size={20} className={`${isActive ? 'text-purple-400' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/10 space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    <Settings size={20} />
                    <span className="font-medium text-sm">Settings</span>
                </button>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
