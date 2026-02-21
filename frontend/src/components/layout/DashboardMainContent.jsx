import React from 'react';
import JournalingInput from '../dashboard/JournalingInput';
import ActivityFeed from '../dashboard/ActivityFeed';
import AegisOverlay from '../dashboard/AegisOverlay';
import FlarePredictor from '../dashboard/FlarePredictor';
import VagalToneWidget from '../dashboard/VagalToneWidget';
import HealthDetective from '../dashboard/HealthDetective';
import AnatomySection from '../dashboard/AnatomySection';
import { useAegisTelemetry } from '../../hooks/useAegisTelemetry';

const DashboardMainContent = () => {
  const { triggerManualCrash } = useAegisTelemetry();

  return (
    <main className="flex-1 overflow-y-auto min-h-full bg-[#0B0F19] text-slate-200">
      <AegisOverlay />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Top Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h1 className="text-4xl font-black font-display text-white tracking-tight mb-2">My Health Command</h1>
            <p className="text-indigo-400 font-medium tracking-wide uppercase text-sm">EmpowerLink Continuous Telemetry Active</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="hidden md:block text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-4 py-2 rounded-xl">
              Past 7 Days ▼
            </button>
          </div>
        </div>

        {/* B2C Wow Features: Top Row */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="flex-1">
            <FlarePredictor />
          </div>
          <div className="flex-1">
            <VagalToneWidget />
          </div>
        </div>

        {/* Main Interaction Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <JournalingInput />
            <HealthDetective />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <AnatomySection />
            <ActivityFeed />
          </div>
        </div>

      </div>
    </main>
  );
};

export default DashboardMainContent;
