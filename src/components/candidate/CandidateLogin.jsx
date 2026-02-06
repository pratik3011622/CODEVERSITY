import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check, Scan, ArrowRight, Shield, Globe, Mic, Camera, FileText } from 'lucide-react';

const PermissionIcon = ({ icon: Icon, label, active, onClick }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 ${active
                ? 'bg-green-500/10 border border-green-500/50 shadow-[0_0_15px_-5px_#22c55e]'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
    >
        <Icon size={24} className={active ? 'text-green-400' : 'text-gray-400'} />
        <span className="text-[10px] mt-1.5 uppercase tracking-wider text-gray-500">{label}</span>
        {active && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        )}
    </motion.button>
);

const SecurityLens = ({ isActive }) => (
    <div className="relative w-32 h-32 mx-auto mb-8 perspective-[1000px] group">
        <div className={`relative w-full h-full transform-style-3d transition-all duration-1000 ${isActive ? 'rotate-y-180' : 'animate-[spin_8s_linear_infinite]'}`}>
            {/* Outer Rings */}
            <div className={`absolute inset-0 border-2 rounded-full border-dashed transition-colors ${isActive ? 'border-green-500 shadow-[0_0_30px_#22c55e]' : 'border-gray-700'}`}></div>
            <div className="absolute inset-2 border border-white/10 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>

            {/* Core Lens */}
            <div className="absolute inset-0 flex items-center justify-center transform translate-z-20">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl border-2 transition-all duration-500 ${isActive ? 'bg-green-500/20 border-green-400' : 'bg-white/5 border-white/20'
                    }`}>
                    <Scan size={32} className={isActive ? 'text-green-400' : 'text-purple-400'} />
                </div>
            </div>

            {/* Scanning Laser */}
            {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent w-full h-1 animate-scan pointer-events-none"></div>
            )}
        </div>
        <div className={`text-center mt-6 font-mono text-sm tracking-[0.2em] transition-colors ${isActive ? 'text-green-400' : 'text-gray-600'}`}>
            {isActive ? 'IDENTITY VERIFIED' : 'SCANNING BIOMETRICS...'}
        </div>
    </div>
);

const CandidateLogin = ({ onLogin }) => {
    const [permissions, setPermissions] = useState({ camera: false, mic: false, terms: false });
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const togglePermission = (key) => {
        setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleUpload = () => {
        setIsUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            setUploadProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 50);
    };

    const isPermitted = Object.values(permissions).every(Boolean);
    const isReady = isPermitted && uploadProgress === 100;

    return (
        <div className="min-h-screen flex items-center justify-center relative p-4">
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-lg bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
            >
                {/* Glassmorphic Shine */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                <SecurityLens isActive={isReady} />

                {/* Permission Dock */}
                <div className="flex justify-center gap-4 mb-8">
                    <PermissionIcon
                        icon={Camera}
                        label="Camera"
                        active={permissions.camera}
                        onClick={() => togglePermission('camera')}
                    />
                    <PermissionIcon
                        icon={Mic}
                        label="Audio"
                        active={permissions.mic}
                        onClick={() => togglePermission('mic')}
                    />
                    <PermissionIcon
                        icon={FileText}
                        label="Terms"
                        active={permissions.terms}
                        onClick={() => togglePermission('terms')}
                    />
                </div>

                {/* 3D Dropzone */}
                <div
                    onClick={handleUpload}
                    className={`relative h-24 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group mb-8 flex items-center justify-center
                    ${isUploading ? 'border-purple-500/50 bg-purple-500/5' : 'border-gray-700 hover:border-gray-500 hover:bg-white/5'}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transform -translate-x-full transition-transform duration-300" style={{ transform: `translateX(${uploadProgress - 100}%)` }}></div>

                    <div className="relative z-10 flex flex-col items-center">
                        {uploadProgress === 100 ? (
                            <div className="flex items-center text-green-400 font-bold">
                                <Check size={20} className="mr-2" /> Resume Uploaded
                            </div>
                        ) : (
                            <>
                                <Upload size={24} className={`mb-2 ${isUploading ? 'text-purple-400 animate-bounce' : 'text-gray-400'}`} />
                                <span className="text-gray-400 text-sm font-medium">
                                    {isUploading ? `Uploading... ${uploadProgress}%` : 'Drop Resume / CV'}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Access Button */}
                <button
                    onClick={onLogin}
                    disabled={!isReady}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300
                    ${isReady
                            ? 'bg-white text-black hover:scale-[1.02] shadow-[0_0_40px_-5px_white]'
                            : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                        }`}
                >
                    <span>INITIALIZE SEQUENCE</span>
                    <ArrowRight size={18} />
                </button>

            </motion.div>
        </div>
    );
};

export default CandidateLogin;
