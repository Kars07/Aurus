import React, { useState } from 'react';
import { BarChart2, Activity, Heart, Footprints, Gauge } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
  RadialBarChart, RadialBar
} from 'recharts';

// ── Gauge Component ──────────────────────────────────────────────────────────
const GaugeCard = ({ label, value, max, unit, color, danger, warning }) => {
  const pct = Math.min(value / max, 1);
  // SVG half-circle gauge (180°)
  const r = 60;
  const cx = 80, cy = 80;
  const startAngle = Math.PI;
  const endAngle = startAngle + pct * Math.PI;
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  const trackX1 = cx + r * Math.cos(startAngle);
  const trackY1 = cy + r * Math.sin(startAngle);
  const trackX2 = cx + r * Math.cos(2 * Math.PI);
  const trackY2 = cy + r * Math.sin(2 * Math.PI);

  const isDanger  = value >= danger;
  const isWarning = !isDanger && value >= warning;
  const activeColor = isDanger ? '#ef4444' : isWarning ? '#f59e0b' : color;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col items-center">
      <h4 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-3">{label}</h4>
      <svg viewBox="0 0 160 100" className="w-36 h-24">
        {/* track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round"
        />
        {/* fill */}
        <path
          d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
          fill="none" stroke={activeColor} strokeWidth="14" strokeLinecap="round"
        />
        {/* needle */}
        {(() => {
          const nx = cx + (r - 14) * Math.cos(endAngle);
          const ny = cy + (r - 14) * Math.sin(endAngle);
          return <circle cx={nx} cy={ny} r="5" fill={activeColor} />;
        })()}
        <text x={cx} y={cy + 16} textAnchor="middle" className="text-base font-black" style={{ fontSize: 22, fontWeight: 800, fill: activeColor }}>{value}</text>
        <text x={cx} y={cy + 30} textAnchor="middle" style={{ fontSize: 10, fill: '#94a3b8' }}>{unit}</text>
      </svg>
      <div className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full ${isDanger ? 'bg-red-50 text-red-600' : isWarning ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
        {isDanger ? 'High Risk' : isWarning ? 'Elevated' : 'Normal'}
      </div>
    </div>
  );
};

// ── Mock Data ─────────────────────────────────────────────────────────────────
const weeklyData = [
  { day: 'Mon', heartRate: 72, pulse: 70, steps: 6800, bp: 118 },
  { day: 'Tue', heartRate: 80, pulse: 78, steps: 9100, bp: 122 },
  { day: 'Wed', heartRate: 68, pulse: 66, steps: 5400, bp: 116 },
  { day: 'Thu', heartRate: 88, pulse: 86, steps: 11200, bp: 130 },
  { day: 'Fri', heartRate: 74, pulse: 72, steps: 8700, bp: 124 },
  { day: 'Sat', heartRate: 78, pulse: 76, steps: 7300, bp: 119 },
  { day: 'Sun', heartRate: 70, pulse: 68, steps: 5900, bp: 115 },
];

const activityPieData = [
  { name: 'Walking', value: 38, color: '#06b6d4' },
  { name: 'Rest', value: 30, color: '#8b5cf6' },
  { name: 'Exercise', value: 18, color: '#3835AC' },
  { name: 'Sleep', value: 14, color: '#f59e0b' },
];

const gauges = [
  { label: 'Heart Rate', value: 88, max: 200, unit: 'BPM', color: '#ef4444', danger: 120, warning: 100 },
  { label: 'Pulse Rate', value: 86, max: 200, unit: 'BPM', color: '#06b6d4', danger: 110, warning: 95 },
  { label: 'Walking Steps', value: 8700, max: 15000, unit: 'Steps', color: '#10b981', danger: 14000, warning: 12000 },
  { label: 'Blood Pressure', value: 124, max: 200, unit: 'mmHg', color: '#8b5cf6', danger: 140, warning: 130 },
];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.08) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const StatisticsPage = () => {
  const [activeMetric, setActiveMetric] = useState('heartRate');

  const metricConfig = {
    heartRate: { label: 'Heart Rate', color: '#ef4444', unit: 'BPM' },
    pulse:     { label: 'Pulse Rate', color: '#06b6d4', unit: 'BPM' },
    steps:     { label: 'Walking Steps', color: '#10b981', unit: 'Steps' },
    bp:        { label: 'Blood Pressure', color: '#8b5cf6', unit: 'mmHg' },
  };

  return (
    <main className="flex-1 overflow-y-auto min-h-full bg-transparent text-slate-800">
      <div className="max-w-7xl mx-auto p-4 md:p-8">

        {/* Header */}
        <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-slate-200">
          <div className="p-3 bg-indigo-50 rounded-xl">
            <BarChart2 className="w-8 h-8 text-[#3835AC]" />
          </div>
          <div>
            <h1 className="text-3xl font-black font-display text-slate-900 tracking-tight mb-1">Health Statistics</h1>
            <p className="text-slate-500 font-medium">Weekly biometric analysis & trends</p>
          </div>
        </div>

        {/* Gauges Row */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-[#3835AC]" /> Live Gauge Analysis
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {gauges.map(g => <GaugeCard key={g.label} {...g} />)}
          </div>
        </section>

        {/* Line Graph + Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

          {/* Line Chart */}
          <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#3835AC]" /> Weekly Trend
              </h2>
              {/* Metric toggles */}
              <div className="flex gap-2 flex-wrap">
                {Object.entries(metricConfig).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => setActiveMetric(key)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                      activeMetric === key ? 'text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    style={activeMetric === key ? { backgroundColor: cfg.color } : {}}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
                  formatter={(val) => [`${val} ${metricConfig[activeMetric].unit}`, metricConfig[activeMetric].label]}
                />
                <Line
                  type="monotone"
                  dataKey={activeMetric}
                  stroke={metricConfig[activeMetric].color}
                  strokeWidth={3}
                  dot={{ fill: metricConfig[activeMetric].color, r: 5, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>

          {/* Pie Chart */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" /> Daily Activity
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={activityPieData}
                  cx="50%" cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {activityPieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [`${val}%`, name]} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 justify-center">
              {activityPieData.map(e => (
                <div key={e.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
                  <span className="text-xs text-slate-600 font-medium">{e.name}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Radial Bar Chart */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Footprints className="w-5 h-5 text-emerald-500" /> Weekly Goal Progress
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              innerRadius="20%"
              outerRadius="90%"
              data={[
                { name: 'Steps Goal', value: 82, fill: '#10b981' },
                { name: 'Heart Rate',  value: 65, fill: '#ef4444' },
                { name: 'BP Target',   value: 74, fill: '#8b5cf6' },
                { name: 'Pulse',       value: 90, fill: '#06b6d4' },
              ]}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="value" background cornerRadius={6} label={false} />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(val) => <span style={{ fontSize: 12, color: '#64748b' }}>{val}</span>}
              />
              <Tooltip formatter={(val) => [`${val}%`, 'Goal Completion']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </section>

      </div>
    </main>
  );
};

export default StatisticsPage;
