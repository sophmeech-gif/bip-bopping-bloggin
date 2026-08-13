# Bip Bopping Bloggin

Your girly, chaotic little corner of the internet. Built with Next.js +
Tailwind, blog posts are plain Markdown files, comments run on Giscus (free,
no ads, no tracking junk).

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

## Turning on comments (Giscus)

Comments currently show a "not hooked up yet" placeholder. To switch them on:

1. Make sure the code for this site lives in a **public GitHub repo** (Giscus
   needs this — it stores comments as GitHub Discussions behind the scenes,
   but visitors never see GitHub, it just looks like normal comments).
2. In that repo's settings, enable **Discussions** (Settings → General →
   Features → Discussions).
3. Install the [giscus app](https://github.com/apps/giscus) on the repo.
4. Go to [giscus.app](https://giscus.app), enter your repo, pick the
   "Discussion Title contains page pathname" mapping, pick a category (`General`
   is fine), and it'll generate a config block with a `repo`, `repoId`,
   `category`, and `categoryId`.
5. Copy `.env.local.example` to `.env.local` and fill those four values in.
6. Restart the dev server. Comments will now appear on every post.

When you deploy (below), add the same four `NEXT_PUBLIC_GISCUS_*` variables
in your host's environment variable settings too.

## Deploying

The simplest path for a Next.js site like this is **Vercel** (made by the
Next.js team, free tier is plenty for a blog):

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), sign in, and import that
   repo.
3. Add your `NEXT_PUBLIC_GISCUS_*` environment variables in the project
   settings if you've set up comments.
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
  components/               Navbar, Footer, PostCard, Comments
  content/posts/*.md         your blog posts
  lib/posts.ts                reads & parses the markdown files
```
