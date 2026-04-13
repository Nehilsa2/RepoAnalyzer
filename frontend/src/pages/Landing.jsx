import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Zap, Code, CheckCircle, ArrowRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");

  const handleStart = (e) => {
    e.preventDefault();
    if (repoUrl.trim()) {
      navigate(`/workspace?repo=${encodeURIComponent(repoUrl)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BugFixer AI</span>
            </div>
            <a href="https://github.com" className="text-white/60 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-8 text-center">
            {/* Badge */}
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Powered by AI
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Code Review
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                Upload your repository. Select files. Get AI-powered insights on bugs, code smells, and improvements — instantly.
              </p>
            </div>

            {/* CTA Form */}
            <form onSubmit={handleStart} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mt-10">
              <input
                type="text"
                placeholder="https://github.com/owner/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Start Analyzing
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/10">
              <FeatureCard
                icon={<Code className="w-6 h-6" />}
                title="Smart Detection"
                description="Automatically identifies bugs, code smells, and refactoring opportunities"
              />
              <FeatureCard
                icon={<CheckCircle className="w-6 h-6" />}
                title="Actionable Insights"
                description="Get specific, implementable suggestions to improve code quality"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Instant Analysis"
                description="Real-time feedback without waiting for CI/CD pipelines"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 backdrop-blur-md mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-white/50 text-sm">
            <p>Built for developers who care about code quality</p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors group cursor-default">
      <div className="text-blue-400 group-hover:text-purple-400 transition-colors">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-white/60 text-sm">{description}</p>
    </div>
  );
}
