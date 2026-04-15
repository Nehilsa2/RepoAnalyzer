const express = require('express');
const router = express.Router();

const {
  githubLogin,
  githubCallback,
  getCurrentUser,
  logout
} = require('../controllers/authController');
const requireGithubAuth = require('../middleware/requireGithubAuth');

router.get('/github', githubLogin);
router.get('/github/callback', githubCallback);
router.get('/me', requireGithubAuth, getCurrentUser);
router.post('/logout', requireGithubAuth, logout);

module.exports = router;