// Page header: blush band with sticker doodles, title on a solid card, wavy bottom edge
import WaveDivider from './WaveDivider'

export default function PageHero({ kicker, title, subtitle, children }) {
  return (
    <section>
      <div className="doodles bg-blush pt-8 pb-4 sm:pt-12">
        <div className="container-pb">
          <div className="sticker mx-auto max-w-3xl px-5 py-7 text-center sm:px-10 sm:py-9">
            {kicker && <p className="kicker">{kicker}</p>}
            <h1 className="mt-2 text-4xl sm:text-5xl">{title}</h1>
            {subtitle && <p className="mx-auto mt-3 max-w-xl text-lg">{subtitle}</p>}
            {children}
          </div>
        </div>
      </div>
      <WaveDivider from="blush" to="cream" />
    </section>
  )
}
