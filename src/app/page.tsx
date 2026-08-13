import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden bg-pink border-b-[3px] border-ink px-5 py-20 sm:py-28">
        <div
          aria-hidden
          className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-mint border-[3px] border-ink opacity-90"
        />
        <div
          aria-hidden
          className="absolute top-16 right-6 sm:right-16 h-24 w-24 rounded-full bg-butter border-[3px] border-ink opacity-90"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-1/4 h-16 w-16 rotate-12 bg-cream border-[3px] border-ink opacity-80"
          style={{ borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%" }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-heading font-bold uppercase tracking-[0.3em] text-cream/90 text-xs sm:text-sm mb-4">
            determined and impulsive, professional overthinker
          </p>
          <h1 className="font-display text-cream text-5xl sm:text-7xl leading-tight drop-shadow-[3px_3px_0_var(--color-pink-deep)]">
            Bip Bopping
            <br />
            Bloggin
          </h1>
          <p className="mt-6 font-heading text-cream text-lg sm:text-xl max-w-xl mx-auto">
            the internet diary of a city girl with 12 work tabs open, a
            fantasy-novel-induced romance complex, and way too many feelings
            about iced lattes. overthinking, situationship recaps, and
            unsolicited opinions, published whenever the mood (or the
            caffeine) strikes.
          </p>
          <Link
            href="/blog"
            className="inline-block mt-8 bg-ink text-cream font-heading font-bold px-7 py-3 wobble-border-alt hover:bg-pink-deep transition-colors"
          >
            read the chaos →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pt-16">
        <div className="wobble-border-alt bg-mint blob-shadow p-6 sm:p-8 text-center">
          <p className="font-heading font-bold text-ink text-lg sm:text-xl">
            heads up: this is opinion and thoughts based writing, not advice,
            not facts, just vibes.
          </p>
          <p className="mt-3 text-ink/80">
            hop on, read, and comment if you relate in the slightest, girlies.
            so I know I&apos;m not out here spiraling alone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-heading text-3xl font-extrabold text-ink">
            the latest spirals
          </h2>
          <Link
            href="/blog"
            className="squiggle-underline font-heading font-semibold text-pink-deep text-sm hidden sm:inline"
          >
            see everything
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
