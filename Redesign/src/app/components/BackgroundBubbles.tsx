export function BackgroundBubbles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large decorative bubbles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-56 h-56 bg-teal-400/20 rounded-full blur-3xl" />
      
      {/* Small bubbles */}
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-cyan-300/10 rounded-full blur-2xl" />
      <div className="absolute top-2/3 left-1/2 w-24 h-24 bg-blue-200/10 rounded-full blur-xl" />
    </div>
  );
}
