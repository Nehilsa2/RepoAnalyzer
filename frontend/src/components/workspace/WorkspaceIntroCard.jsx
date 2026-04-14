import { BadgeCheck, Bot, SearchCode } from "lucide-react";

export default function WorkspaceIntroCard({ repoUrl }) {
  return (
    <section className="workspace-enter rounded-2xl border border-white/15 bg-slate-900/70 p-5 shadow-2xl shadow-cyan-900/20 backdrop-blur-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Analysis Control Center</p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Inspect. Prioritize. Improve.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            Your workspace is ready. Choose high-impact files from the tree and generate a focused,
            actionable analysis report for {repoUrl ? "this repository" : "your project"}.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MiniTile icon={<SearchCode className="h-4 w-4" />} title="Scan" />
          <MiniTile icon={<Bot className="h-4 w-4" />} title="Analyze" />
          <MiniTile icon={<BadgeCheck className="h-4 w-4" />} title="Apply" />
        </div>
      </div>
    </section>
  );
}

function MiniTile({ icon, title }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center">
      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
        {icon}
      </div>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-white/65">{title}</p>
    </div>
  );
}
