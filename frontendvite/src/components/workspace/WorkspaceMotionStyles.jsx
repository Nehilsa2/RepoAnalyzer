export default function WorkspaceMotionStyles() {
  return (
    <style>{`
      @keyframes workspaceFade {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .workspace-enter {
        animation: workspaceFade 700ms ease-out both;
      }

      .workspace-grid-enter {
        animation: workspaceFade 850ms ease-out both;
        animation-delay: 120ms;
      }
    `}</style>
  );
}
