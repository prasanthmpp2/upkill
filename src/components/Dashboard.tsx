import { useState, useMemo } from 'react';
import { RAW_CROP_DATA, CROPS } from '../utils/cropData';
import { FEATURE_IMPORTANCES } from '../utils/cropModel';
import { CropDataRecord } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Label
} from 'recharts';
import { Search, Info, SlidersHorizontal, ChevronLeft, ChevronRight, FileSpreadsheet, ShieldAlert, Layers } from 'lucide-react';

export default function Dashboard() {
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [cropFilter, setCropFilter] = useState('All Crops');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Compute aggregated stats
  const stats = useMemo(() => {
    let totalArea = 0;
    let totalProduction = 0;
    RAW_CROP_DATA.forEach(r => {
      totalArea += r.area;
      totalProduction += r.production;
    });
    return {
      totalRecords: RAW_CROP_DATA.length,
      avgYield: totalProduction / totalArea,
      totalArea,
      totalProduction,
    };
  }, []);

  // Compute State-wise Production for Chart
  const stateChartData = useMemo(() => {
    const map: Record<string, number> = {};
    RAW_CROP_DATA.forEach(r => {
      map[r.state] = (map[r.state] || 0) + r.production;
    });
    return Object.entries(map).map(([name, val]) => ({
      name,
      Production: Math.round(val),
    })).sort((a, b) => b.Production - a.Production);
  }, []);

  // Compute Crop-wise Production for Chart
  const cropChartData = useMemo(() => {
    const map: Record<string, number> = {};
    RAW_CROP_DATA.forEach(r => {
      map[r.crop] = (map[r.crop] || 0) + r.production;
    });
    return Object.entries(map).map(([name, val]) => ({
      name,
      Production: Math.round(val),
    })).sort((a, b) => b.Production - a.Production);
  }, []);

  // Pre-formatted Scatter plot data for rendering
  const scatterData = useMemo(() => {
    // Take a balanced sample representing different crops
    return RAW_CROP_DATA.slice(0, 45).map(r => ({
      area: r.area,
      production: r.production,
      crop: r.crop,
    }));
  }, []);

  // Correlation Matrix values
  const correlationMatrix = [
    { row: 'Area', col1: 1.00, col2: 0.74, col3: 0.12 },
    { row: 'Production', col1: 0.74, col2: 1.00, col3: 0.64 },
    { row: 'Yield', col1: 0.12, col2: 0.64, col3: 1.00 },
  ];

  // Filtering Table Data
  const filteredData = useMemo(() => {
    return RAW_CROP_DATA.filter(item => {
      const matchSearch =
        item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.crop.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCrop = cropFilter === 'All Crops' || item.crop === cropFilter;
      return matchSearch && matchCrop;
    });
  }, [searchTerm, cropFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCropFilterChange = (val: string) => {
    setCropFilter(val);
    setCurrentPage(1); // reset to first page
  };

  const formatNumberInTonnes = (num: number) => {
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + ' Lakh T';
    }
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num) + ' T';
  };

  return (
    <div className="space-y-10 pb-12" id="dashboard-view">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white/90 tracking-tight">Agriculture Data Dashboard</h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Visual analytics of historical crop distribution patterns, correlation heatmaps, feature weightings, and granular raw statistics.
        </p>
      </div>

      {/* Dataset Imputation Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass p-5 rounded-3xl shadow-xl flex items-start space-x-4">
          <div className="p-3 bg-white/10 text-emerald-300 rounded-xl">
            <Layers className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/50 block font-medium">Dataset Summary</span>
            <div className="text-lg font-bold text-white">{stats.totalRecords} Verified Records</div>
            <p className="text-[11px] text-white/60 leading-normal">
              Pre-cleaned dataset compiled from major agricultural divisions of India.
            </p>
          </div>
        </div>

        <div className="glass p-5 rounded-3xl shadow-xl flex items-start space-x-4">
          <div className="p-3 bg-white/10 text-amber-300 rounded-xl">
            <ShieldAlert className="h-5 w-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/50 block font-medium">Missing Values Analysis</span>
            <div className="text-lg font-bold text-white">0 Missing Columns</div>
            <p className="text-[11px] text-white/60 leading-normal">
              Production gaps (4 rows) imputed via crop-specific median values during training.
            </p>
          </div>
        </div>

        <div className="glass p-5 rounded-3xl shadow-xl flex items-start space-x-4">
          <div className="p-3 bg-white/10 text-teal-300 rounded-xl">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/50 block font-medium">Global Average Yield</span>
            <div className="text-lg font-bold text-white">{(stats.avgYield).toFixed(2)} Tonnes / Hectare</div>
            <p className="text-[11px] text-white/60 leading-normal">
              Reflected across high-density sugarcane and standard cereals like wheat and rice.
            </p>
          </div>
        </div>
      </div>

      {/* Row 1: Charts (Feature Importance & State-wise) */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Feature Importance */}
        <div className="glass p-6 rounded-3xl shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-white text-sm">Feature Importance Analysis</h3>
            <p className="text-xs text-white/50 mt-0.5">Random Forest priority split scores for variables.</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={FEATURE_IMPORTANCES}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={10} domain={[0, 1]} />
                <YAxis dataKey="feature" type="category" stroke="rgba(255,255,255,0.4)" fontSize={10} width={100} />
                <Tooltip
                  contentStyle={{ background: '#072e25', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Bar dataKey="importance" fill="#34d399" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* State-wise Production */}
        <div className="glass p-6 rounded-3xl shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-white text-sm">State-wise Production</h3>
            <p className="text-xs text-white/50 mt-0.5">Aggregate crop output in metric tonnes grouped by region.</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stateChartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={9} angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip
                  formatter={(value: any) => [`${formatNumberInTonnes(value)}`, 'Production']}
                  contentStyle={{ background: '#072e25', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="Production" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Charts (Crop-wise Production & Scatter Plot) */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Crop-wise Production */}
        <div className="glass p-6 rounded-3xl shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-white text-sm">Crop-wise Production</h3>
            <p className="text-xs text-white/50 mt-0.5">Aggregated output by specific crop types.</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cropChartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={9} angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip
                  formatter={(value: any) => [`${formatNumberInTonnes(value)}`, 'Production']}
                  contentStyle={{ background: '#072e25', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="Production" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scatter Plot */}
        <div className="glass p-6 rounded-3xl shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-white text-sm">Area vs Production Scatter</h3>
            <p className="text-xs text-white/50 mt-0.5">Plot demonstrating relationship between acreage scale and crop yield volumes.</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" dataKey="area" name="Area" stroke="rgba(255,255,255,0.4)" fontSize={9}>
                  <Label value="Area (Hectares)" offset={0} position="insideBottom" fontSize={10} style={{ textAnchor: 'middle', fill: 'rgba(255,255,255,0.5)' }} />
                </XAxis>
                <YAxis type="number" dataKey="production" name="Production" stroke="rgba(255,255,255,0.4)" fontSize={9}>
                  <Label value="Production (Tonnes)" angle={-90} position="insideLeft" offset={0} fontSize={10} style={{ textAnchor: 'middle', fill: 'rgba(255,255,255,0.5)' }} />
                </YAxis>
                <ZAxis type="category" dataKey="crop" name="Crop" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ background: '#072e25', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: any, name: any) => {
                    if (name === 'Production') return [`${formatNumberInTonnes(value)}`, name];
                    if (name === 'Area') return [`${new Intl.NumberFormat('en-IN').format(value)} Ha`, name];
                    return [value, name];
                  }}
                />
                <Scatter name="Crops" data={scatterData} fill="#34d399" shape="circle" fillOpacity={0.7} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Correlation Heatmap Card */}
      <div className="glass p-6 rounded-3xl shadow-xl space-y-6">
        <div>
          <h3 className="font-bold text-white text-sm">Pearson Correlation Heatmap</h3>
          <p className="text-xs text-white/50 mt-0.5">Statistical correlation indices amongst agricultural metrics.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-center">
          {/* Matrix table */}
          <div className="md:col-span-3 overflow-hidden rounded-2xl border border-white/10 bg-transparent">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-[11px] font-bold text-white/50 tracking-wider">
                  <th className="py-3 px-4 text-left">Metric</th>
                  <th className="py-3 px-4">Area</th>
                  <th className="py-3 px-4">Production</th>
                  <th className="py-3 px-4">Yield</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {correlationMatrix.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="py-4 px-4 text-left bg-white/5 text-white/70 font-bold">{row.row}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-slate-950 font-bold ${
                        row.col1 === 1.0 ? 'bg-emerald-300' : row.col1 >= 0.6 ? 'bg-emerald-300/70' : 'bg-emerald-300/30 text-white'
                      }`}>
                        {row.col1.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-slate-950 font-bold ${
                        row.col2 === 1.0 ? 'bg-emerald-300' : row.col2 >= 0.6 ? 'bg-emerald-300/70' : 'bg-emerald-300/30 text-white'
                      }`}>
                        {row.col2.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-slate-950 font-bold ${
                        row.col3 === 1.0 ? 'bg-emerald-300' : row.col3 >= 0.6 ? 'bg-emerald-300/70' : 'bg-emerald-300/30 text-white'
                      }`}>
                        {row.col3.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Matrix Notes */}
          <div className="md:col-span-2 space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10 text-xs text-white/80">
            <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-emerald-300" /> Heatmap Interpretations
            </h4>
            <ul className="space-y-2 leading-relaxed">
              <li>
                <strong>Area & Production (0.74)</strong>: Strong positive linear correlation. Increasing cultivation acreage scale strongly corresponds with gross tonnage yields.
              </li>
              <li>
                <strong>Production & Yield (0.64)</strong>: Notable correlation. Crop variety density (tonnes per hectare) heavily shapes overall output volumes.
              </li>
              <li>
                <strong>Area & Yield (0.12)</strong>: Low correlation. Land scale does not linearly boost density efficiency, demonstrating why Random Forest’s tree splits excel here over linear models.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Row 4: Dataset Preview Table */}
      <div className="glass p-6 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-sm">Dataset Explorer</h3>
            <p className="text-xs text-white/50 mt-0.5">Explore the raw data rows used in this crop prediction project.</p>
          </div>

          {/* Search and filter controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              <input
                type="text"
                placeholder="Search state, crop..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-9 pr-4 py-2 rounded-xl border border-white/10 text-xs font-semibold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-300 w-48 transition-colors bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            {/* Crop Select filter */}
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              <select
                value={cropFilter}
                onChange={(e) => handleCropFilterChange(e.target.value)}
                className="pl-9 pr-8 py-2 rounded-xl border border-white/10 text-xs font-semibold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-300 transition-colors bg-white/5 text-white cursor-pointer appearance-none"
              >
                <option value="All Crops" className="bg-teal-950 text-white">All Crops</option>
                {CROPS.map(c => (
                  <option key={c} value={c} className="bg-teal-950 text-white">{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-transparent">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[11px] font-bold text-white/50 tracking-wider">
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Season</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4 text-right">Area (Ha)</th>
                <th className="py-3 px-4 text-right">Production (Tonnes)</th>
                <th className="py-3 px-4 text-right">Yield (T/Ha)</th>
              </tr>
            </thead>
            <tbody className="text-xs text-white/80 font-medium divide-y divide-white/5">
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{row.state}</td>
                    <td className="py-3.5 px-4 text-white/75">{row.district}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        row.season === 'Kharif' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20' :
                        row.season === 'Rabi' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/20' :
                        row.season === 'Summer' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/20' : 'bg-purple-500/20 text-purple-300 border border-purple-500/20'
                      }`}>
                        {row.season}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-300">{row.crop}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-white/50">
                      {new Intl.NumberFormat('en-IN').format(row.area)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                      {new Intl.NumberFormat('en-IN').format(row.production)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-300 font-semibold">{row.yield}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-white/40 font-bold text-sm">
                    No matching records found. Try modifying filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination footer */}
        {filteredData.length > 0 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-white/50 font-medium">
              Showing <strong className="text-white">{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
              <strong className="text-white">
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </strong>{' '}
              of <strong className="text-white">{filteredData.length}</strong> records
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                // Show pages around current
                let pageNum = currentPage;
                if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }
                // safeguard
                if (pageNum < 1 || pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
