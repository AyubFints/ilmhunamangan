import React from 'react';
import { useData } from '../context/DataContext';
import { Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LeaderboardTV = () => {
  const { students } = useData();

  // Eng ko'p ball yig'ganlarni saralash (Top 10)
  const topStudents = [...students]
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 10);

  const top1 = topStudents[0];
  const top2 = topStudents[1];
  const top3 = topStudents[2];
  const others = topStudents.slice(3);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center relative overflow-hidden">
      
      {/* Orqa fon bezagi */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
      
      {/* Sarlavha */}
      <div className="z-10 text-center mb-12">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2 uppercase tracking-widest drop-shadow-lg">
          Bizning Chempionlar
        </h1>
        <p className="text-slate-400 text-xl">Oyning eng kuchli o'quvchilari reytingi</p>
      </div>

      {/* 👑 SHOHSUPA (TOP 3) */}
      <div className="flex items-end justify-center gap-8 mb-16 z-10 w-full max-w-4xl">
        
        {/* 2-O'RIN (KUMUSH) */}
        {top2 && (
          <div className="flex flex-col items-center animate-in slide-in-from-left duration-1000">
            <div className="w-24 h-24 rounded-full border-4 border-gray-400 bg-gray-800 flex items-center justify-center text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(156,163,175,0.5)]">
              🥈
            </div>
            <div className="bg-gray-800 p-6 rounded-t-2xl w-40 text-center border-t-4 border-gray-400 h-40 flex flex-col justify-end">
               <h3 className="font-bold text-lg truncate">{top2.name}</h3>
               <p className="text-gray-400 text-sm font-bold">{top2.score || 0} XP</p>
            </div>
          </div>
        )}

        {/* 1-O'RIN (OLTIN) */}
        {top1 && (
          <div className="flex flex-col items-center -mt-10 z-20 animate-in zoom-in duration-1000">
            <div className="relative">
              <Crown size={64} className="text-yellow-400 absolute -top-14 left-1/2 -translate-x-1/2 animate-bounce" fill="currentColor" />
              <div className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-yellow-900/50 flex items-center justify-center text-5xl font-bold mb-4 shadow-[0_0_40px_rgba(250,204,21,0.6)]">
                🥇
              </div>
            </div>
            <div className="bg-gradient-to-b from-yellow-600 to-yellow-800 p-8 rounded-t-3xl w-52 text-center border-t-4 border-yellow-400 h-56 flex flex-col justify-end shadow-2xl">
               <h3 className="font-bold text-2xl truncate">{top1.name}</h3>
               <p className="text-yellow-200 text-xl font-black">{top1.score || 0} XP</p>
               <div className="mt-2 text-xs uppercase tracking-widest text-yellow-900 bg-yellow-400 py-1 rounded-full font-bold">Lider</div>
            </div>
          </div>
        )}

        {/* 3-O'RIN (BRONZA) */}
        {top3 && (
          <div className="flex flex-col items-center animate-in slide-in-from-right duration-1000">
            <div className="w-24 h-24 rounded-full border-4 border-orange-700 bg-orange-900/50 flex items-center justify-center text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(194,65,12,0.5)]">
              🥉
            </div>
            <div className="bg-orange-900/40 p-6 rounded-t-2xl w-40 text-center border-t-4 border-orange-700 h-32 flex flex-col justify-end">
               <h3 className="font-bold text-lg truncate">{top3.name}</h3>
               <p className="text-orange-500 text-sm font-bold">{top3.score || 0} XP</p>
            </div>
          </div>
        )}
      </div>

      {/* QOLGANLAR RO'YXATI */}
      <div className="w-full max-w-3xl z-10 space-y-3 pb-10">
        {others.map((s, index) => (
          <div key={s.id} className="flex items-center bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 hover:bg-slate-700 transition transform hover:scale-[1.02]">
            <div className="w-10 text-center font-bold text-slate-500 text-xl">#{index + 4}</div>
            <div className="flex-1 px-4">
              <div className="font-bold text-lg">{s.name}</div>
              <div className="text-xs text-slate-400">{s.group}</div>
            </div>
            <div className="text-yellow-500 font-bold text-xl flex items-center gap-2">
              {s.score || 0} <Star size={16} fill="currentColor" />
            </div>
          </div>
        ))}
      </div>

      {/* Orqaga qaytish (Yashirin tugma - sichqoncha borganda chiqadi) */}
      <Link to="/" className="fixed bottom-4 right-4 text-slate-600 hover:text-white transition opacity-30 hover:opacity-100 z-50 p-4">
        Admin Panelga qaytish
      </Link>
    </div>
  );
};