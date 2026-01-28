import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Lock, User, ArrowRight, GraduationCap } from 'lucide-react';

export const Login = () => {
  const { login } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError(true);
      setTimeout(() => setError(false), 500); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-milk-100 dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
      
      {/* Orqa fon bezaklari (Dark mode uchun moslashtirildi) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-200/40 dark:bg-brand-900/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[100px]" />

      {/* Login Kartasi */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-slate-700 shadow-2xl w-full max-w-md z-10 relative transition-colors">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30 mx-auto mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-2xl font-bold text-milk-900 dark:text-white">EduCore CRM</h1>
          <p className="text-milk-500 dark:text-slate-400 text-sm">Tizimga kirish</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-milk-400 dark:text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Login" 
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all
                dark:bg-slate-900/50 dark:text-white
                ${error 
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20" 
                  : "border-milk-200 dark:border-slate-600 focus:border-brand-500"
                }
              `}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-milk-400 dark:text-slate-500" size={20} />
            <input 
              type="password" 
              placeholder="Parol" 
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all
                dark:bg-slate-900/50 dark:text-white
                ${error 
                  ? "border-red-500 animate-shake" 
                  : "border-milk-200 dark:border-slate-600 focus:border-brand-500"
                }
              `}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center font-bold">Login yoki parol noto'g'ri!</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
          >
            Kirish <ArrowRight size={18} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};