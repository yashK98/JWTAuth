const express = require('express');
const morgan = require('morgan');
const PORT = 5000;

// Route Files ...
const bootcamps = require('./routes/bootcamp');

// Initializing Express Server
const app = express();

// Logs via Morgan
app.use(morgan('dev'));

// Mount the routers
app.use('/api/v1/bootcamps',bootcamps);

app.listen(PORT, console.log("Running in port 5000"));