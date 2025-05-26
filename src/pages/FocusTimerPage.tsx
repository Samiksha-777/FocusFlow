import React from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import AiTipCard from '../components/AiTipCard';

const FocusTimerPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Focus Timer</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PomodoroTimer />
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use the Focus Timer</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">1</span>
                <span>Start the timer to begin a 25-minute focus session</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">2</span>
                <span>After 25 minutes, take a 5-minute break</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">3</span>
                <span>Repeat the cycle to maximize productivity</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">4</span>
                <span>After 4 cycles, consider taking a longer break (15-30 minutes)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <AiTipCard />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Benefits of the Pomodoro Technique</h2>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-700 mb-1">Improved Focus</h3>
                <p className="text-gray-700 text-sm">Break work into manageable chunks to maintain concentration</p>
              </div>
              
              <div className="p-3 bg-emerald-50 rounded-lg">
                <h3 className="font-medium text-emerald-700 mb-1">Reduced Mental Fatigue</h3>
                <p className="text-gray-700 text-sm">Regular breaks prevent burnout and maintain energy levels</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-700 mb-1">Increased Productivity</h3>
                <p className="text-gray-700 text-sm">Time constraints create a sense of urgency and help combat procrastination</p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg">
                <h3 className="font-medium text-amber-700 mb-1">Better Time Management</h3>
                <p className="text-gray-700 text-sm">Learn to estimate task duration and allocate time more effectively</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimerPage;