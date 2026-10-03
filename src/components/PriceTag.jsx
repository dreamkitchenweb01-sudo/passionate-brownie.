import { useI18n } from '../i18n/I18nProvider'
import { formatPrice } from '../lib/format'

// Tilted sticker price tag: "₹70 / per piece" (shows the old price when discounted)
export default function PriceTag({ product, className = '', size = 'md' }) {
  const { t } = useI18n()
  const big = size === 'lg'
  return (
    <span className={`price-tag ${product.unit === 'piece' ? 'bg-blush' : ''} ${className}`}>
      {product.mrp && (
        <span className="text-xs text-fudge/80 line-through" aria-label={t('product.mrp', { mrp: product.mrp })}>
          {formatPrice(product.mrp)}
        </span>
      )}
      <span className={`font-display ${big ? 'text-4xl' : 'text-2xl'}`}>{formatPrice(product.price)}</span>
      <span className="text-[0.7rem] font-semibold tracking-wide text-fudge uppercase">{t(`units.${product.unit}`)}</span>
    </span>
  )
}
