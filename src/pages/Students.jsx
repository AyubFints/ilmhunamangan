import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Trash2, User, Star, Award, RefreshCw, X, DollarSign, CheckCircle, Wallet } from 'lucide-react';

export const Students = () => {
  const { students, addStudent, deleteStudent, changeStudentGroup, addPayment, groups, giveBonus } = useData();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', group: '', phone: '', status: 'active' });
  const [transferModal, setTransferModal] = useState(null);
  const [newGroup, setNewGroup] = useState('');
  const [paymentModal, setPaymentModal] = useState(null);
  const [payAmount, setPayAmount] = useState('');

  // --- FUNKSIYALAR ---

  // 🔥 SANA FORMATLASH FUNKSIYASI (YANGI)
  const formatDate = (dateString) => {
    if (!dateString) return null;
    // 2026-01-27 ni olib -> ["2026", "01", "27"] qilamiz -> teskari aylantiramiz -> nuqta bilan ulaymiz
    return dateString.split('-').reverse().join('.'); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.group) return alert("To'ldiring!");
    addStudent(formData);
    setFormData({ name: '', group: '', phone: '', status: 'active' });
    setIsOpen(false);
  };

  const handleBonus = (studentId) => {
    if(window.confirm("O'quvchiga 10 ball bonus beramizmi?")) {
      giveBonus(studentId, 10);
    }
  };

  const handleTransfer = () => {
    if (!newGroup) return alert("Iltimos, yangi guruhni tanlang!");
    changeStudentGroup(transferModal.id, newGroup);
    setTransferModal(null);
    setNewGroup('');
    alert("O'quvchi muvaffaqiyatli ko'chirildi! ✅");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`DIQQAT!\n"${name}"ni o'chirmoqchimisiz?`)) {
      deleteStudent(id);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!payAmount) return alert("Summani kiriting!");
    addPayment({
      student: paymentModal.name,
      amount: payAmount,
      type: 'Naqd',
    });
    setPaymentModal(null);
    setPayAmount('');
  };

  const inputStyle = "p-3 border border-milk-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white outline-none focus:border-brand-500 w-full";

  return (
    <div className="p-8 pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-milk-900 dark:text-white">O'quvchilar</h1>
            <p className="text-sm text-milk-500">Jami: {students.length} ta</p>
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

      {/* TO'LOV OYNASI */}
      {paymentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-in zoom-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-milk-200 dark:border-slate-700">
            <div className="bg-green-600 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Wallet size={24} className="text-white"/></div>
                <div><h3 className="text-lg font-bold">To'lov Qabul Qilish</h3><p className="text-green-100 text-sm">Kassaga kirim qilish</p></div>
              </div>
              <button onClick={() => setPaymentModal(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"><X size={20} /></button>
            </div>
            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-green-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-3 shadow-inner"><User size={32} /></div>
                <h2 className="text-2xl font-bold text-milk-900 dark:text-white">{paymentModal.name}</h2>
                <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300 rounded-full text-sm mt-2 font-medium">{paymentModal.group}</span>
              </div>
              <form onSubmit={handlePaymentSubmit}>
                <div className="relative mb-8">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">To'lov Summasi (UZS)</label>
                  <input type="number" autoFocus placeholder="0" className="w-full text-center text-4xl font-bold text-milk-900 dark:text-white bg-transparent border-b-2 border-gray-200 dark:border-slate-600 focus:border-green-500 outline-none pb-2 transition-colors placeholder-gray-300" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
                </div>
                <div className="flex gap-3">
                   <button type="button" onClick={() => setPaymentModal(null)} className="flex-1 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700 transition">Bekor qilish</button>
                   <button type="submit" className="flex-[2] py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-500/30 active:scale-95 transition flex items-center justify-center gap-2"><CheckCircle size={20}/> Tasdiqlash</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TRANSFER OYNASI */}
      {transferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl w-96 shadow-2xl border border-milk-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Guruhni o'zgartirish</h3>
            <p className="text-sm text-gray-500 mb-4"><span className="font-bold text-brand-600">{transferModal.name}</span> ni qaysi guruhga o'tkazamiz?</p>
            <select className={inputStyle + " mb-4"} value={newGroup} onChange={e => setNewGroup(e.target.value)}>
              <option value="">Yangi guruhni tanlang...</option>
              {groups.filter(g => g.name !== transferModal.group).map(g => (<option key={g.id} value={g.name}>{g.name}</option>))}
            </select>
            <div className="flex gap-2">
                <button onClick={() => setTransferModal(null)} className="flex-1 p-3 bg-gray-100 text-gray-600 rounded-lg font-bold">Bekor qilish</button>
                <button onClick={handleTransfer} className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-bold">O'tkazish</button>
            </div>
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
              <tr key={s.id} className="hover:bg-milk-50 dark:hover:bg-slate-700/50 transition">
                <td className="p-4 font-bold text-milk-900 dark:text-white flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-slate-700 flex items-center justify-center text-brand-600"><User size={16}/></div>
                   {s.name}
                </td>
                <td className="p-4"><span className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-2 py-1 rounded text-xs font-bold">{s.group}</span></td>
                
                <td className="p-4 flex items-center gap-2">
                   <span className="flex items-center gap-1 font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full text-xs"><Star size={14} fill="currentColor" /> {s.score || 0} XP</span>
                   <button onClick={() => handleBonus(s.id)} title="+10 Bonus" className="p-1 text-gray-400 hover:text-yellow-500 active:scale-125 transition"><Award size={16}/></button>
                </td>

                {/* 🔥 SANA FORMATI O'ZGARDI */}
                <td className="p-4">
                    {s.nextPaymentDate ? (
                        <span className={`text-xs font-bold px-2 py-1 rounded ${new Date(s.nextPaymentDate) <= new Date() ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {formatDate(s.nextPaymentDate)}
                        </span>
                    ) : <span className="text-xs text-milk-400">To'lovsiz</span>}
                </td>
                
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => setPaymentModal(s)} className="p-2 text-green-600 bg-green-50 dark:bg-green-900/10 hover:bg-green-100 rounded-lg transition shadow-sm border border-green-200 dark:border-green-900/30" title="To'lov qilish"><DollarSign size={18} /></button>
                  <button onClick={() => setTransferModal(s)} className="p-2 text-blue-500 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 rounded-lg transition" title="Guruhni o'zgartirish"><RefreshCw size={18} /></button>
                  <button onClick={() => handleDelete(s.id, s.name)} className="p-2 text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 rounded-lg transition" title="O'chirish"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};