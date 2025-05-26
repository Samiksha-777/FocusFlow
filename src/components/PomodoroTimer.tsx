import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PomodoroStatus } from '../types';
import { formatTime } from '../utils/formatters';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

const PomodoroTimer: React.FC = () => {
  const { 
    pomodoroStatus, 
    timeRemaining, 
    startTimer, 
    pauseTimer, 
    resetTimer,
    skipToBreak,
    skipToFocus
  } = useAppContext();
  
  const progressPercentage = (() => {
    if (pomodoroStatus === PomodoroStatus.Focus) {
      return 100 - (timeRemaining / (25 * 60)) * 100;
    } else if (pomodoroStatus === PomodoroStatus.Break) {
      return 100 - (timeRemaining / (5 * 60)) * 100;
    }
    return 0;
  })();
  
  const getStatusColor = () => {
    switch (pomodoroStatus) {
      case PomodoroStatus.Focus:
        return 'bg-blue-500';
      case PomodoroStatus.Break:
        return 'bg-emerald-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  const getStatusText = () => {
    switch (pomodoroStatus) {
      case PomodoroStatus.Focus:
        return 'Focus Time';
      case PomodoroStatus.Break:
        return 'Break Time';
      default:
        return 'Ready to Start';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{getStatusText()}</h2>
        
        <div className="w-48 h-48 rounded-full border-8 border-gray-100 flex items-center justify-center mb-6 relative">
          <div className="text-4xl font-bold">{formatTime(timeRemaining)}</div>
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={getStatusColor().replace('bg-', 'text-')}
              strokeWidth="10"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * progressPercentage) / 100}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
        </div>
        
        <div className="flex space-x-4">
          {(pomodoroStatus === PomodoroStatus.Idle || pomodoroStatus === PomodoroStatus.Break || pomodoroStatus === PomodoroStatus.Focus) && (
            <button
              onClick={() => startTimer()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition flex items-center"
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </button>
          )}
          
          {(pomodoroStatus === PomodoroStatus.Focus || pomodoroStatus === PomodoroStatus.Break) && (
            <button
              onClick={() => pauseTimer()}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition flex items-center"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </button>
          )}
          
          <button
            onClick={() => resetTimer()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition flex items-center"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </button>
          
          {pomodoroStatus === PomodoroStatus.Focus && (
            <button
              onClick={() => skipToBreak()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition flex items-center"
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip to Break
            </button>
          )}
          
          {pomodoroStatus === PomodoroStatus.Break && (
            <button
              onClick={() => skipToFocus()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition flex items-center"
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip to Focus
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;