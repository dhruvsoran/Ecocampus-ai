
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Leaf, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { WASTE_DATA, ENERGY_DATA, CAMPUS_STATS, COLORS } from '../constants';
import { getProactiveInsight } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      const res = await getProactiveInsight();
      setInsight(res);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, []);

  return (
    <div className="space-y-6">
      <header className="mb-2 reveal-stagger">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Campus Intelligence</h2>
        <p className="text-slate-500 font-medium">Aggregated real-time metrics and AI forecasts.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAMPUS_STATS.map((stat, idx) => (
          <div 
            key={idx} 
            className={`glass-panel p-6 rounded-[2rem] shadow-sm flex items-center justify-between hover:scale-[1.05] transition-all duration-500 animate-float border-white/60`}
            style={{ animationDelay: `${idx * 0.5}s` }}
          >
            <div>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 mt-1 tracking-tighter">{stat.value}</p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl shadow-lg border border-white/50">
              {/* Fix: Added explicit typing to stat.icon to allow 'size' prop injection via cloneElement */}
              {React.cloneElement(stat.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-stagger">
        {/* Main Trends Chart */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-[3rem] shadow-sm animate-float animation-delay-2000 border-white/60">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-tighter">Resource Efficiency Trends</h3>
            <select className="text-xs font-bold bg-white border border-slate-100 rounded-full px-4 py-2 focus:outline-none shadow-sm">
              <option>Building Analysis</option>
              <option>Campus Total</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WASTE_DATA}>
                <defs>
                  <linearGradient id="colorDry" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.dry} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.dry} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.3} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="dry" stroke={COLORS.dry} strokeWidth={4} fillOpacity={1} fill="url(#colorDry)" />
                <Area type="monotone" dataKey="wet" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorWet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar on Dashboard */}
        <div className="glass-panel p-8 rounded-[3rem] border border-emerald-500/20 shadow-xl shadow-emerald-500/5 bg-gradient-to-br from-white/40 to-emerald-50/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <Sparkles size={120} />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-600/30">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 uppercase tracking-tighter">Campus Pulse</h3>
                <span className="text-[10px] font-black text-emerald-600 tracking-widest uppercase">Deep AI Reasoning</span>
              </div>
            </div>

            <div className="flex-1">
              {loadingInsight ? (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                  <Loader2 className="animate-spin text-emerald-600" size={32} />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Synthesizing Data...</p>
                </div>
              ) : (
                <div className="animate-in fade-in duration-700">
                  <p className="text-slate-700 text-sm leading-relaxed font-medium mb-6">
                    {insight}
                  </p>
                  <div className="bg-white/60 p-5 rounded-3xl border border-white/80 shadow-sm">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Priority Task</p>
                    <p className="text-xs font-bold text-slate-800">Review building B sensor battery levels before the weekend peak.</p>
                  </div>
                </div>
              )}
            </div>

            <button className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group/btn">
              Full AI Report <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl transition-all duration-1000 group border border-white/20"
        style={{ backgroundColor: `#0f172a` }}
      >
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 bg-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
             Limited Time
          </div>
          <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Campus Eco-Hackathon</h3>
          <p className="text-white/70 max-w-lg text-lg font-medium leading-relaxed">
            Collaborate with peers to develop the next generation of smart sensors. Winners receive full project funding and mentorship.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <button className="bg-emerald-500 text-white font-black px-10 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20">Join the Lab</button>
            <button className="bg-white/10 backdrop-blur-md text-white font-black px-10 py-4 rounded-2xl hover:bg-white/20 transition-all border border-white/20">View Schedule</button>
          </div>
        </div>
        <div className="relative hidden md:block">
            <Leaf size={320} className="opacity-10 rotate-12 group-hover:rotate-0 transition-all duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center">
               <Sparkles size={100} className="text-emerald-500 animate-pulse" />
            </div>
        </div>
        {/* Animated decor */}
        <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-emerald-600/20 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default Dashboard;
