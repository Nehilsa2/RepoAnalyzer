require('dotenv').config();
const express = require('express');
const cors = require('cors')

const repoRoutes = require('./routes/repoRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/repo', repoRoutes);
app.use('/api/analysis', analysisRoutes);

app.get('/',(req,res)=>{
    res.send("server working!")
})

module.exports = app;