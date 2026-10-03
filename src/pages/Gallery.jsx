import { useI18n } from '../i18n/I18nProvider'
import { useSeo } from '../hooks/useSeo'
import { useAsync } from '../hooks/useAsync'
import { getProducts } from '../services'
import { site } from '../config/site'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { InstagramIcon } from '../components/Icons'

export default function Gallery() {
  useSeo('gallery')
  const { t, pick } = useI18n()
  const { data: list = [] } = useAsync(() => getProducts(), [])
  return (
    <>
      <PageHero title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
      <div className="container-pb py-6 sm:py-10">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 50} className={i % 3 === 0 ? '-rotate-1' : i % 3 === 1 ? 'rotate-1' : ''}>
              <figure className="sticker overflow-hidden p-2">
                <img src={p.image} alt={pick(p.name)} loading="lazy" width="400" height="400" className="aspect-square w-full rounded-[1.3rem] object-cover" />
                <figcaption className="px-2 py-2 text-[0.95rem] font-semibold text-deep">{pick(p.name)}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-choc btn-chunky">
            <InstagramIcon /> {t('gallery.follow')}
          </a>
        </div>
      </div>
    </>
  )
}
