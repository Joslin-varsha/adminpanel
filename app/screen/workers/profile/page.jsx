"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../components/Sidebar';
import Link from 'next/link';

const allWorkers = [
  { id: 'WRK-001', name: 'Ravi Kumar', phone: '+49 151234567', skill: 'Cleaning', rating: '4.8', acceptance: '95%', rejects: 2, status: 'Online' },
  { id: 'WRK-002', name: 'Asha Verma', phone: '+49 161245678', skill: 'Plumbing', rating: '4.6', acceptance: '91%', rejects: 1, status: 'Offline' },
  { id: 'WRK-003', name: 'Priya Sharma', phone: '+49 171356789', skill: 'Electrical', rating: '4.9', acceptance: '97%', rejects: 0, status: 'Online' },
  { id: 'WRK-004', name: 'Amit Patel', phone: '+49 151987654', skill: 'Carpentry', rating: '4.7', acceptance: '93%', rejects: 2, status: 'Online' },
  { id: 'WRK-005', name: 'Deepa Singh', phone: '+49 162345678', skill: 'Painting', rating: '4.5', acceptance: '89%', rejects: 3, status: 'Offline' },
  { id: 'WRK-006', name: 'Rajesh Gupta', phone: '+49 171456789', skill: 'HVAC', rating: '4.8', acceptance: '96%', rejects: 1, status: 'Online' },
  { id: 'WRK-007', name: 'Meera Reddy', phone: '+49 151678901', skill: 'Landscaping', rating: '4.6', acceptance: '92%', rejects: 2, status: 'Online' },
  { id: 'WRK-008', name: 'Vikram Nair', phone: '+49 162567890', skill: 'General Maintenance', rating: '4.4', acceptance: '87%', rejects: 4, status: 'Offline' },
  { id: 'WRK-009', name: 'Sunita Desai', phone: '+49 171789012', skill: 'Cleaning', rating: '5.0', acceptance: '98%', rejects: 0, status: 'Online' },
  { id: 'WRK-010', name: 'Karan Mehta', phone: '+49 151890123', skill: 'Plumbing', rating: '4.3', acceptance: '86%', rejects: 5, status: 'Online' },
  { id: 'WRK-011', name: 'Anjali Iyer', phone: '+49 162901234', skill: 'Electrical', rating: '4.7', acceptance: '94%', rejects: 1, status: 'Online' },
  { id: 'WRK-012', name: 'Sanjay Joshi', phone: '+49 171012345', skill: 'Carpentry', rating: '4.2', acceptance: '85%', rejects: 3, status: 'Offline' },
  { id: 'WRK-013', name: 'Lakshmi Rao', phone: '+49 151123456', skill: 'Painting', rating: '4.9', acceptance: '96%', rejects: 1, status: 'Online' },
  { id: 'WRK-014', name: 'Arjun Bose', phone: '+49 162234567', skill: 'HVAC', rating: '4.6', acceptance: '90%', rejects: 2, status: 'Offline' },
];

export default function WorkerProfilePage() {
  const [workerData, setWorkerData] = useState({
    id: 'W-105',
    name: 'Michael Schmidt',
    status: 'Online',
    joined: 'Jan 12, 2024',
    rating: '4.8',
    totalJobs: '482',
    totalEarnings: '€14,250',
    currentBalance: '€420.50',
    skills: ['Deep Cleaning', 'Furniture Assembly', 'Window Cleaning', 'Sanitization'],
    email: 'm.schmidt@housework.com',
    phone: '+49 152 334 4556',
    address: 'Kurfürstendamm 21, Berlin, Germany'
  });

  useEffect(() => {
    // Read the query parameter from the URL safely on the client
    const searchParams = new URLSearchParams(window.location.search);
    const workerId = searchParams.get('id');

    if (workerId) {
      const foundWorker = allWorkers.find(w => w.id === workerId);
      if (foundWorker) {
        setWorkerData(prev => ({
          ...prev,
          id: foundWorker.id,
          name: foundWorker.name,
          phone: foundWorker.phone,
          status: foundWorker.status,
          rating: foundWorker.rating,
          skills: [foundWorker.skill],
          email: `${foundWorker.name.toLowerCase().replace(' ', '.')}@housework.com`,
        }));
      }
    }
  }, []);

  const earningsHistory = [
    { id: 'JOB-882', date: 'May 16, 2026', service: 'Deep Cleaning', amount: '€85.00', status: 'Paid' },
    { id: 'JOB-875', date: 'May 15, 2026', service: 'Window Cleaning', amount: '€45.00', status: 'Paid' },
    { id: 'JOB-860', date: 'May 15, 2026', service: 'Furniture Assembly', amount: '€120.00', status: 'Processing' },
    { id: 'JOB-842', date: 'May 14, 2026', service: 'Deep Cleaning', amount: '€85.00', status: 'Paid' },
    { id: 'JOB-820', date: 'May 12, 2026', service: 'Sanitization', amount: '€60.00', status: 'Paid' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header & Back Navigation */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/screen/reports" className="w-8 h-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </Link>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif uppercase">Worker Profile</h1>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">ID: {workerData.id} • Registered {workerData.joined}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${workerData.status === 'Online' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                {workerData.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Essential Data */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm text-center">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-slate-300 uppercase shadow-inner">
                  {workerData.name.charAt(0)}
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{workerData.name}</h2>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mt-1">Professional Partner</p>
                
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-50 dark:border-slate-800 pt-8">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg font-black">{workerData.rating}</span>
                      <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Jobs Done</p>
                    <span className="text-lg font-black">{workerData.totalJobs}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{workerData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{workerData.phone}</span>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Skills & Services</h3>
                <div className="flex flex-wrap gap-2">
                  {workerData.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100 dark:border-slate-700">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Columns: Earnings & Performance */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Earnings Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Earnings</h3>
                  <div className="flex items-end justify-between">
                    <p className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{workerData.totalEarnings}</p>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded text-[10px] font-black text-indigo-600 uppercase">LIFETIME</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Current Balance</h3>
                  <div className="flex items-end justify-between">
                    <p className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{workerData.currentBalance}</p>
                    <button className="px-4 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Payout</button>
                  </div>
                </div>
              </div>

              {/* Earnings Trend Graph (Mockup) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Earnings Performance</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Weekly income analysis</p>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded font-black uppercase tracking-widest">Live Feed</span>
                </div>
                
                <div className="h-64 relative mt-10">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-full border-b border-slate-100 dark:border-slate-800/50 border-dashed"></div>
                    ))}
                  </div>

                  {/* SVG Chart */}
                  <svg className="w-full h-full relative z-10 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area Fill */}
                    <path 
                      d="M0,150 Q100,80 200,120 T400,40 T600,100 L600,200 L0,200 Z" 
                      fill="url(#chartGradient)"
                    />
                    
                    {/* Main Line */}
                    <path 
                      d="M0,150 Q100,80 200,120 T400,40 T600,100" 
                      fill="none" 
                      stroke="#4f46e5" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {[
                      {x: 0, y: 150, val: '€45'}, 
                      {x: 100, y: 80, val: '€120'}, 
                      {x: 200, y: 120, val: '€65'}, 
                      {x: 300, y: 80, val: '€110'}, 
                      {x: 400, y: 40, val: '€180'}, 
                      {x: 500, y: 60, val: '€140'}, 
                      {x: 600, y: 100, val: '€95'}
                    ].map((p, i) => (
                      <g key={i} className="group/point">
                        <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#4f46e5" strokeWidth="2" className="transition-all duration-300 group-hover/point:r-6" />
                        <text x={p.x} y={p.y - 15} textAnchor="middle" className="text-[10px] font-black fill-indigo-600 opacity-0 group-hover/point:opacity-100 transition-opacity uppercase tracking-tighter">{p.val}</text>
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="flex justify-between mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              {/* Recent Transaction Table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Recent Earnings</h3>
                  <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-50 dark:border-slate-800">
                        <th className="px-6 py-3 font-normal">Job ID</th>
                        <th className="px-6 py-3 font-normal">Service</th>
                        <th className="px-6 py-3 font-normal">Amount</th>
                        <th className="px-6 py-3 font-normal">Date</th>
                        <th className="px-6 py-3 font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                      {earningsHistory.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-[11px] text-slate-400">{row.id}</td>
                          <td className="px-6 py-4 font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight text-xs">{row.service}</td>
                          <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{row.amount}</td>
                          <td className="px-6 py-4 text-[11px] text-slate-500 font-medium">{row.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Paid' ? 'bg-emerald-500 shadow-sm shadow-emerald-500/20' : 'bg-amber-500 shadow-sm shadow-amber-500/20'}`}></span>
                              <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-tighter">{row.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rewards & Recognition Section */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest font-serif">Rewards & Recognition</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Achievements and special awards</p>
                  </div>
                  <div className="bg-indigo-600 px-4 py-2 rounded-2xl text-white text-center shadow-lg shadow-indigo-500/20">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Total Points</p>
                    <p className="text-xl font-black">2,450</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Employee of the Month', date: 'April 2026', value: '€200 Bonus', img: '🏆', note: 'Extra mile performance and 100% 5-star ratings.' },
                    { title: 'Customer Favorite', date: 'March 2026', value: 'Gift Card €50', img: '⭐', note: 'Nominated by 15+ recurring customers.' }
                  ].map((reward, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 transition-all group">
                      <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                        {reward.img}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{reward.title}</h4>
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded">{reward.value}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">{reward.date}</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">"{reward.note}"</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex justify-center">
                  <button className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-slate-900/10">View Full Certificate History</button>
                </div>
              </div>

              {/* Available Rewards to Earn (The "Offers") */}
              <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-500/10">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-widest font-serif">Available Rewards to Earn</h3>
                    <p className="text-[10px] opacity-60 font-black uppercase tracking-widest mt-1">Check out current incentives</p>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl animate-pulse">🔥</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Perfect Month', prize: '€100 Bonus', criteria: '5.0 Rating', color: 'bg-indigo-500/20 border-indigo-500/30' },
                    { title: 'Super Worker', prize: '€50 Gift Card', criteria: '150+ Jobs', color: 'bg-emerald-500/20 border-emerald-500/30' },
                    { title: 'Top Clean', prize: 'Certificate', criteria: 'Best feedback', color: 'bg-amber-500/20 border-amber-500/30' },
                  ].map((offer, i) => (
                    <div key={i} className={`${offer.color} border rounded-2xl p-4 transition-all hover:scale-105 cursor-pointer`}>
                      <h4 className="text-xs font-black uppercase tracking-tight">{offer.title}</h4>
                      <p className="text-lg font-black text-white mt-1">{offer.prize}</p>
                      <p className="text-[9px] opacity-60 font-bold uppercase mt-2 tracking-widest">{offer.criteria}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
