"use client";

import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import { useRouter } from 'next/navigation';

const timeOptions12h = [
  "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM",
  "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM",
  "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM",
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
  "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
];

const format12Hour = (time24) => {
  if (!time24) return '';
  const [hour, min] = time24.split(':');
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12 < 10 ? '0'+h12 : h12}:${min} ${ampm}`;
};

export default function WorkersPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const itemsPerPage = 10;

  // Multi-select States
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [skillSearch, setSkillSearch] = useState('');
  const [areaSearch, setAreaSearch] = useState('');
  const [daySearch, setDaySearch] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languageSearch, setLanguageSearch] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Employment Type States
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [dayTimes, setDayTimes] = useState({});

  // Document Upload States
  const [profileImage, setProfileImage] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const skillDropdownRef = useRef(null);
  const areaDropdownRef = useRef(null);
  const dayDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target)) {
        setShowSkillDropdown(false);
      }
      if (areaDropdownRef.current && !areaDropdownRef.current.contains(event.target)) {
        setShowAreaDropdown(false);
      }
      if (dayDropdownRef.current && !dayDropdownRef.current.contains(event.target)) {
        setShowDayDropdown(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      // Only close action dropdown if clicking outside the action column
      if (!event.target.closest('.action-column')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const skillOptions = ['Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'HVAC', 'Landscaping', 'General Maintenance'];
  const areaOptions = ['Central Berlin', 'Pankow', 'Mitte', 'Charlottenburg', 'Spandau', 'Neukölln', 'Tempelhof', 'Steglitz'];
  const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const languageOptions = ['German', 'Tamil', 'Hindi', 'English', 'Spanish', 'French', 'Italian', 'Turkish', 'Polish', 'Arabic', 'Portuguese', 'Dutch'];

  // Dummy workers data
  const allWorkers = [
    { id: 'WRK-001', name: 'Ravi Kumar', phone: '+49 151234567', skill: 'Cleaning', rating: '4.8', acceptance: '95%', rejects: 2, status: 'Online' },
    { id: 'WRK-002', name: 'Asha Verma', phone: '+49 161245678', skill: 'Plumbing', rating: '4.6', acceptance: '91%', rejects: 1, status: 'Offline' },
    { id: 'WRK-003', name: 'Priya Sharma', phone: '+49 171356789', skill: 'Electrical', rating: '4.9', acceptance: '97%', rejects: 0, status: 'Online' },
    { id: 'WRK-004', name: 'Amit Patel', phone: '+49 151987654', skill: 'Carpentry', rating: '4.7', acceptance: '93%', rejects: 2, status: 'Online' },
    { id: 'WRK-005', name: 'Deepa Singh', phone: '+49 162345678', skill: 'Painting', rating: '4.5', acceptance: '89%', rejects: 3, status: 'Offline' },
    { id: 'WRK-006', name: 'Rajesh Gupta', phone: '+49 171456789', skill: 'HVAC', rating: '4.8', acceptance: '96%', rejects: 1, status: 'Online' },
    { id: 'WRK-007', name: 'Meera Reddy', phone: '+49 151678901', skill: 'Landscaping', rating: '4.6', acceptance: '92%', rejects: 2, status: 'Online' },
    { id: 'WRK-008', name: 'Vikram Nair', phone: '+49 162567890', skill: 'General Maintenance', rating: '4.4', acceptance: '87%', rejects: 4, status: 'Offline' },
    { id: 'WRK-009', name: 'Sunita Desai', phone: '+49 171789012', skill: 'Cleaning', rating: '5.0', acceptance: '98%', rejects: 0, status: 'Online' },
    { id: 'WRK-010', name: 'Karan Mehta', phone: '+49 151890123', skill: 'Plumbing', rating: '4.3', acceptance: '86%', rejects: 5, status: 'Online' },
    { id: 'WRK-011', name: 'Anjali Iyer', phone: '+49 162901234', skill: 'Electrical', rating: '4.7', acceptance: '94%', rejects: 1, status: 'Online' },
    { id: 'WRK-012', name: 'Sanjay Joshi', phone: '+49 171012345', skill: 'Carpentry', rating: '4.2', acceptance: '85%', rejects: 3, status: 'Offline' },
    { id: 'WRK-013', name: 'Lakshmi Rao', phone: '+49 151123456', skill: 'Painting', rating: '4.9', acceptance: '96%', rejects: 1, status: 'Online' },
    { id: 'WRK-014', name: 'Arjun Bose', phone: '+49 162234567', skill: 'HVAC', rating: '4.6', acceptance: '90%', rejects: 2, status: 'Offline' },
  ];

  // Helper functions for badge styling
  const getSkillBadgeColor = (skill) => {
    return 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50';
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Online': return 'text-slate-900 dark:text-white font-semibold';
      default: return 'text-slate-500 font-medium';
    }
  };

  // Pagination Logic
  const filteredWorkers = allWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.skill.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === '' || worker.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);
  const indexOfLastWorker = currentPage * itemsPerPage;
  const indexOfFirstWorker = indexOfLastWorker - itemsPerPage;
  const currentWorkers = filteredWorkers.slice(indexOfFirstWorker, indexOfLastWorker);

  // Multi-select Toggle Helpers
  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleArea = (area) => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleLanguage = (lang) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  // Image Upload Handlers
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') setFrontImage(reader.result);
        else if (type === 'back') setBackImage(reader.result);
        else if (type === 'profile') setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">

          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif">Workers Management</h1>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
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
                  placeholder="Search Providers.."
                  className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-64 transition-shadow"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option value="">All Status</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Add Workers Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-6 py-2 bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors shadow-sm whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Workers
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4">Worker ID</th>
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Phone</th>
                    {/* <th className="py-4 px-4">Skill</th> */}
                    <th className="py-4 px-4 text-center">Rating</th>
                    <th className="py-4 px-4 text-center">Acceptance</th>
                    <th className="py-4 px-4 text-center"># Rejects</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {currentWorkers.map((worker, index) => (
                    <tr
                      key={worker.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors text-sm text-slate-700 dark:text-slate-300 ${openDropdownId === worker.id ? 'relative z-50' : ''}`}
                    >
                      <td className="py-2 px-4 text-center text-slate-400">{indexOfFirstWorker + index + 1}</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">{worker.id}</td>
                      <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">{worker.name}</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{worker.phone}</td>
                      {/* <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-[4px] text-[10px] font-bold ${getSkillBadgeColor(worker.skill)}`}>
                          {worker.skill}
                        </span>
                      </td> */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center font-semibold">
                          <svg className="w-3.5 h-3.5 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {worker.rating}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-500 dark:text-slate-400 font-medium">{worker.acceptance}</td>
                      <td className="py-3 px-4 text-center font-medium">{worker.rejects}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${worker.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                          <span className={`text-[10px] uppercase tracking-wider ${getStatusBadgeStyle(worker.status)}`}>
                            {worker.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center relative action-column">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === worker.id ? null : worker.id);
                          }}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mx-auto block cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>

                        {openDropdownId === worker.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 text-left">
                            <button
                              onClick={() => { setOpenDropdownId(null); router.push(`/screen/workers/profile?id=${worker.id}`); }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                              VIEW
                            </button>
                            <button
                              onClick={() => { setOpenDropdownId(null); }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                              EDIT
                            </button>
                            <button
                              onClick={() => { setSelectedWorker(worker); setIsBlockModalOpen(true); setOpenDropdownId(null); }}
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
                Showing <span className="font-medium text-slate-900 dark:text-white">{indexOfFirstWorker + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(indexOfLastWorker, filteredWorkers.length)}</span> of <span className="font-medium text-slate-900 dark:text-white">{filteredWorkers.length}</span> entries
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

      {/* Add Worker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="p-6">

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Add Workers</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Register a new worker with skills and documents.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Basic Information
                  </h3>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center space-y-3">
                      <div className="relative group w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden bg-slate-50 dark:bg-slate-800 cursor-pointer hover:border-blue-500 transition-all">
                        {profileImage ? (
                          <img src={profileImage} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                            <svg className="w-10 h-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={1.5} /></svg>
                            <span className="text-[10px] font-bold uppercase">Upload</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth={2} /></svg>
                        </div>
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handleImageUpload(e, 'profile')} />
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">Worker Profile Photo</p>
                    </div>

                    {/* Basic Fields */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                        <input type="text" placeholder="+49 151 000 0000" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Address</label>
                        <input type="text" placeholder="Berlin, Germany" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Skills & Area (Multi-select Search) */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Work Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Multi-select Skill with Search */}
                    <div className="space-y-2 relative" ref={skillDropdownRef}>
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Primary Skills (Multi-select)</label>
                      <div className="min-h-[42px] p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-wrap gap-2 items-center">
                        {selectedSkills.map(s => (
                          <span key={s} className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                            {s}
                            <button onClick={() => toggleSkill(s)} className="hover:text-blue-200"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg></button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder={selectedSkills.length === 0 ? "Search & Select Skills..." : ""}
                          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none px-2"
                          value={skillSearch}
                          onChange={(e) => { setSkillSearch(e.target.value); setShowSkillDropdown(true); }}
                          onFocus={() => setShowSkillDropdown(true)}
                        />
                      </div>
                      {showSkillDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto no-scrollbar">
                          {skillOptions.filter(o => o.toLowerCase().includes(skillSearch.toLowerCase())).map(option => (
                            <div
                              key={option}
                              onClick={() => { toggleSkill(option); setSkillSearch(''); }}
                              className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 flex justify-between items-center ${selectedSkills.includes(option) ? 'text-blue-600 font-bold' : ''}`}
                            >
                              {option}
                              {selectedSkills.includes(option) && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Multi-select Area */}
                    <div className="space-y-2 relative" ref={areaDropdownRef}>
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service Areas (Multi-select)</label>
                      <div className="min-h-[42px] p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-wrap gap-2 items-center">
                        {selectedAreas.map(a => (
                          <span key={a} className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                            {a}
                            <button onClick={() => toggleArea(a)} className="hover:text-emerald-200"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg></button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder={selectedAreas.length === 0 ? "Search & Select Areas..." : ""}
                          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none px-2"
                          value={areaSearch}
                          onChange={(e) => { setAreaSearch(e.target.value); setShowAreaDropdown(true); }}
                          onFocus={() => setShowAreaDropdown(true)}
                        />
                      </div>
                      {showAreaDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto no-scrollbar">
                          {areaOptions.filter(o => o.toLowerCase().includes(areaSearch.toLowerCase())).map(option => (
                            <div
                              key={option}
                              onClick={() => { toggleArea(option); setAreaSearch(''); }}
                              className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex justify-between items-center ${selectedAreas.includes(option) ? 'text-emerald-600 font-bold' : ''}`}
                            >
                              {option}
                              {selectedAreas.includes(option) && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Experience Dropdown */}
                    <div className="space-y-2 relative">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Experience Level</label>
                      <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                        <option value="">Select Experience...</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5+">5+ Years</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-6 text-slate-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>


                    {/* Multi-select Languages Known */}
                    <div className="space-y-2 relative" ref={languageDropdownRef}>
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Languages Known (Multi-select)</label>
                      <div className="min-h-[42px] p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-wrap gap-2 items-center">
                        {selectedLanguages.map(l => (
                          <span key={l} className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                            {l}
                            <button onClick={() => toggleLanguage(l)} className="hover:text-indigo-200"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg></button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder={selectedLanguages.length === 0 ? "Search & Select Languages..." : ""}
                          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none px-2"
                          value={languageSearch}
                          onChange={(e) => { setLanguageSearch(e.target.value); setShowLanguageDropdown(true); }}
                          onFocus={() => setShowLanguageDropdown(true)}
                        />
                      </div>
                      {showLanguageDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto no-scrollbar">
                          {languageOptions.filter(o => o.toLowerCase().includes(languageSearch.toLowerCase())).map(option => (
                            <div
                              key={option}
                              onClick={() => { toggleLanguage(option); setLanguageSearch(''); }}
                              className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex justify-between items-center ${selectedLanguages.includes(option) ? 'text-indigo-600 font-bold' : ''}`}
                            >
                              {option}
                              {selectedLanguages.includes(option) && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Employment Type Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Employment Type</label>
                      <div className="relative">
                        <select 
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                          value={employmentType}
                          onChange={(e) => setEmploymentType(e.target.value)}
                        >
                          <option value="Full-time">Full-Time</option>
                          <option value="Part-time">Part-Time</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Day-Wise Shift Selection with Checkboxes */}
                  <div className="mt-6 p-5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Weekly Schedule & Availability
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dayOptions.map(day => (
                        <div key={day} className={`p-4 rounded-xl border transition-all ${selectedDays.includes(day) ? 'bg-white dark:bg-slate-800 border-blue-500 shadow-sm' : 'bg-transparent border-slate-200 dark:border-slate-700 hover:border-blue-300'}`}>
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                              checked={selectedDays.includes(day)}
                              onChange={() => toggleDay(day)}
                            />
                            <span className={`text-xs font-black uppercase tracking-widest ${selectedDays.includes(day) ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                              {day}
                            </span>
                          </label>

                          {selectedDays.includes(day) && (
                            <div className="mt-3 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Start</label>
                                <div className="relative">
                                  <select 
                                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer font-medium"
                                    value={dayTimes[day]?.start || ''}
                                    onChange={(e) => setDayTimes(prev => ({ ...prev, [day]: { ...prev[day], start: e.target.value } }))}
                                  >
                                    <option value="">Start Time</option>
                                    {timeOptions12h.map(t => <option key={t} value={t}>{t}</option>)}
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-slate-400">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">End</label>
                                <div className="relative">
                                  <select 
                                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer font-medium"
                                    value={dayTimes[day]?.end || ''}
                                    onChange={(e) => setDayTimes(prev => ({ ...prev, [day]: { ...prev[day], end: e.target.value } }))}
                                  >
                                    <option value="">End Time</option>
                                    {timeOptions12h.map(t => <option key={t} value={t}>{t}</option>)}
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-slate-400">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Payment & Document Upload */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Verification & Payment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <input type="text" placeholder="IBAN Number" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
                      <input type="text" placeholder="Bank Name" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-[-30px]">
                      {/* Front Upload */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">ID Card (Front)</label>
                        <div className="relative group h-32 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 transition-all overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                          {frontImage ? (
                            <img src={frontImage} className="w-full h-full object-cover" alt="Front" />
                          ) : (
                            <div className="text-center">
                              <svg className="w-8 h-8 text-slate-300 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeWidth={2} /></svg>
                              <p className="text-[9px] text-slate-400 font-bold uppercase">Upload Front</p>
                            </div>
                          )}
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'front')} />
                        </div>
                      </div>

                      {/* Back Upload */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">ID Card (Back)</label>
                        <div className="relative group h-32 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 transition-all overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                          {backImage ? (
                            <img src={backImage} className="w-full h-full object-cover" alt="Back" />
                          ) : (
                            <div className="text-center">
                              <svg className="w-8 h-8 text-slate-300 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeWidth={2} /></svg>
                              <p className="text-[9px] text-slate-400 font-bold uppercase">Upload Back</p>
                            </div>
                          )}
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'back')} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-10 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                  Register Worker
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Worker Details View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={1.5} /></svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedWorker?.name}</h2>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 rounded-full text-[9px] font-black uppercase tracking-widest">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        Approved
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Worker ID: {selectedWorker?.id} • <span className={`font-bold ${selectedWorker?.status === 'Online' ? 'text-emerald-500' : 'text-slate-400'}`}>{selectedWorker?.status}</span></p>
                  </div>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Contact */}
                <div className="space-y-6">
                  {/* Performance Card */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedWorker?.rating}</p>
                        <p className="text-[10px] text-slate-500 font-medium">Avg Rating</p>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedWorker?.acceptance}</p>
                        <p className="text-[10px] text-slate-500 font-medium">Acceptance</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth={2} /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Phone</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedWorker?.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2} /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Email</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">worker@housework.de</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth={2} /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Address</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Berlin, Germany</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Columns: Work Details & Verification */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Work Experience Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Skills & Area</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Primary Skill</p>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getSkillBadgeColor(selectedWorker?.skill)}`}>
                            {selectedWorker?.skill}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Service Areas</p>
                          <div className="flex flex-wrap gap-2">
                            {['Mitte', 'Pankow', 'Berlin Central'].map(area => (
                              <span key={area} className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Availability</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Monday', 'Wednesday', 'Friday', 'Saturday'].map(day => (
                          <span key={day} className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg text-[10px] font-bold">
                            {day}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Experience</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">4 Years Professionally</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Payment & Verification</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">IBAN</p>
                        <p className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">DE89 3704 0044 0532 0130 00</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Bank Name</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Deutsche Bank</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-3">Identity Documents</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-[10px] font-bold uppercase">ID Front Image</div>
                        <div className="h-24 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-[10px] font-bold uppercase">ID Back Image</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold shadow-lg transition-all"
                >
                  Close Profile
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Block Worker?</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Are you sure you want to block <span className="font-bold text-slate-900 dark:text-white">{selectedWorker?.name}</span>? This will prevent them from accepting any new bookings.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsBlockModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Logic to block worker would go here
                    setIsBlockModalOpen(false);
                  }}
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
