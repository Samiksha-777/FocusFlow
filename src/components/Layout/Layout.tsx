import React from 'react';
import Sidebar from './Sidebar';
import { useAppContext } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { tabCount, isActive } = useAppContext();
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-dark-800/50 backdrop-blur-sm border-b border-dark-700 shadow-lg z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              FocusFlow
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-dark-400">Tabs:</span>
                <span className="px-2 py-1 bg-dark-700 text-primary-400 rounded-md text-sm font-medium">
                  {tabCount}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-dark-400">Status:</span>
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-2 ${isActive ? 'bg-accent-500 animate-pulse' : 'bg-dark-600'}`} />
                  <span className="text-sm font-medium text-dark-300">
                    {isActive ? 'Active' : 'Idle'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-dark-900/50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;