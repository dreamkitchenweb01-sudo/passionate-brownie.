import { useI18n } from '../i18n/I18nProvider'

// TEMPORARY logo: heart-and-brownie icon + text wordmark. Replace with the client's original logo.
export default function Wordmark({ size = 'md', invert = false, className = '' }) {
  const { t } = useI18n()
  const s = {
    sm: ['h-10 w-10', 'text-[0.7rem]', 'text-xl'],
    md: ['h-12 w-12', 'text-xs', 'text-2xl'],
    lg: ['h-16 w-16', 'text-sm', 'text-4xl'],
  }[size]
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} lang="en">
      <span className={`grid shrink-0 place-items-center rounded-2xl ${invert ? 'bg-blush' : 'bg-blush'} ${s[0]}`}>
        <img src="/logo-icon.svg" alt="" width="128" height="128" className="h-[85%] w-[85%]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-sans font-semibold tracking-[0.18em] uppercase ${invert ? 'text-rose' : 'text-rose-ink'} ${s[1]}`}>{t('brand.line1')}</span>
        <span className={`font-display ${invert ? 'text-cream' : 'text-deep'} ${s[2]}`}>{t('brand.line2')}</span>
      </span>
      <span className="sr-only">{t('brand.logoAlt')}</span>
    </span>
  )
}
