
import React from 'react';
import { LEADERBOARD_DATA } from '../constants';
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Leaf, Zap } from 'lucide-react';

const Leaderboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Campus Leaderboard</h2>
        <p className="text-slate-500 font-medium">Monthly sustainability championship between buildings.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEADERBOARD_DATA.slice(0, 3).map((item, idx) => (
          <div 
            key={item.name} 
            className={`glass-panel p-8 rounded-[3rem] relative overflow-hidden flex flex-col items-center text-center border-white/60 shadow-xl ${
              idx === 0 ? 'scale-105 border-emerald-500/30' : 'scale-95'
            }`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-30 ${
              idx === 0 ? 'bg-amber-400' : idx === 1 ? 'bg-slate-400' : 'bg-orange-400'
            }`}></div>
            
            <div className="relative mb-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                idx === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' : 
                idx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white' : 
                'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
              }`}>
                <Medal size={40} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md font-black text-slate-800">
                {item.rank}
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-1">{item.name}</h3>
            <p className="text-3xl font-black text-emerald-600 tracking-tighter mb-4">{item.score.toLocaleString()} pts</p>
            
            <div className="flex gap-4 w-full">
              <div className="flex-1 bg-white/40 p-3 rounded-2xl flex flex-col items-center">
                 <Leaf size={16} className="text-emerald-500 mb-1" />
                 <span className="text-xs font-black text-slate-700">{item.wasteDiverted}kg</span>
              </div>
              <div className="flex-1 bg-white/40 p-3 rounded-2xl flex flex-col items-center">
                 <Zap size={16} className="text-amber-500 mb-1" />
                 <span className="text-xs font-black text-slate-700">-{item.energySaved}kW</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden border-white/60 shadow-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/30 border-b border-white/20">
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Rank</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Building Name</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Monthly Eco Score</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20">
            {LEADERBOARD_DATA.map((item) => (
              <tr key={item.name} className="hover:bg-white/40 transition-colors">
                <td className="px-8 py-6 font-black text-slate-400">#{item.rank}</td>
                <td className="px-8 py-6 font-bold text-slate-800">{item.name}</td>
                <td className="px-8 py-6">
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-black text-sm">
                    {item.score.toLocaleString()}
                  </span>
                </td>
                <td className="px-8 py-6">
                  {item.trend === 'up' && <TrendingUp className="text-emerald-500" size={20} />}
                  {item.trend === 'down' && <TrendingDown className="text-red-500" size={20} />}
                  {item.trend === 'neutral' && <Minus className="text-slate-300" size={20} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
