import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Mic, FileText, ChevronRight, Activity, Cpu } from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#F6FAFF] overflow-hidden selection:bg-cyan-200 selection:text-cyan-900 absolute inset-0 z-50 overflow-y-auto scrollbar-hide">
      
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Au<span className="text-cyan-500">ris.</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-full transition-all shadow-sm hover:shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob" />
          <div className="absolute top-20 left-40 w-96 h-96 bg-purple-300 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob animation-delay-2000" />
          <div className="absolute top-40 right-40 w-[500px] h-[500px] bg-teal-200 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-bold mb-8 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              Powered by NVIDIA NAT AI
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
              Turning invisible symptoms into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">undeniable proof.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              The first voice-driven AI health companion that passively tracks telemetry, predicts flare-ups, and translates your reality into objective clinical reports.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-[#06b6d4] hover:bg-cyan-600 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 group">
                Start your journey
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-full font-bold text-lg transition-all flex justify-center items-center">
                Doctor Portal
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">A new paradigm for chronic care</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">We built Auris to eliminate medical gaslighting and reduce tracking fatigue through zero-friction ambient intelligence.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#F6FAFF] rounded-3xl p-8 border border-cyan-100 hover:shadow-xl hover:shadow-cyan-100/50 transition-all group"
            >
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 text-cyan-600 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Aegis Telemetry</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Passive background monitoring of keystroke erraticism and vocal cadence to detect physiological stress before you even feel a flare-up.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#F6FAFF] rounded-3xl p-8 border border-blue-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all group"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <Mic className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Frictionless Voice</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                No sliders, no forms. Just hold your phone and vent. Our Empathetic AI processes your daily struggles into actionable insights instantly.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#F6FAFF] rounded-3xl p-8 border border-purple-100 hover:shadow-xl hover:shadow-purple-100/50 transition-all group"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Clinical Translation</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Automatically transforms weeks of subjective emotional journals into strict, FHIR-compliant SOAP notes (HPI, Assessment, Plan) for your doctor.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Big AI Showcase Section */}
      <div className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#06b6d4] to-transparent mix-blend-overlay" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold border border-cyan-400/30">
                <Shield className="w-4 h-4" /> HIPAA ALIGNED
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Your unapologetic <br/><span className="text-cyan-400">Patient Advocate</span>.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Walking into a doctor's office with an invisible illness is intimidating. Auris acts as your shield. Before any appointment, our AI synthesizes your complex history into an armored "Patient Advocate Brief" predicting doctors' dismissals and giving you the exact clinical language to demand the tests you need.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
                <div>
                  <h4 className="text-4xl font-black text-white mb-1">70B</h4>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Parameters</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-white mb-1">95%</h4>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Flare Radar</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 w-full relative">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl relative"
             >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-25" />
                <div className="relative bg-slate-900 rounded-2xl p-6 border border-slate-700">
                   <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
                     <div className="w-10 h-10 rounded-full bg-cyan-950 flex items-center justify-center text-cyan-400">
                       <Cpu className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="font-bold text-white">NVIDIA Reasoning Engine</h4>
                       <p className="text-xs text-slate-500 font-mono">Status: LIVE 🟢</p>
                     </div>
                   </div>
                   
                   <div className="space-y-4 font-mono text-sm">
                      <div className="flex gap-4 opacity-50">
                        <span className="text-pink-500 shrink-0">{"System >"}</span>
                        <span className="text-slate-400">Ingesting daily logs & raw telemetry...</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-cyan-500 shrink-0">{"NAT AI >"}</span>
                        <span className="text-white">Detected elevated keystroke MS. Vagal tone decreasing. Probability of autoimmune flare in 48h: <span className="text-amber-400">82%</span>.</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-green-500 shrink-0">{"Action >"}</span>
                        <span className="text-green-300">Generating preventative nudge. Compiling FHIR snapshot for Dr. Smith.</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="py-24 bg-white text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-6">Stop managing alone.</h2>
        <p className="text-xl text-slate-500 font-medium mb-10 max-w-xl mx-auto">Join the future of patient-driven care. Let Auris shoulder the burden of proof.</p>
        <Link to="/signup" className="inline-flex items-center gap-2 px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
          Create Free Account
        </Link>
      </div>

    </div>
  );
};

export default LandingPage;
