export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream border-t-[3px] border-ink">
      <div className="mx-auto max-w-4xl px-5 py-8 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-heading text-sm">
            Bip Bopping Bloggin &copy; {new Date().getFullYear()}, made by a human,
            on very little sleep.
          </p>
          <p className="text-xs text-cream/70">
            fueled by iced lattes &amp; questionable decisions ✦
          </p>
        </div>
        <p className="text-xs text-cream/50 italic">
          disclaimer: i am no writer, these are just my thoughts scrambled
          into words. i try to use AI for grammar but even that makes
          mistakes xoxoxo.
        </p>
      </div>
    </footer>
  );
}
