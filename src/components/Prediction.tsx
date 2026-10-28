import React, { useState, useEffect } from 'react';
import { STATES_AND_DISTRICTS, SEASONS, CROPS } from '../utils/cropData';
import { predictCropProduction } from '../utils/cropModel';
import { PredictionInput, PredictionResult } from '../types';
import { Sprout, HelpCircle, Activity, Lightbulb, MapPin, Calendar, Compass, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Prediction() {
  const states = Object.keys(STATES_AND_DISTRICTS);

  // Form State
  const [selectedState, setSelectedState] = useState(states[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(STATES_AND_DISTRICTS[states[0]][0]);
  const [selectedSeason, setSelectedSeason] = useState(SEASONS[0]);
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [area, setArea] = useState<string>('1500');

  // Interactive UI State
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Update district dropdown automatically if state changes
  useEffect(() => {
    const districtsForState = STATES_AND_DISTRICTS[selectedState] || [];
    if (districtsForState.length > 0) {
      setSelectedDistrict(districtsForState[0]);
    }
  }, [selectedState]);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numericArea = parseFloat(area);
    if (isNaN(numericArea) || numericArea <= 0) {
      setError('Please specify a valid positive area (greater than 0 hectares).');
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate ML model inference delay for realistic UX
    setTimeout(() => {
      const input: PredictionInput = {
        state: selectedState,
        district: selectedDistrict,
        season: selectedSeason,
        crop: selectedCrop,
        area: numericArea,
      };

      const out = predictCropProduction(input);
      setResult(out);
      setLoading(false);
    }, 750);
  };

  const handleReset = () => {
    setSelectedState(states[0]);
    setSelectedDistrict(STATES_AND_DISTRICTS[states[0]][0]);
    setSelectedSeason(SEASONS[0]);
    setSelectedCrop(CROPS[0]);
    setArea('1500');
    setResult(null);
    setError(null);
  };

  // Helper formatting values
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);
  };

  return (
    <div className="space-y-10 pb-12" id="prediction-view">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white/90 tracking-tight">Crop Production Predictor</h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Enter regional and seasonal parameters below to invoke our trained Random Forest Regressor and forecast agricultural yield outputs.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Left Side: Input Form */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center space-x-2 pb-4 border-b border-white/10">
            <Compass className="h-5 w-5 text-emerald-300" />
            <h2 className="font-bold text-white text-base">Model Input Parameters</h2>
          </div>

          <form onSubmit={handlePredict} className="space-y-5" id="crop-prediction-form">
            {/* State */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 block">State</label>
              <select
                id="select-state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-colors cursor-pointer"
              >
                {states.map((s) => (
                  <option key={s} value={s} className="bg-teal-950 text-white">{s}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 block">District</label>
              <select
                id="select-district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-colors cursor-pointer"
              >
                {(STATES_AND_DISTRICTS[selectedState] || []).map((d) => (
                  <option key={d} value={d} className="bg-teal-950 text-white">{d}</option>
                ))}
              </select>
            </div>

            {/* Season */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 block">Season</label>
              <select
                id="select-season"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-colors cursor-pointer"
              >
                {SEASONS.map((season) => (
                  <option key={season} value={season} className="bg-teal-950 text-white">{season}</option>
                ))}
              </select>
            </div>

            {/* Crop */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 block">Crop Type</label>
              <select
                id="select-crop"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-colors cursor-pointer"
              >
                {CROPS.map((crop) => (
                  <option key={crop} value={crop} className="bg-teal-950 text-white">{crop}</option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-white/80 block">Area (in Hectares)</label>
                <span className="text-[10px] text-white/50 font-mono">1 Hectare ≈ 2.47 Acres</span>
              </div>
              <input
                id="input-area"
                type="number"
                min="1"
                step="any"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g., 1200"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all placeholder:text-white/30"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 text-red-200 rounded-xl text-xs font-medium border border-red-800/40" id="form-error">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white hover:bg-white/10 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                id="btn-reset"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/5 disabled:text-white/40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                id="btn-predict"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Fitting Trees...
                  </>
                ) : (
                  <>
                    <Sprout className="h-4 w-4" />
                    Predict Production
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Prediction Output & Success Animation */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass text-white p-12 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center justify-center space-y-4 text-center min-h-[400px]"
                key="loading-state"
              >
                <div className="p-4 bg-white/10 rounded-full animate-bounce">
                  <Sprout className="h-10 w-10 text-emerald-300 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white font-mono">Running Random Forest Regression</h3>
                <p className="text-xs text-white/70 max-w-sm leading-relaxed">
                  Parsing decision tree ensembles, decoding categorical states, and performing aggregate regression predictions...
                </p>
                <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-300 rounded-full animate-infinite-loading w-1/3" />
                </div>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass border-2 border-dashed border-white/20 p-12 rounded-3xl flex flex-col items-center justify-center space-y-3 text-center min-h-[400px]"
                key="empty-state"
              >
                <div className="p-3 bg-white/10 rounded-full text-emerald-300">
                  <HelpCircle className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-white/95 text-sm">Awaiting Crop Parameters</h3>
                <p className="text-xs text-white/60 max-w-xs leading-relaxed">
                  Please select your geographical state, crop variety, and acreage area on the left to invoke the ML model prediction.
                </p>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="space-y-6"
                key="result-state"
                id="prediction-result-panel"
              >
                {/* Result Card */}
                <div className="glass text-white p-8 rounded-3xl border border-white/20 shadow-xl space-y-6 relative overflow-hidden">
                  {/* Glowing success background ring */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0" />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 font-mono bg-white/10 px-2 py-0.5 rounded-md border border-white/15">
                        ML Estimate Success
                      </span>
                      <h3 className="text-lg font-bold text-white font-sans">{selectedCrop} Yield Forecast</h3>
                      <p className="text-xs text-white/75 font-medium">
                        {selectedDistrict}, {selectedState} • {selectedSeason} Season
                      </p>
                    </div>
                    {/* Tick Success Animation */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="p-2 bg-emerald-400 text-slate-950 rounded-full shadow"
                    >
                      <ShieldCheck className="h-6 w-6" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/15 relative z-10">
                    <div className="space-y-1">
                      <span className="text-[10px] text-white/60 font-medium uppercase font-mono tracking-wider block">Predicted Production</span>
                      <div className="text-2xl md:text-3xl font-black text-emerald-300 font-sans flex items-baseline gap-1.5">
                        {formatNumber(result.production)}
                        <span className="text-xs text-white/60 font-bold">Tonnes</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-white/60 font-medium uppercase font-mono tracking-wider block">Expected Yield</span>
                      <div className="text-2xl md:text-3xl font-black text-emerald-300 font-sans flex items-baseline gap-1.5">
                        {result.yieldValue}
                        <span className="text-xs text-white/60 font-bold">T/Ha</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-white/90 font-medium leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 relative z-10">
                    💡 <strong>Confidence Message:</strong> {result.message}
                  </p>
                </div>

                {/* Agronomic Advisor Card */}
                <div className="glass p-6 rounded-3xl shadow-xl space-y-4">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-emerald-300 animate-pulse" /> Recommended Agronomic Management
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1">
                      <span className="text-[10px] text-white/50 block font-semibold uppercase">Optimal Soil Type</span>
                      <span className="text-xs font-bold text-white">{result.insights.soilType}</span>
                    </div>

                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1">
                      <span className="text-[10px] text-white/50 block font-semibold uppercase">Irrigation Intensity</span>
                      <span className="text-xs font-bold text-white">{result.insights.irrigationNeed}</span>
                    </div>

                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1">
                      <span className="text-[10px] text-white/50 block font-semibold uppercase">Sowing Calendar</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-emerald-300" />
                        {result.insights.bestMonthToSow}
                      </span>
                    </div>

                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1">
                      <span className="text-[10px] text-white/50 block font-semibold uppercase">Market Demand</span>
                      <span className="text-xs font-bold flex items-center gap-1 text-white">
                        <span className={`w-2 h-2 rounded-full ${
                          result.insights.marketDemand === 'High' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                        }`} />
                        {result.insights.marketDemand}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
