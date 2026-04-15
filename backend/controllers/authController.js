const axios = require('axios');
const crypto = require('crypto');
const User = require('../models/User');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const safeRedirectPath = (value) => {
  if (!value || typeof value !== 'string') {
    return '/';
  }

  return value.startsWith('/') ? value : '/';
};

const githubLogin = (req, res) => {
  const redirect = safeRedirectPath(req.query.redirect);
  const state = Buffer.from(JSON.stringify({ redirect }), 'utf8').toString('base64url');
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo&state=${encodeURIComponent(state)}`;

  res.redirect(url);
};

const githubCallback = async (req, res) => {
  const { code, state } = req.query;

  let redirectPath = '/';

  if (state) {
    try {
      const parsedState = JSON.parse(Buffer.from(state, 'base64url').toString('utf8'));
      redirectPath = safeRedirectPath(parsedState.redirect);
    } catch {
      redirectPath = '/';
    }
  }

  try {
    // exchange code for token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: { Accept: "application/json" }
      }
    );

    const access_token = tokenRes.data.access_token;

    if (!access_token) {
      return res.status(400).send('GitHub token not received');
    }

    // get user info
    const userRes = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `token ${access_token}`
        }
      }
    );

    const sessionToken = crypto.randomBytes(32).toString('hex');

    const savedUser = await User.findOneAndUpdate(
      { githubId: String(userRes.data.id) },
      {
        githubId: String(userRes.data.id),
        username: userRes.data.login,
        accessToken: access_token,
        sessionToken
      },
      { new: true, upsert: true }
    );

    const queryJoiner = redirectPath.includes('?') ? '&' : '?';
    const redirectTarget = `${FRONTEND_URL}${redirectPath}${queryJoiner}token=${encodeURIComponent(sessionToken)}&user=${encodeURIComponent(savedUser.username)}`;

    res.redirect(redirectTarget);

  } catch (err) {
    console.error(err);
    res.status(500).send("Auth failed");
  }
};

const getCurrentUser = async (req, res) => {
  return res.json({
    user: {
      githubId: req.user.githubId,
      username: req.user.username
    }
  });
};

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { sessionToken: null });
  return res.json({ success: true });
};

module.exports = { githubLogin, githubCallback, getCurrentUser, logout };