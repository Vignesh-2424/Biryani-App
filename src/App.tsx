import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import ReviewPage from './ReviewPage';
import MenuPreviewPage from './MenuPreviewPage';
import FinalPage from './FinalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/menu-preview" element={<MenuPreviewPage />} />
        <Route path="/final" element={<FinalPage />} />
      </Routes>
    </Router>
  );
}

export default App;