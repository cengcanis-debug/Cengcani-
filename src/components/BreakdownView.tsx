import React, { useState } from 'react';
import { Sparkles, Upload, Loader2, CheckCircle2, ArrowRight, HelpCircle, RefreshCw } from 'lucide-react';
import { BreakdownResult } from '../types';

interface BreakdownViewProps {
  grade: string;
  subject: string;
  language: string;
  onAskTutor?: (prompt: string) => void;
}

export function BreakdownView({ grade, subject, language, onAskTutor }: BreakdownViewProps) {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BreakdownResult | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBreakdown = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() && !image) return;

    setLoading(true);
    setResult(null);
    setActiveStep(0);

    try {
      const res = await fetch('/api/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, grade, subject, image, language })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      alert(err.message || 'Failed to breakdown problem. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            🧩
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Homework Problem Dissector</h2>
            <p className="text-xs text-slate-500">Paste your tricky question or upload a photo. Sifiso will break it down into bite-sized Socratic steps!</p>
          </div>
        </div>

        <form onSubmit={handleBreakdown} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Homework Question or Topic
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              placeholder={`e.g. Calculate the acceleration of a taxi travelling from Pretoria to Johannesburg if its velocity changes from 20 m/s to 35 m/s in 5 seconds...`}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition border border-slate-300">
                <Upload className="w-4 h-4 text-emerald-700" />
                <span>{image ? 'Change Photo' : 'Upload Homework Photo'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {image && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg text-xs border border-emerald-200">
                  <span>Photo attached</span>
                  <button type="button" onClick={() => setImage(null)} className="text-red-600 font-bold hover:text-red-800">×</button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={(!question.trim() && !image) || loading}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dissecting Problem...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Break It Down With Sifiso</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 space-y-6 animate-fadeIn">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <div className="text-2xl">🇿🇦</div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Topic: {result.topic}</span>
              <p className="text-slate-800 text-sm mt-1 leading-relaxed font-medium">{result.encouragingIntro}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <span>Step-by-Step Socratic Milestones</span>
            </h3>

            <div className="grid gap-4">
              {result.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`border rounded-2xl p-5 transition ${
                    activeStep === idx
                      ? 'border-emerald-500 bg-emerald-50/30 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        activeStep === idx ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {milestone.step}
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{milestone.title}</h4>
                    </div>
                    <button
                      onClick={() => setActiveStep(idx)}
                      className="text-xs text-emerald-700 font-semibold hover:underline"
                    >
                      {activeStep === idx ? 'Active Step' : 'Focus Here'}
                    </button>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed pl-11">
                    {milestone.explanation}
                  </p>

                  <div className="ml-11 bg-amber-50 border border-amber-200/60 rounded-xl p-3.5 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Sifiso's Guiding Question:</span>
                      <p className="text-amber-900 text-sm font-medium mt-0.5">{milestone.guidingQuestion}</p>
                    </div>
                  </div>

                  {onAskTutor && (
                    <div className="ml-11 mt-3">
                      <button
                        onClick={() => onAskTutor(`I am stuck on Step ${milestone.step}: "${milestone.title}". Can you explain this part to me more simply with a fun South African analogy and break it down even further?`)}
                        className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>I don't understand this step - Ask Sifiso to explain simply</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
