import React from 'react';
import DailySummary from '../components/DailySummary';
import WeeklySummaryChart from '../components/WeeklySummaryChart';

const SummaryPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Productivity Summary</h1>
      
      <DailySummary />
      <WeeklySummaryChart />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Focus Insights</h2>
          
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 className="font-medium text-blue-700 mb-1">Most Productive Hours</h3>
              <p className="text-gray-700 text-sm">Your focus peaks between 9:00 AM and 11:00 AM. Schedule your most important tasks during this time.</p>
            </div>
            
            <div className="p-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg">
              <h3 className="font-medium text-emerald-700 mb-1">Break Optimization</h3>
              <p className="text-gray-700 text-sm">You've been taking consistent breaks, which has improved your overall focus duration by 15%.</p>
            </div>
            
            <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
              <h3 className="font-medium text-amber-700 mb-1">Distraction Patterns</h3>
              <p className="text-gray-700 text-sm">Most distractions occur after lunch. Consider scheduling meetings or less intensive work for this period.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievement Highlights</h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Pomodoro Streaks</h3>
                <p className="text-sm text-gray-600">Completed 3 full Pomodoro cycles without interruption</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-emerald-600 font-bold">2h</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Deep Focus</h3>
                <p className="text-sm text-gray-600">Achieved 2 hours of continuous deep focus today</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg">
              <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-amber-600 font-bold">5</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Productive Days</h3>
                <p className="text-sm text-gray-600">5-day streak of meeting your productivity goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;