import React, { useEffect, useState, useCallback } from 'react';
import './TMJHeroSection-Polished.css';

type AnimationPhase = 'diagnosis' | 'treatment' | 'restoration';

interface PhaseConfig {
  name: AnimationPhase;
  duration: number;
  description: string;
  color: string;
}

const TMJHeroSectionPolished: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>('diagnosis');
  const [phaseProgress, setPhaseProgress] = useState(0);

  // Phase configuration
  const phases: PhaseConfig[] = [
    {
      name: 'diagnosis',
      duration: 3000,
      description: 'Scanning & Analysis',
      color: '#00A8E8'
    },
    {
      name: 'treatment',
      duration: 3000,
      description: 'Therapeutic Energy Application',
      color: '#FFA500'
    },
    {
      name: 'restoration',
      duration: 3000,
      description: 'Function Restoration',
      color: '#00D084'
    }
  ];

  // Master animation controller
  const cyclePhases = useCallback(() => {
    let phaseIndex = 0;
    
    const advancePhase = () => {
      const phase = phases[phaseIndex];
      setCurrentPhase(phase.name);
      setPhaseProgress(0);
      
      // Progress animation for current phase
      const progressInterval = setInterval(() => {
        setPhaseProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + (100 / (phase.duration / 100));
        });
      }, 100);
      
      // Move to next phase
      setTimeout(() => {
        phaseIndex = (phaseIndex + 1) % phases.length;
        advancePhase();
      }, phase.duration);
    };
    
    advancePhase();
  }, [phases]);

  useEffect(() => {
    // Initialize animation after component mount
    const initTimer = setTimeout(() => {
      setIsActive(true);
      cyclePhases();
    }, 500);
    
    return () => clearTimeout(initTimer);
  }, [cyclePhases]);

  // Helper function to get phase-specific classes
  const getPhaseClass = (baseClass: string) => {
    return `${baseClass} ${isActive ? `phase-${phases.findIndex(p => p.name === currentPhase) + 1}` : ''}`;
  };

  return (
    <section className="tmj-hero">
      {/* Phase Indicator */}
      <div className="phase-indicator">
        {phases.map((phase, index) => (
          <div
            key={phase.name}
            className={`phase-dot phase-${index + 1} ${currentPhase === phase.name ? 'active' : ''}`}
            title={phase.description}
          />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-visual">
          <div className={`tmj-anatomy-container ${isActive ? 'active' : ''}`}>
            
            {/* Reduced Particle Field (15 particles) */}
            <div className="particle-field">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    '--delay': `${i * 0.1}s`
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Medical Grid System */}
            <div className={getPhaseClass('medical-grid')}>
              <div className="grid-lines" />
            </div>

            {/* Main TMJ Anatomy SVG */}
            <svg viewBox="0 0 500 400" className="tmj-anatomy-svg">
              <defs>
                {/* Medical-grade Gradients */}
                <linearGradient id="boneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F8F8F0" />
                  <stop offset="50%" stopColor="#E8E8D8" />
                  <stop offset="100%" stopColor="#D8D8C8" />
                </linearGradient>
                
                <radialGradient id="jointGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFA500" />
                  <stop offset="50%" stopColor="#FF8C00" />
                  <stop offset="100%" stopColor="#FF6347" />
                </radialGradient>
                
                <linearGradient id="muscleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E74C3C" />
                  <stop offset="50%" stopColor="#C0392B" />
                  <stop offset="100%" stopColor="#A93226" />
                </linearGradient>
                
                <linearGradient id="nerveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B7FD8" />
                  <stop offset="50%" stopColor="#7B6FC8" />
                  <stop offset="100%" stopColor="#6B5FB8" />
                </linearGradient>

                {/* Medical Glow Filter */}
                <filter id="medicalGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Upper Jaw (Maxilla) */}
              <path
                d="M100,180 Q200,160 300,165 Q400,170 430,185"
                stroke="url(#boneGradient)"
                strokeWidth="8"
                fill="none"
                filter="url(#medicalGlow)"
                className={getPhaseClass('upper-jaw')}
              />

              {/* Lower Jaw (Mandible) */}
              <path
                d="M120,220 Q220,235 320,235 Q420,225 415,215"
                stroke="url(#boneGradient)"
                strokeWidth="8"
                fill="none"
                filter="url(#medicalGlow)"
                className={getPhaseClass('lower-jaw')}
              />

              {/* TMJ Joints */}
              <circle
                cx="110"
                cy="200"
                r="14"
                fill="url(#jointGradient)"
                filter="url(#medicalGlow)"
                className={getPhaseClass('tmj-joint-left')}
              />
              <circle
                cx="410"
                cy="200"
                r="14"
                fill="url(#jointGradient)"
                filter="url(#medicalGlow)"
                className={getPhaseClass('tmj-joint-right')}
              />

              {/* Muscle Groups */}
              <g className={getPhaseClass('muscle-group')}>
                <path
                  d="M130,140 Q230,145 330,140"
                  stroke="url(#muscleGradient)"
                  strokeWidth="6"
                  fill="none"
                  opacity="0.7"
                  className={getPhaseClass('temporalis')}
                />
                <path
                  d="M140,260 Q240,255 340,260"
                  stroke="url(#muscleGradient)"
                  strokeWidth="6"
                  fill="none"
                  opacity="0.7"
                  className={getPhaseClass('masseter')}
                />
              </g>

              {/* Neural Pathways */}
              <g className={getPhaseClass('neural-network')}>
                <path
                  d="M110,200 Q190,180 270,200 Q350,180 410,200"
                  stroke="url(#nerveGradient)"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.6"
                />
                <circle cx="190" cy="180" r="4" fill="#8B7FD8" opacity="0.8" />
                <circle cx="270" cy="200" r="4" fill="#8B7FD8" opacity="0.8" />
                <circle cx="350" cy="180" r="4" fill="#8B7FD8" opacity="0.8" />
              </g>

              {/* Precision Targeting System */}
              <g className={getPhaseClass('targeting-system')}>
                <circle cx="260" cy="200" r="50" fill="none" stroke="#00A8E8" strokeWidth="1" opacity="0.3" />
                <circle cx="260" cy="200" r="70" fill="none" stroke="#00A8E8" strokeWidth="1" opacity="0.2" />
                <circle cx="260" cy="200" r="90" fill="none" stroke="#00A8E8" strokeWidth="1" opacity="0.1" />
                
                {/* Crosshair */}
                <line x1="235" y1="200" x2="285" y2="200" stroke="#00A8E8" strokeWidth="2" opacity="0.8" />
                <line x1="260" y1="175" x2="260" y2="225" stroke="#00A8E8" strokeWidth="2" opacity="0.8" />
              </g>

              {/* Therapeutic Energy Waves */}
              <g className={getPhaseClass('energy-waves')}>
                {currentPhase === 'treatment' && [...Array(3)].map((_, i) => (
                  <g key={i}>
                    <circle
                      cx="110"
                      cy="200"
                      r="12"
                      fill="none"
                      stroke="#FFA500"
                      strokeWidth="2"
                      className="wave-ring"
                      style={{ 
                        animationDelay: `${i * 0.3}s`
                      } as React.CSSProperties}
                    />
                    <circle
                      cx="410"
                      cy="200"
                      r="12"
                      fill="none"
                      stroke="#FFA500"
                      strokeWidth="2"
                      className="wave-ring"
                      style={{ 
                        animationDelay: `${i * 0.3 + 0.15}s`
                      } as React.CSSProperties}
                    />
                  </g>
                ))}
              </g>

              {/* Medical Data Points */}
              <g className={getPhaseClass('medical-data')}>
                {currentPhase === 'restoration' && (
                  <>
                    <g className="data-point optimal">
                      <circle cx="180" cy="120" r="3" />
                      <text x="188" y="124" fontSize="11">OPTIMAL</text>
                    </g>
                    <g className="data-point optimal">
                      <circle cx="320" cy="140" r="3" />
                      <text x="328" y="144" fontSize="11">98.2%</text>
                    </g>
                    <g className="data-point optimal">
                      <circle cx="150" cy="280" r="3" />
                      <text x="158" y="284" fontSize="11">0.2s</text>
                    </g>
                    <g className="data-point optimal">
                      <circle cx="350" cy="270" r="3" />
                      <text x="358" y="274" fontSize="11">RESTORED</text>
                    </g>
                  </>
                )}
              </g>
            </svg>

            {/* Precision Instruments */}
            <div className="precision-instruments">
              {/* Medical Scope */}
              <div className={getPhaseClass('medical-scope')}>
                <div className="scope-body">
                  <div className="scope-lens" />
                  <div className="scope-beam" />
                </div>
              </div>

              {/* Diagnostic Panel */}
              <div className={getPhaseClass('diagnostic-panel')}>
                <div className="panel-screen">
                  <div className="reading">TMJ Status: {currentPhase.toUpperCase()}</div>
                  <div className="reading">Joint Mobility: {currentPhase === 'restoration' ? '100%' : `${Math.round(phaseProgress)}%`}</div>
                  <div className="reading">Pain Level: {currentPhase === 'restoration' ? '0' : currentPhase === 'treatment' ? '3' : '7'}/10</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-text">
          <h1 className={isActive ? 'text-fade-in' : ''}>
            Precision TMJ Restoration
          </h1>
          <p className={isActive ? 'text-fade-in' : ''}>
            Advanced bioengineered therapy utilizing real-time diagnostic imaging, 
            targeted energy application, and precision joint restoration protocols 
            to transform temporomandibular dysfunction into optimal biomechanical harmony.
          </p>
          <button className={isActive ? 'cta-animate' : ''}>
            Begin Treatment Protocol
          </button>
        </div>
      </div>
    </section>
  );
};

export default TMJHeroSectionPolished;