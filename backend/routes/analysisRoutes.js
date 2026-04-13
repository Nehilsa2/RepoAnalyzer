const express = require('express');
const router = express.Router();

const { analyzeFiles } = require('../controllers/analysisController');

router.post('/analyze-files', analyzeFiles);

module.exports = router;