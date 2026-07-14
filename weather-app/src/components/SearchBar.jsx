import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'

export default function SearchBar({ onSearch, onUseLocation, isLoading }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search a city…"
          aria-label="Search a city"
          className="w-full rounded-2xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 font-body text-sm text-white placeholder-white/50 backdrop-blur-md transition focus:border-amber/60 focus:bg-white/15 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-2xl bg-amber px-5 py-3 font-display text-sm font-medium text-ink transition hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Search
      </button>
      <button
        type="button"
        onClick={onUseLocation}
        disabled={isLoading}
        title="Use my location"
        aria-label="Use my current location"
        className="rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <MapPin className="h-4 w-4" />
      </button>
    </form>
  )
}
