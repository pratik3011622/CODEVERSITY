import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Zap } from 'lucide-react';

const JobCard = ({ job, index, onApply }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="min-w-[350px] md:min-w-[400px] h-[500px] p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative group overflow-hidden flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
            {/* Drifting movement */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"
            />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
                        <Briefcase className="text-white" size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono border border-purple-500/30 text-purple-400 bg-purple-500/10">
                        {job.type}
                    </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {job.title}
                </h3>
                <p className="text-gray-400 text-lg mb-6">{job.company}</p>

                <div className="space-y-3">
                    <div className="flex items-center text-gray-400 text-sm">
                        <MapPin size={16} className="mr-3 text-gray-500" /> {job.location}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                        <DollarSign size={16} className="mr-3 text-gray-500" /> {job.salary}
                    </div>
                </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10 mt-auto">
                <button
                    onClick={onApply}
                    className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group/btn"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Apply Now <Zap size={18} className="text-purple-600 group-hover/btn:fill-purple-600" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
                </button>
            </div>
        </motion.div>
    );
};

const JobBrowser = ({ onApply }) => {
    const jobs = [
        { title: "Senior React Engineer", company: "Metaverse Systems", location: "Remote", salary: "$160k - $220k", type: "Full-time" },
        { title: "AI/ML Architect", company: "Neurolink Corp", location: "San Francisco, CA", salary: "$200k - $280k", type: "Contract" },
        { title: "Three.js Developer", company: "Creative Labs", location: "London, UK", salary: "£80k - £110k", type: "Full-time" },
        { title: "UX/UI Visionary", company: "Apple", location: "Cupertino, CA", salary: "$150k - $200k", type: "Full-time" },
    ];

    return (
        <div className="min-h-screen pt-24 px-8 flex flex-col justify-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12 z-10 relative"
            >
                <h2 className="text-5xl font-bold text-white mb-4">Carousel of Opportunities</h2>
                <p className="text-xl text-gray-400 max-w-2xl">
                    Discover roles designed for the next generation of digital pioneers.
                </p>
            </motion.div>

            <div className="flex space-x-8 overflow-x-auto pb-20 pt-10 px-4 -mx-4 no-scrollbar items-center mask-image-gradient">
                {jobs.map((job, idx) => (
                    <JobCard key={idx} job={job} index={idx} onApply={onApply} />
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black via-transparent to-black z-20"></div>
        </div>
    );
};

export default JobBrowser;
