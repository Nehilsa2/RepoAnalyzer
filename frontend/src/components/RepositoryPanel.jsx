import { RefreshCw, Globe, ListChecks } from "lucide-react";

export default function RepositoryPanel({
  repoUrl,
  repoOptions,
  loadingRepos,
  onRepoUrlChange,
  onRepoSelect,
  onFetch,
  onRefreshRepos,
}) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 h-fit sticky top-24">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            My GitHub Repositories
          </h3>

          <div className="mt-3 flex gap-2">
            <select
              value={repoUrl || ""}
              onChange={(e) => onRepoSelect(e.target.value)}
              className="w-full rounded-md border border-white/15 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
            >
              <option value="">Select a repository</option>
              {(repoOptions || []).map((repo) => (
                <option key={repo.id} value={repo.htmlUrl}>
                  {repo.fullName}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={onRefreshRepos}
              className="rounded-md border border-white/15 bg-white/5 px-3 text-white/80 hover:bg-white/10 transition"
              title="Refresh repository list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-2 text-xs text-white/50">
            {loadingRepos ? "Refreshing repositories..." : "Or paste any GitHub URL below to analyze it."}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Repository
          </h3>
          <input
            type="text"
            placeholder="https://github.com/owner/repository"
            value={repoUrl || ""}
            onChange={(e) => onRepoUrlChange(e.target.value)}
            className="mt-2 w-full rounded-md border border-white/15 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
          />
        </div>

        <div className="pt-4 border-t border-white/10">
          <a
            href={`${repoUrl || "#"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:pointer-events-none"
          >
            <Globe className="w-4 h-4" />
            View on GitHub
          </a>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => onFetch()}
            disabled={!repoUrl}
            className="w-full mt-1 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 border border-cyan-300/70 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-45 disabled:cursor-not-allowed"
          >
            <ListChecks className="w-4 h-4" />
            Get File Structure
          </button>
          <p className="text-[11px] text-white/45 text-center">
            Click this button to load repository files for selection.
          </p>
        </div>
      </div>
    </div>
  );
}
