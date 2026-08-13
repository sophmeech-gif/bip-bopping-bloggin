"use client";

import Giscus from "@giscus/react";

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

const isConfigured = Boolean(repo && repoId && category && categoryId);

export default function Comments({ slug }: { slug: string }) {
  if (!isConfigured) {
    return (
      <div className="wobble-border bg-cream p-6 text-center">
        <p className="font-heading font-semibold text-ink">
          comments aren&apos;t hooked up yet ✦
        </p>
        <p className="mt-2 text-sm text-ink/70">
          set the <code>NEXT_PUBLIC_GISCUS_*</code> variables in{" "}
          <code>.env.local</code> to switch these on, see the README.
        </p>
      </div>
    );
  }

  return (
    <Giscus
      id={`comments-${slug}`}
      repo={repo as `${string}/${string}`}
      repoId={repoId as string}
      category={category as string}
      categoryId={categoryId as string}
      mapping="pathname"
      term={`/blog/${slug}`}
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}
