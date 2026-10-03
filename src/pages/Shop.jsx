import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useSeo } from '../hooks/useSeo'
import { useAsync } from '../hooks/useAsync'
import { getCategories, getProducts } from '../services'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import { SearchIcon } from '../components/Icons'

const SORTS = [
  ['featured', 'shop.sortFeatured'],
  ['price-asc', 'shop.sortPriceLow'],
  ['price-desc', 'shop.sortPriceHigh'],
  ['name', 'shop.sortName'],
]

export default function Shop() {
  useSeo('shop')
  const { t, pick } = useI18n()
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const search = params.get('q') || ''
  const sort = params.get('sort') || 'featured'

  const { data: cats = [] } = useAsync(getCategories, [])
  const { data: list = [], loading } = useAsync(() => getProducts({ category, search, sort }), [category, search, sort])

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params)
    if (!value || value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  return (
    <>
      <PageHero title={t('shop.title')} subtitle={t('shop.subtitle')} />
      <div className="container-pb py-6 sm:py-8">
        <div className="sticker mb-6 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label htmlFor="shop-search" className="mb-1.5 block font-semibold text-deep">
                {t('shop.search')}
              </label>
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-fudge/70" />
                <input id="shop-search" type="search" value={search} onChange={(e) => update('q', e.target.value, '')} placeholder={t('shop.searchPlaceholder')} className="input pl-11" autoComplete="off" />
              </div>
            </div>
            <div>
              <label htmlFor="shop-sort" className="mb-1.5 block font-semibold text-deep">
                {t('shop.sort')}
              </label>
              <select id="shop-sort" value={sort} onChange={(e) => update('sort', e.target.value, 'featured')} className="input pr-10 sm:min-w-56">
                {SORTS.map(([v, key]) => (
                  <option key={v} value={v}>
                    {t(key)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div role="group" aria-label={t('shop.categories')} className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
            <button type="button" className="pill shrink-0" aria-pressed={category === 'all'} onClick={() => update('category', 'all', 'all')}>
              {t('shop.all')}
            </button>
            {cats.map((c) => (
              <button key={c.id} type="button" className="pill shrink-0" aria-pressed={category === c.id} onClick={() => update('category', c.id, 'all')}>
                {pick(c.name)}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-4 font-semibold" aria-live="polite">
          {loading ? t('common.loading') : list.length === 1 ? t('shop.resultsOne') : t('shop.results', { count: list.length })}
        </p>

        {!loading && list.length === 0 ? (
          <div className="sticker p-8 text-center">
            <p className="text-lg">{t('shop.empty')}</p>
            <button type="button" className="btn btn-outline mt-4" onClick={() => setParams({}, { replace: true })}>
              {t('shop.clear')}
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} index={i} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
