import React from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FocusTimerPage from './pages/FocusTimerPage';
import NudgesPage from './pages/NudgesPage';
import SummaryPage from './pages/SummaryPage';
import MoodTrackerPage from './pages/MoodTrackerPage';

function App() {
  // Add dark mode by default
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/focus-timer" element={<FocusTimerPage />} />
            <Route path="/nudges" element={<NudgesPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/mood-tracker" element={<MoodTrackerPage />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;