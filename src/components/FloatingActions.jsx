import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useCart } from '../context/CartProvider'
import { waLink } from '../config/site'
import { formatPrice } from '../lib/format'
import { CartIcon, WhatsAppIcon } from './Icons'

// Phones: sticky bottom bar with Cart + WhatsApp. Desktop: floating WhatsApp button.
export default function FloatingActions() {
  const { t } = useI18n()
  const { pieces, subtotal } = useCart()
  const wa = waLink(t('wa.general'))

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="mx-auto flex max-w-lg gap-2 rounded-full bg-white p-1.5 shadow-pop ring-2 ring-blush">
          <Link to="/cart" className="btn btn-choc min-w-0 flex-1 justify-between gap-2 px-4" aria-label={t('common.cartWithCount', { count: pieces })}>
            <span className="flex min-w-0 items-center gap-2">
              <span className="relative shrink-0">
                <CartIcon />
                {pieces > 0 && (
                  <span key={pieces} className="pop absolute -top-2 -right-2.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose px-1 text-[0.7rem] font-bold text-deep">
                    {pieces}
                  </span>
                )}
              </span>
              <span className="truncate">{t('mobileBar.cart')}</span>
            </span>
            <span className="shrink-0 text-rose">{pieces ? formatPrice(subtotal) : t('mobileBar.empty')}</span>
          </Link>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp shrink-0 px-4">
            <WhatsAppIcon />
            <span className="sr-only sm:not-sr-only">{t('mobileBar.whatsapp')}</span>
          </a>
        </div>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('common.chatWhatsapp')}
        title={t('common.chatWhatsapp')}
        className="fixed right-6 bottom-6 z-30 hidden h-16 w-16 place-items-center rounded-full bg-whatsapp text-white shadow-pop ring-4 ring-white transition hover:scale-105 md:grid"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </>
  )
}
