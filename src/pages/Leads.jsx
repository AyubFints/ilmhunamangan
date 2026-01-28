import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Phone, ArrowRight, ArrowLeft, Trash2, CheckCircle, UserPlus } from 'lucide-react';

export const Leads = () => {
  const { leads, addLead, moveLead, deleteLead, convertLeadToStudent, groups } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [convertModal, setConvertModal] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert("To'ldiring!");
    addLead(form);
    setForm({ name: '', phone: '' });
    setIsOpen(false);
  };

  const handleConvert = () => {
    if(!selectedGroup) return alert("Guruhni tanlang!");
    convertLeadToStudent(convertModal, selectedGroup);
    setConvertModal(null);
    setSelectedGroup('');
    alert("Tabriklaymiz! Yangi o'quvchi qo'shildi 🎉");
  };

  const columns = [
    { id: 'new', title: '🆕 Yangi', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
    { id: 'contacted', title: '📞 Bog\'lanildi', color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800' },
    { id: 'trial', title: '🔥 Sinov Darsi', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800' }
  ];

  return (
    <div className="p-6 h-screen flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <div className="flex-none flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-milk-900 dark:text-white">Lidlar (Mijozlar)</h1>
           <p className="text-milk-500 dark:text-slate-400">Potentsial o'quvchilar bilan ishlash</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700 shadow-lg"><Plus size={18} /> Yangi Lid</button>
      </div>

      {/* MODALLAR */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl w-96 shadow-2xl border dark:border-slate-700">
            <h3 className="font-bold text-lg mb-4 text-milk-900 dark:text-white">Yangi Mijoz</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input placeholder="Ism" className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white dark:border-slate-600" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input placeholder="Telefon" className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white dark:border-slate-600" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-milk-500 hover:bg-milk-100 rounded-lg">Bekor qilish</button>
                <button className="px-4 py-2 bg-brand-600 text-white rounded-lg">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {convertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl w-96 shadow-2xl border dark:border-slate-700 animate-in zoom-in duration-300">
            <div className="flex justify-center mb-4"><div className="p-3 bg-green-100 rounded-full text-green-600"><CheckCircle size={32}/></div></div>
            <h3 className="font-bold text-lg text-center mb-2 text-milk-900 dark:text-white">{convertModal.name}ni o'quvchi qilamizmi?</h3>
            <p className="text-center text-sm text-milk-500 mb-4">Qaysi guruhga qo'shamiz?</p>
            <select className="w-full p-3 border rounded-lg mb-4 dark:bg-slate-700 dark:text-white dark:border-slate-600" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
              <option value="">Guruhni tanlang</option>
              {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
            </select>
            <button onClick={handleConvert} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">Tasdiqlash</button>
            <button onClick={() => setConvertModal(null)} className="w-full mt-2 text-milk-400 text-sm hover:text-milk-600">Bekor qilish</button>
          </div>
        </div>
      )}

      {/* KANBAN DOSKASI */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
        {columns.map(col => (
          <div key={col.id} className={`flex flex-col h-full rounded-2xl border ${col.color} border-opacity-50 bg-opacity-50 backdrop-blur-sm p-4 overflow-hidden`}>
            
            <div className="flex-none font-bold mb-4 flex justify-between items-center text-milk-900 dark:text-white">
               <span>{col.title}</span>
               <span className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded-full opacity-70">{leads.filter(l => l.status === col.id).length}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {leads.filter(l => l.status === col.id).map(lead => (
                <div key={lead.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-milk-100 dark:border-slate-700 group hover:shadow-md transition shrink-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-milk-900 dark:text-white">{lead.name}</h4>
                    <button onClick={() => deleteLead(lead.id)} className="text-milk-300 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-milk-500 dark:text-slate-400 mb-4">
                    <Phone size={14} /> {lead.phone}
                  </div>

                  <div className="flex justify-between items-center border-t border-milk-100 dark:border-slate-700 pt-3">
                    {col.id !== 'new' ? (
                       <button onClick={() => moveLead(lead.id, col.id === 'trial' ? 'contacted' : 'new')} className="p-1.5 rounded-lg hover:bg-milk-100 dark:hover:bg-slate-700 text-milk-400"><ArrowLeft size={18}/></button>
                    ) : <div></div>}

                    {col.id === 'trial' ? (
                       <button onClick={() => setConvertModal(lead)} className="flex items-center gap-1 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1.5 rounded-lg hover:bg-green-200 transition">
                         <UserPlus size={14} /> Student qilish
                       </button>
                    ) : (
                       <button onClick={() => moveLead(lead.id, col.id === 'new' ? 'contacted' : 'trial')} className="p-1.5 rounded-lg hover:bg-milk-100 dark:hover:bg-slate-700 text-milk-400 hover:text-brand-600"><ArrowRight size={18}/></button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};