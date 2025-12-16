
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
    customer_phone: data.customer_phone, // Added phone field
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
      // If server responds with error (e.g. 500, 404), throw to catch block to trigger fallback
      throw new Error(`Server Error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.warn("Backend connection failed. Switching to DEMO MODE.", error);

    // In this specific demo application, we almost ALWAYS want to fallback to demo mode
    // if the local backend isn't running, rather than showing a technical error to the user.
    // So we return the demo response for ANY error during the fetch process.
    return { 
      success: true, 
      messageId: 'DEMO-SIMULATION-' + Date.now(), 
      demo: true 
    };
  }
};
