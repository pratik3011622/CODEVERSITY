import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SplineBackground from './SplineBackground';
import DashboardOverview from './DashboardOverview';
import CreateAssignmentModal from './CreateAssignmentModal';
import Leaderboard from './Leaderboard';
import IntegrityReport from './IntegrityReport';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const DashboardLayout = ({ onLogout }) => {
    const [view, setView] = useState('dashboard'); // 'dashboard', 'create', 'results', 'integrity'
    const [isModalOpen, setIsModalOpen] = useState(false);

    const renderContent = () => {
        switch (view) {
            case 'dashboard':
                return <DashboardOverview />;
            case 'create':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <h2 className="text-2xl font-bold">Manage Assessments</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                        >
                            + Create New Assessment
                        </button>
                    </div>
                );
            case 'results':
                return <Leaderboard />;
            case 'integrity':
                return <IntegrityReport onClose={() => setView('dashboard')} />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#030303] text-white relative overflow-hidden font-sans">
            <SplineBackground />

            {/* AI Core Floating Element - Top Right */}
            <div className="fixed top-8 right-8 w-24 h-24 pointer-events-none z-0 hidden lg:block">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
                    <div className="absolute inset-2 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-6 border border-white/40 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-ping"></div>
                    </div>
                </div>
            </div>

            <Sidebar currentView={view} setView={setView} onLogout={onLogout} />

            <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto h-screen custom-scrollbar">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {view === 'results' ? 'Global Leaderboard' : view === 'integrity' ? 'Integrity Monitor' : view}
                        </h1>
                        <p className="text-gray-400 text-sm">Welcome back, Recruiter.</p>
                    </div>
                </header>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {/* Special case for Integrity Report to maintain layout context or be full screen modal */}
                        {view === 'integrity' ? <IntegrityReport onClose={() => setView('dashboard')} /> : renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)] border border-white/20 group"
            >
                <Plus size={32} className="text-white group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            <CreateAssignmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default DashboardLayout;
