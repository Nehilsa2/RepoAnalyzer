import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getRepoFiles, analyzeFiles } from "../services/api";
import RepositoryPanel from "../components/RepositoryPanel";
import FileTreePanel from "../components/FileTreePanel";
import AnalysisResultsPanel from "../components/AnalysisResultsPanel";
import LoadingSpinner from "../components/LoadingSpinner";

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
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg" />
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider">Analyzing</p>
                <p className="text-sm font-semibold text-white truncate max-w-md">
                  {repoUrl}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/50 uppercase tracking-wider">Progress</p>
              <p className="text-sm font-semibold text-white">
                {selectedFiles.length > 0 ? `${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''} selected` : 'No files selected'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-[380px_1fr_1fr] gap-6">
          {/* Repository Panel */}
          <RepositoryPanel repoUrl={repoUrl} onRefresh={handleFetch} />

          {/* File Tree Panel */}
          <FileTreePanel
            tree={tree}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            onAnalyze={handleAnalyze}
            loading={loading}
          />

          {/* Analysis Results Panel */}
          <AnalysisResultsPanel results={results} loading={loading} />
        </div>
      </main>
    </div>
  );
}
