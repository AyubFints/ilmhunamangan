import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { TrendingDown, TrendingUp, Calculator, Trash2 } from 'lucide-react';

export const Finance = () => {
  const { students, payments, addPayment, expenses, addExpense, deleteExpense, groups, stats } = useData();
  const [activeTab, setActiveTab] = useState('income');
  const [payForm, setPayForm] = useState({ student: '', amount: '', type: 'Naqd' });
  const [expForm, setExpForm] = useState({ name: '', amount: '', category: 'Arenda' });

  const handlePay = (e) => { e.preventDefault(); if (!payForm.student || !payForm.amount) return alert("To'ldiring!"); addPayment(payForm); setPayForm({ student: '', amount: '', type: 'Naqd' }); };
  const handleExp = (e) => { e.preventDefault(); if (!expForm.name || !expForm.amount) return alert("To'ldiring!"); addExpense(expForm); setExpForm({ name: '', amount: '', category: 'Arenda' }); };

  const calculateSalary = (groupName, sharePercent) => {
    if (!sharePercent) return 0;
    const groupStudentNames = students.filter(s => s.group === groupName).map(s => s.name);
    const totalGroupRevenue = payments.filter(p => groupStudentNames.includes(p.student)).reduce((acc, curr) => acc + parseInt(curr.amount), 0);
    return (totalGroupRevenue * (sharePercent / 100));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div><h1 className="text-2xl font-bold text-milk-900">Moliya</h1><p className="text-milk-500">Hisob-kitob markazi</p></div>
        <div className="flex gap-4">
           <div className="text-right"><p className="text-xs text-milk-500">Kirim</p><p className="text-lg font-bold text-green-600">{stats.totalRevenue}</p></div>
           <div className="text-right border-l pl-4 border-milk-200"><p className="text-xs text-milk-500">Chiqim</p><p className="text-lg font-bold text-red-500">{stats.totalExpenses}</p></div>
           <div className="text-right border-l pl-4 border-milk-200 bg-brand-50 p-2 rounded-lg"><p className="text-xs text-brand-600 font-bold">SOF FOYDA</p><p className="text-xl font-bold text-brand-700">{stats.netProfit}</p></div>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-milk-200 pb-1">
        <button onClick={() => setActiveTab('income')} className={`px-4 py-2 font-bold rounded-t-lg transition ${activeTab === 'income' ? 'bg-green-50 text-green-600 border-b-2 border-green-600' : 'text-milk-400 hover:bg-milk-50'}`}>Kirim</button>
        <button onClick={() => setActiveTab('expense')} className={`px-4 py-2 font-bold rounded-t-lg transition ${activeTab === 'expense' ? 'bg-red-50 text-red-600 border-b-2 border-red-600' : 'text-milk-400 hover:bg-milk-50'}`}>Chiqim</button>
        <button onClick={() => setActiveTab('salary')} className={`px-4 py-2 font-bold rounded-t-lg transition ${activeTab === 'salary' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-milk-400 hover:bg-milk-50'}`}>Oyliklar</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === 'income' && (
          <>
            <div className="bg-white p-6 rounded-2xl border border-milk-200 shadow-soft h-fit"><h3 className="font-bold text-green-700 mb-4 flex items-center gap-2"><TrendingUp size={20}/> To'lov Qabul Qilish</h3><form onSubmit={handlePay} className="space-y-4"><select className="w-full p-3 border rounded-lg bg-white" value={payForm.student} onChange={e => setPayForm({...payForm, student: e.target.value})}><option value="">O'quvchini tanlang</option>{students.map(s => <option key={s.id} value={s.name}>{s.name} ({s.group})</option>)}</select><input type="number" placeholder="Summa" className="w-full p-3 border rounded-lg" value={payForm.amount} onChange={e => setPayForm({...payForm, amount: e.target.value})} /><button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Qabul Qilish</button></form></div>
            <div className="lg:col-span-2 bg-white rounded-2xl border border-milk-200 shadow-soft overflow-hidden"><div className="p-4 bg-milk-50 font-bold text-milk-600 border-b">To'lovlar Tarixi</div><div className="overflow-y-auto max-h-[400px]"><table className="w-full text-sm text-left"><thead className="bg-white text-milk-400 sticky top-0"><tr><th className="p-3">O'quvchi</th><th className="p-3">Summa</th><th className="p-3">Sana</th></tr></thead><tbody>{payments.slice().reverse().map(p => (<tr key={p.id} className="border-b last:border-0 hover:bg-milk-50"><td className="p-3 font-medium">{p.student}</td><td className="p-3 text-green-600 font-bold">+{parseInt(p.amount).toLocaleString()}</td><td className="p-3 text-milk-400 text-xs">{p.date}</td></tr>))}</tbody></table></div></div>
          </>
        )}
        {activeTab === 'expense' && (
          <>
            <div className="bg-white p-6 rounded-2xl border border-milk-200 shadow-soft h-fit"><h3 className="font-bold text-red-600 mb-4 flex items-center gap-2"><TrendingDown size={20}/> Harajat Qilish</h3><form onSubmit={handleExp} className="space-y-4"><input placeholder="Nomi" className="w-full p-3 border rounded-lg" value={expForm.name} onChange={e => setExpForm({...expForm, name: e.target.value})} /><input type="number" placeholder="Summa" className="w-full p-3 border rounded-lg" value={expForm.amount} onChange={e => setExpForm({...expForm, amount: e.target.value})} /><select className="w-full p-3 border rounded-lg bg-white" value={expForm.category} onChange={e => setExpForm({...expForm, category: e.target.value})}><option>Arenda</option><option>Kommunal</option><option>Marketing</option><option>Oylik</option><option>Boshqa</option></select><button className="w-full bg-red-500 text-white py-3 rounded-lg font-bold">Chiqim Qilish</button></form></div>
            <div className="lg:col-span-2 bg-white rounded-2xl border border-milk-200 shadow-soft overflow-hidden"><div className="p-4 bg-milk-50 font-bold text-milk-600 border-b">Harajatlar Tarixi</div><div className="overflow-y-auto max-h-[400px]"><table className="w-full text-sm text-left"><thead className="bg-white text-milk-400 sticky top-0"><tr><th className="p-3">Nomi</th><th className="p-3">Kategoriya</th><th className="p-3">Summa</th><th className="p-3"></th></tr></thead><tbody>{expenses.length === 0 ? <tr><td colSpan="4" className="p-4 text-center text-milk-400">Harajat yo'q</td></tr> : expenses.slice().reverse().map(e => (<tr key={e.id} className="border-b last:border-0 hover:bg-milk-50"><td className="p-3 font-medium">{e.name}</td><td className="p-3 text-milk-500 text-xs bg-milk-100 rounded px-2 w-min">{e.category}</td><td className="p-3 text-red-500 font-bold">-{parseInt(e.amount).toLocaleString()}</td><td className="p-3 text-right"><button onClick={()=>deleteExpense(e.id)} className="text-milk-300 hover:text-red-500"><Trash2 size={16}/></button></td></tr>))}</tbody></table></div></div>
          </>
        )}
        {activeTab === 'salary' && (
          <div className="col-span-3 bg-white p-6 rounded-2xl border border-milk-200 shadow-soft">
             <div className="flex items-center gap-2 mb-6"><div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Calculator size={24}/></div><div><h3 className="font-bold text-milk-900">O'qituvchilar Oyligi</h3><p className="text-xs text-milk-500">Avtomatik hisoblash</p></div></div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{groups.map(g => { const salary = calculateSalary(g.name, g.teacherShare); return (<div key={g.id} className="border border-milk-200 rounded-xl p-4 hover:shadow-md transition bg-milk-50/50"><div className="flex justify-between items-start mb-2"><h4 className="font-bold text-milk-900">{g.name}</h4><span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">{g.teacherShare || 0}% ulush</span></div><p className="text-sm text-milk-500 mb-4">O'qituvchi: <span className="text-milk-900 font-medium">{g.teacher}</span></p><div className="border-t border-milk-200 pt-3 flex justify-between items-center"><span className="text-xs text-milk-500">Jami oylik:</span><span className="font-bold text-xl text-blue-600">{salary.toLocaleString()} <span className="text-xs">UZS</span></span></div></div>)})}</div>
          </div>
        )}
      </div>
    </div>
  );
};