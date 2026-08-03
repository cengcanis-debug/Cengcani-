import React, { useState } from 'react';
import { Shield, Scale, FileText, Lock, Award, CheckCircle2, X, Building2, Globe } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function LegalIpModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'copyright' | 'popia' | 'terms' | 'patents'>('copyright');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Legal & Intellectual Property Protection</h2>
              <p className="text-xs text-slate-300">Sifiso Educational Technologies (Pty) Ltd • South African & International IP Registry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('copyright')}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'copyright' ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Copyright & CIPC Notice</span>
          </button>
          <button
            onClick={() => setActiveTab('popia')}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'popia' ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>POPIA & Privacy Compliance</span>
          </button>
          <button
            onClick={() => setActiveTab('patents')}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'patents' ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Patents & Trade Secrets</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'terms' ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Terms of Service (EULA)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 text-sm leading-relaxed">
          {activeTab === 'copyright' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
                <Building2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-900">Official Copyright Notice & Registration Status</h3>
                  <p className="text-xs text-emerald-700 mt-0.5">Protected under the South African Copyright Act (No. 98 of 1978) and international Berne Convention treaties.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">1. Ownership of Intellectual Property</h4>
                <p>
                  All source code, user interfaces, pedagogical algorithms, CAPS-aligned syllabus mappings, interactive simulations, and AI prompt engineering architectures embodied within <strong>Sifiso AI Tutor™</strong> are the exclusive intellectual property of <strong>Sifiso Educational Technologies (Pty) Ltd</strong> (Registration Pending with CIPC, South Africa).
                </p>

                <h4 className="font-bold text-slate-900 pt-2">2. Scope of Protection</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li><strong>Literary & Software Works:</strong> Protected under Section 2(1)(h) of the South African Copyright Act as computer programs and literary compilations.</li>
                  <li><strong>Artistic & UI Design:</strong> All custom layouts, vector icons, visual motifs, and colour styling systems are fully protected under copyright law.</li>
                  <li><strong>International Protection:</strong> Automatic reciprocal copyright protection applies across all 180+ member states signatory to the Berne Convention for the Protection of Literary and Artistic Works and the TRIPS Agreement.</li>
                </ul>

                <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600">
                  <p className="font-bold text-slate-800 mb-1">© 2026 Sifiso Educational Technologies (Pty) Ltd. All Rights Reserved.</p>
                  <p>Unauthorized reproduction, reverse engineering, decompilation, scraping, or commercial redistribution of this software or its underlying prompt structures is strictly prohibited and subject to civil and criminal prosecution under South African law.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'popia' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-3">
                <Lock className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-900">POPIA Compliance (Act No. 4 of 2013)</h3>
                  <p className="text-xs text-blue-700 mt-0.5">Protection of Personal Information Act compliance statement for South African students and educators.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">1. Lawful Processing of Personal Information</h4>
                <p>
                  Sifiso AI Tutor is committed to safeguarding the privacy and data of all learners, teachers, and guardians in strict adherence to the Protection of Personal Information Act (POPIA).
                </p>

                <h4 className="font-bold text-slate-900 pt-2">2. Data Minimization & Security Principles</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li><strong>Local Storage Priority:</strong> Study plans, chat logs, and progress metrics are stored primarily in client-side secure storage to guarantee student data sovereignty.</li>
                  <li><strong>No Commercial Data Harvesting:</strong> Student chat transcripts and academic queries are never sold, rented, or utilized for commercial third-party advertising profiles.</li>
                  <li><strong>Information Officer:</strong> Sifiso Educational Technologies maintains a designated Information Officer responsible for compliance oversight and data subject access requests.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'patents' && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl flex items-start gap-3">
                <Award className="w-6 h-6 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-purple-900">Proprietary Algorithms & Trade Secrets</h3>
                  <p className="text-xs text-purple-700 mt-0.5">Patent Pending technologies governing adaptive CAPS curriculum delivery and multilingual scaffolding.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">1. Proprietary Systems</h4>
                <p>
                  The following technology suites developed for Sifiso AI Tutor constitute confidential trade secrets and proprietary intellectual property:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li><strong>Sifiso Code-Switching Engine™:</strong> Dynamic real-time bilingual pedagogical scaffolding across official South African languages.</li>
                  <li><strong>CAPS Mastery Matrix™:</strong> Automated grade-specific curriculum competency mapping and cognitive load balancing algorithms.</li>
                  <li><strong>Autonomous Guardian Sentinel™:</strong> Real-time runtime self-healing error detection and automated state recovery protocol.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl flex items-start gap-3">
                <Globe className="w-6 h-6 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900">End User License Agreement (EULA)</h3>
                  <p className="text-xs text-slate-600 mt-0.5">By accessing Sifiso AI Tutor, you agree to these binding terms.</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p><strong>1. Educational Purpose:</strong> Sifiso AI Tutor is provided as an interactive AI-powered educational supplement designed in alignment with the South African CAPS curriculum.</p>
                <p><strong>2. Limitation of Liability:</strong> While rigorous pedagogical validation is maintained, AI-generated explanations should be used in conjunction with official Department of Basic Education textbooks and educator guidance.</p>
                <p><strong>3. Acceptable Use:</strong> Users agree not to misuse the platform, attempt unauthorized access, or bypass system safeguards.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Registered IP Safeguards Active</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
