
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Manual CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Configuration
// ⚠️ IMPORTANT: You must replace 'events@starvnt.com' with the GMAIL ADDRESS that generated the App Password.
const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.GMAIL_USER || 'events@starvnt.com', // <--- REPLACE THIS WITH YOUR REAL GMAIL
    pass: process.env.GMAIL_APP_PASSWORD || 'teat alrk mafc olpw' 
  }
};

// Luxury HTML Template
const EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { background-color: #0F172A; color: #E2E8F0; font-family: 'Playfair Display', Georgia, serif; margin: 0; padding: 0; }
  .wrapper { width: 100%; background-color: #0F172A; padding: 40px 0; }
  .container { max-width: 600px; margin: 0 auto; background-color: #1E293B; border: 1px solid #EAB308; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
  .header { background: linear-gradient(to right, #CA8A04, #EAB308); padding: 30px; text-align: center; }
  .logo { font-size: 28px; font-weight: bold; color: #0F172A; letter-spacing: 4px; text-transform: uppercase; margin: 0; }
  .content { padding: 40px 30px; }
  .greeting { font-size: 18px; color: #F8FAFC; margin-bottom: 20px; }
  .message { color: #94A3B8; line-height: 1.6; margin-bottom: 30px; }
  .details-box { background-color: #0F172A; border: 1px solid #334155; border-radius: 4px; padding: 20px; margin-bottom: 30px; }
  .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1E293B; }
  .detail-row:last-child { border-bottom: none; }
  .label { color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
  .value { color: #EAB308; font-weight: 600; text-align: right; }
  .cta-button { display: block; width: 200px; margin: 0 auto; background-color: #EAB308; color: #0F172A; text-align: center; padding: 15px 0; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px; transition: background 0.3s; }
  .cta-button:hover { background-color: #CA8A04; }
  .links { text-align: center; margin-top: 25px; font-size: 12px; }
  .links a { color: #EAB308; text-decoration: none; margin: 0 10px; }
  .footer { background-color: #020617; padding: 20px; text-align: center; font-size: 10px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo">StarVnt</h1>
        <p style="margin: 5px 0 0 0; font-size: 10px; color: #0F172A; opacity: 0.8; letter-spacing: 2px;">THE 2026 EVENT REVOLUTION</p>
      </div>
      
      <div class="content">
        <h2 class="greeting">Namaste, {{customer_name}}</h2>
        <p class="message">
          Your journey with StarVnt has officially begun. We have received your booking request, and our AI curators are already orchestrating a cinematic experience tailored just for you.
        </p>
        
        <div class="details-box">
          <div class="detail-row">
            <span class="label">Booking ID</span>
            <span class="value" style="font-family: monospace;">{{booking_id}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Event Type</span>
            <span class="value">{{event_type}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Date</span>
            <span class="value">{{event_date}}</span>
          </div>
           <div class="detail-row">
            <span class="label">Venue</span>
            <span class="value">{{venue_name}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Guests</span>
            <span class="value">{{guest_count}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Contact</span>
            <span class="value">{{customer_phone}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Estimated Budget</span>
            <span class="value">{{currency}} {{amount_paid}}</span>
          </div>
        </div>

        <a href="{{manage_booking_url}}" class="cta-button">Manage Booking</a>
        
        <div class="links">
          <a href="{{add_to_calendar_url}}">Add to Calendar</a> • 
          <a href="{{manage_preferences_url}}">Preferences</a>
        </div>
      </div>
      
      <div class="footer">
        <p>&copy; 2026 StarVnt International. All Rights Reserved.</p>
        <p><a href="{{unsubscribe_url}}" style="color: #475569; text-decoration: none;">Unsubscribe</a></p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Email Sending Function
async function sendEmail(data) {
  const transporter = nodemailer.createTransport(SMTP_CONFIG);

  // Verify connection configuration
  try {
    await transporter.verify();
    console.log("SMTP Connection verified successfully.");
  } catch (err) {
    console.error("SMTP Connection FAILED. Check credentials:", err);
    throw err;
  }

  // Use Regex Global Replacement to ensure all variables are replaced
  const html = EMAIL_TEMPLATE
    .replace(/{{booking_id}}/g, data.booking_id)
    .replace(/{{event_type}}/g, data.event_type)
    .replace(/{{event_date}}/g, data.event_date || "TBD")
    .replace(/{{venue_name}}/g, data.venue_name || "To Be Confirmed")
    .replace(/{{venue_address}}/g, data.venue_address || "")
    .replace(/{{customer_name}}/g, data.customer_name)
    .replace(/{{customer_phone}}/g, data.customer_phone || "Not Provided")
    .replace(/{{guest_count}}/g, data.guest_count || "TBD")
    .replace(/{{currency}}/g, "₹")
    .replace(/{{amount_paid}}/g, new Intl.NumberFormat('en-IN').format(data.amount_paid || 0))
    .replace(/{{manage_booking_url}}/g, data.manage_booking_url)
    .replace(/{{add_to_calendar_url}}/g, data.add_to_calendar_url)
    .replace(/{{manage_preferences_url}}/g, data.manage_preferences_url)
    .replace(/{{unsubscribe_url}}/g, data.unsubscribe_url);

  const info = await transporter.sendMail({
    from: `"StarVnt Entertainment" <${SMTP_CONFIG.auth.user}>`,
    to: data.to_email,
    subject: `Booking Confirmed: ${data.event_type} — StarVnt Entertainment`,
    html: html,
  });

  return info;
}

// API Endpoint
app.post('/api/send-booking-email', async (req, res) => {
  try {
    const data = req.body;
    
    // Basic validation
    if (!data.to_email || !data.customer_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`Processing booking email for: ${data.to_email}`);
    const info = await sendEmail(data);
    console.log(`Email sent successfully: ${info.messageId}`);
    
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    // Return detailed error to frontend
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`StarVnt Backend running on port ${PORT}`);
  console.log("---------------------------------------------------------");
  console.log("SMTP CONFIGURATION:");
  console.log(`User: ${SMTP_CONFIG.auth.user}`);
  console.log("Pass: [HIDDEN] (Using provided App Password)");
  console.log("NOTE: If sending fails, ensure 'User' matches the Gmail account generating the App Password.");
  console.log("---------------------------------------------------------");
});
