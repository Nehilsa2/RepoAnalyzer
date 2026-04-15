function FileCard({ file }) {
  const [open, setOpen] = useState(false);

  const issues = file.analysis?.issues || [];
  const issueCount = issues.length;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">

      {/* HEADER */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h2 className="font-semibold text-white">{file.fileName}</h2>

          <p className="text-sm text-gray-400">
            {file.analysis?.summary}
          </p>
        </div>

        {/* ISSUE COUNT */}
        <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-xs">
          ⚠️ {issueCount}
        </div>
      </div>

      {/* DETAILS */}
      {open && (
        <div className="mt-4 space-y-3">
          {issues.slice(0, 5).map((issue, i) => (
            <IssueItem key={i} issue={issue} />
          ))}

          {issueCount > 5 && (
            <p className="text-xs text-gray-500">
              +{issueCount - 5} more issues...
            </p>
          )}
        </div>
      )}
    </div>
  );
}