export default function RepoInput({ repoUrl, setRepoUrl, onFetch }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="https://github.com/owner/repository"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="ui-input"
      />
      <button onClick={onFetch} className="secondary-action w-full">
        Fetch repository files
      </button>
    </div>
  );
}
