import { Globe, Zap } from "lucide-react";

export default function LandingNav() {
  return (
    <nav className="border-b border-white/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="brand-logo flex h-10 w-10 items-center justify-center shadow-lg shadow-cyan-500/30">
            <Zap className="relative z-10 h-5 w-5 text-white" />
          </div>
          <div>
            <p className="brand-wordmark text-lg font-semibold tracking-tight">BugFixer AI</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Repo Intelligence</p>
          </div>
        </div>
        <a href="https://github.com" className="rounded-full border border-white/15 p-2 text-white/70 transition hover:border-white/30 hover:text-white">
          <Globe className="h-5 w-5" />
        </a>
      </div>
    </nav>
  );
}
