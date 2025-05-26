import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateMockTips } from '../utils/mockData';
import { MoodType, PomodoroStatus } from '../types';
import { aiService } from '../services/AIService';

interface AppContextType {
  tabCount: number;
  isActive: boolean;
  aiTips: string[];
  currentTip: string;
  generateNewTip: () => void;
  pomodoroStatus: PomodoroStatus;
  setPomodoroStatus: React.Dispatch<React.SetStateAction<PomodoroStatus>>;
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  focusedTime: number;
  breakTime: number;
  distractions: number;
  moodHistory: { mood: MoodType; timestamp: Date }[];
  logMood: (mood: MoodType) => void;
  resetTimer: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  skipToBreak: () => void;
  skipToFocus: () => void;
  startFocusSession: () => void;
}

const defaultContext: AppContextType = {
  tabCount: 0,
  isActive: true,
  aiTips: [],
  currentTip: '',
  generateNewTip: () => {},
  pomodoroStatus: PomodoroStatus.Idle,
  setPomodoroStatus: () => {},
  timeRemaining: 25 * 60,
  setTimeRemaining: () => {},
  focusedTime: 0,
  breakTime: 0,
  distractions: 0,
  moodHistory: [],
  logMood: () => {},
  resetTimer: () => {},
  startTimer: () => {},
  pauseTimer: () => {},
  skipToBreak: () => {},
  skipToFocus: () => {},
  startFocusSession: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  
  // Initialize AI Service
  useEffect(() => {
    aiService.initialize().catch(console.error);
  }, []);
  
  // Tab tracking
  const [tabCount, setTabCount] = useState(1);
  
  // Activity tracking
  const [isActive, setIsActive] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  // AI Tips
  const [aiTips, setAiTips] = useState<string[]>([]);
  const [currentTip, setCurrentTip] = useState('');
  
  // Pomodoro Timer
  const [pomodoroStatus, setPomodoroStatus] = useState<PomodoroStatus>(PomodoroStatus.Idle);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Stats
  const [focusedTime, setFocusedTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [distractions, setDistractions] = useState(0);
  
  // Mood Tracking
  const [moodHistory, setMoodHistory] = useState<{ mood: MoodType; timestamp: Date }[]>([]);

  // Tab tracking logic
  useEffect(() => {
    const trackTabs = () => {
      // In a real app, this would use the browser's tab API
      // For demo, we'll simulate tab changes
      const randomChange = Math.random();
      setTabCount(prev => {
        if (randomChange < 0.3) return Math.max(1, prev - 1);
        if (randomChange > 0.7) return prev + 1;
        return prev;
      });
      
      // Count tab changes as distractions during focus time
      if (pomodoroStatus === PomodoroStatus.Focus) {
        setDistractions(prev => prev + 1);
      }
    };
    
    const tabInterval = setInterval(trackTabs, 30000);
    return () => clearInterval(tabInterval);
  }, [pomodoroStatus]);

  // Activity tracking
  useEffect(() => {
    const checkActivity = () => {
      if (Date.now() - lastActivity > 60000) {
        setIsActive(false);
        if (pomodoroStatus === PomodoroStatus.Focus) {
          pauseTimer();
        }
      }
    };
    
    const activityInterval = setInterval(checkActivity, 10000);
    
    const handleActivity = () => {
      setLastActivity(Date.now());
      setIsActive(true);
    };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    
    return () => {
      clearInterval(activityInterval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [pomodoroStatus]);

  // Initialize AI tips
  useEffect(() => {
    const tips = generateMockTips();
    setAiTips(tips);
    setCurrentTip(tips[0]);
  }, []);

  const generateNewTip = useCallback(async () => {
    try {
      const context = {
        timeOfDay: new Date().getHours(),
        currentMood: moodHistory[moodHistory.length - 1]?.mood,
        focusedTime,
        breakTime,
        distractions,
      };

      const tip = await aiService.generateProductivityTip(context);
      setCurrentTip(tip);
    } catch (error) {
      // Fallback to mock tips if AI service fails
      const tips = generateMockTips();
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
    }
  }, [moodHistory, focusedTime, breakTime, distractions]);

  const logMood = useCallback((mood: MoodType) => {
    setMoodHistory(prev => [...prev, { mood, timestamp: new Date() }]);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerInterval) clearInterval(timerInterval);
    setTimerInterval(null);
    setPomodoroStatus(PomodoroStatus.Idle);
    setTimeRemaining(25 * 60);
  }, [timerInterval]);

  const startTimer = useCallback(() => {
    if (timerInterval) return;
    
    const status = timeRemaining === 25 * 60 ? PomodoroStatus.Focus : pomodoroStatus;
    setPomodoroStatus(status === PomodoroStatus.Idle ? PomodoroStatus.Focus : status);
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Timer finished
          const audio = new Audio('/notification.mp3');
          audio.play().catch(e => console.log('Audio play failed:', e));
          
          if (pomodoroStatus === PomodoroStatus.Focus) {
            setPomodoroStatus(PomodoroStatus.Break);
            setFocusedTime(prev => prev + 25);
            return 5 * 60; // 5 minute break
          } else {
            setPomodoroStatus(PomodoroStatus.Focus);
            setBreakTime(prev => prev + 5);
            return 25 * 60; // 25 minute focus
          }
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimerInterval(interval);
  }, [timerInterval, timeRemaining, pomodoroStatus]);

  const pauseTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timerInterval]);

  const skipToBreak = useCallback(() => {
    pauseTimer();
    setPomodoroStatus(PomodoroStatus.Break);
    setTimeRemaining(5 * 60);
    setFocusedTime(prev => prev + Math.floor((25 * 60 - timeRemaining) / 60));
  }, [timeRemaining]);

  const skipToFocus = useCallback(() => {
    pauseTimer();
    setPomodoroStatus(PomodoroStatus.Focus);
    setTimeRemaining(25 * 60);
    setBreakTime(prev => prev + Math.floor((5 * 60 - timeRemaining) / 60));
  }, [timeRemaining]);

  const startFocusSession = useCallback(() => {
    navigate('/focus-timer');
    resetTimer();
    startTimer();
  }, [navigate]);

  return (
    <AppContext.Provider
      value={{
        tabCount,
        isActive,
        aiTips,
        currentTip,
        generateNewTip,
        pomodoroStatus,
        setPomodoroStatus,
        timeRemaining,
        setTimeRemaining,
        focusedTime,
        breakTime,
        distractions,
        moodHistory,
        logMood,
        resetTimer,
        startTimer,
        pauseTimer,
        skipToBreak,
        skipToFocus,
        startFocusSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};