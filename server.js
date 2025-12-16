
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// This server file is no longer required for sending emails as we have migrated to EmailJS (Client-side).
// It is kept as a placeholder in case you need a backend for other features later.

app.use(express.json());

app.get('/', (req, res) => {
  res.send('StarVnt Backend is running. Email services are handled by EmailJS on the client.');
});

app.listen(PORT, () => {
  console.log(`StarVnt Backend running on port ${PORT}`);
  console.log("Email System: Migrated to EmailJS (Client-Side)");
});
