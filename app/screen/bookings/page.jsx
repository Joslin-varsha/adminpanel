"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Link from 'next/link';

export default function BookingsPage() {
  // Dummy Data
  const allBookings = [
    { id: 'BK-001', customer: 'Sarah Johnson', worker: 'Ravi Kumar', date: '2026-05-15', time: '09:00 AM', service: 'Deep Cleaning, Sanitization', distance: '12 km', status: 'Pending', payment: 'Unpaid' },
    { id: 'BK-002', customer: 'Michael Chen', worker: 'Asha Verma', date: '2026-05-15', time: '10:30 AM', service: 'Plumbing', distance: '18 km', status: 'Accepted', payment: 'Paid' },
    { id: 'BK-003', customer: 'Emma Williams', worker: 'John Peter', date: '2026-05-16', time: '02:15 PM', service: 'Painting, Wall Prep', distance: '8 km', status: 'In Progress', payment: 'Paid' },
    { id: 'BK-004', customer: 'James Brown', worker: 'Vikram Singh', date: '2026-05-16', time: '11:00 AM', service: 'Handyman', distance: '22 km', status: 'Completed', payment: 'Paid' },
    { id: 'BK-005', customer: 'Olivia Davis', worker: 'Priya Nair', date: '2026-05-17', time: '08:45 AM', service: 'Laundry, Folding', distance: '14 km', status: 'Cancelled', payment: 'Pending' },
    { id: 'BK-006', customer: 'Sophia Martinez', worker: 'Amit Sharma', date: '2026-05-17', time: '03:30 PM', service: 'Electrical', distance: '7 km', status: 'Completed', payment: 'Paid' },
    { id: 'BK-007', customer: 'Liam Anderson', worker: 'Meera Reddy', date: '2026-05-18', time: '01:00 PM', service: 'Carpentry', distance: '19 km', status: 'Accepted', payment: 'Pending' },
    { id: 'BK-008', customer: 'Isabella Taylor', worker: 'Suresh Patel', date: '2026-05-18', time: '10:00 AM', service: 'Pest Control', distance: '11 km', status: 'In Progress', payment: 'Paid' },
    { id: 'BK-009', customer: 'Noah Wilson', worker: 'Kavita Das', date: '2026-05-19', time: '09:15 AM', service: 'AC Repair, Gas Fill', distance: '25 km', status: 'Pending', payment: 'Unpaid' },
    { id: 'BK-010', customer: 'Ava Thomas', worker: 'Rajesh Iyer', date: '2026-05-19', time: '11:45 AM', service: 'Gardening', distance: '6 km', status: 'Completed', payment: 'Paid' },
    { id: 'BK-011', customer: 'Oliver White', worker: 'Ravi Kumar', date: '2026-05-20', time: '08:00 AM', service: 'Deep Cleaning', distance: '5 km', status: 'Pending', payment: 'Unpaid' },
    { id: 'BK-012', customer: 'Charlotte Harris', worker: 'Asha Verma', date: '2026-05-20', time: '02:00 PM', service: 'Plumbing', distance: '9 km', status: 'Completed', payment: 'Paid' },
  ];

  // Pagination State
    // State
   const [searchTerm, setSearchTerm] = useState('');
   const [workerFilter, setWorkerFilter] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [openDropdownId, setOpenDropdownId] = useState(null);
   const itemsPerPage = 10;

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Filter Logic
  const filteredBookings = allBookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWorker = workerFilter === '' || booking.worker === workerFilter;

    return matchesSearch && matchesWorker;
  });

  // Calculate Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  // Badge Styling Helpers
  const getServiceBadgeStyle = (service) => {
    switch (service) {
      case 'Deep Cleaning': return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200';
      case 'Plumbing': return 'bg-rose-200 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300';
      case 'Painting': return 'bg-blue-200 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
      case 'Handyman': return 'bg-blue-300 text-blue-900 dark:bg-blue-800 dark:text-blue-100';
      case 'Laundry': return 'bg-amber-700 text-white dark:bg-amber-800 dark:text-white';
      case 'Electrical': return 'bg-slate-900 text-white dark:bg-black dark:text-white';
      case 'Carpentry': return 'bg-blue-800 text-white dark:bg-blue-900 dark:text-white';
      case 'Pest Control': return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
      case 'AC Repair': return 'bg-orange-200 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300';
      case 'Gardening': return 'bg-rose-300 text-rose-900 dark:bg-rose-800 dark:text-rose-100';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getPaymentBadgeStyle = (payment) => {
    switch (payment) {
      case 'Paid': return 'text-slate-900 dark:text-white font-semibold';
      default: return 'text-slate-500 dark:text-slate-400 font-medium';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif mb-8">
              Booking Management
            </h1>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              
              {/* Left Side: Search and Assign */}
              <div className="flex flex-wrap items-center gap-4 flex-1">
                <div className="w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search Bookings.."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-slate-100 transition-shadow shadow-sm"
                  />
                </div>
                <div className="w-full sm:w-48 relative">
                  <select 
                    value={workerFilter}
                    onChange={(e) => { setWorkerFilter(e.target.value); setCurrentPage(1); }}
                    className="appearance-none w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm pl-4 pr-10 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="" className="text-slate-500">Assign Worker</option>
                    <option value="Ravi Kumar" className="text-slate-900 dark:text-slate-100">Ravi Kumar</option>
                    <option value="Asha Verma" className="text-slate-900 dark:text-slate-100">Asha Verma</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side: Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 mt-4 lg:mt-0">
                <button className="px-5 py-2 bg-white dark:bg-slate-900 border border-blue-400 dark:border-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm mb-6">

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="px-4 py-4 font-normal w-12 text-center"></th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                        Booking ID
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        Customer
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        Worker Assigned
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Booking Date
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Time
                      </div>
                    </th>
                    {/* <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Service Type
                      </div>
                    </th> */}
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        Distance
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Payment Status
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {currentBookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${openDropdownId === booking.id ? 'relative z-50' : ''}`}
                    >
                      <td className="px-4 py-4 text-slate-400 text-center">{indexOfFirstItem + index + 1}</td>
                      <td className="px-4 py-4 font-medium text-slate-700 dark:text-slate-300">{booking.id}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{booking.customer}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{booking.worker}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{booking.date}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{booking.time}</td>
                      {/* <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {booking.service.split(', ').map((s, i) => (
                            <span key={i} className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border border-transparent shadow-sm ${getServiceBadgeStyle(s)}`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </td> */}
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{booking.distance}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {booking.payment === 'Paid' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
                          <span className={`text-[11px] uppercase tracking-wider ${getPaymentBadgeStyle(booking.payment)}`}>
                            {booking.payment}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === booking.id ? null : booking.id);
                          }}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mx-auto block cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>

                        {openDropdownId === booking.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 text-left">
                            <Link href="/screen/bookings/details" className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                              VIEW
                            </Link>
                            <button
                              onClick={() => { setOpenDropdownId(null); }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
                              CANCEL
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Plus icon row like in design */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-4 text-slate-400 text-center cursor-pointer hover:text-slate-600 dark:hover:text-slate-200">+</td>
                    <td colSpan="9"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end mt-4">
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${currentPage === idx + 1
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
