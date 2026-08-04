import React, { useState } from 'react';
import { Award, Briefcase, DollarSign, Megaphone, CheckCircle2, ShieldCheck, Heart, Sparkles, Building, Globe, Send } from 'lucide-react';

export function SponsorBoardView() {
  const [activeTabSub, setActiveTabSub] = useState<'sponsors' | 'advertise' | 'school-tiers'>('school-tiers');
  
  // Ad application form state
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [adTier, setAdTier] = useState('Standard Banner (R750 / month)');
  const [adMessage, setAdMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // School tier application state
  const [schoolNameInput, setSchoolNameInput] = useState('');
  const [principalName, setPrincipalName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [tierType, setTierType] = useState('paying');
  const [estStudentsPerGrade, setEstStudentsPerGrade] = useState('65');
  const [schoolSubmitted, setSchoolSubmitted] = useState(false);

  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactEmail) return;
    setSubmitted(true);
  };

  const handleSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolNameInput || !schoolEmail) return;
    setSchoolSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/30">
            <Award size={14} /> Sponsor & Revenue Strategy Board
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Partnerships, Sponsorships & School Tiers</h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Empowering South African students from Grade 5 to Grade 12 through transparent school tiers, paying models, sponsored access, and institutional deployments.
          </p>

          <div className="flex gap-2 pt-2 flex-wrap">
            <button
              onClick={() => setActiveTabSub('school-tiers')}
              className={`px-4 py-2 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTabSub === 'school-tiers' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Building size={15} /> School Tiers & Registration
            </button>
            <button
              onClick={() => setActiveTabSub('sponsors')}
              className={`px-4 py-2 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTabSub === 'sponsors' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Heart size={15} /> Sponsor Acknowledgement Board
            </button>
            <button
              onClick={() => setActiveTabSub('advertise')}
              className={`px-4 py-2 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTabSub === 'advertise' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Megaphone size={15} /> Advertiser Space & Income
            </button>
          </div>
        </div>
      </div>

      {/* 0. SCHOOL TIERS & REGISTRATION */}
      {activeTabSub === 'school-tiers' && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Institutional Integration</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">School Registration Tiers & Subsidy Framework</h2>
              <p className="text-sm text-slate-500">Tailored participation options for paying schools, sponsored non-paying schools, and fee-waiver schools.</p>
            </div>

            {/* 3 Tiers Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">Paying School Tier</div>
                  <h3 className="font-bold text-slate-900 text-lg">Standard Fixed Fee School</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed for established public and private schools with dedicated ed-tech budgets. Provides full multi-grade access (Gr 5-12), teacher dashboards, and priority support.
                  </p>
                  <div className="text-lg font-extrabold text-indigo-600">R149 / student / year</div>
                </div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  ✓ Instant activation & priority server allocation
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">Non-Paying / Sponsored</div>
                  <h3 className="font-bold text-slate-900 text-lg">CSI Corporate Sponsored</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    For schools that cannot afford standard licensing. Registered at a subsidized minimum contribution rate covered by our corporate CSI partners (MTN, Sasol, Investec).
                  </p>
                  <div className="text-lg font-extrabold text-amber-700">Subsidized / Sponsored</div>
                </div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  ✓ Full access backed by foundation partners
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Fee-Waiver Exchange</div>
                  <h3 className="font-bold text-slate-900 text-lg">Underprivileged School Waiver</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Exempted from all platform fees in exchange for registering a <strong>minimum of 60 students per grade</strong>, ensuring high-impact digital learning reach across township and rural schools.
                  </p>
                  <div className="text-lg font-extrabold text-emerald-700">100% Fee Waiver</div>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-2 border-t border-slate-200">
                  ✓ Min 60 students per grade commitment
                </div>
              </div>
            </div>

            {/* School Registration Form */}
            <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-200 space-y-6">
              <div className="border-b border-indigo-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">Apply or Register Your School Now</h3>
                <p className="text-xs text-slate-600">Select your preferred tier and submit details for institutional onboarding.</p>
              </div>

              {schoolSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-lg">School Application Submitted Successfully!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Thank you, <strong>{principalName}</strong> from <strong>{schoolNameInput}</strong>. Our school partnerships team will verify your tier selection and dispatch WhatsApp onboarding links to <strong>{schoolEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setSchoolSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Register Another School
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSchoolSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">School Name *</label>
                      <input
                        type="text"
                        value={schoolNameInput}
                        onChange={(e) => setSchoolNameInput(e.target.value)}
                        placeholder="e.g. Orlando West Secondary School"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Principal / HOD Full Name *</label>
                      <input
                        type="text"
                        value={principalName}
                        onChange={(e) => setPrincipalName(e.target.value)}
                        placeholder="e.g. Dr. V. Mokoena"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Official School Email *</label>
                      <input
                        type="email"
                        value={schoolEmail}
                        onChange={(e) => setSchoolEmail(e.target.value)}
                        placeholder="e.g. info@orlandowest.edu.za"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Registration Tier</label>
                      <select
                        value={tierType}
                        onChange={(e) => setTierType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      >
                        <option value="paying">Paying School (Standard Fixed Fee)</option>
                        <option value="sponsored">Non-Paying School (Apply for CSI Sponsorship)</option>
                        <option value="waiver">Fee-Waiver School (Min 60 Students per Grade)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Est. Students per Grade</label>
                      <input
                        type="text"
                        value={estStudentsPerGrade}
                        onChange={(e) => setEstStudentsPerGrade(e.target.value)}
                        placeholder="e.g. 75"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                  </div>

                  {tierType === 'waiver' && (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900">
                      <strong>Fee-Waiver Commitment Agreement:</strong> By selecting this option, your school commits to registering a minimum of 60 students per grade for the Sifiso AI Tutor evaluation and learning program in exchange for 100% fee exemption.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Building size={16} /> Submit School Registration / Waiver Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}



      {/* 2. SPONSOR ACKNOWLEDGEMENT BOARD */}
      {activeTabSub === 'sponsors' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Community & CSI Recognition</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Our Esteemed Sponsors & Donors</h2>
              <p className="text-sm text-slate-500">Thank you to the organizations and individuals sponsoring access for underprivileged learners across South Africa.</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Sponsor Card 1 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow">
                    MT
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">MTN SA Foundation</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sponsored data connectivity and 1,200 student licenses across Gauteng and Limpopo schools.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-indigo-600">Platinum Partner</span>
                  <span>1,200 Students</span>
                </div>
              </div>

              {/* Sponsor Card 2 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow">
                    SZ
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Sasol STEM Trust</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Empowering Grade 10-12 Mathematics and Physical Sciences learners with Sifiso AI Tutoring.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Gold Partner</span>
                  <span>850 Students</span>
                </div>
              </div>

              {/* Sponsor Card 3 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow">
                    IV
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Investec Education</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Supporting teacher dashboards and parental engagement modules in the Free State and Western Cape.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-amber-600">Silver Partner</span>
                  <span>500 Students</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-200 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-bold text-indigo-900 text-sm">Want to sponsor a school or classroom?</h4>
                <p className="text-xs text-indigo-700">Sponsor 30 students for just R2,970/year and empower an entire class with AI tutoring.</p>
              </div>
              <button
                onClick={() => setActiveTabSub('advertise')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow"
              >
                Become a Sponsor / Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. ADVERTISER SPACE & INCOME */}
      {activeTabSub === 'advertise' && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ad Pricing & Slots */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Extra Income Stream</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Advertise on Sifiso AI Tutor</h2>
              <p className="text-sm text-slate-500">Reach thousands of South African students, parents, and educators daily.</p>
            </div>

            <div className="space-y-4">
              {/* Tier 1 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Dashboard Banner Ad</h3>
                  <p className="text-xs text-slate-500">Top-view banner displayed on student and parent dashboards.</p>
                </div>
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl">R750 / mo</span>
              </div>

              {/* Tier 2 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Revision Library Sponsor</h3>
                  <p className="text-xs text-slate-500">Featured placement in CAPS exam prep and past paper modules.</p>
                </div>
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl">R1,200 / mo</span>
              </div>

              {/* Tier 3 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Exclusive University / Bursary Spotlight</h3>
                  <p className="text-xs text-slate-500">Dedicated card in Career & APS calculator for higher ed recruitment.</p>
                </div>
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl">R2,500 / mo</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold">💡 Developer Benefit:</span> Advertising revenue subsidizes server infrastructure costs, allowing student access to remain heavily discounted or sponsored.
            </div>
          </div>

          {/* Ad Application Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Submit an Ad or Sponsorship Inquiry</h2>
              <p className="text-sm text-slate-500">Fill in your details and our partnership team will contact you within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-lg">Inquiry Received Successfully!</h3>
                <p className="text-xs text-emerald-700">Thank you for partnering with Sifiso AI Tutor. We have sent confirmation to <strong>{contactEmail}</strong>.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Company / Organization Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Educational Publishers"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Contact Email *</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. marketing@acme.co.za"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Ad Space Tier</label>
                  <select
                    value={adTier}
                    onChange={(e) => setAdTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Dashboard Banner (R750 / month)">Dashboard Banner (R750 / month)</option>
                    <option value="Revision Library Sponsor (R1,200 / month)">Revision Library Sponsor (R1,200 / month)</option>
                    <option value="University / Bursary Spotlight (R2,500 / month)">University / Bursary Spotlight (R2,500 / month)</option>
                    <option value="Full Classroom Sponsor (R2,970 / year)">Full Classroom Sponsor (R2,970 / year)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Message or Campaign Details</label>
                  <textarea
                    value={adMessage}
                    onChange={(e) => setAdMessage(e.target.value)}
                    placeholder="Describe your banner text, target grade level (Grade 5-12), or sponsorship goals..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} /> Submit Partnership Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
