import { ArrowRight, CheckCircle, Zap } from "lucide-react";

export default function LandingHero({ repoUrl, setRepoUrl, onSubmit }) {
  return (
    <section className="landing-enter grid items-start gap-10 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
      <div className="text-center lg:text-left">
        <div className="badge-float inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
          <Zap className="h-4 w-4" />
          AI-Powered Static Analysis
        </div>

        <h1 className="heading-rise mt-6 text-5xl font-bold leading-[1.02] text-white sm:text-6xl xl:text-7xl">
          Ship Cleaner Code,
          <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
            Faster Than Ever.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg lg:mx-0 mx-auto">
          Connect any repository, select critical files, and get crystal-clear bug reports,
          code smell detection, and practical improvement suggestions in one flow.
        </p>

        <form onSubmit={onSubmit} className="cta-rise mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row lg:mx-0">
          <input
            type="text"
            placeholder="https://github.com/owner/repository"
            value={repoUrl}
            onChange={(event) => setRepoUrl(event.target.value)}
            className="w-full flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white placeholder-white/40 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-7 py-3 font-semibold text-white transition hover:brightness-110"
          >
            Start Analyzing
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.16em] text-white/50 lg:justify-start">
          <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-300" /> Bugs</span>
          <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-300" /> Smells</span>
          <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-300" /> Suggestions</span>
        </div>
      </div>

      <div className="panel-rise rounded-2xl border border-white/15 bg-slate-950/70 p-5 backdrop-blur-md shadow-2xl shadow-cyan-900/30">
        <p className="text-xs uppercase tracking-[0.18em] text-white/50">First Look</p>
        <div className="mt-4 space-y-3">
          <MetricRow label="Repository Linked" value="Ready" />
          <MetricRow label="File Tree" value="Interactive" />
          <MetricRow label="AI Response" value="Structured" />
          <MetricRow label="Output" value="Actionable" />
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Preview Timeline</p>
          <div className="mt-3 space-y-2 text-xs text-white/70">
            <p className="typing-loop">&gt; Fetching repository tree...</p>
            <p className="typing-loop" style={{ animationDelay: "1s" }}>&gt; Selecting critical files...</p>
            <p className="typing-loop" style={{ animationDelay: "2s" }}>&gt; Running AI checks...</p>
            <p className="typing-loop text-emerald-300" style={{ animationDelay: "3s" }}>&gt; Report ready</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="text-sm text-white/60">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
