require('dotenv').config();
const express = require('express');
const cors = require('cors')

const authRoutes = require('./routes/authRoutes');
const repoRoutes = require('./routes/repoRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();

const connectDB = require("./config/db");
connectDB();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    ...(process.env.FRONTEND_URLS || '').split(',').map((value) => value.trim()),
    'https://repo-analyzer-gamma.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]
    .filter(Boolean)
    .map((value) => value.replace(/\/$/, ''));

app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        const normalizedOrigin = origin.replace(/\/$/, '');
        const isAllowedLocalOrConfigured = allowedOrigins.includes(normalizedOrigin);

        let isAllowedVercel = false;
        try {
            const parsed = new URL(normalizedOrigin);
            isAllowedVercel = parsed.protocol === 'https:' && parsed.hostname.endsWith('.vercel.app');
        } catch {
            isAllowedVercel = false;
        }

        if (isAllowedLocalOrConfigured || isAllowedVercel) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/repo', repoRoutes);
app.use('/api/analysis', analysisRoutes);

app.get('/',(req,res)=>{
    res.send("server working!")
})

module.exports = app;