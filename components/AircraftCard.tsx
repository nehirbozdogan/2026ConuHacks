
import React from 'react';
import { Aircraft } from '../types';

interface Props {
  aircraft: Aircraft;
}

const AircraftCard: React.FC<Props> = ({ aircraft }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(aircraft.price);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={aircraft.imageUrl} 
          alt={aircraft.model}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {aircraft.size}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {aircraft.model}
            </h3>
            <p className="text-slate-500 text-sm font-medium">{aircraft.manufacturer}</p>
          </div>
          <p className="text-blue-400 font-bold">{formattedPrice}</p>
        </div>
        
        <p className="text-slate-400 text-sm line-clamp-2 mb-6">
          {aircraft.description}
        </p>
        
        <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-4">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Range</p>
            <p className="text-sm font-semibold text-slate-200">{aircraft.range}nm</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Speed</p>
            <p className="text-sm font-semibold text-slate-200">{aircraft.speed}kt</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Seats</p>
            <p className="text-sm font-semibold text-slate-200">{aircraft.capacity}</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <button className="w-full bg-slate-800 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300">
          Inquire Now
        </button>
      </div>
    </div>
  );
};

export default AircraftCard;
