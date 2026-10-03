import { useI18n } from '../i18n/I18nProvider'

// Bestseller / Healthy / Sold out / Sample price / % off badges
export default function Badges({ product, className = '' }) {
  const { t } = useI18n()
  const list = []
  if (product.soldOut) list.push(['soldout', t('common.soldOut')])
  product.tags.forEach((tag) => list.push([tag, t(`tags.${tag}`)]))
  if (product.discountPct) list.push(['off', t('common.off', { pct: product.discountPct })])
  if (product.samplePrice) list.push(['sample', t('common.samplePrice')])
  if (!list.length) return null
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {list.map(([k, label]) => (
        <span key={k} className={`badge badge-${k}`}>
          {label}
        </span>
      ))}
    </div>
  )
}
