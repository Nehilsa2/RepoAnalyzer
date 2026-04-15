function batchFiles(files, batchSize = 3) {
  const batches = [];

  for (let i = 0; i < files.length; i += batchSize) {
    batches.push(files.slice(i, i + batchSize));
  }

  return batches;
}

module.exports = batchFiles;