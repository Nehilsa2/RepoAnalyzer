import { AlertCircle, AlertTriangle, Lightbulb, CheckCircle, Loader } from "lucide-react";

export default function AnalysisResultsPanel({ results, loading }) {
  if (loading) {
    return (
      <div className="rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-blue-400 animate-spin" />
          <p className="text-white/60 text-sm">Analyzing your code...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-white/30 mx-auto mb-3" />
          <p className="text-white font-medium">Ready for analysis</p>
          <p className="text-white/60 text-sm mt-1">
            Select files and click analyze to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-white mb-4">Analysis Results</h2>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {results.map((file, idx) => (
          <ResultCard key={idx} file={file} />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ file }) {
  const analysis = file.analysis;

  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-4 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-white/50 uppercase tracking-wider">File</p>
          <p className="text-sm font-semibold text-white mt-1 break-all">
            {file.fileName}
          </p>
        </div>
        <span className="px-2 py-1 rounded bg-white/10 text-xs text-white/70">
          {analysis.complexity || "Standard"}
        </span>
      </div>

      <div className="space-y-3">
        {analysis.bugs && analysis.bugs.length > 0 && (
          <ResultSection
            title="Bugs"
            items={analysis.bugs}
            icon={<AlertCircle className="w-4 h-4" />}
            tone="danger"
          />
        )}
        {analysis.code_smells && analysis.code_smells.length > 0 && (
          <ResultSection
            title="Code Smells"
            items={analysis.code_smells}
            icon={<AlertTriangle className="w-4 h-4" />}
            tone="warning"
          />
        )}
        {analysis.suggestions && analysis.suggestions.length > 0 && (
          <ResultSection
            title="Suggestions"
            items={analysis.suggestions}
            icon={<Lightbulb className="w-4 h-4" />}
            tone="info"
          />
        )}
        {(!analysis.bugs || analysis.bugs.length === 0) &&
          (!analysis.code_smells || analysis.code_smells.length === 0) &&
          (!analysis.suggestions || analysis.suggestions.length === 0) && (
            <div className="text-center py-3">
              <p className="text-xs text-white/50">No issues found ✓</p>
            </div>
          )}
      </div>
    </div>
  );
}

function ResultSection({ title, items, icon, tone }) {
  const toneColors = {
    danger: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  return (
    <div className="py-2 border-b border-white/5 last:border-0">
      <p className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${toneColors[tone]}`}>
        {icon}
        {title}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="text-xs text-white/70 leading-relaxed">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
