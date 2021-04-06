const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const PORT = 5000;

// Route Files
const bootcamps = require('./routes/bootcamp');

// Connect to Database ...
connectDB();

// Initializing Express Server
const app = express();

// Body Parser
app.use(express.json());

// Logs via Morgan
app.use(morgan('dev'));

// Mount the routers
app.use('/api/v1/bootcamps',bootcamps);

const server = app.listen(PORT, console.log("Running in port 5000"));

// Handled Unhandled promise rejection
process.on('unhandledRejection',(err,promise)=>{
    console.log("Error: Issue with your DB");
    console.log(err.message);

    server.close(()=> process.exit());
});