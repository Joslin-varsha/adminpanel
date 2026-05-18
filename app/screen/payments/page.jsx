"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

export default function PaymentsPage() {
  // Dummy Data
  const allPayments = [
    { id: 'PAY-001', customer: 'Sarah Johnson', bookingId: 'BK-001', invoiceId: 'INV-001', method: 'Stripe', amount: '€119', date: 'May 10, 2026', status: 'Success' },
    { id: 'PAY-002', customer: 'Michael Chen', bookingId: 'BK-002', invoiceId: 'INV-002', method: 'Stripe', amount: '€95.20', date: 'May 11, 2026', status: 'Pending' },
    { id: 'PAY-003', customer: 'Emma Williams', bookingId: 'BK-003', invoiceId: 'INV-003', method: 'Stripe', amount: '€178.50', date: 'May 12, 2026', status: 'Failed' },
    { id: 'PAY-004', customer: 'James Brown', bookingId: 'BK-004', invoiceId: 'INV-004', method: 'Stripe', amount: '€250', date: 'May 13, 2026', status: 'Success' },
    { id: 'PAY-005', customer: 'Olivia Davis', bookingId: 'BK-005', invoiceId: 'INV-005', method: 'Stripe', amount: '€45', date: 'May 13, 2026', status: 'Success' },
    { id: 'PAY-006', customer: 'Sophia Martinez', bookingId: 'BK-006', invoiceId: 'INV-006', method: 'Stripe', amount: '€120', date: 'May 14, 2026', status: 'Pending' },
    { id: 'PAY-007', customer: 'Liam Anderson', bookingId: 'BK-007', invoiceId: 'INV-007', method: 'Stripe', amount: '€89', date: 'May 14, 2026', status: 'Success' },
    { id: 'PAY-008', customer: 'Isabella Taylor', bookingId: 'BK-008', invoiceId: 'INV-008', method: 'Stripe', amount: '€300', date: 'May 15, 2026', status: 'Failed' },
    { id: 'PAY-009', customer: 'Noah Wilson', bookingId: 'BK-009', invoiceId: 'INV-009', method: 'Stripe', amount: '€65', date: 'May 15, 2026', status: 'Success' },
    { id: 'PAY-010', customer: 'Ava Thomas', bookingId: 'BK-010', invoiceId: 'INV-010', method: 'Stripe', amount: '€150', date: 'May 16, 2026', status: 'Pending' },
  ];

   // State
   const [searchTerm, setSearchTerm] = useState('');
   const [statusFilter, setStatusFilter] = useState('');
   const [methodFilter, setMethodFilter] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [openDropdownId, setOpenDropdownId] = useState(null);
   const itemsPerPage = 10;

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-column')) {
        setOpenDropdownId(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Logic
  const filteredPayments = allPayments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || payment.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesMethod = methodFilter === '' || payment.method.toLowerCase() === methodFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Calculate Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  // Badge Styling Helpers
  const getMethodBadgeStyle = (method) => {
    switch (method) {
      case 'Stripe': return 'bg-red-500 text-white dark:bg-red-600';
      case 'PayPal': return 'bg-rose-300 text-rose-900 dark:bg-rose-400 dark:text-rose-950';
      case 'Card': return 'bg-green-600 text-white dark:bg-green-700';
      default: return 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Success': return 'text-slate-900 dark:text-white font-semibold';
      case 'Pending': return 'text-amber-600 font-semibold';
      case 'Failed': return 'text-rose-600 font-semibold';
      default: return 'text-slate-500 font-medium';
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
              Payment Tracking
            </h1>
            
            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
              
              {/* Left Side: Filters */}
              <div className="flex flex-wrap items-center gap-4 flex-1">
                <div className="w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Search Payments.."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-slate-100 transition-shadow shadow-sm"
                  />
                </div>
                <div className="w-full sm:w-40 relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="appearance-none w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm pl-4 pr-10 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="" className="text-slate-500">Status</option>
                    <option value="success" className="text-slate-900 dark:text-slate-100">Success</option>
                    <option value="pending" className="text-slate-900 dark:text-slate-100">Pending</option>
                    <option value="failed" className="text-slate-900 dark:text-slate-100">Failed</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="w-full sm:w-40 relative">
                  <select 
                    value={methodFilter}
                    onChange={(e) => { setMethodFilter(e.target.value); setCurrentPage(1); }}
                    className="appearance-none w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm pl-4 pr-10 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="" className="text-slate-500">Method</option>
                    <option value="stripe" className="text-slate-900 dark:text-slate-100">Stripe</option>
                    <option value="paypal" className="text-slate-900 dark:text-slate-100">PayPal</option>
                    <option value="card" className="text-slate-900 dark:text-slate-100">Card</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="w-full sm:w-40 relative">
                  <select className="appearance-none w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm pl-4 pr-10 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    <option value="" className="text-slate-500">Date</option>
                    <option value="today" className="text-slate-900 dark:text-slate-100">Today</option>
                    <option value="week" className="text-slate-900 dark:text-slate-100">This Week</option>
                    <option value="month" className="text-slate-900 dark:text-slate-100">This Month</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side: Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 mt-4 lg:mt-0">
                <button className="px-5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Export
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-md shadow-sm transition-colors">
                  Download pdf
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Revenue</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">€24,580</p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Successful Payments</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">1,240</p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Failed Payments</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">18</p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Pending Transactions</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">42</p>
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
                        Payment ID
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        Customer
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        Booking ID
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Invoice ID
                      </div>
                    </th>
                   
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Amount
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Payment Date
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Status
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {currentPayments.map((payment, index) => (
                    <tr 
                      key={payment.id} 
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${openDropdownId === payment.id ? 'relative z-50' : ''}`}
                    >
                      <td className="px-4 py-4 text-slate-400 text-center">{indexOfFirstItem + index + 1}</td>
                      <td className="px-4 py-4 font-medium text-slate-700 dark:text-slate-300">{payment.id}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{payment.customer}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{payment.bookingId}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{payment.invoiceId}</td>
                      
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{payment.amount}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{payment.date}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            payment.status === 'Success' ? 'bg-emerald-500' : 
                            payment.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                          }`}></div>
                          <span className={`text-[10px] uppercase tracking-wider ${getStatusBadgeStyle(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right relative action-column">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === payment.id ? null : payment.id);
                          }}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mx-auto block cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>

                        {openDropdownId === payment.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                            <button
                              onClick={() => { setOpenDropdownId(null); }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                              VIEW
                            </button>
                            <button
                              onClick={() => { setOpenDropdownId(null); }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                              INVOICE
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
                  className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${
                    currentPage === idx + 1
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
