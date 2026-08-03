import React, { useState, useEffect } from 'react';
import { Award, Clock, FileText, CheckCircle2, AlertCircle, RotateCcw, Sparkles } from 'lucide-react';

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  marks: number;
}

interface ExamPaper {
  id: string;
  title: string;
  subject: string;
  grade: string;
  durationMinutes: number;
  questions: ExamQuestion[];
}

export function ExamSimulatorView() {
  const papers: ExamPaper[] = [
    {
      id: 'math-p1-2025',
      title: 'NSC Grade 11/12 Mathematics Paper 1 Mock Exam',
      subject: 'Mathematics',
      grade: '12',
      durationMinutes: 30,
      questions: [
        {
          id: 1,
          question: 'Solve for x: 3x² - 5x - 2 = 0 (correct to two decimal places if necessary).',
          options: ['x = 2 or x = -1/3', 'x = -2 or x = 1/3', 'x = 1 or x = -2', 'x = 3 or x = -2'],
          correctAnswer: 0,
          explanation: 'Using factorisation: (3x + 1)(x - 2) = 0, therefore x = 2 or x = -1/3.',
          marks: 3
        },
        {
          id: 2,
          question: 'Given the arithmetic sequence: 5, 8, 11, 14, ... Determine the 50th term (T₅₀).',
          options: ['T₅₀ = 152', 'T₅₀ = 148', 'T₅₀ = 150', 'T₅₀ = 155'],
          correctAnswer: 0,
          explanation: 'Using T_n = a + (n-1)d where a = 5 and d = 3. T₅₀ = 5 + (49)(3) = 5 + 147 = 152.',
          marks: 4
        },
        {
          id: 3,
          question: 'Calculate the discriminant (Δ) of 2x² - 4x + 5 = 0 and state the nature of roots.',
          options: ['Δ = -24, Non-real / imaginary roots', 'Δ = 24, Real unequal roots', 'Δ = 0, Real equal roots', 'Δ = 56, Real roots'],
          correctAnswer: 0,
          explanation: 'Δ = b² - 4ac = (-4)² - 4(2)(5) = 16 - 40 = -24. Since Δ < 0, roots are non-real.',
          marks: 3
        }
      ]
    },
    {
      id: 'phys-p1-2025',
      title: 'NSC Grade 11 Physical Sciences Physics Mock Exam',
      subject: 'Physical Sciences',
      grade: '11',
      durationMinutes: 25,
      questions: [
        {
          id: 1,
          question: 'A 5 kg block is pulled across a rough horizontal table with a constant force of 20 N. If kinetic friction is 5 N, what is the acceleration of the block?',
          options: ['3.0 m·s⁻²', '4.0 m·s⁻²', '2.5 m·s⁻²', '5.0 m·s⁻²'],
          correctAnswer: 0,
          explanation: 'F_net = F_app - f = 20 - 5 = 15 N. By Newton\'s 2nd Law: a = F_net / m = 15 / 5 = 3.0 m·s⁻².',
          marks: 4
        },
        {
          id: 2,
          question: 'According to Newton\'s Law of Universal Gravitation, if the distance between two masses is doubled, the gravitational force between them becomes:',
          options: ['One quarter (1/4)', 'Half (1/2)', 'Double (2x)', 'Quadrupled (4x)'],
          correctAnswer: 0,
          explanation: 'F is inversely proportional to r². If r increases by a factor of 2, F changes by (1/2)² = 1/4.',
          marks: 3
        }
      ]
    }
  ];

  const [selectedPaper, setSelectedPaper] = useState<ExamPaper>(papers[0]);
  const [activeSession, setActiveSession] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedPaper.durationMinutes * 60);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let timer: any;
    if (activeSession && !submitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeSession, submitted, timeLeft]);

  const startExam = (paper: ExamPaper) => {
    setSelectedPaper(paper);
    setTimeLeft(paper.durationMinutes * 60);
    setAnswers({});
    setSubmitted(false);
    setActiveSession(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalMarks = selectedPaper.questions.reduce((acc, q) => acc + q.marks, 0);
  const earnedMarks = selectedPaper.questions.reduce((acc, q) => {
    return answers[q.id] === q.correctAnswer ? acc + q.marks : acc;
  }, 0);
  const percentage = Math.round((earnedMarks / totalMarks) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-700/85 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> NSC Past Papers & Mock Exam Simulator
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Simulate Real Exam Conditions
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
            Test your readiness under timed exam conditions with Sifiso's curated South African NSC/IEB mock question papers and instant marking memo breakdowns.
          </p>
        </div>

        {activeSession && !submitted && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center min-w-[140px] z-10">
            <div className="text-2xl sm:text-3xl font-black text-yellow-300 font-mono">{formatTime(timeLeft)}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-200 mt-1 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Time Remaining
            </div>
          </div>
        )}
      </div>

      {!activeSession && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" /> Select Mock Exam Paper
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {papers.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm hover:border-emerald-300 transition flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-0.5 rounded-full">
                      {p.subject} • Grade {p.grade}
                    </span>
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {p.durationMinutes} mins
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-500">
                    {p.questions.length} questions • Total {p.questions.reduce((a,b)=>a+b.marks,0)} marks. Strictly aligned with CAPS examination guidelines.
                  </p>
                </div>

                <button
                  onClick={() => startExam(p)}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Start Exam Simulator
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSession && (
        <div className="space-y-6">
          {/* Exam Header Bar */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{selectedPaper.title}</h3>
              <p className="text-xs text-slate-500">Answer all questions before submitting.</p>
            </div>
            <button
              onClick={() => setActiveSession(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              Exit Simulator
            </button>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {selectedPaper.questions.map((q, idx) => (
              <div key={q.id} className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    Question {idx + 1} ({q.marks} Marks)
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{q.question}</p>

                <div className="space-y-2 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    const isCorrect = submitted && q.correctAnswer === optIdx;
                    const isWrongSelected = submitted && isSelected && !isCorrect;

                    let btnStyle = 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100';
                    if (isSelected && !submitted) {
                      btnStyle = 'bg-emerald-700 border-emerald-700 text-white shadow-xs';
                    }
                    if (submitted) {
                      if (isCorrect) btnStyle = 'bg-emerald-600 border-emerald-600 text-white font-bold';
                      else if (isWrongSelected) btnStyle = 'bg-red-500 border-red-500 text-white font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => setAnswers({ ...answers, [q.id]: optIdx })}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <span className="font-bold">📝 Sifiso's Memo Explanation:</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submitted ? (
            <div className="text-center pb-8">
              <button
                onClick={() => setSubmitted(true)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-xl text-sm font-extrabold shadow-md transition cursor-pointer"
              >
                Submit Exam & View Memo
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
              <h3 className="text-xl font-extrabold text-emerald-900">Exam Results & Feedback</h3>
              <div className="text-4xl font-black text-emerald-700">{percentage}% ({earnedMarks} / {totalMarks} Marks)</div>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                {percentage >= 80 ? "🏆 Excellent performance! You are fully on track for a Distinction (Level 7) in NSC Finals." :
                 percentage >= 50 ? "👍 Good effort! Review the memo explanations above for questions you missed to lock in your distinction." :
                 "💡 Keep practicing! Use Sifiso's step-by-step breakdown tool to strengthen these core concepts."}
              </p>
              <button
                onClick={() => { setSubmitted(false); setAnswers({}); setTimeLeft(selectedPaper.durationMinutes * 60); }}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Retake Exam Simulator
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
