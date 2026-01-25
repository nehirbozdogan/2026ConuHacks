
import React from 'react';
import { Aircraft } from '../types';

interface Props {
  aircraft: Aircraft;
  onClick: () => void;
}

const AircraftCard: React.FC<Props> = ({ aircraft, onClick }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(aircraft.price);

  const formattedHourly = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(aircraft.operatingCostPerHour);

  return (
    <div 
      onClick={onClick}
      className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 group flex flex-col min-h-[400px] cursor-pointer"
    >
      {/* Aircraft Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={aircraft.imageUrl} 
          alt={aircraft.model}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        
        {/* Badges Overlaying Image */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <span className="bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
            {aircraft.size}
          </span>
        </div>
      </div>

      <div className="p-8 flex-grow">
        {/* Meta info */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.1em]">
            Est. {formattedHourly}/hr OpEx
          </span>
          {aircraft.hasBedroom && (
            <span className="bg-slate-800/40 text-slate-400 border border-slate-700 text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.1em]">
              Sleeper Capable
            </span>
          )}
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
              {aircraft.model}
            </h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{aircraft.manufacturer}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-400 font-bold font-mono text-sm">{formattedPrice}</p>
            <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest">Acquisition Cost</p>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light italic">
          {aircraft.description}
        </p>
        
        {/* Core Performance Specifications */}
        <div className="grid grid-cols-4 gap-4 border-t border-slate-800/50 pt-6">
          <div className="text-center">
            <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Max Range</p>
            <p className="text-xs font-bold text-slate-200">{aircraft.range}nm</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Cruise Speed</p>
            <p className="text-xs font-bold text-slate-200">{aircraft.speed}kt</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Cap. (PAX)</p>
            <p className="text-xs font-bold text-slate-200">{aircraft.capacity}</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Zones</p>
            <p className="text-xs font-bold text-slate-200">{aircraft.cabinZones}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftCard;
