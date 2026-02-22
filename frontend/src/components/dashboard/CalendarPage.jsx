import React from 'react';
import CalendarView from './CalendarView';

const CalendarPage = () => {
    return (
        <main className="flex-1 overflow-y-auto min-h-full bg-transparent text-slate-800 p-4 md:p-8">
            <div className="max-w-4xl mx-auto h-full min-h-[600px] flex flex-col">
                {/* Header */}
                <div className="mb-8 pb-4 border-b border-slate-200">
                    <h1 className="text-3xl font-black font-display text-slate-900 tracking-tight mb-1">Calendar</h1>
                    <p className="text-slate-500 font-medium">Your healthcare schedule at a glance</p>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <CalendarView />
                </div>
            </div>
        </main>
    );
};

export default CalendarPage;
