import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useCart } from '../context/CartProvider'
import Wordmark from './Wordmark'
import LangToggle from './LangToggle'
import OfferBanner from './OfferBanner'
import { CartIcon, CloseIcon, MenuIcon } from './Icons'

export const NAV = [
  ['/', 'nav.home'],
  ['/shop', 'nav.shop'],
  ['/build-your-box', 'nav.build'],
  ['/about', 'nav.about'],
  ['/gallery', 'nav.gallery'],
  ['/track', 'nav.track'],
  ['/faq', 'nav.faq'],
  ['/contact', 'nav.contact'],
]
// The desktop bar shows the main few; the rest live in the menu drawer
const DESKTOP = ['/shop', '/build-your-box', '/about', '/track', '/contact']

export default function Header() {
  const { t } = useI18n()
  const { pieces } = useCart()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <OfferBanner />
      <header className="sticky top-0 z-40 border-b-2 border-blush bg-cream/95 backdrop-blur">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-deep focus:px-4 focus:py-2 focus:text-cream">
          {t('nav.skip')}
        </a>
        <div className="container-pb flex h-16 items-center gap-2 sm:h-20">
          <Link to="/" className="min-w-0 shrink" aria-label={t('brand.name')}>
            <span className="sm:hidden">
              <Wordmark size="sm" />
            </span>
            <span className="hidden sm:block">
              <Wordmark size="md" />
            </span>
          </Link>

          <nav aria-label="Main" className="mx-auto hidden items-center gap-1 rounded-full bg-white p-1 shadow-sticker lg:flex">
            {NAV.filter(([to]) => DESKTOP.includes(to)).map(([to, key]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[0.92rem] font-semibold whitespace-nowrap transition ${isActive ? 'bg-rose text-deep' : 'text-deep hover:bg-blush'}`
                }
              >
                {t(key)}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <LangToggle />
            <Link to="/cart" className="relative hidden h-12 w-12 place-items-center rounded-full bg-white text-deep shadow-sticker transition hover:bg-blush md:grid" aria-label={t('common.cartWithCount', { count: pieces })}>
              <CartIcon />
              {pieces > 0 && (
                <span key={pieces} className="pop absolute -top-1 -right-1 grid h-6 min-w-6 place-items-center rounded-full border-2 border-white bg-rose px-1 text-xs font-bold text-deep">
                  {pieces}
                </span>
              )}
            </Link>
            <button type="button" className="grid h-12 w-12 place-items-center rounded-full text-deep transition hover:bg-blush" onClick={() => setOpen(true)} aria-label={t('nav.openMenu')} aria-expanded={open} aria-controls="mobile-menu">
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50" id="mobile-menu" role="dialog" aria-modal="true" aria-label={t('nav.menu')}>
          <div className="absolute inset-0 bg-deep/45" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="doodles doodles-soft absolute top-0 right-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto rounded-l-[2rem] bg-blush-soft shadow-pop">
            <div className="flex items-center justify-between p-4">
              <Wordmark size="sm" />
              <button type="button" autoFocus className="grid h-12 w-12 place-items-center rounded-full bg-white text-deep shadow-sticker hover:bg-blush" onClick={() => setOpen(false)} aria-label={t('nav.closeMenu')}>
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-2 p-4 pt-0">
              {NAV.map(([to, key]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `flex min-h-12 items-center rounded-2xl px-4 text-lg font-semibold ${isActive ? 'bg-rose text-deep' : 'bg-white text-deep hover:bg-blush'}`}
                >
                  {t(key)}
                </NavLink>
              ))}
              <NavLink to="/cart" className="mt-2 flex min-h-12 items-center justify-between rounded-2xl bg-deep px-4 text-lg font-semibold text-cream">
                <span className="flex items-center gap-2">
                  <CartIcon /> {t('nav.cart')}
                </span>
                <span className="rounded-full bg-rose px-2.5 text-sm font-bold text-deep">{pieces}</span>
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
