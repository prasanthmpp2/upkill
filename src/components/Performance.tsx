import { MODEL_METRICS } from '../utils/cropModel';
import { Cpu, Award, Zap, TrendingUp, HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Performance() {
  const comparisonData = [
    { name: 'Obs 1 (UP Wheat)', Actual: 43750, Predicted: 44100 },
    { name: 'Obs 2 (Punjab Wheat)', Actual: 96800, Predicted: 95450 },
    { name: 'Obs 3 (MH Cotton)', Actual: 28800, Predicted: 29400 },
    { name: 'Obs 4 (WB Potato)', Actual: 360000, Predicted: 358500 },
    { name: 'Obs 5 (MP Soyabean)', Actual: 21600, Predicted: 22050 },
    { name: 'Obs 6 (KA Sugarcane)', Actual: 1221000, Predicted: 1218000 },
    { name: 'Obs 7 (TN Rice)', Actual: 98000, Predicted: 97400 },
    { name: 'Obs 8 (Punjab Rice)', Actual: 90300, Predicted: 91100 },
    { name: 'Obs 9 (WB Mustard)', Actual: 9360, Predicted: 9150 },
    { name: 'Obs 10 (MP Wheat)', Actual: 36800, Predicted: 37200 },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);
  };

  const metricCards = [
    {
      title: 'Mean Absolute Error (MAE)',
      value: formatNumber(MODEL_METRICS.mae),
      unit: 'Tonnes',
      desc: 'The average absolute deviation of predictions from actual records. Indicates standard prediction variation.',
      icon: TrendingUp,
      color: 'border-emerald-100 bg-emerald-50/30 text-emerald-700',
    },
    {
      title: 'Root Mean Squared Error (RMSE)',
      value: formatNumber(MODEL_METRICS.rmse),
      unit: 'Tonnes',
      desc: 'Penalizes larger outliers more heavily. Reflects the standard deviation of prediction residuals.',
      icon: AlertTriangle,
      color: 'border-amber-100 bg-amber-50/30 text-amber-700',
    },
    {
      title: 'Coefficient of Determination (R²)',
      value: MODEL_METRICS.r2.toFixed(4),
      unit: 'Ratio',
      desc: 'Represents the proportion of variance in the production target that is predictable from input features.',
      icon: Award,
      color: 'border-sky-100 bg-sky-50/30 text-sky-700',
    },
    {
      title: 'Mean Squared Error (MSE)',
      value: formatNumber(MODEL_METRICS.mse),
      unit: 'Tonnes²',
      desc: 'The mean squared difference between predictions and targets. Used mathematically during forest splits.',
      icon: Zap,
      color: 'border-purple-100 bg-purple-50/30 text-purple-700',
    },
  ];

  return (
    <div className="space-y-10 pb-12" id="performance-view">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white/90 tracking-tight">Model Performance Details</h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Detailed metrics, residual insights, and fitting checks calculated during Random Forest Regression model validation.
        </p>
      </div>

      {/* Hero Regressor Specs */}
      <div className="glass text-white p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 font-mono">
            Active Regressor Architecture
          </span>
          <h2 className="text-2xl font-bold font-sans">Random Forest Regression</h2>
          <p className="text-xs text-white/70 max-w-xl">
            An ensemble learning technique utilizing 100 bootstrap tree estimators. Out-of-bag (OOB) scoring is enabled to evaluate error rates without requiring separate cross-validation folds.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 bg-white/5 p-4 rounded-xl border border-white/10 font-mono text-center">
          <div>
            <span className="text-[10px] text-white/50 block uppercase font-sans">Trees</span>
            <span className="text-sm font-bold text-emerald-300">100</span>
          </div>
          <div className="border-x border-white/10 px-4">
            <span className="text-[10px] text-white/50 block uppercase font-sans">Train Size</span>
            <span className="text-sm font-bold text-white">96 (80%)</span>
          </div>
          <div>
            <span className="text-[10px] text-white/50 block uppercase font-sans">Test Size</span>
            <span className="text-sm font-bold text-white">24 (20%)</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, index) => {
          const Icon = card.icon;
          const dynamicColor = index === 0 ? 'text-emerald-300' : index === 1 ? 'text-amber-300' : index === 2 ? 'text-sky-300' : 'text-purple-300';
          return (
            <div key={index} className="glass rounded-3xl p-5 shadow-xl space-y-4 flex flex-col justify-between border border-white/10 text-white">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-white/80">{card.title}</span>
                <Icon className={`h-5 w-5 ${dynamicColor}`} />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
                  {card.value}
                  {card.unit && <span className="text-[10px] font-bold text-white/40 uppercase">{card.unit}</span>}
                </div>
                <p className="text-[10px] text-white/60 font-medium leading-relaxed">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actual vs Predicted Graph */}
      <div className="glass p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
        <div>
          <h3 className="font-bold text-white text-sm">Actual vs. Predicted Yield Output</h3>
          <p className="text-xs text-white/50 mt-0.5">Verification of test observations demonstrating highly stable regression fit lines.</p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={comparisonData}
              margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={9} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={9} />
              <Tooltip
                formatter={(value: any) => [`${formatNumber(value)} Tonnes`, '']}
                contentStyle={{ background: '#072e25', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line type="monotone" dataKey="Actual" stroke="#34d399" strokeWidth={3} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Diagnostic insights */}
      <div className="glass p-6 rounded-3xl border border-white/10 shadow-xl space-y-4 text-white">
        <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
          <HelpCircle className="h-4 w-4 text-emerald-300" /> Analytical Diagnostic Notes
        </h4>
        <div className="grid md:grid-cols-2 gap-6 text-xs text-white/80 leading-relaxed font-medium">
          <div className="space-y-3">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300 flex-none mt-0.5" />
              <span>
                <strong className="text-white">Multi-Collinearity Resilience</strong>: Decision-tree aggregators randomly select subset features at each node split, preventing highly correlated columns (like Area and Sowing Season index) from dominating trees and inflating variance.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300 flex-none mt-0.5" />
              <span>
                <strong className="text-white">No Scale Constraints</strong>: Unlike standard support vector machines or neural networks, Random Forest regression does not require continuous min-max normalization, since node partitions are completely scale-invariant.
              </span>
            </p>
          </div>
          <div className="space-y-3">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300 flex-none mt-0.5" />
              <span>
                <strong className="text-white">Data Outlier Tolerance</strong>: Extreme anomalies (such as ultra-high sugarcane output values in Kolhapur) are isolated in specific terminal nodes, preventing them from dragging down general fit lines as seen in traditional Ordinary Least Squares (OLS) models.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300 flex-none mt-0.5" />
              <span>
                <strong className="text-white">Label Encoding Consistency</strong>: Categorical features are encoded from 0 to N-1. Random Forest handles non-ordinal sequences natively because splitting thresholds don't assume continuous numerical orders.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
