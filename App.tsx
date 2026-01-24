
import React, { useState, useMemo, useEffect } from 'react';
import ThreeHangar from './components/ThreeHangar';
import AircraftCard from './components/AircraftCard';
import GeminiAdvisor from './components/GeminiAdvisor';
import { AIRCRAFT_DATA } from './constants';
import { AircraftSize, FilterOptions } from './types';

const App: React.FC = () => {
  // Always start at landing for the immersive entry
  const [view, setView] = useState<'landing' | 'hangar'>('landing');
  const [filters, setFilters] = useState<FilterOptions>({
    maxPrice: 80000000,
    minRange: 0,
    size: 'All'
  });

  const filteredAircraft = useMemo(() => {
    return AIRCRAFT_DATA.filter(a => {
      const matchPrice = a.price <= filters.maxPrice;
      const matchRange = a.range >= filters.minRange;
      const matchSize = filters.size === 'All' || a.size === filters.size;
      return matchPrice && matchRange && matchSize;
    });
  }, [filters]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (view === 'landing') {
    return (
      <div className="h-screen w-full bg-[#020617] overflow-hidden animate-in fade-in duration-1000">
        <ThreeHangar onEnter={() => setView('hangar')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 animate-in fade-in duration-700">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setView('landing')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <svg className="text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter">SKYBOUND</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <button onClick={() => setView('landing')} className="hover:text-blue-400 transition-colors uppercase tracking-widest text-[11px] font-bold">3D Experience</button>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold">Fleet</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold">Advisor</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold">Contact</a>
          </div>

          <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-300">
            Inquire
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-[1px] bg-blue-500"></span>
                <p className="text-blue-500 font-bold tracking-widest uppercase text-[10px]">Curated Marketplace</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Personal Hangar</h2>
            </div>
            <p className="text-slate-400 max-w-md text-sm md:text-base leading-relaxed">
              Explore our hand-picked selection of the world's most advanced private aircraft. 
              Filter by your requirements or use our AI Advisor for a bespoke recommendation.
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 space-y-8">
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-8 sticky top-32 backdrop-blur-sm">
              <div>
                <h4 className="font-bold text-[10px] mb-4 uppercase tracking-widest text-slate-500">Investment Range</h4>
                <input 
                  type="range" 
                  min="5000000" 
                  max="80000000" 
                  step="1000000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-[11px] text-blue-400 font-mono font-bold">
                  <span>$5M</span>
                  <span>MAX ${(filters.maxPrice / 1000000).toFixed(0)}M</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[10px] mb-4 uppercase tracking-widest text-slate-500">Minimum Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[0, 2000, 4000, 6000].map(r => (
                    <button 
                      key={r}
                      onClick={() => setFilters({...filters, minRange: r})}
                      className={`py-2.5 text-[10px] font-bold rounded-lg border transition-all uppercase tracking-tighter ${
                        filters.minRange === r 
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                          : 'border-slate-800 text-slate-500 hover:border-slate-600'
                      }`}
                    >
                      {r === 0 ? 'Any' : `${r}+ nm`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[10px] mb-4 uppercase tracking-widest text-slate-500">Aircraft Category</h4>
                <div className="space-y-1">
                  {['All', ...Object.values(AircraftSize)].map(s => (
                    <button 
                      key={s}
                      onClick={() => setFilters({...filters, size: s as any})}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-all flex justify-between items-center ${
                        filters.size === s 
                          ? 'bg-slate-800/80 text-white font-bold' 
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{s}</span>
                      {filters.size === s && <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setFilters({ maxPrice: 80000000, minRange: 0, size: 'All' })}
                className="w-full text-slate-600 hover:text-white text-[10px] font-bold uppercase tracking-widest pt-4 border-t border-slate-800 transition-colors"
              >
                Reset Preferences
              </button>
            </div>
          </aside>

          {/* Catalog Grid */}
          <div className="flex-grow">
            {filteredAircraft.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredAircraft.map(aircraft => (
                  <AircraftCard key={aircraft.id} aircraft={aircraft} />
                ))}
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center bg-slate-900/10 border border-dashed border-slate-800 rounded-3xl text-center p-12">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                  <svg className="text-slate-700" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">No Matching Configurations</h3>
                <p className="text-slate-500 max-w-xs text-sm">We couldn't find aircraft matching these exact specifications in our current inventory.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <GeminiAdvisor catalog={AIRCRAFT_DATA} />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#020617] py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-2">
            <div 
              className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" 
              onClick={() => setView('landing')}
            >
              <span className="font-display font-bold text-xl tracking-tighter">SKYBOUND</span>
            </div>
            <p className="text-slate-600 text-xs tracking-tight">Redefining luxury aviation commerce.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
             <div className="flex gap-8">
                <button onClick={() => setView('landing')} className="text-slate-500 hover:text-blue-400 text-[10px] font-bold uppercase tracking-widest transition-colors">Return to 3D Hangar</button>
                <a href="#" className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy</a>
                <a href="#" className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Terms</a>
             </div>
             <p className="text-slate-700 text-[10px] font-medium">© 2024 SKYBOUND GLOBAL INC. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
