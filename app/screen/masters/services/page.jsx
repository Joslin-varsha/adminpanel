"use client";

import React, { useState } from 'react';
import Sidebar from '../../../../components/Sidebar';

export default function ServicesPage() {
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [isActive, setIsActive] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [openDropdownId, setOpenDropdownId] = useState(null);
   const [serviceImage, setServiceImage] = useState(null);
   const itemsPerPage = 10;

   const handleImageUpload = (e) => {
     const file = e.target.files[0];
     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         setServiceImage(reader.result);
       };
       reader.readAsDataURL(file);
     }
   };

   const handleCloseModal = () => {
     setIsAddModalOpen(false);
     setServiceImage(null);
   };

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const servicesList = [
    { id: 1, serviceId: 'S-001', name: 'Plumbing', price: '€85', duration: '1 hours', status: 'Active' },
    { id: 2, serviceId: 'S-002', name: 'Electrical', price: '€95', duration: '1 hours', status: 'Active' },
    { id: 3, serviceId: 'S-003', name: 'HVAC', price: '€120', duration: '1 hours', status: 'Inactive' },
    { id: 4, serviceId: 'S-004', name: 'Landscaping', price: '€75', duration: '1 hours', status: 'Active' },
    { id: 5, serviceId: 'S-005', name: 'Cleaning', price: '€60', duration: '1 hours', status: 'Active' },
    { id: 6, serviceId: 'S-006', name: 'Carpentry', price: '€90', duration: '1 hours', status: 'Active' },
    { id: 7, serviceId: 'S-007', name: 'Painting', price: '€110', duration: '1 hours', status: 'Active' },
    { id: 8, serviceId: 'S-008', name: 'Roofing', price: '€150', duration: '1 hours', status: 'Pending' },
    { id: 9, serviceId: 'S-009', name: 'Pest Control', price: '€80', duration: '1 hours', status: 'Active' },
    { id: 10, serviceId: 'S-010', name: 'Pool Maintenance', price: '€95', duration: '1 hours', status: 'Active' },
    { id: 11, serviceId: 'S-011', name: 'Appliance Repair', price: '€70', duration: '1 hours', status: 'Active' },
    { id: 12, serviceId: 'S-012', name: 'Locksmith', price: '€65', duration: '1 hour', status: 'Active' },
  ];

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Active': return 'text-slate-900 dark:text-white font-semibold';
      default: return 'text-slate-500 font-medium';
    }
  };

  const filteredServices = servicesList.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.serviceId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">
              Service Management
            </h1>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Services"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-slate-100 transition-shadow shadow-sm"
                />
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-sm font-semibold rounded-md shadow-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Service
            </button>
          </div>

          {/* Data Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm mb-6">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="px-4 py-4 font-normal w-12 text-center">#</th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                        Service ID
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Service Name
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Base Price
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Duration
                      </div>
                    </th>
                    <th className="px-4 py-4 font-normal whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Status
                      </div>
                    </th>
                    <th className="px-4 py-4 pr-8 font-normal whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {currentServices.map((service) => (
                    <tr 
                      key={service.id} 
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${openDropdownId === service.id ? 'relative z-50' : ''}`}
                    >
                      <td className="px-4 py-4 text-slate-400 text-center">{service.id}</td>
                      <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{service.serviceId}</td>
                      <td className="px-4 py-4 font-bold text-slate-700 dark:text-slate-300">
                        {service.name}
                      </td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{service.price}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{service.duration}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${service.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                          <span className={`text-[10px] uppercase tracking-wider ${getStatusBadgeStyle(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 pr-8 text-right relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === service.id ? null : service.id);
                          }}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>

                        {openDropdownId === service.id && (
                          <div className="absolute right-8 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
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
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                              EDIT
                            </button>
                            <button
                              onClick={() => { setOpenDropdownId(null); }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                              DISABLE
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
                Showing <span className="font-medium text-slate-900 dark:text-white">{filteredServices.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(indexOfLastItem, filteredServices.length)}</span> of <span className="font-medium text-slate-900 dark:text-white">{filteredServices.length}</span> entries
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

        </div>
      </main>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white font-serif">Add New Service</h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <form className="space-y-8">

                {/* Basic Details Section */}
                <section>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 font-serif">Basic details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Service name</label>
                      <input type="text" placeholder="Type name here" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm text-slate-900 dark:text-slate-100 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                      <input type="text" placeholder="Type description here" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm text-slate-900 dark:text-slate-100 transition-colors" />
                    </div>
                  </div>
                </section>

                {/* Cover Image Section */}
                <section>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 font-serif">Service Cover Image</h3>
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500 hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-all duration-300 relative group cursor-pointer">
                    {serviceImage ? (
                      <div className="relative w-full max-w-xs h-40 rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group/img">
                        <img src={serviceImage} alt="Service preview" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setServiceImage(null);
                            }}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform scale-90 group-hover/img:scale-100 shadow-md cursor-pointer"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center py-4">
                        <div className="w-12 h-12 mb-3 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 0-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Drag and drop or click to upload</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PNG, JPG, or WEBP up to 5MB</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={handleImageUpload} 
                    />
                  </div>
                </section>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isActive ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
                  onClick={handleCloseModal}
                >
                  Save Service
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
