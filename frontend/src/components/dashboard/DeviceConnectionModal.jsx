import React, { useState, useEffect } from 'react';
import { Watch, Radio, CheckCircle2, Loader2, Link2, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DeviceConnectionModal = ({ onComplete }) => {
    const { user } = useAuth();
    const [selectedDevice, setSelectedDevice] = useState(null); // 'watch' or 'patch'
    const [connectionState, setConnectionState] = useState('idle'); // 'idle' | 'connecting' | 'success'

    const devices = [
        {
            id: 'watch',
            name: 'Auris SmartWatch v2',
            description: 'Continuous heart-rate algorithms and motion tracking.',
            icon: Watch,
            image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=200&h=200&fit=crop&auto=format',
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50',
            borderColor: 'border-cyan-200'
        },
        {
            id: 'patch',
            name: 'Auris BioPatch',
            description: 'Clinical grade vagal tone and stress markers.',
            icon: Radio,
            image: '/ear aids.png',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200'
        }
    ];

    const handleConnect = () => {
        if (!selectedDevice) return;

        setConnectionState('connecting');

        // Mock connection time
        setTimeout(() => {
            setConnectionState('success');

            // Auto-dismiss shortly after success
            setTimeout(() => {
                onComplete();
            }, 1500);
        }, 2500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-white/20 overflow-hidden flex flex-col relative">

                {/* Decorative Top Banner */}
                <div className="h-32 bg-gradient-to-br from-[#06b6d4] to-cyan-500 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="absolute rounded-full border border-white"
                                style={{ width: 100 + i * 80, height: 100 + i * 80, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                        ))}
                    </div>
                    <Activity className="w-14 h-14 text-white relative z-10" />
                </div>

                {/* Content */}
                <div className="p-8 text-center bg-white relative">

                    {connectionState === 'success' ? (
                        <div className="py-12 flex flex-col items-center animate-in zoom-in slide-in-from-bottom-2 duration-300">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-emerald-100">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Device Synced!</h2>
                            <p className="text-slate-500">Live telemetry is now active on your dashboard.</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Connect a Telemetry Device</h2>
                            <p className="text-slate-500 text-sm mb-8">
                                To generate AI briefs, Auris needs to monitor your real-time vitals. Select a device to pair via Bluetooth.
                            </p>

                            <div className="flex gap-4 mb-8">
                                {devices.map((dev) => {
                                    const Icon = dev.icon;
                                    const isSelected = selectedDevice === dev.id;
                                    return (
                                        <button
                                            key={dev.id}
                                            onClick={() => setSelectedDevice(dev.id)}
                                            disabled={connectionState === 'connecting'}
                                            className={`group flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 text-left ${isSelected
                                                ? `border-[#06b6d4] ring-4 ring-cyan-50 shadow-sm bg-cyan-50/30`
                                                : `border-slate-100 hover:border-cyan-200 bg-white hover:bg-slate-50`
                                                } ${connectionState === 'connecting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {/* Device Image */}
                                            <div className={`w-full h-32 rounded-xl mb-3 overflow-hidden relative flex items-center justify-center ${isSelected ? dev.bgColor : 'bg-slate-50'}`}>
                                                <img
                                                    src={dev.image}
                                                    alt={dev.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    onError={e => { e.target.style.display = 'none'; }}
                                                />
                                                {/* Icon Badge */}
                                                <div className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${isSelected ? 'bg-white' : 'bg-white/80'}`}>
                                                    <Icon className={`w-4 h-4 ${isSelected ? dev.color : 'text-slate-400'}`} />
                                                </div>
                                                {isSelected && (
                                                    <div className={`absolute inset-0 opacity-10 ${dev.id === 'watch' ? 'bg-cyan-400' : 'bg-indigo-400'}`} />
                                                )}
                                            </div>
                                            <span className="font-bold text-slate-800 text-sm text-center mb-1">{dev.name}</span>
                                            <span className="text-xs text-slate-500 text-center leading-relaxed">{dev.description}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleConnect}
                                disabled={!selectedDevice || connectionState === 'connecting'}
                                className="w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm
                  bg-[#06b6d4] hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-100 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                            >
                                {connectionState === 'connecting' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Pairing {selectedDevice === 'watch' ? 'SmartWatch' : 'BioPatch'}...
                                    </>
                                ) : (
                                    <>
                                        <Link2 className="w-5 h-5" /> Connect {selectedDevice ? (selectedDevice === 'watch' ? 'Watch' : 'Patch') : 'Device'}
                                    </>
                                )}
                            </button>

                            <button
                                onClick={onComplete}
                                disabled={connectionState === 'connecting'}
                                className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 underline underline-offset-2 disabled:opacity-0 transition-opacity"
                            >
                                Skip for now (Demo Mode)
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default DeviceConnectionModal;
