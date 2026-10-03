import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useSeo } from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { ArrowRightIcon, CheckIcon, LeafIcon, SparkleIcon } from '../components/Icons'

export default function About() {
  useSeo('about')
  const { t } = useI18n()
  const values = [
    ['v1', SparkleIcon, 'bg-blush'],
    ['v2', LeafIcon, 'bg-[#E4EEDC]'],
    ['v3', CheckIcon, 'bg-caramel-soft'],
  ]
  return (
    <>
      <PageHero kicker={t('about.eyebrow')} title={t('about.title')} />
      <section className="container-pb py-8 sm:py-12">
        <div className="sticker grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[auto_1fr]">
          <img src="/hero-brownies.svg" alt="" width="600" height="640" className="mx-auto w-48 sm:w-64" />
          <div className="space-y-4 text-lg">
            {/* PLACEHOLDER story — replace with the client's own words */}
            <p className="rounded-2xl bg-caramel-soft px-4 py-2 text-sm font-semibold text-caramel-ink">{t('about.placeholder')}</p>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
        </div>
      </section>
      <section className="doodles doodles-soft py-10 sm:py-14" aria-labelledby="values-title">
        <div className="container-pb">
          <h2 id="values-title" className="sticker mx-auto mb-8 max-w-md px-6 py-4 text-center text-4xl">
            {t('about.values.title')}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {values.map(([k, Icon, bg], i) => (
              <Reveal as="li" key={k} delay={i * 80} className={`sticker p-6 text-center ${i === 1 ? 'sm:rotate-1' : 'sm:-rotate-1'}`}>
                <span className={`mx-auto grid h-14 w-14 place-items-center rounded-full text-deep ${bg}`}>
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-3 text-2xl">{t(`about.values.${k}.title`)}</h3>
                <p className="mt-1">{t(`about.values.${k}.text`)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <div className="container-pb py-12 text-center">
        <Link to="/shop" className="btn btn-rose btn-chunky">
          {t('about.cta')} <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </>
  )
}
