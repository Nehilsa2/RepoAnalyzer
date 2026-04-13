import { Loader } from "lucide-react";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="w-10 h-10 text-blue-400 animate-spin" />
        <p className="text-white/70 text-center">{message}</p>
      </div>
    </div>
  );
}
