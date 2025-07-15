import React from 'react';
import TMJHero from './components/TMJHero';
import TMJSymptomChecker from './components/TMJSymptomChecker';
import TMJTimeline from './components/TMJTimeline';
import TMJTechnology from './components/TMJTechnology';
import TMJTestimonials from './components/TMJTestimonials';
import TMJChat from './components/TMJChat';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <TMJHero />
      <TMJSymptomChecker />
      <TMJTimeline />
      <TMJTechnology />
      <TMJTestimonials />
      <TMJChat />
    </div>
  );
}

export default App;