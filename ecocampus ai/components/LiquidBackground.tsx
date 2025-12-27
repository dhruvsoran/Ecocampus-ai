
import React from 'react';

interface LiquidBackgroundProps {
  activeColor: 'emerald' | 'blue' | 'amber';
}

const LiquidBackground: React.FC<LiquidBackgroundProps> = ({ activeColor }) => {
  const getColors = () => {
    switch (activeColor) {
      case 'amber':
        return {
          primary: 'bg-amber-200/40',
          secondary: 'bg-orange-200/30',
          tertiary: 'bg-yellow-200/30'
        };
      case 'blue':
        return {
          primary: 'bg-blue-200/40',
          secondary: 'bg-sky-200/30',
          tertiary: 'bg-indigo-200/30'
        };
      default:
        return {
          primary: 'bg-emerald-200/40',
          secondary: 'bg-blue-200/30',
          tertiary: 'bg-amber-200/30'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none gooey transition-all duration-1000">
      {/* Primary Blob */}
      <div className={`absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full animate-blob ${colors.primary} transition-colors duration-1000`}></div>
      
      {/* Secondary Blob */}
      <div className={`absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full animate-blob animation-delay-2000 ${colors.secondary} transition-colors duration-1000`}></div>
      
      {/* Tertiary Blob */}
      <div className={`absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full animate-blob animation-delay-4000 ${colors.tertiary} transition-colors duration-1000`}></div>
      
      {/* Accent Blob */}
      <div className="absolute top-[60%] left-[60%] w-[300px] h-[300px] bg-white/20 rounded-full animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default LiquidBackground;
