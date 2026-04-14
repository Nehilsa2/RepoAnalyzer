export default function WorkflowShowcase() {
  return (
    <section className="mt-16 text-left">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-slate-950/70 p-4 shadow-2xl shadow-blue-900/20 backdrop-blur-md sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-blue-300/80">Live Preview</p>
            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">How The System Works</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            Simulation Running
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-3">
            <StepRow index="01" title="Connect Repository" description="Paste a GitHub URL and fetch the complete project tree." delay="0ms" />
            <StepRow index="02" title="Pick Target Files" description="Select the exact files you want the AI to inspect." delay="400ms" />
            <StepRow index="03" title="Run Deep Analysis" description="The engine detects bugs, smells, and risky patterns." delay="800ms" />
            <StepRow index="04" title="Apply Suggestions" description="Get actionable recommendations with clear explanations." delay="1200ms" />
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="scanline" />
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">Pipeline View</p>
            <div className="mt-3 space-y-3 text-left font-mono text-xs">
              <AnimatedLine text="> Connecting to github.com/owner/repo" delay="0s" />
              <AnimatedLine text="> Fetching file tree...done" delay="1s" />
              <AnimatedLine text="> Selecting 3 files for analysis" delay="2s" />
              <AnimatedLine text="> Running AI checks..." delay="3s" />
              <AnimatedLine text="> Bugs: 2 | Smells: 4 | Suggestions: 6" delay="4s" />
              <AnimatedLine text="> Report generated successfully" delay="5s" success />
            </div>

            <div className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="progress-loop h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
              </div>
              <p className="mt-2 text-[11px] text-white/50">Auto-looping demo of a typical analysis session</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .step-row {
          opacity: 0;
          transform: translateY(10px);
          animation: revealStep 5.2s ease-in-out infinite;
        }

        .terminal-line {
          opacity: 0;
          animation: typeReveal 6.5s steps(50, end) infinite;
          white-space: nowrap;
          overflow: hidden;
          border-right: 1px solid rgba(255, 255, 255, 0.4);
        }

        .scanline {
          position: absolute;
          left: 0;
          right: 0;
          top: -15%;
          height: 40%;
          background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.16), transparent);
          animation: scan 4s linear infinite;
          pointer-events: none;
        }

        .progress-loop {
          width: 20%;
          animation: loadingBar 3s ease-in-out infinite;
        }

        @keyframes revealStep {
          0%, 8% { opacity: 0; transform: translateY(12px); }
          16%, 60% { opacity: 1; transform: translateY(0); }
          76%, 100% { opacity: 0.35; transform: translateY(0); }
        }

        @keyframes typeReveal {
          0% { width: 0; opacity: 0; }
          12% { opacity: 1; }
          45% { width: 100%; opacity: 1; }
          80% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0.35; }
        }

        @keyframes scan {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(320%); }
        }

        @keyframes loadingBar {
          0% { transform: translateX(-120%); }
          50% { transform: translateX(190%); }
          100% { transform: translateX(-120%); }
        }
      `}</style>
    </section>
  );
}

function StepRow({ index, title, description, delay }) {
  return (
    <article className="step-row rounded-xl border border-white/10 bg-white/5 p-4" style={{ animationDelay: delay }}>
      <p className="text-xs font-semibold tracking-[0.16em] text-cyan-300/80">STEP {index}</p>
      <h3 className="mt-2 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{description}</p>
    </article>
  );
}

function AnimatedLine({ text, delay, success = false }) {
  return (
    <p className={`terminal-line ${success ? "text-emerald-300" : "text-slate-200"}`} style={{ animationDelay: delay }}>
      {text}
    </p>
  );
}
