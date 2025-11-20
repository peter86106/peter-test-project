import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const PixelCard: React.FC<PixelCardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`relative bg-slate-800 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] p-1 ${className}`}>
       {/* Corner decos */}
       <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-800"></div>
       <div className="absolute -top-1 -right-1 w-2 h-2 bg-slate-800"></div>
       <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-slate-800"></div>
       <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-slate-800"></div>

       <div className="bg-slate-900 h-full w-full p-4 border-2 border-slate-700">
          {title && (
             <div className="mb-4 border-b-4 border-slate-700 pb-2">
                <h2 className="text-xl text-yellow-400 font-bold tracking-wider uppercase font-pixel text-shadow-retro">
                   {title}
                </h2>
             </div>
          )}
          {children}
       </div>
    </div>
  );
};

export default PixelCard;