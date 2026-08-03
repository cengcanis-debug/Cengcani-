# Sifiso AI Tutor System Architecture & Fault-Recovery Manifest

## 1. Executive Summary & Application Architecture
**Sifiso AI Tutor** is a comprehensive, production-grade full-stack educational web application designed for South African students (Grades 5–12 following CAPS and IEB curricula) and educators. It combines a React 18 + Vite frontend with an Express backend proxying secure calls to the Google Gemini API (`@google/genai`).

- **Frontend**: Single-page application structured with modular components under `/src/components/`, styled via Tailwind CSS, animated with `motion/react`, and utilizing Lucide React icons.
- **Backend**: Node.js / Express server in `server.ts` managing API endpoints (`/api/chat`, `/api/quiz`, `/api/health`, etc.) and enforcing server-side API key protection.
- **Persistence & State**: Client-side robust local storage with state synchronization across learning modules.

---

## 2. Complete Feature Matrix & Component Map

| Component / Module | File Path | Functional Description & Capabilities |
| :--- | :--- | :--- |
| **Main App Shell** | `/src/App.tsx` | Global layout, grade/subject/language selectors, navigation tabs, Guardian modal, Legal & IP modal. |
| **AI Tutor Chat** | `/src/components/ChatView.tsx` | Socratic tutoring interface with CAPS/IEB curriculum alignment, step-by-step guidance, and speech/audio support. |
| **Concept Breakdown** | `/src/components/BreakdownView.tsx` | Simplifies complex topics into analogies, visual breakdowns, and structured practice prompts. |
| **Interactive Quiz** | `/src/components/QuizView.tsx` | Adaptive quizzes with instant feedback, scoring, and explanation breakdowns. |
| **Flashcard Deck** | `/src/components/FlashcardView.tsx` | Spaced repetition flashcards across all subjects and grade levels. |
| **Formula & Theorem Vault** | `/src/components/FormulaView.tsx` | Comprehensive reference sheets for Mathematics, Physical Sciences, Accounting, etc. |
| **Study Planner** | `/src/components/StudyPlannerView.tsx` | Exam countdown timers, daily study schedule builder, and revision reminders. |
| **Revision Library** | `/src/components/RevisionLibraryView.tsx` | Past papers, summary notes, and curriculum guidelines repository. |
| **Group Study Hub** | `/src/components/GroupStudyView.tsx` | Collaborative virtual study rooms, shared challenge boards, and peer Q&A. |
| **Exam Simulator** | `/src/components/ExamSimulatorView.tsx` | Timed mock exam environment adhering to official South African assessment standards. |
| **Learning Support** | `/src/components/LearningSupportView.tsx` | Dyslexia-friendly reading aids, font scaling, audio assist, and step simplification. |
| **Career & APS Calculator** | `/src/components/CareerAndApsView.tsx` | Admission Point Score (APS) calculator for universities (Wits, UCT, UKZN, UP, etc.) and career guidance. |
| **Motivation & Mindset** | `/src/components/MotivationView.tsx` | Daily academic affirmations, focus timers (Pomodoro), and stress-relief guidance. |
| **Android APK Companion** | `/src/components/AndroidAppView.tsx` | Progressive Web App (PWA) installation guide and mobile preview simulator. |
| **Teacher Dashboard** | `/src/components/TeacherDashboardView.tsx` | Educator portal for class performance analytics, homework assignment, and student progress tracking. |
| **Sponsor & Donor Board** | `/src/components/SponsorBoardView.tsx` | Transparency dashboard highlighting community sponsors, bursaries, and impact metrics. |
| **System Health & QSME** | `/src/components/SystemHealthQSMEView.tsx` | Real-time diagnostic monitor tracking API latency, memory usage, and component integrity. |
| **Student Diary & Journal** | `/src/components/StudentDiaryView.tsx` | Personal learning reflection journal and homework tracking log. |
| **School Notice Board** | `/src/components/SchoolNoticeBoardView.tsx` | Announcements, school event calendar, and important deadlines. |
| **Performance Risk & Analytics** | `/src/components/PerformanceRiskView.tsx` | Predictive analytics identifying academic risk areas and suggesting targeted revision strategies. |
| **Testing Hub** | `/src/components/TestingHubView.tsx` | Automated test suites, UI sandbox validation, and module stress-testing sandbox. |

---

## 3. Security, Infrastructure & API Key Guidelines
- **Zero Client-Side Secret Exposure**: All Gemini API keys (`GEMINI_API_KEY`) reside exclusively on the server (`server.ts`). The browser communicates solely with `/api/*` endpoints.
- **Input Sanitization & Error Boundaries**: Implemented `ErrorBoundary.tsx` across the component tree to catch unhandled rendering exceptions gracefully.
- **Port Binding**: Hardcoded to bind to host `0.0.0.0` and port `3000` to comply with container reverse-proxy ingress requirements.

---

## 4. Fault Detection & Automated Recovery Protocol

When system faults or anomalies occur (e.g., network failure, malformed JSON response, or state desynchronization), the recovery protocol executes the following corrective sequence:

1. **Error Capture via ErrorBoundary**:
   - Catches React render errors and presents an interactive fallback UI with a **"Restore System State & Reload"** button.
2. **API Resilience & Fallback**:
   - If the backend AI service experiences timeout or rate limiting, the server returns a structured fallback response with local heuristic guidance.
3. **State Recovery & Local Storage Reset**:
   - `localStorage` keys (`sifiso_user_state`, `sifiso_diary_entries`, `sifiso_study_plan`) are guarded with try/catch blocks. If corruption is detected, default fallback state is automatically injected without crashing the runtime.
4. **Diagnostic Verification**:
   - `SystemHealthQSMEView` and `TestingHubView` allow real-time diagnostic checks, pinging `/api/health` and verifying module reactivity.

---

## 5. Stress Testing & Verification Status
- **TypeScript Type Checking (`tsc --noEmit`)**: Passing with 0 errors.
- **Vite Production Build (`npm run build`)**: Bundled successfully via esbuild and Vite.
- **Linter (`npm run lint`)**: Clean execution.
