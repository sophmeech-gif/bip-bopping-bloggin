# Bip Bopping Bloggin

Your girly, chaotic little corner of the internet. Built with Next.js +
Tailwind, blog posts are plain Markdown files, comments are a custom box
backed by Postgres (no login, no account, just a name-free comment).

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Writing a new post

Add a new `.md` file to `src/content/posts/`. The filename becomes the URL
(e.g. `my-new-post.md` → `/blog/my-new-post`). Frontmatter format:

```markdown
---
title: "your funny title here"
date: "2026-08-13"
excerpt: "one or two sentences that show up on the blog list card"
mood: "🎀"
---

your post content, written like a normal human blog post, in Markdown.
```

That's it — it'll show up on the home page and `/blog` automatically, newest
first.

## Turning on comments

Comments need a Postgres database to store them in (the table is created
automatically the first time the app runs, no manual migration needed).

1. In your Vercel project → **Storage** tab → create a Postgres database
   (Vercel walks you through it, usually via the Neon integration) → **Connect**
   it to this project. Vercel will show you a connection string.
2. Copy `.env.local.example` to `.env.local` and paste that connection string
   in as `POSTGRES_URL`.
3. Restart the dev server. Comments will now work on every post, no sign-in
   required to leave one.

When you deploy (below), connecting the database in Vercel's dashboard
automatically adds the `POSTGRES_URL` environment variable to your project,
no manual copy-paste needed there.

## Deploying

The simplest path for a Next.js site like this is **Vercel** (made by the
Next.js team, free tier is plenty for a blog):

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), sign in, and import that
   repo.
3. Connect a Postgres database (see "Turning on comments" above) if you want
   comments live.
4. Deploy — you'll get a free `.vercel.app` URL immediately.

## Connecting your own domain

1. **Buy the domain** yourself from a registrar (Namecheap, Cloudflare, Squarespace Domains, etc). Nobody but you should ever touch your registrar account/payment details.
2. In your Vercel project → **Settings → Domains**, add your domain.
3. Vercel will show you one or two DNS records to add (usually an `A` record
   for the root domain and a `CNAME` for `www`). Add those records in your
   registrar's DNS settings page.
4. DNS changes can take anywhere from a few minutes to ~24 hours to propagate.
   Vercel's domain settings page will show a green checkmark once it's live.

## Project structure

```
src/
  app/
    page.tsx              home page
    blog/page.tsx          blog listing
    blog/[slug]/page.tsx   individual post + comments
  components/               Navbar, Footer, PostCard, CommentBox
  content/posts/*.md         your blog posts
  lib/posts.ts                reads & parses the markdown files
```
