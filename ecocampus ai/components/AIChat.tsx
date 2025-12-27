
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm your EcoCampus Assistant. How can I help you improve campus sustainability today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getGeminiResponse(input);
    
    const aiMsg: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const suggestedPrompts = [
    "Energy peaks info",
    "Reduce food waste",
    "Campus composting tips",
    "Water usage audit"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] glass-panel rounded-[2.5rem] shadow-xl overflow-hidden border-white/60">
      <div className="p-5 border-b border-white/20 bg-white/30 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-600/30">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Sustainability AI</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
              <span className="text-[10px] text-emerald-700 uppercase tracking-widest font-black">Live Analysis</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center shadow-md ${
                msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-white text-emerald-600'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-white/80 backdrop-blur-md text-slate-700 border border-white rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm">
                <Bot size={18} />
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-3xl rounded-tl-none border border-white flex gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-3 flex flex-wrap gap-2 bg-white/20">
        {suggestedPrompts.map((p) => (
          <button
            key={p}
            onClick={() => setInput(p)}
            className="text-xs font-semibold bg-white/60 hover:bg-emerald-600 hover:text-white text-emerald-800 px-4 py-2 rounded-full border border-white shadow-sm transition-all active:scale-95"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="p-6 bg-white/40 backdrop-blur-xl border-t border-white/40">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="How can we optimize building 4?"
            className="w-full bg-white text-slate-800 border-none rounded-[1.5rem] pl-5 pr-14 py-4 shadow-xl focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 hover:scale-105 transition-all shadow-lg shadow-emerald-600/30 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
