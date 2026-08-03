import React, { useState, useEffect } from 'react';
import { Users, Share2, Copy, Download, Upload, Plus, CheckCircle2, Clock, BookOpen, Sparkles, Award } from 'lucide-react';

interface GroupTask {
  id: string;
  title: string;
  subject: string;
  createdBy: string;
  dueDate: string;
  description: string;
  completed: boolean;
}

export function GroupStudyView() {
  const [tasks, setTasks] = useState<GroupTask[]>(() => {
    const saved = localStorage.getItem('sifiso_group_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'g1',
        title: 'Grade 11 Mathematics Trig Identities Peer Challenge',
        subject: 'Mathematics',
        createdBy: 'Mr. Khumalo (Teacher)',
        dueDate: '2026-08-04',
        description: 'Complete questions 1 to 5 on compound angles and share your working methods with your study circle.',
        completed: false
      },
      {
        id: 'g2',
        title: 'Physical Sciences Momentum & Impulse Group Assignment',
        subject: 'Physical Sciences',
        createdBy: 'Sifiso Study Circle A',
        dueDate: '2026-08-06',
        description: 'Collaborate on elastic vs inelastic collision conservation of momentum problems.',
        completed: true
      }
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newCreator, setNewCreator] = useState('Student / Study Leader');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sifiso_group_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const task: GroupTask = {
      id: Date.now().toString(),
      title: newTitle,
      subject: newSubject,
      createdBy: newCreator,
      dueDate: newDate || new Date().toISOString().split('T')[0],
      description: newDesc || 'Collaborative group study task via Sifiso AI.',
      completed: false
    };
    setTasks([task, ...tasks]);
    setNewTitle('');
    setNewDesc('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const shareTaskFree = async (task: GroupTask) => {
    const shareText = `📚 Sifiso Study Group Task (CAPS/IEB)\nSubject: ${task.subject}\nTask: ${task.title}\nDue: ${task.dueDate}\nDetails: ${task.description}\n\nShared via Sifiso AI Tutor Study Circle.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: task.title,
          text: shareText,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopyFeedback(task.id);
      setTimeout(() => setCopyFeedback(null), 2500);
    } catch (e) {
      alert('Unable to copy to clipboard automatically.');
    }
  };

  const exportTasks = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sifiso_study_group_tasks_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            setTasks(parsed);
            alert('Study tasks imported successfully!');
          }
        } catch (error) {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-700/85 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> 100% Free Peer & Teacher Study Exchange
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Collaborate & Share Without Paid Fees
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
            Coordinate study group assignments, export/import problem sets, and share instantly via web share or clipboard for zero cost.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 z-10">
          <button
            onClick={exportTasks}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition backdrop-blur-md cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export Tasks
          </button>
          <label className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
            <Upload className="w-4 h-4" /> Import Tasks
            <input type="file" accept=".json" onChange={importTasks} className="hidden" />
          </label>
        </div>
      </div>

      {/* Create Group Task Form */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-700" /> Create Group Task or Teacher Assignment
        </h3>
        <form onSubmit={addTask} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task title (e.g. Past paper Q4 review)..."
              className="sm:col-span-2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newCreator}
              onChange={(e) => setNewCreator(e.target.value)}
              placeholder="Author (e.g. Mr. Dlamini or Study Group 3)..."
              className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
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
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Task description / instructions for your study circle..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer shrink-0"
            >
              Post Task
            </button>
          </div>
        </form>
      </div>

      {/* Group Tasks List */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-700" /> Collaborative Study Circle Tasks & Free Exchange
        </h3>

        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`p-5 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                task.completed ? 'bg-slate-50 border-slate-200' : 'bg-white border-emerald-200 shadow-xs'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition cursor-pointer shrink-0 ${
                      task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 hover:border-emerald-500'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-0.5 rounded-full">
                    {task.subject}
                  </span>
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                    By {task.createdBy}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Due {task.dueDate}
                  </span>
                </div>

                <h4 className={`text-base font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {task.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">{task.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={() => shareTaskFree(task)}
                  className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  {copyFeedback === task.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Task (Free)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No group tasks created yet. Add one above to start collaborating with classmates or teachers!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
