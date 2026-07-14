export default function LoadingState() {
  return (
    <div className="w-full animate-rise space-y-4" role="status" aria-label="Loading weather data">
      <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
        <div className="h-4 w-32 animate-pulse rounded-full bg-white/20" />
        <div className="mt-6 h-16 w-40 animate-pulse rounded-full bg-white/20" />
        <div className="mt-3 h-4 w-24 animate-pulse rounded-full bg-white/15" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          />
        ))}
      </div>
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-28 w-20 flex-shrink-0 animate-pulse rounded-2xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  )
}
