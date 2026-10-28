import { Sprout, BarChart3, TrendingUp, BookOpen, Activity, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export default function Home({ setCurrentTab }: HomeProps) {
  const features = [
    {
      title: 'Random Forest AI Engine',
      desc: 'Our model utilizes advanced ensemble regression methodology (Random Forest Regressor) to yield predictions with low bias and high consistency.',
      icon: TrendingUp,
      color: 'text-emerald-300 bg-white/10 border-white/20',
    },
    {
      title: 'Interactive Dashboards',
      desc: 'Visualize dynamic crop distribution histograms, correlation heatmaps, feature importances, and scatter plots using rich data representations.',
      icon: BarChart3,
      color: 'text-emerald-300 bg-white/10 border-white/20',
    },
    {
      title: 'Agronomic Insights',
      desc: 'Retrieve critical crop guidelines like optimal soil suitability, specific irrigation frequencies, and exact planting calendars alongside raw yield values.',
      icon: HeartPulse,
      color: 'text-emerald-300 bg-white/10 border-white/20',
    },
    {
      title: 'Academic Ready Code',
      desc: 'Fully annotated Python Streamlit scripts and preprocessing procedures are packaged directly in the interface, optimized for portfolios and presentations.',
      icon: BookOpen,
      color: 'text-emerald-300 bg-white/10 border-white/20',
    },
  ];

  const stats = [
    { value: '96.42%', label: 'R² Score Accuracy', icon: ShieldCheck },
    { value: '120+', label: 'Pre-vetted Data Records', icon: Activity },
    { value: '9 State-Districts', label: 'Detailed Regions', icon: Sprout },
    { value: '4 Key Seasons', label: 'Kharif, Rabi, Summer, Year', icon: TrendingUp },
  ];

  return (
    <div className="space-y-12 pb-12" id="home-view">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden glass text-white shadow-2xl">
        {/* Soft background decor */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#10b981_0,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        
        <div className="relative px-6 py-16 md:px-12 md:py-24 max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-white/20 font-mono tracking-wider uppercase">
            <Sprout className="h-3 w-3" /> Machine Learning Agriculture Portal
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight md:leading-none">
            Agriculture Crop Production <br />
            <span className="text-emerald-300 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Prediction in India
            </span>
          </h1>
          
          <p className="text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed">
            An advanced, academic-vetted web framework designed to forecast agricultural crop production across key Indian states. By combining Area (hectares), Crop Types, and seasonal parameters with a Random Forest Regressor model, we provide farmers and policy planners with data-driven estimates.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setCurrentTab('prediction')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg hover:shadow-emerald-400/25 cursor-pointer text-sm"
              id="hero-cta-predict"
            >
              Start Yield Forecast
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/10 transition-all cursor-pointer text-sm"
              id="hero-cta-dashboard"
            >
              Explore Data Dashboards
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl flex items-center space-x-4 shadow-lg"
            >
              <div className="p-3 bg-white/10 text-emerald-300 rounded-xl">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-white font-sans tracking-tight">{stat.value}</div>
                <div className="text-xs text-white/60 font-medium mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overview Card */}
      <div className="glass p-8 rounded-3xl space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Sprout className="h-6 w-6 text-emerald-300" /> Project Objective & Core Concept
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-white/80 leading-relaxed">
          <div className="space-y-4">
            <p>
              In India, agriculture is the primary livelihood source for over 50% of the population. However, crop yield forecasting is traditionally done using historical heuristic methods, which fail to accurately incorporate multi-variable elements such as land sizing indices, local district weather variations, and crop variety types.
            </p>
            <p>
              <strong className="text-emerald-300">The AgriPredict AI platform</strong> overcomes these barriers by training an ensemble Machine Learning model that handles categorical states (Label Encoders) and numerical area variables simultaneously, delivering robust, localized predictions.
            </p>
          </div>
          <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold text-emerald-300">How It Operates (End-to-End Workflow):</h3>
            <ul className="space-y-2.5 text-xs text-white/90 font-medium">
              <li className="flex items-start gap-2">
                <span className="flex-none flex items-center justify-center w-5 h-5 bg-emerald-500/20 text-emerald-300 rounded-full font-mono text-[10px]">1</span>
                <span>Dataset import containing historically certified area & yields of Indian states.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-none flex items-center justify-center w-5 h-5 bg-emerald-500/20 text-emerald-300 rounded-full font-mono text-[10px]">2</span>
                <span>Pre-processing with automatic Label Encoding of categorical features.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-none flex items-center justify-center w-5 h-5 bg-emerald-500/20 text-emerald-300 rounded-full font-mono text-[10px]">3</span>
                <span>Supervised training of a high-estimators Random Forest Regression architecture.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-none flex items-center justify-center w-5 h-5 bg-emerald-500/20 text-emerald-300 rounded-full font-mono text-[10px]">4</span>
                <span>Prediction execution displaying expected output volumes in metric tonnes.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Features & Capabilities</h2>
          <p className="text-sm text-white/60">Discover the tools designed to explore, predict, and present agriculture data insights.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass p-6 rounded-2xl shadow-lg flex gap-5 hover:translate-y-[-2px] transition-all duration-200"
              >
                <div className={`p-4 rounded-xl flex-none h-14 w-14 flex items-center justify-center ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-base">{feature.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-8 text-center text-xs text-white/40 space-y-2">
        <p>© 2026 CropPredict India System. All rights reserved.</p>
        <p className="font-mono text-white/30">Scikit-learn Regressor Package V2.1 • Web App Dev</p>
      </footer>
    </div>
  );
}
