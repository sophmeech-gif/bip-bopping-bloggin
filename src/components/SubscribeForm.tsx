"use client";

const USERNAME = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;

export default function SubscribeForm() {
  if (!USERNAME) {
    return (
      <div className="wobble-border bg-cream p-6 text-center">
        <p className="font-heading font-semibold text-ink">
          subscribe isn&apos;t hooked up yet ✦
        </p>
        <p className="mt-2 text-sm text-ink/70">
          set <code>NEXT_PUBLIC_BUTTONDOWN_USERNAME</code> in{" "}
          <code>.env.local</code>, see the README.
        </p>
      </div>
    );
  }

  return (
    <form
      action={`https://buttondown.com/api/emails/embed-subscribe/${USERNAME}`}
      method="post"
      target="popupwindow"
      onSubmit={() => {
        window.open(
          `https://buttondown.com/${USERNAME}`,
          "popupwindow",
          "width=600,height=600"
        );
      }}
      className="wobble-border bg-mint blob-shadow p-6 sm:p-8 text-center"
    >
      <p className="font-heading font-bold text-ink text-lg sm:text-xl">
        get an email whenever I post ✦
      </p>
      <p className="mt-2 text-sm text-ink/70">
        no spam, just new entries (and the occasional extra thought) straight
        to your inbox.
      </p>
      <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <input
          type="email"
          name="email"
          required
          placeholder="your email"
          aria-label="email address"
          className="w-full sm:w-64 bg-white/70 border-2 border-ink px-4 py-2 font-body text-ink placeholder:text-ink/40 focus:outline-none rounded"
        />
        <input type="hidden" value="1" name="embed" />
        <button
          type="submit"
          className="bg-ink text-cream font-heading font-bold px-6 py-2 wobble-border-alt hover:bg-pink-deep transition-colors"
        >
          subscribe
        </button>
      </div>
    </form>
  );
}
