export default function LandingMotionStyles() {
  return (
    <style>{`
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(24px, -36px) scale(1.08); }
        66% { transform: translate(-14px, 18px) scale(0.92); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes heroFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      @keyframes typing {
        0% { opacity: 0; transform: translateY(6px); }
        18% { opacity: 1; transform: translateY(0); }
        70% { opacity: 1; }
        100% { opacity: 0.35; }
      }

      .animate-blob { animation: blob 8s ease-in-out infinite; }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }

      .landing-enter { animation: fadeInUp 700ms ease-out both; }
      .heading-rise { animation: fadeInUp 850ms ease-out both; animation-delay: 80ms; }
      .cta-rise { animation: fadeInUp 1s ease-out both; animation-delay: 140ms; }
      .panel-rise { animation: fadeInUp 1s ease-out both; animation-delay: 220ms; }
      .badge-float { animation: heroFloat 3.2s ease-in-out infinite; }
      .typing-loop { animation: typing 4.6s ease-in-out infinite; }
    `}</style>
  );
}
