
import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const PortfolioView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-4 justify-start">
          <span className="w-8 h-[1px] bg-blue-500"></span>
          <p className="text-blue-500 font-bold tracking-widest uppercase text-[10px]">Premium Listings</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Our Inventory</h2>
          <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
            Discover our curated collection of off-market and exclusive aircraft listings available for immediate acquisition.
          </p>
        </div>
      </header>

      {/* Grid Layout: 3 Columns, and with 9 items it will naturally form 3 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PORTFOLIO_DATA.map((item) => (
          <div key={item.id} className="group relative">
            {/* The Main Card Container with curved edges */}
            <div className="relative h-full bg-slate-900/40 border border-slate-800 rounded-[3rem] overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col">
              
              {/* Top Image Section with its own curved corners */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[3rem] rounded-b-[2rem] m-2">
                <img 
                  src={item.imageUrl} 
                  alt={item.model} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600/90 backdrop-blur-md border border-blue-400/30 text-white font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {item.year}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-6">
                  <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[9px] mb-1">{item.location}</p>
                  <h3 className="text-xl font-bold text-white tracking-tight">{item.model}</h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light italic flex-grow">
                  "{item.clientStory}"
                </p>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">Mission Profile</span>
                    <span className="text-white font-mono text-[10px]">{item.specs}</span>
                  </div>
                  
                  <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-blue-600 group-hover:rotate-[-45deg]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Subtle decorative "glow" behind card on hover */}
            <div className="absolute -inset-2 bg-blue-500/5 rounded-[3.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
          </div>
        ))}
      </div>

      {/* Global Reach Stats with improved visual weight */}
      <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-900 bg-slate-950/50 backdrop-blur-sm rounded-[3rem] px-12">
        {[
          { label: 'Asset Value', value: '$2.4B+' },
          { label: 'Primary Markets', value: '14' },
          { label: 'Acquisitions', value: '450+' },
          { label: 'Client Retention', value: '98%' }
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">{stat.value}</p>
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Call to Action for specialized missions */}
      <div className="mt-24 text-center">
         <p className="text-slate-500 text-xs font-medium mb-8">Looking for a specific configuration not shown here?</p>
         <button className="bg-slate-900 border border-slate-800 hover:border-blue-500 text-white px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:bg-slate-800">
           Request Global Search
         </button>
      </div>
    </div>
  );
};

export default PortfolioView;
