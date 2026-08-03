import React from 'react';
import { Flame, BookOpen, Award, Compass, Heart, Sparkles } from 'lucide-react';

const SA_STUDY_TIPS = [
  {
    title: "The Rugby Metaphor for Exams",
    desc: "Just like a Springbok test match, don't try to win the game in the first 5 minutes. Pace yourself, tackle one question at a time, and check your work during injury time!"
  },
  {
    title: "Teach Someone Else (The Braai Method)",
    desc: "If you can explain a complex Science or Accounting concept simply to your family or friends around the dinner table, you truly understand it."
  },
  {
    title: "Past Papers are Gold",
    desc: "CAPS and IEB examiners love testing similar core patterns year after year. Doing past papers under timed conditions builds real exam confidence."
  },
  {
    title: "Take Brain Breaks",
    desc: "Study for 45 minutes, then take a 10-minute break to stretch, drink water, or listen to your favourite amapiano track. Your brain needs time to absorb!"
  }
];

export function MotivationView() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Streak & Encouragement Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-4 -bottom-6 text-9xl opacity-10 select-none pointer-events-none">
          🇿🇦
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-700/80 border border-emerald-600 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-100">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>5-Day Study Streak Active! Keep pushing!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            "Education is the most powerful weapon which you can use to change the world." — Nelson Mandela
          </h2>
          <p className="text-emerald-200 text-sm max-w-2xl leading-relaxed">
            Sifiso is proud of your consistency! Every step you take today brings you closer to your Matric certificate, university admission, or dream career. Sharp sharp!
          </p>
        </div>
      </div>

      {/* Study Tips Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-700" />
          <span>Sifiso's Mentor Wisdom for South African Students</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SA_STUDY_TIPS.map((tip, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2 hover:border-emerald-300 transition">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-base">{tip.title}</h4>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed pl-9">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Support Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
          🇿🇦
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-amber-900 text-sm">CAPS & IEB Syllabus Aligned</h4>
          <p className="text-amber-800/90 text-xs leading-relaxed">
            Sifiso is trained on South African curriculum guidelines across Grades R to 12. Whether you are preparing for Grade 12 National Senior Certificate (NSC) final exams or independent school assessments, Sifiso breaks down every concept with patience and cultural warmth.
          </p>
        </div>
      </div>
    </div>
  );
}
