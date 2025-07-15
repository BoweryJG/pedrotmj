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
            <defs>
              {/* Brushed Platinum Texture */}
              <pattern id="brushedPlatinum" x="0" y="0" width="100" height="1" patternUnits="userSpaceOnUse">
                <rect width="100" height="1" fill="#4A4A4A" />
                {[...Array(50)].map((_, i) => (
                  <line
                    key={i}
                    x1={i * 2}
                    y1="0"
                    x2={i * 2}
                    y2="1"
                    stroke="#5A5A5A"
                    strokeWidth="0.5"
                    opacity={Math.random() * 0.5 + 0.3}
                  />
                ))}
              </pattern>
              
              {/* Radial Etching Pattern */}
              <pattern id="radialEtching" x="0" y="0" width="100%" height="100%" patternUnits="objectBoundingBox">
                <g transform="translate(0.5, 0.5)">
                  {[...Array(72)].map((_, i) => {
                    const angle = i * 5;
                    return (
                      <line
                        key={i}
                        x1="0"
                        y1="0"
                        x2={Math.cos(angle * Math.PI / 180) * 0.5}
                        y2={Math.sin(angle * Math.PI / 180) * 0.5}
                        stroke="#6A6A6A"
                        strokeWidth="0.002"
                        opacity="0.3"
                      />
                    );
                  })}
                </g>
              </pattern>
              
              {/* Center Jewel Gradient */}
              <radialGradient id="centerJewel">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#FFF8DC" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#FFD700" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="0.4" />
              </radialGradient>
              
              {/* Depth Shadow */}
              <filter id="dialDepth">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="2" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="0.4"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* Screw Shadow */}
              <filter id="screwDepth">
                <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.5" floodOpacity="0.3"/>
              </filter>
            </defs>
            
            {/* Anatomically Correct Jaw System */}
            <g transform="translate(250, 250)">
              {/* Mandible (Lower Jaw) */}
              <path
                d="M -180 20
                   C -180 50, -160 70, -140 80
                   C -120 90, -100 95, -80 95
                   C -60 95, -40 90, -20 85
                   C 0 80, 20 75, 40 70
                   C 60 65, 80 55, 95 40
                   C 110 25, 120 10, 120 0
                   C 120 -5, 115 -8, 110 -10
                   L 100 -10"
                fill="none"
                stroke={COLORS.ivoryWhite}
                strokeWidth="2.5"
                opacity="0.4"
                strokeLinecap="round"
              />
              
              {/* Maxilla (Upper Jaw) */}
              <path
                d="M -180 -20
                   C -180 -50, -160 -70, -140 -80
                   C -120 -85, -100 -88, -80 -90
                   C -60 -92, -40 -90, -20 -85
                   C 0 -80, 20 -75, 40 -68
                   C 60 -60, 80 -45, 95 -25
                   C 105 -10, 110 -5, 110 0
                   L 100 0"
                fill="none"
                stroke={COLORS.ivoryWhite}
                strokeWidth="2.5"
                opacity="0.4"
                strokeLinecap="round"
              />
              
              {/* Temporal Bone Connection */}
              <path
                d="M 95 -25
                   C 100 -20, 105 -10, 105 0
                   C 105 10, 100 20, 95 25"
                fill="none"
                stroke={COLORS.ivoryWhite}
                strokeWidth="3"
                opacity="0.6"
                strokeLinecap="round"
              />
              
              {/* TMJ Joint Capsule */}
              <ellipse
                cx="100"
                cy="0"
                rx="12"
                ry="18"
                fill="none"
                stroke={COLORS.mutedGold}
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="2 2"
              />
              
              {/* TMJ Precision Dial */}
              <g transform="translate(100, 0)">
                {/* Pre-tension Stress Lines */}
                <g style={{
                  opacity: animationStarted ? 0 : 0.8,
                  transition: 'opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}>
                  {[...Array(16)].map((_, i) => {
                    const angle = i * 22.5;
                    const length = 35 + Math.sin(i * 0.5) * 10;
                    return (
                      <line
                        key={i}
                        x1="0"
                        y1="0"
                        x2={Math.cos(angle * Math.PI / 180) * length}
                        y2={Math.sin(angle * Math.PI / 180) * length}
                        stroke={COLORS.mutedGold}
                        strokeWidth={1.5 - i * 0.05}
                        opacity={0.5 - i * 0.02}
                      />
                    );
                  })}
                </g>

                {/* Luxury Dial Assembly */}
                <g style={{
                  transform: animationStarted && !prefersReducedMotion 
                    ? 'rotate(90deg) scale(1.05)' 
                    : 'rotate(0deg) scale(1)',
                  transition: 'transform 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  transformOrigin: 'center',
                }}>
                  {/* Outer Bezel Ring */}
                  <circle
                    cx="0"
                    cy="0"
                    r="42"
                    fill="none"
                    stroke={COLORS.mutedGold}
                    strokeWidth="1.5"
                    filter="url(#dialDepth)"
                  />
                  
                  {/* Main Dial Body */}
                  <circle
                    cx="0"
                    cy="0"
                    r="40"
                    fill="url(#brushedPlatinum)"
                    filter="url(#dialDepth)"
                  />
                  
                  {/* Radial Etching Layer */}
                  <circle
                    cx="0"
                    cy="0"
                    r="38"
                    fill="url(#radialEtching)"
                    opacity="0.6"
                  />
                  
                  {/* Inner Track */}
                  <circle
                    cx="0"
                    cy="0"
                    r="32"
                    fill="none"
                    stroke="#6A6A6A"
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                  
                  {/* Micro-engraved Hour Markers */}
                  {[...Array(12)].map((_, i) => {
                    const angle = i * 30 - 90;
                    const isCardinal = i % 3 === 0;
                    const innerR = isCardinal ? 28 : 30;
                    const outerR = 35;
                    return (
                      <g key={i}>
                        <line
                          x1={Math.cos(angle * Math.PI / 180) * innerR}
                          y1={Math.sin(angle * Math.PI / 180) * innerR}
                          x2={Math.cos(angle * Math.PI / 180) * outerR}
                          y2={Math.sin(angle * Math.PI / 180) * outerR}
                          stroke={COLORS.mutedGold}
                          strokeWidth={isCardinal ? 2 : 1}
                          opacity={isCardinal ? 0.9 : 0.6}
                        />
                        {isCardinal && (
                          <text
                            x={Math.cos(angle * Math.PI / 180) * 23}
                            y={Math.sin(angle * Math.PI / 180) * 23}
                            fill={COLORS.mutedGold}
                            fontSize="6"
                            fontFamily="Arial, sans-serif"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            opacity="0.7"
                          >
                            {i === 0 ? '12' : i === 3 ? '3' : i === 6 ? '6' : '9'}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  
                  {/* Center Jewel Pivot */}
                  <circle cx="0" cy="0" r="8" fill="url(#centerJewel)" filter="url(#dialDepth)" />
                  <circle cx="0" cy="0" r="6" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.8" />
                  <circle cx="0" cy="0" r="2" fill="#FFF8DC" opacity="0.9" />
                  
                  {/* Cartier-style Slotted Screws */}
                  {[
                    { angle: 45, rotation: 15 },
                    { angle: 135, rotation: -30 },
                    { angle: 225, rotation: 45 },
                    { angle: 315, rotation: -60 }
                  ].map(({ angle, rotation }) => {
                    const x = Math.cos(angle * Math.PI / 180) * 34;
                    const y = Math.sin(angle * Math.PI / 180) * 34;
                    return (
                      <g key={angle} transform={`translate(${x}, ${y})`} filter="url(#screwDepth)">
                        {/* Screw Base */}
                        <circle 
                          cx="0" 
                          cy="0" 
                          r="4" 
                          fill="#5A5A5A"
                        />
                        {/* Screw Rim */}
                        <circle 
                          cx="0" 
                          cy="0" 
                          r="3.5" 
                          fill="none" 
                          stroke="#7A7A7A" 
                          strokeWidth="0.5"
                        />
                        {/* Screw Slot */}
                        <g transform={`rotate(${rotation})`}>
                          <rect 
                            x="-3" 
                            y="-0.5" 
                            width="6" 
                            height="1" 
                            fill="#3A3A3A"
                          />
                          {/* Slot Highlight */}
                          <rect 
                            x="-3" 
                            y="-0.5" 
                            width="6" 
                            height="0.3" 
                            fill="#8A8A8A"
                            opacity="0.5"
                          />
                        </g>
                      </g>
                    );
                  })}
                </g>

                {/* Mechanical Unlock Pulse */}
                {animationStarted && !prefersReducedMotion && (
                  <>
                    {/* Primary Pulse */}
                    <circle
                      cx="0"
                      cy="0"
                      r="0"
                      fill="none"
                      stroke={COLORS.mutedGold}
                      strokeWidth="3"
                      opacity="0.9"
                      style={{
                        animation: `${goldenPulse} 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
                        animationDelay: '1.6s',
                      }}
                    />
                    {/* Secondary Pulse */}
                    <circle
                      cx="0"
                      cy="0"
                      r="0"
                      fill="none"
                      stroke={COLORS.mutedGold}
                      strokeWidth="1.5"
                      opacity="0.6"
                      style={{
                        animation: `${goldenPulse} 1.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
                        animationDelay: '1.8s',
                      }}
                    />
                  </>
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