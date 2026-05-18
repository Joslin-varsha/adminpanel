"use client";

import React, { useState } from 'react';
import Sidebar from '../../../../components/Sidebar';

export default function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const itemsPerPage = 5;
  const categoriesList = [
    { id: 1, categoryId: 'C-001', name: 'Cleaning', desc: 'Home & office cleaning...', status: 'Active' },
    { id: 2, categoryId: 'C-002', name: 'Plumbing', desc: 'Pipe & repair services', status: 'Active' },
    { id: 3, categoryId: 'C-003', name: 'Electrical', desc: 'Wiring & maintenance', status: 'Inactive' },
    { id: 4, categoryId: 'C-004', name: 'Carpentry', desc: 'Furniture & woodwork services', status: 'Active' },
    { id: 5, categoryId: 'C-005', name: 'Painting', desc: 'Interior & exterior painting', status: 'Active' },
    { id: 6, categoryId: 'C-006', name: 'HVAC', desc: 'Heating & cooling systems', status: 'Active' },
    { id: 7, categoryId: 'C-007', name: 'Landscaping', desc: 'Garden & lawn maintenance', status: 'Active' },
    { id: 8, categoryId: 'C-008', name: 'Pest Control', desc: 'Insect & rodent removal', status: 'Inactive' },
    { id: 9, categoryId: 'C-009', name: 'Appliance Repair', desc: 'Fix household appliances', status: 'Active' },
    { id: 10, categoryId: 'C-010', name: 'Locksmith', desc: 'Key & lock services', status: 'Active' },
  ];

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-200 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
      case 'Inactive': return 'bg-orange-200 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300';
      default: return 'bg-slate-400 text-white';
    }
  };

  const filteredCategories = categoriesList;
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">
              Category Management
            </h1>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Categories"
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-slate-100 transition-shadow shadow-sm"
              />
            </div>
            
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-sm font-semibold rounded-md shadow-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Category
            </button>
          </div>

          {/* Data Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden mb-6">
            
            {/* Toolbar */}
            <div className="flex items-center gap-4 p-3 border-b border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-50 dark:bg-slate-800/30">
              <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
              <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg></button>
              <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg></button>
              <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg></button>
              <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg></button>
              <button className="hover:text-slate-600 dark:hover:text-slate-200"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
              <button className="hover:text-slate-600 dark:hover:text-slate-200 ml-auto"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="px-6 py-4 font-normal w-12 text-center"></th>
                    <th className="px-6 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                        Category ID
                      </div>
                    </th>
                    <th className="px-6 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        Category Name
                      </div>
                    </th>
                    <th className="px-6 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                        Description
                      </div>
                    </th>
                    <th className="px-6 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Status
                      </div>
                    </th>
                    <th className="px-6 py-4 font-normal whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {currentCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 text-slate-400 text-center">{category.id}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{category.categoryId}</td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{category.name}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{category.desc}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded text-[11px] uppercase tracking-wider font-semibold border border-transparent ${getStatusBadgeStyle(category.status)}`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="bg-orange-200 hover:bg-orange-300 text-orange-900 text-[11px] font-semibold px-2.5 py-1.5 rounded shadow-sm transition-colors">
                            View
                          </button>
                          <button className="bg-blue-300 hover:bg-blue-400 text-blue-900 text-[11px] font-semibold px-2.5 py-1.5 rounded shadow-sm transition-colors">
                            Edit
                          </button>
                          <button className="bg-slate-600 hover:bg-slate-700 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded shadow-sm transition-colors">
                            Disable
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Showing <span className="font-medium text-slate-900 dark:text-white">{filteredCategories.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(indexOfLastItem, filteredCategories.length)}</span> of <span className="font-medium text-slate-900 dark:text-white">{filteredCategories.length}</span> entries
              </div>
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

        </div>
      </main>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white font-serif">Add new category</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6">
              <form className="space-y-6">
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Category name</label>
                  <input 
                    type="text" 
                    placeholder="Category name.." 
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm text-slate-900 dark:text-slate-100 transition-colors" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Category description</label>
                  <textarea 
                    placeholder="Category description.." 
                    rows="4" 
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm text-slate-900 dark:text-slate-100 transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isActive ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end items-center gap-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-8 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
