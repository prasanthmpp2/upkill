import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Prediction from './components/Prediction';
import Dashboard from './components/Dashboard';
import Performance from './components/Performance';
import About from './components/About';
import CodeViewer from './components/CodeViewer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'prediction':
        return <Prediction />;
      case 'dashboard':
        return <Dashboard />;
      case 'performance':
        return <Performance />;
      case 'about':
        return <About />;
      case 'code':
        return <CodeViewer />;
      default:
        return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-mesh text-white flex flex-col md:flex-row font-sans" id="app-root-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Panel Content */}
      <main className="flex-1 overflow-x-hidden min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              id={`tab-content-${currentTab}`}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
