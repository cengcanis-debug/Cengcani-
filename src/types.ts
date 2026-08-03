export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface Milestone {
  step: number;
  title: string;
  explanation: string;
  guidingQuestion: string;
}

export interface BreakdownResult {
  topic: string;
  encouragingIntro: string;
  milestones: Milestone[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  socraticHint: string;
  explanation: string;
}

export interface QuizData {
  quizTitle: string;
  questions: QuizQuestion[];
}

export interface QuizReport {
  score: number;
  total: number;
  percentage: number;
  sifisoFeedback: string;
  simplificationTips: string[];
  nextSteps: string;
}

export interface FlashcardItem {
  id: string;
  term: string;
  definition: string;
  subject: string;
}

export type ActiveTab = 'chat' | 'breakdown' | 'quiz' | 'flashcards' | 'formulas' | 'planner' | 'library' | 'groups' | 'exam' | 'support' | 'career' | 'motivation' | 'android-app' | 'teacher' | 'sponsor' | 'qsmes' | 'diary' | 'noticeboard' | 'perf-risk' | 'testing-hub';

