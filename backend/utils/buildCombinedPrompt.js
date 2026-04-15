function buildCombinedPrompt(fileData) {
  const combinedCode = fileData
    .map(f => `
FILE: ${f.fileName}
CODE:
${f.code}
`)
    .join("\n\n----------------\n\n");

  return `
You are a senior software engineer.

Analyze the following multiple files and return STRICT JSON ONLY.

Rules:
- Do NOT include markdown
- Do NOT include explanations outside JSON
- Match fileName exactly
- Be precise and avoid generic suggestions
- Complexity must be in Big-O format (e.g., "O(n)")

Return format:
{
  "files": [
    {
      "fileName": "string",
      "bugs": [],
      "code_smells": [],
      "suggestions": [],
      "complexity": "O(n)"
    }
  ]
}

${combinedCode}
`;
}

module.exports = buildCombinedPrompt;