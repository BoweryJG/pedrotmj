import './App.css';

function App() {
  return (
    <div className="app">
      {/* HERO SECTION */}
      <section className="tmj-hero">
        <div className="hero-content">
          <h1 className="hero-title">TMJ ELITE</h1>
          <p className="hero-subtitle">Precision Relief Solutions</p>
          <h2 className="hero-description">
            Experience Revolutionary TMJ Relief with Advanced Diagnostics
          </h2>
          <div className="hero-buttons">
            <button className="btn-primary">Start Your Assessment</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* SYMPTOM CHECKER */}
      <section className="symptom-checker">
        <div className="symptom-container">
          <h2 className="symptom-title">Check Your Symptoms</h2>
          <div className="symptom-grid">
            <div className="symptom-item">
              <label className="symptom-label">
                <input type="checkbox" className="symptom-checkbox" />
                Jaw clicking or popping
              </label>
            </div>
            <div className="symptom-item">
              <label className="symptom-label">
                <input type="checkbox" className="symptom-checkbox" />
                Frequent headaches
              </label>
            </div>
            <div className="symptom-item">
              <label className="symptom-label">
                <input type="checkbox" className="symptom-checkbox" />
                Ear pain or fullness
              </label>
            </div>
            <div className="symptom-item">
              <label className="symptom-label">
                <input type="checkbox" className="symptom-checkbox" />
                Neck pain or stiffness
              </label>
            </div>
            <div className="symptom-item">
              <label className="symptom-label">
                <input type="checkbox" className="symptom-checkbox" />
                Difficulty chewing
              </label>
            </div>
          </div>
          <button className="btn-primary" style={{display: 'block', margin: '0 auto'}}>
            See Your Treatment Options
          </button>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="timeline-container">
          <h2 className="timeline-title">Your Journey to Relief</h2>
          <div className="timeline-steps">
            <div className="timeline-step">
              <div className="step-number">1</div>
              <h3 className="step-title">Consultation</h3>
              <p className="step-description">
                Comprehensive TMJ evaluation with Dr. Pedro
              </p>
            </div>
            <div className="timeline-step">
              <div className="step-number">2</div>
              <h3 className="step-title">Diagnosis</h3>
              <p className="step-description">
                Advanced 3D imaging and precise analysis
              </p>
            </div>
            <div className="timeline-step">
              <div className="step-number">3</div>
              <h3 className="step-title">Treatment</h3>
              <p className="step-description">
                Personalized therapy plan for lasting relief
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="technology-section">
        <div className="tech-container">
          <h2 className="tech-title">Advanced TMJ Technology</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <svg className="tech-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="tech-name">3D Jaw Mapping</h3>
              <p className="tech-description">
                Precision diagnostics with millimeter accuracy
              </p>
            </div>
            <div className="tech-card">
              <svg className="tech-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="tech-name">Laser Therapy</h3>
              <p className="tech-description">
                Non-invasive pain relief and healing acceleration
              </p>
            </div>
            <div className="tech-card">
              <svg className="tech-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <h3 className="tech-name">Custom Orthotics</h3>
              <p className="tech-description">
                Personalized jaw alignment solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title">Patient Success Stories</h2>
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "After years of TMJ pain, Dr. Pedro's treatment gave me my life back. 
              The advanced technology and personalized care made all the difference."
            </p>
            <p className="testimonial-author">- Sarah M.</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "I can finally eat without pain! The 3D mapping showed exactly what was wrong, 
              and the treatment plan worked perfectly."
            </p>
            <p className="testimonial-author">- Michael R.</p>
          </div>
        </div>
      </section>

      {/* CHAT BUTTON */}
      <div className="chat-launcher">
        <svg className="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
    </div>
  );
}

export default App;