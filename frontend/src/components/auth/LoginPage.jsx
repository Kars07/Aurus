import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Stethoscope, User, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form);
      if (user.role === 'doctor') navigate('/doctor');
      else if (!user.onboardingComplete) navigate('/onboarding');
      else navigate('/');
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
        <div className="relative z-10">
          <blockquote className="text-white text-2xl font-bold leading-snug mb-4">
            "Empowering patients.<br />Informing doctors.<br />Improving lives."
          </blockquote>
          <p className="text-indigo-200 text-sm">Continuous health telemetry · AI clinical reports · Secure doctor messaging</p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
            <img src="/patient-1.jpg" alt="Patient" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white text-sm font-bold">Trusted by patients & clinicians</p>
            <p className="text-indigo-200 text-xs">Backed by AI · HIPAA-aligned design</p>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500">Sign in to your Auris account</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3835AC]/40 focus:border-[#3835AC] shadow-sm transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3835AC]/40 focus:border-[#3835AC] shadow-sm transition"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#3835AC] text-white font-bold rounded-xl hover:bg-indigo-800 transition shadow-sm disabled:opacity-60 text-sm"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#3835AC] font-bold hover:underline">Create one</Link>
          </p>

          {/* Quick demo hint */}
          <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-xs text-indigo-600">
            <p className="font-bold mb-1">Demo accounts (after signup):</p>
            <p>Patient: any email / doctor: include "dr" or "doctor" in email and select Doctor role</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
