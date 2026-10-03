import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { site } from '../config/site'
import { HeartIcon } from './Icons'

// Offer strip shown above the header. Text and on/off live in src/config/site.js.
export default function OfferBanner() {
  const { t, pick } = useI18n()
  if (!site.offer.enabled) return null
  return (
    <div className="bg-deep text-cream">
      <div className="container-pb flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-1.5 text-center text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <HeartIcon className="h-4 w-4 text-rose" />
          <span className="rounded-full bg-rose px-2 text-xs font-bold text-deep">{t('offer.label')}</span>
          {pick(site.offer.text)}
        </span>
        <Link to={site.offer.link} className="font-semibold text-blush underline decoration-rose decoration-2 underline-offset-4 hover:text-white">
          {t('offer.cta')} →
        </Link>
      </div>
    </div>
  )
}
