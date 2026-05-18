"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

export default function RewardsPage() {
  const [rewardsHistory, setRewardsHistory] = useState([
    { id: 'R-901', name: 'Michael Schmidt', type: 'Employee of the Month', value: '€200.00', date: 'May 10, 2026', note: 'Consistent 5-star ratings and 120+ jobs.' },
    { id: 'R-902', name: 'Elena Fischer', type: 'Quarterly Bonus', value: '€500.00', date: 'May 12, 2026', note: 'Top performer in the Deep Cleaning category.' },
    { id: 'R-903', name: 'Sarah Wagner', type: 'Gift Card', value: '€50.00', date: 'May 14, 2026', note: 'Extra mile performance for recurring clients.' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    worker: '',
    type: 'Quarterly Bonus',
    value: '',
    notes: ''
  });

  const handleGrantReward = () => {
    const newReward = {
      id: `R-${Math.floor(Math.random() * 1000)}`,
      name: formData.worker || 'Selected Employee',
      type: formData.type,
      value: `€${formData.value}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      note: formData.notes
    };
    setRewardsHistory([newReward, ...rewardsHistory]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif uppercase">Rewards Hub</h1>
              <p className="text-sm text-slate-500 mt-1 font-medium italic">Employee recognition and performance incentives</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:opacity-90 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Grant New Reward
            </button>
          </div>

          {/* Active Programs Section (The "Offers") */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Currently Offered Reward Programs</h3>
              <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">+ Configure Offer</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Best Star Rating', prize: '€100 Bonus', criteria: 'Maintain 5.0 stars for 30 days', icon: '⭐' },
                { title: 'Top Job Finisher', prize: 'Gift Card €50', criteria: 'Complete 150+ jobs this month', icon: '🧹' },
                { title: 'Extra Mile Award', prize: 'Certificate + €25', criteria: 'Positive recurring customer notes', icon: '🎖️' },
              ].map((prog, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-400 dark:hover:border-slate-600 transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{prog.icon}</div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{prog.title}</h4>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{prog.prize}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Criteria: {prog.criteria}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recognition Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Rewards Paid</h3>
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">€12,450.00</p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded text-[9px] font-black uppercase tracking-widest">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
                  +12% vs last year
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 text-slate-50 dark:text-slate-800/50 rotate-12 transition-transform group-hover:scale-110 duration-500">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-5">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🏆</div>
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificates</h3>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">24 Issued</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Ready for print</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-5">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner">⭐</div>
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Rated Worker</h3>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Michael S.</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">4.9/5.0 Rating</p>
              </div>
            </div>
          </div>

          {/* Rewards List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest font-serif">Recognition History</h3>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Search rewards..." className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-slate-400 w-64" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-50 dark:border-slate-800">
                    <th className="px-8 py-5 font-normal">Recipient</th>
                    <th className="px-8 py-5 font-normal">Reward Type</th>
                    <th className="px-8 py-5 font-normal">Value</th>
                    <th className="px-8 py-5 font-normal">Date Granted</th>
                    <th className="px-8 py-5 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                  {rewardsHistory.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-700 dark:text-slate-200">{row.name}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                          <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight text-[10px]">{row.type}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-black text-slate-900 dark:text-white">{row.value}</td>
                      <td className="px-8 py-5 text-xs text-slate-500 font-medium">{row.date}</td>
                      <td className="px-8 py-5 text-right">
                        <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">View Certificate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reward Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white font-serif">Grant Special Reward</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Recognize professional excellence</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400 hover:text-slate-900">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                
                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Select Employee</label>
                    <input 
                      type="text" 
                      placeholder="Search worker name..." 
                      value={formData.worker}
                      onChange={(e) => setFormData({...formData, worker: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 font-bold" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Reward Category</label>
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 font-bold"
                      >
                        <option>Quarterly Bonus</option>
                        <option>Yearly Bonus</option>
                        <option>Employee of the Month</option>
                        <option>Gift Award</option>
                        <option>Gift Card</option>
                        <option>Others Gifts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Value (EUR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">€</span>
                        <input 
                          type="number" 
                          placeholder="0.00"
                          value={formData.value}
                          onChange={(e) => setFormData({...formData, value: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 font-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Award Description</label>
                    <textarea 
                      rows="3" 
                      placeholder="Detail why this worker is being recognized..."
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 font-medium"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Evidence / Certificate Upload</label>
                    <div className="border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl p-8 text-center hover:border-slate-400 transition-all cursor-pointer group">
                      <svg className="w-10 h-10 text-slate-200 mx-auto mb-2 group-hover:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Click to upload award image or certificate</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleGrantReward}
                    className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:opacity-90 transition-all"
                  >
                    Authorize & Grant Reward
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
