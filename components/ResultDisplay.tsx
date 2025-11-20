import React from 'react';
import { Restaurant } from '../types';
import PixelCard from './PixelCard';

interface ResultDisplayProps {
  restaurant: Restaurant | null;
  loading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ restaurant, loading }) => {
  if (loading) {
    return (
      <PixelCard className="w-full max-w-md h-96 flex items-center justify-center text-center">
         <div className="space-y-4">
            <div className="text-4xl animate-bounce">👾</div>
            <p className="text-green-400 font-pixel text-sm">SEARCHING DATABASE...</p>
            <div className="w-48 h-4 bg-slate-700 mx-auto rounded-none overflow-hidden relative border border-green-900">
                <div className="absolute top-0 left-0 h-full bg-green-500 w-full animate-[shimmer_1s_infinite_linear]"></div>
            </div>
         </div>
      </PixelCard>
    );
  }

  if (!restaurant) {
    return (
      <PixelCard className="w-full max-w-md h-96 flex items-center justify-center text-center">
         <div className="space-y-4 opacity-50">
            <div className="text-6xl grayscale">📺</div>
            <p className="text-white font-pixel text-sm leading-loose">
               WAITING FOR INPUT<br/>
               <span className="text-xs text-slate-400">PRESS START TO ROLL</span>
            </p>
         </div>
      </PixelCard>
    );
  }

  return (
    <PixelCard className="w-full max-w-md" title={restaurant.name}>
      <div className="space-y-4 text-left relative">
        
        <div className="flex justify-between items-start border-b-2 border-dashed border-slate-600 pb-2">
             <div>
                <span className="text-xs text-slate-400 block mb-1">DISTRICT</span>
                <span className="text-cyan-300 text-lg">{restaurant.district}</span>
             </div>
             <div className="text-right">
                <span className="text-xs text-slate-400 block mb-1">RATING</span>
                <div className="flex text-yellow-400 text-sm">
                  {"★".repeat(Math.floor(restaurant.rating))}
                  <span className="opacity-30">{"★".repeat(5 - Math.floor(restaurant.rating))}</span>
                </div>
             </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800 p-2 border border-slate-600">
                <span className="text-[10px] text-pink-400 block">TYPE</span>
                <span className="text-white text-sm">{restaurant.cuisineType}</span>
            </div>
            <div className="bg-slate-800 p-2 border border-slate-600">
                 <span className="text-[10px] text-green-400 block">COST</span>
                 <span className="text-green-300 text-sm tracking-widest">{restaurant.priceRange}</span>
            </div>
        </div>

        <div className="bg-slate-950 p-3 border-l-4 border-yellow-500 font-mono text-sm text-slate-300 leading-relaxed">
           "{restaurant.description}"
        </div>

        <div className="pt-2">
            <span className="text-xs text-red-400 uppercase font-bold">Must Try:</span>
            <p className="text-white font-bold">{restaurant.highlightDish}</p>
        </div>

        <div className="pt-4 mt-2 border-t-2 border-slate-700 flex flex-col gap-2">
            <p className="text-xs text-slate-500 truncate">{restaurant.address}</p>
            <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + " " + restaurant.address)}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all font-pixel"
            >
                OPEN MAP 🗺️
            </a>
        </div>

      </div>
    </PixelCard>
  );
};

export default ResultDisplay;