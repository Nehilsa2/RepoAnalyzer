const parseRepoUrl = require('../utils/parseRepo');
const filterFiles = require('../utils/filterFiles');
const buildFileTree = require('../utils/buildTree');
const { getRepoTree } = require('../services/githubService');

const getRepoFiles = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const { owner, repo } = parseRepoUrl(repoUrl);

    const tree = await getRepoTree(owner, repo);
    const files = filterFiles(tree);

    const fileTree = buildFileTree(files);

    return res.json({
      tree: fileTree,
      totalFiles: files.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching repo files" });
  }
};

module.exports = { getRepoFiles };