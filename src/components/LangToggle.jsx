import { useI18n } from '../i18n/I18nProvider'

export default function LangToggle({ className = '' }) {
  const { lang, setLang, t } = useI18n()
  const opt = (code, label, langAttr) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      lang={langAttr}
      className={`min-h-11 min-w-11 rounded-full px-3 text-sm font-semibold transition ${
        lang === code ? 'bg-deep text-cream' : 'text-deep hover:bg-blush'
      }`}
    >
      {label}
    </button>
  )
  return (
    <div role="group" aria-label={t('nav.language')} className={`inline-flex items-center rounded-full border-2 border-deep/15 bg-white p-0.5 ${className}`}>
      {opt('en', 'EN', 'en')}
      {opt('ta', 'தமிழ்', 'ta')}
    </div>
  )
}
