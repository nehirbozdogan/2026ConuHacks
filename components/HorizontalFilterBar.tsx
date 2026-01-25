
import React from 'react';
import { FilterOptions, DefinedClass, OpCostExpectation, PriorityType } from '../types';

interface Props {
  filters: FilterOptions;
  setFilters: (f: FilterOptions) => void;
  priorityOrder: PriorityType[];
}

const HorizontalFilterBar: React.FC<Props> = ({ filters, setFilters, priorityOrder }) => {
  
  const renderFilter = (type: PriorityType) => {
    switch(type) {
      case 'budget':
        return (
          <div className="flex-1 min-w-[200px] border-r border-slate-800/50 px-6 py-4">
             <h4 className="font-bold text-[9px] mb-3 uppercase tracking-widest text-slate-500 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
               Acquisition Budget
             </h4>
             <input 
               type="range" 
               min="5000000" 
               max="80000000" 
               step="1000000"
               value={filters.maxPrice}
               onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
               className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
             <div className="flex justify-between mt-2 text-[10px] text-blue-400 font-mono font-bold">
               <span>$5M</span>
               <span>MAX ${(filters.maxPrice / 1000000).toFixed(0)}M</span>
             </div>
          </div>
        );
      case 'range':
        return (
          <div className="flex-1 min-w-[200px] border-r border-slate-800/50 px-6 py-4">
            <h4 className="font-bold text-[9px] mb-3 uppercase tracking-widest text-slate-500 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
               Aircraft Class
             </h4>
             <select 
               value={filters.selectedClass}
               onChange={(e) => setFilters({...filters, selectedClass: e.target.value as DefinedClass})}
               className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 text-[10px] font-bold text-white uppercase outline-none focus:border-blue-500 transition-colors"
             >
               <option value={DefinedClass.ALL}>Any Range Class</option>
               <option value={DefinedClass.LIGHT}>Light (1,200–2k nm)</option>
               <option value={DefinedClass.MIDSIZE}>Midsize (2k–3k nm)</option>
               <option value={DefinedClass.SUPER_MIDSIZE}>Super-Mid (3k–4k nm)</option>
               <option value={DefinedClass.LARGE_CABIN}>Large Cabin (4k–6k nm)</option>
             </select>
          </div>
        );
      case 'seats':
        return (
          <div className="flex-1 min-w-[200px] border-r border-slate-800/50 px-6 py-4">
            <h4 className="font-bold text-[9px] mb-3 uppercase tracking-widest text-slate-500 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
               Capacity
             </h4>
             <div className="flex gap-1.5">
               {[0, 4, 6, 8, 10].map(val => (
                 <button 
                   key={val}
                   onClick={() => setFilters({...filters, minSeats: val})}
                   className={`flex-1 py-2 text-[9px] font-bold rounded-lg border transition-all ${
                     filters.minSeats === val 
                       ? 'bg-amber-600 border-amber-500 text-white' 
                       : 'border-slate-800 text-slate-500 hover:border-slate-700'
                   }`}
                 >
                   {val === 0 ? 'Any' : `${val}+`}
                 </button>
               ))}
             </div>
          </div>
        );
      case 'compartments':
        return (
          <div className="flex-1 min-w-[200px] border-r border-slate-800/50 px-6 py-4">
            <h4 className="font-bold text-[9px] mb-3 uppercase tracking-widest text-slate-500 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
               Zones
             </h4>
             <div className="flex gap-1.5">
               {[0, 1, 2, 3, 4].map(val => (
                 <button 
                   key={val}
                   onClick={() => setFilters({...filters, minCabinZones: val})}
                   className={`flex-1 py-2 text-[9px] font-bold rounded-lg border transition-all ${
                     filters.minCabinZones === val 
                       ? 'bg-purple-600 border-purple-500 text-white' 
                       : 'border-slate-800 text-slate-500 hover:border-slate-700'
                   }`}
                 >
                   {val === 0 ? 'Any' : val}
                 </button>
               ))}
             </div>
          </div>
        );
      case 'cost':
        return (
          <div className="flex-1 min-w-[200px] px-6 py-4">
            <h4 className="font-bold text-[9px] mb-3 uppercase tracking-widest text-slate-500 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               OpEx Target
             </h4>
             <div className="flex gap-1.5">
               {Object.values(OpCostExpectation).map(level => (
                 <button 
                   key={level}
                   onClick={() => setFilters({...filters, opCost: level})}
                   className={`flex-1 py-2 text-[9px] font-bold rounded-lg border transition-all ${
                     filters.opCost === level 
                       ? 'bg-emerald-600 border-emerald-500 text-white' 
                       : 'border-slate-800 text-slate-500 hover:border-slate-700'
                   }`}
                 >
                   {level}
                 </button>
               ))}
             </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-30 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar">
        {priorityOrder.map(type => (
          <React.Fragment key={type}>
            {renderFilter(type)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HorizontalFilterBar;
