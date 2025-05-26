import React from 'react';
import { generateMockWeeklyStats } from '../utils/mockData';
import { BarChart, Clock, AlertTriangle } from 'lucide-react';

const WeeklySummaryChart: React.FC = () => {
  const weeklyStats = generateMockWeeklyStats();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Find maximum values for scaling
  const maxFocusMinutes = Math.max(...weeklyStats.map(day => day.focusedMinutes));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-6">
        <BarChart className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Weekly Summary</h2>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Clock className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-md font-medium text-gray-700">Focus Time (minutes)</h3>
        </div>
        
        <div className="flex h-40 items-end">
          {weeklyStats.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full max-w-[30px] bg-blue-500 rounded-t transition-all duration-500"
                style={{ 
                  height: `${(day.focusedMinutes / maxFocusMinutes) * 100}%`,
                  opacity: day.focusedMinutes === 0 ? 0.3 : 1
                }}
              />
              <div className="text-xs text-gray-600 mt-2">{daysOfWeek[index]}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          <h3 className="text-md font-medium text-gray-700">Distractions</h3>
        </div>
        
        <div className="flex h-24 items-end">
          {weeklyStats.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full max-w-[30px] bg-amber-500 rounded-t transition-all duration-500"
                style={{ 
                  height: `${(day.distractions / 15) * 100}%`,
                  opacity: day.distractions === 0 ? 0.3 : 1
                }}
              />
              <div className="text-xs text-gray-600 mt-2">{daysOfWeek[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklySummaryChart;