// Bring in the express library / package
const express = require('express');

// Invoke express and store it in an app variable
const app = express();

// Choose a port to serve info over
const port = 3000;

// Static files
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

// About page
app.get('/about', (req, res) => {
  res.sendFile(__dirname + "/views/about.html")
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
