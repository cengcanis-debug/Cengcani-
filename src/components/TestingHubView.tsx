import React, { useState } from 'react';
import { ShieldCheck, Smartphone, CheckCircle2, FileText, Users, MessageSquare, ArrowRight, HelpCircle, AlertCircle, Building2, Calendar, Share2, Copy, Send, Check } from 'lucide-react';

export function TestingHubView() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [isHomeschool, setIsHomeschool] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const [broadcastAudience, setBroadcastAudience] = useState<'all' | 'schools' | 'homeschool'>('all');
  const [copied, setCopied] = useState(false);

  const getTemplateText = (aud: 'all' | 'schools' | 'homeschool') => {
    if (aud === 'schools') {
      return "🚨 *Sifiso AI Tutor: Official School Pilot Testing & Activation Link* 🏫\n\nAttention School Principals, SGBs & Educators! You are invited to join the 3-Month Free Pilot Evaluation Program for South African CAPS & IEB learners.\n\n✨ *Benefits:* AI Homework Tutor, Exam Simulator & Offline Revision.\n💰 *Fees:* 100% Free during testing period.\n\n👉 *Activate School Access Now:* https://ais-pre-vgwxccnlwsqpw57xru2voc-66007226743.europe-west2.run.app";
    }
    if (aud === 'homeschool') {
      return "🏡 *Sifiso AI Tutor: Independent & Homeschooling Pilot Activation* 📚\n\nAre you homeschooling your child? Register alone without traditional school affiliation and enjoy 3 months of unlimited AI tutoring and curriculum test prep!\n\n✨ *100% Free Trial* (Fees inactive during pilot).\n👉 *Activate Home Education Access Now:* https://ais-pre-vgwxccnlwsqpw57xru2voc-66007226743.europe-west2.run.app";
    }
    return "🚀 *Sifiso AI Tutor & Student App: Official 3-Month Test Link* 📱\n\nJoin the official South African student evaluation program! Get 90 days of full access to CAPS/IEB AI tutoring, automated test planners, and exam simulators.\n\n✅ *Fees:* NOT active (100% Free Evaluation).\n👉 *Activate Your Device Now:* https://ais-pre-vgwxccnlwsqpw57xru2voc-66007226743.europe-west2.run.app";
  };

  const [broadcastText, setBroadcastText] = useState(getTemplateText('all'));

  const handleAudienceChange = (aud: 'all' | 'schools' | 'homeschool') => {
    setBroadcastAudience(aud);
    setBroadcastText(getTemplateText(aud));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(broadcastText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms || !parentName || !parentPhone || !studentName) {
      alert('Please fill in all required fields and accept the pilot testing terms & conditions.');
      return;
    }
    setRegisteredSuccess(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3.5 py-1 rounded-full text-xs font-semibold border border-indigo-500/30">
            <ShieldCheck size={14} /> Official Pilot Testing & Registration Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Parent & School Pilot Testing Portal</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Welcome to the Sifiso AI Tutor & Student App 3-Month Evaluation Program. Register below to receive your instant WhatsApp activation link and review official participation terms for parents, guardians, and schools.
          </p>
        </div>
      </div>

      {/* Quick Access Guidance for Parents */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">1</div>
          <h3 className="font-bold text-slate-900 text-base">Register Learner</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fill in the parent and learner registration form below with your WhatsApp mobile number.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">2</div>
          <h3 className="font-bold text-slate-900 text-base">WhatsApp Activation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Receive your secure 3-month activation token instantly via WhatsApp for effortless one-tap app setup.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">3</div>
          <h3 className="font-bold text-slate-900 text-base">3-Month Evaluation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enjoy full access to CAPS/IEB curriculum AI tutoring, test planners, and offline practice for 90 days.
          </p>
        </div>
      </div>

      {/* Public Sharing & Activation Advisory Box */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-sm">
            <AlertCircle size={22} />
          </div>
          <div>
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">Public Rollout & Activation Strategy</span>
            <h3 className="text-lg font-bold text-amber-950">Important Advisory: Fees Inactive & Go-Live Plan</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-xs text-amber-900 leading-relaxed pt-2">
          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200/60 space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
              <Smartphone size={16} className="text-amber-700" /> How to Share with the Public & Schools
            </h4>
            <p>
              Share the web preview link or APK download page via <strong>WhatsApp parent broadcast groups</strong>, school governing body (SGB) meetings, and teacher WhatsApp circles. Display QR code posters at school assembly points and reception desks for instant parent onboarding.
            </p>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200/60 space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
              <ShieldCheck size={16} className="text-amber-700" /> Fee Suspension & Early Go-Live Notice
            </h4>
            <p>
              Please note that <strong>subscription fees are NOT activated at this stage</strong>. All testing is 100% free of charge. The application may officially <strong>go live before the 3-month testing period expires</strong>, at which point active pilot participants will transition smoothly with grandfathered benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Common WhatsApp Activation Link Generator for Schools & Independent Learners */}
      <div className="bg-white rounded-3xl p-8 border border-indigo-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Share2 size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Administrator & Coordinator Tool</span>
              <h3 className="text-xl font-bold text-slate-900">Common WhatsApp Activation Link Generator</h3>
            </div>
          </div>
          <span className="bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-full text-xs font-semibold border border-indigo-100">
            For Schools & Independent Learners
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Generate and customize a ready-to-broadcast WhatsApp message template. You can share this common link across school teacher groups, SGB parent networks, and independent homeschooling channels so participants can register instantly for the 3-month testing period.
        </p>

        {/* Audience Selector Tabs */}
        <div className="grid sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleAudienceChange('all')}
            className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${broadcastAudience === 'all' ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold' : 'border-slate-200 bg-slate-50/50 text-slate-700 font-medium hover:bg-slate-100'}`}
          >
            <Smartphone size={18} className={broadcastAudience === 'all' ? 'text-indigo-600' : 'text-slate-500'} />
            <div>
              <div className="text-xs">General Pilot Broadcast</div>
              <div className="text-[11px] font-normal text-slate-500">All Parents & Students</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleAudienceChange('schools')}
            className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${broadcastAudience === 'schools' ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold' : 'border-slate-200 bg-slate-50/50 text-slate-700 font-medium hover:bg-slate-100'}`}
          >
            <Building2 size={18} className={broadcastAudience === 'schools' ? 'text-indigo-600' : 'text-slate-500'} />
            <div>
              <div className="text-xs">School Principals & SGBs</div>
              <div className="text-[11px] font-normal text-slate-500">Official Institutional Rollout</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleAudienceChange('homeschool')}
            className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${broadcastAudience === 'homeschool' ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold' : 'border-slate-200 bg-slate-50/50 text-slate-700 font-medium hover:bg-slate-100'}`}
          >
            <Users size={18} className={broadcastAudience === 'homeschool' ? 'text-indigo-600' : 'text-slate-500'} />
            <div>
              <div className="text-xs">Independent Learners</div>
              <div className="text-[11px] font-normal text-slate-500">Homeschooling / Solo Test</div>
            </div>
          </button>
        </div>

        {/* Editable Message Box */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase">Customizable WhatsApp Broadcast Message & Link Template</label>
          <textarea
            rows={5}
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-300 text-xs sm:text-sm font-mono text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Calendar size={14} className="text-indigo-600" />
            <span>Valid for 3 months (90 days) free pilot testing</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Broadcast Message'}</span>
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(broadcastText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>Broadcast via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Registration Form & WhatsApp Gateway */}
      <div className="bg-white rounded-3xl p-8 border border-indigo-200 shadow-lg space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Instant Pilot Access</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Parent & Guardian Registration Form</h2>
          </div>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Calendar size={14} /> 3-Month Test Link Validity
          </span>
        </div>

        {registeredSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center space-y-4">
            <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-emerald-900">Registration Successful!</h3>
            <p className="text-sm text-emerald-800 max-w-lg mx-auto">
              Your 3-month trial link for <strong>{studentName}</strong> has been generated successfully. You can now activate via WhatsApp instantly.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hello ${parentName}! Here is your official 3-Month Valid WhatsApp Activation Link for Sifiso AI Tutor & Student App for ${studentName}: https://ais-pre-vgwxccnlwsqpw57xru2voc-66007226743.europe-west2.run.app (Valid for 90 Days)`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition shadow"
              >
                <MessageSquare size={18} /> Open WhatsApp to Send & Activate
              </a>
              <button
                onClick={() => setRegisteredSuccess(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-2xl text-sm font-semibold"
              >
                Register Another Learner
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Parent / Guardian Full Name *</label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Thandiwe Mkhize"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">WhatsApp Mobile Number (for Activation) *</label>
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="e.g. +27 82 123 4567"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Learner / Student Full Name *</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Sipho Mkhize"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase">School Name & Grade {!isHomeschool && '*'}</label>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-indigo-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isHomeschool}
                      onChange={(e) => {
                        setIsHomeschool(e.target.checked);
                        if (e.target.checked) setSchoolName('Homeschool / Independent Study');
                        else setSchoolName('');
                      }}
                      className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    Homeschooling Student
                  </label>
                </div>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder={isHomeschool ? "e.g. Grade 9 Home Education" : "e.g. Soweto Secondary, Grade 10"}
                  required={!isHomeschool}
                  disabled={isHomeschool}
                  className={`w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isHomeschool ? 'bg-slate-100 text-slate-600 cursor-not-allowed' : 'bg-white'}`}
                />
                {isHomeschool && (
                  <p className="text-[11px] text-indigo-600 mt-1">
                    ✓ Homeschooling mode active. You can register alone without traditional school affiliation.
                  </p>
                )}
              </div>
            </div>

            {/* Draft Terms & Conditions Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="text-indigo-600" size={18} />
                <h4 className="font-bold text-slate-900 text-sm">Draft Terms & Conditions for Pilot Testing (Parents, Guardians & Schools)</h4>
              </div>

              <div className="text-xs text-slate-600 space-y-2 max-h-48 overflow-y-auto pr-2 leading-relaxed">
                <p><strong>1. Purpose of Pilot Evaluation:</strong> This application is provided as part of an official 3-month evaluation program for South African learners following CAPS and IEB curricula.</p>
                <p><strong>2. Test Link Validity (90 Days):</strong> All activation links and trial APK downloads dispatched via WhatsApp or SMS remain fully active for exactly 3 (three) months from the date of issuance. Upon completion of the 3-month window, users may transition to standard school licensing.</p>
                <p><strong>3. WhatsApp Activation Protocol:</strong> To ensure ease of use and zero complex IT onboarding, activation is managed via secure WhatsApp messaging tokens sent directly to the registered parent or guardian mobile number.</p>
                <p><strong>4. Data Privacy & POPIA Compliance:</strong> Sifiso AI adheres strictly to the Protection of Personal Information Act (POPIA). Student academic progress and chat interactions are encrypted and never sold or shared with commercial third parties.</p>
                <p><strong>5. School & Teacher Collaboration:</strong> Participating schools and educators retain oversight of curriculum alignment, test timetables, and student progress metrics through the teacher dashboard.</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-xs font-bold text-slate-800 cursor-pointer">
                  I have read and agree to the 3-Month Pilot Testing Terms & Conditions, Privacy Policy, and WhatsApp activation guidelines.
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!acceptedTerms}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-8 py-3.5 rounded-2xl transition shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Register & Generate WhatsApp Activation Link</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
