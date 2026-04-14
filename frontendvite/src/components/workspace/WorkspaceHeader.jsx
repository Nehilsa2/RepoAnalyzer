import { Sparkles, Zap } from "lucide-react";

export default function WorkspaceHeader({ repoUrl, selectedCount, resultCount }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="brand-logo flex h-9 w-9 items-center justify-center shadow-lg shadow-cyan-500/30">
            <Zap className="relative z-10 h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="brand-wordmark text-sm font-semibold">BugFixer AI</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Active Repository</p>
            <p className="truncate text-sm font-semibold text-white">{repoUrl || "No repository selected"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <MetricPill label="Selected" value={String(selectedCount)} />
          <MetricPill label="Reports" value={String(resultCount)} />
          <MetricPill label="Mode" value="AI" icon />
        </div>
      </div>
    </header>
  );
}

function MetricPill({ label, value, icon = false }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center min-w-[82px]">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-1 flex items-center justify-center gap-1 text-sm font-semibold text-white">
        {icon ? <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> : null}
        {value}
      </p>
    </div>
  );
}
