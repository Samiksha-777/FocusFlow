import { DailyStats, MoodType } from '../types';

export const generateMockTips = (): string[] => {
  return [
    "Try the 'two-minute rule': If a task takes less than two minutes, do it immediately.",
    "Schedule your most challenging tasks during your peak energy hours.",
    "Take a short break and do some quick stretches to boost your energy.",
    "Consider grouping similar tasks together to reduce context switching.",
    "Drink a glass of water - staying hydrated improves cognitive function.",
    "Try the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break.",
    "Clear your desk of any distractions before starting your next task.",
    "Write down your three most important tasks for the day and focus on those first.",
    "Take a moment to practice deep breathing if you're feeling stressed.",
    "Consider turning off notifications for the next hour to maintain focus.",
    "Try standing up for your next meeting or phone call to boost energy.",
    "Schedule dedicated time for email checking rather than constantly monitoring it.",
    "Take a short walk outside to refresh your mind between tasks.",
    "Set a clear end time for your workday to prevent burnout.",
    "Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds."
  ];
};

export const generateMockWeeklyStats = (): DailyStats[] => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  return days.map((day, index) => {
    const dayDiff = index - dayOfWeek;
    const date = new Date();
    date.setDate(today.getDate() + dayDiff);
    
    // Past days have data, future days are empty
    if (dayDiff > 0) {
      return {
        date: date.toISOString().split('T')[0],
        focusedMinutes: 0,
        breakMinutes: 0,
        distractions: 0,
        completedPomodoros: 0,
        averageMood: MoodType.Neutral
      };
    }
    
    // Generate random data for past days
    const focusedMinutes = Math.floor(Math.random() * 240) + 30;
    const breakMinutes = Math.floor(focusedMinutes / 5);
    const distractions = Math.floor(Math.random() * 15);
    const completedPomodoros = Math.floor(focusedMinutes / 25);
    
    const moods = [MoodType.Happy, MoodType.Productive, MoodType.Neutral, MoodType.Tired, MoodType.Stressed];
    const moodIndex = Math.floor(Math.random() * moods.length);
    
    return {
      date: date.toISOString().split('T')[0],
      focusedMinutes,
      breakMinutes,
      distractions,
      completedPomodoros,
      averageMood: moods[moodIndex]
    };
  });
};