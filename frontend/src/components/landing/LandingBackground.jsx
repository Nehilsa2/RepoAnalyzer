export default function LandingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500 opacity-20 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500 opacity-20 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 rounded-full bg-fuchsia-500 opacity-20 blur-3xl animate-blob animation-delay-4000" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_58%)]" />
    </div>
  );
}
