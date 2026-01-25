
import React, { useState } from 'react';
import { PriorityType } from '../types';

interface Props {
  priorities: PriorityType[];
  onReorder: (newOrder: PriorityType[]) => void;
}

const PriorityRanker: React.FC<Props> = ({ priorities, onReorder }) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    
    const newOrder = [...priorities];
    const item = newOrder.splice(draggedItem, 1)[0];
    newOrder.splice(index, 0, item);
    onReorder(newOrder);
    setDraggedItem(index);
  };

  const getLabel = (type: PriorityType) => {
    switch(type) {
      case 'budget': return 'Acquisition Budget';
      case 'range': return 'Flight Range';
      case 'seats': return 'Passenger Capacity';
      case 'compartments': return 'Cabin Compartments';
      case 'cost': return 'Operational Cost';
    }
  };

  const getIcon = (type: PriorityType) => {
    switch(type) {
      case 'budget': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
      case 'range': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12h20M12 2v20"/><circle cx="12" cy="12" r="10"/></svg>;
      case 'seats': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M19 8a4 4 0 1 0-3-3.87"/></svg>;
      case 'compartments': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>;
      case 'cost': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>;
    }
  };

  return (
    <div className="w-full mb-12">
      <div className="flex flex-col items-center mb-6">
        <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-[9px] mb-2">Rank Your Priorities</span>
        <p className="text-slate-500 text-[11px] font-medium">Drag from left to right (1st = Highest Priority)</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
        {priorities.map((p, i) => (
          <div
            key={p}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            className={`
              relative group cursor-grab active:cursor-grabbing select-none transition-all duration-300
              bg-slate-900/40 border-2 rounded-2xl p-4 flex flex-col items-center gap-3 w-44
              ${draggedItem === i ? 'opacity-30 scale-95 border-blue-500/50' : 'opacity-100 border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/60 shadow-lg'}
            `}
          >
            <div className="absolute -top-3 -left-3 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg shadow-blue-500/20 border-2 border-slate-950">
              {i + 1}
            </div>
            <div className={`p-2.5 rounded-xl ${i === 0 ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-slate-800 text-slate-400'}`}>
              {getIcon(p)}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest text-center leading-tight ${i === 0 ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {getLabel(p)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityRanker;
