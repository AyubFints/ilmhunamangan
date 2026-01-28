import React, { useState } from 'react';
import { useData } from '../context/DataContext';
// 🔥 Link ni import qilish esdan chiqmasin
import { Link } from 'react-router-dom';
import { Plus, Users, Clock, Trash2, Percent, Monitor, Globe, Calculator, BookOpen, PenTool, ArrowRight } from 'lucide-react';

export const Groups = () => {
  const { groups, addGroup, deleteGroup } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', teacher: '', time: '', price: '', teacherShare: '', type: 'Ingliz Tili' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert("To'ldiring!");
    addGroup(form);
    setForm({ name: '', teacher: '', time: '', price: '', teacherShare: '', type: 'Ingliz Tili' });
    setIsOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`DIQQAT! "${name}" guruhini o'chirmoqchimisiz?\nBu guruhdagi hamma narsa o'chib ketadi.`)) {
      deleteGroup(id);
    }
  };

  const getIcon = (typeName) => {
    const name = (typeName || "").toLowerCase();
    if (name.includes('it') || name.includes('dastur')) return <Monitor size={24} />;
    if (name.includes('matem')) return <Calculator size={24} />;
    if (name.includes('rus') || name.includes('arab')) return <BookOpen size={24} />;
    if (name.includes('dizayn')) return <PenTool size={24} />;
    return <Globe size={24} />;
  };

  const inputStyle = "p-3 border border-milk-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white outline-none focus:border-brand-500 w-full";

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-2xl font-bold text-milk-900 dark:text-white">Guruhlar</h1></div>
        <button onClick={() => setIsOpen(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700 shadow-lg"><Plus size={18} /> Yangi Guruh</button>
      </div>

      {isOpen && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-soft mb-8 animate-in zoom-in">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input placeholder="Nomi (Pre-IELTS)" className={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input placeholder="O'qituvchi" className={inputStyle} value={form.teacher} onChange={e => setForm({...form, teacher: e.target.value})} />
            
            <select className={inputStyle} value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="Ingliz Tili">Ingliz Tili</option>
              <option value="Rus Tili">Rus Tili</option>
              <option value="IT Dasturlash">IT Dasturlash</option>
              <option value="Matematika">Matematika</option>
              <option value="Robototexnika">Robototexnika</option>
            </select>

            <input type="time" className={inputStyle} value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
            <input type="number" placeholder="Narxi" className={inputStyle} value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            
            <div className="relative">
              <Percent className="absolute left-2 top-2.5 text-milk-400 dark:text-slate-400" size={16} />
              <input type="number" placeholder="Ustoz %" className={`${inputStyle} pl-8`} value={form.teacherShare} onChange={e => setForm({...form, teacherShare: e.target.value})} />
            </div>

            <button type="submit" className="bg-green-600 text-white p-2 rounded-lg font-medium lg:col-span-3 mt-2 hover:bg-green-700">Saqlash</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <div key={group.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-soft hover:shadow-lg transition group relative flex flex-col justify-between">
            
            {/* O'CHIRISH TUGMASI */}
            <button 
              onClick={() => handleDelete(group.id, group.name)} 
              className="absolute top-4 right-4 text-milk-300 dark:text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
              title="Guruhni o'chirish"
            >
              <Trash2 size={18} />
            </button>
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4 text-brand-600">
                {getIcon(group.type)}
              </div>

              <h3 className="text-xl font-bold text-milk-900 dark:text-white">{group.name}</h3>
              <p className="text-milk-500 dark:text-slate-400 text-sm mb-2">{group.teacher} • <span className="text-green-600 font-bold">{group.teacherShare || 0}%</span></p>

              <div className="flex items-center gap-4 text-sm text-milk-500 dark:text-slate-500 border-t border-milk-100 dark:border-slate-700 pt-4">
                <div className="flex items-center gap-1"><Clock size={16} /><span>{group.time}</span></div>
                <div className="flex items-center gap-1"><Users size={16} /><span>{group.studentsCount} ta</span></div>
              </div>
            </div>

            {/* 🔥 KIRISH TUGMASI (Yangi) */}
            <Link 
              to={`/groups/${group.id}`} 
              className="mt-6 w-full py-3 rounded-xl bg-milk-50 dark:bg-slate-700 text-brand-600 dark:text-white font-bold flex items-center justify-center gap-2 hover:bg-brand-600 hover:text-white transition-all active:scale-95"
            >
              Guruhga kirish <ArrowRight size={18} />
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};