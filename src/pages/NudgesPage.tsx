import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Lightbulb, RefreshCw } from 'lucide-react';

const NudgesPage: React.FC = () => {
  const { aiTips, currentTip, generateNewTip } = useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleGenerateNew = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      generateNewTip();
      setIsRefreshing(false);
    }, 600);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">AI Productivity Nudges</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-blue-100 rounded-full opacity-50" />
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-20 h-20 bg-teal-100 rounded-full opacity-50" />
            
            <div className="flex items-start mb-4 relative z-10">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mt-1">Current Productivity Tip</h2>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6 relative z-10">
              <p className="text-lg text-gray-700">{currentTip}</p>
            </div>
            
            <div className="flex justify-end relative z-10">
              <button
                onClick={handleGenerateNew}
                disabled={isRefreshing}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Generate New Tip
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About AI Nudges</h2>
            <p className="text-gray-700 mb-4">
              Our AI productivity nudges provide timely suggestions to help you stay focused and work more effectively.
            </p>
            <p className="text-gray-700 mb-4">
              These tips are designed to address common productivity challenges and introduce proven techniques to optimize your workflow.
            </p>
            <p className="text-gray-700">
              Click "Generate New Tip" anytime you need fresh inspiration or a productivity boost.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tip Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiTips.slice(0, 6).map((tip, index) => (
            <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center mb-2">
                <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                <p className="text-sm font-medium text-gray-600">Tip #{index + 1}</p>
              </div>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NudgesPage;