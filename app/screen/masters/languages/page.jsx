"use client";

import React, { useState } from 'react';
import Sidebar from '../../../../components/Sidebar';

export default function LanguagesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy languages data
  const initialLanguages = [
    { id: 'LNG-001', name: 'German', code: 'DE' },
    { id: 'LNG-002', name: 'English', code: 'EN' },
    { id: 'LNG-003', name: 'Spanish', code: 'ES' },
    { id: 'LNG-004', name: 'French', code: 'FR' },
    { id: 'LNG-005', name: 'Italian', code: 'IT' },
    { id: 'LNG-006', name: 'Turkish', code: 'TR' },
    { id: 'LNG-007', name: 'Polish', code: 'PL' },
    { id: 'LNG-008', name: 'Hindi', code: 'HI' },
    { id: 'LNG-009', name: 'Arabic', code: 'AR' },
    { id: 'LNG-010', name: 'Portuguese', code: 'PT' },
    { id: 'LNG-011', name: 'Dutch', code: 'NL' },
  ];

  const [languages] = useState(initialLanguages);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter Logic
  const filteredLanguages = languages.filter(lang => {
    return lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           lang.code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">Languages</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Manage languages supported by providers.</p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-sm"
            >
              Add Language
            </button>
          </div>

          {/* Filters Bar */}
          <div className="mb-6">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search languages..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="py-4 px-6 w-16 text-center">#</th>
                    <th className="py-4 px-6">Language ID</th>
                    <th className="py-4 px-6">Language Name</th>
                    <th className="py-4 px-6">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredLanguages.map((lang, index) => (
                    <tr key={lang.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors text-sm text-slate-700 dark:text-slate-300">
                      <td className="py-4 px-6 text-center text-slate-400 font-medium">{index + 1}</td>
                      <td className="py-4 px-6 font-medium text-slate-500 dark:text-slate-400">{lang.id}</td>
                      <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">{lang.name}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {lang.code}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredLanguages.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-slate-400 italic font-medium">No languages found matching your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Language Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Add New Language</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Language Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Portuguese" 
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Language Code</label>
                  <input 
                    type="text" 
                    placeholder="e.g. PT" 
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all font-medium uppercase"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 sm:flex-none px-8 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 sm:flex-none px-10 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all hover:scale-[1.02] active:scale-95">
                    Save Language
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
