import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  TextField,
  IconButton,
  Typography,
  Paper,
  Fab,
  Button,
  useMediaQuery,
  useTheme,
  Chip
} from '@mui/material';
import { 
  Close as CloseIcon,
  Send as SendIcon,
  ChatBubbleOutline as ChatIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import chatService from '../services/chatService';

// Glass orb animation
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
  }
`;

// Styled Components
const GlassOrb = styled(Fab)(() => ({
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  width: '72px',
  height: '72px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.15) 100%)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '2px solid rgba(212, 175, 55, 0.4)',
  color: '#D4AF37',
  animation: `${float} 3s ease-in-out infinite`,
  boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  overflow: 'hidden',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.25) 100%)',
    animation: `${float} 3s ease-in-out infinite, ${pulse} 2s infinite`,
    transform: 'scale(1.05)',
    boxShadow: '0 12px 40px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  },
  '& svg': {
    fontSize: '32px',
    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(212, 175, 55, 0.1) 100%)',
    pointerEvents: 'none',
  },
  zIndex: 1000,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '480px',
    maxWidth: '95vw',
    height: '600px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0A0A0A',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      margin: 0,
      borderRadius: 0,
    },
  },
}));

const MessageContainer = styled(Box)(() => ({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(212, 175, 55, 0.3)',
    borderRadius: '3px',
  },
}));

const Message = styled(Paper)<{ isUser: boolean }>(({ isUser }) => ({
  padding: '12px 16px',
  maxWidth: '75%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser ? 'rgba(212, 175, 55, 0.15)' : 'rgba(60, 60, 60, 0.3)',
  border: `1px solid ${isUser ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
  color: '#FFFFFFE6',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderTop: '1px solid rgba(212, 175, 55, 0.2)',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  backgroundColor: 'rgba(10, 10, 10, 0.8)',
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

const StyledTextField = styled(TextField)(() => ({
  flex: 1,
  '& .MuiInputBase-root': {
    color: '#FFFFFFE6',
    backgroundColor: 'rgba(60, 60, 60, 0.3)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    borderRadius: '8px',
    '&:hover': {
      borderColor: 'rgba(212, 175, 55, 0.4)',
    },
    '&.Mui-focused': {
      borderColor: '#D4AF37',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const BookingButtonsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginTop: '12px',
  marginBottom: '8px',
}));

const BookingSlotButton = styled(Button)(() => ({
  padding: '12px 16px',
  backgroundColor: 'rgba(212, 175, 55, 0.1)',
  border: '1px solid rgba(212, 175, 55, 0.3)',
  borderRadius: '8px',
  color: '#D4AF37',
  textTransform: 'none',
  fontWeight: 500,
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderColor: 'rgba(212, 175, 55, 0.5)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(212, 175, 55, 0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '& .MuiButton-startIcon': {
    marginRight: '12px',
    color: '#D4AF37',
  },
  transition: 'all 0.2s ease-in-out',
}));

const BookingConfirmation = styled(Paper)(() => ({
  padding: '16px',
  marginTop: '12px',
  backgroundColor: 'rgba(76, 175, 80, 0.1)',
  border: '1px solid rgba(76, 175, 80, 0.3)',
  borderRadius: '8px',
  color: '#81C784',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

interface BookingSlot {
  id: string;
  displayText: string;
  date: string;
  time: string;
  timestamp: string;
}

interface ChatResponse {
  response: string;
  conversationId: string;
  stage: string;
  gatheredInfo: any;
  bookingSlots?: BookingSlot[];
  appointmentRequestId?: string;
  isBookingRequest?: boolean;
  isInfoRequest?: boolean;
  isPainExpression?: boolean;
}

interface MessageType {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  bookingSlots?: BookingSlot[];
  appointmentRequestId?: string;
  isBookingRequest?: boolean;
  isBooking?: boolean;
}

interface TMJChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  selectedSymptoms?: string[];
  severityLevel?: number;
}

export default function TMJChatbot({ isOpen, onClose, onOpen, selectedSymptoms = [], severityLevel = 0 }: TMJChatbotProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFab, setShowFab] = useState(true);
  const [conversationId, setConversationId] = useState<string>(`tmj-${Date.now()}`);
  const [currentBookingRequest, setCurrentBookingRequest] = useState<string | null>(null);
  const [bookedAppointment, setBookedAppointment] = useState<BookingSlot | null>(null);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (isOpen && messages.length === 0) {
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
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: MessageType = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const chatResponse: ChatResponse = await chatService.sendMessage(
        inputValue, 
        conversationId,
        selectedSymptoms,
        severityLevel
      );

      // Update conversation ID if provided
      if (chatResponse.conversationId) {
        setConversationId(chatResponse.conversationId);
      }

      const assistantMessage: MessageType = {
        role: 'assistant',
        content: chatResponse.response,
        timestamp: new Date(),
        bookingSlots: chatResponse.bookingSlots,
        appointmentRequestId: chatResponse.appointmentRequestId,
        isBookingRequest: chatResponse.isBookingRequest
      };

      // Store appointment request ID for later booking
      if (chatResponse.appointmentRequestId) {
        setCurrentBookingRequest(chatResponse.appointmentRequestId);
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSlotSelection = async (slot: BookingSlot) => {
    if (!slot || isBookingInProgress) return;

    setIsBookingInProgress(true);
    setIsTyping(true);

    try {
      // Show user's selection
      const userMessage: MessageType = {
        role: 'user',
        content: `I'd like to book the ${slot.displayText} appointment slot.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // Call the booking endpoint
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://pedrobackend.onrender.com';
      const response = await fetch(`${backendUrl}/api/tmj/book-slot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          appointmentRequestId: currentBookingRequest,
          selectedSlot: slot,
          patientContactInfo: {
            patient_name: 'TMJ Patient', // Placeholder - to be collected in future enhancement
            patient_email: 'patient@placeholder.com', // Placeholder - to be collected in future enhancement  
            patient_phone: '+15551234567' // Placeholder - to be collected in future enhancement
          }
        })
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const bookingResult = await response.json();

      if (bookingResult.success) {
        setBookedAppointment(slot);
        
        const confirmationMessage: MessageType = {
          role: 'assistant',
          content: `Perfect! Your TMJ consultation with Dr. Pedro is confirmed for ${slot.displayText}. You will receive confirmation via email and SMS shortly. Your confirmation number is ${bookingResult.confirmationNumber}. We look forward to helping you with your TMJ relief!`,
          timestamp: new Date(),
          isBooking: true
        };
        
        setMessages(prev => [...prev, confirmationMessage]);
      } else {
        throw new Error(bookingResult.error || 'Booking failed');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologize, but there was an issue booking your appointment. Please call us at (929) 242-4535 to complete your booking, or try selecting a different time slot.`,
        timestamp: new Date()
      }]);
    } finally {
      setIsBookingInProgress(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setShowFab(true);
    onClose();
  };

  const handleFabClick = () => {
    setShowFab(false);
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <>
      {!isOpen && showFab && (
        <GlassOrb onClick={handleFabClick} aria-label="Open chat">
          <ChatIcon />
        </GlassOrb>
      )}

      <StyledDialog
        open={isOpen}
        onClose={handleClose}
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
        }}>
          <Typography variant="h6" sx={{ 
            color: '#D4AF37',
            fontFamily: '"Spectral", serif',
            fontWeight: 400,
          }}>
            TMJ Specialist Assistant
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#FFFFFFE6' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ 
          padding: 0, 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}>
          <MessageContainer>
            {messages.map((message, index) => (
              <Box key={index}>
                <Message isUser={message.role === 'user'} elevation={0}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {message.content}
                  </Typography>
                  
                  {/* Show booking confirmation for confirmed appointments */}
                  {message.isBooking && bookedAppointment && (
                    <BookingConfirmation elevation={0}>
                      <CheckIcon />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Appointment Confirmed: {bookedAppointment.displayText}
                      </Typography>
                    </BookingConfirmation>
                  )}
                </Message>

                {/* Show booking slot buttons for assistant messages with slots */}
                {message.role === 'assistant' && message.bookingSlots && message.bookingSlots.length > 0 && !bookedAppointment && (
                  <BookingButtonsContainer>
                    <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 500, marginBottom: '8px' }}>
                      Click to book your preferred time:
                    </Typography>
                    {message.bookingSlots.map((slot) => (
                      <BookingSlotButton
                        key={slot.id}
                        onClick={() => handleSlotSelection(slot)}
                        disabled={isBookingInProgress}
                        startIcon={<CalendarIcon />}
                        fullWidth
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {slot.displayText}
                          </Typography>
                          <Chip 
                            label="Available" 
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(76, 175, 80, 0.2)',
                              color: '#81C784',
                              border: '1px solid rgba(76, 175, 80, 0.3)'
                            }}
                          />
                        </Box>
                      </BookingSlotButton>
                    ))}
                  </BookingButtonsContainer>
                )}
              </Box>
            ))}
            {isTyping && (
              <Message isUser={false} elevation={0}>
                <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.7 }}>
                  {isBookingInProgress ? 'Booking your appointment...' : 'Typing...'}
                </Typography>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </MessageContainer>

          <InputContainer>
            <StyledTextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus={!isMobile}
            />
            <IconButton 
              onClick={handleSend} 
              disabled={!inputValue.trim() || isTyping}
              sx={{ 
                color: '#D4AF37',
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                },
                '&.Mui-disabled': {
                  color: 'rgba(212, 175, 55, 0.3)',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </InputContainer>
        </DialogContent>
      </StyledDialog>
    </>
  );
}