import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

const rotations = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.5deg]"];

export default function PostCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  const rotate = rotations[index % rotations.length];
  const formattedDate = formatDate(post.date, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-cream wobble-border blob-shadow p-6 transition-transform hover:-translate-y-1 hover:rotate-0 ${rotate}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-ink group-hover:text-pink-deep">
          {post.title}
        </h3>
        <span className="text-2xl shrink-0" aria-hidden>
          {post.mood}
        </span>
      </div>
      <p className="mt-3 text-ink/80 leading-relaxed">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 text-xs font-heading uppercase tracking-wide text-ink/60">
        <span>{formattedDate}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
        <span className="ml-auto squiggle-underline text-pink-deep font-semibold normal-case text-sm">
          read it →
        </span>
      </div>
    </Link>
  );
}
