import React from 'react';
import { useAppContext } from '../context/AppContext';
import { MoodType } from '../types';
import { Smile, ThumbsUp, Meh, Battery, Frown } from 'lucide-react';
import { formatTimeOfDay } from '../utils/formatters';

const MoodHistory: React.FC = () => {
  const { moodHistory } = useAppContext();
  
  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case MoodType.Happy:
        return <Smile className="h-5 w-5 text-yellow-500" />;
      case MoodType.Productive:
        return <ThumbsUp className="h-5 w-5 text-blue-500" />;
      case MoodType.Neutral:
        return <Meh className="h-5 w-5 text-gray-500" />;
      case MoodType.Tired:
        return <Battery className="h-5 w-5 text-amber-500" />;
      case MoodType.Stressed:
        return <Frown className="h-5 w-5 text-red-500" />;
    }
  };
  
  const getMoodLabel = (mood: MoodType) => {
    return mood.charAt(0).toUpperCase() + mood.slice(1);
  };
  
  if (moodHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood History</h2>
        <p className="text-gray-500 text-center py-6">No mood entries yet. Start logging your mood!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood History</h2>
      
      <div className="space-y-4">
        {[...moodHistory].reverse().map((entry, index) => (
          <div key={index} className="flex items-center p-3 border-b border-gray-100 last:border-0">
            <div className="mr-4">
              {getMoodIcon(entry.mood)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{getMoodLabel(entry.mood)}</p>
            </div>
            <div className="text-sm text-gray-500">
              {formatTimeOfDay(entry.timestamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodHistory;