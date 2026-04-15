const { analyzeCode } = require("./aiService");

const generateRepoSummary = async (fileResults) => {
  try {
    const input = fileResults.map(f => `
FILE: ${f.fileName}
SUMMARY: ${f.analysis.summary}
ISSUES:
${f.analysis.issues.map(i => "- " + i.message).join("\n")}
`).join("\n\n");

    const response = await analyzeCode(`
You are a senior engineer.

Based on the following file analyses, generate a concise repo-level summary.

Rules:
- Max 5 points
- Each point 1 line
- Focus on patterns across files
- Avoid repetition

Return STRICT JSON:

{
  "summary": [
    "point 1",
    "point 2"
  ]
}

${input}
    `);

    return response.summary || [];

  } catch (err) {
    console.error("Summary Error:", err.message);
    return [];
  }
};

module.exports = { generateRepoSummary };