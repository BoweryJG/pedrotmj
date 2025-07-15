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
    <section className="tmj-hero dark-theme">
      <div className="tmj-jaw">
        <svg viewBox="0 0 200 100" className="jaw-svg">
          <defs>
            <radialGradient id="flareGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <path
            d="M20,80 C40,60 70,60 90,70 C110,80 130,85 160,60"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
            fill="none"
            className={animate ? 'jaw-relax' : ''}
          />
          <circle
            cx="90"
            cy="70"
            r="20"
            fill="url(#flareGradient)"
            className={animate ? 'light-flare' : ''}
          />
        </svg>
        <div className={`tmj-dial ${animate ? 'spin' : ''}`}>
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
      <div className="tmj-content">
        <h1 className={animate ? 'text-fade-in' : ''}>Relief You Can Feel. Freedom You Can Live.</h1>
        <p className={animate ? 'text-fade-in' : ''}>Experience the future of TMJ therapy.</p>
        <button className={animate ? 'cta-animate' : ''} onClick={handleCTAClick}>Book Your Transformation</button>
        {animate && <audio autoPlay src="/sounds/click.mp3" />}
      </div>
    </section>
  );
};

export default TMJHeroSection;