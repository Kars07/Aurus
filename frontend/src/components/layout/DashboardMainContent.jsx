import React from 'react';
import ActivityFeed from '../dashboard/ActivityFeed';
import AegisOverlay from '../dashboard/AegisOverlay';
import FlarePredictor from '../dashboard/FlarePredictor';
import VagalToneWidget from '../dashboard/VagalToneWidget';
import AnatomySection from '../dashboard/AnatomySection';
import { useAegisTelemetry } from '../../hooks/useAegisTelemetry';

const DashboardMainContent = () => {
  const { triggerManualCrash } = useAegisTelemetry();

  return (
    <main className="flex-1 overflow-y-auto min-h-full bg-transparent text-slate-800">
      <AegisOverlay />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Top Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h1 className="text-4xl font-black font-display text-slate-900 tracking-tight mb-2">My Health Command</h1>
            <p className="text-cyan-400  font-medium tracking-wide uppercase text-sm">Auris Continuous Telemetry Active</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="hidden md:block text-sm font-bold text-cyan-400 hover:text-cyan-500 transition-colors bg-[#3835AC]/10 px-4 py-2 rounded-xl">
              Past 7 Days ▼
            </button>
          </div>
        </div>

        {/* B2C Wow Features: Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Side: Anatomy Model */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <AnatomySection />
          </div>
          
          {/* Right Side: Stacked Widgets */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FlarePredictor />
            <VagalToneWidget />
          </div>
        </div>

        {/* Main Interaction Area */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-6">
            <ActivityFeed />
          </div>
        </div>

      </div>
    </main>
  );
};

export default DashboardMainContent;
