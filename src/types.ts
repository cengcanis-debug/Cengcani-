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

export interface FeedbackItem {
  id: string;
  testerName: string;
  testerRole: 'Student' | 'Parent' | 'Teacher' | 'School Principal' | 'Tester';
  category: 'Bug Report' | 'Feature Suggestion' | 'WhatsApp / Link Query' | 'Curriculum Question' | 'General Feedback';
  message: string;
  rating: number; // 1 to 5
  timestamp: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  developerReply?: string;
  repliedAt?: string;
}

export type ActiveTab = 'chat' | 'breakdown' | 'quiz' | 'flashcards' | 'formulas' | 'planner' | 'library' | 'groups' | 'exam' | 'support' | 'career' | 'motivation' | 'android-app' | 'teacher' | 'sponsor' | 'qsmes' | 'diary' | 'noticeboard' | 'perf-risk' | 'testing-hub' | 'dev-hub';


