const parseRepoUrl = require('../utils/parseRepo');
const filterFiles = require('../utils/filterFiles');
const buildFileTree = require('../utils/buildTree');
const { getRepoTree, getUserRepos, getRepoAccess } = require('../services/githubService');

const getMyRepos = async (req, res) => {
  try {
    const repos = await getUserRepos(req.githubToken);

    return res.json({
      totalRepos: repos.length,
      repos
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching user repositories' });
  }
};

const getRepoFiles = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const { owner, repo } = parseRepoUrl(repoUrl);

    const [tree, access] = await Promise.all([
      getRepoTree(owner, repo, req.githubToken),
      getRepoAccess(owner, repo, req.githubToken)
    ]);
    const files = filterFiles(tree);

    const fileTree = buildFileTree(files);

    return res.json({
      tree: fileTree,
      totalFiles: files.length,
      access
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching repo files" });
  }
};

module.exports = { getRepoFiles, getMyRepos };