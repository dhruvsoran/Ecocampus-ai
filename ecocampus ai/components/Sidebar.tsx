
import React from 'react';
import { View } from '../types';
import { NAVIGATION_ITEMS } from '../constants';
import { Leaf } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  themeColor: string;
  onBrandClick: () => void;
  isBrandClicked: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onBrandClick }) => {
  return (
    <aside className="w-64 h-screen glass-panel fixed left-0 top-0 hidden md:flex flex-col border-r border-white/40 shadow-xl overflow-hidden">
      {/* Brand Section */}
      <div 
        className="p-8 flex items-center gap-3 mb-4 cursor-pointer group transition-all duration-300 hover:bg-white/20 active:scale-95"
        onClick={onBrandClick}
      >
        <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-emerald-600/30">
          <Leaf size={24} />
        </div>
        <h1 className="font-extrabold text-2xl tracking-tighter text-emerald-600 group-hover:translate-x-1 transition-all">
          EcoCampus
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
              currentView === item.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 font-bold scale-[1.02]'
                : 'text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm'
            }`}
          >
            <span className={`${currentView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'} transition-colors`}>
              {item.icon}
            </span>
            <span className="text-sm">{item.name}</span>
            {currentView === item.id && (
              <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mb-6">
        <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-5 border border-white/50 shadow-inner">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">My Performance</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700">Eco Score</span>
            <span className="text-sm font-black text-emerald-600">842</span>
          </div>
          <div className="w-full bg-slate-200/50 h-2 rounded-full overflow-hidden">
            <div className="h-2 rounded-full w-[70%] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000"></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center font-medium">Top 5% on Campus</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
