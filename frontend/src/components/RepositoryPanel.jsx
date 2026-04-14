import { RefreshCw, Globe } from "lucide-react";

export default function RepositoryPanel({ repoUrl, onRefresh }) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 h-fit sticky top-24">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Repository
          </h3>
          <p className="mt-2 text-xs text-white/60 break-all">{repoUrl}</p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <a
            href={`https://github.com/${repoUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Globe className="w-4 h-4" />
            View on GitHub
          </a>
        </div>

        <button
          onClick={onRefresh}
          className="w-full mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
    </div>
  );
}
