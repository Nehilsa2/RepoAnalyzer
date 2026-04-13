const express = require('express');
const router = express.Router();

const { getRepoFiles } = require('../controllers/repoController');

router.post('/get-repo-files', getRepoFiles);

module.exports = router;