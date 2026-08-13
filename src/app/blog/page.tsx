import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "the blog · Bip Bopping Bloggin",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl sm:text-5xl text-pink-deep drop-shadow-[2px_2px_0_var(--color-ink)]">
          the blog
        </h1>
        <p className="mt-4 font-heading text-ink/80 max-w-lg mx-auto">
          everything I&apos;ve published, oldest opinions to newest ones. reader
          discretion advised, mostly regarding my judgment.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
