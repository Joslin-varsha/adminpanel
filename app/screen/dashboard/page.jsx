"use client";

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';

export default function DashboardPage() {

  const stats = [
    { label: 'Total Jobs', value: '1,248', trend: '+12%', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Completed', value: '982', trend: '+18%', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Pending Jobs', value: '254', trend: '-2%', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Total Workers', value: '312', trend: '+5%', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Acceptance Rate', value: '94%', trend: '+1.2%', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Failed Payments', value: '12', trend: '-4%', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { label: 'Total Revenue (€)', value: '€45,231', trend: '+22%', color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
    { label: 'Subscription Rev (€)', value: '€12,450', trend: '+8%', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 no-scrollbar">
        <div className="p-6 mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Welcome, Admin</h1>
            
            {/* Quick Actions / Date */}
            <div className="flex items-center space-x-4">
              {/* <div className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center">
                <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div> */}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <svg className={`w-5 h-5 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{stat.value}</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Chart / Graph Area</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Bookings Status */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-4 h-48 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px]"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4"></div>
                    <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 tracking-wider text-center">BOOKINGS BY<br/>STATUS</h3>
                  </div>
                </div>

                {/* Revenue Overview */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-4 h-48 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px]"></div>
                  <div className="relative z-10 flex flex-col items-center w-full">
                    <div className="flex items-end justify-center space-x-2 w-full h-16 mb-4">
                      <div className="w-4 bg-emerald-300 dark:bg-emerald-600 h-8 rounded-t-sm"></div>
                      <div className="w-4 bg-emerald-400 dark:bg-emerald-500 h-12 rounded-t-sm"></div>
                      <div className="w-4 bg-emerald-500 dark:bg-emerald-400 h-16 rounded-t-sm"></div>
                    </div>
                    <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 tracking-wider text-center">REVENUE<br/>OVERVIEW</h3>
                  </div>
                </div>

                {/* Worker Ratings */}
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-100 dark:border-sky-800/50 rounded-xl p-4 h-48 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px]"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="flex space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg key={star} className={`w-6 h-6 ${star < 5 ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <h3 className="text-sm font-bold text-sky-900 dark:text-sky-300 tracking-wider text-center">WORKER<br/>RATINGS</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts Section */}
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Alerts</h2>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-indigo-500 shadow-sm overflow-hidden relative">
                {/* Purple decorative top bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                
                <div className="p-4">
                  <div className="flex items-center mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-4">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">Action Required</h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Needs your immediate attention</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {[
                      { text: 'Unassigned Jobs', count: 12, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
                      { text: 'Failed Payments', count: 4, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-900/30' },
                      { text: 'Worker Abuse', count: 1, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
                    ].map((alert, i) => (
                      <li key={i} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-pointer group">
                        <div className="flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${alert.bg.split(' ')[0].replace('100', '500')}`}></div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{alert.text}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${alert.bg} ${alert.color}`}>
                          {alert.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="mt-4 w-full py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-md transition-colors">
                    View All Alerts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
