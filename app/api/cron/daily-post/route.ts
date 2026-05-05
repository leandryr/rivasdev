import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, savePost } from "@/lib/blog";
import { getNextTemplate } from "@/lib/blog-templates";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized calls
  const secret = req.headers.get("x-cron-secret") ?? req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing   = getAllPosts();
    const usedSlugs  = existing.map(p => p.slug);
    const template   = getNextTemplate(usedSlugs);

    if (!template) {
      return NextResponse.json({ message: "No new templates available" });
    }

    const today = new Date().toISOString().split("T")[0];

    savePost({
      slug:        template.slug,
      title:       template.title,
      description: template.description,
      content:     template.content,
      category:    template.category,
      tags:        template.tags,
      date:        today,
      readTime:    template.readTime,
      lang:        template.lang,
      published:   true,
    });

    return NextResponse.json({
      success: true,
      slug:    template.slug,
      title:   template.title,
      date:    today,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
