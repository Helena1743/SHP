import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import UserLanding from './routes/UserLanding';
import GenerateReport from './routes/GenerateReport';
import AIHealthPrediction from './routes/AIHealthPrediction';
import HealthAnalytics from './routes/HealthAnalytics';
import UserSettings from './routes/UserSettings';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/user-landing" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-landing" element={<UserLanding />} />
        <Route path="/generate-report" element={<GenerateReport />} />
        <Route path="/ai-health-prediction" element={<AIHealthPrediction />} />
        <Route path="/health-analytics" element={<HealthAnalytics />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
