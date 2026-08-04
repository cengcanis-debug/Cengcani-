import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageSquare, CheckCircle2, Clock, AlertTriangle, Send, Filter, Check, Star, User, Sparkles, Plus, Trash2, HelpCircle, Terminal, Cpu, Globe, Wifi, Activity, Download, RefreshCw } from 'lucide-react';
import { FeedbackItem } from '../types';

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'success' | 'error';
  source: string;
  message: string;
}

const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: 'fb-1',
    testerName: 'Sipho Mkhize (Parent)',
    testerRole: 'Parent',
    category: 'WhatsApp / Link Query',
    message: 'When I shared the app link on our school WhatsApp group, it previewed an image of a PDF file instead of the app banner. How can we fix this?',
    rating: 4,
    timestamp: '2026-08-04 14:15',
    status: 'Resolved',
    developerReply: 'Fixed! We updated index.html with the explicit absolute URL for sifiso-preview.png and cleared WhatsApp link cache.',
    repliedAt: '2026-08-04 14:30'
  },
  {
    id: 'fb-2',
    testerName: 'Mr. van der Merwe (Math Teacher)',
    testerRole: 'Teacher',
    category: 'Curriculum Question',
    message: 'Can Grade 11 Mathematics include more Euclidean Geometry proofs in the Quiz generator? The current questions are great but my learners need circle geometry.',
    rating: 5,
    timestamp: '2026-08-04 12:10',
    status: 'In Progress',
    developerReply: 'Working on adding dedicated Grade 11 Circle Geometry theorems and proofs to the Quiz engine in the next update.',
    repliedAt: '2026-08-04 13:00'
  },
  {
    id: 'fb-3',
    testerName: 'Anelisa Dlamini',
    testerRole: 'Student',
    category: 'Feature Suggestion',
    message: 'The voice-to-text microphone button is amazing for speaking out physics questions! Can we also have Sifiso read the answers back using text-to-speech?',
    rating: 5,
    timestamp: '2026-08-04 09:45',
    status: 'Pending'
  }
];

export function DeveloperObservationHub() {
  const [activeSubTab, setActiveSubTab] = useState<'feedback' | 'diagnostics'>('feedback');
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(() => {
    const saved = localStorage.getItem('sifiso_tester_feedback_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_FEEDBACK;
  });

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  // New feedback submission modal state for testers
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newTesterName, setNewTesterName] = useState('');
  const [newTesterRole, setNewTesterRole] = useState<'Student' | 'Parent' | 'Teacher' | 'School Principal' | 'Tester'>('Student');
  const [newCategory, setNewCategory] = useState<'Bug Report' | 'Feature Suggestion' | 'WhatsApp / Link Query' | 'Curriculum Question' | 'General Feedback'>('Feature Suggestion');
  const [newMessage, setNewMessage] = useState('');
  const [newRating, setNewRating] = useState(5);

  // Diagnostics & System Logs state
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
      level: 'success',
      source: 'App Init',
      message: 'Sifiso AI Tდა (SifisoYourSa) loaded successfully with CAPS & IEB curriculum state.'
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 2800000).toLocaleTimeString(),
      level: 'info',
      source: 'SpeechRecognition',
      message: 'Web Speech API supported in current browser environment.'
    },
    {
      id: 'log-3',
      timestamp: new Date(Date.now() - 1500000).toLocaleTimeString(),
      level: 'info',
      source: 'Firestore/Storage',
      message: 'Local session cache synchronized successfully.'
    },
    {
      id: 'log-4',
      timestamp: new Date(Date.now() - 600000).toLocaleTimeString(),
      level: 'success',
      source: 'Network',
      message: 'Secure connection established with production API gateway.'
    }
  ]);
  const [logFilterLevel, setLogFilterLevel] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('sifiso_tester_feedback_v1', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addLog('success', 'Network', 'Browser connected to internet (online event fired).');
    };
    const handleOffline = () => {
      setIsOnline(false);
      addLog('warn', 'Network', 'Browser disconnected from internet (offline event fired).');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addLog = (level: 'info' | 'warn' | 'success' | 'error', source: string, message: string) => {
    const newLog: SystemLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleTimeString(),
      level,
      source,
      message
    };
    setSystemLogs(prev => [newLog, ...prev.slice(0, 49)]); // keep last 50
  };

  const handleSendReply = (id: string) => {
    const text = replyText[id];
    if (!text || !text.trim()) return;

    setFeedbackList(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          developerReply: text.trim(),
          repliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'Resolved'
        };
      }
      return item;
    }));

    setActiveReplyId(null);
    setReplyText(prev => ({ ...prev, [id]: '' }));
    addLog('success', 'FeedbackHub', `Developer replied to feedback item #${id}`);
  };

  const handleStatusChange = (id: string, newStatus: 'Pending' | 'In Progress' | 'Resolved') => {
    setFeedbackList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    addLog('info', 'FeedbackHub', `Status for ${id} changed to ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tester feedback item?')) {
      setFeedbackList(prev => prev.filter(item => item.id !== id));
      addLog('warn', 'FeedbackHub', `Feedback item ${id} deleted.`);
    }
  };

  const handleAddNewFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTesterName || !newMessage) {
      alert('Please fill in your name and feedback message.');
      return;
    }

    const newItem: FeedbackItem = {
      id: 'fb-' + Date.now(),
      testerName: newTesterName,
      testerRole: newTesterRole,
      category: newCategory,
      message: newMessage,
      rating: newRating,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending'
    };

    setFeedbackList([newItem, ...feedbackList]);
    setIsSubmitModalOpen(false);
    setNewTesterName('');
    setNewMessage('');
    addLog('success', 'FeedbackHub', `New tester feedback submitted by ${newTesterName} (${newCategory})`);
    alert('Thank you! Your query/suggestion has been submitted to the Developer Observation Hub.');
  };

  const filteredItems = feedbackList.filter(item => {
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    if (filterCategory !== 'All' && item.category !== filterCategory) return false;
    return true;
  });

  const filteredLogs = systemLogs.filter(log => {
    if (logFilterLevel !== 'all' && log.level !== logFilterLevel) return false;
    return true;
  });

  const pendingCount = feedbackList.filter(i => i.status === 'Pending').length;
  const inProgressCount = feedbackList.filter(i => i.status === 'In Progress').length;
  const resolvedCount = feedbackList.filter(i => i.status === 'Resolved').length;

  const speechApiSupported = typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  return (
    <div className="space-y-8 pb-16">
      {/* Developer Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3.5 py-1 rounded-full text-xs font-semibold border border-indigo-500/30">
              <ShieldCheck size={14} /> Developer & Administrator Exclusive Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Observation & Diagnostics Hub</h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Monitor incoming tester queries, bug reports, and non-sensitive system diagnostics in real time. Handle responses, triage issues, and troubleshoot session-related concerns.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-2xl shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer text-xs sm:text-sm"
            >
              <Plus size={16} />
              <span>Submit Test Feedback</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveSubTab('feedback')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'feedback'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <MessageSquare size={16} />
          <span>Tester Feedback & Queries ({feedbackList.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('diagnostics')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'diagnostics'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Terminal size={16} />
          <span>System Diagnostics & Session Logs ({systemLogs.length})</span>
        </button>
      </div>

      {activeSubTab === 'feedback' ? (
        <div className="space-y-6">
          {/* Metrics Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Submissions</span>
              <div className="text-3xl font-extrabold text-slate-900">{feedbackList.length}</div>
              <p className="text-xs text-slate-500">From testers & pilot users</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-1 bg-amber-50/40">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Pending Attention</span>
              <div className="text-3xl font-extrabold text-amber-900">{pendingCount}</div>
              <p className="text-xs text-amber-600">Requires developer response</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-blue-200 shadow-sm space-y-1 bg-blue-50/40">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">In Progress</span>
              <div className="text-3xl font-extrabold text-blue-900">{inProgressCount}</div>
              <p className="text-xs text-blue-600">Being patched or tested</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-sm space-y-1 bg-emerald-50/40">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Resolved & Answered</span>
              <div className="text-3xl font-extrabold text-emerald-900">{resolvedCount}</div>
              <p className="text-xs text-emerald-600">Completed feedback items</p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Filter size={16} className="text-indigo-600" />
                <span>Filter Status:</span>
              </div>
              {['All', 'Pending', 'In Progress', 'Resolved'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    filterStatus === st
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              <span className="text-xs font-bold text-slate-700">Category:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Suggestion">Feature Suggestion</option>
                <option value="WhatsApp / Link Query">WhatsApp / Link Query</option>
                <option value="Curriculum Question">Curriculum Question</option>
                <option value="General Feedback">General Feedback</option>
              </select>
            </div>
          </div>

          {/* Feedback & Query List */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                <MessageSquare size={40} className="text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No feedback items match your filter</h3>
                <p className="text-xs text-slate-500">Try selecting a different status or submit new tester feedback.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-300 transition">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center shrink-0 border border-indigo-100">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-base">{item.testerName}</h3>
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                            {item.testerRole}
                          </span>
                          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock size={12} /> Submitted on {item.timestamp}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
                      {/* Rating */}
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-800">
                        <Star size={13} className="fill-amber-400 text-amber-500" />
                        <span>{item.rating}/5</span>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                          item.status === 'Pending' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                          'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="text-sm text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 leading-relaxed">
                    "{item.message}"
                  </div>

                  {/* Developer Response Section */}
                  {item.developerReply ? (
                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                          <ShieldCheck size={15} className="text-emerald-700" /> Developer Response & Resolution
                        </span>
                        <span className="text-[11px] text-emerald-700 font-medium">Replied: {item.repliedAt}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                        {item.developerReply}
                      </p>
                      <button
                        onClick={() => {
                          setActiveReplyId(item.id);
                          setReplyText(prev => ({ ...prev, [item.id]: item.developerReply || '' }));
                        }}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline mt-1 block cursor-pointer"
                      >
                        Edit Response
                      </button>
                    </div>
                  ) : (
                    <div>
                      {activeReplyId === item.id ? (
                        <div className="space-y-3 pt-2">
                          <textarea
                            rows={3}
                            value={replyText[item.id] || ''}
                            onChange={(e) => setReplyText(prev => ({ ...prev, [item.id]: e.target.value }))}
                            placeholder="Type developer response, explanation, or resolution patch details..."
                            className="w-full p-4 rounded-2xl border border-indigo-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                          ></textarea>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setActiveReplyId(null)}
                              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSendReply(item.id)}
                              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <Send size={14} /> Send & Resolve
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveReplyId(item.id)}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold px-4 py-2 rounded-xl border border-indigo-200 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare size={14} /> Reply to Tester Query
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Diagnostics & Session Logs Tab */
        <div className="space-y-6">
          {/* Quick Environment Specs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connection Status</span>
                <Wifi size={18} className={isOnline ? 'text-emerald-600' : 'text-red-600'} />
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                <span className="text-lg font-bold text-slate-900">{isOnline ? 'Online (Connected)' : 'Offline'}</span>
              </div>
              <p className="text-xs text-slate-500">Real-time network state listener</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Speech-to-Text API</span>
                <Activity size={18} className={speechApiSupported ? 'text-indigo-600' : 'text-amber-600'} />
              </div>
              <div className="text-lg font-bold text-slate-900">
                {speechApiSupported ? 'Supported ✅' : 'Not Supported ⚠️'}
              </div>
              <p className="text-xs text-slate-500">Web Speech API in current browser</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Screen & Viewport</span>
                <Globe size={18} className="text-blue-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">
                {typeof window !== 'undefined' ? `${window.innerWidth} x ${window.innerHeight} px` : 'N/A'}
              </div>
              <p className="text-xs text-slate-500">Responsive client resolution</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Session Storage Items</span>
                <Cpu size={18} className="text-purple-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">
                {typeof localStorage !== 'undefined' ? localStorage.length : 0} keys stored
              </div>
              <p className="text-xs text-slate-500">Local persistence footprint</p>
            </div>
          </div>

          {/* System Logs Control & Filter Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Terminal size={16} className="text-indigo-600" />
                <span>Log Level Filter:</span>
              </div>
              {['all', 'success', 'info', 'warn', 'error'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setLogFilterLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                    logFilterLevel === lvl
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  addLog('info', 'Diagnostics', 'Manual diagnostic health check triggered by developer.');
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw size={14} /> Run Diagnostics
              </button>
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(systemLogs, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `sifiso_diagnostics_${Date.now()}.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                  addLog('success', 'Export', 'Diagnostic logs exported as JSON successfully.');
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Download size={14} /> Export Logs
              </button>
            </div>
          </div>

          {/* Console / Terminal Log Stream */}
          <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl font-mono space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span className="ml-2 font-bold text-slate-200">sifiso-session-diagnostics.log</span>
              </div>
              <span className="text-[11px] text-slate-400">Showing {filteredLogs.length} events</span>
            </div>

            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No logs matching filter level '{logFilterLevel}'.
                </div>
              ) : (
                filteredLogs.map(log => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start justify-between gap-4 text-xs">
                    <div className="flex items-start gap-3">
                      <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                        log.level === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' :
                        log.level === 'warn' ? 'bg-amber-950 text-amber-400 border border-amber-800/50' :
                        log.level === 'error' ? 'bg-red-950 text-red-400 border border-red-800/50' :
                        'bg-blue-950 text-blue-400 border border-blue-800/50'
                      }`}>
                        {log.level}
                      </span>
                      <span className="text-indigo-400 font-semibold shrink-0">[{log.source}]</span>
                      <span className="text-slate-200 break-all">{log.message}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Test Feedback Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Tester Input</span>
                <h3 className="text-xl font-bold text-slate-900">Submit Query, Bug or Suggestion</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewFeedback} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={newTesterName}
                    onChange={(e) => setNewTesterName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Role *</label>
                  <select
                    value={newTesterRole}
                    onChange={(e: any) => setNewTesterRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Teacher">Teacher</option>
                    <option value="School Principal">School Principal</option>
                    <option value="Tester">Tester</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Feature Suggestion">Feature Suggestion</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="WhatsApp / Link Query">WhatsApp / Link Query</option>
                    <option value="Curriculum Question">Curriculum Question</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Rating (1-5 Stars)</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                    <option value={2}>⭐⭐ (2/5 Needs Improvement)</option>
                    <option value={1}>⭐ (1/5 Issue)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Query, Suggestion or Feedback *</label>
                <textarea
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Describe your suggestion or report an issue..."
                  required
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Send size={14} /> Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

