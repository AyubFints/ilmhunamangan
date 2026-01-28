import React from 'react';
import { useData } from '../context/DataContext';
import { Users, DollarSign, TrendingUp, TrendingDown, Bell, History, ArrowRight, Wallet, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { stats, notifications, getHistory } = useData();
  
  const historyData = getHistory();
  const monthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
  const currentMonthName = monthNames[new Date().getMonth()];

  const cards = [
    // 1. JAMI O'QUVCHILAR (O'zgarmaydi)
    { 
      title: "Jami O'quvchilar", 
      value: stats.totalStudents, 
      icon: Users, 
      color: "bg-blue-500", 
      sub: "Faol o'quvchilar" 
    },

    // 2. 🔥 KIRAYOTGAN SUMMA (TUSHUM) - "Birinchi"
    { 
      title: `Tushum (${currentMonthName})`, 
      value: stats.monthRevenue, 
      icon: TrendingUp, 
      color: "bg-green-500", 
      sub: "Kassaga kirgan pul" 
    },

    // 3. 🔥 CHIQIB KETAYOTGAN SUMMA (XARAJAT) - "O'rtada"
    { 
      title: `Xarajatlar (${currentMonthName})`, 
      value: stats.monthExpenses, 
      icon: TrendingDown, 
      color: "bg-red-500", 
      sub: "Markazdan chiqib ketgan" 
    },

    // 4. 🔥 YONGA QOLAYOTGAN SUMMA (FOYDA) - "Oxirida"
    { 
      title: `Sof Foyda (${currentMonthName})`, 
      value: stats.monthProfit, 
      icon: Wallet, 
      color: "bg-indigo-500", 
      sub: "Yonga qolgan pul" 
    },
  ];

  return (
    <div className="p-8 animate-in fade-in zoom-in duration-300 pb-20">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-milk-900 dark:text-white mb-2">Boshqaruv Paneli</h1>
        <p className="text-milk-500 dark:text-slate-400">
            Hozirgi oy: <span className="font-bold text-brand-600">{currentMonthName}</span>
        </p>
      </div>

      {/* KARTALAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft hover:shadow-lg transition border border-milk-200 dark:border-slate-700 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-bl-full -mr-4 -mt-4 transition group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-xl text-white shadow-lg ${card.color}`}>
                <card.icon size={24} />
              </div>
            </div>
            <p className="text-milk-500 dark:text-slate-400 text-sm font-medium relative z-10">{card.title}</p>
            <h3 className="text-xl lg:text-2xl font-bold text-milk-900 dark:text-white mt-1 truncate relative z-10" title={card.value}>{card.value}</h3>
            <p className="text-xs text-gray-400 mt-2 relative z-10">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TARIX JADVALI */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-milk-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-milk-100 dark:border-slate-700 flex justify-between items-center bg-milk-50 dark:bg-slate-800/50">
            <h3 className="text-xl font-bold text-milk-900 dark:text-white flex items-center gap-2">
              <History className="text-brand-600" /> O'tgan Oylar Tarixi
            </h3>
            <Link to="/finance" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
              Batafsil <ArrowRight size={14}/>
            </Link>
          </div>
          <div className="p-0">
            {historyData.length > 0 ? (
              <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white dark:bg-slate-900 text-milk-500 dark:text-slate-400 sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="p-4">Davr</th>
                      <th className="p-4 text-green-600">Tushum</th>
                      <th className="p-4 text-red-500">Xarajat</th>
                      <th className="p-4 text-brand-600">Foyda</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-milk-100 dark:divide-slate-700">
                    {historyData.map((item, index) => (
                      <tr key={index} className="hover:bg-milk-50 dark:hover:bg-slate-700/50 transition">
                        <td className="p-4 font-bold text-milk-900 dark:text-white">{item.date}</td>
                        <td className="p-4 font-mono text-green-600">+{item.revenue.toLocaleString()}</td>
                        <td className="p-4 font-mono text-red-500">-{item.expense.toLocaleString()}</td>
                        <td className="p-4 font-mono font-bold text-brand-600">
                          {item.profit > 0 ? '+' : ''}{item.profit.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center flex flex-col items-center gap-3">
                <History size={48} className="text-gray-300" />
                <p className="text-gray-400 italic">
                  O'tgan oylar tarixi hozircha yo'q. <br/>
                  Yangi oy boshlanganda eski ma'lumotlar shu yerga tushadi.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* QARZDORLAR */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-milk-200 dark:border-slate-700 p-6 h-fit">
          <h3 className="text-xl font-bold text-milk-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="text-red-500" /> To'lov Vaqti Kelganlar
          </h3>
          {notifications.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {notifications.map(s => (
                <div key={s.id} className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                  <div>
                    <p className="font-bold text-red-700 dark:text-red-300">{s.name}</p>
                    <p className="text-xs text-red-500 dark:text-red-400">{s.group} guruhida</p>
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm border border-red-100">
                    {s.nextPaymentDate}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-2" />
              <p className="text-green-600 font-bold mb-1">Ajoyib!</p>
              <p className="text-sm text-green-500">Hozircha qarzdorlar yo'q.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};