"use client";

import React, { useState } from 'react';
import Sidebar from '../../../../components/Sidebar';

export default function WorkerRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // State for granular approval
  const [verifications, setVerifications] = useState({
    name: null, phone: null, email: null, dob: null, address: null,
    photo: null, skills: null, areas: null, languages: null,
    availability: null, idFront: null, idBack: null, payout: null
  });

  // Dummy requests data
  const [requests, setRequests] = useState([
    { 
      id: 'REQ-001', name: 'Michael Schmidt', phone: '+49 151112233', email: 'michael@example.com', 
      dob: '1992-05-12', address: 'Berliner Str. 12, 10115 Berlin', skills: ['Cleaning', 'Plumbing'],
      areas: ['Mitte', 'Pankow'], languages: ['German', 'English'],
      iban: 'DE12 3456 7890 1234 5678 90', bank: 'Deutsche Bank',
      date: '2026-05-15', status: 'Pending' 
    },
    { 
      id: 'REQ-002', name: 'Sarah Wagner', phone: '+49 162223344', email: 'sarah@example.com', 
      dob: '1995-08-21', address: 'Hauptstr. 45, 10827 Berlin', skills: ['Electrical', 'HVAC'],
      areas: ['Charlottenburg', 'Spandau'], languages: ['German', 'French'],
      iban: 'DE98 7654 3210 9876 5432 10', bank: 'Sparkasse',
      date: '2026-05-16', status: 'Pending' 
    },
    { 
      id: 'REQ-003', name: 'Thomas Müller', phone: '+49 173334455', email: 'thomas@example.com', 
      dob: '1988-11-05', address: 'Kantstr. 88, 10627 Berlin', skills: ['Carpentry'],
      areas: ['Steglitz'], languages: ['German'],
      iban: 'DE44 5566 7788 9900 1122 33', bank: 'Commerzbank',
      date: '2026-05-16', status: 'Pending' 
    }
  ]);

  const handleVerify = (field, status) => {
    setVerifications(prev => ({ ...prev, [field]: status }));
  };

  const handleFullApprove = () => {
    setRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    setIsViewModalOpen(false);
    alert(`Worker ${selectedRequest.name} approved!`);
    resetVerifications();
  };

  const handleSendFixRequest = () => {
    const declinedFields = Object.entries(verifications)
      .filter(([_, status]) => status === 'declined')
      .map(([field, _]) => field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1'));

    if (declinedFields.length === 0) {
      alert("Please mark at least one field as rejected (✗) before asking for a fix.");
      return;
    }

    const automatedMsg = `Correction required for: ${declinedFields.join(', ')}`;
    alert(`Automated Notification sent to worker:\n\n${automatedMsg}`);
    
    setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'Needs Fix' } : r));
    setIsViewModalOpen(false);
  };

  const handleRejectApplication = () => {
    if (confirm(`Reject ${selectedRequest.name}?`)) {
      setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'Rejected' } : r));
      setIsViewModalOpen(false);
    }
  };

  const resetVerifications = () => {
    setVerifications({
      name: null, phone: null, email: null, dob: null, address: null, 
      photo: null, skills: null, areas: null, languages: null, 
      availability: null, idFront: null, idBack: null, payout: null
    });
  };

  const filteredRequests = requests.filter(req => 
    req.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">Worker Requests</h1>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-4 flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Professional Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4">Request ID</th>
                    <th className="py-3 px-4">Worker Name</th>
                    <th className="py-3 px-4">Applied On</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredRequests.map((req, index) => (
                    <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors text-sm text-slate-700 dark:text-slate-300">
                      <td className="py-2 px-4 text-center text-slate-400">{index + 1}</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">{req.id}</td>
                      <td className="py-3 px-4 font-medium text-slate-800 dark:text-white">{req.name}</td>
                      <td className="py-3 px-4 text-slate-500">{req.date}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${req.status === 'Pending' ? 'bg-amber-500' : req.status === 'Needs Fix' ? 'bg-indigo-500' : 'bg-rose-500'}`}></span>
                          <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-tighter">{req.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button 
                          onClick={() => { setSelectedRequest(req); setIsViewModalOpen(true); resetVerifications(); }}
                          className="px-4 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRequests.length === 0 && (
                    <tr><td colSpan="6" className="py-12 text-center text-slate-400">No requests found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="bg-slate-50 dark:bg-slate-800/30 px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Showing <span className="text-slate-900 dark:text-white">1</span> to <span className="text-slate-900 dark:text-white">{filteredRequests.length}</span> of <span className="text-slate-900 dark:text-white">{filteredRequests.length}</span> entries
              </div>
              <div className="flex space-x-1">
                <button disabled className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-xs font-medium text-slate-400 cursor-not-allowed">Previous</button>
                <button disabled className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-xs font-medium text-slate-400 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal - Already high-end from previous step */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsViewModalOpen(false)}></div>
          
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="p-6">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-serif tracking-tight">Review Registration</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">ID: {selectedRequest?.id}</p>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Column 1: Personal */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                    Personal Info
                  </h3>
                  
                  <div className={`p-4 rounded-xl border transition-all ${verifications.photo === 'approved' ? 'bg-emerald-50/20 border-emerald-200' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Profile Photo</p>
                      <div className="flex gap-1.5">
                        <button onClick={() => handleVerify('photo', 'declined')} className={`p-1.5 rounded-lg border ${verifications.photo === 'declined' ? 'bg-rose-600 text-white' : 'text-rose-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        <button onClick={() => handleVerify('photo', 'approved')} className={`p-1.5 rounded-lg border ${verifications.photo === 'approved' ? 'bg-emerald-600 text-white' : 'text-emerald-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></button>
                      </div>
                    </div>
                    <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-sm overflow-hidden">
                      <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={1.5}/></svg>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Full Name', value: selectedRequest?.name, field: 'name' },
                      { label: 'Phone', value: selectedRequest?.phone, field: 'phone' },
                      { label: 'Email', value: selectedRequest?.email, field: 'email' },
                      { label: 'DOB', value: selectedRequest?.dob, field: 'dob' },
                      { label: 'Address', value: selectedRequest?.address, field: 'address' },
                    ].map((item) => (
                      <div key={item.field} className={`p-3 rounded-lg border transition-all ${verifications[item.field] === 'approved' ? 'bg-emerald-50/20 border-emerald-100' : 'bg-white dark:bg-slate-800 border-slate-100'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 pr-2 overflow-hidden">
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{item.label}</p>
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.value}</p>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleVerify(item.field, 'declined')} className={`w-6 h-6 flex items-center justify-center rounded border transition-all ${verifications[item.field] === 'declined' ? 'bg-rose-600 text-white' : 'text-rose-300'}`}><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></button>
                            <button onClick={() => handleVerify(item.field, 'approved')} className={`w-6 h-6 flex items-center justify-center rounded border transition-all ${verifications[item.field] === 'approved' ? 'bg-emerald-600 text-white' : 'text-emerald-300'}`}><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Work */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                    Work Details
                  </h3>

                  {[
                    { label: 'Skills', value: selectedRequest?.skills, field: 'skills' },
                    { label: 'Areas', value: selectedRequest?.areas, field: 'areas' },
                    { label: 'Languages', value: selectedRequest?.languages, field: 'languages' },
                  ].map((item) => (
                    <div key={item.field} className={`p-4 rounded-xl border transition-all ${verifications[item.field] === 'approved' ? 'bg-emerald-50/20 border-emerald-200' : 'bg-white dark:bg-slate-800 border-slate-100'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                        <div className="flex gap-2">
                          <button onClick={() => handleVerify(item.field, 'declined')} className={`w-7 h-7 flex items-center justify-center rounded border ${verifications[item.field] === 'declined' ? 'bg-rose-600 text-white' : 'text-rose-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                          <button onClick={() => handleVerify(item.field, 'approved')} className={`w-7 h-7 flex items-center justify-center rounded border ${verifications[item.field] === 'approved' ? 'bg-emerald-600 text-white' : 'text-emerald-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.value?.map(s => <span key={s} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-600 text-[9px] font-bold rounded uppercase border border-slate-200 dark:border-slate-800">{s}</span>)}
                      </div>
                    </div>
                  ))}

                  <div className={`p-4 rounded-xl border transition-all ${verifications.availability === 'approved' ? 'bg-emerald-50/20 border-emerald-200' : 'bg-white dark:bg-slate-800 border-slate-100'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Availability</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleVerify('availability', 'declined')} className={`w-7 h-7 flex items-center justify-center rounded border ${verifications.availability === 'declined' ? 'bg-rose-600 text-white' : 'text-rose-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        <button onClick={() => handleVerify('availability', 'approved')} className={`w-7 h-7 flex items-center justify-center rounded border ${verifications.availability === 'approved' ? 'bg-emerald-600 text-white' : 'text-emerald-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[9px] font-bold text-slate-400">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day} className="px-2 py-1 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">{day}</span>)}
                    </div>
                  </div>
                </div>

                {/* Column 3: Identity */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                    Verification
                  </h3>

                  {['idFront', 'idBack'].map((field) => (
                    <div key={field} className={`p-4 rounded-xl border transition-all ${verifications[field] === 'approved' ? 'bg-emerald-50/20 border-emerald-200' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{field === 'idFront' ? 'ID Front' : 'ID Back'}</p>
                        <div className="flex gap-2">
                          <button onClick={() => handleVerify(field, 'declined')} className={`w-7 h-7 flex items-center justify-center rounded border ${verifications[field] === 'declined' ? 'bg-rose-600 text-white' : 'text-rose-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                          <button onClick={() => handleVerify(field, 'approved')} className={`w-7 h-7 flex items-center justify-center rounded border ${verifications[field] === 'approved' ? 'bg-emerald-600 text-white' : 'text-emerald-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></button>
                        </div>
                      </div>
                      <div className="h-24 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest">Preview</div>
                    </div>
                  ))}

                  <div className={`p-4 rounded-xl border transition-all ${verifications.payout === 'approved' ? 'bg-emerald-50/20 border-emerald-200' : 'bg-white dark:bg-slate-800 border-slate-100'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Payout Info</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleVerify('payout', 'declined')} className={`w-7 h-7 flex items-center justify-center rounded border ${verifications.payout === 'declined' ? 'bg-rose-600 text-white' : 'text-rose-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        <button onClick={() => handleVerify('payout', 'approved')} className={`w-7 h-7 flex items-center justify-center rounded border ${verifications.payout === 'approved' ? 'bg-emerald-600 text-white' : 'text-emerald-400'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></button>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase truncate">IBAN: <span className="text-slate-700 dark:text-slate-300">{selectedRequest?.iban}</span></p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button onClick={() => setIsViewModalOpen(false)} className="text-xs font-bold text-slate-500 uppercase tracking-widest">Close</button>
                <div className="flex gap-3">
                  <button onClick={handleRejectApplication} className="px-6 py-2.5 border border-rose-200 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">Reject</button>
                  <button onClick={handleSendFixRequest} className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Ask for Fix</button>
                  <button 
                    onClick={handleFullApprove}
                    disabled={!Object.values(verifications).every(v => v === 'approved')}
                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${Object.values(verifications).every(v => v === 'approved') ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 cursor-not-allowed'}`}
                  >
                    Verify & Approve
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
