
import emailjs from '@emailjs/browser';
import { BookingSubmission } from "../types";

// EmailJS Configuration
const SERVICE_ID = "service_7oy647e";
const TEMPLATE_ID = "template_43dtmxs";
const PUBLIC_KEY = "-dWuTBPugoAZ-wgQp";

// Initialize function
export const initEmailService = () => {
  // Initialize EmailJS with Public Key
  emailjs.init(PUBLIC_KEY);
  console.log("EmailJS Service Initialized (Client Side)");
};

export const sendBookingEmail = async (data: BookingSubmission) => {
  try {
    // Prepare template parameters
    // Keys should match the variables defined in your EmailJS template (e.g., {{customer_name}})
    // Added 'to_email', 'email', 'reply_to' to ensure the recipient address is correctly mapped regardless of template settings
    const templateParams = {
      booking_id: data.booking_id,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      event_type: data.event_type,
      event_date: data.event_date,
      guest_count: data.guest_count,
      venue_name: data.venue_name || 'Not Decided',
      venue_address: data.venue_address || 'N/A',
      budget: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(data.amount_paid),
      
      // Critical fix for "recipients address is empty" error
      // These cover common variable names used in EmailJS templates for the "To Email" field
      to_email: data.customer_email,
      user_email: data.customer_email,
      email: data.customer_email,
      reply_to: data.customer_email,
      
      // Additional metadata for the email template
      manage_booking_link: `https://starvnt.com/manage-booking?id=${data.booking_id}`,
      support_email: 'events@starvnt.com'
    };

    console.log("Sending email via EmailJS...", templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('SUCCESS!', response.status, response.text);
    return { success: true, messageId: `EMAILJS-${Date.now()}` };

  } catch (error: any) {
    console.error('FAILED...', error);
    // Return a structured error that the UI can display
    // error.text contains the specific EmailJS error message like "The recipients address is empty"
    throw new Error(error.text || "Failed to send booking request via EmailJS network.");
  }
};
