import { Link, useLocation, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useSeo } from '../hooks/useSeo'
import { useAsync } from '../hooks/useAsync'
import { getRecentOrder } from '../services'
import { formatDate, formatPrice } from '../lib/format'
import { orderWhatsAppUrl } from '../lib/whatsapp'
import { ArrowRightIcon, WhatsAppIcon } from '../components/Icons'

export default function OrderSuccess() {
  useSeo('success')
  const { t, lang } = useI18n()
  const { id } = useParams()
  const { state } = useLocation()
  const { data: order, loading } = useAsync(() => (state?.order ? Promise.resolve(state.order) : getRecentOrder(id)), [id])

  return (
    <section className="doodles bg-blush py-10 sm:py-16">
      <div className="container-pb">
        <div className="sticker mx-auto max-w-xl p-6 text-center sm:p-10">
          <img src="/logo-icon.svg" alt="" width="96" height="96" className="pop mx-auto h-24 w-24" />
          <h1 className="mt-3 text-4xl sm:text-5xl">{t('success.title')}</h1>
          <p className="mt-5 text-sm font-semibold tracking-wider text-rose-ink uppercase">{t('success.orderId')}</p>
          <p className="mt-1 inline-block -rotate-2 rounded-2xl border-2 border-dashed border-rose bg-blush-soft px-6 py-2 font-display text-4xl text-deep">{id}</p>
          <p className="mt-2 text-sm">{t('success.saveId')}</p>

          {!loading && !order && <p className="mt-4">{t('success.missing')}</p>}

          {order && (
            <>
              <p className="mt-6 text-lg">{t('success.text')}</p>
              <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-2 text-left">
                <dt>{t('cart.total')}</dt>
                <dd className="text-right font-semibold">{formatPrice(order.total)}</dd>
                <dt>{t('checkout.date')}</dt>
                <dd className="text-right font-semibold">{formatDate(order.deliveryDate, lang)}</dd>
              </dl>
              <div className="mt-8 rounded-2xl bg-blush-soft p-4">
                <p className="font-semibold">{t('success.notOpened')}</p>
                <a href={orderWhatsAppUrl(order)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-3 w-full">
                  <WhatsAppIcon /> {t('success.sendAgain')}
                </a>
              </div>
            </>
          )}

          <Link to={`/track?id=${encodeURIComponent(id)}${order ? `&phone=${order.customer.phone}` : ''}`} className="btn btn-rose btn-chunky mt-4 w-full">
            {t('success.track')} <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link to="/shop" className="btn btn-outline mt-3 w-full">
            {t('common.continueShopping')}
          </Link>
        </div>
      </div>
    </section>
  )
}
