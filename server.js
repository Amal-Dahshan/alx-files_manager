const express = require('express');
const routes = require('./routes');

const app = express();

// Set port from environment variable or default to 5000
const port = process.env.PORT || 5000;

// Load all routes from routes/index.js
app.use(routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));

