import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Clock, 
  Lightbulb, 
  BarChart, 
  SmilePlus,
  Settings
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-dark-800/50 backdrop-blur-sm border-r border-dark-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                FocusFlow
              </span>
            </div>
            
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `${isActive ? 'bg-dark-700 text-primary-400' : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'} 
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`
                }
              >
                <Home className="mr-3 flex-shrink-0 h-5 w-5" />
                Home
              </NavLink>
              
              <NavLink 
                to="/focus-timer" 
                className={({ isActive }) => 
                  `${isActive ? 'bg-dark-700 text-primary-400' : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'} 
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`
                }
              >
                <Clock className="mr-3 flex-shrink-0 h-5 w-5" />
                Focus Timer
              </NavLink>
              
              <NavLink 
                to="/nudges" 
                className={({ isActive }) => 
                  `${isActive ? 'bg-dark-700 text-primary-400' : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'} 
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`
                }
              >
                <Lightbulb className="mr-3 flex-shrink-0 h-5 w-5" />
                AI Nudges
              </NavLink>
              
              <NavLink 
                to="/summary" 
                className={({ isActive }) => 
                  `${isActive ? 'bg-dark-700 text-primary-400' : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'} 
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`
                }
              >
                <BarChart className="mr-3 flex-shrink-0 h-5 w-5" />
                Summary
              </NavLink>
              
              <NavLink 
                to="/mood-tracker" 
                className={({ isActive }) => 
                  `${isActive ? 'bg-dark-700 text-primary-400' : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'} 
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`
                }
              >
                <SmilePlus className="mr-3 flex-shrink-0 h-5 w-5" />
                Mood Tracker
              </NavLink>
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-dark-700 p-4">
            <button className="flex-shrink-0 w-full group block">
              <div className="flex items-center text-dark-400 hover:text-dark-200">
                <Settings className="mr-3 h-5 w-5" />
                <span className="text-sm font-medium">Settings</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;