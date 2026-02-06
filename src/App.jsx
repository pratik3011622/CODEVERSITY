import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardLayout from './components/dashboard/DashboardLayout';
import RecruiterLogin from './components/RecruiterLogin';
import CandidateLogin from './components/candidate/CandidateLogin';
import CandidateDashboard from './components/candidate/CandidateDashboard';
import JobBrowser from './components/candidate/JobBrowser';
import FeedbackPage from './components/candidate/FeedbackPage';
import AssessmentLayout from './components/assessment/AssessmentLayout';
import ErrorBoundary from './components/ErrorBoundary';
import HowItWorks from './components/HowItWorks';
import PlatformFeatures from './components/PlatformFeatures';

const ParticleBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[#000000]"></div>
    <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    {/* Simple starfield simulation */}
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white opacity-40 animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3}px`,
          height: `${Math.random() * 3}px`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
  </div>
);

function App() {
  // Views: 'landing', 'dashboard' (recruiter), 'candidate-login', 'candidate-browse', 'candidate-dashboard', 'candidate-feedback', 'assessment'
  const [view, setView] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Recruiter
  const [isCandidateAuth, setIsCandidateAuth] = useState(false); // Candidate

  // Page Transition Variants (Anti-Gravity)
  const pageVariants = {
    initial: { scale: 0.8, opacity: 0, zIndex: -10 },
    animate: { scale: 1, opacity: 1, zIndex: 1, transition: { duration: 0.8, ease: "circOut" } },
    exit: { scale: 1.2, opacity: 0, zIndex: 10, transition: { duration: 0.8, ease: "circIn" } }
  };

  const handleCandidateLogin = () => {
    setIsCandidateAuth(true);
    setView('candidate-browse');
  };

  // Helper to wrap content in motion div
  const PageWrapper = ({ children }) => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full absolute inset-0 overflow-y-auto overflow-x-hidden"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      <ParticleBackground />

      {/* Dynamic Navbar based on view */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar onLogin={(type) => {
          if (type === 'candidate') setView('candidate-login');
          else if (type === 'recruiter') setView('dashboard');
          else setView('landing');
        }} />

        {/* Candidate Sub-nav (only visible in candidate flow) */}
        {view.startsWith('candidate-') && view !== 'candidate-login' && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 flex space-x-2 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 z-50">
            {['browse', 'dashboard', 'feedback'].map(sub => (
              <button
                key={sub}
                onClick={() => setView(`candidate-${sub}`)}
                className={`text-xs px-4 py-2 rounded-full transition-all ${view === `candidate-${sub}` ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* LANDING PAGE */}
        {view === 'landing' && (
          <PageWrapper key="landing">
            <div className="pt-20"><Hero /></div>
            <HowItWorks />
            <PlatformFeatures />
          </PageWrapper>
        )}

        {/* RECRUITER ROUTES */}
        {view === 'dashboard' && (
          <PageWrapper key="recruiter-dashboard">
            {!isAuthenticated ? (
              <RecruiterLogin onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <ErrorBoundary>
                <DashboardLayout onLogout={() => { setIsAuthenticated(false); setView('landing'); }} />
              </ErrorBoundary>
            )}
          </PageWrapper>
        )}

        {/* CANDIDATE ROUTES */}
        {view === 'candidate-login' && (
          <PageWrapper key="candidate-login">
            <CandidateLogin onLogin={handleCandidateLogin} />
          </PageWrapper>
        )}

        {view === 'candidate-browse' && (
          <PageWrapper key="candidate-browse">
            <JobBrowser onApply={() => setView('assessment')} />
          </PageWrapper>
        )}

        {view === 'candidate-dashboard' && (
          <PageWrapper key="candidate-dashboard">
            <CandidateDashboard onLogout={() => { setIsCandidateAuth(false); setView('landing'); }} />
          </PageWrapper>
        )}

        {view === 'candidate-feedback' && (
          <PageWrapper key="candidate-feedback">
            <FeedbackPage />
          </PageWrapper>
        )}

        {/* ASSESSMENT ARENA ROUTE */}
        {view === 'assessment' && (
          <PageWrapper key="assessment">
            <AssessmentLayout />
          </PageWrapper>
        )}


      </AnimatePresence>
    </div>
  );
}

export default App;
