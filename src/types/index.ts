export enum MoodType {
  Happy = 'happy',
  Productive = 'productive',
  Neutral = 'neutral',
  Tired = 'tired',
  Stressed = 'stressed',
}

export enum PomodoroStatus {
  Idle = 'idle',
  Focus = 'focus',
  Break = 'break',
}

export interface DailyStats {
  date: string;
  focusedMinutes: number;
  breakMinutes: number;
  distractions: number;
  completedPomodoros: number;
  averageMood: MoodType;
}