import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Paintbrush, Smartphone, Check } from 'lucide-react';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Paintbrush },
        { id: 'devices', label: 'Connected Devices', icon: Smartphone },
    ];

    return (
        <main className="flex-1 overflow-y-auto min-h-full bg-transparent text-slate-800">
            <div className="max-w-6xl mx-auto w-full p-4 md:p-8 flex flex-col min-h-[calc(100vh-80px)]">

                {/* Header */}
                <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-slate-200">
                    <div className="p-3 bg-cyan-50 rounded-xl">
                        <Settings className="w-8 h-8 text-cyan-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black font-display text-slate-900 tracking-tight mb-1">Configuration</h1>
                        <p className="text-slate-500 font-medium">Manage your personal preferences and account settings</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 flex-1">
                    {/* Side Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-2 flex flex-col gap-1">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all ${isActive
                                                    ? 'bg-cyan-50 text-cyan-600 font-bold'
                                                    : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            <tab.icon className={`w-5 h-5 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Personal Information</h2>

                                <div className="flex items-start gap-6 mb-8 pb-8 border-b border-slate-100">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-100 bg-slate-100 shrink-0">
                                        <img src="/patient-1.jpg" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">Profile Photo</h3>
                                        <p className="text-sm text-slate-500 mb-3">Square image, Max 2MB (JPG or PNG)</p>
                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 bg-cyan-50 text-cyan-600 font-bold text-sm rounded-lg hover:bg-cyan-100 transition-colors">Upload New</button>
                                            <button className="px-4 py-2 text-slate-500 font-bold text-sm hover:text-slate-700 transition-colors">Remove</button>
                                        </div>
                                    </div>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                            <input type="text" defaultValue="Alex" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-800" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                            <input type="text" defaultValue="Chen" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-800" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                        <input type="email" defaultValue="alex.chen@example.com" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-800" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth</label>
                                        <input type="date" defaultValue="1992-04-12" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-800" />
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Notification Preferences</h2>
                                <p className="text-sm text-slate-500 mb-6 pb-6 border-b border-slate-100">Configure how and when you want to receive alerts from Auris.</p>

                                <div className="space-y-6">
                                    {[
                                        { title: "Appointment Reminders", desc: "Get notified 24 hours and 1 hour before appointments." },
                                        { title: "Health Alerts", desc: "Receive immediate alerts if biomarker trends look concerning." },
                                        { title: "Weekly Reports", desc: "A summary email every Sunday analyzing your past week's data." },
                                        { title: "Aegis Protocol Interventions", desc: "Push notifications when the digital safety protocol is triggered." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex-1 pr-4">
                                                <h4 className="font-bold text-slate-800">{item.title}</h4>
                                                <p className="text-sm text-slate-500">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500 shadow-sm"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === 'privacy' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Data Privacy & Security</h2>
                                <div className="p-4 bg-cyan-50 border border-cyan-100 rounded-xl mb-6 flex gap-3">
                                    <Shield className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                    <p className="text-sm text-cyan-800 font-medium">Your clinical data is end-to-end encrypted and completely FHIR-compliant. You hold the encryption keys.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                        <div>
                                            <h4 className="font-bold text-slate-800">Share Telemetry with Primary Care</h4>
                                            <p className="text-sm text-slate-500">Automatically sync biomarker data to connected doctors.</p>
                                        </div>
                                        <button className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-200 transition-colors">Manage Access</button>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                        <div>
                                            <h4 className="font-bold text-rose-600">Delete Account Data</h4>
                                            <p className="text-sm text-slate-500">Permanently erase all your historical medical data from Auris servers.</p>
                                        </div>
                                        <button className="px-4 py-2 border border-rose-200 text-rose-600 font-bold text-sm rounded-lg hover:bg-rose-50 transition-colors">Delete Data</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Other Tabs (Placeholder) */}
                        {['appearance', 'devices'].includes(activeTab) && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 text-center py-12">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {activeTab === 'appearance' ? <Paintbrush className="w-8 h-8 text-slate-300" /> : <Smartphone className="w-8 h-8 text-slate-300" />}
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">Configuration Coming Soon</h3>
                                <p className="text-sm text-slate-500">This module is part of the v2.2 rollout.</p>
                            </div>
                        )}

                        {/* Footer Action */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm ${saved ? 'bg-emerald-500 text-white' : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                                    }`}
                            >
                                {saved ? <><Check className="w-4 h-4" /> Saved Successfully</> : 'Save Changes'}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
};

export default SettingsPage;
