require('dotenv').config({ path: './config.env'});

const express = require('express');
const { sequelize } = require('./config/db');
const User = require('./models/user');

const PORT = process.env.PORT;


// Express Server 
const app = express();

const server = app.listen(PORT, async () => {
    console.log(`Listening at http://localhost:${PORT}`);
});


process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});