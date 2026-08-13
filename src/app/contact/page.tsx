import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "say hi · Bip Bopping Bloggin",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <span className="text-4xl" aria-hidden>
        💌
      </span>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl text-pink-deep drop-shadow-[2px_2px_0_var(--color-ink)]">
        say hi
      </h1>
      <p className="mt-6 font-heading text-lg text-ink/80 max-w-md mx-auto">
        would love to hear from you, more topics you want me to relate to or
        speak on, questions, whatever&apos;s on your mind. can&apos;t wait to
        meet you.
      </p>

      <a
        href="mailto:bipboppinbloggin@gmail.com"
        className="inline-block mt-10 bg-ink text-cream font-heading font-bold px-7 py-3 wobble-border-alt hover:bg-pink-deep transition-colors"
      >
        bipboppinbloggin@gmail.com
      </a>
    </div>
  );
}
