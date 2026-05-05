import fs from "fs";
import path from "path";

export interface BlogPost {
  slug:        string;
  title:       string;
  description: string;
  content:     string;       // HTML string
  category:    string;
  tags:        string[];
  date:        string;       // ISO date
  readTime:    string;
  lang:        "en" | "es";
  published:   boolean;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".json"))
    .map(f => JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8")) as BlogPost)
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function savePost(post: BlogPost): void {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(BLOG_DIR, `${post.slug}.json`),
    JSON.stringify(post, null, 2)
  );
}
