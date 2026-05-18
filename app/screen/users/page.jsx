"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

export default function UsersPage() {
   const [searchTerm, setSearchTerm] = useState('');
   const [subFilter, setSubFilter] = useState('');
   const [statusFilter, setStatusFilter] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const itemsPerPage = 10;

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Dummy user data with updated subscriptions
  const allUsers = [
    { id: 'USR-001', name: 'Ravi Kumar', email: 'ravi.kumar@email.com', phone: '+49 151234567', location: 'Berlin', subscription: 'Daily', bookings: 18, status: 'Active' },
    { id: 'USR-002', name: 'Asha Verma', email: 'asha.verma@email.com', phone: '+49 161245678', location: 'Munich', subscription: 'Weekly', bookings: 12, status: 'Active' },
    { id: 'USR-003', name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+49 171356789', location: 'Hamburg', subscription: 'Monthly', bookings: 22, status: 'Active' },
    { id: 'USR-004', name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+49 151987654', location: 'Frankfurt', subscription: 'Daily', bookings: 15, status: 'Active' },
    { id: 'USR-005', name: 'Deepa Singh', email: 'deepa.singh@email.com', phone: '+49 162345678', location: 'Cologne', subscription: 'Weekly', bookings: 3, status: 'Inactive' },
    { id: 'USR-006', name: 'Rajesh Gupta', email: 'rajesh.gupta@email.com', phone: '+49 171456789', location: 'Stuttgart', subscription: 'Monthly', bookings: 25, status: 'Active' },
    { id: 'USR-007', name: 'Meera Reddy', email: 'meera.reddy@email.com', phone: '+49 151678901', location: 'Dresden', subscription: 'Daily', bookings: 9, status: 'Active' },
    { id: 'USR-008', name: 'Vikram Nair', email: 'vikram.nair@email.com', phone: '+49 162567890', location: 'Leipzig', subscription: 'Weekly', bookings: 2, status: 'Blocked' },
    { id: 'USR-009', name: 'Sunita Desai', email: 'sunita.desai@email.com', phone: '+49 171789012', location: 'Berlin', subscription: 'Monthly', bookings: 20, status: 'Active' },
    { id: 'USR-010', name: 'Karan Mehta', email: 'karan.mehta@email.com', phone: '+49 151890123', location: 'Munich', subscription: 'Daily', bookings: 7, status: 'Blocked' },
    { id: 'USR-011', name: 'Anjali Iyer', email: 'anjali.iyer@email.com', phone: '+49 162901234', location: 'Hamburg', subscription: 'Weekly', bookings: 24, status: 'Active' },
    { id: 'USR-012', name: 'Sanjay Joshi', email: 'sanjay.joshi@email.com', phone: '+49 171012345', location: 'Frankfurt', subscription: 'Monthly', bookings: 1, status: 'Inactive' },
  ];

  // Helper functions for badge styling

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Active': return 'text-slate-900 dark:text-white font-semibold';
      default: return 'text-slate-500 font-medium';
    }
  };

  // Pagination Logic
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSub = subFilter === '' || user.subscription === subFilter;
    const matchesStatus = statusFilter === '' || user.status === statusFilter;

    return matchesSearch && matchesSub && matchesStatus;
  });
  
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">Users Management</h1>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-4 flex-1">
              
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users.."
                  className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-64 transition-shadow"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Subscription Dropdown */}
              <div className="relative">
                <select 
                  value={subFilter}
                  onChange={(e) => { setSubFilter(e.target.value); setCurrentPage(1); }}
                  className="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option value="">All Subscriptions</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[120px]"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Pending">Pending</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <button className="flex items-center px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap">
              Export CSV
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="py-4 px-4 w-12 text-center">#</th>
                    <th className="py-4 px-4">User ID</th>
                    <th className="py-4 px-4">Customer Name</th>
                    <th className="py-4 px-4">Email</th>
                    <th className="py-4 px-4">Phone</th>
                    <th className="py-4 px-4">Location</th>
                    <th className="py-4 px-4">Subscription</th>
                    <th className="py-4 px-4 text-center">Bookings</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {currentUsers.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors text-sm text-slate-700 dark:text-slate-300 ${openDropdownId === user.id ? 'relative z-50' : ''}`}
                    >
                      <td className="py-3 px-4 text-center text-slate-400">{indexOfFirstUser + index + 1}</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">{user.id}</td>
                      <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">{user.name}</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{user.email}</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{user.phone}</td>
                      <td className="py-3 px-4">{user.location}</td>
                      <td className="py-3 px-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                        {user.subscription}
                      </td>
                      <td className="py-3 px-4 text-center font-medium">{user.bookings}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Blocked' ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
                          <span className={`text-[10px] uppercase tracking-wider ${getStatusBadgeStyle(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === user.id ? null : user.id);
                          }}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mx-auto block cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>

                        {openDropdownId === user.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                            <button
                              onClick={() => { setSelectedUser(user); setIsViewModalOpen(true); setOpenDropdownId(null); }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                              VIEW
                            </button>
                            <button
                              onClick={() => { setSelectedUser(user); setIsBlockModalOpen(true); setOpenDropdownId(null); }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
                              BLOCK
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Showing <span className="font-medium text-slate-900 dark:text-white">{indexOfFirstUser + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="font-medium text-slate-900 dark:text-white">{filteredUsers.length}</span> entries
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      {/* User Details Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={1.5}/></svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedUser?.name}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">User ID: {selectedUser?.id} • <span className={`font-bold ${selectedUser?.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>{selectedUser?.status}</span></p>
                  </div>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedUser?.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Phone Number</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedUser?.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedUser?.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Subscription Type</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedUser?.subscription}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Bookings</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedUser?.bookings}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Member Since</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">January 15, 2026</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-800">
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-10 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block Confirmation Modal */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsBlockModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Block User?</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Are you sure you want to block <span className="font-bold text-slate-900 dark:text-white">{selectedUser?.name}</span>? They will no longer be able to book services.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsBlockModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsBlockModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 shadow-lg shadow-rose-500/20 transition-all"
                >
                  Confirm Block
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
