// Runtime Diagnostic Monitoring & Error Logging Service
export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  category: 'API' | 'RUNTIME' | 'UI' | 'AUTH' | 'STATE';
  message: string;
  details?: string;
}

class ErrorMonitorService {
  private logs: LogEntry[] = [];
  private maxLogs = 50;
  private listeners: ((logs: LogEntry[]) => void)[] = [];

  constructor() {
    this.loadFromStorage();
    this.initGlobalListeners();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem('sifiso_error_logs');
      if (saved) {
        this.logs = JSON.parse(saved);
      }
    } catch {
      this.logs = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('sifiso_error_logs', JSON.stringify(this.logs.slice(0, this.maxLogs)));
    } catch {
      // Storage quota or private mode
    }
  }

  private initGlobalListeners() {
    if (typeof window === 'undefined') return;

    window.addEventListener('error', (event) => {
      this.log({
        level: 'error',
        category: 'RUNTIME',
        message: event.message || 'Uncaught runtime error',
        details: `File: ${event.filename}:${event.lineno}:${event.colno}\nStack: ${event.error?.stack || 'N/A'}`
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.log({
        level: 'error',
        category: 'RUNTIME',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        details: String(event.reason?.stack || event.reason || 'N/A')
      });
    });
  }

  public log(entry: Omit<LogEntry, 'id' | 'timestamp'>) {
    const newEntry: LogEntry = {
      ...entry,
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString()
    };

    this.logs = [newEntry, ...this.logs].slice(0, this.maxLogs);
    this.saveToStorage();
    this.notifyListeners();
  }

  public getLogs(): LogEntry[] {
    return this.logs;
  }

  public clearLogs() {
    this.logs = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  public subscribe(listener: (logs: LogEntry[]) => void) {
    this.listeners.push(listener);
    listener(this.logs);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l(this.logs));
  }
}

export const errorMonitor = new ErrorMonitorService();
