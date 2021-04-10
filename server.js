const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
var constants = require('./constants/constants');

// Importing Route Files
const users = require('./routes/user');

// DB connection and Initializing server 
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Mounting the routers
app.use('/api/v1/users',users);

// Starting the server
const PORT = constants.PORT;
const server = app.listen(PORT, console.log("Running in port 5000"));

// Event to Stop server incase it fails to connect to DB
process.on('unhandledRejection',(err,promise)=>{
    console.log("Error: Issue with your DB");
    console.log(err.message);

    server.close(()=> process.exit());
});