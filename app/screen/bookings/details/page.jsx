"use client";

import React from 'react';
import Sidebar from '../../../../components/Sidebar';
import Link from 'next/link';

export default function BookingDetailsPage() {
  // Static Dummy Data for Details
  const booking = {
    id: 'BK-001',
    customer: 'Sarah Johnson',
    worker: 'Ravi Kumar',
    status: 'In Progress',
    paymentStatus: 'Paid',
    serviceType: ['Deep Cleaning', 'Sanitization'],
    distance: '12 km',
    
    // Time Logs
    travelStart: '09:00 AM',
    travelEnd: '09:30 AM',
    workStart: '09:45 AM',
    workEnd: '05:45 PM',
    
    // Payment Details
    basicPayment: 1200,
    extraHours: 2.5,
    extraAmount: 500,
    totalPayment: 1700,
    
    // Additional Details
    date: 'May 15, 2026',
    address: '123 Luxury Avenue, Skyline Heights, City',
    contact: '+1 234 567 890'
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-6xl p-8 mx-auto">
          
          {/* Breadcrumb & Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
              <Link href="/screen/bookings" className="hover:text-slate-900 transition-colors">Bookings</Link>
              <svg className="w-2.5 h-2.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              <span className="text-slate-900 dark:text-white">Details</span>
            </nav>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Booking <span className="text-slate-500 font-medium">#{booking.id}</span>
                  </h1>
                  <span className="px-2.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                    {booking.status}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Created on {booking.date} • Reference: 982-AX-L20</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-wide">
                  Download PDF
                </button>
                <button className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-slate-900/10 uppercase tracking-wide">
                  Print Invoice
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Entity Information Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
                  <div className="p-6">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Customer Details</label>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 font-bold text-base border border-slate-200 dark:border-slate-700">
                        {booking.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 dark:text-white">{booking.customer}</p>
                        <p className="text-xs text-slate-500">{booking.contact}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Assigned Worker</label>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 font-bold text-base border border-slate-200 dark:border-slate-700">
                        {booking.worker.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 dark:text-white">{booking.worker}</p>
                        <p className="text-xs text-slate-500">Professional • Rating 4.8</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:col-span-2 bg-slate-50/30 dark:bg-slate-800/20">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Service Address</label>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed pt-1">
                        {booking.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logistical Timeline */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Workflow Timeline</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{booking.status}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Logistics</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-[11px] text-slate-400 uppercase font-medium">Dispatch</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{booking.travelStart}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[11px] text-slate-400 uppercase font-medium">Arrival</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{booking.travelEnd}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Execution</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-[11px] text-slate-400 uppercase font-medium">Work Start</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{booking.workStart}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[11px] text-slate-400 uppercase font-medium">Completion</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{booking.workEnd}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-12">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Service Scope</p>
                      <div className="flex gap-2">
                        {booking.serviceType.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400 shadow-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Logs</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{booking.distance} Distance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Finance */}
            <div className="space-y-8">
              
              {/* Financial Summary Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Financial Statement</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">Service Fee</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">€{booking.basicPayment - 200}.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">Materials</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">€200.00</span>
                    </div>
                    <div className="pt-2 border-t border-slate-50 dark:border-slate-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs text-slate-500 font-medium">Overtime</span>
                          <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{booking.extraHours}h Units</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">€{booking.extraAmount}.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Grand Total</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-wide">
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                        {booking.paymentStatus}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">€{booking.totalPayment}</span>
                      <span className="text-sm font-medium text-slate-400">.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Note */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-1">Advisory Note</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      Manual dispatch override active. Final payment values are subject to manager audit before permanent ledger entry.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
