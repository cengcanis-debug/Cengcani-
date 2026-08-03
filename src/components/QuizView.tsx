import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, HelpCircle, Loader2, Award, RotateCcw, FileText, Lightbulb } from 'lucide-react';
import { QuizData, QuizQuestion, QuizReport } from '../types';

interface QuizViewProps {
  grade: string;
  subject: string;
  language: string;
}

const COMMON_TOPICS: Record<string, string[]> = {
  Mathematics: ["Quadratic Equations & Inequalities", "Euclidean Geometry", "Trigonometry & Identities", "Financial Mathematics"],
  "Physical Sciences": ["Newton's Laws of Motion", "Chemical Bonding & Molecular Structure", "Momentum & Impulse", "Work, Energy & Power"],
  "Life Sciences": ["Photosynthesis & Cellular Respiration", "DNA Code to Protein Synthesis", "Meiosis & Genetics", "Human Nervous System"],
  "Natural Sciences": ["Photosynthesis & Ecosystems", "Matter & Materials", "Energy & Change", "Planet Earth & Beyond"],
  "Social Sciences": ["The Industrial Revolution", "Mapwork & Contours", "Democracy & Human Rights", "Surface Forces & Earthquakes"],
  Technology: ["Mechanical Systems & Control", "Structures & Load Bearing", "Electrical Systems & Circuits", "Processing & Materials"],
  Economics: ["Circular Flow Model", "Inflation & Economic Growth", "Market Structures & Monopoly", "State Intervention & Taxation"],
  Accounting: ["VAT & Ledger Accounts", "GAAP Principles & Ethics", "Manufacturing & Cost Accounting", "Cash Flow Statements"],
  Geography: ["Plate Tectonics & Earthquakes", "Mid-latitude Cyclones", "Geomorphology: Drainage Basins", "Settlement & Urban Geography"]
};

export function QuizView({ grade, subject, language }: QuizViewProps) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [gradingLoading, setGradingLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [report, setReport] = useState<QuizReport | null>(null);
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});

  const topicsList = COMMON_TOPICS[subject] || ["Core Concepts & Problem Solving", "Exam Preparation Practice", "Foundational Principles"];

  const handleGenerateQuiz = async (topicToUse: string) => {
    if (!topicToUse.trim()) return;
    setLoading(true);
    setQuiz(null);
    setSelectedAnswers({});
    setShowResults(false);
    setReport(null);
    setShowHint({});

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicToUse, grade, subject, language })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setQuiz(data);
    } catch (err: any) {
      alert(err.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    setGradingLoading(true);

    try {
      const res = await fetch('/api/grade-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          grade,
          subject,
          questions: quiz.questions,
          userAnswers: selectedAnswers,
          language
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReport(data);
      setShowResults(true);
    } catch (err: any) {
      alert(err.message || 'Failed to grade quiz');
    } finally {
      setGradingLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Generator Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            🎯
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Sifiso's Lightbulb Test & Marking Suite</h2>
            <p className="text-xs text-slate-500">Test your mastery of Grade {grade} {subject}, get marked instantly, and receive tailored simplification tips!</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Choose or Type a Topic to Test
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {topicsList.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(t);
                    handleGenerateQuiz(t);
                  }}
                  className="text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 px-3 py-1.5 rounded-lg border border-slate-200 transition font-medium cursor-pointer"
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Or type any specific chapter / topic..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <button
                onClick={() => handleGenerateQuiz(topic)}
                disabled={!topic.trim() || loading}
                className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm cursor-pointer flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-300" />}
                <span>Start Test</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Active Area */}
      {quiz && (
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{quiz.quizTitle}</h3>
              <p className="text-xs text-slate-500">Grade {grade} • {subject}</p>
            </div>
            {showResults && report && (
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 border border-emerald-200">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Mark: {report.score} / {report.total} ({report.percentage}%)</span>
              </div>
            )}
          </div>

          {/* AI Marking Report Card & Simplification Tips */}
          {showResults && report && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-6 space-y-6 shadow-sm animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow">
                  🇿🇦
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">Sifiso's Official Marking Report Card</h4>
                  <p className="text-xs text-emerald-800 font-medium">CAPS & IEB Aligned Evaluation</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Mentor's Evaluation:</span>
                <p className="text-slate-800 text-sm leading-relaxed font-medium">{report.sifisoFeedback}</p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Simplification Tips & Memory Hooks for Your Weak Areas</span>
                </h5>
                <div className="grid gap-2.5">
                  {report.simplificationTips.map((tip, idx) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-medium leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 border border-emerald-200 rounded-xl p-4 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-emerald-800 uppercase tracking-wider">Recommended Next Step:</span>
                <p className="font-medium text-slate-900">{report.nextSteps}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {quiz.questions.map((q, qIdx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCorrect = selectedAnswers[q.id] === q.correctIndex;
              const userSelection = selectedAnswers[q.id];

              return (
                <div key={q.id} className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/40">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-bold text-xs bg-emerald-800 text-white px-2.5 py-1 rounded-lg">
                      Question {qIdx + 1}
                    </span>
                    {!showResults && (
                      <button
                        onClick={() => setShowHint(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{showHint[q.id] ? 'Hide Sifiso Hint' : 'Need a Hint?'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-slate-900 font-medium text-base leading-relaxed">
                    {q.question}
                  </p>

                  {showHint[q.id] && !showResults && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-medium flex items-start gap-2">
                      <span className="text-amber-600 font-bold">💡 Sifiso Hint:</span>
                      <span>{q.socraticHint}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      let btnStyle = "bg-white border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-300";

                      if (showResults) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                        } else if (isSelected && optIdx !== q.correctIndex) {
                          btnStyle = "bg-red-50 border-red-300 text-red-900 line-through";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-emerald-700 text-white border-emerald-700 shadow-sm";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={showResults}
                          className={`text-left p-3.5 rounded-xl border text-sm transition font-medium ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2 border ${
                      isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />}
                      <div>
                        <span className="font-bold">{isCorrect ? 'Sharp sharp! Spot on.' : "Concept Review:"}</span>
                        <p className="mt-0.5">{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            {!showResults ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < quiz.questions.length || gradingLoading}
                className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium text-sm transition shadow-sm cursor-pointer flex items-center gap-2"
              >
                {gradingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Marking Test & Generating Tips...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Submit & Get Marked Report</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setShowResults(false);
                  setReport(null);
                  setShowHint({});
                }}
                className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-medium text-sm transition shadow-sm cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Take Another Test</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
