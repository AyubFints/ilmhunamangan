import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, Check, X, User } from 'lucide-react';

export const Attendance = () => {
  const { groups, students, attendance, markAttendance } = useData();
  const today = new Date().toISOString().split('T')[0];
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);

  const filteredStudents = students.filter(s => s.group === selectedGroup);
  const getStatus = (studentId) => {
    const record = attendance?.find(a => a.date === selectedDate && a.studentId === studentId);
    return record ? record.status : null;
  };

  // 🔥 Style
  const selectStyle = "w-full p-2 border border-milk-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white outline-none focus:border-brand-500";

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-2xl font-bold text-milk-900 dark:text-white">Davomat</h1></div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-soft mb-8 flex gap-4 items-end">
        <div className="flex-1">
          <label className="text-xs font-bold text-milk-500 dark:text-slate-400 mb-1 block">Guruh</label>
          <select className={selectStyle} value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
            <option value="">Guruhni tanlang</option>
            {groups.map(g => (<option key={g.id} value={g.name}>{g.name}</option>))}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-milk-500 dark:text-slate-400 mb-1 block">Sana</label>
          <input type="date" className={selectStyle} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-milk-200 dark:border-slate-700 shadow-soft overflow-hidden transition-colors">
        {selectedGroup ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-milk-50 dark:bg-slate-900 text-milk-500 dark:text-slate-400 font-medium border-b border-milk-200 dark:border-slate-700">
              <tr>
                <th className="p-4">O'quvchi</th>
                <th className="p-4 text-center">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-milk-100 dark:divide-slate-700">
              {filteredStudents.map(student => {
                const status = getStatus(student.id);
                return (
                  <tr key={student.id} className="hover:bg-milk-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 font-bold text-milk-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-slate-700 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                        <User size={16} />
                      </div>
                      {student.name}
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <button 
                        onClick={() => markAttendance(selectedDate, selectedGroup, student.id, 'present')}
                        className={`p-2 rounded-lg flex items-center gap-2 transition ${
                          status === 'present' 
                          ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' 
                          : 'bg-milk-100 dark:bg-slate-700 text-milk-400 dark:text-slate-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600'
                        }`}
                      >
                        <Check size={18} /> Keldi
                      </button>

                      <button 
                        onClick={() => markAttendance(selectedDate, selectedGroup, student.id, 'absent')}
                        className={`p-2 rounded-lg flex items-center gap-2 transition ${
                          status === 'absent' 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                          : 'bg-milk-100 dark:bg-slate-700 text-milk-400 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600'
                        }`}
                      >
                        <X size={18} /> Yo'q
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-milk-400 dark:text-slate-600">
            <Calendar size={48} className="mx-auto mb-4 opacity-30" />
            Tepadagi ro'yxatdan guruhni tanlang
          </div>
        )}
      </div>
    </div>
  );
};