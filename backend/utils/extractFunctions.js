function extractFunctions(code) {
  const regex = /function\s+\w+\s*\([^)]*\)\s*{[\s\S]*?}/g;

  const matches = code.match(regex) || [];

  return matches;
}

module.exports = extractFunctions;