import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  bookingSlots?: BookingSlot[];
  appointmentRequestId?: string;
  isBookingRequest?: boolean;
}

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


interface Appointment {
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  preferred_date: string;
  preferred_time: string;
  symptoms: string[];
  severity_level: number;
  notes?: string;
}

class TMJChatService {
  private backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://pedrobackend.onrender.com';
  
  async sendMessage(message: string, conversationId: string, symptoms: string[], severityLevel: number): Promise<ChatResponse> {
    try {
      // Try the enhanced chat endpoint
      let response = await fetch(`${this.backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationId,
          context: {
            type: 'tmj_consultation',
            symptoms,
            severityLevel,
            specialty: 'TMJ'
          }
        })
      });

      // If chat endpoint fails, try alternative endpoints
      if (!response.ok) {
        // Try without /api prefix
        response = await fetch(`${this.backendUrl}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            conversationId,
            context: {
              type: 'tmj_consultation',
              symptoms,
              severityLevel,
              specialty: 'TMJ'
            }
          })
        });
      }

      if (!response.ok) {
        throw new Error('Chat service error');
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Chat error:', error);
      return {
        response: "I apologize, but I'm having trouble connecting. Please call us at (917) 993-7306 for immediate assistance.",
        conversationId: conversationId || `tmj_${Date.now()}`,
        stage: 'error',
        gatheredInfo: {}
      };
    }
  }

  async bookAppointment(appointment: Appointment): Promise<{ success: boolean; message: string; appointmentId?: string }> {
    try {
      // Insert appointment into Supabase
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            patient_name: appointment.patient_name,
            patient_email: appointment.patient_email,
            patient_phone: appointment.patient_phone,
            appointment_date: appointment.preferred_date,
            appointment_time: appointment.preferred_time,
            appointment_type: 'TMJ Consultation',
            status: 'pending',
            notes: `Symptoms: ${appointment.symptoms.join(', ')}\nSeverity: ${appointment.severity_level}%\n${appointment.notes || ''}`,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email via backend
      await this.sendAppointmentConfirmation(data.id, appointment);

      return {
        success: true,
        message: 'Appointment booked successfully! You will receive a confirmation email shortly.',
        appointmentId: data.id
      };
    } catch (error) {
      console.error('Booking error:', error);
      return {
        success: false,
        message: 'Unable to book appointment. Please call us at (917) 993-7306.'
      };
    }
  }

  private async sendAppointmentConfirmation(appointmentId: string, appointment: Appointment): Promise<void> {
    try {
      await fetch(`${this.backendUrl}/api/appointments/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId,
          email: appointment.patient_email,
          phone: appointment.patient_phone,
          details: {
            patientName: appointment.patient_name,
            date: appointment.preferred_date,
            time: appointment.preferred_time,
            type: 'TMJ Consultation with Dr. Pedro',
            symptoms: appointment.symptoms,
            severityLevel: appointment.severity_level
          }
        })
      });
    } catch (error) {
      console.error('Error sending confirmation:', error);
    }
  }

  async getAvailableSlots(date: string): Promise<string[]> {
    try {
      // Check availability in Supabase
      const { data, error } = await supabase
        .from('availability')
        .select('available_times')
        .eq('date', date)
        .single();

      if (error || !data) {
        // Return default slots if no specific availability
        return ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
      }

      return data.available_times;
    } catch (error) {
      console.error('Error fetching slots:', error);
      return [];
    }
  }

  async saveConversation(conversationId: string, messages: Message[]): Promise<void> {
    try {
      await supabase
        .from('conversations')
        .upsert({
          id: conversationId,
          messages: messages,
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }
}

export default new TMJChatService();