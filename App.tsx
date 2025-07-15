import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// Import all TMJ components in the correct order
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Symptoms from './components/Symptoms';
import TreatmentOptions from './components/TreatmentOptions';
import Benefits from './components/Benefits';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Insurance from './components/Insurance';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

// Exit Intent Modal Component
const ExitIntentModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    // Track modal view
    console.log('🎯 Conversion Event: Exit Intent Modal Viewed');
  }, []);

  const handleBookNow = () => {
    console.log('🎯 Conversion Event: Exit Intent Modal - Book Now Clicked');
    window.location.href = 'tel:+1-917-993-7306';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Wait! Don't Leave in Pain</h2>
        <p className="text-gray-700 mb-6">
          Get your FREE TMJ consultation and start your journey to a pain-free life today.
          Limited appointments available this week!
        </p>
        <div className="space-y-4">
          <button
            onClick={handleBookNow}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105"
          >
            📞 Call Now: (917) 993-7306
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Maybe Later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Sticky Header Component
const StickyHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    console.log('🎯 Conversion Event: Sticky Header - Book Now Clicked');
    window.location.href = 'tel:+1-917-993-7306';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-40"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                Dr. Pedro TMJ
              </span>
              <span className="hidden sm:block text-gray-600">Elite TMJ Specialist</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="tel:+1-917-993-7306"
                className="hidden sm:flex items-center text-gray-700 hover:text-amber-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (917) 993-7306
              </a>
              <button
                onClick={handleBookNow}
                className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105"
              >
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main App Component
const App: React.FC = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Track page load
  useEffect(() => {
    console.log('🎯 Conversion Event: Page Loaded');
    
    // Track time on page
    const startTime = Date.now();
    return () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      console.log(`🎯 Conversion Event: Time on Page - ${timeOnPage} seconds`);
    };
  }, []);

  // Exit Intent Detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent && window.scrollY < 500) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExitIntent]);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section');
          console.log(`🎯 Conversion Event: Section Viewed - ${sectionName}`);
          
          // Add animation class
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <ExitIntentModal onClose={() => setShowExitIntent(false)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div 
        ref={el => sectionRefs.current.hero = el}
        data-section="Hero"
        className="opacity-0"
      >
        <Hero />
      </div>

      {/* Pain Points Section */}
      <div 
        ref={el => sectionRefs.current.painPoints = el}
        data-section="Pain Points"
        className="opacity-0"
      >
        <PainPoints />
      </div>

      {/* Symptoms Section */}
      <div 
        ref={el => sectionRefs.current.symptoms = el}
        data-section="Symptoms"
        className="opacity-0"
      >
        <Symptoms />
      </div>

      {/* Treatment Options Section */}
      <div 
        ref={el => sectionRefs.current.treatments = el}
        data-section="Treatment Options"
        className="opacity-0"
      >
        <TreatmentOptions />
      </div>

      {/* Benefits Section */}
      <div 
        ref={el => sectionRefs.current.benefits = el}
        data-section="Benefits"
        className="opacity-0"
      >
        <Benefits />
      </div>

      {/* Process Section */}
      <div 
        ref={el => sectionRefs.current.process = el}
        data-section="Process"
        className="opacity-0"
      >
        <Process />
      </div>

      {/* Testimonials Section */}
      <div 
        ref={el => sectionRefs.current.testimonials = el}
        data-section="Testimonials"
        className="opacity-0"
      >
        <Testimonials />
      </div>

      {/* Insurance Section */}
      <div 
        ref={el => sectionRefs.current.insurance = el}
        data-section="Insurance"
        className="opacity-0"
      >
        <Insurance />
      </div>

      {/* FAQ Section */}
      <div 
        ref={el => sectionRefs.current.faq = el}
        data-section="FAQ"
        className="opacity-0"
      >
        <FAQ />
      </div>

      {/* CTA Section */}
      <div 
        ref={el => sectionRefs.current.cta = el}
        data-section="CTA"
        className="opacity-0"
      >
        <CTA />
      </div>

      {/* Footer */}
      <div 
        ref={el => sectionRefs.current.footer = el}
        data-section="Footer"
        className="opacity-0"
      >
        <Footer />
      </div>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #d97706, #dc2626);
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #b45309, #991b1b);
        }
      `}</style>
    </div>
  );
};

export default App;