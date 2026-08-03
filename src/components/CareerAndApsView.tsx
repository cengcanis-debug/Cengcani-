import React, { useState } from 'react';
import { GraduationCap, Calculator, Briefcase, Award, CheckCircle2, ChevronRight, BookOpen, Compass } from 'lucide-react';

interface CareerAndApsViewProps {
  language: string;
}

export function CareerAndApsView({ language }: CareerAndApsViewProps) {
  // APS Calculator State (Grades 11/12 marks)
  const [marks, setMarks] = useState<{ [key: string]: number }>({
    subject1: 70, // Home Language
    subject2: 65, // First Additional
    subject3: 60, // Mathematics / Math Lit
    subject4: 65, // Life Orientation
    subject5: 70, // Elective 1
    subject6: 60, // Elective 2
    subject7: 55, // Elective 3
  });

  // Calculate APS according to South African university standards (Level 1-7)
  const getLevel = (mark: number) => {
    if (mark >= 80) return 7;
    if (mark >= 70) return 6;
    if (mark >= 60) return 5;
    if (mark >= 50) return 4;
    if (mark >= 40) return 3;
    if (mark >= 30) return 2;
    return 1;
  };

  // Note: Life Orientation (subject 4) usually counts 1 or is excluded depending on university, but standard calculation sums top 6 subjects excluding LO or includes LO as level. Let's calculate standard total (sum of levels, usually max 42 without LO or 49 with).
  const apsTotal = Object.entries(marks).reduce((acc, [key, val], idx) => {
    // Life Orientation (subject 4) is often evaluated separately or counted as max 2 points in some universities, let's count standard sum
    if (key === 'subject4') {
      return acc + Math.min(getLevel(val), 2); // LO usually counts 1 or 2 in APS
    }
    return acc + getLevel(val);
  }, 0);

  const [careerGoal, setCareerGoal] = useState<string>('engineering');

  const careerDatabase: { [key: string]: { title: string; minAps: number; requiredSubjects: string[]; topUnis: string[]; description: string } } = {
    engineering: {
      title: 'BSc / BEng Engineering (Civil, Mechanical, Electrical)',
      minAps: 35,
      requiredSubjects: ['Mathematics (Level 6/7)', 'Physical Sciences (Level 6)', 'English (Level 5)'],
      topUnis: ['Wits', 'UCT', 'UP (University of Pretoria)', 'UKZN', 'Stellenbosch'],
      description: 'Design bridges, green energy systems, software infrastructure, and high-speed transport networks.'
    },
    medicine: {
      title: 'Bachelor of Medicine & Surgery (MBChB)',
      minAps: 38,
      requiredSubjects: ['Mathematics (Level 6)', 'Physical Sciences (Level 6)', 'Life Sciences (Level 6)', 'English (Level 5)'],
      topUnis: ['UCT', 'Wits', 'UP', 'UKZN', 'SMU'],
      description: 'Diagnose and treat patients, perform surgeries, and advance public health in South Africa.'
    },
    accounting: {
      title: 'Bachelor of Accounting / CA(SA) Track',
      minAps: 32,
      requiredSubjects: ['Mathematics (Level 5 or higher)', 'Accounting (Recommended)', 'English (Level 5)'],
      topUnis: ['UCT', 'Wits', 'Stellenbosch', 'UJ', 'UP'],
      description: 'Lead financial auditing, corporate governance, tax advisory, and national economic growth.'
    },
    it: {
      title: 'BSc Computer Science / Information Technology',
      minAps: 30,
      requiredSubjects: ['Mathematics (Level 5/6)', 'IT or CAT (Recommended)', 'English (Level 4)'],
      topUnis: ['UCT', 'Wits', 'UP', 'Stellenbosch', 'UNISA'],
      description: 'Build cloud apps, artificial intelligence models, cybersecurity systems, and mobile software.'
    },
    law: {
      title: 'Bachelor of Laws (LLB)',
      minAps: 33,
      requiredSubjects: ['English Home Language or First Additional (Level 5/6)', 'Any Mathematics or Mathematical Literacy'],
      topUnis: ['UCT', 'Wits', 'UP', 'Rhodes', 'UKZN'],
      description: 'Defend constitutional rights, corporate law, human rights advocacy, and judicial systems.'
    },
    teaching: {
      title: 'Bachelor of Education (B.Ed - FET & Intermediate Phase)',
      minAps: 26,
      requiredSubjects: ['English (Level 4)', 'Mathematics or Math Literacy (Level 3/4)'],
      topUnis: ['UNISA', 'UP', 'UJ', 'UKZN', 'NWU'],
      description: 'Shape the next generation of South African leaders in STEM, languages, and humanities.'
    }
  };

  const selectedCareer = careerDatabase[careerGoal];
  const isEligible = apsTotal >= selectedCareer.minAps;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-emerald-600/80 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" /> SA University APS & Career Planner
            </span>
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Compass className="w-3 h-3" /> CAPS & NSC Aligned
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Plan Your Future: APS Score & Career Matcher
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Calculate your Admission Point Score (APS) according to South African university guidelines and discover which careers and tertiary institutions match your Grade 11 & 12 marks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: APS Calculator */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl">
                <Calculator className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Your NSC Marks & APS Score</h3>
                <p className="text-xs text-slate-500">Enter your expected or actual percentages (0 - 100%)</p>
              </div>
            </div>
            <div className="bg-emerald-700 text-white px-4 py-2 rounded-2xl text-center shadow-xs">
              <div className="text-[10px] uppercase font-bold text-emerald-200">Total APS</div>
              <div className="text-2xl font-black">{apsTotal}</div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { id: 'subject1', label: '1. Home Language (e.g., isiZulu / English / Afrikaans)' },
              { id: 'subject2', label: '2. First Additional Language (e.g., English / Sesotho)' },
              { id: 'subject3', label: '3. Mathematics or Mathematical Literacy' },
              { id: 'subject4', label: '4. Life Orientation (Counts 1 or 2 in APS)' },
              { id: 'subject5', label: '5. Elective Subject 1 (e.g., Physical Sciences / Accounting)' },
              { id: 'subject6', label: '6. Elective Subject 2 (e.g., Life Sciences / History)' },
              { id: 'subject7', label: '7. Elective Subject 3 (e.g., Geography / IT / Economics)' },
            ].map(sub => {
              const mark = marks[sub.id];
              const lvl = getLevel(mark);
              return (
                <div key={sub.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                  <div className="space-y-0.5 flex-1">
                    <div className="text-xs sm:text-sm font-bold text-slate-800">{sub.label}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">Achievement Level: {lvl} ({mark}%)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={mark}
                      onChange={(e) => setMarks({ ...marks, [sub.id]: Number(e.target.value) || 0 })}
                      className="w-20 px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <span className="text-xs font-bold text-slate-500">%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span>APS Levels: 80-100% (Level 7), 70-79% (Level 6), 60-69% (Level 5), 50-59% (Level 4), 40-49% (Level 3), 30-39% (Level 2).</span>
          </div>
        </div>

        {/* Right: Career Matcher & University Requirements */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-teal-100 text-teal-800 rounded-2xl">
                <Briefcase className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Career Pathway Matcher</h3>
                <p className="text-xs text-slate-500">Select your dream career to check admission</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Choose Career Path:</label>
              <select
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              >
                <option value="engineering">BSc / BEng Engineering</option>
                <option value="medicine">MBChB Medicine & Surgery</option>
                <option value="accounting">Bachelor of Accounting (CA/SA)</option>
                <option value="it">BSc Computer Science & IT</option>
                <option value="law">Bachelor of Laws (LLB)</option>
                <option value="teaching">Bachelor of Education (B.Ed)</option>
              </select>
            </div>

            {/* Eligibility Card */}
            <div className={`p-5 rounded-2xl border space-y-3 ${isEligible ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isEligible ? '🎉 APS Eligible for this Career!' : '⚠️ APS Below Target - Keep Pushing!'}
                </span>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-white/80">
                  Required: {selectedCareer.minAps} APS
                </span>
              </div>
              <h4 className="text-base font-black">{selectedCareer.title}</h4>
              <p className="text-xs leading-relaxed">{selectedCareer.description}</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Required Subjects & Levels:</div>
              <ul className="space-y-1.5">
                {selectedCareer.requiredSubjects.map((sub, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top SA Universities Offering This:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCareer.topUnis.map((uni, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200">
                    {uni}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
