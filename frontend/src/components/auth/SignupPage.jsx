import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, User, Stethoscope, AlertCircle, CheckCircle2 } from 'lucide-react';

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError('');
    setLoading(true);
    try {
      const user = await signup(form);
      if (user.role === 'doctor') navigate('/doctor');
      else navigate('/onboarding');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F6FAFF]">

      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#3835AC] via-indigo-600 to-cyan-500 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white"
              style={{ width: 200 + i * 120, height: 200 + i * 120, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          ))}
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-2">Au<span className="text-cyan-300">ris.</span></h1>
          <p className="text-indigo-200 text-sm font-medium">Your AI Health Companion</p>
        </div>
        <div className="relative z-10 space-y-3">
          {['AI-powered clinical reports', 'Real-time health telemetry', 'Secure doctor–patient messaging', 'Personalised disability support'].map(f => (
            <div key={f} className="flex items-center gap-2 text-white text-sm">
              <CheckCircle2 className="w-4 h-4 text-cyan-300 flex-shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>
        <p className="relative z-10 text-indigo-200 text-xs">By signing up you agree to Auris Terms of Service and Privacy Policy.</p>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Create your account</h2>
            <p className="text-slate-500">Join Auris — it takes under 2 minutes</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Role Picker */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { value: 'patient', label: 'I\'m a Patient', Icon: User, desc: 'Track health & get AI support' },
              { value: 'doctor', label: 'I\'m a Doctor', Icon: Stethoscope, desc: 'View patient reports & message' },
            ].map(({ value, label, Icon, desc }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, role: value })}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  form.role === value
                    ? 'border-[#3835AC] bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-indigo-200'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${form.role === value ? 'text-[#3835AC]' : 'text-slate-400'}`} />
                <p className={`text-sm font-bold ${form.role === value ? 'text-[#3835AC]' : 'text-slate-700'}`}>{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text" required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3835AC]/40 focus:border-[#3835AC] shadow-sm"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3835AC]/40 focus:border-[#3835AC] shadow-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3835AC]/40 focus:border-[#3835AC] shadow-sm"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-[#3835AC] text-white font-bold rounded-xl hover:bg-indigo-800 transition shadow-sm disabled:opacity-60 text-sm mt-2"
            >
              {loading ? 'Creating account…' : `Create ${form.role === 'doctor' ? 'Doctor' : 'Patient'} Account`}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3835AC] font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
