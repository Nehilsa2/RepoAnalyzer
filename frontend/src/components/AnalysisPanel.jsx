import { useState } from "react";

export default function AnalysisPanel({ results }) {
  if (!results) return <p className="text-gray-400">No analysis yet</p>;

  return (
    <div className="space-y-4">
      {results.map((file, idx) => (
        <FileCard key={idx} file={file} />
      ))}
    </div>
  );
}