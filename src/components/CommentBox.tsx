"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: number;
  body: string;
  parent_id: number | null;
  created_at: string;
};

function formatCommentDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CommentThread({
  comment,
  replies,
  onReply,
}: {
  comment: Comment;
  replies: Comment[];
  onReply: (parentId: number, body: string) => Promise<boolean>;
}) {
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleReplySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || submitting) return;
    setSubmitting(true);
    const ok = await onReply(comment.id, draft);
    setSubmitting(false);
    if (ok) {
      setDraft("");
      setReplying(false);
    }
  }

  return (
    <div className="wobble-border-alt bg-cream p-4">
      <p className="text-ink whitespace-pre-wrap">{comment.body}</p>
      <div className="mt-2 flex items-center gap-3">
        <p className="text-xs font-heading uppercase tracking-wide text-ink/50">
          {formatCommentDate(comment.created_at)}
        </p>
        <button
          type="button"
          onClick={() => setReplying((r) => !r)}
          className="text-xs font-heading font-semibold uppercase tracking-wide text-pink-deep squiggle-underline"
        >
          reply
        </button>
      </div>

      {replying && (
        <form onSubmit={handleReplySubmit} className="mt-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`reply...`}
            rows={2}
            maxLength={2000}
            autoFocus
            className="w-full resize-none bg-white/60 rounded p-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setReplying(false)}
              className="text-xs font-heading text-ink/50 px-3 py-1"
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={!draft.trim() || submitting}
              className="bg-ink text-cream font-heading font-bold text-xs px-4 py-1.5 wobble-border-alt hover:bg-pink-deep transition-colors disabled:opacity-40 disabled:hover:bg-ink"
            >
              {submitting ? "posting..." : "reply"}
            </button>
          </div>
        </form>
      )}

      {replies.length > 0 && (
        <div className="mt-4 ml-4 sm:ml-8 space-y-3 border-l-2 border-ink/15 pl-4">
          {replies.map((reply) => (
            <div key={reply.id}>
              <p className="text-ink whitespace-pre-wrap text-sm">{reply.body}</p>
              <p className="mt-1 text-xs font-heading uppercase tracking-wide text-ink/50">
                {formatCommentDate(reply.created_at)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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

  async function postComment(body: string, parentId: number | null) {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, body, parentId }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    setComments((prev) => [...prev, data.comment]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      await postComment(draft, null);
      setDraft("");
    } catch {
      setError("that didn't send, try again?");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReply(parentId: number, body: string) {
    try {
      await postComment(body, parentId);
      return true;
    } catch {
      setError("that reply didn't send, try again?");
      return false;
    }
  }

  const topLevel = comments.filter((c) => c.parent_id === null);
  const repliesByParent = new Map<number, Comment[]>();
  for (const c of comments) {
    if (c.parent_id !== null) {
      const list = repliesByParent.get(c.parent_id) ?? [];
      list.push(c);
      repliesByParent.set(c.parent_id, list);
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
        {topLevel.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            replies={repliesByParent.get(comment.id) ?? []}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
}
