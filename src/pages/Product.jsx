import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useCart } from '../context/CartProvider'
import { useSeo } from '../hooks/useSeo'
import { useAsync } from '../hooks/useAsync'
import { getCategories, getProduct, getProducts } from '../services'
import { site, waLink } from '../config/site'
import QtyStepper from '../components/QtyStepper'
import ProductCard from '../components/ProductCard'
import Badges from '../components/Badges'
import PriceTag from '../components/PriceTag'
import NotFound from './NotFound'
import { ArrowLeftIcon, BoxIcon, CheckIcon, ClockIcon, LeafIcon, PlusIcon, TruckIcon, WhatsAppIcon } from '../components/Icons'

export default function Product() {
  const { slug } = useParams()
  const { data, loading } = useAsync(async () => {
    const product = await getProduct(slug)
    if (!product) return { product: null }
    const [cats, related] = await Promise.all([getCategories(), getProducts({ category: product.category })])
    return { product, category: cats.find((c) => c.id === product.category), related: related.filter((p) => p.id !== product.id).slice(0, 4) }
  }, [slug])

  if (loading) return <div className="container-pb py-20 text-center">…</div>
  if (!data?.product) return <NotFound />
  return <ProductView key={slug} {...data} />
}

function ProductView({ product, category, related }) {
  const { t, pick } = useI18n()
  const { add } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const name = pick(product.name)
  useSeo('product', { title: `${name} | ${t('brand.name')}, ${site.city}`, desc: pick(product.description) })

  const onAdd = () => {
    add(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const info = [
    [ClockIcon, t('product.shelfLife'), site.shelfLife],
    [LeafIcon, t('product.storage'), t('product.storageText')],
    [TruckIcon, t('product.delivery'), t('product.deliveryText', { charge: site.delivery.charge })],
  ]

  return (
    <>
      <div className="doodles doodles-soft">
        <div className="container-pb py-6 sm:py-10">
          <Link to="/shop" className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-semibold text-deep shadow-sticker hover:bg-blush">
            <ArrowLeftIcon className="h-5 w-5" /> {t('common.backToShop')}
          </Link>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <figure className="sticker relative self-start p-3">
              <img src={product.image} alt={name} width="400" height="400" className={`aspect-square w-full rounded-[1.4rem] object-cover ${product.soldOut ? 'opacity-60' : ''}`} />
              <PriceTag product={product} size="lg" className="absolute -top-2 -right-2 rotate-6" />
              <figcaption className="pt-2 text-center text-sm text-fudge/80">{t('common.sampleNote')}</figcaption>
            </figure>

            <div className="sticker p-5 sm:p-8">
              <Badges product={product} />
              {category && (
                <p className="mt-3 text-sm font-semibold">
                  {t('product.category')}:{' '}
                  <Link className="link-underline" to={`/shop?category=${category.id}`}>
                    {pick(category.name)}
                  </Link>
                </p>
              )}
              <h1 className="mt-2 text-4xl sm:text-5xl">{name}</h1>
              <p className="mt-4 text-lg">{pick(product.description)}</p>
              {product.samplePrice && <p className="mt-3 rounded-2xl bg-caramel-soft px-4 py-2 text-sm font-semibold text-caramel-ink">{t('product.samplePriceNote')}</p>}

              {product.soldOut ? (
                <div className="mt-6 rounded-2xl bg-blush p-4">
                  <p>{t('product.soldOutText')}</p>
                  <a href={waLink(t('product.askMessage', { name: product.name.en }))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-3">
                    <WhatsAppIcon /> {t('product.askWhatsapp')}
                  </a>
                </div>
              ) : product.boxSize ? (
                <div className="mt-6">
                  <p className="mb-3">{t('product.boxNote')}</p>
                  <Link to={`/build-your-box?size=${product.boxSize}`} className="btn btn-rose btn-chunky w-full sm:w-auto">
                    <BoxIcon className="h-5 w-5" /> {t('common.buildBox')}
                  </Link>
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <QtyStepper value={qty} onChange={setQty} />
                  <button type="button" onClick={onAdd} className={`btn btn-chunky min-w-[11rem] flex-1 whitespace-nowrap ${added ? 'btn-choc pop' : 'btn-rose'}`}>
                    {added ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
                    {added ? t('common.added') : t('common.addToCartFull')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      add(product, qty)
                      navigate('/cart')
                    }}
                    className="btn btn-outline w-full"
                  >
                    {t('product.buyNow')}
                  </button>
                </div>
              )}

              <dl className="mt-8 space-y-3 border-t-2 border-dashed border-blush pt-6">
                {info.map(([Icon, label, text]) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="mt-0.5 h-6 w-6 shrink-0 text-rose-ink" />
                    <div>
                      <dt className="font-semibold text-deep">{label}</dt>
                      <dd>{text}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-pb py-10 sm:py-14" aria-labelledby="related-title">
          <h2 id="related-title" className="mb-6 text-center text-4xl">
            {t('product.related')}
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} index={i} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
