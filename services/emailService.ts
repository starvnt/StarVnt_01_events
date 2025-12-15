import { BookingSubmission } from "../types";

// Initialize function - keeps API consistent
export const initEmailService = () => {
  console.log("Email Service Initialized (Backend Mode)");
};

export const sendBookingEmail = async (data: BookingSubmission) => {
  // Prepare the full data payload expected by the backend template
  const payload = {
    booking_id: data.booking_id,
    event_type: data.event_type,
    event_date: data.event_date,
    venue_name: data.venue_name || "To Be Confirmed",
    venue_address: data.venue_address || "Details will be shared shortly",
    customer_name: data.customer_name,
    guest_count: data.guest_count || 0,
    amount_paid: data.amount_paid || 0,
    to_email: data.customer_email,
    
    // Generate URLs here to keep backend pure
    manage_booking_url: `https://starvnt.com/manage-booking?id=${data.booking_id}`,
    add_to_calendar_url: `https://starvnt.com/calendar?id=${data.booking_id}`,
    manage_preferences_url: "https://starvnt.com/preferences",
    unsubscribe_url: "https://starvnt.com/unsubscribe"
  };

  // Use 127.0.0.1 instead of localhost to avoid IPv6 issues in Node
  const BACKEND_URL = 'http://127.0.0.1:3000/api/send-booking-email';

  try {
    // Attempt to send via backend
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // If server responds with error (e.g. Auth failed), we still want to show that.
      throw new Error(errorData.details || errorData.error || `Server Error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.warn("Backend connection failed. Switching to DEMO MODE.", error);

    // CHECK: Is this a network connection error?
    const isNetworkError = 
      error instanceof TypeError ||
      error.message === 'Failed to fetch' || 
      error.message.includes('NetworkError') ||
      error.code === 'ECONNREFUSED';

    if (isNetworkError) {
      // FALLBACK: Return a mock success response so the UI doesn't break.
      // We include a 'demo' flag so the UI can warn the user.
      return { 
        success: true, 
        messageId: 'DEMO-SIMULATION-' + Date.now(), 
        demo: true 
      };
    }

    throw error;
  }
};
