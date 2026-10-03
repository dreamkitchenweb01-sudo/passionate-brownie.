import { useI18n } from '../i18n/I18nProvider'
import { formatPrice } from '../lib/format'
import { deliveryCharge } from '../lib/orderRules'

export const contentsLabel = (contents, pick) => contents.map((c) => `${pick(c.name)} × ${c.qty}`).join(', ')

// Totals block shared by Cart and Checkout
export default function OrderSummary({ items, pieces, subtotal, showItems = false, children }) {
  const { t, pick } = useI18n()
  const delivery = deliveryCharge(pieces)
  return (
    <div className="sticker p-5 sm:p-6">
      <h2 className="text-3xl">{t('cart.summary')}</h2>
      {showItems && (
        <ul className="mt-4 space-y-2 border-b-2 border-dashed border-blush pb-4">
          {items.map((i) => (
            <li key={i.lineId} className="text-[0.98rem]">
              <div className="flex justify-between gap-3">
                <span className="min-w-0">
                  {pick(i.name)} <span className="font-semibold text-rose-ink">× {i.qty}</span>
                </span>
                <span className="shrink-0 font-semibold">{formatPrice(i.price * i.qty)}</span>
              </div>
              {i.contents && <p className="text-sm text-fudge/80">{contentsLabel(i.contents, pick)}</p>}
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-4 space-y-2">
        <div className="flex justify-between">
          <dt>{t('cart.pieces')}</dt>
          <dd className="font-semibold">{pieces}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{t('cart.subtotal')}</dt>
          <dd className="font-semibold">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{t('cart.delivery')}</dt>
          <dd className="font-semibold">{formatPrice(delivery)}</dd>
        </div>
        <div className="flex items-baseline justify-between rounded-2xl bg-blush px-4 py-3 text-xl">
          <dt className="font-semibold text-deep">{t('cart.total')}</dt>
          <dd className="font-display text-2xl text-deep">{formatPrice(subtotal + delivery)}</dd>
        </div>
      </dl>
      {children}
    </div>
  )
}
