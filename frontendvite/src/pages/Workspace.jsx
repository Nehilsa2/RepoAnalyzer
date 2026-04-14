import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getRepoFiles, analyzeFiles } from "../services/api";
import RepositoryPanel from "../components/RepositoryPanel";
import FileTreePanel from "../components/FileTreePanel";
import AnalysisResultsPanel from "../components/AnalysisResultsPanel";
import LoadingSpinner from "../components/LoadingSpinner";
import WorkspaceBackground from "../components/workspace/WorkspaceBackground";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceIntroCard from "../components/workspace/WorkspaceIntroCard";
import WorkspaceMotionStyles from "../components/workspace/WorkspaceMotionStyles";

export default function Workspace() {
  const [searchParams] = useSearchParams();
  const repoUrl = searchParams.get("repo");

  const [tree, setTree] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingRepo, setFetchingRepo] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = useCallback(async () => {
    try {
      setFetchingRepo(true);
      setError(null);
      const data = await getRepoFiles(repoUrl);
      setTree(data.tree);
      setSelectedFiles([]);
      setResults(null);
    } catch (err) {
      setError("Failed to fetch repository. Please check the URL and try again.");
      console.error(err);
    } finally {
      setFetchingRepo(false);
    }
  }, [repoUrl]);

  useEffect(() => {
    if (repoUrl) {
      handleFetch();
    }
  }, [repoUrl, handleFetch]);

  const handleAnalyze = async () => {
    if (!tree || selectedFiles.length === 0) return;
    try {
      setLoading(true);
      setError(null);
      const data = await analyzeFiles(repoUrl, selectedFiles);
      setResults(data.files);
    } catch (err) {
      setError("Analysis failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingRepo) {
    return <LoadingSpinner message="Fetching repository structure..." />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <WorkspaceBackground />
      <div className="relative z-10">
        <WorkspaceHeader
          repoUrl={repoUrl}
          selectedCount={selectedFiles.length}
          resultCount={results ? results.length : 0}
        />

        <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <WorkspaceIntroCard repoUrl={repoUrl} />

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

          <div className="workspace-grid-enter mt-6 grid gap-6 lg:grid-cols-[320px_1fr_1fr]">
            <RepositoryPanel repoUrl={repoUrl} onRefresh={handleFetch} />
            <FileTreePanel
              tree={tree}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
            <AnalysisResultsPanel results={results} loading={loading} />
          </div>
        </main>
      </div>
      <WorkspaceMotionStyles />
    </div>
  );
}
