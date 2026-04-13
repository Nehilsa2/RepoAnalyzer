const parseRepoUrl = require('../utils/parseRepo');
const { getFileContent } = require('../services/githubService');
const { analyzeCode } = require('../services/aiService');
const pLimit = require('p-limit').default;

const limit = pLimit(5);

const analyzeFiles = async (req, res) => {
  try {
    const { repoUrl, selectedFiles } = req.body;

    if (!selectedFiles || selectedFiles.length === 0) {
      return res.status(400).json({ error: "No files selected" });
    }

    // 🔒 Free tier limit
    if (selectedFiles.length > 3) {
      return res.status(403).json({
        error: "Free tier allows only 3 files"
      });
    }

    const { owner, repo } = parseRepoUrl(repoUrl);

    const results = await Promise.all(
      selectedFiles.map(file =>
        limit(async () => {
          const content = await getFileContent(owner, repo, file);

          const analysis = await analyzeCode(content.slice(0, 3000));

          return {
            fileName: file,
            analysis
          };
        })
      )
    );

    return res.json({
      totalFiles: results.length,
      files: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error analyzing files" });
  }
};

module.exports = { analyzeFiles };