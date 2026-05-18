"use client";

import React, { useState } from 'react';
import Sidebar from '../../../../components/Sidebar';

export default function SettingsPage() {
  const [selectedService, setSelectedService] = useState('Deep Cleaning');
   const [basePrice, setBasePrice] = useState('1200');
   const [extraAmount, setExtraAmount] = useState('500');
   const [materialAmount, setMaterialAmount] = useState('200');
   const [vatPercent, setVatPercent] = useState('19');
   const [bonusAmount, setBonusAmount] = useState('100');
   const [rescheduleFee, setRescheduleFee] = useState('250');
   const [vacuumAmount, setVacuumAmount] = useState('150');

  const services = [
    'Deep Cleaning',
    'Plumbing',
    'Electrical',
    'Painting',
    'Pest Control',
    'Carpentry'
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 no-scrollbar">
        <div className="p-6 mx-auto">
          
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif mb-2">
              Master Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Configure global pricing and operational parameters.</p>
          </div>

          <div className="space-y-4">
            
            {/* Price Section */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Service Pricing</h2>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Configure rates per service</p>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  
                  {/* Service Selection */}
                  {/* <div className="md:col-span-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Service Entity</label>
                    <div className="relative">
                      <select 
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-slate-700 dark:text-slate-200 font-medium"
                      >
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div> */}

                  {/* Base Price */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Base Price Per Hour</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 text-xs">€</span>
                      <input 
                        type="number"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
 
                  {/* VAT % */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">VAT %</label>
                    <div className="relative">
                      <input 
                        type="number"
                        value={vatPercent}
                        onChange={(e) => setVatPercent(e.target.value)}
                        className="w-full pr-8 pl-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                        placeholder="0"
                      />
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 text-xs">%</span>
                    </div>
                  </div>

                  {/* Extra Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Extra Amount Per Hour</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 text-xs">€</span>
                      <input 
                        type="number"
                        value={extraAmount}
                        onChange={(e) => setExtraAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Bonus */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Bonus Amount</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 text-xs">€</span>
                      <input 
                        type="number"
                        value={bonusAmount}
                        onChange={(e) => setBonusAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
 
                  {/* Material Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Material Use Amount Per Hour</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 text-xs">€</span>
                      <input 
                        type="number"
                        value={materialAmount}
                        onChange={(e) => setMaterialAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Reschedule Fee */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Reschedule Amount</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 text-xs">€</span>
                      <input 
                        type="number"
                        value={rescheduleFee}
                        onChange={(e) => setRescheduleFee(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Vacuum Cleaner Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Vacuum Cleaner Amount</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 text-xs">€</span>
                      <input 
                        type="number"
                        value={vacuumAmount}
                        onChange={(e) => setVacuumAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button className="px-8 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-sm">
                    Update Pricing Model
                  </button>
                </div>
              </div>
            </section>

            {/* Advisory Section */}
            <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex gap-4">
                <svg className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Global Price Governance</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Adjustments to the pricing model will immediately affect all future bookings. Current bookings will remain under their original pricing agreement unless manually updated by an administrator.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
