import React, { useState } from 'react';
import { MessageSquare, Puzzle, Award, Compass, Sparkles, GraduationCap, BookOpen, Layers, Calendar, Calculator, BookMarked, Users, HeartPulse, Briefcase, ChevronDown, ShieldCheck, Scale, Smartphone, Megaphone, Zap } from 'lucide-react';
import { ActiveTab, Message } from './types';
import { ChatView } from './components/ChatView';
import { BreakdownView } from './components/BreakdownView';
import { QuizView } from './components/QuizView';
import { FlashcardView } from './components/FlashcardView';
import { FormulaView } from './components/FormulaView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { RevisionLibraryView } from './components/RevisionLibraryView';
import { GroupStudyView } from './components/GroupStudyView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { LearningSupportView } from './components/LearningSupportView';
import { CareerAndApsView } from './components/CareerAndApsView';
import { MotivationView } from './components/MotivationView';
import { AndroidAppView } from './components/AndroidAppView';
import { TeacherDashboardView } from './components/TeacherDashboardView';
import { SponsorBoardView } from './components/SponsorBoardView';
import { SystemHealthQSMEView } from './components/SystemHealthQSMEView';
import { StudentDiaryView } from './components/StudentDiaryView';
import { SchoolNoticeBoardView } from './components/SchoolNoticeBoardView';
import { PerformanceRiskView } from './components/PerformanceRiskView';
import { TestingHubView } from './components/TestingHubView';
import { SifisoGuardianModal } from './components/SifisoGuardianModal';
import { LegalIpModal } from './components/LegalIpModal';
import { WhatsAppOnboardingModal } from './components/WhatsAppOnboardingModal';
import { FirebaseAuthButton } from './components/FirebaseAuthButton';


const GRADES = ["5", "6", "7", "8", "9", "10", "11", "12"];
const SUBJECTS = [
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Natural Sciences",
  "Social Sciences",
  "Technology",
  "Economics",
  "Accounting",
  "Geography",
  "History",
  "Business Studies",
  "English First Additional Language",
  "English Home Language",
  "Afrikaans Huistaal / FAL"
];
const LANGUAGES = [
  "English",
  "isiZulu",
  "isiXhosa",
  "Afrikaans",
  "Sesotho",
  "Setswana",
  "Sepedi"
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [grade, setGrade] = useState<string>('10');
  const [subject, setSubject] = useState<string>('Mathematics');
  const [language, setLanguage] = useState<string>('English');
  const [isGuardianOpen, setIsGuardianOpen] = useState<boolean>(false);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Sawubona! I'm **Sifiso**, your personal academic tutor and mentor. Whether you're working through CAPS or IEB homework, preparing for exams, or trying to understand a tricky concept, I'm here to guide you step by step—no direct answers, just pure understanding! Sharp sharp, what are we studying today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleAskTutor = async (promptText: string) => {
    setActiveTab('chat');
    const userMessage: Message = {
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          grade,
          subject,
          language
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const modelMessage: Message = {
        role: 'model',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, modelMessage]);
    } catch (err: any) {
      const errorMsg: Message = {
        role: 'model',
        content: "Eish! Something went wrong connecting to Sifiso. Please check your connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, errorMsg]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center text-2xl shadow-md border border-emerald-500">
              🇿🇦
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-extrabold text-xl text-slate-900 tracking-tight">Sifiso Tutor</h1>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  CAPS / IEB Mentor
                </span>
                <span className="text-[11px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                  📶 100% Offline Ready
                </span>
              </div>
              <p className="text-xs text-slate-500">Encouraging South African after-school academic mentor</p>
            </div>
          </div>

          {/* Grade, Subject & Language Selectors */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>Grade:</span>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="bg-transparent font-bold text-emerald-800 focus:outline-none cursor-pointer"
              >
                {GRADES.map(g => (
                  <option key={g} value={g}>Grade {g}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Subject:</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-transparent font-bold text-emerald-800 focus:outline-none cursor-pointer max-w-[160px] truncate"
              >
                {SUBJECTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700">
              <span className="text-emerald-700 font-bold">🗣️</span>
              <span>Language:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent font-bold text-emerald-800 focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              title="Generate WhatsApp Deep-Links & Bypassed Onboarding"
            >
              <MessageSquare className="w-4 h-4 text-emerald-100" />
              <span>WhatsApp Onboarding</span>
            </button>

            <FirebaseAuthButton />

            <button
              onClick={() => setIsGuardianOpen(true)}
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              title="Open Sifiso System Guardian & Diagnostics"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Guardian</span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet selectors row */}
        <div className="lg:hidden flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-100 border-t border-slate-200 text-xs">
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <span>Grade:</span>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-1 font-bold text-emerald-800"
            >
              {GRADES.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <span>Subject:</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-1 font-bold text-emerald-800 max-w-[130px] truncate"
            >
              {SUBJECTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <span>Lang:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-1 font-bold text-emerald-800"
            >
              {LANGUAGES.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Navigation Sub-header */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat & Mentor</span>
          </button>

          <button
            onClick={() => setActiveTab('breakdown')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'breakdown'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Homework Dissector</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Practice Quiz & Marking</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Revision Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'formulas'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Formula Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Study Planner & NSC</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'library'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>Revision Library</span>
          </button>

          <button
            onClick={() => setActiveTab('groups')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'groups'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Group Tasks & Free Share</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'exam'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Mock Exam Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'support'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Learning Pace & Care</span>
          </button>

          <button
            onClick={() => setActiveTab('career')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'career'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>APS & Career Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('motivation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'motivation'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Study Wisdom & Tips</span>
          </button>

          <button
            onClick={() => setActiveTab('android-app')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'android-app'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>📱 Android & Play Store</span>
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>👩‍🏫 Teacher Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('sponsor')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'sponsor'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>🌟 Sponsors & Ads</span>
          </button>

          <button
            onClick={() => setActiveTab('qsmes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'qsmes'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>🛡️ QSME&S System Health</span>
          </button>

          <button
            onClick={() => setActiveTab('diary')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'diary'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>📅 Student Diary & Tests</span>
          </button>

          <button
            onClick={() => setActiveTab('noticeboard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'noticeboard'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>📢 School Notice Board</span>
          </button>

          <button
            onClick={() => setActiveTab('perf-risk')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'perf-risk'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>⚡ Performance & Risk</span>
          </button>

          <button
            onClick={() => setActiveTab('testing-hub')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'testing-hub'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>🛡️ Testing Hub & Terms</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'chat' && (
          <ChatView messages={messages} setMessages={setMessages} grade={grade} subject={subject} language={language} />
        )}
        {activeTab === 'breakdown' && (
          <BreakdownView grade={grade} subject={subject} language={language} />
        )}
        {activeTab === 'quiz' && (
          <QuizView grade={grade} subject={subject} language={language} />
        )}
        {activeTab === 'flashcards' && (
          <FlashcardView grade={grade} subject={subject} language={language} />
        )}
        {activeTab === 'formulas' && (
          <FormulaView />
        )}
        {activeTab === 'planner' && (
          <StudyPlannerView />
        )}
        {activeTab === 'library' && (
          <RevisionLibraryView />
        )}
        {activeTab === 'groups' && (
          <GroupStudyView />
        )}
        {activeTab === 'exam' && (
          <ExamSimulatorView />
        )}
        {activeTab === 'support' && (
          <LearningSupportView onSelectTab={setActiveTab} language={language} />
        )}
        {activeTab === 'career' && (
          <CareerAndApsView language={language} />
        )}
        {activeTab === 'motivation' && (
          <MotivationView />
        )}
        {activeTab === 'android-app' && (
          <AndroidAppView />
        )}
        {activeTab === 'teacher' && (
          <TeacherDashboardView />
        )}
        {activeTab === 'sponsor' && (
          <SponsorBoardView />
        )}
        {activeTab === 'qsmes' && (
          <SystemHealthQSMEView />
        )}
        {activeTab === 'diary' && (
          <StudentDiaryView />
        )}
        {activeTab === 'noticeboard' && (
          <SchoolNoticeBoardView />
        )}
        {activeTab === 'perf-risk' && (
          <PerformanceRiskView />
        )}
        {activeTab === 'testing-hub' && (
          <TestingHubView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Sifiso Tutor. Empowering South African learners across Grades 5 to 12. Sharp sharp!</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Socratic Learning Method
            </span>
            <span>•</span>
            <span>CAPS & IEB Compliant</span>
            <span>•</span>
            <button
              onClick={() => setIsLegalOpen(true)}
              className="text-emerald-700 hover:text-emerald-800 font-bold underline decoration-emerald-300 underline-offset-4 cursor-pointer flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Legal & IP Protection</span>
            </button>
          </div>
        </div>
      </footer>

      <SifisoGuardianModal isOpen={isGuardianOpen} onClose={() => setIsGuardianOpen(false)} />
      <LegalIpModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
      <WhatsAppOnboardingModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} />
    </div>
  );
}
