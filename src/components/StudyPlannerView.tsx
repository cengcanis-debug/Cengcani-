import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Plus, Trash2, Trophy, Flame } from 'lucide-react';

interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  date: string;
  completed: boolean;
}

export function StudyPlannerView() {
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    const saved = localStorage.getItem('sifiso_study_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: '1', subject: 'Mathematics', topic: 'Calculus & Functions Revision', date: '2026-08-01', completed: true },
      { id: '2', subject: 'Physical Sciences', topic: 'Newtonian Mechanics past papers', date: '2026-08-02', completed: false },
      { id: '3', subject: 'Accounting', topic: 'Cash Flow Statements & Budgets', date: '2026-08-03', completed: false }
    ];
  });

  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newTopic, setNewTopic] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    localStorage.setItem('sifiso_study_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    const task: StudyTask = {
      id: Date.now().toString(),
      subject: newSubject,
      topic: newTopic,
      date: newDate || new Date().toISOString().split('T')[0],
      completed: false
    };
    setTasks([task, ...tasks]);
    setNewTopic('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // NSC Matric Finals countdown (e.g. October 2026)
  const examDate = new Date('2026-10-26');
  const today = new Date();
  const diffTime = examDate.getTime() - today.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Countdown Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-700/80 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> NSC / CAPS Exam Countdown
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Stay Sharp & Consistent!
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
            Plan your daily revision milestones, build strong study habits, and ace your assessments with Sifiso.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center min-w-[140px] z-10">
          <div className="text-3xl sm:text-4xl font-black text-yellow-300">{daysLeft}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-200 mt-1">Days to NSC Finals</div>
        </div>
      </div>

      {/* Progress & Add Task */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800">Weekly Goal Progress</h3>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-black text-emerald-800 mb-2">{progressPercent}%</div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            {completedCount} of {tasks.length} study tasks completed this week. Keep going!
          </p>
        </div>

        {/* Add Task Form */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-700" /> Add New Study Goal
          </h3>
          <form onSubmit={addTask} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Mathematical Literacy">Mathematical Literacy</option>
                <option value="Physical Sciences">Physical Sciences</option>
                <option value="Life Sciences">Life Sciences</option>
                <option value="Natural Sciences">Natural Sciences</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Technology">Technology</option>
                <option value="Economics">Economics</option>
                <option value="Accounting">Accounting</option>
                <option value="English Home Language">English Home Language</option>
                <option value="Geography">Geography</option>
                <option value="Business Studies">Business Studies</option>
              </select>

              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="What topic are you revising? (e.g. Organic chemistry isomers)..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer shrink-0"
              >
                Add Goal
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-700" /> Your Revision Schedule & Tasks
        </h3>

        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition ${
                task.completed ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-emerald-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                    task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 hover:border-emerald-500'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      {task.subject}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.date}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold mt-1 ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {task.topic}
                  </p>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition cursor-pointer"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No study goals added yet. Add one above to kickstart your preparation!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
