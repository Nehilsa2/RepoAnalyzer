import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkflowShowcase from "../components/WorkflowShowcase";
import LandingBackground from "../components/landing/LandingBackground";
import LandingNav from "../components/landing/LandingNav";
import LandingHero from "../components/landing/LandingHero";
import LandingFeatures from "../components/landing/LandingFeatures";
import LandingMotionStyles from "../components/landing/LandingMotionStyles";

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
      <LandingBackground />

      <div className="relative z-10">
        <LandingNav />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LandingHero repoUrl={repoUrl} setRepoUrl={setRepoUrl} onSubmit={handleStart} />

          <WorkflowShowcase />
          <LandingFeatures />
        </div>

        <div className="border-t border-white/10 backdrop-blur-md mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-white/50 text-sm">
            <p>Built for developers who care about code quality</p>
          </div>
        </div>
      </div>
      <LandingMotionStyles />
    </div>
  );
}
