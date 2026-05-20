"use client";

import React from 'react';
import Sidebar from '../../../../components/Sidebar';
import Link from 'next/link';

export default function BookingDetailsPage() {
  // Booking details including the new features from the Post a Job reference image
  const [bookingData] = React.useState({
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
    basicPayment: 1200, // Service Fee (1000) + Materials (200)
    extraHours: 2.5,
    extraAmount: 500,  // Overtime
    
    // Additional Details
    date: 'May 15, 2026',
    address: '123 Luxury Avenue, Skyline Heights, City',
    contact: '+1 234 567 890',

    // Specifications fields from the image
    rooms: '3 Rooms',
    sqm: '3K sqm',
    expectedTime: '3 Hrs',
    materialsRequired: 'Yes',
    vacuumRequired: 'Yes',
    frequency: 'One Time',
    scheduleDate: '2024-05-24',
    scheduleTime: '12:00 PM',
    referredBy: 'Pawan Kumar',
    note: 'Please pay extra attention to dusting the high shelves and cleaning behind the kitchen appliances.',
    estimatedCost: 60
  });

  // Dynamic Financial Calculations to guarantee mathematical correctness
  const materialsFee = 200;
  const serviceFee = bookingData.basicPayment - materialsFee; // €1000
  const overtimeFee = bookingData.extraAmount; // €500
  const calculatedGrandTotal = serviceFee + materialsFee + overtimeFee; // €1700 (which matches bookingData.basicPayment + bookingData.extraAmount)

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
                    Booking <span className="text-slate-500 font-medium">#{bookingData.id}</span>
                  </h1>
                  <span className="px-2.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                    {bookingData.status}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Created on {bookingData.date} • Reference: 982-AX-L20</p>
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
                        {bookingData.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 dark:text-white">{bookingData.customer}</p>
                        <p className="text-xs text-slate-500">{bookingData.contact}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Assigned Worker</label>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 font-bold text-base border border-slate-200 dark:border-slate-700">
                        {bookingData.worker.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 dark:text-white">{bookingData.worker}</p>
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
                        {bookingData.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Specifications & Schedule Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-350 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Job Specifications & Schedule</h3>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Grid for Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Rooms */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 hover:scale-[1.01] transition-transform duration-200 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rooms</p>
                        <p className="text-base font-bold text-slate-800 dark:text-white">{bookingData.rooms}</p>
                      </div>
                    </div>

                    {/* SQM */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 hover:scale-[1.01] transition-transform duration-200 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h6m-6 3h6m-6 3h6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Area (SQM)</p>
                        <p className="text-base font-bold text-slate-800 dark:text-white">{bookingData.sqm}</p>
                      </div>
                    </div>

                    {/* Expected Time */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 hover:scale-[1.01] transition-transform duration-200 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expected Time</p>
                        <p className="text-base font-bold text-slate-800 dark:text-white">{bookingData.expectedTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Grid for Requirements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Cleaning Materials */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cleaning Materials Required</p>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Standard eco-friendly supplies</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        bookingData.materialsRequired === 'Yes'
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450 border-emerald-100/80 dark:border-emerald-900/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent'
                      }`}>
                        {bookingData.materialsRequired}
                      </span>
                    </div>

                    {/* Vacuum Cleaner */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vacuum Cleaner Required</p>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">HEPA filter allergen equipment</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        bookingData.vacuumRequired === 'Yes'
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450 border-emerald-100/80 dark:border-emerald-900/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent'
                      }`}>
                        {bookingData.vacuumRequired}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Schedule info card */}
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-150 dark:border-slate-800/60 rounded-xl space-y-4 shadow-inner">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Service Frequency */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Service Frequency</label>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 rounded text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            {bookingData.frequency}
                          </span>
                        </div>
                      </div>

                      {/* Date & Schedule */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Date & Schedule</label>
                        <p className="text-sm font-bold text-slate-800 dark:text-white leading-normal">
                          {new Date(bookingData.scheduleDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {bookingData.scheduleTime}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Referred By */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Referred By</label>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{bookingData.referredBy}</p>
                      </div>

                      {/* Estimated Cost */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimated Spec Cost</label>
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">€{bookingData.estimatedCost}.00</span>
                      </div>
                    </div>

                    {/* Optional Notes */}
                    {bookingData.note && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Special Instructions / Notes</label>
                        <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg leading-relaxed italic">
                          "{bookingData.note}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Logistical Timeline */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Workflow Timeline</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{bookingData.status}</span>
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
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{bookingData.travelStart}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[11px] text-slate-400 uppercase font-medium">Arrival</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{bookingData.travelEnd}</span>
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
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{bookingData.workStart}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[11px] text-slate-400 uppercase font-medium">Completion</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{bookingData.workEnd}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-12">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Service Scope</p>
                      <div className="flex gap-2">
                        {bookingData.serviceType.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400 shadow-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Logs</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{bookingData.distance} Distance</p>
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
                      <span className="text-sm font-bold text-slate-900 dark:text-white">€{serviceFee}.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">Materials</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">€{materialsFee}.00</span>
                    </div>
                    <div className="pt-2 border-t border-slate-50 dark:border-slate-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs text-slate-500 font-medium">Overtime</span>
                          <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{bookingData.extraHours}h Units</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">€{overtimeFee}.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Grand Total</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-wide">
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                        {bookingData.paymentStatus}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">€{calculatedGrandTotal}</span>
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
