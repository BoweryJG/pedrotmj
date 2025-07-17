import React, { useEffect, useState } from 'react';
import './TMJHeroSection.css';

interface TMJHeroSectionProps {
  onCTAClick?: () => void;
}

const TMJHeroSection: React.FC<TMJHeroSectionProps> = ({ onCTAClick }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="tmj-hero">
      <div className="hero-content">
        <div className="hero-visual">
          <svg viewBox="0 0 300 200" className="jaw-svg">
            <defs>
              <radialGradient id="goldenPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(212, 175, 55, 0.8)" />
                <stop offset="50%" stopColor="rgba(255, 215, 0, 0.4)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="jawGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
                <stop offset="50%" stopColor="rgba(212, 175, 55, 0.6)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
              </linearGradient>
            </defs>
            
            {/* Anatomical Jaw Path */}
            <path
              d="M50,140 Q80,120 110,125 Q130,130 150,125 Q170,120 190,115 Q210,110 240,120 Q260,125 280,130"
              stroke="url(#jawGradient)"
              strokeWidth="3"
              fill="none"
              className={animate ? 'jaw-relax' : 'jaw-tense'}
            />
            
            {/* TMJ Joint Marker */}
            <circle
              cx="150"
              cy="125"
              r="4"
              fill="#D4AF37"
              className={animate ? 'tmj-marker' : ''}
            />
            
            {/* Golden Pulse Ring */}
            <circle
              cx="150"
              cy="125"
              r="30"
              fill="url(#goldenPulse)"
              className={animate ? 'golden-pulse' : ''}
            />
          </svg>
          
          <div className={`tmj-dial ${animate ? 'spin' : ''}`}>
            <div className="dial-outer-ring"></div>
            <div className="tmj-dial-screws">
              <div className="screw screw-1"></div>
              <div className="screw screw-2"></div>
              <div className="screw screw-3"></div>
              <div className="screw screw-4"></div>
            </div>
            <div className="tmj-dial-center"></div>
            <div className={`tmj-pulse ${animate ? 'pulse-animate' : ''}`} />
            <div className="tmj-glints">
              <span className="glint glint-1"></span>
              <span className="glint glint-2"></span>
              <span className="glint glint-3"></span>
            </div>
            <div className="tmj-glare-overlay" />
          </div>
        </div>
        
        <div className="hero-text">
          <h1 className={animate ? 'text-fade-in' : ''}>Unlock the Jaw of Life</h1>
          <p className={animate ? 'text-fade-in' : ''}>Precision-engineered TMJ therapy that transforms pain into freedom.</p>
          <button className={animate ? 'cta-animate' : ''} onClick={handleCTAClick}>
            Begin Your Transformation
          </button>
          {animate && <audio autoPlay src="/sounds/click.mp3" />}
        </div>
      </div>
    </section>
  );
};

export default TMJHeroSection;