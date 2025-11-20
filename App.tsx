import React, { useState, useCallback } from 'react';
import { District, DISTRICTS, Restaurant, PriceLevel, PRICE_OPTIONS } from './types';
import { fetchRandomRestaurant } from './services/geminiService';
import RetroButton from './components/RetroButton';
import ResultDisplay from './components/ResultDisplay';
import Scanlines from './components/Scanlines';

// 8-bit background pattern using CSS within the component style
const bgPattern = {
  backgroundImage: `
    radial-gradient(#333 15%, transparent 16%),
    radial-gradient(#333 15%, transparent 16%)
  `,
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 10px 10px',
  backgroundColor: '#111'
};

const App: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District>(District.ALL);
  const [selectedPrice, setSelectedPrice] = useState<PriceLevel>(PriceLevel.ALL);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoll = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    setRestaurant(null); // Clear previous result immediately for UX

    try {
      const result = await fetchRandomRestaurant(selectedDistrict, selectedPrice);
      setRestaurant(result);
    } catch (e) {
      console.error(e);
      setError("CONNECTION ERROR. INSERT COIN.");
    } finally {
      setLoading(false);
    }
  }, [selectedDistrict, selectedPrice, loading]);

  return (
    <div style={bgPattern} className="min-h-screen text-white font-sans selection:bg-green-500 selection:text-black relative flex flex-col items-center overflow-hidden">
      
      {/* CRT Overlay */}
      <Scanlines />

      <main className="relative z-30 w-full max-w-2xl px-4 py-8 flex flex-col items-center gap-8 min-h-screen justify-center">
        
        {/* Header */}
        <header className="text-center space-y-2">
           <h1 className="text-4xl md:text-5xl font-pixel text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-blue-600 drop-shadow-[4px_4px_0_rgba(255,255,255,0.2)]">
              KH FOOD
           </h1>
           <p className="text-pink-500 font-bold tracking-widest text-sm md:text-base uppercase bg-black px-2 inline-block border border-pink-500 shadow-[2px_2px_0_#f472b6]">
              Kaohsiung Randomizer
           </p>
        </header>

        {/* Controls */}
        <div className="w-full max-w-md bg-slate-800 p-4 border-4 border-slate-600 shadow-xl">
           <div className="flex flex-col gap-4">
              {/* District Selector */}
              <div className="flex flex-col gap-2">
                 <label className="text-xs text-green-400 font-pixel uppercase mb-1">Select Zone:</label>
                 <select 
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value as District)}
                    className="w-full bg-black text-green-400 border-2 border-green-700 p-3 font-mono focus:outline-none focus:border-green-400 uppercase cursor-pointer hover:bg-slate-900"
                 >
                    {DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                 </select>
              </div>

              {/* Price Selector */}
              <div className="flex flex-col gap-2">
                 <label className="text-xs text-green-400 font-pixel uppercase mb-1">Budget:</label>
                 <div className="grid grid-cols-4 gap-2">
                    {PRICE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedPrice(option.value)}
                        className={`
                           font-pixel text-xs md:text-sm py-3 border-2 border-green-700 transition-all relative group
                           ${selectedPrice === option.value 
                              ? 'bg-green-500 text-black shadow-[0px_0px_10px_rgba(74,222,128,0.5)] translate-y-[1px]' 
                              : 'bg-black text-green-400 hover:bg-slate-900 hover:border-green-500'}
                        `}
                        title={option.desc}
                      >
                        {option.label}
                        {selectedPrice === option.value && (
                           <span className="absolute -top-2 -right-2 w-3 h-3 bg-pink-500 animate-ping rounded-full"></span>
                        )}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex justify-between items-center bg-black p-2 border border-slate-700 mt-2">
                 <span className="text-xs text-green-400 font-pixel">✨ FREE PLAY</span>
                 <span className="text-xs text-slate-500 font-pixel">PRESS START</span>
              </div>

              <RetroButton 
                 onClick={handleRoll} 
                 loading={loading} 
                 className="w-full text-xl py-4"
              >
                 {loading ? 'SCANNING...' : 'START 🎲'}
              </RetroButton>
           </div>
        </div>

        {/* Output Screen */}
        <div className="w-full flex justify-center min-h-[400px]">
           {error ? (
             <div className="text-red-500 font-pixel text-center p-8 border-4 border-red-500 bg-black">
                <p>ERROR: {error}</p>
                <button onClick={() => setError(null)} className="mt-4 text-white underline">RESET SYSTEM</button>
             </div>
           ) : (
             <ResultDisplay restaurant={restaurant} loading={loading} />
           )}
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-600 font-pixel mt-auto pb-4">
           <p>POWERED BY GEMINI 2.5</p>
           <p>© 2024 KAOHSIUNG 8-BIT</p>
        </footer>

      </main>
    </div>
  );
};

export default App;