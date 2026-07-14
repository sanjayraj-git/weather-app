export default function SkyBackground({ gradientClass }) {
  return (
    <div
      className={`fixed inset-0 -z-10 transition-colors duration-1000 ${gradientClass} bg-sky-clear-day`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 animate-drift opacity-40 mix-blend-overlay">
        <div className="absolute top-[10%] left-[15%] h-64 w-64 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute top-[40%] right-[10%] h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-[5%] left-[35%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  )
}
