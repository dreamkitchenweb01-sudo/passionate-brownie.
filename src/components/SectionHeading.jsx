export default function SectionHeading({ kicker, title, subtitle, align = 'center', id, className = '' }) {
  const center = align === 'center'
  return (
    <div className={`mb-8 sm:mb-10 ${center ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      {kicker && <p className="kicker">♥ {kicker}</p>}
      <h2 id={id} className="mt-3 text-4xl sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-lg">{subtitle}</p>}
    </div>
  )
}
