import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { site, waLink } from '../config/site'
import Wordmark from './Wordmark'
import WaveDivider from './WaveDivider'
import { ClockIcon, InstagramIcon, MailIcon, PinIcon, WhatsAppIcon } from './Icons'

export default function Footer() {
  const { t, pick } = useI18n()
  const year = new Date().getFullYear()
  const col = 'font-display text-xl text-rose'
  const link = 'inline-flex min-h-11 items-center text-cream/90 transition hover:text-rose'

  return (
    <footer className="mt-16">
      <WaveDivider from="cream" to="deep" />
      <div className="bg-deep text-cream">
        <div className="container-pb grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Wordmark size="md" invert />
            <p className="mt-4 max-w-sm text-cream/85">{t('footer.about')}</p>
          </div>
          <nav aria-label={t('footer.explore')}>
            <h2 className={col}>{t('footer.explore')}</h2>
            <ul className="mt-2">
              {[['/shop', 'nav.shop'], ['/build-your-box', 'nav.build'], ['/about', 'nav.about'], ['/gallery', 'nav.gallery']].map(([to, k]) => (
                <li key={to}>
                  <Link className={link} to={to}>{t(k)}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t('footer.help')}>
            <h2 className={col}>{t('footer.help')}</h2>
            <ul className="mt-2">
              {[['/track', 'nav.track'], ['/faq', 'nav.faq'], ['/contact', 'nav.contact'], ['/cart', 'nav.cart']].map(([to, k]) => (
                <li key={to}>
                  <Link className={link} to={to}>{t(k)}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className={col}>{t('footer.contact')}</h2>
            <ul className="mt-2">
              <li>
                <a className={`${link} gap-2`} href={waLink(t('wa.general'))} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5" /> +91 {site.whatsapp}
                </a>
              </li>
              <li>
                <a className={`${link} gap-2 [overflow-wrap:anywhere]`} href={`mailto:${site.email}`}>
                  <MailIcon className="h-5 w-5 shrink-0" /> {site.email}
                </a>
              </li>
              <li>
                <a className={`${link} gap-2`} href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="h-5 w-5" /> {site.social.instagramHandle}
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-2 text-cream/90">
                <ClockIcon className="h-5 w-5 shrink-0" /> {pick(site.hours)}
              </li>
              <li className="flex min-h-11 items-center gap-2 text-cream/90">
                <PinIcon className="h-5 w-5 shrink-0" /> {t('contact.locationText')}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/15">
          <div className="container-pb flex flex-col gap-2 py-5 pb-24 text-sm text-cream/75 sm:flex-row sm:items-center sm:justify-between md:pb-5">
            <p>{t('footer.rights', { year })}</p>
            <p>{t('footer.fssai', { fssai: site.fssai })}</p>
            <p>{t('footer.madeWith')} ♥</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
