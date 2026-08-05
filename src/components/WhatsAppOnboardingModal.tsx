import React, { useState } from 'react';
import { MessageSquare, Send, Copy, Check, Sparkles, User, School, Phone, Smartphone, ArrowRight, X } from 'lucide-react';

interface WhatsAppOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppOnboardingModal({ isOpen, onClose }: WhatsAppOnboardingModalProps) {
  const [targetType, setTargetType] = useState<'student' | 'school' | 'parent' | 'group'>('student');
  const [recipientName, setRecipientName] = useState<string>('Sipho Dlamini');
  const [phoneNumber, setPhoneNumber] = useState<string>('27821234567');
  const [schoolName, setSchoolName] = useState<string>('Soweto High School');
  const [gradeLevel, setGradeLevel] = useState<string>('Grade 10');
  const [subjectFocus, setSubjectFocus] = useState<string>('Mathematics & Physical Sciences');
  const [copied, setCopied] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const baseUrl = window.location.origin;
  const encodedSchool = encodeURIComponent(schoolName);
  const encodedGrade = encodeURIComponent(gradeLevel);
  const encodedRecipient = encodeURIComponent(recipientName);
  const uniqueInviteId = `sf-inv-${Math.random().toString(36).substring(2, 8)}-${Date.now().toString(36)}`;
  
  // Unique invite URL with UTM parameters, unique invite ID, and school/mentor refs
  const uniqueInviteUrl = `${baseUrl}/?utm_source=whatsapp&utm_medium=${targetType}&invite_id=${uniqueInviteId}&school=${encodedSchool}&grade=${encodedGrade}&ref=${encodedRecipient}`;

  const generateMessage = () => {
    switch (targetType) {
      case 'student':
        return `Sawubona ${recipientName}! 🇿🇦 Welcome to Sifiso AI Tutor (${gradeLevel} ${subjectFocus}). You're registered without any email hassle! Click your instant access link to start practicing CAPS & IEB past papers with your Socratic AI mentor:\n\n${uniqueInviteUrl}\n\nSharp sharp, let's ace these exams together! 🚀`;
      case 'school':
        return `Greetings Principal / HOD at ${schoolName} 🏫. We are excited to onboard ${recipientName} and your ${gradeLevel} learners onto Sifiso AI Tutor. Bypass traditional email registration completely via this instant WhatsApp access portal:\n\n${uniqueInviteUrl}\n\nEmpower your students with offline-ready CAPS/IEB tutoring today! ✨`;
      case 'parent':
        return `Dear Parent / Guardian of ${recipientName} 👨‍👩‍👧‍👦, Sifiso AI Tutor is ready for ${gradeLevel} at ${schoolName}! No email passwords needed. Access your child's learning portal and homework tracker instantly here:\n\n${uniqueInviteUrl}\n\nStay connected with their academic progress! 📊`;
      case 'group':
        return `📚 *SIFISO AI TUTOR - WHATSAPP STUDY GROUP REGISTRATION* 🇿🇦\n\nCalling all ${gradeLevel} students at ${schoolName}! Join our instant WhatsApp-connected study circle for ${subjectFocus}.\n\n✅ Zero email registration required\n✅ Socratic AI Tutoring 24/7\n✅ CAPS & IEB Aligned past papers\n\n👉 Click to join & launch your portal:\n${uniqueInviteUrl}\n\nSharp sharp! 🚀`;
    }
  };

  const currentMessage = generateMessage();
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const whatsappDeepLink = targetType === 'group' 
    ? `https://wa.me/?text=${encodeURIComponent(currentMessage)}`
    : `https://wa.me/${cleanPhone}?text=${encodeURIComponent(currentMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage).then(() => {
      setCopied(true);
      setSuccessMessage('Message copied to clipboard successfully!');
      setTimeout(() => {
        setCopied(false);
        setSuccessMessage('');
      }, 3000);
    }).catch(() => {
      setSuccessMessage('Failed to copy. Please select text manually.');
    });
  };

  const handleOpenWhatsApp = () => {
    navigator.clipboard.writeText(currentMessage).catch(() => {});
    const newWindow = window.open(whatsappDeepLink, '_blank');
    if (!newWindow) {
      setSuccessMessage('Popup blocked! Message has been copied to your clipboard. Paste it directly in WhatsApp.');
    } else {
      setSuccessMessage('WhatsApp deep link opened successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 border border-white/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-tight">WhatsApp Deep-Link & Onboarding Utility</h3>
              <p className="text-xs text-emerald-200">Bypass traditional email registration with instant WhatsApp invitation links</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Target Audience Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Registration & Deep-Link Flow
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'student', label: 'Student', icon: User },
                { id: 'school', label: 'School / HOD', icon: School },
                { id: 'parent', label: 'Parent / Guardian', icon: Phone },
                { id: 'group', label: 'Study Group Broadcast', icon: Smartphone },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = targetType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setTargetType(tab.id as any)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${active ? 'text-emerald-700' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Sipho Dlamini"
              />
            </div>

            {targetType !== 'group' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Mobile Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 27821234567"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Soweto High School"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Grade Level & Focus</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-1/2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Grade 10"
                />
                <input
                  type="text"
                  value={subjectFocus}
                  onChange={(e) => setSubjectFocus(e.target.value)}
                  className="w-1/2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Mathematics"
                />
              </div>
            </div>
          </div>

          {/* Generated Message Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Generated WhatsApp Deep-Link Message
              </label>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-500" /> Instant Bypass Onboarding
              </span>
            </div>
            <div className="relative bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner max-h-40 overflow-y-auto">
              {currentMessage}
            </div>
          </div>

          {successMessage && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-300"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Deep-Link Message'}</span>
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Open in WhatsApp Now 🚀</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 text-center bg-slate-50 p-3 rounded-xl border border-slate-200">
            ℹ️ **Why WhatsApp Deep-Links?** Traditional email registration requires password creation and inbox confirmation which often fails in mobile field tests. WhatsApp deep-links enable 1-click instant access directly into the Sifiso AI Tutor PWA.
          </div>

        </div>

      </div>
    </div>
  );
}
