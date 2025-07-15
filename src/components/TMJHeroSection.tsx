import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Subtle animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
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
  fontFamily: '"Spectral", serif',
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 300,
  letterSpacing: '-0.02em',
  color: '#FFD700',
  marginBottom: theme.spacing(2),
  animation: `${fadeIn} 0.8s ease-out`,
}));

const SubheadlineText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
  fontWeight: 300,
  letterSpacing: '0.05em',
  color: 'rgba(255, 255, 255, 0.85)',
  marginBottom: theme.spacing(4),
  animation: `${fadeIn} 0.8s ease-out 0.2s backwards`,
}));

const CTAButton = styled(Button)(() => ({
  fontFamily: '"Spectral", serif',
  fontSize: '1.1rem',
  padding: '16px 48px',
  backgroundColor: '#1a1a1a',
  color: '#FFD700',
  border: '1px solid #FFD700',
  borderRadius: '50px',
  transition: 'all 0.3s ease',
  animation: `${fadeIn} 0.8s ease-out 0.4s backwards`,
  '&:hover': {
    backgroundColor: '#FFD700',
    color: '#000000',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
  },
}));

const AnimationContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(4),
  },
}));

const TMJHeroSection: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onCTAClick = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <ContentWrapper>
        <Box sx={{ zIndex: 2 }}>
          <HeadlineText>
            Precision TMJ Therapy
          </HeadlineText>
          <SubheadlineText>
            Experience the future of TMJ treatment with precision and elegance.
          </SubheadlineText>
          <CTAButton variant="contained" size="large" onClick={onCTAClick}>
            Book Your Transformation
          </CTAButton>
        </Box>

        <AnimationContainer>
          <Box
            sx={{
              position: 'relative',
              width: isMobile ? 300 : 400,
              height: isMobile ? 300 : 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Professional medical illustration style */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s ease-out'
              }}
            >
              {/* Background circle */}
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="rgba(255, 215, 0, 0.1)"
                strokeWidth="1"
              />

              {/* Jaw bone structure - anatomically inspired */}
              <g transform="translate(200, 200)">
                {/* Upper jaw (maxilla) */}
                <path
                  d="M -80 -40 Q -80 -60, -60 -70 Q -40 -75, 0 -75 Q 40 -75, 60 -70 Q 80 -60, 80 -40"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                />
                
                {/* Lower jaw (mandible) */}
                <path
                  d="M -80 20 Q -80 40, -60 50 Q -40 55, 0 55 Q 40 55, 60 50 Q 80 40, 80 20"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                />
                
                {/* TMJ joint indicators */}
                <g>
                  {/* Left TMJ */}
                  <circle
                    cx="-75"
                    cy="-10"
                    r="12"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                    style={{
                      animation: isVisible ? `${pulseGlow} 3s ease-in-out infinite` : 'none'
                    }}
                  />
                  <circle
                    cx="-75"
                    cy="-10"
                    r="4"
                    fill="#FFD700"
                    opacity="0.8"
                  />
                  
                  {/* Right TMJ */}
                  <circle
                    cx="75"
                    cy="-10"
                    r="12"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                    style={{
                      animation: isVisible ? `${pulseGlow} 3s ease-in-out infinite 1.5s` : 'none'
                    }}
                  />
                  <circle
                    cx="75"
                    cy="-10"
                    r="4"
                    fill="#FFD700"
                    opacity="0.8"
                  />
                </g>

                {/* Connection lines showing TMJ relationship */}
                <line
                  x1="-75"
                  y1="-10"
                  x2="-60"
                  y2="20"
                  stroke="rgba(255, 215, 0, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1="75"
                  y1="-10"
                  x2="60"
                  y2="20"
                  stroke="rgba(255, 215, 0, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
              </g>

              {/* Subtle grid pattern for medical precision feel */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255, 215, 0, 0.03)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#grid)" />
            </svg>

            {/* Floating particles for premium feel */}
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  backgroundColor: '#FFD700',
                  borderRadius: '50%',
                  opacity: 0.3,
                  animation: `${fadeIn} 2s ease-out ${1 + i * 0.5}s backwards`,
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
              />
            ))}
          </Box>
        </AnimationContainer>
      </ContentWrapper>

      {/* Background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(circle at 70% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
    </HeroContainer>
  );
};

export default TMJHeroSection;