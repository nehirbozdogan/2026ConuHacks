
import React from 'react';
import { Aircraft } from '../types';

interface Props {
  aircraft: Aircraft;
  onClose: () => void;
}

const AircraftDetailsModal: React.FC<Props> = ({ aircraft, onClose }) => {
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

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
        
        {/* Left: Image & Primary Title */}
        <div className="w-full md:w-5/12 relative h-64 md:h-auto overflow-hidden bg-slate-950">
          <img 
            src={aircraft.imageUrl} 
            alt={aircraft.model} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10">
            <p className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Technical Data Sheet</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white italic">{aircraft.model}</h2>
            <p className="text-slate-400 text-sm mt-2">{aircraft.manufacturer} Aviation</p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Right: Detailed Information */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-12 bg-slate-900 scroll-smooth">
          <div className="hidden md:flex justify-end absolute top-10 right-10">
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-blue-500 transition-all group"
            >
              <svg className="group-hover:rotate-90 transition-transform duration-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <section>
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Acquisition profile</h3>
                  <p className="text-3xl font-bold text-blue-400">{formattedPrice}</p>
                </div>
                <div className="text-left md:text-right">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Operational footprint</h3>
                  <p className="text-xl font-bold text-emerald-500">{formattedHourly} <span className="text-[10px] uppercase font-medium">per hour</span></p>
                </div>
             </div>
             <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-blue-600 pl-6 italic">
               {aircraft.description}
             </p>
          </section>

          {/* Specs Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-800/50">
             {[
               { label: 'Max Range', value: `${aircraft.range}nm`, sub: 'NBAA IFR Fuel' },
               { label: 'High Speed', value: `M ${ (aircraft.speed / 661).toFixed(2) }`, sub: `${aircraft.speed} knots` },
               { label: 'Pax Capacity', value: aircraft.capacity, sub: 'Certified Seats' },
               { label: 'Cabin Zones', value: aircraft.cabinZones, sub: 'Distinguishable areas' },
             ].map((spec, i) => (
               <div key={i} className="space-y-1">
                 <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{spec.label}</p>
                 <p className="text-xl font-bold text-white">{spec.value}</p>
                 <p className="text-[9px] text-slate-600 uppercase font-medium">{spec.sub}</p>
               </div>
             ))}
          </section>

          {/* Cabin Features */}
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">Cabin Config & Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { label: 'Dedicated Bedroom', active: aircraft.hasBedroom },
                { label: 'Enclosed Lavatory', active: aircraft.hasEnclosedLavatory },
                { label: 'Sliding Privacy Dividers', active: aircraft.hasSlidingDividers },
                { label: 'Full Convection Oven', active: aircraft.hasOven },
                { label: 'Microwave Oven', active: aircraft.hasMicrowave },
                { label: 'Cold Storage / Wine Chiller', active: aircraft.hasColdStorage },
                { label: 'Coffee / Espresso Station', active: aircraft.hasCoffeeMachine },
                { label: 'Large External Storage', active: aircraft.hasLargeStorage },
              ].map((feat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-800/30 pb-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${feat.active ? 'text-slate-200' : 'text-slate-700 line-through decoration-slate-800'}`}>
                    {feat.label}
                  </span>
                  {feat.active ? (
                    <svg className="text-blue-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                  ) : (
                    <svg className="text-slate-800" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AircraftDetailsModal;
