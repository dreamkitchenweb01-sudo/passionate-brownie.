import { useI18n } from '../i18n/I18nProvider'
import { useSeo } from '../hooks/useSeo'
import { site, waLink } from '../config/site'
import { pincodePrefixText } from '../lib/validation'
import PageHero from '../components/PageHero'
import { ChevronDownIcon, WhatsAppIcon } from '../components/Icons'

export default function FAQ() {
  useSeo('faq')
  const { t } = useI18n()
  const items = t('faq.items')
  const vars = {
    charge: site.delivery.charge,
    prefixes: pincodePrefixText(),
    threshold: site.order.bulkThreshold,
    days: site.order.bulkMinDaysAhead,
    shelfLife: site.shelfLife,
    fssai: site.fssai,
  }
  const fill = (s) => s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m))

  return (
    <>
      <PageHero title={t('faq.title')} subtitle={t('faq.subtitle')} />
      <div className="container-pb max-w-3xl py-6 sm:py-10">
        <div className="space-y-3">
          {Array.isArray(items) &&
            items.map((it, i) => (
              <details key={i} className="sticker group overflow-hidden" open={i === 0}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-lg font-semibold text-deep [&::-webkit-details-marker]:hidden">
                  {it.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush text-deep transition group-open:rotate-180 group-open:bg-rose">
                    <ChevronDownIcon className="h-5 w-5" />
                  </span>
                </summary>
                <p className="border-t-2 border-dashed border-blush px-5 py-4">{fill(it.a)}</p>
              </details>
            ))}
        </div>
        <div className="mt-8 text-center">
          <a href={waLink(t('wa.general'))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-chunky">
            <WhatsAppIcon /> {t('common.chatWhatsapp')}
          </a>
        </div>
      </div>
    </>
  )
}
