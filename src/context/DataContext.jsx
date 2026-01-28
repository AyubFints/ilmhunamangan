import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

const VALID_USERS = [
  { username: "IlmHubNamangan", password: "IlmHub123", centerName: "IlmHub Namangan" },
  { username: "EduPro", password: "EduPro2024", centerName: "Edu Pro Center" },
  { username: "Admin", password: "123", centerName: "My Learning Center" }
];

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('educore_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // --- MA'LUMOTNI YUKLASH ---
  const loadData = (key) => {
    if (!currentUser) return [];
    const saved = localStorage.getItem(`${currentUser.username}_${key}`);
    return saved ? JSON.parse(saved) : [];
  };

  const [students, setStudents] = useState(() => loadData('students'));
  const [groups, setGroups] = useState(() => loadData('groups'));
  const [payments, setPayments] = useState(() => loadData('payments'));
  const [expenses, setExpenses] = useState(() => loadData('expenses'));
  const [attendance, setAttendance] = useState(() => loadData('attendance'));
  
  const [storeName, setStoreName] = useState(() => {
    if (!currentUser) return 'EduCore';
    return localStorage.getItem(`${currentUser.username}_storeName`) || currentUser.centerName;
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('educore_theme') || 'light');
  const [notifications, setNotifications] = useState([]);

  // --- BAZAGA SAQLASH ---
  const saveToDB = (key, data) => {
    if (currentUser) {
      localStorage.setItem(`${currentUser.username}_${key}`, JSON.stringify(data));
    }
  };

  // --- ASOSIY FUNKSIYALAR ---
  const getTodayISO = () => new Date().toISOString().split('T')[0]; // "2026-01-27"

  const addStudent = (s) => {
    const newList = [...students, { ...s, id: Date.now(), nextPaymentDate: null, score: 0 }];
    setStudents(newList); saveToDB('students', newList);
    if(s.group) {
        const newGroups = groups.map(g => g.name === s.group ? { ...g, studentsCount: (g.studentsCount || 0) + 1 } : g);
        setGroups(newGroups); saveToDB('groups', newGroups);
    }
  };
  
  const deleteStudent = (id) => {
    const s = students.find(s => s.id === id);
    const newList = students.filter(x => x.id !== id);
    setStudents(newList); saveToDB('students', newList);
    if(s && s.group) {
        const newGroups = groups.map(g => g.name === s.group ? { ...g, studentsCount: Math.max(0, (g.studentsCount || 0) - 1) } : g);
        setGroups(newGroups); saveToDB('groups', newGroups);
    }
  };

  const changeStudentGroup = (studentId, newGroupName) => {
    const student = students.find(s => s.id === studentId);
    if (!student || student.group === newGroupName) return;
    const oldGroupName = student.group;
    const newStudents = students.map(s => s.id === studentId ? { ...s, group: newGroupName } : s);
    setStudents(newStudents); saveToDB('students', newStudents);
    const newGroups = groups.map(g => {
        if (g.name === oldGroupName) return { ...g, studentsCount: Math.max(0, (g.studentsCount || 0) - 1) };
        if (g.name === newGroupName) return { ...g, studentsCount: (g.studentsCount || 0) + 1 };
        return g;
    });
    setGroups(newGroups); saveToDB('groups', newGroups);
  };

  const addGroup = (g) => { const n = [...groups, { ...g, id: Date.now(), studentsCount: 0 }]; setGroups(n); saveToDB('groups', n); };
  const deleteGroup = (id) => { const n = groups.filter(g => g.id !== id); setGroups(n); saveToDB('groups', n); };
  
  // TO'LOV QO'SHISH
  const addPayment = (p) => {
    const newPayments = [...payments, { 
        ...p, 
        id: Date.now(), 
        date: getTodayISO() // 2026-01-27
    }];
    setPayments(newPayments); saveToDB('payments', newPayments);

    const s = students.find(x => x.name === p.student);
    const g = groups.find(x => x.name === s?.group);
    
    if (s && g) {
      const daily = parseInt(g.price)/30; 
      const days = Math.floor(parseInt(p.amount)/daily);
      let currentDueDate = s.nextPaymentDate ? new Date(s.nextPaymentDate) : new Date();
      if (currentDueDate < new Date()) currentDueDate = new Date();
      
      currentDueDate.setDate(currentDueDate.getDate() + days);
      
      const newStudents = students.map(x => x.id === s.id ? { 
          ...x, 
          status: 'active', 
          nextPaymentDate: currentDueDate.toISOString().split('T')[0], 
          score: (x.score || 0) + 50 
      } : x);
      
      setStudents(newStudents); saveToDB('students', newStudents);
      alert(`${days} kun qo'shildi!`);
    }
  };
  
  // XARAJAT QO'SHISH
  const addExpense = (e) => { 
      const n = [...expenses, { ...e, id: Date.now(), date: getTodayISO() }]; 
      setExpenses(n); saveToDB('expenses', n); 
  };
  
  const deleteExpense = (id) => { const n = expenses.filter(e => e.id !== id); setExpenses(n); saveToDB('expenses', n); };
  
  const markAttendance = (d, g, sId, st) => { 
      const n = [...attendance.filter(a => !(a.date === d && a.studentId === sId)), { date: d, groupId: g, studentId: sId, status: st }]; 
      setAttendance(n); saveToDB('attendance', n); 
  };
  
  const giveBonus = (id, p) => { const n = students.map(s => s.id === id ? { ...s, score: (s.score || 0) + p } : s); setStudents(n); saveToDB('students', n); };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme); localStorage.setItem('educore_theme', newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
  };
  useEffect(() => { if (theme === 'dark') document.documentElement.classList.add('dark'); }, []);
  useEffect(() => { if (currentUser) localStorage.setItem(`${currentUser.username}_storeName`, storeName); }, [storeName]);
  useEffect(() => { const t = getTodayISO(); setNotifications(students.filter(s => s.nextPaymentDate && s.nextPaymentDate <= t)); }, [students]);

  const login = (u, p) => {
    const found = VALID_USERS.find(user => user.username === u && user.password === p);
    if (found) { localStorage.setItem('educore_current_user', JSON.stringify(found)); window.location.href = "/"; return true; }
    return false;
  };
  const logout = () => { localStorage.removeItem('educore_current_user'); window.location.href = "/"; };
  const resetSystem = () => { if(window.confirm("Barcha ma'lumotlar o'chadi!")) { const u = currentUser.username; localStorage.removeItem(`${u}_students`); localStorage.removeItem(`${u}_groups`); localStorage.removeItem(`${u}_payments`); localStorage.removeItem(`${u}_attendance`); localStorage.removeItem(`${u}_expenses`); localStorage.removeItem(`${u}_storeName`); window.location.reload(); } };

  // ================================================
  // 🔥 MOLIYA MANTIQI (TUZATILDI)
  // ================================================
  
  const today = new Date();
  const currentMonthStr = today.toISOString().slice(0, 7); // "2026-01"

  // 1. JORIY OY (Dashboard tepasi uchun)
  const thisMonthPayments = payments.filter(p => p.date && p.date.startsWith(currentMonthStr));
  const thisMonthExpenses = expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));

  const monthRev = thisMonthPayments.reduce((a,c)=>a+parseInt(c.amount||0),0);
  const monthExp = thisMonthExpenses.reduce((a,c)=>a+parseInt(c.amount||0),0);

  // 2. JAMI TARIX
  const allTimeRev = payments.reduce((a,c)=>a+parseInt(c.amount||0),0);
  const allTimeExp = expenses.reduce((a,c)=>a+parseInt(c.amount||0),0);

  // 3. 🔥 TARIX JADVALI (FAQAT O'TGAN OYLAR)
  const getHistory = () => {
    const history = {};
    
    // To'lovlarni yig'amiz
    payments.forEach(p => {
        if (!p.date) return;
        const [year, month] = p.date.split('-'); 
        const key = `${year}-${month}`; // "2026-01"

        // 🔥 MUHIM: Agar bu oy "Hozirgi oy" bo'lsa, uni tarixga qo'shmaymiz!
        if (key === currentMonthStr) return;

        if (!history[key]) history[key] = { rev: 0, exp: 0 };
        history[key].rev += parseInt(p.amount || 0);
    });

    // Xarajatlarni yig'amiz
    expenses.forEach(e => {
        if (!e.date) return;
        const [year, month] = e.date.split('-');
        const key = `${year}-${month}`;

        // 🔥 Xuddi shu narsa: Hozirgi oyni o'tkazib yuboramiz
        if (key === currentMonthStr) return;

        if (!history[key]) history[key] = { rev: 0, exp: 0 };
        history[key].exp += parseInt(e.amount || 0);
    });

    // Jadvalga aylantiramiz
    return Object.entries(history).map(([key, val]) => {
        const [year, month] = key.split('-');
        const monthIndex = parseInt(month) - 1;
        const monthName = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'][monthIndex];
        
        return {
            date: `${year}-yil, ${monthName}`,
            revenue: val.rev,
            expense: val.exp,
            profit: val.rev - val.exp,
            sortKey: key
        };
    }).sort((a,b) => b.sortKey.localeCompare(a.sortKey)); // Eng yangisi tepada
  };

  return (
    <DataContext.Provider value={{ 
      students, addStudent, deleteStudent, changeStudentGroup,
      groups, addGroup, deleteGroup,
      payments, addPayment, expenses, addExpense, deleteExpense,
      attendance, markAttendance, notifications,
      giveBonus, 
      storeName, setStoreName, resetSystem, currentUser, login, logout, theme, toggleTheme,
      getHistory, 
      stats: { 
        totalStudents: students.length, 
        
        // JORIY OY (Faqat tepada ko'rinadi)
        monthRevenue: monthRev.toLocaleString()+" UZS", 
        monthExpenses: monthExp.toLocaleString()+" UZS", 
        monthProfit: (monthRev - monthExp).toLocaleString()+" UZS",

        // JAMI
        allTimeRevenue: allTimeRev.toLocaleString()+" UZS",
        allTimeProfit: (allTimeRev - allTimeExp).toLocaleString()+" UZS",

        debtors: notifications.length 
      }
    }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);