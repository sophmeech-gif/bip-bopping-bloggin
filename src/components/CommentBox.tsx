"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: number;
  body: string;
  created_at: string;
};

export default function CommentBox({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (!res.ok) {
          setNotConfigured(true);
          return;
        }
        const data = await res.json();
        setComments(data.comments ?? []);
      })
      .catch(() => setError("couldn't load comments, try refreshing"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (notConfigured) {
    return (
      <div className="wobble-border bg-cream p-6 text-center">
        <p className="font-heading font-semibold text-ink">
          comments aren&apos;t hooked up yet ✦
        </p>
        <p className="mt-2 text-sm text-ink/70">
          set <code>POSTGRES_URL</code> in <code>.env.local</code>, see the README.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, body: draft }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setComments((prev) => [...prev, data.comment]);
      setDraft("");
    } catch {
      setError("that didn't send, try again?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="wobble-border bg-cream p-5">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="say something..."
          rows={3}
          maxLength={2000}
          className="w-full resize-none bg-transparent font-body text-ink placeholder:text-ink/40 focus:outline-none"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-ink/50">no account needed</span>
          <button
            type="submit"
            disabled={!draft.trim() || submitting}
            className="bg-ink text-cream font-heading font-bold text-sm px-5 py-2 wobble-border-alt hover:bg-pink-deep transition-colors disabled:opacity-40 disabled:hover:bg-ink"
          >
            {submitting ? "posting..." : "post it"}
          </button>
        </div>
      </form>

      {error && <p className="mt-3 text-sm text-pink-deep">{error}</p>}

      <div className="mt-8 space-y-4">
        {loading && <p className="text-sm text-ink/50">loading comments...</p>}
        {!loading && comments.length === 0 && (
          <p className="text-sm text-ink/50">
            no comments yet, be the first to say something.
          </p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="wobble-border-alt bg-cream p-4">
            <p className="text-ink whitespace-pre-wrap">{comment.body}</p>
            <p className="mt-2 text-xs font-heading uppercase tracking-wide text-ink/50">
              {new Date(comment.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
