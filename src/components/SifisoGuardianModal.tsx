import React, { useState, useEffect } from 'react';
import { guardian, SystemLog } from '../lib/guardianAgent';
import { ShieldCheck, Activity, AlertTriangle, CheckCircle2, Wrench, RefreshCw, X, Cpu, Zap, Database } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SifisoGuardianModal({ isOpen, onClose }: Props) {
  const [logs, setLogs] = useState<SystemLog[]>(guardian.getLogs());
  const [stats, setStats] = useState(guardian.getStats());
  const [runningDiag, setRunningDiag] = useState(false);
  const [diagResult, setDiagResult] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = guardian.subscribe((newLogs) => {
      setLogs(newLogs);
      setStats(guardian.getStats());
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleRunDiagnostics = async () => {
    setRunningDiag(true);
    setDiagResult(null);
    const res = await guardian.runDiagnostics();
    setDiagResult(res.report);
    setRunningDiag(false);
    setStats(guardian.getStats());
  };

  const handleClearCache = () => {
    guardian.clearStorageAndHeal();
    setStats(guardian.getStats());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Sifiso Guardian & Fault Monitor</h2>
              <p className="text-xs text-slate-400">Autonomous system telemetry, error detection & self-healing agent</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 p-5 bg-slate-50 border-b border-slate-200">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stats.status === 'healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">System State</p>
              <p className="text-sm font-bold capitalize text-slate-800 flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${stats.status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                {stats.status}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Faults Detected</p>
              <p className="text-lg font-black text-slate-800 mt-0.5">{stats.errorCount}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Self-Repairs</p>
              <p className="text-lg font-black text-slate-800 mt-0.5">{stats.repairCount}</p>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunDiagnostics}
              disabled={runningDiag}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              {runningDiag ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              <span>{runningDiag ? 'Running Diagnostics...' : 'Run Diagnostics & Heal'}</span>
            </button>
            <button
              onClick={handleClearCache}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              <Database className="w-4 h-4 text-slate-500" />
              <span>Purge Local Cache</span>
            </button>
          </div>
          <span className="text-xs text-slate-400 font-medium">Real-time passive watcher active</span>
        </div>

        {diagResult && (
          <div className="mx-5 mt-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-medium flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{diagResult}</span>
          </div>
        )}

        {/* Log Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5 bg-slate-50/50">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Telemetry & Fault Correction Log</p>
          {logs.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No system events logged yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {log.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {log.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
                  {log.type === 'repair' && <Wrench className="w-4 h-4 text-amber-600" />}
                  {log.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  {log.type === 'info' && <Cpu className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{log.source} event</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{log.message}</p>
                  {log.actionTaken && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/50">
                      <Wrench className="w-3 h-3" />
                      <span>Action: {log.actionTaken}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Sifiso AI Tutor v2.5 - CAPS Compliant</span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded-xl transition cursor-pointer"
          >
            Close Guardian
          </button>
        </div>
      </div>
    </div>
  );
}
