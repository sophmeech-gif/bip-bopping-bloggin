import Link from "next/link";

const tickerItems = [
  "certified overthinker",
  "certified 5 foot one girl",
  "seven coffees a day, minimum",
  "still manifesting a vampire boyfriend",
  "runs a bit, emphasis on a bit",
  "mind going 100mph, 24/7",
  "am i normal? tbd",
  "socially awkward some days, unstoppable the rest",
];

export default function Navbar() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <header className="sticky top-0 z-50">
      <div className="overflow-hidden bg-ink text-cream border-b-[3px] border-ink whitespace-nowrap">
        <div className="marquee-track py-1.5 text-xs tracking-wide uppercase">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center px-4 shrink-0">
              {item}
              <span className="ml-4 text-mint">✦</span>
            </span>
          ))}
        </div>
      </div>
      <nav className="bg-pink border-b-[3px] border-ink">
        <div className="mx-auto max-w-4xl px-5 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl text-cream drop-shadow-[2px_2px_0_var(--color-pink-deep)]"
          >
            Bip Bopping Bloggin
          </Link>
          <div className="flex items-center gap-5 font-heading font-semibold text-cream text-sm sm:text-base">
            <Link href="/" className="squiggle-underline pb-0.5 hover:text-mint">
              home
            </Link>
            <Link href="/blog" className="squiggle-underline pb-0.5 hover:text-mint">
              the blog
            </Link>
            <Link href="/contact" className="squiggle-underline pb-0.5 hover:text-mint">
              say hi
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
