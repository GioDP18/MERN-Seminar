require('dotenv').config();
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { requireAuth } = require('./middleware/authMiddleware');
const router = require('./routes/router');

const app = express();

// DB Connection
connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}))
app.use(bodyParser.json({extend: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use('/api/v1', router)

app.use('/protected', requireAuth, (req, res) => {
    res.json({message: "Access granted"});
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Internal Server Error"});
});
app.listen(PORT = process.env.PORT || 3000, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
})
