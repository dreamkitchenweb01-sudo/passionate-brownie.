import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useSeo } from '../hooks/useSeo'

export default function NotFound() {
  useSeo('notFound')
  const { t } = useI18n()
  return (
    <section className="doodles bg-blush py-12 sm:py-20">
      <div className="container-pb">
        <div className="sticker mx-auto max-w-lg p-6 text-center sm:p-10">
          <p className="font-display text-8xl text-rose" aria-hidden="true">
            4<img src="/logo-icon.svg" alt="" width="80" height="80" className="mx-1 inline-block h-20 w-20 align-[-0.15em]" />4
          </p>
          <h1 className="mt-2 text-4xl">{t('notFound.title')}</h1>
          <p className="mt-3 text-lg">{t('notFound.text')}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/" className="btn btn-rose">
              {t('notFound.home')}
            </Link>
            <Link to="/shop" className="btn btn-outline">
              {t('notFound.shop')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
