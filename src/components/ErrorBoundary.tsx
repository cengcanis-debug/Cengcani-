import React, { Component, ErrorInfo, ReactNode } from 'react';
import { guardian } from '../lib/guardianAgent';
import { AlertTriangle, RefreshCw, ShieldCheck, Wrench } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    guardian.log('error', 'client', `UI Rendering fault: ${error.message}`, 'Caught by Sifiso Guardian ErrorBoundary');
    guardian.log('repair', 'client', 'Attempting isolated component error recovery and UI fallback preservation.', 'Rendered safe state fallback');
  }

  private handleSelfRepair = () => {
    guardian.clearStorageAndHeal();
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-rose-100 p-8 text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <AlertTriangle className="w-8 h-8 animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Eish! Sifiso noticed a hiccup</h2>
            <p className="text-slate-600 text-sm mt-2 mb-6">
              An unexpected system fault or rendering error occurred. Sifiso Guardian has logged the stack trace and is ready to heal the application.
            </p>

            {this.state.error && (
              <div className="bg-slate-100 p-3 rounded-xl text-left text-xs font-mono text-rose-700 mb-6 overflow-x-auto max-h-32 border border-slate-200">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleSelfRepair}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <Wrench className="w-5 h-5" />
                <span>Run Self-Repair & Restart App</span>
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Protected by Sifiso Autonomous Guardian</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
