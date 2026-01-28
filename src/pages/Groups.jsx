import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Plus, Trash2, Users, BookOpen, Clock, DollarSign } from 'lucide-react';

export const Groups = () => {
  const { groups, addGroup, deleteGroup } = useData();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', teacher: '', time: '', price: '' });

  // Guruh qo'shish
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.teacher) return alert("Ma'lumotlarni to'ldiring!");
    
    addGroup(formData);
    setFormData({ name: '', teacher: '', time: '', price: '' });
    setIsOpen(false);
  };

  // Guruhni o'chirish
  const handleDelete = (e, id, name) => {
    e.preventDefault(); // Link bosilib ketmasligi uchun
    e.stopPropagation(); // Link bosilib ketmasligi uchun
    
    if (window.confirm(`"${name}" guruhini o'chirmoqchimisiz? Ichidagi o'quvchilar guruhsiz qoladi!`)) {
      deleteGroup(id);
    }
  };

  const inputStyle = "p-3 border border-milk-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white outline-none focus:border-brand-500 w-full";

  return (
    <div className="p-8 pb-20 animate-in fade-in zoom-in duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-milk-900 dark:text-white">Guruhlar</h1>
          <p className="text-milk-500 dark:text-slate-400">Jami: {groups.length} ta guruh</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-brand-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-700 shadow-lg shadow-brand-500/30 active:scale-95 transition font-bold"
        >
          <Plus size={20} /> Guruh Qo'shish
        </button>
      </div>

      {/* MODAL (Guruh qo'shish oynasi) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-milk-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-milk-900 dark:text-white">Yangi Guruh</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 block">Guruh Nomi</label>
                <input placeholder="Masalan: Frontend 01" className={inputStyle} value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 block">O'qituvchi</label>
                <input placeholder="Ism Familiya" className={inputStyle} value={formData.teacher} onChange={e=>setFormData({...formData, teacher:e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 block">Vaqt</label>
                   <input placeholder="14:00 - 16:00" className={inputStyle} value={formData.time} onChange={e=>setFormData({...formData, time:e.target.value})} />
                </div>
                <div>
                   <label className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 block">Narx (so'm)</label>
                   <input type="number" placeholder="500000" className={inputStyle} value={formData.price} onChange={e=>setFormData({...formData, price:e.target.value})} />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition">Bekor qilish</button>
                <button type="submit" className="flex-1 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition shadow-lg">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GURUHLAR RO'YXATI (GRID) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.length > 0 ? (
          groups.map((group) => (
            <Link 
              to={`/groups/${group.id}`} 
              key={group.id} 
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft hover:shadow-xl transition border border-milk-200 dark:border-slate-700 group relative overflow-hidden"
            >
              {/* Orqa fon bezagi */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-brand-50 dark:bg-brand-900/10 rounded-bl-full -mr-10 -mt-10 transition group-hover:scale-110"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-brand-100 dark:bg-slate-700 text-brand-600 dark:text-white rounded-xl shadow-sm">
                  <BookOpen size={24} />
                </div>
                <button 
                  onClick={(e) => handleDelete(e, group.id, group.name)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-milk-900 dark:text-white mb-1 relative z-10">{group.name}</h3>
              <p className="text-sm text-milk-500 dark:text-slate-400 mb-4 relative z-10">{group.teacher}</p>

              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Clock size={16} className="text-orange-500"/> {group.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <DollarSign size={16} className="text-green-500"/> {parseInt(group.price).toLocaleString()} UZS
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-slate-700/50 p-2 rounded-lg w-fit">
                  <Users size={16}/> {group.studentsCount || 0} ta o'quvchi
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={40} className="opacity-50"/>
            </div>
            <p className="text-lg">Hozircha guruhlar yo'q.</p>
            <p className="text-sm">"Guruh Qo'shish" tugmasini bosib yangi guruh yarating.</p>
          </div>
        )}
      </div>
    </div>
  );
};