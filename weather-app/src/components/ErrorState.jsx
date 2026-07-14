import { CloudOff, RefreshCw } from 'lucide-react'

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="flex w-full animate-rise flex-col items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-10 text-center backdrop-blur-xl">
      <CloudOff className="h-10 w-10 text-white/70" />
      <div>
        <p className="font-display text-lg font-medium text-white">Couldn't load the weather</p>
        <p className="mt-1 max-w-sm font-body text-sm text-white/70">
          {error?.message ?? 'Something unexpected happened. Please try again.'}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-2xl bg-amber px-5 py-2.5 font-display text-sm font-medium text-ink transition hover:brightness-105 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  )
}
