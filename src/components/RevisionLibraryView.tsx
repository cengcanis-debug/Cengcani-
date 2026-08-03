import React, { useState, useEffect } from 'react';
import { BookMarked, Search, Filter, Bookmark, Trash2, CheckCircle2, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface SavedProblemItem {
  id: string;
  title: string;
  subject: string;
  grade: string;
  problemType: 'breakdown' | 'quiz_summary' | 'formula_note';
  content: string;
  steps?: { step: number; title: string; explanation: string; guidingQuestion: string }[];
  date: string;
}

export function RevisionLibraryView() {
  const [items, setItems] = useState<SavedProblemItem[]>(() => {
    const saved = localStorage.getItem('sifiso_revision_library');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'rev-1',
        title: 'Solving Quadratic Equations via Factorisation & Formula',
        subject: 'Mathematics',
        grade: '11',
        problemType: 'breakdown',
        content: 'Step-by-step Sifiso breakdown for solving 2x² - 8x + 6 = 0 with South African real-world taxi distance analogy.',
        steps: [
          { step: 1, title: 'Standard Form Check', explanation: 'Ensure equation is in ax² + bx + c = 0 form.', guidingQuestion: 'What are a, b, and c?' },
          { step: 2, title: 'Simplify Common Factors', explanation: 'Divide through by 2 to get x² - 4x + 3 = 0.', guidingQuestion: 'Can we make the coefficients smaller?' },
          { step: 3, title: 'Factorise or Quadratic Formula', explanation: '(x - 3)(x - 1) = 0 so x = 3 or x = 1.', guidingQuestion: 'What two numbers multiply to 3 and add to -4?' }
        ],
        date: '2026-07-28'
      },
      {
        id: 'rev-2',
        title: 'Newton\'s Second Law: Pushing Trolleys on an Incline',
        subject: 'Physical Sciences',
        grade: '11',
        problemType: 'breakdown',
        content: 'Methodology for calculating acceleration when friction and applied force act on an object.',
        steps: [
          { step: 1, title: 'Draw Free Body Diagram (FBD)', explanation: 'Identify all forces: Gravity (F_g), Normal force (F_n), Applied force (F_app), and Friction (f).', guidingQuestion: 'Are all forces pointing in correct directions?' },
          { step: 2, title: 'Apply Newton\'s Second Law', explanation: 'F_net = m·a => F_app - f = m·a.', guidingQuestion: 'Which force is winning the direction of motion?' }
        ],
        date: '2026-07-27'
      },
      {
        id: 'rev-3',
        title: 'Cash Flow Statements & Operating Activities',
        subject: 'Accounting',
        grade: '12',
        problemType: 'formula_note',
        content: 'How to calculate cash generated from operations by adjusting net profit before tax for non-cash items (depreciation, interest) and working capital changes.',
        date: '2026-07-25'
      },
      {
        id: 'rev-4',
        title: 'Ecosystems & Energy Flow in South African Biomes',
        subject: 'Natural Sciences',
        grade: '8',
        problemType: 'formula_note',
        content: 'Understanding food webs, trophic levels, and energy pyramids in the Fynbos and Savanna biomes.',
        date: '2026-07-26'
      },
      {
        id: 'rev-5',
        title: 'The Industrial Revolution & Impact on South African Society',
        subject: 'Social Sciences',
        grade: '9',
        problemType: 'formula_note',
        content: 'Examining mechanization, mining development in Witwatersrand, and socio-economic shifts.',
        date: '2026-07-24'
      },
      {
        id: 'rev-6',
        title: 'Mechanical Advantage & Lever Systems in Structures',
        subject: 'Technology',
        grade: '8',
        problemType: 'formula_note',
        content: 'Calculating mechanical advantage (MA = Load / Effort) for first, second, and third-class levers.',
        date: '2026-07-23'
      },
      {
        id: 'rev-7',
        title: 'The Circular Flow Model in a Mixed Economy',
        subject: 'Economics',
        grade: '10',
        problemType: 'formula_note',
        content: 'Analyzing interactions between households, firms, the state, and the foreign sector in South Africa.',
        date: '2026-07-22'
      }
    ];
  });

  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sifiso_revision_library', JSON.stringify(items));
  }, [items]);

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const filtered = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.content.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || item.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const subjects = ['All', 'Mathematics', 'Mathematical Literacy', 'Physical Sciences', 'Life Sciences', 'Natural Sciences', 'Social Sciences', 'Technology', 'Economics', 'Accounting'];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold shadow-xs">
            📚
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Sifiso's Problem-Solving & Revision Library</h2>
            <p className="text-xs text-slate-500">Your permanent archive of worked examples, step-by-step methodologies, and exam reminders.</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved problems, notes, or methods..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            {subjects.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Library Items List */}
      <div className="space-y-4">
        {filtered.map(item => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm hover:border-emerald-300 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-0.5 rounded-full">
                      {item.subject} • Grade {item.grade}
                    </span>
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full capitalize">
                      {item.problemType.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => speakText(`${item.title}. ${item.content}`)}
                    className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                    title="Read aloud summary"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {item.steps && item.steps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Step-by-Step Breakdown' : `View ${item.steps.length} Step Breakdown Methodology`}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-3 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100">
                      {item.steps.map(s => (
                        <div key={s.step} className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                              {s.step}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800">{s.title}</h4>
                          </div>
                          <p className="text-xs text-slate-600 pl-8">{s.explanation}</p>
                          <p className="text-xs font-medium text-emerald-900 pl-8 pt-1 italic">
                            💡 Sifiso's Guiding Question: "{s.guidingQuestion}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
            No saved revision items found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
