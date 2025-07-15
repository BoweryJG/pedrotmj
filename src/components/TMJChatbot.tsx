import { useState, useEffect, useRef } from 'react';
import chatService from '../services/chatService';
import './TMJChatbot.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TMJChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSymptoms: string[];
  severityLevel: number;
}

export default function TMJChatbot({ isOpen, onClose, selectedSymptoms, severityLevel }: TMJChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    preferred_date: '',
    preferred_time: '',
    notes: ''
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = useRef(`tmj-${Date.now()}`);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      const greeting = selectedSymptoms.length > 0
        ? `Hello! I see you're experiencing ${selectedSymptoms.join(', ')}. With a severity level of ${severityLevel}%, I understand you're looking for relief. I'm here to help you understand your treatment options and schedule a consultation with Dr. Pedro.`
        : `Hello! I'm your TMJ specialist assistant. I can help you understand your symptoms, explore treatment options, and schedule a consultation with Dr. Pedro. What brings you here today?`;
      
      setMessages([{
        role: 'assistant',
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, selectedSymptoms, severityLevel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (bookingData.preferred_date) {
      fetchAvailableSlots(bookingData.preferred_date);
    }
  }, [bookingData.preferred_date]);

  const fetchAvailableSlots = async (date: string) => {
    const slots = await chatService.getAvailableSlots(date);
    setAvailableSlots(slots);
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Check for booking intent
    const bookingKeywords = ['book', 'schedule', 'appointment', 'consultation', 'visit'];
    const wantsToBook = bookingKeywords.some(keyword => 
      inputValue.toLowerCase().includes(keyword)
    );

    if (wantsToBook) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'd be happy to help you schedule a consultation with Dr. Pedro. Let me gather some information to book your appointment.",
          timestamp: new Date()
        }]);
        setIsTyping(false);
        setShowBookingForm(true);
      }, 1000);
      return;
    }

    // Get AI response
    const response = await chatService.sendMessage(
      inputValue,
      conversationId.current,
      selectedSymptoms,
      severityLevel
    );

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }]);
    setIsTyping(false);

    // Save conversation
    await chatService.saveConversation(conversationId.current, messages);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);

    const result = await chatService.bookAppointment({
      ...bookingData,
      symptoms: selectedSymptoms,
      severity_level: severityLevel
    });

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: result.message,
      timestamp: new Date()
    }]);

    if (result.success) {
      setShowBookingForm(false);
      setBookingData({
        patient_name: '',
        patient_email: '',
        patient_phone: '',
        preferred_date: '',
        preferred_time: '',
        notes: ''
      });
    }

    setIsTyping(false);
  };

  const quickActions = [
    'Tell me about TMJ treatments',
    'What causes TMJ pain?',
    'Book a consultation',
    'Insurance coverage?'
  ];

  if (!isOpen) return null;

  return (
    <div className="tmj-chatbot">
      {/* Micro Screws */}
      <div className="micro-screw top-left"></div>
      <div className="micro-screw top-right"></div>
      <div className="micro-screw bottom-left"></div>
      <div className="micro-screw bottom-right"></div>
      
      {/* Gold Particles Container */}
      <div className="gold-particles"></div>
      
      <div className="chatbot-header">
        <div className="header-content">
          <h3>TMJ Specialist Assistant</h3>
          <p>Dr. Pedro's AI Consultation</p>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      {selectedSymptoms.length > 0 && (
        <div className="symptom-summary">
          <p className="summary-title">Your TMJ Profile</p>
          <div className="symptom-chips">
            {selectedSymptoms.map(symptom => (
              <span key={symptom} className="symptom-chip">{symptom}</span>
            ))}
          </div>
          <div className="severity-bar">
            <div className="severity-fill" style={{ width: `${severityLevel}%` }}></div>
          </div>
          <p className="severity-text">Severity: {severityLevel}%</p>
        </div>
      )}

      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              {message.content}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message assistant typing">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showBookingForm ? (
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <h4>Schedule Your TMJ Consultation</h4>
          <input
            type="text"
            placeholder="Your Name"
            value={bookingData.patient_name}
            onChange={(e) => setBookingData({ ...bookingData, patient_name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={bookingData.patient_email}
            onChange={(e) => setBookingData({ ...bookingData, patient_email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={bookingData.patient_phone}
            onChange={(e) => setBookingData({ ...bookingData, patient_phone: e.target.value })}
            required
          />
          <input
            type="date"
            value={bookingData.preferred_date}
            onChange={(e) => setBookingData({ ...bookingData, preferred_date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          {availableSlots.length > 0 && (
            <select
              value={bookingData.preferred_time}
              onChange={(e) => setBookingData({ ...bookingData, preferred_time: e.target.value })}
              required
            >
              <option value="">Select Time</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          )}
          <textarea
            placeholder="Additional notes (optional)"
            value={bookingData.notes}
            onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
            rows={3}
          />
          <div className="form-buttons">
            <button type="submit" className="submit-btn">Book Appointment</button>
            <button type="button" onClick={() => setShowBookingForm(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="quick-actions">
            {quickActions.map(action => (
              <button
                key={action}
                className="quick-action-btn"
                onClick={() => {
                  setInputValue(action);
                  sendMessage();
                }}
              >
                {action}
              </button>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <div className="input-glow"></div>
            <button onClick={sendMessage} className="send-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </>
      )}

      <div className="chatbot-footer">
        <p>🔒 HIPAA Compliant • Your data is secure</p>
      </div>
    </div>
  );
}