
import React, { useState } from 'react';
import { IntakeFormData, IntakeRecommendation, AircraftSize, DefinedClass } from '../types';
import { analyzeIntake } from '../services/geminiService';

interface Props {
  onComplete: (data: IntakeRecommendation) => void;
  onCancel: () => void;
}

const IntakeForm: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // Fixed IntakeFormData initialization by adding missing properties: numSeats and operationalCostExpectation
  const [formData, setFormData] = useState<IntakeFormData>({
    aircraftClass: '',
    numSeats: '',
    routes: '',
    requiredRange: '',
    flightFrequency: '',
    operationalEnvironment: '',
    budget: '',
    operationalCostExpectation: 'Medium',
    passengers: '',
    cabinNeeds: '',
    galleyEquipment: '',
    storageNeeds: '',
    connectivity: '',
    techLevel: '',
    timeline: '',
    additionalNotes: ''
  });

  const totalSteps = 7;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeIntake(formData);
      onComplete(result);
    } catch (error) {
      console.error(error);
      alert("Consultation failed. Our servers are currently over-leveraged.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateField = (field: keyof IntakeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
        <div className="relative mb-12">
          <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full animate-ping absolute inset-0" />
          <div className="w-24 h-24 border-t-2 border-blue-500 rounded-full animate-spin" />
        </div>
        <h2 className="text-3xl font-bold mb-4 tracking-tight text-white">Mission Analysis in Progress</h2>
        <p className="text-slate-500 max-w-md animate-pulse">
          Calculating payload-range curves, airfield performance data, and global routing efficiency for your primary missions...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      {/* Progress Header */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-blue-500 font-bold tracking-widest text-[10px] uppercase">Acquisition Survey</span>
            <h2 className="text-3xl font-bold tracking-tight mt-1 text-white">
              {step === 1 && "Aircraft Class"}
              {step === 2 && "Number of Seats"}
              {step === 3 && "Mission Profile"}
              {step === 4 && "Cabin & Comfort"}
              {step === 5 && "Operational Cost"}
              {step === 6 && "Technical Specs"}
              {step === 7 && "Financials & Timeline"}
            </h2>
          </div>
          <span className="text-slate-500 font-mono text-sm">Step {step} of {totalSteps}</span>
        </div>
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl space-y-8 min-h-[500px] relative overflow-hidden">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Select Aircraft Class</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: DefinedClass.LIGHT, range: '1,200–2,000 nm', desc: 'Regional efficiency (4-7 seats typical).' },
                  { label: DefinedClass.MIDSIZE, range: '2,000–3,000 nm', desc: 'Versatile balance (6-9 seats typical).' },
                  { label: DefinedClass.SUPER_MIDSIZE, range: '3,000–4,000+ nm', desc: 'Transcontinental reach (8-10 seats typical).' },
                  { label: DefinedClass.LARGE_CABIN, range: '4,000–6,000+ nm', desc: 'Intercontinental capability (10-14 seats typical).' }
                ].map((cls) => (
                  <button
                    key={cls.label}
                    type="button"
                    onClick={() => {
                        updateField('aircraftClass', cls.label);
                        setTimeout(nextStep, 300);
                    }}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 group ${
                        formData.aircraftClass === cls.label 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/20' 
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{cls.label}</span>
                        {formData.aircraftClass === cls.label && <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />}
                    </div>
                    <p className={`text-[11px] font-mono mb-2 ${formData.aircraftClass === cls.label ? 'text-blue-100' : 'text-blue-500'}`}>{cls.range}</p>
                    <p className={`text-[10px] leading-relaxed ${formData.aircraftClass === cls.label ? 'text-blue-100/80' : 'text-slate-600'}`}>
                        {cls.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 text-white">Target Passenger Capacity</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['4-7', '6-9', '8-10', '10-14', '15+'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    updateField('numSeats', opt);
                    setTimeout(nextStep, 300);
                  }}
                  className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                    formData.numSeats === opt 
                      ? 'bg-amber-600 border-amber-500 text-white shadow-xl shadow-amber-500/20' 
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-lg md:text-xl font-bold">{opt}</span>
                  <p className="text-[9px] uppercase tracking-widest mt-2 opacity-60">Seats</p>
                </button>
              ))}
            </div>
            <p className="text-slate-500 text-[10px] mt-6">Note: Seat count is mostly determined by Aircraft Class. Mismatches will be flagged by our AI brokers.</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Typical Routes & Missions</label>
                <input 
                  type="text"
                  placeholder="e.g. Teterboro to Cannes, Tokyo to LAX..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white"
                  value={formData.routes}
                  onChange={(e) => updateField('routes', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Frequency of Flights</label>
                <input 
                  type="text"
                  placeholder="e.g. 15 missions / month"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white"
                  value={formData.flightFrequency}
                  onChange={(e) => updateField('flightFrequency', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Climate & Terrain Considerations</label>
                <textarea 
                  placeholder="e.g. High-altitude operations (Aspen), Tropical/Coastal humidity..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all h-24 text-white"
                  value={formData.operationalEnvironment}
                  onChange={(e) => updateField('operationalEnvironment', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Passenger Detail</label>
                <input 
                  type="text"
                  placeholder="e.g., Mostly corporate teams"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white"
                  value={formData.passengers}
                  onChange={(e) => updateField('passengers', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Target Cabin Zones</label>
                <div className="flex gap-2">
                  {['Single', 'Double', 'Triple ++'].map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => updateField('cabinNeeds', z)}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-xl border transition-all uppercase tracking-tight ${
                        formData.cabinNeeds.includes(z)
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-white">Storage & Cargo Needs</label>
              <textarea 
                placeholder="Storage needs (e.g. Golf clubs, oversized luggage...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all h-24 text-white"
                value={formData.storageNeeds}
                onChange={(e) => updateField('storageNeeds', e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 text-white">OPERATIONAL COST</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Low', desc: 'Cheap to operate. Avoid high fuel burn, expensive programs, large crews, or complex avionics.' },
                { label: 'Medium', desc: 'Balanced. Okay with normal operating costs, moderate fuel burn, and standard maintenance.' },
                { label: 'High', desc: 'Premium. Does not care about expenses. High burn, complex systems, and larger crews acceptable.' }
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => updateField('operationalCostExpectation', opt.label)}
                  className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-2 ${
                    formData.operationalCostExpectation === opt.label 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/20' 
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest">{opt.label}</span>
                  <p className={`text-[10px] leading-relaxed ${formData.operationalCostExpectation === opt.label ? 'text-blue-100' : 'text-slate-600'}`}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-white">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Connectivity Preference</label>
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white"
                value={formData.connectivity}
                onChange={(e) => updateField('connectivity', e.target.value)}
              >
                <option value="">Select Priority</option>
                <option value="Ka-Band (Global High Speed)">Ka-Band (Global High Speed)</option>
                <option value="Ku-Band">Ku-Band</option>
                <option value="Air-to-Ground (CONUS only)">Air-to-Ground (CONUS only)</option>
                <option value="Basic Iridium">Basic Satcom</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Avionics / Flight Deck</label>
              <input 
                type="text"
                placeholder="e.g., G5000, HUD required"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white"
                value={formData.techLevel}
                onChange={(e) => updateField('techLevel', e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-white">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Acquisition Budget</label>
              <input 
                type="text"
                placeholder="e.g., $35M"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white"
                value={formData.budget}
                onChange={(e) => updateField('budget', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Timeline</label>
              <input 
                type="text"
                placeholder="e.g., Immediate"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white"
                value={formData.timeline}
                onChange={(e) => updateField('timeline', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="pt-6 flex justify-between items-center border-t border-slate-800/50">
          <button 
            type="button"
            onClick={step === 1 ? onCancel : prevStep}
            className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          
          <button 
            type="button"
            onClick={step === totalSteps ? handleSubmit : nextStep}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
          >
            {step === totalSteps ? "Generate Report" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;
