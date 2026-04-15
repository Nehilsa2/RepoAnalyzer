const allowedExtensions = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.py',
  '.java',
  '.go',
  '.rb',
  '.php',
  '.cs',
  '.cpp',
  '.c',
  '.h',
  '.hpp',
  '.rs'
];

const excludedPathSegments = [
  'node_modules/',
  'dist/',
  'build/',
  '.next/',
  'coverage/',
  '.git/'
];

const isExcludedPath = (path) => excludedPathSegments.some((segment) => path.includes(segment));

function isValidFile(path) {
  return allowedExtensions.some((ext) => path.endsWith(ext)) && !isExcludedPath(path);
}

function filterFiles(tree) {
  return tree
    .filter((item) => item.type === 'blob')
    .map((item) => item.path)
    .filter(isValidFile)
    .slice(0, 300);
}

module.exports = filterFiles;