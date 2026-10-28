import { Sprout, Home, Info, TrendingUp, BarChart3, Cpu, FileCode, Menu, X } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ currentTab, setCurrentTab, isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { id: 'home', name: 'Home Page', icon: Home },
    { id: 'prediction', name: 'Crop Prediction', icon: TrendingUp },
    { id: 'dashboard', name: 'Data Dashboard', icon: BarChart3 },
    { id: 'performance', name: 'Model Performance', icon: Cpu },
    { id: 'about', name: 'About Project', icon: Info },
    { id: 'code', name: 'Python Codebase', icon: FileCode },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between glass-dark text-white px-4 py-3 sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-emerald-300" id="mobile-logo-icon" />
          <span className="font-bold text-sm tracking-tight text-white/90">AgriPredict AI</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-white/80 hover:text-white focus:outline-none"
          id="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 glass-dark text-white flex flex-col transition-transform duration-300 transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:sticky md:top-0 md:h-screen`}
        id="app-sidebar"
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center space-x-3 bg-white/5">
          <div className="bg-white/10 p-2 rounded-xl text-emerald-300">
            <Sprout className="h-6 w-6 animate-pulse" id="brand-logo-icon" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white/90 leading-tight">AgriPredict</h1>
            <p className="text-xs text-emerald-300/80 font-mono">v2.1 (India)</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/20 font-semibold shadow-lg'
                    : 'hover:bg-white/5 text-white/70 hover:text-white hover:translate-x-1'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-300' : 'text-emerald-400/80'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Project Context Footer - Model Status */}
        <div className="p-5 border-t border-white/10 bg-black/10">
          <div className="glass p-3 rounded-xl">
            <div className="text-[10px] uppercase opacity-60 mb-1.5 tracking-wider font-semibold">Model Status</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              <span className="text-xs font-mono text-emerald-300">RandomForest v2.1</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
