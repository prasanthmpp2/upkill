import { FileSpreadsheet, Cpu, Layers, ListChecks, HelpCircle, Flame, Sparkles, BookOpen } from 'lucide-react';

export default function About() {
  const objectives = [
    'Model high-precision crop yields based on input region, crop category, and sizing metrics.',
    'Mitigate risk for regional Indian farmers by providing quantitative pre-sow estimates.',
    'Enable structured agricultural planning regarding fertilizer usage, storage, and logistical assets.',
    'Deliver actionable insights such as appropriate soil types and planting periods.',
  ];

  const workflow = [
    { title: 'Data Cleaning', desc: 'Removing zero area rows, handling missing values in production columns using median substitution grouped by crop types, and removing extreme anomalies.' },
    { title: 'Label Encoding', desc: 'Transforming categorical features (State, District, Season, Crop) to numeric values utilizing Label Encoders, saving mappings for runtime deployment.' },
    { title: 'Train-Test Split', desc: 'Partitioning dataset records into 80% Training and 20% Testing subsets, ensuring random distribution and balanced target ratios.' },
    { title: 'Ensemble Fitting', desc: 'Fitting a Random Forest Regression architecture using 100 decision estimators, leveraging bootstrap aggregation to control over-fitting.' },
    { title: 'Evaluation & Save', desc: 'Validating model outputs using Out-of-Bag (OOB) scoring, MAE, and R² scores, then serializing components to .pkl files via Joblib.' },
  ];

  const technologies = [
    { name: 'Python', role: 'Primary Language for ML & Scripting' },
    { name: 'Streamlit', role: 'Python Dashboard Framework (Deployment Target)' },
    { name: 'Pandas & NumPy', role: 'Matrix Operations & DataFrame Analysis' },
    { name: 'Scikit-learn', role: 'Label Encoders & Random Forest Regressor Model' },
    { name: 'Matplotlib & Plotly', role: 'Advanced Correlation & Heatmap Graphics' },
    { name: 'Joblib', role: 'Object Serialization for Trained Model Packages' },
  ];

  return (
    <div className="space-y-10 pb-12" id="about-view">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white/90 tracking-tight">About the Project</h1>
        <p className="text-sm text-white/60 max-w-2xl">
          An exploration into predictive agronomy, optimizing agricultural forecasting in India using ensemble regression models.
        </p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Side: Problem & Objectives */}
        <div className="md:col-span-2 space-y-6">
          {/* Problem Statement */}
          <div className="glass p-6 rounded-3xl shadow-xl space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-300 animate-pulse" /> Problem Statement
            </h2>
            <div className="text-sm text-white/80 space-y-3 leading-relaxed">
              <p>
                India is historically prone to volatile monsoon patterns and micro-climate fluctuations. Farmers traditionally rely on conventional ancestral wisdom or coarse historical averages to select crops and estimate yields. 
              </p>
              <p>
                Because factors like land size (Area) and region parameters are highly non-linear in their interaction with specific crops, there is an urgent need for an AI-powered system that models these variables. Overestimating crop production leads to market surpluses and pricing collapses, while underestimating leads to localized food security risks.
              </p>
            </div>
          </div>

          {/* Objectives */}
          <div className="glass p-6 rounded-3xl shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-emerald-300" /> Key Project Objectives
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white leading-relaxed font-medium">
                  • {obj}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Dataset Description */}
        <div className="glass p-6 rounded-3xl shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-emerald-300" /> Dataset Description
          </h2>
          <div className="text-xs text-white/80 space-y-4 leading-relaxed">
            <p>
              The model uses real-world parameters modeled from Ministry of Agriculture, India historical data archives.
            </p>
            <div className="space-y-3">
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                <span className="font-semibold text-white block font-mono">State / District</span>
                Categorical features identifying location.
              </div>
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                <span className="font-semibold text-white block font-mono">Crop Season</span>
                Kharif, Rabi, Summer, or Whole Year cycle.
              </div>
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                <span className="font-semibold text-white block font-mono">Crop Name</span>
                Food crops, commercial fibers, and oily seeds.
              </div>
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                <span className="font-semibold text-white block font-mono">Area (Hectares)</span>
                Continuous numerical input representing land size.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Learning Workflow */}
      <div className="glass p-8 rounded-3xl shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <Cpu className="h-5 w-5 text-emerald-300" /> Machine Learning Preprocessing & Training Workflow
        </h2>
        
        <div className="grid sm:grid-cols-5 gap-6">
          {workflow.map((flow, index) => (
            <div key={index} className="relative space-y-2">
              {/* Connector line for large screens */}
              {index < 4 && (
                <div className="hidden sm:block absolute top-4 left-1/2 w-full h-[2px] bg-white/10 -z-0" />
              )}
              <div className="relative z-10 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs font-mono shadow-sm">
                0{index + 1}
              </div>
              <h3 className="font-bold text-white text-sm">{flow.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{flow.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies & Advantages */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Technologies card */}
        <div className="glass p-6 rounded-3xl shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-300" /> Technology Stack
          </h2>
          <div className="grid gap-2.5">
            {technologies.map((tech, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="font-semibold text-sm text-white font-mono">{tech.name}</span>
                <span className="text-xs text-white/60 text-right">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages & Future Enhancements */}
        <div className="glass p-6 rounded-3xl shadow-xl space-y-6 text-white">
          {/* Advantages */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-300" /> Key Project Advantages
            </h3>
            <ul className="list-disc pl-5 text-xs text-white/80 space-y-2 leading-relaxed">
              <li><strong>Robust Predictions</strong>: Random Forest ensemble handles complex interactions without high variance.</li>
              <li><strong>Easy Local Deployment</strong>: The entire environment runs locally via Streamlit with a simple CLI command.</li>
              <li><strong>Highly Interpretable</strong>: Yield factors are transparent and can be easily audited.</li>
            </ul>
          </div>

          {/* Future Enhancements */}
          <div className="space-y-3 border-t border-white/10 pt-5">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-300" /> Future Planned Enhancements
            </h3>
            <ul className="list-disc pl-5 text-xs text-white/80 space-y-2 leading-relaxed">
              <li>Integration of live weather API forecasts (precipitation and land surface temperatures).</li>
              <li>Enriching the regressor using XGBoost, LightGBM, or deep Neural Networks.</li>
              <li>Market pricing predictions for crops based on predicted output trends.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
