import { NextResponse } from "next/server";

export interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlacesV1Review {
  relativePublishTimeDescription: string;
  rating: number;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution: { displayName: string; photoUri: string; uri: string };
  publishTime: string;
}

export async function GET() {
  const apiKey  = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?languageCode=en`,
    {
      headers: {
        "X-Goog-Api-Key":    apiKey,
        "X-Goog-FieldMask":  "reviews,rating,userRatingCount",
        "Content-Type":      "application/json",
        "Referer":           "https://rivastechnologies.com",
      },
      next: { revalidate: 86400 }, // re-fetch once per day
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json({ error: "Google API error", detail: err }, { status: 502 });
  }

  const data = await res.json();

  // Normalize to a stable shape for the frontend
  const reviews: GoogleReview[] = (data.reviews ?? [] as PlacesV1Review[]).map(
    (r: PlacesV1Review) => ({
      author_name:                r.authorAttribution?.displayName ?? "Anonymous",
      profile_photo_url:          r.authorAttribution?.photoUri ?? "",
      rating:                     r.rating ?? 5,
      relative_time_description:  r.relativePublishTimeDescription ?? "",
      text:                       r.text?.text ?? r.originalText?.text ?? "",
      time:                       r.publishTime ? new Date(r.publishTime).getTime() / 1000 : 0,
    })
  );

  return NextResponse.json({
    reviews,
    rating:             data.rating             ?? null,
    user_ratings_total: data.userRatingCount    ?? null,
  });
}
