
import React, { useState, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { WASTE_DATA, COLORS } from '../constants';
// Added TrendingUp to the lucide-react imports to fix the "Cannot find name 'TrendingUp'" error on line 148
import { Trash2, Recycle, Leaf, Camera, Upload, Loader2, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { analyzeWasteImage } from '../services/geminiService';

const WasteModule: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [visionResult, setVisionResult] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const latestData = WASTE_DATA[WASTE_DATA.length - 1];
  const pieData = [
    { name: 'Dry Waste', value: latestData.dry, color: COLORS.dry },
    { name: 'Wet Waste', value: latestData.wet, color: COLORS.wet },
    { name: 'Recyclable', value: latestData.recyclable, color: COLORS.recyclable },
  ];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setPreviewUrl(base64);
      setIsAnalyzing(true);
      const result = await analyzeWasteImage(base64);
      setVisionResult(result);
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Waste Intelligence</h2>
          <p className="text-slate-500 font-medium">Real-time segregation tracking and AI analysis.</p>
        </div>
      </header>

      {/* AI Vision Section */}
      <div className="glass-panel p-8 rounded-[3rem] border-white/60 shadow-xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
           <Sparkles size={120} className="text-emerald-500" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/3 aspect-square bg-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center border-4 border-dashed border-slate-200 relative overflow-hidden group/box">
            {previewUrl ? (
              <img src={previewUrl} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6">
                <Camera size={48} className="mx-auto text-slate-300 mb-4 group-hover/box:scale-110 transition-transform" />
                <p className="text-slate-400 font-bold text-sm">Snap a photo of your waste</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all flex items-center justify-center"
            >
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all font-bold text-xs text-slate-800 flex items-center gap-2">
                <Upload size={14} /> Upload Image
              </div>
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="text-emerald-500" size={24} />
              AI Segregator
            </h3>
            <p className="text-slate-600 font-medium max-w-md">
              Not sure where it goes? Our AI vision model identifies trash items and ensures they end up in the right bin to maximize campus recycling.
            </p>
            
            <div className="min-h-[100px] flex items-center justify-center p-6 bg-white/50 rounded-3xl border border-white/60">
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="animate-spin text-emerald-600" size={32} />
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Analyzing Material...</p>
                </div>
              ) : visionResult ? (
                <div className="w-full animate-in zoom-in-95">
                  <div className="flex items-center gap-2 text-emerald-600 mb-2">
                    <CheckCircle2 size={18} />
                    <span className="font-black text-sm uppercase tracking-wider">Analysis Complete</span>
                  </div>
                  <p className="text-slate-800 font-bold leading-relaxed">{visionResult}</p>
                </div>
              ) : (
                <p className="text-slate-400 text-sm font-medium italic">Upload an image to start analysis</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-panel p-8 rounded-[2.5rem] shadow-sm border-white/60">
          <h3 className="font-black text-slate-800 mb-6 uppercase tracking-tighter">Current Composition</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between border-white/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl"><Recycle size={24} /></div>
              <h4 className="font-black text-slate-800 uppercase tracking-tighter">Recycling Rate</h4>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">32.4%</p>
              <p className="text-emerald-600 text-sm font-bold mt-2 flex items-center gap-1">
                <TrendingUp size={14} /> +2.1% this month
              </p>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between border-white/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl"><Leaf size={24} /></div>
              <h4 className="font-black text-slate-800 uppercase tracking-tighter">Organic Waste</h4>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">420kg</p>
              <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-widest">Diverted to Composting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteModule;
