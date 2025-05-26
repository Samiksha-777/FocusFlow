import React from 'react';
import MoodSelector from '../components/MoodSelector';
import MoodHistory from '../components/MoodHistory';

const MoodTrackerPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mood Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MoodSelector />
          <MoodHistory />
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Track Your Mood?</h2>
            <p className="text-gray-700 mb-4">
              Understanding your emotional patterns throughout the workday can help you identify:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start">
                <div className="h-5 w-5 text-blue-500 mr-2">•</div>
                <span>When you're most energized and focused</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 text-blue-500 mr-2">•</div>
                <span>Tasks or situations that cause stress</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 text-blue-500 mr-2">•</div>
                <span>How breaks affect your emotional state</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 text-blue-500 mr-2">•</div>
                <span>Patterns that impact your productivity</span>
              </li>
            </ul>
            <p className="text-gray-700">
              Use this data to optimize your schedule and work habits.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood Insights</h2>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-700 mb-1">Your Most Common Mood</h3>
                <p className="text-gray-700 text-sm">Productive (45% of entries)</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-700 mb-1">Mood Pattern</h3>
                <p className="text-gray-700 text-sm">Your mood tends to improve after completing focus sessions.</p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg">
                <h3 className="font-medium text-amber-700 mb-1">Improvement Opportunity</h3>
                <p className="text-gray-700 text-sm">Consider more breaks in the afternoon when tiredness is common.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTrackerPage;