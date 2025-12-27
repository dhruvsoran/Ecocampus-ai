
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Leaf, Info } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (username: string) => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(formData.name || formData.email.split('@')[0] || "EcoWarrior");
      onClose();
    }, 1200);
  };

  const fillDemo = () => {
    setFormData({
      email: 'student@campus.edu',
      password: 'password123',
      name: 'Alex Green'
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-panel w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-white/40">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-600/30">
              <Leaf size={24} />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Join EcoCampus'}
          </h2>
          <p className="text-slate-500 mb-6 text-sm font-medium">
            {mode === 'login' ? 'Log in to track your institutional impact.' : 'Create an account to join the sustainability movement.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white text-slate-900 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-slate-400"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                placeholder="University Email"
                required
                className="w-full bg-white text-slate-900 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-slate-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-white text-slate-900 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-slate-400"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
             <Info size={16} className="text-emerald-600 mt-0.5 shrink-0" />
             <div>
                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest mb-1">Demo Access</p>
                <button 
                  onClick={fillDemo}
                  className="text-xs text-emerald-600 hover:underline font-medium text-left"
                >
                  Click here to pre-fill test credentials.
                </button>
             </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors"
            >
              {mode === 'login' ? "New here? Create an account" : "Already registered? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
