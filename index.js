const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS so the API is testable remotely
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from 'public'
app.use(express.static('public'));

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // No date parameter, use current date/time
    date = new Date();
  } else {
    // Check if dateParam is a number (timestamp)
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
