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

const subtleFloat = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
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
  animation: `${subtleFloat} 4s ease-in-out infinite`,
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
    // Scroll to the booking or contact section
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
          <svg
            width={isMobile ? "300" : "400"}
            height={isMobile ? "300" : "400"}
            viewBox="0 0 400 400"
            style={{ overflow: 'visible' }}
          >
            {/* Face Silhouette - Simple and elegant */}
            <path
              d="M 150 100 C 150 100, 120 120, 110 160 C 100 200, 100 240, 120 280 C 140 320, 160 340, 200 350 C 240 360, 280 350, 300 320 C 320 290, 330 250, 330 210 C 330 170, 320 130, 290 100 C 260 70, 220 60, 180 70 C 140 80, 150 100, 150 100 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s ease-out'
              }}
            />
            
            {/* TMJ Joint - Glowing point */}
            <circle 
              cx="260" 
              cy="180" 
              r="8" 
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              style={{
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `${pulseGlow} 2s ease-in-out infinite` : 'none',
                transition: 'opacity 1s ease-out 0.5s'
              }}
            />
            
            {/* Subtle circular guides */}
            <circle 
              cx="260" 
              cy="180" 
              r="30" 
              fill="none"
              stroke="rgba(255, 215, 0, 0.1)"
              strokeWidth="1"
              strokeDasharray="5 10"
              style={{
                opacity: isVisible ? 0.5 : 0,
                transition: 'opacity 1s ease-out 0.7s'
              }}
            />
            
            <circle 
              cx="260" 
              cy="180" 
              r="50" 
              fill="none"
              stroke="rgba(255, 215, 0, 0.05)"
              strokeWidth="1"
              strokeDasharray="10 20"
              style={{
                opacity: isVisible ? 0.3 : 0,
                transition: 'opacity 1s ease-out 0.9s'
              }}
            />

            {/* Clean, minimal lines suggesting precision */}
            <g style={{
              opacity: isVisible ? 0.6 : 0,
              transition: 'opacity 1s ease-out 1.1s'
            }}>
              <line x1="260" y1="150" x2="260" y2="130" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
              <line x1="290" y1="180" x2="310" y2="180" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
              <line x1="260" y1="210" x2="260" y2="230" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
              <line x1="230" y1="180" x2="210" y2="180" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
            </g>
          </svg>
        </AnimationContainer>
      </ContentWrapper>

      {/* Background gradient effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 70% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
    </HeroContainer>
  );
};

export default TMJHeroSection;