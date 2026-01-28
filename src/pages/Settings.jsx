import React from 'react';
import { useData } from '../context/DataContext';
import { Moon, Sun, Trash2, Save, Wallet, CheckCircle, Users, TrendingUp } from 'lucide-react';

export const Settings = () => {
  const { storeName, setStoreName, resetSystem, theme, toggleTheme, stats } = useData();

  return (
    <div className="p-8 pb-20 max-w-4xl mx-auto animate-in slide-in-from-bottom-4">
      <h1 className="text-3xl font-bold text-milk-900 dark:text-white mb-8">Sozlamalar</h1>

      <div className="space-y-8">
        
        {/* 1. UMUMIY STATISTIKA (SUMMARY) */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-milk-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-milk-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-milk-900 dark:text-white flex items-center gap-2">
              <Wallet className="text-purple-600" /> Umumiy Statistika
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* O'quvchilar */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 flex flex-col items-center text-center">
               <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full text-blue-600 dark:text-blue-300 mb-2">
                 <Users size={24} />
               </div>
               <span className="text-sm text-blue-600 dark:text-blue-300 font-medium">Jami O'quvchilar</span>
               <span className="text-2xl font-bold text-blue-800 dark:text-white mt-1">{stats.totalStudents} ta</span>
            </div>

            {/* Jami G'azna */}
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800 flex flex-col items-center text-center">
               <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-full text-purple-600 dark:text-purple-300 mb-2">
                 <Wallet size={24} />
               </div>
               <span className="text-sm text-purple-600 dark:text-purple-300 font-medium">Jami G'azna (Tarix)</span>
               <span className="text-xl font-bold text-purple-800 dark:text-white mt-1">{stats.allTimeRevenue}</span>
            </div>

            {/* Sof Foyda */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 flex flex-col items-center text-center">
               <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-300 mb-2">
                 <TrendingUp size={24} />
               </div>
               <span className="text-sm text-green-600 dark:text-green-300 font-medium">Sof Foyda (Tarix)</span>
               <span className="text-xl font-bold text-green-800 dark:text-white mt-1">{stats.allTimeProfit}</span>
            </div>

          </div>
        </div>

        {/* 2. TIZIM SOZLAMALARI */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-milk-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-milk-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-milk-900 dark:text-white flex items-center gap-2">
              <Save className="text-brand-600" /> Tizim Sozlamalari
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            
            {/* Markaz Nomi */}
            <div>
              <label className="block text-sm font-medium text-milk-700 dark:text-slate-300 mb-2">O'quv Markaz Nomi</label>
              <div className="flex gap-2">
                <input 
                  value={storeName} 
                  onChange={(e) => setStoreName(e.target.value)}
                  className="flex-1 p-3 bg-milk-50 dark:bg-slate-700 border border-milk-200 dark:border-slate-600 rounded-xl outline-none focus:border-brand-500 dark:text-white transition"
                />
                <button className="bg-brand-600 text-white p-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-500/30 active:scale-95 transition">
                  <CheckCircle size={20}/>
                </button>
              </div>
            </div>

            {/* Mavzu (Dark Mode) */}
            <div className="flex items-center justify-between p-4 bg-milk-50 dark:bg-slate-700/50 rounded-xl border border-milk-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                {theme === 'light' ? <Sun className="text-orange-500"/> : <Moon className="text-blue-500"/>}
                <span className="font-medium text-milk-900 dark:text-white">Tungi Rejim (Dark Mode)</span>
              </div>
              <button 
                onClick={toggleTheme}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-brand-600' : 'bg-gray-300'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            {/* Reset */}
            <div className="pt-4 border-t border-milk-100 dark:border-slate-700">
              <button 
                onClick={resetSystem}
                className="w-full p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30"
              >
                <Trash2 size={20} /> Tizimni Tozalash (Reset)
              </button>
              <p className="text-xs text-center text-gray-400 mt-2">Diqqat! Barcha o'quvchilar va to'lovlar o'chib ketadi.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};