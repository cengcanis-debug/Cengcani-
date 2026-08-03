import React, { useState } from 'react';
import { BookOpen, Search, Volume2, Sparkles, Filter } from 'lucide-react';

interface FormulaItem {
  id: string;
  subject: string;
  grade: string;
  title: string;
  formulaOrRule: string;
  explanation: string;
  southAfricanContext: string;
}

const FORMULAS_DATA: FormulaItem[] = [
  {
    id: 'm1',
    subject: 'Mathematics',
    grade: '10-12',
    title: 'Quadratic Formula',
    formulaOrRule: 'x = (-b ± √(b² - 4ac)) / (2a)',
    explanation: 'Used to find the x-intercepts (roots) of any quadratic equation in the form ax² + bx + c = 0.',
    southAfricanContext: 'The discriminant (Δ = b² - 4ac) tells you if the roots are real or non-real. Think of it like checking if a taxi is coming before crossing Jan Smuts Avenue!'
  },
  {
    id: 'm2',
    subject: 'Mathematics',
    grade: '10-12',
    title: 'Gradient of a Line',
    formulaOrRule: 'm = (y₂ - y₁) / (x₂ - x₁)',
    explanation: 'Measures the steepness of a straight line connecting two coordinates (x₁, y₁) and (x₂, y₂).',
    southAfricanContext: 'Imagine walking up Table Mountain or hiking up the Drakensberg — rise over run!'
  },
  {
    id: 'm3',
    subject: 'Mathematical Literacy',
    grade: '10-12',
    title: 'Simple & Compound Interest',
    formulaOrRule: 'Simple: A = P(1 + ni) | Compound: A = P(1 + i)ⁿ',
    explanation: 'Simple interest grows by a fixed amount every year. Compound interest earns "interest on interest", growing exponentially.',
    southAfricanContext: 'Crucial for managing Capitec or FNB savings accounts, store cards, and home loans in South Africa.'
  },
  {
    id: 'p1',
    subject: 'Physical Sciences',
    grade: '10-12',
    title: "Newton's Second Law of Motion",
    formulaOrRule: 'F_net = m · a',
    explanation: 'The net force acting on an object is equal to the mass of the object multiplied by its acceleration.',
    southAfricanContext: 'Pushing a stalled Toyota Tazz or a full shopping trolley at Checkers — heavier trolley needs more force!'
  },
  {
    id: 'p2',
    subject: 'Physical Sciences',
    grade: '10-12',
    title: "Ohm's Law",
    formulaOrRule: 'V = I · R',
    explanation: 'Voltage (V) equals Current (I) multiplied by Resistance (R) in an electrical circuit.',
    southAfricanContext: 'Eskom power grid surges and household plug wiring in your living room.'
  },
  {
    id: 'l1',
    subject: 'Life Sciences',
    grade: '10-12',
    title: 'Photosynthesis Equation',
    formulaOrRule: '6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂',
    explanation: 'Plants use carbon dioxide, water, and sunlight to produce glucose (food) and oxygen.',
    southAfricanContext: 'The green maize fields in the Free State feeding the nation and producing oxygen!'
  },
  {
    id: 'a1',
    subject: 'Accounting',
    grade: '10-12',
    title: 'Accounting Equation',
    formulaOrRule: 'Assets = Owner\'s Equity + Liabilities',
    explanation: 'The fundamental golden rule of double-entry bookkeeping.',
    southAfricanContext: 'Balancing the books for a local spaza shop or taxi business.'
  },
  {
    id: 'ns1',
    subject: 'Natural Sciences',
    grade: '7-9',
    title: 'Photosynthesis Word & Chemical Equation',
    formulaOrRule: 'Carbon Dioxide + Water → Glucose + Oxygen (in presence of sunlight & chlorophyll)',
    explanation: 'Green plants manufacture their own food using radiant energy from the sun.',
    southAfricanContext: 'Fynbos floral kingdom in the Western Cape converting sunlight and Cape winter rains into energy.'
  },
  {
    id: 'tech1',
    subject: 'Technology',
    grade: '7-9',
    title: 'Mechanical Advantage (MA)',
    formulaOrRule: 'MA = Load Force (L) / Effort Force (E)',
    explanation: 'Measures how much a machine multiplies the force applied by a human or motor.',
    southAfricanContext: 'Using a crowbar or jack to lift a vehicle tire during a flat tire change.'
  },
  {
    id: 'econ1',
    subject: 'Economics',
    grade: '10-12',
    title: 'Gross Domestic Product (GDP) Expenditure Method',
    formulaOrRule: 'GDP = C + I + G + (X - M)',
    explanation: 'Total economic output measured by Consumption + Investment + Government Spending + Net Exports.',
    southAfricanContext: 'Tracking South Africa\'s national economic performance reported by Stats SA.'
  }
];

export function FormulaView() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const filtered = FORMULAS_DATA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.formulaOrRule.toLowerCase().includes(search.toLowerCase()) ||
                          item.explanation.toLowerCase().includes(search.toLowerCase());
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
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            📐
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Sifiso's CAPS & IEB Formula & Concept Hub</h2>
            <p className="text-xs text-slate-500">Quick-reference formulas, equations, and South African analogies for exam success.</p>
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
              placeholder="Search formulas, rules, or keywords..."
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

      {/* Grid of Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  {item.subject} • Grade {item.grade}
                </span>
                <button
                  onClick={() => speakText(`${item.title}. Formula: ${item.formulaOrRule}. Explanation: ${item.explanation}`)}
                  className="text-slate-400 hover:text-emerald-700 p-1.5 rounded-lg hover:bg-emerald-50 transition"
                  title="Read aloud"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>

              <div className="bg-slate-900 text-emerald-300 font-mono text-sm p-3.5 rounded-xl mb-3 shadow-inner overflow-x-auto">
                {item.formulaOrRule}
              </div>

              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {item.explanation}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3 mt-2 bg-emerald-50/40 -mx-6 -mb-6 p-4 rounded-b-2xl">
              <p className="text-xs text-emerald-900 font-medium flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold shrink-0">🇿🇦 Mzansi Analogy:</span>
                <span>{item.southAfricanContext}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          No formulas found matching "{search}". Try another keyword!
        </div>
      )}
    </div>
  );
}
