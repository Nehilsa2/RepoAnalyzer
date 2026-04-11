const axios = require('axios');

const BASE_URL = 'https://api.github.com';

const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`
};

// Get repo tree
const getRepoTree = async (owner, repo) => {
  const url = `${BASE_URL}/repos/${owner}/${repo}/git/trees/main?recursive=1`;
  const res = await axios.get(url, { headers });
  return res.data.tree;
};

// Get file content
const getFileContent = async (owner, repo, path) => {
  const url = `${BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const res = await axios.get(url, { headers });

  const content = Buffer.from(res.data.content, 'base64').toString('utf-8');
  return content;
};

module.exports = { getRepoTree, getFileContent };