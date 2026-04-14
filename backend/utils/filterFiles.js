const allowedExtensions = ['.js', '.py', '.cpp'];
const allowedDirs = ['src/', 'app/', 'lib/'];

function isValidFile(path) {
  return (
    allowedExtensions.some(ext => path.endsWith(ext)) &&
    allowedDirs.some(dir => path.startsWith(dir))
  );
}

function filterFiles(tree) {
  return tree
    .filter(item => item.type === 'blob')
    .map(item => item.path)
    .filter(isValidFile)
    .slice(0, 1) // limit
    .sort((a, b) => size(b) - size(a)) // large files first
    .slice(0, 5);
}

module.exports = filterFiles;