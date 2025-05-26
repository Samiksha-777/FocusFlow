import React from 'react';
import AiTipCard from '../components/AiTipCard';
import DailySummary from '../components/DailySummary';
import { getTimeOfDayGreeting } from '../utils/formatters';
import { useAppContext } from '../context/AppContext';
import { Play } from 'lucide-react';

const HomePage: React.FC = () => {
  const { startFocusSession } = useAppContext();
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-50 mb-6">
        {getTimeOfDayGreeting()}! Welcome to FocusFlow
      </h1>
      
      <div className="bg-gradient-to-r from-primary-600/20 to-accent-600/20 backdrop-blur-sm rounded-lg shadow-lg border border-dark-700 p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-dark-50">Ready to boost your productivity?</h2>
        <p className="mb-4 text-dark-300">Track your focus, get AI-powered tips, and optimize your workflow.</p>
        <button 
          onClick={startFocusSession}
          className="flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
        >
          <Play className="h-5 w-5 mr-2" />
          Start Focus Session
        </button>
      </div>
      
      <AiTipCard />
      <DailySummary />
    </div>
  );
};

export default HomePage;