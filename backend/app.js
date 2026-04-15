require('dotenv').config();
const express = require('express');
const cors = require('cors')

const authRoutes = require('./routes/authRoutes');
const repoRoutes = require('./routes/repoRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();

const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/repo', repoRoutes);
app.use('/api/analysis', analysisRoutes);

app.get('/',(req,res)=>{
    res.send("server working!")
})

module.exports = app;