import React, { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle2, AlertCircle, BookOpen, Trash2, Sparkles, Filter } from 'lucide-react';

interface DiaryItem {
  id: string;
  title: string;
  subject: string;
  type: 'Test' | 'Exam' | 'Project' | 'Assignment';
  dueDate: string;
  grade: string;
  description: string;
  completed: boolean;
}

export function StudentDiaryView() {
  const [items, setItems] = useState<DiaryItem[]>([
    {
      id: '1',
      title: 'Mathematics Algebra End-of-Term Test',
      subject: 'Mathematics',
      type: 'Test',
      dueDate: '2026-08-05',
      grade: 'Grade 8 E1',
      description: 'Covers linear equations, factorization, and algebraic fractions (Chapters 4-6).',
      completed: false
    },
    {
      id: '2',
      title: 'Natural Sciences Photosynthesis Lab Report',
      subject: 'Natural Sciences',
      type: 'Project',
      dueDate: '2026-08-08',
      grade: 'Grade 8 E1',
      description: 'Submit written experimental findings with starch test results and graphs.',
      completed: false
    },
    {
      id: '3',
      title: 'English FAL Romeo & Juliet Essay',
      subject: 'English FAL',
      type: 'Assignment',
      dueDate: '2026-08-12',
      grade: 'Grade 8 E1',
      description: 'Write a 350-word analytical paragraph on character motivation in Act 3.',
      completed: true
    },
    {
      id: '4',
      title: 'Economic & Management Sciences Mid-Term Exam',
      subject: 'EMS',
      type: 'Exam',
      dueDate: '2026-08-18',
      grade: 'Grade 8 E1',
      description: 'Comprehensive exam covering accounting equations and entrepreneurship basics.',
      completed: false
    }
  ]);

  const [filterType, setFilterType] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [type, setType] = useState<'Test' | 'Exam' | 'Project' | 'Assignment'>('Test');
  const [dueDate, setDueDate] = useState('');
  const [grade, setGrade] = useState('Grade 8 E1');
  const [description, setDescription] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const newItem: DiaryItem = {
      id: Date.now().toString(),
      title,
      subject,
      type,
      dueDate,
      grade,
      description,
      completed: false
    };

    setItems([newItem, ...items]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setShowAddModal(false);
  };

  const toggleComplete = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const filteredItems = filterType === 'All' 
    ? items 
    : items.filter(i => i.type === filterType);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/30">
              <Calendar size={14} /> Student Diary & Planner
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Tests, Projects & Assignment Deadlines</h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Keep track of upcoming assessments, homework due dates, and project milestones across all CAPS/IEB subjects. Sharp sharp!
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-2xl transition shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={18} /> Add New Entry
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 px-2">
          <Filter size={14} /> Filter:
        </span>
        {['All', 'Test', 'Exam', 'Project', 'Assignment'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterType(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              filterType === cat
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* Add Entry Modal / Form Drawer */}
      {showAddModal && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Add New Test, Project or Assignment</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. History Term 3 Project"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Natural Sciences">Natural Sciences</option>
                  <option value="English FAL">English FAL</option>
                  <option value="EMS">EMS</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Life Orientation">Life Orientation</option>
                  <option value="Technology">Technology</option>
                  <option value="Physical Sciences">Physical Sciences</option>
                  <option value="Accounting">Accounting</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Test">Test</option>
                  <option value="Exam">Exam</option>
                  <option value="Project">Project</option>
                  <option value="Assignment">Assignment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Due Date *</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Grade / Stream</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Grade 5 North">Grade 5 North</option>
                  <option value="Grade 6 South">Grade 6 South</option>
                  <option value="Grade 7 West">Grade 7 West</option>
                  <option value="Grade 8 E1">Grade 8 E1</option>
                  <option value="Grade 8 E2">Grade 8 E2</option>
                  <option value="Grade 10 Physical Sciences">Grade 10 Physical Sciences</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description / Requirements</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter details about what needs to be studied or submitted..."
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition shadow cursor-pointer"
              >
                Save to Diary
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Diary Items Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const isPast = new Date(item.dueDate) < new Date() && !item.completed;
          return (
            <div
              key={item.id}
              className={`bg-white p-6 rounded-3xl border shadow-sm space-y-4 transition ${
                item.completed ? 'border-emerald-200 bg-emerald-50/20 opacity-80' : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      item.type === 'Test' ? 'bg-indigo-100 text-indigo-800' :
                      item.type === 'Exam' ? 'bg-purple-100 text-purple-800' :
                      item.type === 'Project' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{item.subject}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{item.grade}</span>
                  </div>
                  <h3 className={`font-bold text-slate-900 text-base ${item.completed ? 'line-through text-slate-500' : ''}`}>
                    {item.title}
                  </h3>
                </div>

                <button
                  onClick={() => toggleComplete(item.id)}
                  title={item.completed ? 'Mark incomplete' : 'Mark complete'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer ${
                    item.completed ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 hover:border-indigo-600 text-transparent'
                  }`}
                >
                  <CheckCircle2 size={16} className={item.completed ? 'text-white' : 'text-slate-300'} />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Clock size={14} className={isPast ? 'text-rose-600' : 'text-indigo-600'} />
                  <span>Due: {item.dueDate}</span>
                  {isPast && <span className="text-rose-600 text-[10px] bg-rose-50 px-2 py-0.5 rounded font-bold">Overdue</span>}
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer"
                  title="Delete entry"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <BookOpen size={36} className="text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-base">No diary entries found for {filterType}s</h3>
          <p className="text-xs text-slate-500">Click "Add New Entry" above to schedule tests, projects, or homework.</p>
        </div>
      )}
    </div>
  );
}
