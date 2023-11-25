require('dotenv').config({ path: './config.env'});

const express = require('express');
const session = require('express-session');


const PORT = process.env.PORT;


// Express Server 
const app = express();

// Middleware
app.use(express.json());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}));

// Routing middleware
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));



const server = app.listen(PORT, async () => {
    console.log(`Listening at http://localhost:${PORT}`);
});


process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});