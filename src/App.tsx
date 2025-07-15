import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severityLevel, setSeverityLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const handleMouseEnter = () => cursor.classList.add('cursor-hover');
    const handleMouseLeave = () => cursor.classList.remove('cursor-hover');

    document.addEventListener('mousemove', moveCursor);
    
    const buttons = document.querySelectorAll('button, a, input');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', handleMouseEnter);
      btn.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      buttons.forEach(btn => {
        btn.removeEventListener('mouseenter', handleMouseEnter);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Loading animation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  // Particle generation
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      particlesContainer.appendChild(particle);
    }
  }, []);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => {
      const updated = prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom];
      
      // Update severity based on symptoms
      setSeverityLevel((updated.length / 5) * 100);
      
      return updated;
    });
  };

  const openChat = () => {
    setChatOpen(true);
    // Here you would integrate with your actual chat component
    console.log('Opening TMJ chat with context:', { selectedSymptoms, severityLevel });
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor"></div>
      
      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* HERO SECTION */}
      <section className="tmj-hero">
        <div className="hero-gradient"></div>
        <div className="particles"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">TMJ ELITE</h1>
          <p className="hero-subtitle">Precision Relief Solutions</p>
          <h2 className="hero-description">
            Experience Revolutionary TMJ Relief with Advanced Diagnostics
          </h2>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={openChat}>Start Your Assessment</button>
            <button className="btn-secondary" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* SYMPTOM CHECKER */}
      <section className="symptom-checker">
        <div className="symptom-container">
          <h2 className="symptom-title animate-on-scroll">Intelligent Symptom Analysis</h2>
          <p className="symptom-subtitle animate-on-scroll">Select your symptoms to receive a personalized assessment</p>
          
          <div className="severity-indicator animate-on-scroll">
            <div className="severity-fill" style={{width: `${severityLevel}%`}}></div>
          </div>
          
          <div className="symptom-grid">
            {[
              'Jaw clicking or popping',
              'Frequent headaches',
              'Ear pain or fullness',
              'Neck pain or stiffness',
              'Difficulty chewing'
            ].map((symptom, index) => (
              <div 
                key={symptom}
                className={`symptom-item animate-on-scroll ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <label className="symptom-label">
                  <input 
                    type="checkbox" 
                    className="symptom-checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                  />
                  <svg className="symptom-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {symptom}
                </label>
              </div>
            ))}
          </div>
          
          <button 
            className="btn-primary animate-on-scroll" 
            style={{display: 'block', margin: '2rem auto 0'}}
            onClick={openChat}
            disabled={selectedSymptoms.length === 0}
          >
            Get Your Personalized Treatment Plan
          </button>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="timeline-connector"></div>
        <div className="timeline-container">
          <h2 className="timeline-title animate-on-scroll">Your Journey to Relief</h2>
          <div className="timeline-steps">
            <div className="timeline-step animate-on-scroll">
              <div className="step-number">1</div>
              <h3 className="step-title">Consultation</h3>
              <p className="step-description">
                Comprehensive TMJ evaluation with Dr. Pedro using advanced diagnostic technology
              </p>
            </div>
            <div className="timeline-step animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <div className="step-number">2</div>
              <h3 className="step-title">Diagnosis</h3>
              <p className="step-description">
                3D imaging and AI-assisted analysis for precise treatment planning
              </p>
            </div>
            <div className="timeline-step animate-on-scroll" style={{animationDelay: '0.4s'}}>
              <div className="step-number">3</div>
              <h3 className="step-title">Treatment</h3>
              <p className="step-description">
                Personalized therapy combining cutting-edge technology with proven methods
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="technology-section">
        <div className="tech-container">
          <h2 className="tech-title animate-on-scroll">Advanced TMJ Technology</h2>
          <div className="tech-grid">
            <div className="tech-card animate-on-scroll">
              <svg className="tech-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="tech-name">3D Jaw Mapping</h3>
              <p className="tech-description">
                Precision diagnostics with millimeter accuracy for perfect treatment alignment
              </p>
            </div>
            <div className="tech-card animate-on-scroll" style={{animationDelay: '0.1s'}}>
              <svg className="tech-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="tech-name">Laser Therapy</h3>
              <p className="tech-description">
                Non-invasive pain relief and accelerated healing at the cellular level
              </p>
            </div>
            <div className="tech-card animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <svg className="tech-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <h3 className="tech-name">Custom Orthotics</h3>
              <p className="tech-description">
                Personalized jaw alignment solutions crafted with nanometer precision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title animate-on-scroll">Patient Success Stories</h2>
          <div className="testimonial-card animate-on-scroll">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "After years of TMJ pain, Dr. Pedro's treatment gave me my life back. 
              The advanced technology and personalized care made all the difference."
            </p>
            <p className="testimonial-author">Sarah M.</p>
          </div>
          <div className="testimonial-card animate-on-scroll" style={{animationDelay: '0.2s'}}>
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "I can finally eat without pain! The 3D mapping showed exactly what was wrong, 
              and the treatment plan worked perfectly. Dr. Pedro is a true expert."
            </p>
            <p className="testimonial-author">Michael R.</p>
          </div>
        </div>
      </section>

      {/* INTEGRATED CHAT BUTTON */}
      <div className="chat-launcher" onClick={openChat}>
        <svg className="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>

      {/* CHAT INTERFACE (Hidden by default) */}
      {chatOpen && (
        <div className="chat-interface" style={{
          position: 'fixed',
          bottom: '100px',
          right: '2rem',
          width: '400px',
          height: '600px',
          background: 'linear-gradient(135deg, #0A0A0A, #1A1A1A)',
          border: '2px solid #FFD700',
          borderRadius: '20px',
          padding: '1.5rem',
          zIndex: 1001,
          boxShadow: '0 20px 60px rgba(255, 215, 0, 0.3)'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h3 style={{color: '#FFD700', fontSize: '1.5rem'}}>TMJ Specialist Assistant</h3>
            <button onClick={() => setChatOpen(false)} style={{
              background: 'none',
              border: 'none',
              color: '#C0C0C0',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}>✕</button>
          </div>
          <div style={{
            background: 'rgba(255, 215, 0, 0.1)',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem'
          }}>
            <p style={{color: '#FFD700', marginBottom: '0.5rem'}}>AI-Powered TMJ Analysis</p>
            <p style={{color: '#C0C0C0', fontSize: '0.9rem'}}>
              Based on your symptoms: {selectedSymptoms.join(', ') || 'None selected'}
            </p>
            <p style={{color: '#FFD700', fontSize: '0.9rem', marginTop: '0.5rem'}}>
              Severity Level: {severityLevel.toFixed(0)}%
            </p>
          </div>
          <div style={{
            height: '400px',
            overflowY: 'auto',
            marginBottom: '1rem',
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px'
          }}>
            <p style={{color: '#C0C0C0', marginBottom: '1rem'}}>
              Hello! I'm your TMJ specialist assistant. I can help you understand your symptoms 
              and guide you through treatment options.
            </p>
            {selectedSymptoms.length > 0 && (
              <p style={{color: '#FFD700', marginBottom: '1rem'}}>
                I see you're experiencing {selectedSymptoms.length} symptoms. Let's discuss 
                how Dr. Pedro's advanced treatments can help relieve your specific conditions.
              </p>
            )}
            <p style={{color: '#C0C0C0'}}>
              Would you like to schedule a consultation or learn more about our treatment options?
            </p>
          </div>
          <button 
            className="btn-primary" 
            style={{width: '100%'}}
            onClick={() => window.location.href = 'tel:+1-917-993-7306'}
          >
            Schedule Consultation Now
          </button>
        </div>
      )}
    </div>
  );
}

export default App;