"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMastersOpen, setIsMastersOpen] = useState(() => pathname?.includes('/masters/'));
  const [isWorkersDropdownOpen, setIsWorkersDropdownOpen] = useState(() => pathname?.includes('/screen/workers'));
  const [activeSubItem, setActiveSubItem] = useState(() => {
    if (pathname === '/screen/masters/services') return 'Master-Services';
    if (pathname === '/screen/masters/skills') return 'Master-Skills';
    if (pathname === '/screen/masters/settings') return 'Master-Settings';
    if (pathname === '/screen/masters/languages') return 'Master-Languages';
    if (pathname === '/screen/workers') return 'Worker-List';
    if (pathname === '/screen/workers/requests') return 'Worker-Requests';
    return '';
  });

  const topItems = [
    { name: 'Dashboard', path: '/screen/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Users', path: '/screen/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ];

  const bottomItems = [
    { name: 'Bookings', path: '/screen/bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Salary System', path: '/screen/salary', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Rewards System', path: '/screen/rewards', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
    { name: 'Payments', path: '/screen/payments', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { name: 'Reports', path: '/screen/reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ];

  const mastersSubMenu = ['Services', 'Skills', 'Languages', 'Settings'];

  return (
    <aside className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm z-10 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      
      {/* Header / Toggle Button */}
      <div className={`h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        <div className={`flex items-center overflow-hidden transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
        <ul className="space-y-2 px-3">
          {topItems.map((item) => {
            const isActive = pathname === item.path || (pathname?.startsWith(item.path) && item.path !== '#' && !item.path.startsWith('#'));
            return (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  onClick={() => setActiveSubItem('')}
                  className={`w-full flex items-center ${isExpanded ? 'px-3' : 'justify-center px-0'} py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  title={!isExpanded ? item.name : ''}
                >
                  <svg className={`w-5 h-5 flex-shrink-0 ${isExpanded ? 'mr-3' : ''} ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {isExpanded && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
                </Link>
              </li>
            );
          })}

          {/* Workers Dropdown (Now placed under Users) */}
          <li>
            <button 
              onClick={() => {
                if (!isExpanded) {
                  setIsExpanded(true);
                  setIsWorkersDropdownOpen(true);
                } else {
                  setIsWorkersDropdownOpen(!isWorkersDropdownOpen);
                }
              }}
              className={`w-full flex items-center ${isExpanded ? 'justify-between px-3' : 'justify-center px-0'} py-2.5 rounded-lg transition-all duration-200 group ${
                activeSubItem.startsWith('Worker-') 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              title={!isExpanded ? 'Workers' : ''}
            >
              <div className="flex items-center">
                <svg className={`w-5 h-5 flex-shrink-0 ${isExpanded ? 'mr-3' : ''} ${activeSubItem.startsWith('Worker-') ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {isExpanded && <span className="font-medium text-sm whitespace-nowrap">Workers</span>}
              </div>
              {isExpanded && (
                <svg className={`w-4 h-4 transition-transform duration-200 ${isWorkersDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            
            {/* Workers Submenu */}
            {isExpanded && (
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isWorkersDropdownOpen ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <ul className="pl-11 space-y-1">
                  <li>
                    <Link 
                      href="/screen/workers"
                      onClick={() => setActiveSubItem('Worker-List')}
                      className={`block py-1.5 w-full text-left text-sm transition-colors ${
                        activeSubItem === 'Worker-List' 
                          ? 'text-blue-600 dark:text-blue-400 font-bold' 
                          : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      Workers List
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/screen/workers/requests"
                      onClick={() => setActiveSubItem('Worker-Requests')}
                      className={`block py-1.5 w-full text-left text-sm transition-colors ${
                        activeSubItem === 'Worker-Requests' 
                          ? 'text-blue-600 dark:text-blue-400 font-bold' 
                          : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      Worker Requests
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {bottomItems.map((item) => {
            const isActive = pathname === item.path || (pathname?.startsWith(item.path) && item.path !== '#' && !item.path.startsWith('#'));
            return (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  onClick={() => setActiveSubItem('')}
                  className={`w-full flex items-center ${isExpanded ? 'px-3' : 'justify-center px-0'} py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  title={!isExpanded ? item.name : ''}
                >
                  <svg className={`w-5 h-5 flex-shrink-0 ${isExpanded ? 'mr-3' : ''} ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {isExpanded && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
                </Link>
              </li>
            );
          })}

          {/* Masters Dropdown */}
          <li>
            <button 
              onClick={() => {
                if (!isExpanded) {
                  setIsExpanded(true); // Auto-expand sidebar if opening masters
                  setIsMastersOpen(true);
                } else {
                  setIsMastersOpen(!isMastersOpen);
                }
              }}
              className={`w-full flex items-center ${isExpanded ? 'justify-between px-3' : 'justify-center px-0'} py-2.5 rounded-lg transition-all duration-200 group ${
                activeSubItem.startsWith('Master-') 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              title={!isExpanded ? 'Masters' : ''}
            >
              <div className="flex items-center">
                <svg className={`w-5 h-5 flex-shrink-0 ${isExpanded ? 'mr-3' : ''} ${activeSubItem.startsWith('Master-') ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {isExpanded && <span className="font-medium text-sm whitespace-nowrap">Masters</span>}
              </div>
              {isExpanded && (
                <svg className={`w-4 h-4 transition-transform duration-200 ${isMastersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            
            {/* Masters Submenu */}
            {isExpanded && (
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMastersOpen ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <ul className="pl-11 space-y-1">
                  {mastersSubMenu.map((sub) => {
                    let subItemPath = '#';
                    if (sub === 'Services') subItemPath = '/screen/masters/services';
                    else if (sub === 'Locations') subItemPath = '/screen/masters/locations';
                    else if (sub === 'Skills') subItemPath = '/screen/masters/skills';
                    else if (sub === 'Languages') subItemPath = '/screen/masters/languages';
                    else if (sub === 'Settings') subItemPath = '/screen/masters/settings';

                    const isSubActive = pathname === subItemPath || activeSubItem === `Master-${sub}`;
                    return (
                      <li key={sub}>
                        <Link 
                          href={subItemPath}
                          onClick={() => setActiveSubItem(`Master-${sub}`)}
                          className={`block py-1.5 w-full text-left text-sm transition-colors ${
                            isSubActive 
                              ? 'text-blue-600 dark:text-blue-400 font-bold' 
                              : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                          }`}
                        >
                          {sub}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
      
      {/* User Profile Footer */}
      <div className={`p-4 border-t border-slate-200 dark:border-slate-800 flex justify-center ${isExpanded ? 'items-start' : 'items-center'}`}>
        <div className="flex items-center w-full">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            A
          </div>
          {isExpanded && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">Admin User</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap truncate">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
