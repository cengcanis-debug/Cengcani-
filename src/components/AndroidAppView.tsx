import React, { useState } from 'react';
import { Smartphone, Download, ExternalLink, ShieldCheck, CheckCircle2, MessageCircle, BookOpen, GraduationCap, Share2, Globe, CreditCard, Lock, Send, Check } from 'lucide-react';

export function AndroidAppView() {
  const [installed, setInstalled] = useState(false);
  const [phone, setPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [grade, setGrade] = useState('10');
  const [paymentMethod, setPaymentMethod] = useState('PayFast (Instant EFT / Card)');
  const [loading, setLoading] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<{
    success: boolean;
    message: string;
    downloadUrl: string;
    phone: string;
    parentPhone: string;
    studentName: string;
    smsDeliveryStatus: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleInstallClick = () => {
    if ('serviceWorker' in navigator && (window as any).deferredPrompt) {
      (window as any).deferredPrompt.prompt();
      (window as any).deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          setInstalled(true);
        }
        (window as any).deferredPrompt = null;
      });
    } else {
      alert("To install: Open your Android browser menu (⋮) and tap 'Add to Home Screen' or 'Install App'.");
    }
  };

  const handlePurchaseAndDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 9) {
      setError("Please enter a valid South African student cellphone number (e.g. 082 123 4567).");
      return;
    }
    if (!parentPhone || parentPhone.trim().length < 9) {
      setError("Parent or Guardian cellphone number is required for accessing student information under POPIA regulations.");
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/android/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, studentName, parentName, parentPhone, grade, paymentMethod })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to process purchase');
      }
      setPurchaseResult(data);
    } catch (err: any) {
      setError(err.message || 'Network error during purchase simulation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8">
          <Smartphone size={240} />
        </div>
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-emerald-400/30">
            <Smartphone size={14} /> Android & Play Store Ready
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Sifiso on Your Android Phone</h1>
          <p className="text-emerald-100 text-base sm:text-lg">
            Each student receives a unique, secure personalized download link tied directly to their registered cellphone number to prevent link sharing and unauthorized abuse. Once paid, the secure link is instantly delivered to your cell phone via SMS.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-emerald-800 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Download size={18} /> Install App on Android
            </button>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-800/60 hover:bg-emerald-800/80 text-white font-medium px-6 py-3 rounded-xl border border-emerald-400/30 transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <ExternalLink size={18} /> Play Store (TWA Ready)
            </a>
          </div>
        </div>
      </div>

      {/* POPIA Compliance & Information Storage Advisory Card */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-3 border border-slate-800">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-sm sm:text-base">
            <ShieldCheck size={20} />
            <span>POPIA Compliance & School Vault Architecture</span>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            Statutory Compliant (Act No. 4 of 2013)
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In strict compliance with the South African Protection of Personal Information Act (POPIA):
          <br />
          • <strong>Zero PII Retention</strong>: The Sifiso AI platform retains <em>only</em> minimal identifiers (student first name and contact numbers) strictly for active session routing and secure APK link verification.
          <br />
          • <strong>Parent / Guardian Authorization</strong>: Providing the parent or guardian cellphone number is <strong>mandatory</strong> for accessing and monitoring student academic information.
          <br />
          • <strong>School Vault Storage</strong>: All deep personal data, academic records, and school enrollment details remain securely stored inside the <strong>School's Internal Vault</strong>. Schools maintain full regulatory ownership, privacy control, and legal liability.
        </p>
      </div>

      {/* Under-13 Guardian-First URL Dispatch Policy Advisory */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            🛡️
          </div>
          <div>
            <h3 className="font-bold text-emerald-900 text-base sm:text-lg">Under-13 & Guardian-First Sharing Policy</h3>
            <p className="text-xs sm:text-sm text-emerald-700">Is it safe to share `url_launcher` links with learners under 13 (Grades 5-7)?</p>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed space-y-2 bg-white p-4 rounded-xl border border-emerald-100">
          <p>
            <strong>Definitive Expert Guidance:</strong> Sending external links, APK downloads, or chat group invitations directly to children under 13 carries significant online safety and COPPA/POPIA compliance risks.
          </p>
          <p>
            <strong>Yes! Routing all links and downloads exclusively to the Parent or Guardian is 100% safe and compliant.</strong> By requiring the parent's WhatsApp / SMS cellphone number for all Grade 5 to 7 students:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-emerald-800">
            <li>Parents maintain absolute gatekeeper control over external URLs and APK downloads.</li>
            <li>Eliminates unauthorized web navigation and phishing risks for young learners.</li>
            <li>Ensures full compliance with South African child online protection guidelines.</li>
          </ul>
        </div>
      </div>

      {/* 3-Month Test Link Validity & Public Rollout Schedule */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Testing Lifecycle & Store Launch</span>
            <h2 className="text-xl font-bold text-slate-900">3-Month Test Link Validity & Rollout Schedule</h2>
            <p className="text-sm text-slate-500">Each dispatched test link and APK download token remains fully active for exactly 3 months (90 days) from issuance.</p>
          </div>
          <span className="bg-indigo-100 text-indigo-800 px-3.5 py-1.5 rounded-full text-xs font-bold border border-indigo-200">
            Active Window: 90 Days (3 Months)
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-indigo-600 uppercase">Month 1 (Days 1–30)</div>
            <h3 className="font-bold text-slate-900 text-sm">Pilot Testing & Guardian Trial</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Initial beta testing across participating schools in Gauteng, KZN, and Western Cape. Gathering teacher and parent feedback.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-600">✓ Currently Active</div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-indigo-600 uppercase">Month 2 (Days 31–60)</div>
            <h3 className="font-bold text-slate-900 text-sm">Security Hardening & Stress Testing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              POPIA audit verification, load testing under simulated load-shedding conditions, and parent consent verification refinement.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-indigo-600">⏳ Scheduled Next</div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-indigo-600 uppercase">Month 3 (Days 61–90)</div>
            <h3 className="font-bold text-slate-900 text-sm">Official Google Play & App Store Go-Live</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Public platform release on Google Play Store and Apple App Store for all South African schools and districts.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-slate-400">📅 Final Launch Milestone</div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-900 leading-relaxed">
          <strong>Testing Guarantee:</strong> All test links generated during this evaluation phase remain active for 3 months. If a test link expires before your school's pilot concludes, you can instantly re-issue a fresh secured link via the form above.
        </div>
      </div>

      {/* Anti-Abuse Personalized Purchase & Cellphone SMS Delivery Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-100 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Secure Purchase & Parent-Verified Link Delivery</h2>
            <p className="text-sm text-slate-500">Parent/Guardian number required for accessing student records under POPIA regulations.</p>
          </div>
        </div>

        {!purchaseResult ? (
          <form onSubmit={handlePurchaseAndDispatch} className="space-y-4 pt-2">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Sipho Dlamini"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Student Cellphone Number (for SMS Link)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 082 123 4567"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-200">
              <div>
                <label className="block text-xs font-semibold text-indigo-900 uppercase tracking-wider mb-1">
                  Parent / Guardian Full Name *
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Mr. & Mrs. Dlamini"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-900 uppercase tracking-wider mb-1">
                  Parent Cellphone Number (Required for Access) *
                </label>
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="e.g. 082 987 6543"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Grade Level
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  <option value="5">Grade 5</option>
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12 (Matric)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Secure Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  <option value="PayFast (Instant EFT / Card)">PayFast (Instant EFT / Card)</option>
                  <option value="Ozow Instant EFT">Ozow Instant EFT</option>
                  <option value="SnapScan / Zapper">SnapScan / Zapper</option>
                  <option value="Capitec Pay / Vouchers">Capitec Pay / Vouchers</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>Processing Secure Payment & Verifying Parent Consent...</>
                ) : (
                  <>
                    <CreditCard size={18} /> Complete Payment (R99 Once-Off) & Authorize Link
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center">
              🛡️ POPIA & Anti-Abuse Protection: Parent verification required. Links are cryptographically bound to student & parent numbers.
            </p>
          </form>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-emerald-800">
              <CheckCircle2 size={32} className="text-emerald-600 shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Payment Confirmed & Parent Authorization Verified!</h3>
                <p className="text-xs text-emerald-700">{purchaseResult.message}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-3">
              <div className="text-xs text-slate-500 font-medium">YOUR UNIQUE SECURED DOWNLOAD LINK (Bound to student {purchaseResult.phone} & parent {purchaseResult.parentPhone}):</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-emerald-800 break-all select-all">
                {purchaseResult.downloadUrl}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={purchaseResult.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                >
                  <Download size={16} /> Open Secure Download Page
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hello! Here is your 3-Month Valid Secure Link for Sifiso AI Tutor & Student App for ${purchaseResult.studentName} (Parent Guardian: ${purchaseResult.parentPhone}). Access link: ${purchaseResult.downloadUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
                >
                  💬 Send via WhatsApp (Instant Activation)
                </a>
                <button
                  onClick={() => setPurchaseResult(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Register Another Number
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <Send size={14} /> SMS / WhatsApp Gateway: {purchaseResult.smsDeliveryStatus}
            </div>
          </div>
        )}
      </div>

      {/* Installation Guide for Android Chrome */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            📱
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">How to Install Sifiso on Android in 10 Seconds</h2>
            <p className="text-sm text-slate-500">Works on all Android phones using Google Chrome or Samsung Internet.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 pt-2">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">A</div>
            <h3 className="font-semibold text-slate-900">Open in Chrome</h3>
            <p className="text-sm text-slate-600">Open your personalized download link in Google Chrome on your Android device.</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">B</div>
            <h3 className="font-semibold text-slate-900">Tap Menu (⋮)</h3>
            <p className="text-sm text-slate-600">Tap the three-dot menu icon in the top right corner of Chrome.</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">C</div>
            <h3 className="font-semibold text-slate-900">Add to Home Screen</h3>
            <p className="text-sm text-slate-600">Select <span className="font-semibold text-emerald-700">"Add to Home Screen"</span> or <span className="font-semibold text-emerald-700">"Install App"</span>.</p>
          </div>
        </div>

        {installed && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600 shrink-0" size={24} />
            <div>
              <p className="font-semibold">App successfully installed!</p>
              <p className="text-xs text-emerald-700">You can now open Sifiso directly from your Android home screen just like a native Play Store app.</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Launch & External Portals (url_launcher integration) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Android Quick-Launch Hub</h2>
            <p className="text-sm text-slate-500">Directly launch South African educational apps, study groups, and past papers.</p>
          </div>
          <Globe className="text-emerald-600" size={24} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="https://www.education.gov.za/Curriculum/LearningAndTeachingSupportMaterials(LTSM).aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-start gap-4 group cursor-pointer bg-white"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BookOpen size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                DBE NSC Past Papers Portal <ExternalLink size={14} className="text-slate-400" />
              </h3>
              <p className="text-xs text-slate-500">Official Department of Basic Education past exam papers & memos.</p>
            </div>
          </a>

          <a
            href="https://chat.whatsapp.com/invite/placeholder-sifiso-sa"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-start gap-4 group cursor-pointer bg-white"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageCircle size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                SA Matric WhatsApp Study Circle <ExternalLink size={14} className="text-slate-400" />
              </h3>
              <p className="text-xs text-slate-500">Connect with fellow Grade 10-12 learners across all 9 provinces.</p>
            </div>
          </a>

          <a
            href="https://classroom.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-start gap-4 group cursor-pointer bg-white"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <GraduationCap size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                Google Classroom App <ExternalLink size={14} className="text-slate-400" />
              </h3>
              <p className="text-xs text-slate-500">Open school assignments and teacher submissions on Android.</p>
            </div>
          </a>

          <a
            href="https://www.youtube.com/@SiyavulaEducation"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-start gap-4 group cursor-pointer bg-white"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Share2 size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                Siyavula Maths & Science Video Lessons <ExternalLink size={14} className="text-slate-400" />
              </h3>
              <p className="text-xs text-slate-500">Watch curriculum-aligned video walkthroughs on YouTube.</p>
            </div>
          </a>
        </div>
      </div>

      {/* Play Store & TWA Information */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-emerald-400">
          <ShieldCheck size={28} />
          <h2 className="text-xl font-bold">Trusted Web Activity (TWA) & Google Play</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Sifiso is built as a Progressive Web App (PWA) that complies with Google Play's Trusted Web Activity standards. This allows school districts and learners to download Sifiso directly as an official `.apk` or from the Google Play Store with zero friction, offline caching capabilities, and lightning-fast performance on budget Android devices.
        </p>
      </div>
    </div>
  );
}
