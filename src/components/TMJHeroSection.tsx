import React, { useEffect, useState } from 'react';
import './TMJHeroSection.css';

const TMJHeroSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timeout);
  }, []);

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
            <path
              d="M40,160 Q75,130 110,140 Q140,150 180,145 Q210,140 250,120"
              stroke="url(#jawGradient)"
              strokeWidth="3"
              fill="none"
              className={animate ? 'jaw-relax' : 'jaw-tense'}
            />
            <circle
              cx="180"
              cy="145"
              r="4"
              fill="#D4AF37"
              className={animate ? 'tmj-marker' : ''}
            />
            <circle
              cx="180"
              cy="145"
              r="30"
              fill="url(#goldenPulse)"
              className={animate ? 'golden-pulse' : ''}
            />
          </svg>

          <div
            className={`tmj-dial ${animate ? 'spin' : ''}`}
            style={{ top: '72%', left: '60%' }}
          >
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
          <p className={animate ? 'text-fade-in' : ''}>
            Precision-engineered TMJ therapy that transforms pain into freedom.
          </p>
          <button className={animate ? 'cta-animate' : ''}>
            Begin Your Transformation
          </button>
          {animate && <audio autoPlay src="/sounds/click.mp3" />}
        </div>
      </div>
    </section>
  );
};

export default TMJHeroSection;