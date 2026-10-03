import { useI18n } from '../i18n/I18nProvider'

// A pink gift box seen from above. slots: array of products (or null for empty spots).
export default function BoxVisual({ size, slots, onSlotClick, className = '' }) {
  const { t, pick } = useI18n()
  const cols = size === 6 ? 3 : 2
  const cells = Array.from({ length: size }, (_, i) => slots[i] || null)
  return (
    <div className={`relative rounded-[2rem] border-4 border-deep bg-rose p-3 shadow-pop sm:p-4 ${className}`} role="group" aria-label={t('build.boxAria')}>
      {/* ribbon */}
      <span aria-hidden="true" className="absolute top-1/2 -left-1 h-6 w-[calc(100%+0.5rem)] -translate-y-1/2 bg-deep/15" />
      <div className="relative grid gap-2 rounded-[1.4rem] border-2 border-deep/30 bg-cream p-2 sm:gap-3 sm:p-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {cells.map((p, i) => {
          const label = p ? t('build.slotLabel', { n: i + 1, name: pick(p.name) }) : t('build.slotEmpty')
          const inner = p ? (
            <img key={`${p.id}-${i}`} src={p.image} alt="" className="drop-in h-full w-full scale-[1.45] object-cover" />
          ) : (
            <span className="text-2xl text-rose/70" aria-hidden="true">♥</span>
          )
          const cls = `grid aspect-square place-items-center overflow-hidden rounded-2xl border-2 ${p ? 'border-deep/20 bg-blush-soft' : 'border-dashed border-rose bg-white'}`
          return onSlotClick && p ? (
            <button key={i} type="button" className={`${cls} transition hover:ring-4 hover:ring-rose/50`} onClick={() => onSlotClick(i)} aria-label={`${label} — ${t('common.remove')}`}>
              {inner}
            </button>
          ) : (
            <div key={i} className={cls} aria-label={label} role="img">
              {inner}
            </div>
          )
        })}
      </div>
    </div>
  )
}
