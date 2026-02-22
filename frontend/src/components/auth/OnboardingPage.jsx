import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const DISABILITIES = [
  'Mobility Impairment', 'Spinal Cord Injury', 'Multiple Sclerosis',
  'Cerebral Palsy', 'Chronic Pain', 'Arthritis / Joint Disease',
  'Visual Impairment', 'Hearing Impairment', 'Neurological Condition',
  'Cognitive / Memory Issues', 'Respiratory Condition', 'Diabetes',
  'Cardiovascular Disease', 'Mental Health Condition', 'Other'
];

const GOALS = [
  'Reduce pain levels', 'Improve sleep quality', 'Increase daily mobility',
  'Better medication management', 'Get AI health insights',
  'Share reports with my doctor', 'Track long-term trends', 'Manage stress & anxiety'
];

const STEPS = ['About You', 'Condition', 'Daily Living', 'Medications & Goals', 'Emergency Contact', 'All Set!'];

const SliderInput = ({ label, value, onChange, min = 1, max = 10, color }) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <span className={`text-sm font-black ${color}`}>{value}/10</span>
    </div>
    <input type="range" min={min} max={max} value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#06b6d4]"
    />
    <div className="flex justify-between text-xs text-slate-400 mt-1">
      <span>{min === 1 ? 'Low' : min}</span>
      <span>{max === 10 ? 'High' : max}</span>
    </div>
  </div>
);

const Chip = ({ label, selected, onClick }) => (
  <button type="button" onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
      selected
        ? 'bg-[#06b6d4] text-white border-[#06b6d4] shadow-sm'
        : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-[#06b6d4]'
    }`}>
    {label}
  </button>
);

const OnboardingPage = () => {
  const { saveOnboarding, user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    age: '',
    gender: '',
    primaryCondition: '',
    conditionDuration: '',
    disabilities: [],
    mobilityLevel: 5,
    painLevel: 5,
    sleepQuality: 'fair',
    currentMedications: [],
    medInput: '',
    goals: [],
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const toggle = (field, value) => {
    setData(d => ({
      ...d,
      [field]: d[field].includes(value)
        ? d[field].filter(v => v !== value)
        : [...d[field], value]
    }));
  };

  const addMed = () => {
    if (!data.medInput.trim()) return;
    setData(d => ({ ...d, currentMedications: [...d.currentMedications, d.medInput.trim()], medInput: '' }));
  };

  const removeMed = (m) => setData(d => ({ ...d, currentMedications: d.currentMedications.filter(x => x !== m) }));

  const handleFinish = async () => {
    setSaving(true);
    try {
      const { medInput, ...bioData } = data;
      await saveOnboarding(bioData);
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const pct = Math.round((step / (STEPS.length - 1)) * 100);

  const stepContent = [
    // Step 0: About You
    <div key="0" className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Age</label>
        <input type="number" min="1" max="120"
          value={data.age} onChange={e => setData({ ...data, age: e.target.value })}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/40 focus:border-[#06b6d4]"
          placeholder="e.g. 38" />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
        <div className="flex gap-3 flex-wrap">
          {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => (
            <button key={g} type="button"
              onClick={() => setData({ ...data, gender: g })}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                data.gender === g ? 'bg-[#06b6d4] text-white border-[#06b6d4]' : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-200'
              }`}>{g}</button>
          ))}
        </div>
      </div>
    </div>,

    // Step 1: Condition
    <div key="1" className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Primary Condition / Diagnosis</label>
        <input type="text"
          value={data.primaryCondition} onChange={e => setData({ ...data, primaryCondition: e.target.value })}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/40 focus:border-[#06b6d4]"
          placeholder="e.g. Rheumatoid Arthritis, MS, Spinal Cord Injury…" />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">How long have you had this condition?</label>
        <select value={data.conditionDuration} onChange={e => setData({ ...data, conditionDuration: e.target.value })}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/40 focus:border-[#06b6d4] bg-white">
          <option value="">Select duration</option>
          {['Less than 6 months', '6–12 months', '1–3 years', '3–5 years', '5–10 years', '10+ years'].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Disability categories (select all that apply)</label>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
          {DISABILITIES.map(d => (
            <Chip key={d} label={d} selected={data.disabilities.includes(d)} onClick={() => toggle('disabilities', d)} />
          ))}
        </div>
      </div>
    </div>,

    // Step 2: Daily Living
    <div key="2" className="space-y-6">
      <SliderInput label="Current Mobility Level" value={data.mobilityLevel}
        onChange={v => setData({ ...data, mobilityLevel: v })}
        color={data.mobilityLevel >= 7 ? 'text-emerald-600' : data.mobilityLevel >= 4 ? 'text-amber-600' : 'text-red-600'} />
      <SliderInput label="Current Pain Level" value={data.painLevel}
        onChange={v => setData({ ...data, painLevel: v })}
        color={data.painLevel >= 7 ? 'text-red-600' : data.painLevel >= 4 ? 'text-amber-600' : 'text-emerald-600'} />
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Average Sleep Quality</label>
        <div className="flex gap-3">
          {[{ v: 'poor', l: '😴 Poor', c: 'text-red-600' }, { v: 'fair', l: '😐 Fair', c: 'text-amber-600' }, { v: 'good', l: '😊 Good', c: 'text-emerald-600' }].map(({ v, l }) => (
            <button key={v} type="button"
              onClick={() => setData({ ...data, sleepQuality: v })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                data.sleepQuality === v ? 'bg-[#06b6d4] text-white border-[#06b6d4]' : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-200'
              }`}>{l}</button>
          ))}
        </div>
      </div>
    </div>,

    // Step 3: Medications + Goals
    <div key="3" className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Current Medications</label>
        <div className="flex gap-2">
          <input type="text" value={data.medInput}
            onChange={e => setData({ ...data, medInput: e.target.value })}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addMed(); } }}
            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/40 focus:border-[#06b6d4]"
            placeholder="Type medication name + Enter" />
          <button type="button" onClick={addMed}
            className="px-4 py-2.5 bg-[#06b6d4] text-white rounded-xl text-sm font-bold hover:bg-cyan-800">Add</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.currentMedications.map(m => (
            <span key={m} className="flex items-center gap-1 bg-cyan-50 text-[#06b6d4] text-xs font-semibold px-3 py-1 rounded-full border border-cyan-200">
              {m}
              <button type="button" onClick={() => removeMed(m)} className="hover:text-red-500 ml-1 font-black">×</button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Your Health Goals</label>
        <div className="flex flex-wrap gap-2">
          {GOALS.map(g => (
            <Chip key={g} label={g} selected={data.goals.includes(g)} onClick={() => toggle('goals', g)} />
          ))}
        </div>
      </div>
    </div>,

    // Step 4: Emergency Contact
    <div key="4" className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Emergency Contact Name</label>
        <input type="text" value={data.emergencyContactName}
          onChange={e => setData({ ...data, emergencyContactName: e.target.value })}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/40 focus:border-[#06b6d4]"
          placeholder="Full name" />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Emergency Contact Phone</label>
        <input type="tel" value={data.emergencyContactPhone}
          onChange={e => setData({ ...data, emergencyContactPhone: e.target.value })}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/40 focus:border-[#06b6d4]"
          placeholder="+44 7700 000000" />
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700">
        This information is stored securely and only used in case of an emergency alert triggered by Auris.
      </div>
    </div>,

    // Step 5: Completion
    <div key="5" className="text-center py-8 flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#06b6d4] to-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-cyan-200">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-3">You're all set, {user?.name?.split(' ')[0]}!</h3>
      <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
        Your health profile is ready. Auris will now personalise your AI insights, reminders, and doctor reports based on your data.
      </p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs text-left">
        {['AI health nudges', 'Doctor report access', 'Personalised reminders', 'Telemetry tracking'].map(f => (
          <div key={f} className="flex items-center gap-1.5 text-xs text-cyan-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> {f}
          </div>
        ))}
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-[#F6FAFF] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-1">Au<span className="text-cyan-500">ris.</span></h1>
          <p className="text-slate-400 text-sm">Setting up your health profile</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Step {step + 1} of {STEPS.length}</span>
            <span className="font-bold text-[#06b6d4]">{STEPS[step]}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#06b6d4] to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((s, i) => (
              <div key={s} className={`w-2 h-2 rounded-full transition-all ${i <= step ? 'bg-[#06b6d4]' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-6">
          <h2 className="text-xl font-black text-slate-900 mb-6">{STEPS[step]}</h2>
          {stepContent[step]}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && step < STEPS.length - 1 && (
            <button type="button" onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (step < STEPS.length - 2) setStep(s => s + 1);
              else if (step === STEPS.length - 2) setStep(s => s + 1);
              else handleFinish();
            }}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#06b6d4] text-white font-bold rounded-xl hover:bg-cyan-800 transition shadow-sm disabled:opacity-60 text-sm"
          >
            {step === STEPS.length - 1
              ? (saving ? 'Saving…' : 'Go to My Dashboard →')
              : step === STEPS.length - 2
              ? 'See Summary'
              : (<>Continue <ChevronRight className="w-4 h-4" /></>)
            }
          </button>
        </div>

        {/* Skip option */}
        {step < STEPS.length - 1 && (
          <p className="text-center mt-4 text-xs text-slate-400">
            <button type="button" onClick={() => setStep(STEPS.length - 1)} className="hover:text-slate-600 underline underline-offset-2">
              Skip for now
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
