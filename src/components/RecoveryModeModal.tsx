import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw, Database, HardDrive, CheckCircle2, AlertTriangle, BookOpen, ShieldCheck, X, MessageSquare, Terminal } from 'lucide-react';
import { Message } from '../types';

interface RecoveryModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isServerUnreachable: boolean;
  onRetryConnection: () => Promise<boolean>;
  cachedMessages: Message[];
}

export function RecoveryModeModal({
  isOpen,
  onClose,
  isServerUnreachable,
  onRetryConnection,
  cachedMessages
}: RecoveryModeModalProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retrySuccessMessage, setRetrySuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOpen) return null;

  const handleRetryClick = async () => {
    setIsRetrying(true);
    setRetrySuccessMessage(null);
    try {
      const success = await onRetryConnection();
      if (success) {
        setRetrySuccessMessage("Connection re-established successfully! Server is online.");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        alert("Server still unreachable. Please check your network signal or Wi-Fi router.");
      }
    } catch (err) {
      alert("Connection attempt failed.");
    } finally {
      setIsRetrying(false);
    }
  };

  const localSavedFlashcards = typeof localStorage !== 'undefined' ? localStorage.getItem('sifiso_flashcards') : null;
  const localStudyPlanner = typeof localStorage !== 'undefined' ? localStorage.getItem('sifiso_study_planner') : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              {isServerUnreachable || !isOnline ? <WifiOff size={24} /> : <Wifi size={24} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {isServerUnreachable || !isOnline ? 'Offline / Recovery Mode' : 'Network Active'}
                </span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-0.5">Sifiso Recovery & Local Cache Hub</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Status Alert */}
          {isServerUnreachable || !isOnline ? (
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                <span>Connection Interrupted or Server Unreachable</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                Sifiso AI Tutor is running in <strong>Local Recovery Mode</strong>. You can still view your previously cached chat messages, flashcards, and study schedules stored locally on your device without losing your study progress.
              </p>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span>Network Connected & Fully Operational</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                Your connection to the Sifiso server gateway is active. Local data is synchronized with secure cloud persistence.
              </p>
            </div>
          )}

          {retrySuccessMessage && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700" />
              <span>{retrySuccessMessage}</span>
            </div>
          )}

          {/* Action Bar: Retry Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Test Connection & Re-sync</h4>
              <p className="text-xs text-slate-500">Attempt to ping the Sifiso API gateway and restore live AI tutoring.</p>
            </div>
            <button
              onClick={handleRetryClick}
              disabled={isRetrying}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <RefreshCw size={15} className={isRetrying ? 'animate-spin' : ''} />
              <span>{isRetrying ? 'Testing Connection...' : 'Retry Connection'}</span>
            </button>
          </div>

          {/* Locally Stored Cached Data Viewer */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Database size={18} className="text-indigo-600" />
              <span>Locally Cached Device Storage ({cachedMessages.length} Chat Messages)</span>
            </h3>

            <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs space-y-3 max-h-[220px] overflow-y-auto">
              <div className="text-[11px] text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>STORAGE KEY: `sifiso_local_cache`</span>
                <span>STATUS: SECURELY CACHED</span>
              </div>
              {cachedMessages.length === 0 ? (
                <div className="text-slate-500 py-4 text-center">No cached chat history found.</div>
              ) : (
                cachedMessages.map((msg, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-800/80 border border-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans">
                      <span className="font-bold uppercase text-indigo-400">{msg.role}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-200 text-xs font-sans line-clamp-2">{msg.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Offline Learning Tips for SA Learners */}
          <div className="bg-indigo-50/60 border border-indigo-100 p-5 rounded-2xl space-y-2">
            <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-indigo-600" /> South African Low-Signal / Offline Strategy
            </h4>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Sifiso AI Tutor is optimized for Quintile 1–3 schools with intermittent connectivity. Service workers and browser caching ensure quizzes, formulas, and flashcards remain accessible even when mobile data or Wi-Fi signal drops.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">Sifiso PWA Engine v2.4</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
          >
            Close Recovery Hub
          </button>
        </div>

      </div>
    </div>
  );
}
