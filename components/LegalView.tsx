
import React from 'react';

interface Props {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

const LegalView: React.FC<Props> = ({ type, onBack }) => {
  return (
    <main className="pt-32 pb-40 px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-12 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="transition-transform duration-300 group-hover:-translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to Console</span>
        </button>
        <span className="text-slate-600 font-mono text-[10px]">VER. 2026.04.12</span>
      </div>

      <header className="mb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 italic">
          {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed border-l border-blue-600 pl-6">
          This document governs your engagement with SkyBound’s digital ecosystem and aviation acquisition services.
        </p>
      </header>

      <div className="space-y-16 text-slate-300">
        {type === 'privacy' ? (
          <>
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">1. Information Collection</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                SkyBound collects strictly curated information necessary for high-value aviation brokerage. This includes mission profiles, financial capacity verifications, and technical preferences shared during our acquisition consultations.
              </p>
            </section>
            
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">2. Use of AI Advising</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Our Gemini-powered Aviation Advisor processes real-time catalog data alongside your inputs to provide strategic acquisition paths. These interactions are stored locally to enhance your current session but are anonymized for any future model refinements.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">3. Data Stewardship</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                We employ military-grade encryption for all stored client mission profiles. Your identity and intent remain strictly confidential and are only shared with verified aircraft owners or brokers upon your explicit Letter of Intent (LOI) initiation.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">1. Engagement of Services</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                By utilizing the SkyBound Hangar and Consultation Desk, you acknowledge that our digital platform serves as a strategic discovery tool. Final aircraft acquisitions are subject to formal purchase agreements and physical pre-buy inspections.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">2. Accuracy of Listings</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                While our real-time market inventory is curated daily, global aviation liquidity results in rapid changes to availability. SkyBound does not guarantee the existence of a listing beyond the moment of digital display.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">3. Limitation of Liability</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                SkyBound Global Inc. facilitates discovery and initial brokerage strategy. We are not liable for operational variances post-acquisition or discrepancies in third-party technical logs provided by external sellers.
              </p>
            </section>
          </>
        )}

        <section className="pt-16 border-t border-slate-900">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">
            SkyBound Global Compliance Division &copy; 2026
          </p>
        </section>
      </div>
    </main>
  );
};

export default LegalView;
