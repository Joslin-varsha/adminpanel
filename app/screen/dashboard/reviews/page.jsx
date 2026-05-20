"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Sidebar from '../../../../components/Sidebar';

export default function ReviewsPage() {
  // Rich reviews list state
  const [reviews, setReviews] = useState([
    {
      id: 'REV-001',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+49 151909876',
      location: 'Berlin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Very professional and on-time service. Highly recommended!',
      date: '2 hours ago',
      bookingId: '#HW-3849',
      workerName: 'Ravi Kumar',
      workerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      status: 'PENDING',
      isFlagged: false,
      isPinned: false,
      reply: ''
    },
    {
      id: 'REV-002',
      name: 'Priya Mehta',
      email: 'priya.mehta@email.com',
      phone: '+49 161298765',
      location: 'Munich',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Great experience! The team was very helpful!',
      date: 'Yesterday',
      bookingId: '#HW-3721',
      workerName: 'Asha Verma',
      workerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      status: 'REPLIED',
      isFlagged: false,
      isPinned: true,
      reply: 'Thank you Priya! We are thrilled that Asha did a great job for you.'
    },
    {
      id: 'REV-003',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+49 171356234',
      location: 'Hamburg',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Amazing deep cleaning. Reached exactly on schedule.',
      date: '3 days ago',
      bookingId: '#HW-3610',
      workerName: 'Amit Singh',
      workerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      status: 'PENDING',
      isFlagged: false,
      isPinned: false,
      reply: ''
    },
    {
      id: 'REV-004',
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      phone: '+49 151987019',
      location: 'Frankfurt',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 4,
      quote: 'Satisfactory plumbing service, fixed the leakage instantly.',
      date: '4 days ago',
      bookingId: '#HW-3552',
      workerName: 'Vikram Patel',
      workerAvatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=100&auto=format&fit=crop&q=80',
      status: 'REPLIED',
      isFlagged: false,
      isPinned: false,
      reply: 'Thanks Michael, we are glad Vikram resolved the leak quickly.'
    },
    {
      id: 'REV-005',
      name: 'Aisha Rahman',
      email: 'aisha.r@email.com',
      phone: '+49 162345091',
      location: 'Cologne',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'The cleaning materials used were of high quality. My rooms are sparkling clean!',
      date: '1 week ago',
      bookingId: '#HW-3419',
      workerName: 'Asha Verma',
      workerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      status: 'PENDING',
      isFlagged: false,
      isPinned: false,
      reply: ''
    },
    {
      id: 'REV-006',
      name: 'David Miller',
      email: 'd.miller@email.com',
      phone: '+49 171456112',
      location: 'Stuttgart',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 3,
      quote: 'Good cleaning, but they arrived about 15 minutes late. The vacuuming was thorough though.',
      date: '1 week ago',
      bookingId: '#HW-3210',
      workerName: 'Ravi Kumar',
      workerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      status: 'PENDING',
      isFlagged: false,
      isPinned: false,
      reply: ''
    }
  ]);

  // UI state filters
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showToast, setShowToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const triggerToast = (message) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  // State handlers
  const handleTogglePin = (id, e) => {
    if (e) e.stopPropagation();
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        const nextState = !rev.isPinned;
        triggerToast(nextState ? 'Pinned to Dashboard carousel!' : 'Removed from Dashboard!');
        return { ...rev, isPinned: nextState };
      }
      return rev;
    }));
    setOpenDropdownId(null);
  };

  const handleToggleFlag = (id, e) => {
    if (e) e.stopPropagation();
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        const nextState = !rev.isFlagged;
        triggerToast(nextState ? 'Review flagged for moderator investigation!' : 'Review unflagged.');
        return { ...rev, isFlagged: nextState };
      }
      return rev;
    }));
    setOpenDropdownId(null);
  };

  const handleSubmitReply = () => {
    if (!replyText.trim() || !selectedReview) return;
    const reviewId = selectedReview.id;
    
    setReviews(prev => prev.map(rev => {
      if (rev.id === reviewId) {
        return {
          ...rev,
          status: 'REPLIED',
          reply: replyText
        };
      }
      return rev;
    }));
    
    // Update currently viewed review in modal
    setSelectedReview(prev => ({
      ...prev,
      status: 'REPLIED',
      reply: replyText
    }));

    setReplyText('');
    triggerToast('Administrator response submitted successfully!');
  };

  // Calculations for live scorecard widgets
  const pendingResponsesCount = reviews.filter(r => r.status === 'PENDING').length;
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  
  // Filtering table list
  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = 
      rev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = ratingFilter === 'All' || rev.rating.toString() === ratingFilter;
    
    let matchesStatus = true;
    if (statusFilter !== 'All') {
      matchesStatus = rev.status === statusFilter;
    }

    return matchesSearch && matchesRating && matchesStatus;
  });
  
  // Calculate Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar relative">
        
        {/* Floating Notification Toast */}
        {showToast && (
          <div className="fixed bottom-6 right-6 z-[80] bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-4 py-3 rounded-xl shadow-lg border border-slate-800 dark:border-slate-200 flex items-center space-x-2 text-xs font-semibold animate-bounce">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span>{showToast}</span>
          </div>
        )}

        <div className="p-6 mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif mb-8">
              Customer Reviews
            </h1>
            
            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
              {/* Left Side: Filters */}
              <div className="flex flex-wrap items-center gap-4 flex-1">
                <div className="w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Search reviews.."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-slate-100 transition-shadow shadow-sm font-medium"
                  />
                </div>
                
                {/* Rating Dropdown Select */}
                <div className="w-full sm:w-40 relative">
                  <select
                    value={ratingFilter}
                    onChange={(e) => { setRatingFilter(e.target.value); setCurrentPage(1); }}
                    className="appearance-none w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm pl-4 pr-10 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                  >
                    <option value="All" className="text-slate-500">All Ratings</option>
                    <option value="5" className="text-slate-900 dark:text-slate-100">5 Stars</option>
                    <option value="4" className="text-slate-900 dark:text-slate-100">4 Stars</option>
                    <option value="3" className="text-slate-900 dark:text-slate-100">3 Stars</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Status Dropdown Select */}
                <div className="w-full sm:w-40 relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="appearance-none w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm pl-4 pr-10 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                  >
                    <option value="All" className="text-slate-500">All Status</option>
                    <option value="PENDING" className="text-slate-900 dark:text-slate-100">Pending</option>
                    <option value="REPLIED" className="text-slate-900 dark:text-slate-100">Replied</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Average Rating</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{averageRating}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Reviews</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{reviews.length}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Positive Sentiment</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">96.4%</p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Pending Responses</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{pendingResponsesCount}</p>
              </div>
            </div>

          </div>

          {/* Database-style Table Container matching the reference image */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="px-4 py-4 font-normal w-12 text-center"></th>
                    <th className="py-4 px-4">Review ID</th>
                    <th className="py-4 px-4">Customer</th>
                    <th className="py-4 px-4">Rating</th>
                    <th className="py-4 px-4">Assigned Worker</th>
                    <th className="py-4 px-4">Booking ID</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {currentReviews.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 px-4 text-center text-slate-400 dark:text-slate-600 text-xs">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-10 h-10 mb-2 text-slate-350 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span className="font-semibold block">No customer reviews found</span>
                          <span className="text-[10px] mt-0.5">Reset filters or try searching for another term.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentReviews.map((rev, index) => (
                      <tr
                        key={rev.id}
                        onClick={() => {
                          setSelectedReview(rev);
                          setIsViewModalOpen(true);
                        }}
                        className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors text-slate-700 dark:text-slate-300 cursor-pointer ${
                          rev.isFlagged
                            ? 'bg-rose-50/20 dark:bg-rose-950/5'
                            : rev.isPinned
                              ? 'bg-blue-50/15 dark:bg-blue-950/5'
                              : ''
                        } ${openDropdownId === rev.id ? 'relative z-50' : ''}`}
                      >
                        {/* Index count cell */}
                        <td className="px-4 py-4 text-center text-slate-400 font-medium">{indexOfFirstItem + index + 1}</td>
                        
                        {/* Review ID cell */}
                        <td className="px-4 py-4 text-slate-900 dark:text-white font-bold">
                          {rev.id}
                        </td>
                        
                        {/* Customer Name cell in regular weight like reference */}
                        <td className="px-4 py-4 font-medium text-slate-650 dark:text-slate-350">
                          {rev.name}
                        </td>
                        
                        {/* Rating cell */}
                        <td className="px-4 py-4">
                          <div className="flex space-x-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </td>
                        
                        {/* Assigned Worker cell */}
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400 font-medium">
                          {rev.workerName}
                        </td>
                        
                        {/* Booking ID cell */}
                        <td className="px-4 py-4 text-slate-500 dark:text-slate-450 font-medium">{rev.bookingId}</td>
                        
                        {/* Submission date cell */}
                        <td className="px-4 py-4 text-slate-400 dark:text-slate-500 font-medium">{rev.date}</td>
                        
                        {/* Status cell with color dot and uppercase text */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${rev.status === 'REPLIED' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                            <span className={`text-[10px] uppercase tracking-wider font-semibold ${rev.status === 'REPLIED' ? 'text-emerald-600 dark:text-emerald-450' : 'text-amber-600 dark:text-amber-450'}`}>
                              {rev.status}
                            </span>
                          </div>
                        </td>
                        
                        {/* Actions Ellipsis cell */}
                        <td className="px-4 py-4 text-center relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === rev.id ? null : rev.id);
                            }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 block mx-auto cursor-pointer"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>

                          {/* Action Dropdown Card */}
                          {openDropdownId === rev.id && (
                            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 text-left">
                              <button
                                onClick={() => {
                                  setSelectedReview(rev);
                                  setIsViewModalOpen(true);
                                  setOpenDropdownId(null);
                                }}
                                className="w-full px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                VIEW
                              </button>
                              <button
                                onClick={(e) => handleTogglePin(rev.id, e)}
                                className="w-full px-4 py-2 text-xs font-semibold text-slate-750 dark:text-slate-250 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                {rev.isPinned ? 'REMOVE PIN' : 'PIN TO SLIDER'}
                              </button>
                              <button
                                onClick={(e) => handleToggleFlag(rev.id, e)}
                                className="w-full px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
                                {rev.isFlagged ? 'UNFLAG REVIEW' : 'FLAG REVIEW'}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
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
                className="px-3 py-1 border border-slate-350 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-800'
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

        {/* Modal: View Details in clean read-only SaaS layout */}
        {isViewModalOpen && selectedReview && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs animate-fade-in" onClick={() => setIsViewModalOpen(false)}></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100 dark:border-slate-800 p-8 flex flex-col">
              
              {/* Modal Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  {selectedReview.avatar ? (
                    <img
                      src={selectedReview.avatar}
                      alt=""
                      className="w-16 h-16 rounded-full object-cover border border-slate-100 dark:border-slate-850"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {selectedReview.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                      Review ID: <span className="font-bold">{selectedReview.id}</span> • <span className={`font-semibold ${selectedReview.status === 'REPLIED' ? 'text-emerald-600 dark:text-emerald-450' : 'text-amber-600 dark:text-amber-450'}`}>{selectedReview.status}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full cursor-pointer transition-colors"
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Divider Line */}
              <div className="border-t border-slate-200 dark:border-slate-800 my-6"></div>

              {/* Modal Body: 2-Column Grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 overflow-y-auto max-h-[50vh] pr-1">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Email Address
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    {selectedReview.email}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Booking ID
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    {selectedReview.bookingId}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Phone Number
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    {selectedReview.phone}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Assigned Worker
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    {selectedReview.workerName}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Location
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    {selectedReview.location}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Rating Given
                  </span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3.5 h-3.5 ${i < selectedReview.rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">
                      ({selectedReview.rating}/5)
                    </span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Submission Date
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    {selectedReview.date}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Review Status
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    {selectedReview.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Review Content
                  </span>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-350 italic leading-relaxed">
                      "{selectedReview.quote}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider Line */}
              <div className="border-t border-slate-200 dark:border-slate-800 my-6"></div>

              {/* Modal Footer */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
