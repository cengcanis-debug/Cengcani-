import React, { useState } from 'react';
import { Users, BookOpen, BarChart3, Award, Send, Plus, CheckCircle2, AlertTriangle, FileText, Search, UserCheck, MessageCircle, Share2, Smartphone, School, Building2 } from 'lucide-react';

export function TeacherDashboardView() {
  const [selectedSchool, setSelectedSchool] = useState('Grey College');
  const [selectedClassStream, setSelectedClassStream] = useState('Grade 8 E1');
  const [selectedGrade, setSelectedGrade] = useState('Grade 8');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'assignments' | 'students' | 'analytics'>('overview');
  
  // New Assignment state
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newInstructions, setNewInstructions] = useState('');
  const [assignments, setAssignments] = useState([
    { id: '1', title: 'Quadratic Functions & Graphs Assignment 3', subject: 'Mathematics', grade: 'Grade 11', school: 'Grey College', classStream: 'Grade 11 M1', dueDate: '2026-08-05', submitted: 28, total: 32 },
    { id: '2', title: 'Newton\'s Second Law Problem Set', subject: 'Physical Sciences', grade: 'Grade 11', school: 'Grey College', classStream: 'Grade 11 E2', dueDate: '2026-08-07', submitted: 24, total: 32 },
    { id: '3', title: 'Photosynthesis & Cellular Respiration Quiz', subject: 'Life Sciences', grade: 'Grade 10', school: 'Independent / Homeschool', classStream: 'Individual', dueDate: '2026-08-04', submitted: 1, total: 1 }
  ]);

  const [successMsg, setSuccessMsg] = useState('');

  // Add student state
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentNameInput, setStudentNameInput] = useState('');
  const [studentPhoneInput, setStudentPhoneInput] = useState('');
  const [studentEmailInput, setStudentEmailInput] = useState('');
  const [parentNameInput, setParentNameInput] = useState('');
  const [parentPhoneInput, setParentPhoneInput] = useState('');
  const [studentSchoolInput, setStudentSchoolInput] = useState('Grey College');
  const [studentStreamInput, setStudentStreamInput] = useState('Grade 8 E1');
  const [studentSubjectsInput, setStudentSubjectsInput] = useState<string[]>(['Mathematics', 'Physical Sciences']);

  const availableSubjectsList = [
    'Mathematics',
    'Mathematical Literacy',
    'Physical Sciences',
    'Life Sciences',
    'Natural Sciences',
    'Accounting',
    'Economics',
    'Geography',
    'History',
    'English Home Language',
    'Afrikaans First Additional Language'
  ];

  const [studentsList, setStudentsList] = useState([
    { 
      name: 'Sipho Dlamini', 
      school: 'Grey College', 
      classStream: 'Grade 8 E1', 
      grade: 'Grade 8', 
      subjects: ['Mathematics', 'Physical Sciences', 'Natural Sciences', 'English Home Language'], 
      score: '84%', 
      status: 'On Track', 
      lastActive: '10 mins ago', 
      phone: '0821234567', 
      email: 'sipho@example.com',
      parentName: 'Mr. & Mrs. Dlamini',
      parentPhone: '0829876543'
    },
    { 
      name: 'Pieter du Plessis', 
      school: 'Grey College', 
      classStream: 'Grade 8 E1', 
      grade: 'Grade 8', 
      subjects: ['Mathematics', 'Accounting', 'Natural Sciences', 'Afrikaans First Additional Language'], 
      score: '91%', 
      status: 'Excellent', 
      lastActive: '2 hours ago', 
      phone: '0839876543', 
      email: 'pieter@example.com',
      parentName: 'Dr. Kobus du Plessis',
      parentPhone: '0831112222'
    },
    { 
      name: 'Francois van der Merwe', 
      school: 'Grey College', 
      classStream: 'Grade 8 E2', 
      grade: 'Grade 8', 
      subjects: ['Mathematics', 'Physical Sciences', 'Geography'], 
      score: '62%', 
      status: 'Needs Support', 
      lastActive: '1 day ago', 
      phone: '0723456789', 
      email: 'francois@example.com',
      parentName: 'Mrs. Anika van der Merwe',
      parentPhone: '0724445555'
    },
    { 
      name: 'Nomvula Zulu', 
      school: 'Independent / Homeschool', 
      classStream: 'Individual', 
      grade: 'Grade 10', 
      subjects: ['Mathematics', 'Life Sciences', 'Physical Sciences', 'Economics'], 
      score: '78%', 
      status: 'On Track', 
      lastActive: 'Just now', 
      phone: '0812345678', 
      email: 'nomvula@example.com',
      parentName: 'Mr. Bheki Zulu',
      parentPhone: '0815556666'
    },
    { 
      name: 'Kagiso Mokoena', 
      school: 'Affies', 
      classStream: 'Grade 12 A1', 
      grade: 'Grade 12 (Matric)', 
      subjects: ['Mathematics', 'Accounting', 'Economics', 'Physical Sciences'], 
      score: '88%', 
      status: 'On Track', 
      lastActive: '3 hours ago', 
      phone: '0761122334', 
      email: 'kagiso@example.com',
      parentName: 'Ms. Lerato Mokoena',
      parentPhone: '0767778888'
    }
  ]);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentNameInput) return;
    const newStudent = {
      name: studentNameInput,
      school: studentSchoolInput,
      classStream: studentStreamInput,
      grade: studentStreamInput.includes('Grade 8') ? 'Grade 8' : studentStreamInput.includes('Grade 9') ? 'Grade 9' : studentStreamInput.includes('Grade 10') ? 'Grade 10' : studentStreamInput.includes('Grade 11') ? 'Grade 11' : 'Grade 12',
      subjects: studentSubjectsInput,
      score: 'Pending',
      status: 'Active',
      lastActive: 'Just registered',
      phone: studentPhoneInput || '0800000000',
      email: studentEmailInput || 'student@sifiso.co.za',
      parentName: parentNameInput || 'Parent / Guardian',
      parentPhone: parentPhoneInput || '0820000000'
    };
    setStudentsList([newStudent, ...studentsList]);
    setStudentNameInput('');
    setStudentPhoneInput('');
    setStudentEmailInput('');
    setParentNameInput('');
    setParentPhoneInput('');
    setShowAddStudent(false);
    setSuccessMsg(`Successfully registered ${newStudent.name} (${newStudent.school} - ${newStudent.classStream}) with parent contact (${newStudent.parentPhone})!`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleWhatsAppShare = (studentName: string, phone: string, school: string, stream: string) => {
    const appUrl = window.location.origin;
    const message = `Hi ${studentName}! 📱 Here is your direct link to access the Sifiso AI Tutor & CAPS Study App for ${school} (${stream}): ${appUrl}\n\nYou can install it directly on your Android phone home screen or open it in your browser. Let's master the exams! 🚀`;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Copy message to clipboard as a secure fallback in case popup blocker or iframe blocks window.open
    navigator.clipboard.writeText(message).catch(() => {});
    
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow) {
      // Fallback if blocked
      alert(`WhatsApp window blocked by browser popup protection. The share message has been copied to your clipboard! You can paste it directly in WhatsApp.`);
    } else {
      setSuccessMsg(`WhatsApp link opened for ${studentName} (and copied to clipboard as backup)!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const handleParentWhatsAppShare = (studentName: string, parentName: string, parentPhone: string, school: string, stream: string, score: string) => {
    const appUrl = window.location.origin;
    const message = `Dear ${parentName} 👨‍👩‍👧‍👦, here is the Sifiso AI Tutor progress & access link for your child ${studentName} (${school} - ${stream}). Current Mastery: ${score}. App Link: ${appUrl}\n\nYou can monitor their CAPS homework and AI tutoring sessions anytime!`;
    const cleanPhone = parentPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    navigator.clipboard.writeText(message).catch(() => {});
    
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow) {
      alert(`WhatsApp window blocked by browser popup protection. The parent share message has been copied to your clipboard!`);
    } else {
      setSuccessMsg(`WhatsApp link opened for parent of ${studentName} (and copied to clipboard)!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const item = {
      id: Date.now().toString(),
      title: newTitle,
      subject: selectedSubject,
      grade: selectedGrade,
      school: selectedSchool,
      classStream: selectedClassStream,
      dueDate: newDueDate || '2026-08-10',
      submitted: 0,
      total: studentsList.filter(s => s.school === selectedSchool).length || 1
    };
    setAssignments([item, ...assignments]);
    setNewTitle('');
    setNewInstructions('');
    setSuccessMsg(`Assignment successfully broadcast to ${selectedSchool} (${selectedClassStream}) student devices!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8">
          <School size={220} />
        </div>
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-indigo-400/30">
            <School size={14} /> South African School & Independent Student Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Sifiso School & Educator Dashboard</h1>
          <p className="text-indigo-200 text-sm sm:text-base">
            Manage student cohorts by school and standard (e.g., Grey College 8 E1, 8 E2, 8 A1), track enrolled subjects, and dispatch CAPS & IEB tasks instantly.
          </p>
        </div>
      </div>

      {/* School, Class Stream & Subject Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">School / Institution</label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-sm bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Grey College">Grey College (Bloemfontein)</option>
              <option value="Affies">Afrikaanse Hoër Seunskool (Affies)</option>
              <option value="Rondebosch Boys">Rondebosch Boys' High School</option>
              <option value="Crawford International">Crawford International</option>
              <option value="Independent / Homeschool">Independent / Unaffiliated Student</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Class / Stream (Standard)</label>
            <select
              value={selectedClassStream}
              onChange={(e) => setSelectedClassStream(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-sm bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Grade 5 North">Grade 5 North</option>
              <option value="Grade 6 South">Grade 6 South</option>
              <option value="Grade 7 West">Grade 7 West</option>
              <option value="Grade 8 E1">Grade 8 E1</option>
              <option value="Grade 8 E2">Grade 8 E2</option>
              <option value="Grade 8 A1">Grade 8 A1</option>
              <option value="Grade 8 A2">Grade 8 A2</option>
              <option value="Grade 9 M1">Grade 9 M1</option>
              <option value="Grade 10 S1">Grade 10 S1</option>
              <option value="Grade 11 M1">Grade 11 M1</option>
              <option value="Grade 11 E2">Grade 11 E2</option>
              <option value="Grade 12 Mat 1">Grade 12 Mat 1 (Matric)</option>
              <option value="Individual">Individual / Homeschool</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subject Focus</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-sm bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Mathematical Literacy">Mathematical Literacy</option>
              <option value="Physical Sciences">Physical Sciences</option>
              <option value="Life Sciences">Life Sciences</option>
              <option value="Natural Sciences">Natural Sciences</option>
              <option value="Accounting">Accounting</option>
              <option value="Economics">Economics</option>
              <option value="Geography">Geography</option>
            </select>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeSubTab === 'overview' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('assignments')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeSubTab === 'assignments' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Assignments
          </button>
          <button
            onClick={() => setActiveSubTab('students')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeSubTab === 'students' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Students Roster & Subjects
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="text-emerald-600 shrink-0" size={22} />
          <span className="text-sm font-medium">{successMsg}</span>
        </div>
      )}

      {/* Overview Tab Content */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase">Cohort Learners</span>
                <Users size={18} className="text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {studentsList.filter(s => s.school === selectedSchool).length}
              </div>
              <div className="text-xs text-emerald-600 font-medium">🏫 {selectedSchool} ({selectedClassStream})</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase">Class Average</span>
                <BarChart3 size={18} className="text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900">79.2%</div>
              <div className="text-xs text-emerald-600 font-medium">↑ 3.8% from last week</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase">Homework Submitted</span>
                <FileText size={18} className="text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900">94%</div>
              <div className="text-xs text-slate-500">Synced across Android devices</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase">Independent Students</span>
                <UserCheck size={18} className="text-amber-500" />
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {studentsList.filter(s => s.school === 'Independent / Homeschool').length}
              </div>
              <div className="text-xs text-slate-500">Unaffiliated learners</div>
            </div>
          </div>

          {/* Security & POPIA Compliance Advisory Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Smartphone size={18} />
                <span>POPIA Compliance & School Vault Architecture (Zero PII Central Storage)</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-500/30">
                Statutory Compliant
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To fully mitigate developer liability and comply with the South African Protection of Personal Information Act (POPIA):
              <br />
              • <strong>Zero PII Retention</strong>: The central Sifiso AI platform retains <em>only</em> student first names/identifiers for active tutoring session identification.
              <br />
              • <strong>School Vault Storage</strong>: All deep personal information, official student records, and sensitive school data remain securely stored inside the <strong>School's Internal Vault</strong>. Schools maintain full regulatory ownership and liability.
              <br />
              • <strong>Server-Side Security</strong>: API keys and backend code are never exposed to student devices when sharing URLs.
            </p>
          </div>

          {/* Misconception & AI Insights */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <AlertTriangle className="text-amber-500" size={20} />
                <h3>Sifiso AI Cohort Diagnostics ({selectedSchool})</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <div className="text-xs font-bold text-amber-800 uppercase">Attention Required ({selectedClassStream})</div>
                  <div className="text-sm font-semibold text-slate-900">Algebraic Fractions & Common Denominators</div>
                  <p className="text-xs text-slate-600">Students in {selectedClassStream} are struggling with factorisation before simplifying rational expressions.</p>
                </div>
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                  <div className="text-xs font-bold text-indigo-800 uppercase">Recommended Action</div>
                  <div className="text-sm font-semibold text-slate-900">Dispatch Targeted Practice Set</div>
                  <p className="text-xs text-slate-600">Send an interactive quiz directly to student phones via WhatsApp or app notification.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Award className="text-emerald-600" size={20} />
                <h3>Top Performers in {selectedSchool}</h3>
              </div>
              <div className="space-y-3">
                {studentsList.filter(s => s.school === selectedSchool).slice(0, 3).map((st, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                        {st.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{st.name}</div>
                        <div className="text-xs text-slate-500">{st.classStream} • {st.subjects.length} Subjects</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600">{st.score}</div>
                      <div className="text-[10px] text-slate-400">Mastery</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignments Tab Content */}
      {activeSubTab === 'assignments' && (
        <div className="grid sm:grid-cols-3 gap-8">
          {/* Create Assignment Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus size={20} className="text-indigo-600" /> Broadcast to {selectedSchool} ({selectedClassStream})
            </h3>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Assignment Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Euclidean Geometry Theorems Test"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Instructions & CAPS Guidelines</label>
                <textarea
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  rows={3}
                  placeholder="Provide step-by-step instructions or reference Sifiso AI solver modules..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Send size={16} /> Push to {selectedSchool} Class Devices
              </button>
            </form>
          </div>

          {/* Existing Assignments List */}
          <div className="sm:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Active Cohort Assignments & Quizzes</h3>
            <div className="space-y-3">
              {assignments.map((asg) => (
                <div key={asg.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:border-indigo-300 transition bg-slate-50/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md font-semibold">{asg.school}</span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md font-semibold">{asg.classStream}</span>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">{asg.subject}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{asg.title}</h4>
                    <p className="text-xs text-slate-500">Due Date: {asg.dueDate}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-bold text-slate-900">{asg.submitted} / {asg.total} Submitted</div>
                    <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${(asg.submitted / asg.total) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Students Roster Tab Content */}
      {activeSubTab === 'students' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Registered Students & Subjects ({selectedSchool} - {selectedClassStream})
              </h3>
              <p className="text-xs text-slate-500">Includes school cohorts and independent / individual registered learners.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddStudent(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Plus size={16} /> Register Student & Subjects
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search student..."
                  className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {showAddStudent && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-emerald-900 text-base">Register Student, School Cohort & Registered Subjects</h4>
                <button onClick={() => setShowAddStudent(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Student Full Name</label>
                    <input
                      type="text"
                      value={studentNameInput}
                      onChange={(e) => setStudentNameInput(e.target.value)}
                      placeholder="e.g. Sipho Dlamini"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">School / Institution</label>
                    <input
                      type="text"
                      value={studentSchoolInput}
                      onChange={(e) => setStudentSchoolInput(e.target.value)}
                      placeholder="e.g. Grey College or Independent"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Class Stream / Standard</label>
                    <input
                      type="text"
                      value={studentStreamInput}
                      onChange={(e) => setStudentStreamInput(e.target.value)}
                      placeholder="e.g. Grade 8 E1 or Individual"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Cell Phone (for WhatsApp link)</label>
                    <input
                      type="tel"
                      value={studentPhoneInput}
                      onChange={(e) => setStudentPhoneInput(e.target.value)}
                      placeholder="e.g. 082 123 4567"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email</label>
                    <input
                      type="email"
                      value={studentEmailInput}
                      onChange={(e) => setStudentEmailInput(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 bg-emerald-100/50 p-4 rounded-xl border border-emerald-200">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-900 uppercase mb-1">Parent / Guardian Full Name</label>
                    <input
                      type="text"
                      value={parentNameInput}
                      onChange={(e) => setParentNameInput(e.target.value)}
                      placeholder="e.g. Mr. & Mrs. Dlamini"
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-emerald-900 uppercase mb-1">Parent Cell Phone (for Progress & App Link)</label>
                    <input
                      type="tel"
                      value={parentPhoneInput}
                      onChange={(e) => setParentPhoneInput(e.target.value)}
                      placeholder="e.g. 082 987 6543"
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-sm bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Registered Subjects (Select all that apply)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {availableSubjectsList.map((subj) => {
                      const isChecked = studentSubjectsInput.includes(subj);
                      return (
                        <label key={subj} className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${isChecked ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold' : 'bg-white border-slate-200 text-slate-700'}`}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setStudentSubjectsInput([...studentSubjectsInput, subj]);
                              } else {
                                setStudentSubjectsInput(studentSubjectsInput.filter(s => s !== subj));
                              }
                            }}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="truncate">{subj}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddStudent(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-sm font-semibold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl text-sm font-semibold shadow-md cursor-pointer"
                  >
                    Save & Enable WhatsApp Link
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <th className="py-3 px-4">Student Name & School</th>
                  <th className="py-3 px-4">Class Stream</th>
                  <th className="py-3 px-4">Registered Subjects</th>
                  <th className="py-3 px-4">Mastery</th>
                  <th className="py-3 px-4">Student Contact</th>
                  <th className="py-3 px-4">Parent / Guardian Contact</th>
                  <th className="py-3 px-4 text-right">Instant Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {studentsList.map((st, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-xs shrink-0">
                          {st.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{st.name}</div>
                          <div className="text-xs text-indigo-600 font-medium">{st.school}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-1 rounded-md text-xs bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                        {st.classStream}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {st.subjects.map((sub, sidx) => (
                          <span key={sidx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium border border-slate-200">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{st.score}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">{st.phone}</td>
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-semibold text-slate-800">{st.parentName || 'Parent'}</div>
                      <div className="text-slate-500 font-mono text-xs">{st.parentPhone || 'N/A'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleWhatsAppShare(st.name, st.phone, st.school, st.classStream)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition inline-flex items-center gap-1 cursor-pointer"
                        title="Send app link to student via WhatsApp"
                      >
                        <MessageCircle size={13} /> Student
                      </button>
                      <button
                        onClick={() => handleParentWhatsAppShare(st.name, st.parentName || 'Parent', st.parentPhone || st.phone, st.school, st.classStream, st.score)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition inline-flex items-center gap-1 cursor-pointer"
                        title="Send progress & app link to parent via WhatsApp"
                      >
                        <Users size={13} /> Parent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
