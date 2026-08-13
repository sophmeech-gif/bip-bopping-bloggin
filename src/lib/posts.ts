import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  mood: string;
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

function getSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map((slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        mood: data.mood as string,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatDate(dateStr: string, options: Intl.DateTimeFormatOptions): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", options);
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    mood: data.mood as string,
    readingTime: readingTime(content).text,
    content,
  };
}
