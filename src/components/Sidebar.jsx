import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  LayoutDashboard, Users, Layers, Wallet, 
  CalendarCheck, Settings, LogOut, Tv, UserCircle 
} from 'lucide-react';

export const Sidebar = () => {
  const { storeName, logout, currentUser } = useData();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },

    { icon: Users, label: "O'quvchilar", path: "/students" },
    { icon: Layers, label: "Guruhlar", path: "/groups" },
    { icon: CalendarCheck, label: "Davomat", path: "/attendance" },
    { icon: Wallet, label: "Moliya", path: "/finance" },
    { icon: Tv, label: "Reyting (TV)", path: "/leaderboard" },
    { icon: Settings, label: "Sozlamalar", path: "/settings" },
  ];

  return (
    <>

      <div className="w-20 h-screen bg-transparent shrink-0 hidden md:block transition-all duration-300" />


      <div 
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-slate-800 border-r border-milk-200 dark:border-slate-700 flex flex-col justify-between transition-all duration-300 z-50 shadow-2xl ${isHovered ? 'w-72' : 'w-20'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        

        <div className="p-5 flex items-center gap-4 overflow-hidden whitespace-nowrap h-20">
          <div className="w-10 h-10 min-w-[2.5rem] bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30">
            E
          </div>
          <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="font-bold text-xl text-milk-900 dark:text-white tracking-tight">EduCore</h1>
            <p className="text-xs text-milk-500 dark:text-slate-400 font-medium truncate w-32">{storeName}</p>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-2 overflow-x-hidden py-4 custom-scrollbar hover:overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group whitespace-nowrap
                  ${isActive 
                    ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-bold shadow-sm' 
                    : 'text-milk-500 dark:text-slate-400 hover:bg-milk-50 dark:hover:bg-slate-700 hover:text-milk-900 dark:hover:text-white'
                  }
                `}
              >
                <item.icon size={24} className={`min-w-[24px] ${isActive ? "text-brand-600 dark:text-brand-400" : "group-hover:text-milk-900 dark:group-hover:text-white transition-colors"}`} />
                
                <span className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>
                  {item.label}
                </span>
                
                {isActive && isHovered && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400 animate-pulse"></div>}
              </Link>
            )
          })}
        </nav>


        <div className="p-4 border-t border-milk-100 dark:border-slate-700 overflow-hidden whitespace-nowrap bg-white dark:bg-slate-800">
          {isHovered && (
            <div className="flex items-center gap-3 mb-4 p-3 bg-milk-50 dark:bg-slate-700/50 rounded-xl animate-in fade-in slide-in-from-bottom-2">
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-slate-600 flex items-center justify-center text-brand-600 dark:text-white">
                <UserCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-sm text-milk-900 dark:text-white truncate w-32">{currentUser?.username || "Admin"}</p>
                <p className="text-[10px] uppercase font-bold text-milk-400 dark:text-slate-400">Administrator</p>
              </div>
            </div>
          )}
          <button 
            onClick={logout}
            className={`flex items-center gap-4 w-full px-3 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition font-medium hover:shadow-sm ${!isHovered && 'justify-center'}`}
            title="Chiqish"
          >
            <LogOut size={24} className="min-w-[24px]" />
            <span className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 hidden'}`}>
              Chiqish
            </span>
          </button>
        </div>
      </div>
    </>
  );
};