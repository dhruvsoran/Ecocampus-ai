
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ENERGY_DATA, COLORS } from '../constants';
import { Zap, Droplets, Info } from 'lucide-react';

const EnergyModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Resource Monitoring</h2>
        <p className="text-slate-500">Electricity and Water consumption across blocks.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Zap className="text-amber-500" />
              <h3 className="font-semibold text-slate-800">Electricity (kW/h)</h3>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENERGY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Line type="monotone" dataKey="electricity" stroke={COLORS.electricity} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Droplets className="text-sky-500" />
              <h3 className="font-semibold text-slate-800">Water Consumption (L)</h3>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENERGY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Line type="monotone" dataKey="water" stroke={COLORS.water} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-3 text-amber-700 font-bold">
             <Zap size={18} />
             <span>Peak Usage Insight</span>
           </div>
           <p className="text-sm text-amber-800">Electricity peaks occur every Wednesday between 2 PM - 4 PM. AI suggests scheduling heavy maintenance tasks during weekends.</p>
        </div>
        <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-3 text-sky-700 font-bold">
             <Droplets size={18} />
             <span>Leak Detected?</span>
           </div>
           <p className="text-sm text-sky-800">Unusually high overnight water consumption in Hostel B. A 15% deviation from baseline suggests potential tap leakage.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold">
             <Info size={18} />
             <span>Optimization Tip</span>
           </div>
           <p className="text-sm text-blue-800">Switching the Academic Block common areas to sensor-based lighting could save an estimated 200 kW/h per month.</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyModule;
