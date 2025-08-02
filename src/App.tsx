import { useEffect, useState } from 'react';
import './App.css';
import TMJChatbot from './components/TMJChatbot';
import TMJHeroSection from './components/TMJHeroSection';
import TMJHeroSectionPolished from './components/TMJHeroSection-Polished';

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severityLevel, setSeverityLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  
  // Check for polished version via query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const usePolishedVersion = urlParams.get('polished') === 'true';

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
  };

  const closeChat = () => {
    setChatOpen(false);
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
      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* HERO SECTION */}
      {usePolishedVersion ? <TMJHeroSectionPolished /> : <TMJHeroSection />}

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


      {/* TMJ CHATBOT */}
      <TMJChatbot 
        isOpen={chatOpen}
        onClose={closeChat}
        onOpen={openChat}
        selectedSymptoms={selectedSymptoms}
        severityLevel={severityLevel}
      />
    </div>
  );
}

export default App;