// Wavy section edge. `from` is the colour above the wave, `to` the colour below.
const COLORS = { cream: '#FFF8F1', blush: '#F8DDE2', deep: '#3B2218', white: '#FFFFFF' }

export default function WaveDivider({ from = 'cream', to = 'blush' }) {
  return (
    <div aria-hidden="true" className="-my-px" style={{ background: COLORS[from] }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-10 w-full sm:h-16">
        <path d="M0 40 C120 80 240 80 360 50 C480 20 600 0 720 20 C840 40 960 80 1080 70 C1200 60 1320 20 1440 30 L1440 80 L0 80 Z" fill={COLORS[to]} />
      </svg>
    </div>
  )
}
