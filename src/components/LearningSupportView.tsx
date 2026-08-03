import React, { useState } from 'react';
import { HeartPulse, CheckCircle2, Volume2, ShieldAlert, Sparkles, WifiOff, BookOpen, Layers, Award, Smile } from 'lucide-react';

interface LearningSupportViewProps {
  onSelectTab: (tab: any) => void;
  language: string;
}

export function LearningSupportView({ onSelectTab, language }: LearningSupportViewProps) {
  const [learningProfile, setLearningProfile] = useState<{
    pace: 'gentle' | 'standard' | 'accelerated';
    challenge: string;
    offlineMode: boolean;
    audioAssistance: boolean;
  }>({
    pace: 'gentle',
    challenge: 'math-anxiety',
    offlineMode: true,
    audioAssistance: true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for struggling readers
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-teal-700/85 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5" /> Inclusive Learning & Pacing Support
            </span>
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <WifiOff className="w-3 h-3" /> 100% Offline & Low-Data Friendly
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sifiso Care & Adaptive Pacing Hub
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm max-w-lg">
            Designed with empathy for every South African learner. Whether you need extra time, simplified fun analogies, audio read-aloud support, or zero-data offline packs during load shedding, Sifiso is here for you.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Your adaptive learning pace and support settings have been saved successfully! Sifiso has adjusted explanations for you.</span>
        </div>
      )}

      {/* Main Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pacing & Learning Challenge Selector */}
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Smile className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Adaptive Learning Pacing</h3>
              <p className="text-xs text-slate-500">How would you like Sifiso to pace explanations?</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { id: 'gentle', title: 'Gentle & Step-by-Step (Recommended)', desc: 'Extra slow, broken down into tiny bite-sized milestones with zero complex jargon.' },
              { id: 'standard', title: 'Standard CAPS Pacing', desc: 'Balanced regular speed matching standard South African school term progression.' },
              { id: 'accelerated', title: 'Distinction / Advanced Pacing', desc: 'Challenging Olympiad-level extensions and past paper rigorous problem sets.' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setLearningProfile({ ...learningProfile, pace: p.id as any })}
                className={`w-full text-left p-4 rounded-2xl border transition flex items-start gap-3 cursor-pointer ${
                  learningProfile.pace === p.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  checked={learningProfile.pace === p.id}
                  onChange={() => {}}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{p.title}</div>
                  <div className="text-xs text-slate-500">{p.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Specific Support & Accessibility Options */}
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-teal-100 text-teal-800 rounded-xl">
              <Volume2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Accessibility & Support Focus</h3>
              <p className="text-xs text-slate-500">Select challenges or assistive features you need</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { id: 'math-anxiety', title: 'Math Anxiety / Confidence Building', desc: 'Warm encouragement, zero judgment, and confidence-boosting praise.' },
              { id: 'reading-support', title: 'Reading Pacing / Dyslexia Support', desc: 'Clear simplified sentences, high contrast, and instant Text-to-Speech audio.' },
              { id: 'financial-struggle', title: 'Zero-Data / Financial Resource Support', desc: 'Prefers offline cached packs, low-bandwidth mode, and free study tips.' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setLearningProfile({ ...learningProfile, challenge: c.id })}
                className={`w-full text-left p-4 rounded-2xl border transition flex items-start gap-3 cursor-pointer ${
                  learningProfile.challenge === c.id
                    ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  checked={learningProfile.challenge === c.id}
                  onChange={() => {}}
                  className="mt-1 text-teal-600 focus:ring-teal-500"
                />
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{c.title}</div>
                  <div className="text-xs text-slate-500">{c.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={handleSaveProfile}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition shadow-sm cursor-pointer"
            >
              Apply Adaptive Settings to Sifiso Tutor
            </button>
          </div>
        </div>
      </div>

      {/* Offline & Financial Inclusion Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
              🔋 Load Shedding & Zero-Data Mode Active
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold">Never Let No Data Stop Your Education</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Sifiso Tutor automatically caches key formulas, previous breakdowns, and offline revision flashcards in your browser storage so you can study even during power cuts or when mobile data runs out.
            </p>
          </div>
          <button
            onClick={() => speakText("Sifiso is here for every South African learner. You don't need expensive data or constant electricity to succeed. Keep pushing, sharp sharp!")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-sm"
          >
            <Volume2 className="w-4 h-4" /> Listen to Sifiso's Encouragement
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
          <div className="bg-white/5 p-4 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> Offline Revision Packs
            </div>
            <p className="text-xs text-slate-300">All flashcards and past paper mock questions are stored locally in your browser.</p>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-teal-400 flex items-center gap-1">
              <Layers className="w-4 h-4" /> Fun Local Analogies
            </div>
            <p className="text-xs text-slate-300">Explanations use familiar South African contexts (taxi fare math, soccer tactics, spaza store budgets).</p>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-yellow-400 flex items-center gap-1">
              <Award className="w-4 h-4" /> Zero Judgment Pacing
            </div>
            <p className="text-xs text-slate-300">Take as much time as you need on every step. Sifiso will patiently wait and re-explain.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
