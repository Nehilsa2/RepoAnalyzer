const express = require('express');
const router = express.Router();

const requireGithubAuth = require('../middleware/requireGithubAuth');
const { getRepoFiles, getMyRepos } = require('../controllers/repoController');

router.get('/my-repos', requireGithubAuth, getMyRepos);
router.post('/get-repo-files', requireGithubAuth, getRepoFiles);

module.exports = router;