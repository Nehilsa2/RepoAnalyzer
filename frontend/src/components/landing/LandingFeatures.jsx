import { CheckCircle, Code, Zap } from "lucide-react";

export default function LandingFeatures() {
  return (
    <section className="mt-14 border-t border-white/10 pt-12">
      <div className="grid gap-5 md:grid-cols-3">
        <FeatureCard
          icon={<Code className="h-6 w-6" />}
          title="Smart Detection"
          description="Automatically flags bugs, risky patterns, and architecture weak points."
        />
        <FeatureCard
          icon={<CheckCircle className="h-6 w-6" />}
          title="Actionable Suggestions"
          description="Recommendations are clear, prioritized, and implementation-ready."
        />
        <FeatureCard
          icon={<Zap className="h-6 w-6" />}
          title="Fast Analysis Loop"
          description="Move from repository URL to insight report in one streamlined flow."
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <article className="group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:border-cyan-300/40">
      <div className="text-cyan-300 transition group-hover:text-fuchsia-300">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
    </article>
  );
}
