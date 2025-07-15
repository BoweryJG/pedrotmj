import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Custom hook for reduced motion
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// Animations
const dialRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(45deg);
  }
  60% {
    transform: rotate(35deg);
  }
  100% {
    transform: rotate(90deg);
  }
`;

const stressLinesFade = keyframes`
  0% {
    opacity: 1;
    stroke-width: 2;
  }
  100% {
    opacity: 0;
    stroke-width: 0;
  }
`;

const muscularTwitch = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
`;

const goldenPulse = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
`;

// Styled Components
const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#000000',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1400px',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(6),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4),
  },
}));

const HeadlineText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", "Spectral", serif',
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 700,
  lineHeight: 1.2,
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(3),
}));

const SubheadlineText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Spectral", serif',
  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.85)',
  marginBottom: theme.spacing(4),
}));

const CTAButton = styled(Button)(() => ({
  fontFamily: '"Spectral", serif',
  fontSize: '1.1rem',
  padding: '16px 48px',
  backgroundColor: '#1a1a1a',
  color: '#FFD700',
  border: '1px solid #FFD700',
  borderRadius: '8px',
  position: 'relative',
  overflow: 'hidden',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: '#FFD700',
    color: '#1a1a1a',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
}));

const AnimationContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface TMJHeroSectionProps {
  onCTAClick?: () => void;
}

const TMJHeroSection: React.FC<TMJHeroSectionProps> = ({ onCTAClick }) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    if (!prefersReducedMotion) {
      const timer = setTimeout(() => {
        setAnimationStarted(true);
        // Trigger pulse animation after dial rotation
        setTimeout(() => {
          setShowPulse(true);
          // Play click sound
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
          }
        }, 2000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

  return (
    <HeroContainer>
      <ContentWrapper>
        <Box>
          <HeadlineText variant="h1">
            Relief You Can Feel, Freedom You Can Live
          </HeadlineText>
          <SubheadlineText>
            Experience the future of TMJ treatment with precision and elegance.
          </SubheadlineText>
          <CTAButton variant="contained" size="large" onClick={onCTAClick}>
            Book Your Transformation
          </CTAButton>
        </Box>

        <AnimationContainer>
          <svg
            width={isMobile ? "300" : "400"}
            height={isMobile ? "300" : "400"}
            viewBox="0 0 400 400"
            style={{ overflow: 'visible' }}
          >
            {/* Face Silhouette */}
            <path
              d="M 150 100 C 150 100, 120 120, 110 160 C 100 200, 100 240, 120 280 C 140 320, 160 340, 200 350 C 240 360, 280 350, 300 320 C 320 290, 330 250, 330 210 C 330 170, 320 130, 290 100 C 260 70, 220 60, 180 70 C 140 80, 150 100, 150 100 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="2"
            />
            
            {/* TMJ Joint Location */}
            <circle cx="260" cy="180" r="3" fill="#FFD700" />
            
            {/* Stress Lines */}
            <g style={{ 
              opacity: animationStarted ? 0 : 1,
              animation: animationStarted && !prefersReducedMotion ? `${stressLinesFade} 2s ease-out forwards` : 'none'
            }}>
              <line x1="240" y1="170" x2="220" y2="160" stroke="#FF6B6B" strokeWidth="2" />
              <line x1="240" y1="190" x2="220" y2="200" stroke="#FF6B6B" strokeWidth="2" />
              <line x1="280" y1="180" x2="300" y2="180" stroke="#FF6B6B" strokeWidth="2" />
            </g>
            
            {/* Muscular Fibers */}
            <g style={{ animation: animationStarted && !prefersReducedMotion ? `${muscularTwitch} 0.3s ease-in-out infinite` : 'none' }}>
              <path d="M 250 160 Q 260 170, 270 160" fill="none" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="1" />
              <path d="M 250 200 Q 260 190, 270 200" fill="none" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="1" />
            </g>
            
            {/* Watch Dial */}
            <g transform="translate(260, 180)" style={{
              animation: animationStarted && !prefersReducedMotion ? `${dialRotation} 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards` : 'none'
            }}>
              {/* Dial Background */}
              <defs>
                <radialGradient id="dialGradient">
                  <stop offset="0%" stopColor="#E5E5E5" />
                  <stop offset="50%" stopColor="#C0C0C0" />
                  <stop offset="100%" stopColor="#A0A0A0" />
                </radialGradient>
                <radialGradient id="goldGradient">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </radialGradient>
              </defs>
              
              <circle cx="0" cy="0" r="50" fill="url(#dialGradient)" stroke="#808080" strokeWidth="2" />
              
              {/* Chrome Bezel */}
              <circle cx="0" cy="0" r="48" fill="none" stroke="#C0C0C0" strokeWidth="1" />
              <circle cx="0" cy="0" r="52" fill="none" stroke="#E0E0E0" strokeWidth="1" />
              
              {/* Radial Notches */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                const x1 = Math.cos(angle) * 40;
                const y1 = Math.sin(angle) * 40;
                const x2 = Math.cos(angle) * 45;
                const y2 = Math.sin(angle) * 45;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 3 === 0 ? "#FFD700" : "#A0A0A0"}
                    strokeWidth={i % 3 === 0 ? "2" : "1"}
                  />
                );
              })}
              
              {/* Micro Screws */}
              <g>
                {/* Top screw */}
                <circle cx="0" cy="-35" r="4" fill="#C0C0C0" stroke="#808080" strokeWidth="0.5" />
                <line x1="-2" y1="-35" x2="2" y2="-35" stroke="#666" strokeWidth="0.5" transform="rotate(30 0 -35)" />
                
                {/* Right screw */}
                <circle cx="35" cy="0" r="4" fill="#C0C0C0" stroke="#808080" strokeWidth="0.5" />
                <line x1="33" y1="0" x2="37" y2="0" stroke="#666" strokeWidth="0.5" transform="rotate(-45 35 0)" />
                
                {/* Bottom screw */}
                <circle cx="0" cy="35" r="4" fill="#C0C0C0" stroke="#808080" strokeWidth="0.5" />
                <line x1="-2" y1="35" x2="2" y2="35" stroke="#666" strokeWidth="0.5" transform="rotate(60 0 35)" />
                
                {/* Left screw */}
                <circle cx="-35" cy="0" r="4" fill="#C0C0C0" stroke="#808080" strokeWidth="0.5" />
                <line x1="-37" y1="0" x2="-33" y2="0" stroke="#666" strokeWidth="0.5" transform="rotate(15 -35 0)" />
              </g>
              
              {/* Center Gold Detail */}
              <circle cx="0" cy="0" r="8" fill="url(#goldGradient)" />
              <circle cx="0" cy="0" r="5" fill="#FFD700" />
            </g>
            
            {/* Golden Pulse */}
            {showPulse && !prefersReducedMotion && (
              <circle
                cx="260"
                cy="180"
                r="20"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
                opacity="0.6"
                style={{ animation: `${goldenPulse} 1.5s ease-out` }}
              />
            )}
          </svg>
        </AnimationContainer>
      </ContentWrapper>
      
      {/* Audio element for click sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/click.mp3" type="audio/mpeg" />
        <source src="/sounds/click.ogg" type="audio/ogg" />
      </audio>
    </HeroContainer>
  );
};

export default TMJHeroSection;