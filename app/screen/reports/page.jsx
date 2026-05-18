"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Link from 'next/link';

export default function ReportsPage() {
  // Navigation State: 'months' -> 'days' -> 'day-details'
  const [view, setView] = useState('months');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filterYear, setFilterYear] = useState('2026');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDay, setFilterDay] = useState('');

  const months = [
    { name: 'January', revenue: '€12,450', jobs: '240' },
    { name: 'February', revenue: '€14,200', jobs: '280' },
    { name: 'March', revenue: '€18,500', jobs: '320' },
    { name: 'April', revenue: '€15,100', jobs: '290' },
    { name: 'May', revenue: '€22,400', jobs: '450' },
    { name: 'June', revenue: '€21,800', jobs: '430' },
    { name: 'July', revenue: '€25,000', jobs: '500' },
    { name: 'August', revenue: '€24,200', jobs: '480' },
    { name: 'September', revenue: '€19,500', jobs: '380' },
    { name: 'October', revenue: '€20,100', jobs: '400' },
    { name: 'November', revenue: '€23,500', jobs: '460' },
    { name: 'December', revenue: '€28,400', jobs: '550' },
  ];

  const getDynamicMetrics = () => {
    if (view === 'months') return { revenue: '€254,580', jobs: '4,820', retention: '84.2%', failed: '12', label: 'Annual' };
    if (view === 'days') {
      const mData = months.find(m => m.name === selectedMonth) || { revenue: '€22,400', jobs: '450' };
      return { revenue: mData.revenue, jobs: mData.jobs, retention: '86.5%', failed: '2', label: selectedMonth };
    }
    if (view === 'day-details') return { revenue: '€4,250', jobs: '82', retention: '98%', failed: '0', label: `${selectedMonth} ${selectedDay}` };
    return {};
  };

  const currentMetrics = getDynamicMetrics();

  const daysInMonth = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    revenue: `€${(Math.random() * 1000 + 500).toFixed(0)}`,
    jobs: (Math.random() * 20 + 5).toFixed(0)
  }));

  const workersOnDay = [
    { id: 'WRK-001', name: 'Ravi Kumar', jobs: 4, revenue: '€120', status: 'Online' },
    { id: 'WRK-002', name: 'Asha Verma', jobs: 3, revenue: '€95', status: 'Offline' },
    { id: 'WRK-003', name: 'Priya Sharma', jobs: 5, revenue: '€150', status: 'Online' },
    { id: 'WRK-004', name: 'Amit Patel', jobs: 2, revenue: '€60', status: 'Online' },
    { id: 'WRK-005', name: 'Deepa Singh', jobs: 4, revenue: '€130', status: 'Online' },
  ];

  // Reusable Chart Component (Untouched as requested)
  const ReportCharts = ({ timeframeLabel }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col h-80">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-serif">{timeframeLabel} Trends</h2>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Growth performance tracking</p>
        </div>
        <div className="flex-1 relative mt-2">
          <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
            <path d="M0,150 L100,130 L200,100 L300,110 L400,60 L500,40 L600,70" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            <path d="M0,180 L100,175 L200,165 L300,170 L400,150 L500,140 L600,145" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            {view === 'months' ? (<span>Jan</span>) : (<span>Day 1</span>)}
            {view === 'months' ? (<span>May</span>) : (<span>Day 15</span>)}
            {view === 'months' ? (<span>Nov</span>) : (<span>Day 30</span>)}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col h-80">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Service split</h2>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Revenue by category</p>
        </div>
        <div className="flex-1 flex items-end justify-between px-4 pb-2">
          <div className="w-10 bg-blue-600 rounded-t-lg h-[80%] shadow-lg shadow-blue-500/10"></div>
          <div className="w-10 bg-emerald-500 rounded-t-lg h-[60%] shadow-lg shadow-emerald-500/10"></div>
          <div className="w-10 bg-amber-500 rounded-t-lg h-[40%] shadow-lg shadow-amber-500/10"></div>
          <div className="w-10 bg-purple-500 rounded-t-lg h-[25%] shadow-lg shadow-purple-500/10"></div>
          <div className="w-10 bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[15%]"></div>
        </div>
        <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-tighter"><span>Clean.</span><span>Plumb.</span><span>Elect.</span><span>Paint.</span><span>Other</span></div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">Reports & Analytics</h1>
              <p className="text-sm text-slate-500 mt-1 font-medium italic uppercase tracking-tighter">Overview for <span className="text-indigo-600 font-bold">{currentMetrics.label}</span></p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-3 pr-8 py-2 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
                  <option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-slate-400"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></div>
              </div>
              <div className="relative">
                <select value={filterMonth} onChange={(e) => { setFilterMonth(e.target.value); if(e.target.value) { setSelectedMonth(e.target.value); setView('days'); } else { setView('months'); } }} className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-3 pr-8 py-2 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
                  <option value="">Month</option>{months.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-slate-400"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></div>
              </div>
              <div className="relative">
                <select value={filterDay} onChange={(e) => { setFilterDay(e.target.value); if(e.target.value) { setSelectedDay(e.target.value); setView('day-details'); if(!selectedMonth) setSelectedMonth('May'); } }} className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-3 pr-8 py-2 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
                  <option value="">Day</option>{Array.from({ length: 31 }, (_, i) => (<option key={i+1} value={i+1}>{i+1}</option>))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-slate-400"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></div>
              </div>
              {view !== 'months' && (
                <button onClick={() => { if (view === 'day-details') { setView('days'); setFilterDay(''); } else { setView('months'); setFilterMonth(''); } }} className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
              )}
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{currentMetrics.label} Revenue</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{currentMetrics.revenue}</p>
              <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-widest"><span>+12.5%</span><svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg></div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{currentMetrics.label} Jobs</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{currentMetrics.jobs}</p>
              <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-widest"><span>+8% Growth</span></div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Retention Rate</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{currentMetrics.retention}</p>
              <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-indigo-500 uppercase tracking-widest"><span>Calculated</span></div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Failed Payments</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{currentMetrics.failed}</p>
              <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-rose-500 uppercase tracking-widest"><span>-15% Improvement</span></div>
            </div>
          </div>

          {/* Content Area */}
          {view === 'months' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                        <th className="px-6 py-4 w-16 text-center">#</th>
                        <th className="px-6 py-4">Month</th>
                        <th className="px-6 py-4">Revenue</th>
                        <th className="px-6 py-4">Total Jobs</th>
                        <th className="px-6 py-4">Completed</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {months.map((m, idx) => (
                        <tr key={m.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-center text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                          <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{m.name}</td>
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{m.revenue}</td>
                          <td className="px-6 py-4 text-slate-500 font-medium">{m.jobs}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/20"></span>
                              <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-tighter">{(parseInt(m.jobs) * 0.95).toFixed(0)} Completed</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => { setSelectedMonth(m.name); setView('days'); }} className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-slate-50 dark:bg-slate-800/30 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Showing all 12 months</span>
                    <div className="flex gap-1"><div className="w-6 h-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex items-center justify-center text-[10px] font-bold text-slate-900 dark:text-white">1</div></div>
                  </div>
                </div>
              </div>
              <ReportCharts timeframeLabel="Annual" />
            </div>
          )}

          {view === 'days' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="bg-slate-50/80 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Daily breakdown for {selectedMonth}</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Calendar Grid</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-px bg-slate-100 dark:bg-slate-800/50">
                  {daysInMonth.map((d) => (
                    <button key={d.day} onClick={() => { setSelectedDay(d.day); setView('day-details'); }} className="bg-white dark:bg-slate-900 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left flex flex-col justify-between h-24 shadow-sm group">
                      <span className="text-xl font-black text-slate-400 dark:text-slate-600 group-hover:text-indigo-600 transition-colors">{d.day.toString().padStart(2, '0')}</span>
                      <div>
                        <p className="text-[10px] font-black text-slate-900 dark:text-white">{d.revenue}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{d.jobs} Jobs</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <ReportCharts timeframeLabel={`${selectedMonth} Daily`} />
            </div>
          )}

          {view === 'day-details' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-50/80 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{selectedMonth} {selectedDay} - Worker Activity Report</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead><tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400"><th className="py-4 px-6">Worker Name</th><th className="py-4 px-6 text-center">Jobs</th><th className="py-4 px-6 text-center">Revenue</th><th className="py-4 px-6 text-center">Action</th></tr></thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">{workersOnDay.map((worker) => (<tr key={worker.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"><td className="py-4 px-6 font-bold text-slate-700 dark:text-slate-200">{worker.name}</td><td className="py-4 px-6 text-center font-black text-blue-600">{worker.jobs}</td><td className="py-4 px-6 text-center font-bold text-slate-900 dark:text-white">{worker.revenue}</td><td className="py-4 px-6 text-center"><Link href={`/screen/workers/profile?id=${worker.id}`} className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all inline-block">Profile</Link></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm"><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 italic">Hourly Traffic Breakdown</h3><div className="h-24 flex items-end justify-between gap-1">{[40, 60, 80, 50, 70, 90, 100, 80, 60, 40, 20].map((h, i) => (<div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm" style={{ height: `${h}%` }}></div>))}</div><div className="flex justify-between mt-2 text-[8px] font-black text-slate-300 uppercase tracking-widest"><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span></div></div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
