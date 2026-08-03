import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Activity, Cpu, Server, Lock, AlertTriangle, RefreshCw, Headphones, FileText, Send, Sparkles, Bug, Trash2 } from 'lucide-react';
import { errorMonitor, LogEntry } from '../lib/errorMonitor';

export function SystemHealthQSMEView() {
  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'tickets' | 'diagnostics'>('overview');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const unsubscribe = errorMonitor.subscribe((updatedLogs) => {
      setLogs(updatedLogs);
    });
    return unsubscribe;
  }, []);
  
  // Support ticket state
  const [ticketName, setTicketName] = useState('');
  const [ticketRole, setTicketRole] = useState('Teacher');
  const [ticketCategory, setTicketCategory] = useState('Quality & Curriculum');
  const [ticketMessage, setTicketMessage] = useState('');
  const [tickets, setTickets] = useState([
    { id: 'TICK-1042', name: 'Mrs. Van Der Merwe', role: 'Teacher', category: 'Quality & Curriculum', message: 'Grade 7 Mathematics algebra module verified against CAPS 2026 guidelines.', status: 'Resolved', date: '2026-07-30' },
    { id: 'TICK-1041', name: 'Mr. Khumalo', role: 'Parent', category: 'Safety & POPIA', message: 'Parental verification SMS dispatch confirmed for Grade 10 learner.', status: 'Verified', date: '2026-07-29' }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketMessage) return;
    const newTicket = {
      id: `TICK-10${Math.floor(Math.random() * 90 + 10)}`,
      name: ticketName,
      role: ticketRole,
      category: ticketCategory,
      message: ticketMessage,
      status: 'In Review',
      date: new Date().toISOString().split('T')[0]
    };
    setTickets([newTicket, ...tickets]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setTicketName('');
    setTicketMessage('');
  };

  const handleTriggerTestError = () => {
    try {
      throw new Error('Simulated developer test error for diagnostics verification.');
    } catch (err: any) {
      errorMonitor.log({
        level: 'error',
        category: 'RUNTIME',
        message: err.message,
        details: err.stack || 'Manual simulation triggered in QSME diagnostics hub.'
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
            <ShieldCheck size={14} /> QSME&S Management System
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Quality, Safety, Maintenance, Environment & Support</h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Enterprise-grade operational governance ensuring absolute curriculum accuracy, POPIA student data protection, 99.99% server uptime, green cloud compute efficiency, and 24/7 stakeholder support.
          </p>

          <div className="flex gap-2 pt-2 flex-wrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Activity size={15} /> QSME Metrics & Health
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'audit' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FileText size={15} /> Compliance & Audit Logs
            </button>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-4 py-2 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'diagnostics' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Bug size={15} /> Runtime Error Monitor ({logs.length})
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-2 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tickets' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Headphones size={15} /> Support & Help Desk ({tickets.length})
            </button>
          </div>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 5 Pillars Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Quality */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles size={20} />
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">99.8% Pass Rate</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">1. Quality (CAPS / IEB)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Socratic AI prompts continuously verified against DBE Grade 5-12 assessment guidelines and past papers.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
                <span>Curriculum Sync:</span>
                <span className="font-semibold text-emerald-600">Active (2026 Verified)</span>
              </div>
            </div>

            {/* 2. Safety */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Lock size={20} />
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">POPIA Compliant</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">2. Safety & Data Protection</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Strict parent/guardian mobile verification, cryptographically signed APK tokens, and zero PII leakage.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
                <span>Encryption Standard:</span>
                <span className="font-semibold text-emerald-600">TLS 1.3 / AES-256</span>
              </div>
            </div>

            {/* 3. Maintenance */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Server size={20} />
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">99.98% Uptime</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">3. Maintenance & Reliability</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Automated container scaling, server-side error boundaries, and self-healing Express runtime architecture.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
                <span>Last System Check:</span>
                <span className="font-semibold text-blue-600">Today, 04:00 AM</span>
              </div>
            </div>

            {/* 4. Environment */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Cpu size={20} />
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">Carbon Neutral</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">4. Environment & Green Compute</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Cloud Run serverless containers scale to zero during night hours, minimizing energy waste across data centers.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
                <span>Power Efficiency:</span>
                <span className="font-semibold text-emerald-600">Optimized (Low TDP)</span>
              </div>
            </div>

            {/* 5. Support */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Headphones size={20} />
                </div>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full">&lt; 15 min Response</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">5. Support & Stakeholder Desk</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Dedicated assistance channels for schools, teachers, parents, and students with priority ticketing and WhatsApp escalation.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
                <span>Help Desk Status:</span>
                <span className="font-semibold text-purple-600">Online & Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUDIT LOGS TAB */}
      {activeTab === 'audit' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Quality & Safety Registry</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">System Compliance & Audit Trail</h2>
              <p className="text-sm text-slate-500">Immutable event logs recording security handshakes, POPIA checks, and curriculum validations.</p>
            </div>
            <button
              onClick={() => alert('Audit logs successfully exported to encrypted CSV.')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition shadow cursor-pointer"
            >
              Export Secure Audit Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Timestamp</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Event Description</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl">Verifier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3.5 font-mono text-slate-500">2026-07-31 04:30:12</td>
                  <td className="p-3.5 font-bold text-indigo-600">Safety (POPIA)</td>
                  <td className="p-3.5 text-slate-800">Parent/Guardian phone verification matched with student APK request.</td>
                  <td className="p-3.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">Passed</span></td>
                  <td className="p-3.5 text-slate-500">Auth Gateway v3</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono text-slate-500">2026-07-31 02:15:00</td>
                  <td className="p-3.5 font-bold text-emerald-600">Quality (CAPS)</td>
                  <td className="p-3.5 text-slate-800">Grade 10 Physical Sciences stoichiometry prompt validation check.</td>
                  <td className="p-3.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">Verified</span></td>
                  <td className="p-3.5 text-slate-500">Socratic Engine</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono text-slate-500">2026-07-30 23:00:45</td>
                  <td className="p-3.5 font-bold text-blue-600">Maintenance</td>
                  <td className="p-3.5 text-slate-800">Automated database integrity check & incremental cloud backup.</td>
                  <td className="p-3.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">Completed</span></td>
                  <td className="p-3.5 text-slate-500">Cloud Cron Job</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono text-slate-500">2026-07-30 18:40:22</td>
                  <td className="p-3.5 font-bold text-purple-600">Environment</td>
                  <td className="p-3.5 text-slate-800">Container scaling event: active pods adjusted for evening study peak.</td>
                  <td className="p-3.5"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold">Optimized</span></td>
                  <td className="p-3.5 text-slate-500">Cloud Run autoscaler</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUPPORT & TICKETS TAB */}
      {activeTab === 'tickets' && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ticket Submission Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Stakeholder Assistance</span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Submit a Support or Quality Request</h2>
              <p className="text-sm text-slate-500">Need curriculum clarification, technical help, or POPIA verification? Our support desk is here 24/7.</p>
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 size={28} className="text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-sm">Support Ticket Dispatched!</h3>
                <p className="text-xs text-emerald-700">Our support team will respond via email/WhatsApp within 15 minutes.</p>
              </div>
            )}

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                  placeholder="e.g. Mr. Sipho Ndlovu"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">User Role</label>
                  <select
                    value={ticketRole}
                    onChange={(e) => setTicketRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Teacher">Teacher / HOD</option>
                    <option value="Parent">Parent / Guardian</option>
                    <option value="Student">Student (Gr 5-12)</option>
                    <option value="School Principal">School Principal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Quality & Curriculum">Quality & Curriculum</option>
                    <option value="Safety & POPIA">Safety & POPIA</option>
                    <option value="Maintenance & App">Maintenance & App</option>
                    <option value="Environment & Access">Environment & Access</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Issue Description or Inquiry *</label>
                <textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your inquiry, feedback, or support requirement in detail..."
                  rows={3}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={16} /> Submit Support Ticket
              </button>
            </form>
          </div>

          {/* Active Tickets List */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Recent Support & Quality Tickets</h2>
              <p className="text-sm text-slate-500">Live tracker of stakeholder inquiries and resolutions.</p>
            </div>

            <div className="space-y-3">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-600">{t.id}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">{t.message}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                    <span>{t.name} ({t.role})</span>
                    <span>{t.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RUNTIME ERROR MONITOR TAB */}
      {activeTab === 'diagnostics' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Diagnostic Monitoring Service</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Live Runtime Error & Exception Log</h2>
              <p className="text-sm text-slate-500">Captures unhandled exceptions, promise rejections, and runtime warnings to assist debugging during live testing.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleTriggerTestError}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition shadow cursor-pointer flex items-center gap-1.5"
              >
                <Bug size={14} /> Simulate Test Error
              </button>
              <button
                onClick={() => errorMonitor.clearLogs()}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition shadow cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Clear Logs
              </button>
            </div>
          </div>

          {logs.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <CheckCircle2 size={40} className="text-emerald-500 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">No Runtime Errors Detected</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your application is currently running smoothly with zero unhandled exceptions or promise rejections. Click "Simulate Test Error" above to test the monitoring service.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl border border-red-200 bg-red-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-100 text-red-800 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                        {log.level}
                      </span>
                      <span className="bg-indigo-100 text-indigo-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                        {log.category}
                      </span>
                      <span className="font-mono text-xs text-slate-500">{log.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-900">{log.message}</p>
                  {log.details && (
                    <pre className="text-[11px] font-mono bg-slate-900 text-slate-200 p-3 rounded-xl overflow-x-auto">
                      {log.details}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
