import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Trash2, User, Star, Award, RefreshCw, X } from 'lucide-react';

export const Students = () => {
  const { students, addStudent, deleteStudent, changeStudentGroup, groups, giveBonus } = useData();
  
  // Modallar uchun statelar
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', group: '', phone: '', status: 'active' });
  const [transferModal, setTransferModal] = useState(null);
  const [newGroup, setNewGroup] = useState('');

  // O'quvchi qo'shish
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.group) return alert("Iltimos, ma'lumotlarni to'ldiring!");
    addStudent(formData);
    setFormData({ name: '', group: '', phone: '', status: 'active' });
    setIsOpen(false);
  };

  // Bonus berish (So'rab keyin beradi)
  const handleBonus = (studentId) => {
    if(window.confirm("O'quvchiga 10 ball bonus beramizmi?")) {
      giveBonus(studentId, 10);
    }
  };

  // Guruhni o'zgartirish
  const handleTransfer = () => {
    if (!newGroup) return alert("Iltimos, yangi guruhni tanlang!");
    changeStudentGroup(transferModal.id, newGroup);
    setTransferModal(null);
    setNewGroup('');
    alert("O'quvchi muvaffaqiyatli ko'chirildi! ✅");
  };

  // 🔥 O'CHIRISHNI TASDIQLASH (ENG MUHIM JOYI)
  const handleDelete = (id, name) => {
    // 1. Avval so'raymiz
    const isConfirmed = window.confirm(`DIQQAT!\n\n"${name}" o'quvchisini o'chirmoqchimisiz?\nBu ma'lumotni qayta tiklab bo'lmaydi.`);
    
    // 2. Agar "OK" bossa, o'chiramiz
    if (isConfirmed) {
      deleteStudent(id);
    }
    // "Otmen" bossa, hech narsa qilmaymiz
  };

  const inputStyle = "p-3 border border-milk-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white outline-none focus:border-brand-500 w-full";

  return (
    <div className="p-8">
      {/* TEPADAGI HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-milk-900 dark:text-white">O'quvchilar</h1>
            <p className="text-sm text-milk-500">Jami o'quvchilar: {students.length} ta</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700 shadow-lg active:scale-95 transition">
            <Plus size={18} /> Qo'shish
        </button>
      </div>

      {/* QO'SHISH OYNASI */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-soft mb-8 animate-in zoom-in">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <input placeholder="Ism Familiya" className={inputStyle} value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} />
            <select className={inputStyle} value={formData.group} onChange={e=>setFormData({...formData, group:e.target.value})}><option value="">Guruhni tanlang</option>{groups.map(g=><option key={g.id} value={g.name}>{g.name}</option>)}</select>
            <input placeholder="Telefon" className={inputStyle} value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} />
            <button className="bg-green-600 text-white p-3 rounded-lg w-full font-bold hover:bg-green-700 transition">Saqlash</button>
          </form>
        </div>
      )}

      {/* TRANSFER OYNASI (POPUP) */}
      {transferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl w-96 shadow-2xl border border-milk-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-milk-900 dark:text-white">Guruhni o'zgartirish</h3>
              <button onClick={() => setTransferModal(null)}><X size={20} className="text-gray-400"/></button>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-bold text-brand-600">{transferModal.name}</span> ni qaysi guruhga o'tkazamiz?
            </p>

            <select className={inputStyle + " mb-4"} value={newGroup} onChange={e => setNewGroup(e.target.value)}>
              <option value="">Yangi guruhni tanlang...</option>
              {groups.filter(g => g.name !== transferModal.group).map(g => (
                <option key={g.id} value={g.name}>{g.name}</option>
              ))}
            </select>

            <button onClick={handleTransfer} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold flex items-center justify-center gap-2">
              <RefreshCw size={18}/> O'tkazish
            </button>
          </div>
        </div>
      )}

      {/* JADVAL */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-soft overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-milk-50 dark:bg-slate-900 text-milk-500 dark:text-slate-400">
            <tr><th className="p-4">Ism</th><th className="p-4">Guruh</th><th className="p-4">Reyting</th><th className="p-4">Muddat</th><th className="p-4 text-right">Amallar</th></tr>
          </thead>
          <tbody className="divide-y divide-milk-100 dark:divide-slate-700">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-milk-50 dark:hover:bg-slate-700/50 transition-colors">
                
                <td className="p-4 font-bold text-milk-900 dark:text-white flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-slate-700 flex items-center justify-center text-brand-600"><User size={16}/></div>
                   {s.name}
                </td>
                
                <td className="p-4"><span className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-2 py-1 rounded text-xs font-bold">{s.group}</span></td>
                
                <td className="p-4 flex items-center gap-2">
                   <span className="flex items-center gap-1 font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full text-xs"><Star size={14} fill="currentColor" /> {s.score || 0} XP</span>
                   <button onClick={() => handleBonus(s.id)} title="+10 Bonus" className="p-1 text-gray-400 hover:text-yellow-500 active:scale-125 transition"><Award size={16}/></button>
                </td>

                <td className="p-4">{s.nextPaymentDate ? <span className={`text-xs font-bold px-2 py-1 rounded ${new Date(s.nextPaymentDate) <= new Date() ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{s.nextPaymentDate}</span> : <span className="text-xs text-milk-400">To'lovsiz</span>}</td>
                
                <td className="p-4 text-right flex justify-end gap-2">
                  {/* TRANSFER TUGMASI */}
                  <button 
                    onClick={() => setTransferModal(s)} 
                    className="p-2 text-blue-500 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 rounded-lg transition"
                    title="Guruhni o'zgartirish"
                  >
                    <RefreshCw size={18} />
                  </button>

                  {/* 🔥 O'CHIRISH TUGMASI (handleDelete ga ulandi) */}
                  <button 
                    onClick={() => handleDelete(s.id, s.name)} 
                    className="p-2 text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 rounded-lg transition"
                    title="O'chirish"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))}
            
            {students.length === 0 && (
                <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">O'quvchilar yo'q. Yangi qo'shing!</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};