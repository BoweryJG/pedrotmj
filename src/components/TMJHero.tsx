import React from 'react';

const TMJHero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-400/20 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
            TMJ
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-2">Precision Relief Solutions</p>
        </div>
        
        {/* Main headline */}
        <h2 className="text-4xl md:text-6xl font-light mb-6 max-w-4xl">
          Experience <span className="font-semibold text-yellow-400">Revolutionary</span> TMJ Relief
        </h2>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl">
          Advanced diagnostics and personalized treatment plans designed for your unique jaw health journey
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
            Start Your Assessment
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-gray-400 text-white font-semibold rounded-full hover:bg-gray-400 hover:text-black transform hover:scale-105 transition-all duration-300">
            Learn More
          </button>
        </div>
        
        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
            <p className="text-gray-300">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">10,000+</div>
            <p className="text-gray-300">Patients Treated</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
            <p className="text-gray-300">Support Available</p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default TMJHero;