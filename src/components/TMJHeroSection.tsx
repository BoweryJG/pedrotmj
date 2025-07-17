import React, { useEffect, useState } from 'react';
import './TMJHeroSection.css';

const TMJHeroSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (animate) {
      const phaseInterval = setInterval(() => {
        setPhase(prev => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(phaseInterval);
    }
  }, [animate]);

  return (
    <section className="tmj-hero">
      <div className="hero-content">
        <div className="hero-visual">
          
          {/* Advanced 3D TMJ Anatomy Visualization */}
          <div className={`tmj-anatomy-container ${animate ? 'active' : ''}`}>
            
            {/* Particle Field Background */}
            <div className="particle-field">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    '--delay': `${i * 0.1}s`,
                    '--duration': `${3 + (i % 4)}s`,
                    '--size': `${2 + (i % 3)}px`
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Medical Grid Overlay */}
            <div className="medical-grid">
              <div className="grid-lines-horizontal"></div>
              <div className="grid-lines-vertical"></div>
              <div className="grid-crosshair"></div>
            </div>

            {/* Main TMJ 3D Model */}
            <svg viewBox="0 0 500 400" className="tmj-anatomy-svg">
              <defs>
                {/* Advanced Gradients */}
                <linearGradient id="boneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5F5DC" />
                  <stop offset="30%" stopColor="#E5E5CD" />
                  <stop offset="70%" stopColor="#D5D5BD" />
                  <stop offset="100%" stopColor="#C5C5AD" />
                </linearGradient>
                
                <radialGradient id="jointGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="30%" stopColor="#DAA520" />
                  <stop offset="70%" stopColor="#B8860B" />
                  <stop offset="100%" stopColor="#8B6914" />
                </radialGradient>
                
                <linearGradient id="muscleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC143C" />
                  <stop offset="50%" stopColor="#B91C3C" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                
                <radialGradient id="nerveGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1E40AF" />
                </radialGradient>

                {/* Glow Effects */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                <filter id="medicalGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Upper Jaw Bone (Maxilla) */}
              <path
                d="M100,180 Q150,160 200,165 Q250,160 300,165 Q350,160 400,170 Q420,175 430,185"
                stroke="url(#boneGradient)"
                strokeWidth="8"
                fill="none"
                filter="url(#glow)"
                className={`upper-jaw ${animate ? 'animate' : ''}`}
              />

              {/* Lower Jaw Bone (Mandible) */}
              <path
                d="M120,220 Q170,240 220,235 Q270,240 320,235 Q370,240 400,225 Q410,220 415,215"
                stroke="url(#boneGradient)"
                strokeWidth="8"
                fill="none"
                filter="url(#glow)"
                className={`lower-jaw ${animate ? 'animate' : ''} ${phase === 1 ? 'jaw-open' : ''}`}
              />

              {/* TMJ Joint Left */}
              <circle
                cx="110"
                cy="200"
                r="12"
                fill="url(#jointGradient)"
                filter="url(#medicalGlow)"
                className={`tmj-joint-left ${animate ? 'pulse' : ''}`}
              />

              {/* TMJ Joint Right */}
              <circle
                cx="410"
                cy="200"
                r="12"
                fill="url(#jointGradient)"
                filter="url(#medicalGlow)"
                className={`tmj-joint-right ${animate ? 'pulse' : ''}`}
              />

              {/* Muscle Fibers */}
              <g className={`muscle-group ${animate ? 'contract' : ''}`}>
                {/* Temporalis Muscle */}
                <path
                  d="M130,140 Q180,150 230,145 Q280,150 330,140"
                  stroke="url(#muscleGradient)"
                  strokeWidth="6"
                  fill="none"
                  opacity="0.7"
                  className="temporalis"
                />
                
                {/* Masseter Muscle */}
                <path
                  d="M140,260 Q190,250 240,255 Q290,250 340,260"
                  stroke="url(#muscleGradient)"
                  strokeWidth="6"
                  fill="none"
                  opacity="0.7"
                  className="masseter"
                />
              </g>

              {/* Neural Pathways */}
              <g className={`neural-network ${animate ? 'activate' : ''}`}>
                <path
                  d="M110,200 Q150,180 190,200 Q230,180 270,200 Q310,180 350,200"
                  stroke="url(#nerveGradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                  className="trigeminal-nerve"
                />
                
                {/* Nerve Nodes */}
                <circle cx="150" cy="180" r="3" fill="#60A5FA" className="nerve-node" />
                <circle cx="230" cy="180" r="3" fill="#60A5FA" className="nerve-node" />
                <circle cx="310" cy="180" r="3" fill="#60A5FA" className="nerve-node" />
              </g>

              {/* Medical Measurement Lines */}
              <g className={`measurement-lines ${animate ? 'show' : ''}`}>
                <line x1="100" y1="180" x2="430" y2="185" stroke="#D4AF37" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
                <line x1="120" y1="220" x2="415" y2="215" stroke="#D4AF37" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
                <line x1="110" y1="200" x2="410" y2="200" stroke="#D4AF37" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
                
                {/* Measurement Labels */}
                <text x="265" y="175" fill="#D4AF37" fontSize="10" opacity="0.7" textAnchor="middle">Maxilla</text>
                <text x="265" y="235" fill="#D4AF37" fontSize="10" opacity="0.7" textAnchor="middle">Mandible</text>
                <text x="265" y="195" fill="#D4AF37" fontSize="10" opacity="0.7" textAnchor="middle">TMJ Axis</text>
              </g>

              {/* Precision Targeting System */}
              <g className={`targeting-system ${animate ? 'active' : ''}`}>
                <circle cx="260" cy="200" r="40" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
                <circle cx="260" cy="200" r="60" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.2" />
                <circle cx="260" cy="200" r="80" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.1" />
                
                {/* Crosshair */}
                <line x1="240" y1="200" x2="280" y2="200" stroke="#D4AF37" strokeWidth="2" opacity="0.8" />
                <line x1="260" y1="180" x2="260" y2="220" stroke="#D4AF37" strokeWidth="2" opacity="0.8" />
                
                {/* Corner Brackets */}
                <path d="M240,180 L250,180 L250,190" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M280,180 L270,180 L270,190" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M240,220 L250,220 L250,210" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M280,220 L270,220 L270,210" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.8" />
              </g>

              {/* Energy Field Visualization */}
              <g className={`energy-field ${animate ? 'energize' : ''}`}>
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    cx="260"
                    cy="200"
                    r={20 + i * 8}
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="1"
                    opacity="0.1"
                    className="energy-ring"
                    style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties}
                  />
                ))}
              </g>
            </svg>

            {/* Precision Instruments */}
            <div className={`precision-instruments ${animate ? 'deploy' : ''}`}>
              
              {/* Medical Scope */}
              <div className="medical-scope">
                <div className="scope-body"></div>
                <div className="scope-lens"></div>
                <div className="scope-beam"></div>
              </div>

              {/* Diagnostic Panel */}
              <div className="diagnostic-panel">
                <div className="panel-screen">
                  <div className="vital-signs">
                    <div className="vital-line"></div>
                    <div className="vital-pulse"></div>
                  </div>
                  <div className="readings">
                    <span className="reading">98.7°F</span>
                    <span className="reading">TMJ: OPTIMAL</span>
                    <span className="reading">TENSION: 12%</span>
                  </div>
                </div>
                <div className="panel-controls">
                  <div className="control-button active"></div>
                  <div className="control-button"></div>
                  <div className="control-button"></div>
                </div>
              </div>

              {/* Holographic Display */}
              <div className="holographic-display">
                <div className="holo-frame"></div>
                <div className="holo-content">
                  <div className="holo-text">PRECISION THERAPY</div>
                  <div className="holo-subtitle">ACTIVE</div>
                </div>
              </div>
            </div>

            {/* Luxury Enhancement Effects */}
            <div className="luxury-effects">
              <div className="golden-spiral"></div>
              <div className="precision-rays"></div>
              <div className="luxury-glow"></div>
            </div>
          </div>
        </div>

        <div className="hero-text">
          <h1 className={animate ? 'text-fade-in' : ''}>
            Precision TMJ Restoration
          </h1>
          <p className={animate ? 'text-fade-in' : ''}>
            Advanced bioengineered therapy that transforms temporomandibular dysfunction into optimal jaw harmony through precision-targeted treatment protocols.
          </p>
          <button className={animate ? 'cta-animate' : ''}>
            Initialize Treatment Protocol
          </button>
        </div>
      </div>
    </section>
  );
};

export default TMJHeroSection;