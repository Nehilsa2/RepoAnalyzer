const CONTEXT_LINES = 8;
const MAX_CHUNKS = 6;
const MAX_FALLBACK_LINES = 220;

function mergeRanges(ranges) {
  if (ranges.length === 0) {
    return [];
  }

  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i += 1) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current.start <= last.end + 1) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

function selectImportantChunks(code, eslintIssues = []) {
  const lines = String(code || "").split("\n");

  if (lines.length === 0) {
    return [];
  }

  if (!Array.isArray(eslintIssues) || eslintIssues.length === 0) {
    return [lines.slice(0, MAX_FALLBACK_LINES).join("\n")];
  }

  const ranges = eslintIssues
    .map((issue) => Number(issue.line))
    .filter((line) => Number.isInteger(line) && line > 0)
    .map((line) => ({
      start: Math.max(1, line - CONTEXT_LINES),
      end: Math.min(lines.length, line + CONTEXT_LINES),
    }));

  const merged = mergeRanges(ranges).slice(0, MAX_CHUNKS);
  const chunks = merged
    .map((range) => lines.slice(range.start - 1, range.end).join("\n"))
    .filter((chunk) => chunk.trim().length > 0);

  if (chunks.length === 0) {
    return [lines.slice(0, MAX_FALLBACK_LINES).join("\n")];
  }

  return chunks;
}

module.exports = selectImportantChunks;