import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, User, Clock, DollarSign, Users, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export const GroupDetails = () => {
  const { id } = useParams();
  const { groups, students } = useData();

  const group = groups.find(g => g.id === parseInt(id));

  if (!group) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-500">Guruh topilmadi!</h2>
        <Link to="/groups" className="text-blue-500 hover:underline mt-4 block">Orqaga qaytish</Link>
      </div>
    );
  }

  const groupStudents = students.filter(s => s.group === group.name);

  // 🔥 YANGILANGAN STATUS LOGIKASI
  const getPaymentStatus = (dateString) => {
    // 1. Agar SANA YO'Q bo'lsa -> QIZIL (To'lov qilinmagan)
    if (!dateString) {
      return (
        <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-lg text-xs font-bold border border-red-200">
          <XCircle size={14} /> To'lov qilinmagan!
        </span>
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bugungi kun boshi (soatni hisobga olmaymiz)
    const payDate = new Date(dateString);

    // 2. Agar MUDDAT O'TGAN bo'lsa -> QIZIL (Qarzdor)
    if (payDate < today) {
      return (
        <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-lg text-xs font-bold border border-red-200 animate-pulse">
          <AlertCircle size={14} /> Muddat tugagan ({dateString})
        </span>
      );
    } 
    
    // 3. Agar HAMMASI JOYIDA bo'lsa -> YASHIL (Aktiv)
    return (
      <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-lg text-xs font-bold border border-green-200">
        <CheckCircle size={14} /> Aktiv ({dateString})
      </span>
    );
  };

  return (
    <div className="p-8 animate-in fade-in zoom-in duration-300">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/groups" className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition text-milk-500">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-milk-900 dark:text-white">{group.name}</h1>
          <div className="flex gap-2 text-sm text-milk-500 dark:text-slate-400">
             <span>{group.teacher}</span> • <span>{group.time}</span>
          </div>
        </div>
      </div>

      {/* STATISTIKA */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600"><User size={20}/></div>
          <div><p className="text-xs text-gray-500">O'qituvchi</p><p className="font-bold dark:text-white">{group.teacher}</p></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
           <div className="p-3 rounded-full bg-orange-50 text-orange-600"><Clock size={20}/></div>
           <div><p className="text-xs text-gray-500">Vaqti</p><p className="font-bold dark:text-white">{group.time}</p></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
           <div className="p-3 rounded-full bg-green-50 text-green-600"><DollarSign size={20}/></div>
           <div><p className="text-xs text-gray-500">Narxi</p><p className="font-bold dark:text-white">{parseInt(group.price).toLocaleString()} UZS</p></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
           <div className="p-3 rounded-full bg-purple-50 text-purple-600"><Users size={20}/></div>
           <div><p className="text-xs text-gray-500">O'quvchilar</p><p className="font-bold dark:text-white">{groupStudents.length} ta</p></div>
        </div>
      </div>

      {/* JADVAL */}
      <h3 className="text-xl font-bold mb-5 text-milk-900 dark:text-white flex items-center gap-2">
        <Users size={20} className="text-brand-600"/> Guruh O'quvchilari
      </h3>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-soft overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-milk-50 dark:bg-slate-900 text-milk-500 dark:text-slate-400 border-b border-milk-100 dark:border-slate-700">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Ism Familiya</th>
              <th className="p-4">Telefon</th>
              <th className="p-4">To'lov Holati</th>
              <th className="p-4">Reyting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-milk-100 dark:divide-slate-700">
            {groupStudents.length > 0 ? (
              groupStudents.map((s, index) => (
                <tr key={s.id} className="hover:bg-milk-50 dark:hover:bg-slate-700/50 transition">
                  <td className="p-4 text-gray-400 font-medium">{index + 1}</td>
                  
                  <td className="p-4 font-bold text-milk-900 dark:text-white flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-slate-600 flex items-center justify-center text-brand-700 dark:text-white font-bold text-xs">
                      {s.name.substring(0, 2).toUpperCase()}
                    </div>
                    {s.name}
                  </td>
                  
                  <td className="p-4 text-milk-600 dark:text-slate-300 font-mono">{s.phone}</td>
                  
                  {/* 🔥 QIZIL YOKI YASHIL HOLAT */}
                  <td className="p-4">
                    {getPaymentStatus(s.nextPaymentDate)}
                  </td>
                  
                  <td className="p-4 font-bold text-orange-500">{s.score || 0} XP</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400 italic">
                  Bu guruhda hali o'quvchilar yo'q.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};