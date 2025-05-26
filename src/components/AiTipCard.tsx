import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Lightbulb, RefreshCw } from 'lucide-react';

const AiTipCard: React.FC = () => {
  const { currentTip, generateNewTip } = useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleGenerateNew = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      generateNewTip();
      setIsRefreshing(false);
    }, 600);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-blue-100 rounded-full opacity-50" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-20 h-20 bg-teal-100 rounded-full opacity-50" />
      
      <div className="flex items-start mb-4 relative z-10">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <Lightbulb className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">AI Productivity Tip</h2>
      </div>
      
      <p className="text-gray-700 mb-6 relative z-10">{currentTip}</p>
      
      <div className="flex justify-end relative z-10">
        <button
          onClick={handleGenerateNew}
          disabled={isRefreshing}
          className="flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          New Tip
        </button>
      </div>
    </div>
  );
};

export default AiTipCard;