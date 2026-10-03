import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useCart } from '../context/CartProvider'
import { useSeo } from '../hooks/useSeo'
import { useAsync } from '../hooks/useAsync'
import { getBoxes, getProducts } from '../services'
import { formatPrice } from '../lib/format'
import PageHero from '../components/PageHero'
import BoxVisual from '../components/BoxVisual'
import Badges from '../components/Badges'
import { ArrowRightIcon, CheckIcon, MinusIcon, PlusIcon, SparkleIcon, TrashIcon } from '../components/Icons'

export default function BuildBox() {
  useSeo('build')
  const { t } = useI18n()
  const { data, loading } = useAsync(async () => ({ boxes: await getBoxes(), flavours: await getProducts({ boxFlavours: true }) }), [])
  if (loading || !data) return <div className="container-pb py-20 text-center">{t('common.loading')}</div>
  return <Builder boxes={data.boxes} flavours={data.flavours} />
}

function Builder({ boxes, flavours }) {
  const { t, pick } = useI18n()
  const { add } = useCart()
  const [params, setParams] = useSearchParams()
  const requested = Number(params.get('size'))
  const box = boxes.find((b) => b.boxSize === requested) || boxes[boxes.length - 1]
  const size = box.boxSize
  const [slots, setSlots] = useState([]) // product ids, in the order they were added
  const [added, setAdded] = useState(false)

  const byId = useMemo(() => Object.fromEntries(flavours.map((f) => [f.id, f])), [flavours])
  const filled = Math.min(slots.length, size)
  const visibleSlots = slots.slice(0, size)
  const full = filled === size
  const countOf = (id) => visibleSlots.filter((s) => s === id).length
  const singlesTotal = visibleSlots.reduce((s, id) => s + byId[id].price, 0)
  const saving = full ? singlesTotal - box.price : 0

  const chooseSize = (n) => {
    setParams({ size: String(n) }, { replace: true })
    setSlots((s) => s.slice(0, n))
    setAdded(false)
  }
  const addOne = (id) => {
    setAdded(false)
    setSlots((s) => (s.length < size ? [...s, id] : s))
  }
  const removeOne = (id) => {
    setAdded(false)
    setSlots((s) => {
      const i = s.lastIndexOf(id)
      return i === -1 ? s : [...s.slice(0, i), ...s.slice(i + 1)]
    })
  }
  const removeAt = (index) => setSlots((s) => [...s.slice(0, index), ...s.slice(index + 1)])
  const surprise = () => {
    setAdded(false)
    setSlots((s) => {
      const next = s.slice(0, size)
      while (next.length < size) next.push(flavours[Math.floor(Math.random() * flavours.length)].id)
      return next
    })
  }
  const addToCart = () => {
    const counts = {}
    visibleSlots.forEach((id) => (counts[id] = (counts[id] || 0) + 1))
    const contents = Object.entries(counts).map(([id, qty]) => ({ productId: id, name: byId[id].name, qty }))
    add(box, 1, contents)
    setAdded(true)
    setSlots([])
  }

  return (
    <>
      <PageHero title={t('build.title')} subtitle={t('build.subtitle')} />
      <div className="container-pb grid gap-6 py-6 sm:py-10 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        {/* box + summary: sticky on desktop */}
        <div className="space-y-4 lg:sticky lg:top-28">
          <div role="radiogroup" aria-label={t('build.size')} className="grid grid-cols-2 gap-2 rounded-full bg-white p-1.5 shadow-sticker">
            {boxes.map((b) => (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={b.boxSize === size}
                onClick={() => chooseSize(b.boxSize)}
                className={`min-h-12 rounded-full px-3 text-[0.95rem] font-semibold transition ${b.boxSize === size ? 'bg-deep text-cream' : 'text-deep hover:bg-blush'}`}
              >
                {t('build.sizeOption', { count: b.boxSize, price: b.price })}
              </button>
            ))}
          </div>

          <BoxVisual size={size} slots={visibleSlots.map((id) => byId[id])} onSlotClick={removeAt} />

          <div className="sticker p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-deep" aria-live="polite">
                {full ? t('build.full') : t('build.progress', { filled, size })}
              </p>
              <p className="font-display text-3xl text-deep">{formatPrice(box.price)}</p>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-blush" aria-hidden="true">
              <div className="h-full rounded-full bg-rose transition-all duration-300" style={{ width: `${(filled / size) * 100}%` }} />
            </div>
            {saving > 0 && <p className="mt-2 text-sm font-semibold text-rose-ink">{t('build.saving', { amount: saving })}</p>}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={surprise} disabled={full} className="btn btn-sm btn-outline px-2 text-sm">
                <SparkleIcon className="h-5 w-5" /> {t('build.surprise')}
              </button>
              <button type="button" onClick={() => setSlots([])} disabled={!filled} className="btn btn-sm btn-outline px-2 text-sm">
                <TrashIcon className="h-5 w-5" /> {t('build.clear')}
              </button>
            </div>
            <button type="button" onClick={addToCart} disabled={!full} className="btn btn-rose btn-chunky mt-3 w-full">
              {full ? t('build.add') : t('build.remaining', { count: size - filled })}
            </button>
            {added && (
              <p role="status" className="mt-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-[#E4EEDC] p-3 font-semibold text-[#24461B]">
                <CheckIcon className="h-5 w-5" /> {t('build.added')}
                <Link to="/cart" className="link-underline">
                  {t('nav.cart')} <ArrowRightIcon className="inline h-4 w-4" />
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* flavour picker */}
        <section aria-labelledby="flavours-title">
          <h2 id="flavours-title" className="mb-4 text-3xl">
            {t('build.flavours')}
          </h2>
          {/* phones: mini box that stays in view while picking */}
          <div className="sticky top-[4.5rem] z-20 mb-4 flex items-center gap-2 rounded-full border-2 border-deep bg-rose p-1.5 shadow-pop lg:hidden" aria-hidden="true">
            <div className="flex flex-1 gap-1 rounded-full bg-cream p-1">
              {Array.from({ length: size }, (_, i) => {
                const p = byId[visibleSlots[i]]
                return (
                  <span key={i} className={`grid aspect-square flex-1 place-items-center overflow-hidden rounded-full ${p ? 'bg-blush-soft' : 'border-2 border-dashed border-rose bg-white'}`}>
                    {p && <img key={`${p.id}-${i}`} src={p.image} alt="" className="drop-in h-full w-full scale-[1.5] object-cover" />}
                  </span>
                )
              })}
            </div>
            <button type="button" tabIndex={-1} onClick={addToCart} disabled={!full} className="btn btn-sm btn-choc shrink-0 px-3 disabled:opacity-100">
              {full ? (
                <>
                  <CheckIcon className="h-5 w-5" /> {t('common.addToCart')}
                </>
              ) : (
                `${filled}/${size}`
              )}
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {flavours.map((f) => {
              const n = countOf(f.id)
              const name = pick(f.name)
              return (
                <li key={f.id} className={`sticker flex flex-col p-2.5 transition ${n ? 'ring-4 ring-rose' : ''}`}>
                  <button type="button" onClick={() => addOne(f.id)} disabled={full} className="relative block overflow-hidden rounded-2xl bg-blush-soft disabled:cursor-not-allowed" aria-label={t('build.addOne', { name })}>
                    <img src={f.image} alt="" loading="lazy" width="400" height="400" className="aspect-square w-full object-cover" />
                    <Badges product={f} className="absolute top-1.5 left-1.5" />
                    {n > 0 && (
                      <span key={n} className="pop absolute top-1.5 right-1.5 grid h-8 min-w-8 place-items-center rounded-full border-2 border-white bg-deep px-1 font-bold text-cream">
                        {n}
                      </span>
                    )}
                  </button>
                  <p className="mt-2 px-1 text-[0.95rem] leading-snug font-semibold text-deep">{name}</p>
                  <div className="mt-auto flex items-center justify-between gap-1 pt-2">
                    <button type="button" onClick={() => removeOne(f.id)} disabled={!n} className="grid h-11 w-11 place-items-center rounded-full border-2 border-deep/15 bg-white text-deep transition hover:bg-blush disabled:opacity-35" aria-label={t('build.removeOne', { name })}>
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <output className="text-lg font-bold text-deep" aria-label={`${name}: ${n}`}>
                      {n}
                    </output>
                    <button type="button" onClick={() => addOne(f.id)} disabled={full} className="grid h-11 w-11 place-items-center rounded-full bg-rose text-deep shadow-[0_3px_0_#A8445A] transition disabled:opacity-35" aria-label={t('build.addOne', { name })}>
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </>
  )
}
