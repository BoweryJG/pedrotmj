import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Luxury color palette
const COLORS = {
  mutedGold: '#D4AF37',
  ivoryWhite: 'rgba(255, 255, 255, 0.9)',
  obsidian: '#0A0A0A',
  shadowChrome: '#3C3C3C',
};

// Check for reduced motion preference
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
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const dialRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
`;

const tensionFade = keyframes`
  0% {
    opacity: 0.6;
    stroke-width: 1.5;
  }
  100% {
    opacity: 0;
    stroke-width: 0;
  }
`;

const goldenPulse = keyframes`
  0% {
    r: 0;
    opacity: 0.8;
  }
  100% {
    r: 150;
    opacity: 0;
  }
`;

// Styled Components
const HeroContainer = styled(Box)(() => ({
  minHeight: '100vh',
  backgroundColor: COLORS.obsidian,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: '40px 20px',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1400px',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(8),
  alignItems: 'center',
  position: 'relative',
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4),
    textAlign: 'center',
  },
}));

const TextContainer = styled(Box)(() => ({
  '& > *': {
    opacity: 0,
    animation: `${fadeIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
  },
  '& > *:nth-of-type(1)': {
    animationDelay: '2.5s',
  },
  '& > *:nth-of-type(2)': {
    animationDelay: '2.7s',
  },
  '& > *:nth-of-type(3)': {
    animationDelay: '2.9s',
  },
}));

const HeadlineText = styled(Typography)(() => ({
  fontFamily: '"Spectral", serif',
  fontSize: '44px',
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  background: `linear-gradient(135deg, ${COLORS.mutedGold} 0%, #FFD700 50%, ${COLORS.mutedGold} 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '24px',
  '@media (max-width: 768px)': {
    fontSize: '32px',
  },
}));

const SubheadlineText = styled(Typography)(() => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: '18px',
  fontWeight: 300,
  letterSpacing: '0.05em',
  color: COLORS.ivoryWhite,
  marginBottom: '40px',
  opacity: 0.9,
}));

const CTAButton = styled(Button)(() => ({
  fontFamily: '"Spectral", serif',
  fontSize: '16px',
  fontWeight: 400,
  padding: '18px 48px',
  backgroundColor: COLORS.obsidian,
  color: COLORS.mutedGold,
  border: `2px solid ${COLORS.mutedGold}`,
  borderRadius: '0',
  textTransform: 'none',
  letterSpacing: '0.08em',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: COLORS.mutedGold,
    color: COLORS.obsidian,
    transform: 'translateY(-2px)',
    boxShadow: `0 10px 40px rgba(212, 175, 55, 0.3)`,
  },
}));

const AnimationContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '500px',
  [theme.breakpoints.down('md')]: {
    height: '400px',
    marginTop: theme.spacing(4),
  },
}));

interface TMJHeroSectionProps {
  onCTAClick?: () => void;
}

const TMJHeroSection: React.FC<TMJHeroSectionProps> = ({ onCTAClick }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useReducedMotion();
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (!prefersReducedMotion) {
      const timer = setTimeout(() => {
        setAnimationStarted(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

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
    <HeroContainer>
      <ContentWrapper>
        <TextContainer>
          <HeadlineText variant="h1">
            Relief You Can Feel.<br />
            Freedom You Can Live.
          </HeadlineText>
          <SubheadlineText>
            Experience the future of TMJ therapy.
          </SubheadlineText>
          <CTAButton onClick={handleCTAClick}>
            Book Your Transformation
          </CTAButton>
        </TextContainer>

        <AnimationContainer>
          <svg
            width={isMobile ? "350" : "500"}
            height={isMobile ? "350" : "500"}
            viewBox="0 0 500 500"
            style={{ overflow: 'visible' }}
          >
            {/* Jaw Silhouette Profile */}
            <g transform="translate(250, 250)">
              {/* Upper jaw curve */}
              <path
                d="M -150 -50 
                   C -150 -80, -120 -100, -80 -100
                   C -40 -100, 0 -90, 40 -80
                   C 80 -70, 100 -50, 100 -20
                   L 100 0"
                fill="none"
                stroke={COLORS.ivoryWhite}
                strokeWidth="2"
                opacity="0.3"
              />
              
              {/* Lower jaw curve */}
              <path
                d="M -150 30
                   C -150 60, -120 80, -80 90
                   C -40 100, 0 100, 40 90
                   C 80 80, 100 60, 100 30
                   L 100 0"
                fill="none"
                stroke={COLORS.ivoryWhite}
                strokeWidth="2"
                opacity="0.3"
              />
              
              {/* TMJ Joint Location */}
              <g transform="translate(100, 0)">
                {/* Tension Lines */}
                <g style={{
                  opacity: animationStarted ? 0 : 0.6,
                  transition: 'opacity 1s ease-out',
                  animation: animationStarted && !prefersReducedMotion ? `${tensionFade} 1.5s ease-out forwards` : 'none'
                }}>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                      key={angle}
                      x1="0"
                      y1="0"
                      x2={Math.cos(angle * Math.PI / 180) * 40}
                      y2={Math.sin(angle * Math.PI / 180) * 40}
                      stroke={COLORS.mutedGold}
                      strokeWidth="1.5"
                      opacity="0.4"
                    />
                  ))}
                </g>

                {/* Cartier-style Dial Container */}
                <g style={{
                  transform: animationStarted && !prefersReducedMotion ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformOrigin: 'center',
                }}>
                  {/* Dial Background */}
                  <circle
                    cx="0"
                    cy="0"
                    r="35"
                    fill={COLORS.shadowChrome}
                    stroke={COLORS.mutedGold}
                    strokeWidth="1"
                  />
                  
                  {/* Brushed Metal Effect */}
                  <defs>
                    <pattern id="brushedMetal" x="0" y="0" width="2" height="1" patternUnits="userSpaceOnUse">
                      <rect width="2" height="1" fill={COLORS.shadowChrome} />
                      <line x1="0" y1="0" x2="0" y2="1" stroke="#444" strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                  </defs>
                  <circle cx="0" cy="0" r="33" fill="url(#brushedMetal)" opacity="0.8" />
                  
                  {/* Dial Markers */}
                  {[0, 90, 180, 270].map((angle) => (
                    <line
                      key={angle}
                      x1={Math.cos(angle * Math.PI / 180) * 25}
                      y1={Math.sin(angle * Math.PI / 180) * 25}
                      x2={Math.cos(angle * Math.PI / 180) * 30}
                      y2={Math.sin(angle * Math.PI / 180) * 30}
                      stroke={COLORS.mutedGold}
                      strokeWidth="2"
                    />
                  ))}
                  
                  {/* Center dot */}
                  <circle cx="0" cy="0" r="3" fill={COLORS.mutedGold} />
                  
                  {/* Cartier-style Screws */}
                  {[45, 135, 225, 315].map((angle) => {
                    const x = Math.cos(angle * Math.PI / 180) * 28;
                    const y = Math.sin(angle * Math.PI / 180) * 28;
                    return (
                      <g key={angle} transform={`translate(${x}, ${y})`}>
                        <circle cx="0" cy="0" r="3" fill={COLORS.shadowChrome} stroke={COLORS.mutedGold} strokeWidth="0.5" />
                        <line x1="-1.5" y1="0" x2="1.5" y2="0" stroke={COLORS.mutedGold} strokeWidth="0.5" />
                      </g>
                    );
                  })}
                </g>

                {/* Golden Pulse */}
                {animationStarted && !prefersReducedMotion && (
                  <circle
                    cx="0"
                    cy="0"
                    r="0"
                    fill="none"
                    stroke={COLORS.mutedGold}
                    strokeWidth="2"
                    opacity="0.8"
                    style={{
                      animation: `${goldenPulse} 2s ease-out forwards`,
                      animationDelay: '1s',
                    }}
                  />
                )}
              </g>
            </g>
          </svg>
        </AnimationContainer>
      </ContentWrapper>

      {/* Luxury gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 70% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </HeroContainer>
  );
};

export default TMJHeroSection;