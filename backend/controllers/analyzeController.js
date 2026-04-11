const parseRepoUrl = require('../utils/parseRepo');
const filterFiles = require('../utils/filterFiles');
const { getRepoTree, getFileContent } = require('../services/githubService');

const analyzeRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ error: 'Repo URL is required' });
    }

    // 1. Parse repo
    const { owner, repo } = parseRepoUrl(repoUrl);

    // 2. Get repo tree
    const tree = await getRepoTree(owner, repo);

    // 3. Filter files
    const files = filterFiles(tree);

    // 4. Fetch file contents
    const fileData = [];

    for (let path of files) {
      const content = await getFileContent(owner, repo, path);

      fileData.push({
        fileName: path,
        content: content.slice(0, 5000) // prevent huge input
      });
    }
    // console.log(fileData[0].content.slice(0, 200));

    return res.json({
      totalFiles: fileData.length,
      files: fileData
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error fetching repo' });
  }
};

module.exports = { analyzeRepo };