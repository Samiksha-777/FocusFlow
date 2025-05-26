import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const DailySummary: React.FC = () => {
  const { focusedTime, breakTime, distractions } = useAppContext();
  
  const stats = [
    {
      name: 'Focus Time',
      value: `${focusedTime} min`,
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Break Time',
      value: `${breakTime} min`,
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      color: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      name: 'Distractions',
      value: distractions.toString(),
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      color: 'bg-amber-50',
      textColor: 'text-amber-700'
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.color} p-4 rounded-lg flex items-center`}
          >
            <div className="mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className={`text-xl font-semibold ${stat.textColor}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailySummary;