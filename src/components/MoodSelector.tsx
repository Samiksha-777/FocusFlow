import React from 'react';
import { useAppContext } from '../context/AppContext';
import { MoodType } from '../types';
import { Smile, ThumbsUp, Meh, Battery, Frown } from 'lucide-react';

interface MoodOptionProps {
  type: MoodType;
  icon: React.ReactNode;
  label: string;
  onClick: (mood: MoodType) => void;
}

const MoodOption: React.FC<MoodOptionProps> = ({ type, icon, label, onClick }) => {
  return (
    <button
      onClick={() => onClick(type)}
      className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-all"
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
};

const MoodSelector: React.FC = () => {
  const { logMood } = useAppContext();
  
  const handleMoodSelection = (mood: MoodType) => {
    logMood(mood);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling?</h2>
      
      <div className="flex justify-between">
        <MoodOption
          type={MoodType.Happy}
          icon={<Smile className="h-8 w-8 text-yellow-500" />}
          label="Happy"
          onClick={handleMoodSelection}
        />
        
        <MoodOption
          type={MoodType.Productive}
          icon={<ThumbsUp className="h-8 w-8 text-blue-500" />}
          label="Productive"
          onClick={handleMoodSelection}
        />
        
        <MoodOption
          type={MoodType.Neutral}
          icon={<Meh className="h-8 w-8 text-gray-500" />}
          label="Neutral"
          onClick={handleMoodSelection}
        />
        
        <MoodOption
          type={MoodType.Tired}
          icon={<Battery className="h-8 w-8 text-amber-500" />}
          label="Tired"
          onClick={handleMoodSelection}
        />
        
        <MoodOption
          type={MoodType.Stressed}
          icon={<Frown className="h-8 w-8 text-red-500" />}
          label="Stressed"
          onClick={handleMoodSelection}
        />
      </div>
    </div>
  );
};

export default MoodSelector;