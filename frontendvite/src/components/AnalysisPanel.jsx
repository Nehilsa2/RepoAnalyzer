export default function AnalysisPanel({ results }) {
  if (!results) {
    return (
      <div className="empty-state min-h-[420px]">
        <p className="empty-state-title">No analysis yet.</p>
        <p className="empty-state-copy">
          Pick a repository, choose the files that matter, and the findings will land here in a much cleaner format.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {results.map((file, idx) => (
        <article
          key={idx}
          className="result-card reveal-up"
          style={{ animationDelay: `${idx * 70}ms` }}
        >
          <div className="flex flex-col gap-3 border-b border-white/8 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-subtle)]">File report</p>
              <h2 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{file.fileName}</h2>
            </div>
            <span className="complexity-pill">Complexity: {file.analysis.complexity}</span>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            <InsightColumn title="Bugs" tone="danger" items={file.analysis.bugs} />
            <InsightColumn title="Code Smells" tone="warning" items={file.analysis.code_smells} />
            <InsightColumn title="Suggestions" tone="info" items={file.analysis.suggestions} />
          </div>
        </article>
      ))}
    </div>
  );
}

function InsightColumn({ title, tone, items }) {
  return (
    <section className={`insight-column insight-${tone}`}>
      <p className="insight-title">{title}</p>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
          {items.map((item, index) => (
            <li key={index} className="insight-item">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[var(--text-muted)]">Nothing notable here.</p>
      )}
    </section>
  );
}
