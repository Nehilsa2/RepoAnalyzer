const express = require('express');
const router = express.Router();

const requireGithubAuth = require('../middleware/requireGithubAuth');
const { analyzeFiles, raiseIssues } = require('../controllers/analysisController');

router.post('/analyze-files', requireGithubAuth, analyzeFiles);
router.post('/raise-issues', requireGithubAuth, raiseIssues);

module.exports = router;