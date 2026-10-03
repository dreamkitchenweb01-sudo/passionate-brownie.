import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useCart } from '../context/CartProvider'
import { CheckIcon, PlusIcon, BoxIcon } from './Icons'
import Badges from './Badges'
import PriceTag from './PriceTag'

// Rounded sticker card with a tilted price tag
export default function ProductCard({ product, index = 0 }) {
  const { t, pick } = useI18n()
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const timer = useRef()
  const name = pick(product.name)
  const tilt = index % 2 ? 'rotate-3' : '-rotate-3'

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onAdd = () => {
    add(product, 1)
    setAdded(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="sticker group relative flex h-full flex-col p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-pop sm:p-3">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden rounded-[1.35rem] bg-blush-soft" tabIndex={-1} aria-hidden="true">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          width="400"
          height="400"
          className={`aspect-square w-full object-cover transition duration-500 group-hover:scale-105 ${product.soldOut ? 'opacity-55 grayscale-[30%]' : ''}`}
        />
        <Badges product={product} className="absolute right-2 bottom-2 left-2" />
      </Link>
      <PriceTag product={product} className={`absolute top-1 right-1 ${tilt} sm:top-2 sm:right-2`} />
      <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1">
        <h3 className="text-lg leading-snug sm:text-xl">
          <Link to={`/product/${product.slug}`} className="hover:text-rose-ink">
            {name}
          </Link>
        </h3>
        <div className="mt-auto pt-3">
          {product.soldOut ? (
            <span className="badge badge-soldout px-3 py-1.5 text-sm">{t('common.soldOut')}</span>
          ) : product.boxSize ? (
            <Link to={`/build-your-box?size=${product.boxSize}`} className="btn btn-sm btn-choc w-full">
              <BoxIcon className="h-5 w-5" /> {t('common.buildBox')}
            </Link>
          ) : (
            <button type="button" onClick={onAdd} className={`btn btn-sm w-full ${added ? 'btn-choc pop' : 'btn-rose'}`} aria-label={`${t('common.addToCartFull')}: ${name}`}>
              {added ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
              <span>{added ? t('common.added') : t('common.addToCart')}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
