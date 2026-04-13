import { useState } from "react";
import RepoInput from "../components/RepoInput";
import FileTree from "../components/FileTree";
import AnalysisPanel from "../components/AnalysisPanel";
import { getRepoFiles, analyzeFiles } from "../services/api";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [tree, setTree] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    const data = await getRepoFiles(repoUrl);
    setTree(data.tree);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    const data = await analyzeFiles(repoUrl, selectedFiles);
    setResults(data.files);
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <div className="ambient-grid" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="hero-shell reveal-up">
          <div className="max-w-3xl">
            <p className="eyebrow">Static analysis, but cinematic</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Turn repo scanning into a dashboard worth looking at.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
              Fetch a GitHub repository, browse its structure, pick the most important files,
              and surface bugs, code smells, and cleanup suggestions in a polished workspace.
            </p>
          </div>

          <div className="hero-metrics">
            <div className="metric-chip">
              <span className="metric-label">Files selected</span>
              <span className="metric-value">{selectedFiles.length}</span>
            </div>
            <div className="metric-chip">
              <span className="metric-label">Tree status</span>
              <span className="metric-value">{tree ? "Loaded" : "Waiting"}</span>
            </div>
            <div className="metric-chip">
              <span className="metric-label">Analysis</span>
              <span className="metric-value">{loading ? "Running" : results ? "Ready" : "Idle"}</span>
            </div>
          </div>
        </section>

        <section className="grid flex-1 gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="glass-panel reveal-up" style={{ animationDelay: "120ms" }}>
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Repository</p>
                <h2 className="panel-title">Source explorer</h2>
              </div>
              <span className="status-pill">{tree ? "Connected" : "Awaiting URL"}</span>
            </div>

            <RepoInput repoUrl={repoUrl} setRepoUrl={setRepoUrl} onFetch={handleFetch} />

            <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[var(--text-subtle)]">
              <span>File tree</span>
              <span>{tree ? `${selectedFiles.length} selected` : "No repo loaded"}</span>
            </div>

            <div className="tree-shell mt-3">
              {tree ? (
                <FileTree
                  tree={tree}
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                />
              ) : (
                <div className="empty-state">
                  <p className="empty-state-title">Start with a GitHub repository URL.</p>
                  <p className="empty-state-copy">
                    We&apos;ll pull the structure in here so you can choose exactly what gets analyzed.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!tree || loading || selectedFiles.length === 0}
              className="primary-action mt-5 w-full"
            >
              {loading ? "Analyzing selected files..." : "Analyze selected files"}
            </button>

            {loading && (
              <p className="mt-3 text-sm text-[var(--accent-soft)]">
                Running analysis and building the report.
              </p>
            )}
          </aside>

          <section className="glass-panel reveal-up" style={{ animationDelay: "240ms" }}>
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Insights</p>
                <h2 className="panel-title">Analysis summary</h2>
              </div>
              <span className="status-pill">
                {results ? `${results.length} files reviewed` : "No results yet"}
              </span>
            </div>

            <AnalysisPanel results={results} />
          </section>
        </section>
      </div>
    </main>
  );
}
