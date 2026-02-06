import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Clock, ShieldAlert } from 'lucide-react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import { proctorService } from '../../services/ProctorService';

const IntegrityReport = ({ onClose }) => {
    const [snapshots, setSnapshots] = useState([]);
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('snapshots');

    useEffect(() => {
        setSnapshots(proctorService.getSnapshots());
        setEvents(proctorService.getReplay());
    }, []);

    useEffect(() => {
        if (activeTab === 'replay' && events.length > 0) {
            const container = document.getElementById('rrweb-player-container');
            if (container) {
                container.innerHTML = ''; // Clear previous
                new rrwebPlayer({
                    target: container,
                    props: {
                        events,
                        width: container.clientWidth,
                        height: 400,
                    },
                });
            }
        }
    }, [activeTab, events]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
            >
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                        <ShieldAlert className="text-yellow-500" />
                        <h2 className="text-2xl font-bold text-white">Candidate Integrity Report</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('snapshots')}
                        className={`px-8 py-4 font-bold text-sm transition-colors ${activeTab === 'snapshots' ? 'bg-white/10 text-white border-b-2 border-purple-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        Snapshot Timeline
                    </button>
                    <button
                        onClick={() => setActiveTab('replay')}
                        className={`px-8 py-4 font-bold text-sm transition-colors ${activeTab === 'replay' ? 'bg-white/10 text-white border-b-2 border-purple-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        Code Playback (Ghost Mode)
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-[#050505]">
                    {activeTab === 'snapshots' && (
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold text-white mb-4">Security Snapshots</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {snapshots.length === 0 ? (
                                    <p className="text-gray-500">No snapshots recorded.</p>
                                ) : (
                                    snapshots.map((snap) => (
                                        <div key={snap.id} className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-colors">
                                            <img src={snap.image} alt="Snapshot" className="w-full h-40 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                            <div className="p-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} /> +{snap.timeOffset}s</span>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${snap.reason.includes('Suspect') ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                                        {snap.reason}
                                                    </span>
                                                </div>
                                                <div className="text-xs font-mono text-gray-500">{snap.timestamp}</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'replay' && (
                        <div className="h-full flex flex-col">
                            <div className="bg-[#1e1e1e] border border-white/10 rounded-xl overflow-hidden p-4 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Play size={16} className="text-green-400" /> Session Replay
                                </h3>
                                {events.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center text-gray-500">
                                        No recording data available.
                                    </div>
                                ) : (
                                    <div id="rrweb-player-container" className="rounded bg-black w-full flex-1"></div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </motion.div>
        </div>
    );
};

export default IntegrityReport;
