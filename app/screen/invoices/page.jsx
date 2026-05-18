"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

export default function InvoicesPage() {
  // Dummy Data for Invoice List
  const invoicesList = [
    { id: 'INV-001', customer: 'Sarah Johnson', amount: '€119.00', date: '10/05/2026', status: 'SENT', active: true },
    { id: 'INV-01544', customer: 'Lily Rodriguez', amount: '€1,250.00', date: '15/05/2026', status: 'SENT', active: false },
    { id: 'INV-01545', customer: 'Owen Lee', amount: '€2,100.00', date: '18/05/2026', status: 'SENT', active: false },
    { id: 'INV-01546', customer: 'Chloe Myers', amount: '€1,950.00', date: '19/05/2026', status: 'SENT', active: false },
    { id: 'INV-01547', customer: 'Xavier Davis', amount: '€3,203.00', date: '20/05/2026', status: 'SENT', active: false },
    { id: 'INV-01548', customer: 'Harper Martinez', amount: '€2,400.00', date: '22/05/2026', status: 'SENT', active: false },
    { id: 'INV-01549', customer: 'Logan Wright', amount: '€1,450.00', date: '25/05/2026', status: 'SENT', active: false },
    { id: 'INV-01550', customer: 'Avery Khan', amount: '€1,300.00', date: '28/05/2026', status: 'SENT', active: false },
    { id: 'INV-01551', customer: 'Evan Thomas', amount: '€1,476.00', date: '30/05/2026', status: 'SENT', active: false },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">
              Invoices Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            
            {/* Left Column: Invoice List */}
            <div className="lg:col-span-4 flex flex-col h-[700px]">
              
              {/* List Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-32">
                  <select className="appearance-none w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm pl-3 pr-8 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    <option value="all">All</option>
                    <option value="paid">Paid</option>
                    <option value="sent">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md shadow-sm transition-colors">
                  New +
                </button>
              </div>

              {/* Scrollable List */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex-1 overflow-y-auto no-scrollbar">
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {invoicesList.map((invoice, index) => (
                    <div 
                      key={index}
                      className={`p-4 cursor-pointer transition-colors ${
                        invoice.active 
                          ? 'bg-indigo-50/50 dark:bg-indigo-900/10 border-l-4 border-l-indigo-500' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-semibold ${invoice.active ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'}`}>
                          {invoice.customer}
                        </h4>
                        <span className={`text-sm font-bold ${invoice.active ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-900 dark:text-white'}`}>
                          {invoice.amount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex gap-2">
                          <span>{invoice.id}</span>
                          <span>|</span>
                          <span>{invoice.date}</span>
                        </div>
                        <span className="font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">{invoice.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Invoice Details */}
            <div className="lg:col-span-8 flex flex-col h-[700px]">
              
              <h2 className="text-xl font-serif text-slate-800 dark:text-slate-200 mb-4">Invoice</h2>
              
              <div className="flex flex-col gap-6 flex-1 overflow-y-auto no-scrollbar">
                
                {/* Top Details Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                  
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">STATUS : SENT</h3>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-md shadow-sm transition-colors">
                      Export
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    {/* Left Details */}
                    <div className="space-y-4 text-slate-600 dark:text-slate-300">
                      <p><span className="font-medium text-slate-800 dark:text-slate-200">Customer:</span> Sarah Johnson</p>
                      <p><span className="font-medium text-slate-800 dark:text-slate-200">Phone:</span> +49 151234567</p>
                      <p><span className="font-medium text-slate-800 dark:text-slate-200">Address:</span> Berlin, Germany</p>
                    </div>
                    
                    {/* Right Details */}
                    <div className="space-y-3 text-slate-600 dark:text-slate-300 md:text-right">
                      <p><span className="font-medium text-slate-800 dark:text-slate-200">Invoice ID:</span> INV-001</p>
                      <p><span className="font-medium text-slate-800 dark:text-slate-200">Booking ID:</span> BK-001</p>
                      <p className="pb-4"><span className="font-medium text-slate-800 dark:text-slate-200">Invoice Date:</span> 10 May 2026</p>
                      
                      <p><span className="font-medium text-slate-800 dark:text-slate-200">Net Amount:</span> €100</p>
                      <p><span className="font-medium text-slate-800 dark:text-slate-200">VAT (19%):</span> €19</p>
                      <p className="text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800 inline-block">Gross Total: €119</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Table Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex-1">
                  
                  {/* Toolbar */}
                  <div className="flex items-center gap-4 p-3 border-b border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-50 dark:bg-slate-800/30">
                    <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
                    <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" /></svg></button>
                    <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg></button>
                  </div>

                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                          <th className="px-6 py-4 font-normal w-16">#</th>
                          <th className="px-6 py-4 font-normal">
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              Service
                            </div>
                          </th>
                          <th className="px-6 py-4 font-normal">
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              Duration
                            </div>
                          </th>
                          <th className="px-6 py-4 font-normal">
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              Rate
                            </div>
                          </th>
                          <th className="px-6 py-4 font-normal">
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                              Amount
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-slate-500">1</td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Deep Cleaning</td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-400">2 hrs</td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-400">€50</td>
                          <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">€100</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-slate-500">2</td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Material Charges</td>
                          <td className="px-6 py-4 text-slate-400 dark:text-slate-500">—</td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-400">€10</td>
                          <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">€10</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-slate-400 text-center cursor-pointer hover:text-slate-600 dark:hover:text-slate-200">+</td>
                          <td colSpan="4"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Invoices</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">1,245</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Paid Invoices</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">1,120</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Pending Invoices</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">85</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">VAT Collected</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">€12,580</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
