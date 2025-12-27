
import React, { useState, useEffect } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import WasteModule from './components/WasteModule';
import EnergyModule from './components/EnergyModule';
import Leaderboard from './components/Leaderboard';
import AIChat from './components/AIChat';
import LiquidBackground from './components/LiquidBackground';
import AuthModal from './components/AuthModal';
import { GoogleGenAI } from "@google/genai";
import { Leaf, Menu, X, Bell, Search, User, LogOut, ArrowRight, ShieldCheck, BarChart3, Globe, Sparkles, Loader2 } from 'lucide-react';

const CurtainLoader: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Start opening after a small delay
    const openTimer = setTimeout(() => {
      setIsOpened(true);
    }, 800);

    // Completely remove from DOM after animation finishes
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`curtain-container ${isOpened ? 'curtain-opened' : ''}`}>
      <div className="curtain-panel curtain-left"></div>
      <div className="curtain-panel curtain-right"></div>
      <div className="curtain-content">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white/10 p-6 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl animate-pulse">
            <Leaf size={64} className="text-emerald-400" />
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-2">EcoCampus AI</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Smarter Planet</span>
              <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const goHome = () => {
    setCurrentView('overview');
    setIsMobileMenuOpen(false);
  };

  const handleAuthSuccess = (name: string) => {
    setUser({ name });
    setCurrentView('overview');
  };

  const handleLogout = () => {
    setUser(null);
    setShowUserDropdown(false);
    setCurrentView('overview');
  };

  const renderView = () => {
    if (!user) return <LandingPage onStart={() => { setAuthMode('register'); setIsAuthModalOpen(true); }} onLogin={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} />;

    switch (currentView) {
      case 'overview': return <Dashboard />;
      case 'waste': return <WasteModule />;
      case 'energy': return <EnergyModule />;
      case 'leaderboard': return <Leaderboard />;
      case 'chat': return <AIChat />;
      default: return <Dashboard />;
    }
  };

  const getActiveColor = () => {
    if (!user) return 'emerald';
    switch (currentView) {
      case 'waste': return 'emerald';
      case 'energy': return 'amber';
      case 'chat': return 'blue';
      case 'leaderboard': return 'emerald';
      default: return 'emerald';
    }
  };

  return (
    <div className="min-h-screen flex relative selection:bg-emerald-200 selection:text-emerald-900 transition-colors duration-700">
      <CurtainLoader />
      
      <LiquidBackground activeColor={getActiveColor()} />

      {user && (
        <Sidebar 
          currentView={currentView} 
          onViewChange={(v) => {
            setCurrentView(v);
            setIsMobileMenuOpen(false);
          }}
          themeColor={getActiveColor()}
          onBrandClick={goHome}
          isBrandClicked={false}
        />
      )}

      <main className={`flex-1 flex flex-col relative z-10 transition-all duration-500 ${user ? 'md:ml-64' : 'ml-0'}`}>
        <nav className="sticky top-0 z-30 glass-panel px-4 md:px-8 py-4 flex items-center justify-between shadow-sm border-b border-white/40">
          <div className="flex items-center gap-4">
            {user && (
              <button 
                className="md:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            )}
            <div 
              onClick={goHome}
              className={`flex items-center gap-2 cursor-pointer transition-all duration-300 font-bold text-emerald-600 hover:scale-105 active:scale-95 group ${!user && 'md:flex'}`}
            >
               <Leaf size={24} className="animate-pulse group-hover:rotate-12 transition-transform" />
               <span className="text-xl">EcoCampus</span>
            </div>
            {user && (
              <div className="relative hidden lg:block ml-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search campus data..." 
                  className="bg-white/50 border border-white/20 text-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all w-64"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button className="p-2 text-slate-500 hover:bg-white/50 rounded-full relative transition-all active:scale-95">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
                <div className="relative">
                  <div 
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-3 bg-white/40 backdrop-blur-sm pl-3 pr-1 py-1 rounded-full cursor-pointer hover:bg-white/60 transition-all border border-white/40"
                  >
                    <span className="text-sm font-semibold text-slate-700 hidden sm:block">{user.name}</span>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                      <User size={18} />
                    </div>
                  </div>
                  
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl shadow-xl border border-white/40 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                  className="text-sm font-semibold text-slate-600 hover:text-emerald-600 px-4 py-2 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }}
                  className="bg-emerald-600 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className={`flex-1 overflow-x-hidden ${user ? 'p-4 md:p-8' : 'p-0'}`}>
          <div key={currentView + (user ? 'auth' : 'unauth')} className="reveal-stagger h-full">
            {renderView()}
          </div>
        </div>

        {user && isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden animate-in fade-in zoom-in-95 duration-300">
             <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-10">
                   <div onClick={goHome} className="flex items-center gap-3 font-bold text-xl text-emerald-600 cursor-pointer">
                      <Leaf size={28} />
                      <span>EcoCampus</span>
                   </div>
                   <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-xl">
                      <X />
                   </button>
                </div>
                <div className="space-y-4 flex-1">
                   {['overview', 'waste', 'energy', 'leaderboard', 'chat'].map((id) => (
                     <button
                       key={id}
                       onClick={() => {
                         setCurrentView(id as View);
                         setIsMobileMenuOpen(false);
                       }}
                       className={`w-full text-left p-4 rounded-2xl text-lg font-semibold flex items-center gap-4 transition-all ${
                         currentView === id 
                           ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 translate-x-2' 
                           : 'text-slate-600 hover:bg-slate-50'
                       }`}
                     >
                        <span className="capitalize">{id}</span>
                     </button>
                   ))}
                </div>
                <div className="mt-auto border-t border-slate-100 pt-6">
                   <p className="text-center text-slate-400 text-sm">EcoCampus v1.0 • Built for the Planet</p>
                </div>
             </div>
          </div>
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-kenburns {
          animation: kenburns 20s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const LandingPage: React.FC<{ onStart: () => void, onLogin: () => void }> = ({ onStart, onLogin }) => {
  const [aiImages, setAiImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateHeroImages = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompts = [
        "A wide angle, cinematic shot of a futuristic smart university campus with vertical gardens and solar panels, sunny day, lush greens, 4k resolution.",
        "A modern university library where students interact with holographic sustainability data panels showing campus energy trends, soft bokeh lighting, high quality.",
        "A high-tech smart waste station integrated into a beautiful university park walkway, clean design, morning sunlight, professional architectural photography."
      ];

      try {
        const imagePromises = prompts.map(prompt => 
          ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] }
          })
        );

        const results = await Promise.all(imagePromises);
        const base64Images = results.map(res => {
          const part = res.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
          return part ? `data:image/png;base64,${part.inlineData.data}` : '';
        }).filter(img => img !== '');

        if (base64Images.length > 0) {
          setAiImages(base64Images);
        }
      } catch (err) {
        console.error("Failed to generate hero images:", err);
      } finally {
        setIsGenerating(false);
      }
    };

    generateHeroImages();
  }, []);

  useEffect(() => {
    if (aiImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % aiImages.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [aiImages]);

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden flex items-center justify-center py-20">
      <div className="absolute inset-0 z-0">
        {isGenerating ? (
          <div className="h-full w-full bg-slate-50 flex flex-col items-center justify-center gap-4">
             <div className="relative">
                <Loader2 className="animate-spin text-emerald-600" size={48} />
                <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-pulse" size={20} />
             </div>
             <p className="text-slate-500 font-bold animate-pulse text-sm tracking-widest uppercase">Generating AI Campus Visuals...</p>
          </div>
        ) : (
          aiImages.length > 0 ? (
            aiImages.map((src, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={src} className={`h-full w-full object-cover ${idx === currentSlide ? 'animate-kenburns' : ''}`} alt={`Slide ${idx}`} />
                <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]"></div>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50"></div>
          )
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md text-emerald-700 font-bold text-xs uppercase tracking-[0.2em] mb-8 shadow-xl shadow-black/5 animate-bounce border border-white">
          <Globe size={14} className="animate-spin-slow" />
          Sustainable Campus AI
        </div>
        
        <div className="glass-panel p-8 md:p-12 rounded-[3rem] border border-white/50 shadow-2xl">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
            Smart Campus <br />
            <span className="text-emerald-600 drop-shadow-sm">Sustainability</span> Assistant
          </h1>
          
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Harnessing the power of AI to transform institutional waste, energy, and engagement into a unified, eco-friendly experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="group bg-emerald-600 text-white px-10 py-5 rounded-[2rem] text-lg font-bold shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              Get Started Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onLogin}
              className="px-10 py-5 rounded-[2rem] text-lg font-bold text-slate-800 bg-white/50 hover:bg-white hover:shadow-xl transition-all"
            >
              Sign In to Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16">
          <FeatureCard 
            icon={<BarChart3 className="text-blue-500" />}
            title="Energy Analysis"
            desc="AI-driven anomaly detection for campus energy networks."
          />
          <FeatureCard 
            icon={<Leaf className="text-emerald-500" />}
            title="Smart Waste"
            desc="Predictive modeling for waste collection and recycling."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-purple-500" />}
            title="Eco Rewards"
            desc="Gamified student participation for campus-wide impact."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="glass-panel p-8 rounded-[2.5rem] text-left hover:scale-[1.02] transition-all duration-500 animate-float border-white/40 shadow-xl">
    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm font-medium">{desc}</p>
  </div>
);

export default App;
