import React, { useState } from 'react';
import { Bell, Megaphone, Calendar, Pin, Plus, Trash2, CheckCircle2, ShieldAlert, Sparkles, Building } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  category: 'General' | 'Exam' | 'Sports' | 'Urgent' | 'Holiday';
  date: string;
  author: string;
  content: string;
  pinned: boolean;
}

export function SchoolNoticeBoardView() {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'Term 3 Assessment Timetable Released',
      category: 'Exam',
      date: '2026-07-30',
      author: 'Principal M. Dlamini',
      content: 'All Grade 5 to Grade 12 students and parents are requested to review the Term 3 test and exam timetable in the Student Diary. Please ensure all school fees or sponsorship verifications are up to date.',
      pinned: true
    },
    {
      id: '2',
      title: 'Inter-School Athletics & Soccer Trials',
      category: 'Sports',
      date: '2026-07-28',
      author: 'Sports Department',
      content: 'Practices for the upcoming provincial athletics tournament take place every Tuesday and Thursday afternoon at 14:30 on the main sports field.',
      pinned: false
    },
    {
      id: '3',
      title: 'Mandela Day Community Outreach & Coding Workshop',
      category: 'General',
      date: '2026-07-25',
      author: 'Sifiso STEM Foundation',
      content: 'Join our special Saturday coding and AI tutoring workshop using Sifiso AI Tutor. Free data vouchers provided for participating learners.',
      pinned: true
    },
    {
      id: '4',
      title: 'Important Notice: Early School Closure on Friday',
      category: 'Urgent',
      date: '2026-07-22',
      author: 'School Administration',
      content: 'School will close at 12:00 this Friday due to municipal scheduled electrical maintenance. Bus transport will depart at 12:15 sharp.',
      pinned: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'General' | 'Exam' | 'Sports' | 'Urgent' | 'Holiday'>('General');
  const [author, setAuthor] = useState('School Administration');
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNotice: Notice = {
      id: Date.now().toString(),
      title,
      category,
      date: new Date().toISOString().split('T')[0],
      author,
      content,
      pinned
    };

    setNotices([newNotice, ...notices]);
    setTitle('');
    setContent('');
    setShowAddModal(false);
  };

  const deleteNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  const togglePin = (id: string) => {
    setNotices(notices.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30">
              <Megaphone size={14} /> Official School Notice Board
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Announcements, Circulars & Updates</h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Stay informed with official circulars, exam notices, sports fixtures, and urgent announcements from school management and teachers.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-3 rounded-2xl transition shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={18} /> Post Notice (Staff/HOD)
          </button>
        </div>
      </div>

      {/* Add Notice Modal Form */}
      {showAddModal && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Post Official School Notice</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddNotice} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Notice Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Parent-Teacher Meeting Next Week"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="General">General Announcement</option>
                  <option value="Exam">Exam & Assessment</option>
                  <option value="Sports">Sports & Culture</option>
                  <option value="Urgent">Urgent Notice</option>
                  <option value="Holiday">Holiday & Closure</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Author / Department *</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Principal / HOD Mathematics"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pinned}
                    onChange={(e) => setPinned(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span className="text-xs font-semibold text-slate-700">Pin to top of notice board</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Notice Content *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the full circular text or announcement details here..."
                rows={4}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
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
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition shadow cursor-pointer"
              >
                Publish Notice
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-white p-6 sm:p-8 rounded-3xl border shadow-sm space-y-3 transition ${
              notice.pinned ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {notice.pinned && (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Pin size={10} /> Pinned Notice
                    </span>
                  )}
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    notice.category === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                    notice.category === 'Exam' ? 'bg-indigo-100 text-indigo-800' :
                    notice.category === 'Sports' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-400">• Published on {notice.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{notice.title}</h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePin(notice.id)}
                  title={notice.pinned ? 'Unpin notice' : 'Pin notice'}
                  className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    notice.pinned ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Pin size={14} />
                </button>
                <button
                  onClick={() => deleteNotice(notice.id)}
                  title="Delete notice"
                  className="p-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-700 transition cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {notice.content}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-700">Issued by: {notice.author}</span>
              <span className="text-emerald-700 font-medium">Verified Official Circular</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
