
import React from 'react';
import { IntakeRecommendation } from '../types';

interface Props {
  data: IntakeRecommendation;
  onRestart: () => void;
}

const RecommendationView: React.FC<Props> = ({ data, onRestart }) => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="mb-16 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <span className="text-emerald-400 font-bold tracking-[0.2em] uppercase text-[10px]">Expert Brokerage Analysis</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Strategic Acquisition Report</h1>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Our analysis has cross-referenced your mission profile with global inventories and operational cost benchmarks.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {/* Left Column: Summary & Guidance */}
        <div className="lg:col-span-1 space-y-10">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 border-b border-slate-800 pb-2">Mission Fit</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">"{data.buyer_summary}"</p>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">Cost Analysis</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{data.cost_analysis}</p>
          </section>

          {data.red_flags && (
            <section className="bg-red-500/5 border border-red-500/10 p-6 rounded-3xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-4 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                Compromises & Flags
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{data.red_flags}</p>
            </section>
          )}
        </div>

        {/* Right Column: Recommendations */}
        <div className="lg:col-span-2 space-y-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Target Aircraft</h3>
          {data.recommendations.map((rec, idx) => (
            <div key={idx} className="group bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 p-8 rounded-[2.5rem] transition-all duration-500 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-blue-500 font-mono text-[10px] font-bold">OPTION #{idx + 1}</span>
                  <h4 className="text-3xl font-bold tracking-tight text-white mt-1">{rec.aircraft}</h4>
                </div>
                <div className="text-right">
                  <div className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
                    {rec.estimated_price}
                  </div>
                  <div className="mt-1 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{rec.operating_cost_per_hour} / hr</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">The Mission Fit</h5>
                  <p className="text-slate-400 leading-relaxed">{rec.why_it_fits}</p>
                  <div className="mt-4 p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Performance Specs</p>
                    <p className="text-xs text-slate-300">{rec.specs}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Maintenance Program</h5>
                    <p className="text-slate-300 text-sm">{rec.maintenance_program}</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Crew Requirements</h5>
                    <p className="text-slate-300 text-sm">{rec.crew_requirements}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-800/50">
                <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                  <h5 className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mb-2">Strengths</h5>
                  <p className="text-slate-300 text-xs leading-relaxed">{rec.strengths}</p>
                </div>
                <div className="bg-red-500/5 p-4 rounded-2xl border border-red-500/10">
                  <h5 className="text-[10px] uppercase font-bold text-red-400 tracking-widest mb-2">Weaknesses</h5>
                  <p className="text-slate-300 text-xs leading-relaxed">{rec.weaknesses}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 p-12 rounded-[3rem] text-center mb-20 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4 tracking-tight">Broker Final Summary</h3>
          <p className="text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            {data.broker_summary}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
              Initiate LOI
            </button>
            <button 
              onClick={onRestart}
              className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Refine Mission Profile
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_70%)] pointer-events-none" />
      </div>
    </div>
  );
};

export default RecommendationView;
