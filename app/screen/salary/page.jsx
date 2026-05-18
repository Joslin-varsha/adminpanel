"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

export default function SalaryPage() {
  const [employees, setEmployees] = useState([
    { id: 'W-101', name: 'Michael Schmidt', wage: '18.50', status: 'Hired', tenure: 'Jan 12, 2024' },
    { id: 'W-102', name: 'Sarah Wagner', wage: '19.00', status: 'Hired', tenure: 'Mar 05, 2024' },
    { id: 'W-103', name: 'Thomas Müller', wage: '17.50', status: 'Resigned', tenure: 'Feb 10, 2023' },
    { id: 'W-104', name: 'Elena Fischer', wage: '20.00', status: 'Hired', tenure: 'Jun 20, 2024' },
    { id: 'W-105', name: 'Andreas Koch', wage: '18.00', status: 'Fired', tenure: 'Jan 15, 2024' },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [editData, setEditData] = useState({ wage: '', status: '' });

  const handleUpdateSalary = () => {
    setEmployees(employees.map(emp => 
      emp.id === selectedWorker.id ? { ...emp, wage: editData.wage, status: editData.status } : emp
    ));
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif uppercase">Salary System</h1>
              <p className="text-sm text-slate-500 mt-1 font-medium italic">Manage employee hourly wages and contract status</p>
            </div>
            <button className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:opacity-90 transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Export Payroll
            </button>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Avg. Hourly Wage</h3>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">€18.60</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Hired Staff</h3>
              <p className="text-2xl font-black text-emerald-600 tracking-tight">124</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Monthly Payroll</h3>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">€84,250</p>
            </div>
          </div>

          {/* Salary Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Compensation Management</h3>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Search employee..." className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-50 dark:border-slate-800">
                    <th className="px-6 py-4 font-normal">Employee Name</th>
                    <th className="px-6 py-4 font-normal">Hourly Wage</th>
                    <th className="px-6 py-4 font-normal">Status</th>
                    <th className="px-6 py-4 font-normal">Tenure (Hired)</th>
                    <th className="px-6 py-4 font-normal">Total Rewards</th>
                    <th className="px-6 py-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">{emp.name.charAt(0)}</div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{emp.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono tracking-tighter">{emp.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900 dark:text-white">€{emp.wage}<span className="text-[10px] text-slate-400 font-medium">/hr</span></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg w-fit border border-slate-100 dark:border-slate-800">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            emp.status === 'Hired' ? 'bg-emerald-500 shadow-sm shadow-emerald-500/20' : 
                            emp.status === 'Fired' ? 'bg-rose-500 shadow-sm shadow-rose-500/20' : 'bg-slate-400'
                          }`}></span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">{emp.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium italic">{emp.tenure}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          <span>€450.00</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => { setSelectedWorker(emp); setEditData({ wage: emp.wage, status: emp.status }); setIsEditModalOpen(true); }}
                          className="px-4 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                        >
                          Manage Contract
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <h2 className="text-lg font-black uppercase tracking-widest">Update Contract</h2>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hourly Wage (EUR)</label>
                    <input 
                      type="number" 
                      value={editData.wage} 
                      onChange={(e) => setEditData({...editData, wage: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 font-black" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Employment Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Hired', 'Fired', 'Resigned'].map(s => (
                        <button 
                          key={s}
                          onClick={() => setEditData({...editData, status: s})}
                          className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                            editData.status === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={handleUpdateSalary}
                    className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/10"
                  >
                    Save Changes
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
