import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useSeo } from '../hooks/useSeo'
import { useAsync } from '../hooks/useAsync'
import { getBoxes, getCategories, getProducts } from '../services'
import { formatPrice } from '../lib/format'
import { site } from '../config/site'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import WaveDivider from '../components/WaveDivider'
import BoxVisual from '../components/BoxVisual'
import Reveal from '../components/Reveal'
import { ArrowRightIcon, BoxIcon, CheckIcon, HeartIcon, InstagramIcon, LeafIcon, SparkleIcon } from '../components/Icons'

function Hero() {
  const { t } = useI18n()
  const { data: list = [] } = useAsync(() => getProducts(), [])
  const fromPrice = Math.min(...list.filter((p) => p.unit === 'piece').map((p) => p.price))
  return (
    <section className="doodles bg-blush">
      <div className="container-pb grid items-center gap-6 pt-6 pb-2 sm:pt-10 lg:grid-cols-2 lg:gap-10 lg:pt-14">
        <div className="sticker order-2 px-5 py-7 sm:px-9 sm:py-10 lg:order-1">
          <p className="kicker">♥ {t('home.hero.eyebrow')}</p>
          <h1 className="mt-3 text-[2.6rem] sm:text-6xl">{t('home.hero.title')}</h1>
          <p className="mt-4 text-lg">{t('home.hero.subtitle')}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/shop" className="btn btn-rose btn-chunky">
              {t('home.hero.cta')} <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link to="/build-your-box" className="btn btn-outline btn-chunky">
              <BoxIcon className="h-5 w-5" /> {t('home.hero.build')}
            </Link>
          </div>
          {Number.isFinite(fromPrice) && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-caramel-soft px-4 py-1.5 text-sm font-semibold text-caramel-ink">
              <SparkleIcon className="h-4 w-4" /> {t('home.hero.from', { price: fromPrice })}
            </p>
          )}
        </div>
        <div className="order-1 mx-auto w-full max-w-[22rem] sm:max-w-md lg:order-2 lg:max-w-none">
          <img src="/hero-brownies.svg" alt={t('home.hero.artAlt')} width="600" height="640" className="wobble w-full" fetchPriority="high" />
        </div>
      </div>
      <WaveDivider from="blush" to="cream" />
    </section>
  )
}

function TrustBadges() {
  const { t } = useI18n()
  const items = [
    ['noPreservatives', LeafIcon, 'bg-[#E4EEDC]'],
    ['fssai', CheckIcon, 'bg-caramel-soft'],
    ['baker', SparkleIcon, 'bg-blush'],
    ['homemade', HeartIcon, 'bg-[#F3D9D3]'],
  ]
  return (
    <section aria-label={t('home.trust.title')} className="container-pb py-8 sm:py-12">
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {items.map(([key, Icon, bg], i) => (
          <Reveal as="li" key={key} delay={i * 70} className={`sticker flex min-w-0 flex-col items-center gap-2 p-3 text-center sm:flex-row sm:gap-3 sm:p-4 sm:text-left ${i % 2 ? 'sm:rotate-1' : 'sm:-rotate-1'}`}>
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-deep/10 text-deep ${bg}`}>
              <Icon className="h-6 w-6" />
            </span>
            <span className="min-w-0 text-[0.95rem] leading-snug font-semibold text-deep [overflow-wrap:anywhere] sm:text-base">{t(`home.trust.${key}`)}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function Flavours() {
  const { t } = useI18n()
  const { data: list = [] } = useAsync(() => getProducts({ category: 'indulgent' }), [])
  return (
    <section className="container-pb py-8 sm:py-12" aria-labelledby="flavours-title">
      <SectionHeading id="flavours-title" kicker={t('home.flavours.eyebrow')} title={t('home.flavours.title')} subtitle={t('home.flavours.subtitle')} />
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {list.slice(0, 6).map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 3) * 70}>
            <ProductCard product={p} index={i} />
          </Reveal>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link to="/shop" className="btn btn-outline">
          {t('common.viewAll')} <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

function BuildBoxPromo() {
  const { t } = useI18n()
  const { data: flavours = [] } = useAsync(() => getProducts({ boxFlavours: true }), [])
  const { data: boxes = [] } = useAsync(getBoxes, [])
  const pickIds = ['triple', 'ragi', 'oreo', 'kambu', 'nutella', 'classic']
  const slots = pickIds.map((id) => flavours.find((p) => p.id === id)).filter(Boolean)
  return (
    <section aria-labelledby="box-title">
      <WaveDivider from="cream" to="deep" />
      <div className="bg-deep py-10 text-cream sm:py-14">
        <div className="container-pb grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="kicker bg-rose text-deep">♥ {t('home.box.eyebrow')}</p>
            <h2 id="box-title" className="mt-3 text-4xl text-cream sm:text-5xl">
              {t('home.box.title')}
            </h2>
            <p className="mt-3 text-lg text-cream/85">{t('home.box.text')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {boxes.map((b) => (
                <Link key={b.id} to={`/build-your-box?size=${b.boxSize}`} className="rounded-2xl border-2 border-cream/30 px-4 py-2 transition hover:border-rose">
                  <span className="block text-sm text-cream/80">{t(b.boxSize === 4 ? 'home.box.four' : 'home.box.six')}</span>
                  <span className="font-display text-2xl text-rose">{formatPrice(b.price)}</span>
                </Link>
              ))}
            </div>
            <Link to="/build-your-box" className="btn btn-rose btn-chunky mt-7">
              <BoxIcon className="h-5 w-5" /> {t('home.box.cta')}
            </Link>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-md -rotate-2">
            <BoxVisual size={6} slots={slots} />
          </Reveal>
        </div>
      </div>
      <WaveDivider from="deep" to="cream" />
    </section>
  )
}

function Healthy() {
  const { t } = useI18n()
  const { data: list = [] } = useAsync(() => getProducts({ category: 'healthy' }), [])
  return (
    <section className="container-pb py-8 sm:py-12" aria-labelledby="healthy-title">
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div className="sticker p-6 sm:p-8">
          <p className="kicker bg-[#E4EEDC] text-[#24461B]">
            <LeafIcon className="h-4 w-4" /> {t('home.healthy.eyebrow')}
          </p>
          <h2 id="healthy-title" className="mt-3 text-4xl">
            {t('home.healthy.title')}
          </h2>
          <p className="mt-3 text-lg">{t('home.healthy.text')}</p>
          <Link to="/shop?category=healthy" className="btn btn-choc mt-6">
            {t('home.healthy.cta')} <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
        <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pt-3 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {list.map((p, i) => (
            <li key={p.id} className="w-[46%] shrink-0 snap-start sm:w-auto">
              <ProductCard product={p} index={i + 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function MoreCategories() {
  const { t, pick } = useI18n()
  const { data: cats = [] } = useAsync(getCategories, [])
  const more = cats.filter((c) => !['indulgent', 'healthy', 'boxes'].includes(c.id))
  return (
    <section className="doodles doodles-soft py-10 sm:py-14" aria-labelledby="more-title">
      <div className="container-pb">
        <div className="sticker mx-auto mb-8 max-w-xl px-5 pt-6 pb-1 text-center">
          <SectionHeading id="more-title" kicker={t('home.categories.eyebrow')} title={t('home.categories.title')} className="!mb-5" />
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {more.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 60}>
              <Link to={`/shop?category=${c.id}`} className="sticker group flex h-full flex-col items-center p-3 text-center transition hover:-translate-y-1 hover:shadow-pop">
                <img src={c.image} alt="" loading="lazy" width="400" height="400" className="aspect-square w-full rounded-[1.3rem] object-cover transition group-hover:scale-105" />
                <h3 className="mt-3 text-xl">{pick(c.name)}</h3>
                <p className="mt-1 text-sm text-fudge/85">{pick(c.blurb)}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function HowToOrder() {
  const { t } = useI18n()
  return (
    <section className="container-pb py-10 sm:py-14" aria-labelledby="how-title">
      <h2 id="how-title" className="mb-8 text-center text-4xl sm:text-5xl">
        {t('home.how.title')}
      </h2>
      <ol className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {['s1', 's2', 's3', 's4'].map((s, i) => (
          <Reveal as="li" key={s} delay={i * 70} className="sticker p-4 text-center sm:p-6">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose font-display text-2xl text-deep shadow-[0_3px_0_#A8445A]">{i + 1}</span>
            <h3 className="mt-3 text-2xl">{t(`home.how.${s}.title`)}</h3>
            <p className="mt-1 text-[0.95rem]">{t(`home.how.${s}.text`)}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function StoryAndInstagram() {
  const { t } = useI18n()
  const tiles = ['box-6', 'nutella', 'cake', 'lava-cups', 'ragi', 'cookie-tin']
  return (
    <section className="container-pb grid gap-6 py-6 lg:grid-cols-2" aria-label={t('home.story.eyebrow')}>
      <Reveal className="sticker flex min-w-0 flex-col justify-center p-6 sm:p-8">
        <p className="kicker self-start">♥ {t('home.story.eyebrow')}</p>
        <h2 className="mt-3 text-4xl">{t('home.story.title')}</h2>
        <p className="mt-3 text-lg">{t('home.story.text')}</p>
        <Link to="/about" className="btn btn-outline mt-6 self-start">
          {t('home.story.cta')} <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </Reveal>
      <Reveal delay={100} className="sticker min-w-0 bg-blush-soft p-6 sm:p-8">
        <p className="kicker bg-white">{t('home.instagram.eyebrow')}</p>
        <h2 className="mt-3 text-3xl [overflow-wrap:anywhere] sm:text-4xl">{t('home.instagram.title', { handle: site.social.instagramHandle })}</h2>
        <p className="mt-2">{t('home.instagram.text')}</p>
        <ul className="mt-4 grid grid-cols-3 gap-2">
          {tiles.map((img, i) => (
            <li key={img} className={i % 2 ? 'rotate-2' : '-rotate-2'}>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border-4 border-white shadow-sticker" aria-label={`${t('home.instagram.cta')} (${site.social.instagramHandle})`}>
                <img src={`/products/${img}.svg`} alt="" loading="lazy" width="400" height="400" className="aspect-square w-full object-cover" />
              </a>
            </li>
          ))}
        </ul>
        <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-choc mt-5">
          <InstagramIcon /> {t('home.instagram.cta')}
        </a>
      </Reveal>
    </section>
  )
}

function EnquiryCta() {
  const { t } = useI18n()
  return (
    <section className="container-pb py-10 sm:py-14">
      <Reveal className="doodles doodles-soft overflow-hidden rounded-[2rem] border-4 border-deep bg-rose px-6 py-10 text-center shadow-pop sm:px-12">
        <div className="mx-auto max-w-xl rounded-[1.5rem] bg-white/90 p-6">
          <h2 className="text-4xl">{t('home.cta.title')}</h2>
          <p className="mt-3 text-lg">{t('home.cta.text')}</p>
          <Link to="/contact" className="btn btn-choc btn-chunky mt-6">
            {t('home.cta.button')} <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  useSeo('home')
  return (
    <>
      <Hero />
      <TrustBadges />
      <Flavours />
      <BuildBoxPromo />
      <Healthy />
      <MoreCategories />
      <HowToOrder />
      <StoryAndInstagram />
      <EnquiryCta />
    </>
  )
}
