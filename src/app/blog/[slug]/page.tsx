import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CommentBox from "@/components/CommentBox";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const post = getPostBySlug(slug);
    return { title: `${post.title} · Bip Bopping Bloggin` };
  } catch {
    return { title: "post not found · Bip Bopping Bloggin" };
  }
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const formattedDate = formatDate(post.date, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="mx-auto max-w-2xl px-5 py-14">
      <Link
        href="/blog"
        className="squiggle-underline font-heading font-semibold text-pink-deep text-sm"
      >
        ← back to the blog
      </Link>

      <header className="mt-6 mb-10 text-center">
        <span className="text-4xl" aria-hidden>
          {post.mood}
        </span>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-sm font-heading uppercase tracking-wide text-ink/60">
          {formattedDate} · {post.readingTime}
        </p>
      </header>

      <div className="post-content text-ink">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <hr className="my-12 border-t-[3px] border-ink" />

      <section>
        <h2 className="font-heading text-2xl font-bold text-ink mb-6">
          say something ✦
        </h2>
        <CommentBox slug={post.slug} />
      </section>
    </article>
  );
}
