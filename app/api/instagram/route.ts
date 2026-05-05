import { NextResponse } from "next/server";

export async function GET() {
  const token     = process.env.INSTAGRAM_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!token || !accountId) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 500 });
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const url = `https://graph.instagram.com/v19.0/${accountId}/media?fields=${fields}&limit=4&access_token=${token}`;

    const res  = await fetch(url, { next: { revalidate: 3600 } }); // cache 1h
    const data = await res.json();

    if (!res.ok || data.error) {
      return NextResponse.json({ error: data.error?.message ?? "API error" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
