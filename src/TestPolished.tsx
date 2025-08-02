import React from 'react';
import TMJHeroSectionPolished from './components/TMJHeroSection-Polished';
import './luxury.css';
import './animations.css';

const TestPolished: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <TMJHeroSectionPolished />
    </div>
  );
};

export default TestPolished;