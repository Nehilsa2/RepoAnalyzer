function IssueItem({ issue }) {
  return (
    <div className="border border-gray-700 rounded p-3 bg-gray-900">

      {/* MESSAGE */}
      <p className="text-sm text-white">
        ⚠️ {issue.message}
      </p>

      {/* FIX */}
      <p className="text-xs text-gray-400 mt-1">
        💡 {issue.fix}
      </p>
    </div>
  );
}