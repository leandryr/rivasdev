import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, string> = {
  "Architecture":         "#F59E0B",
  "Web Development":      "#0A7CFF",
  "Security":             "#EF4444",
  "Infrastructure":       "#8B5CF6",
  "Engineering":          "#06B6D4",
  "Automatización":       "#10B981",
  "Rendimiento":          "#0A7CFF",
  "IA & Automatización":  "#8B5CF6",
  "Seguridad":            "#EF4444",
};

function wrap(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, 3);
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title    = searchParams.get("title")    ?? "Engineering Insights";
  const category = searchParams.get("category") ?? "Engineering";
  const readTime = searchParams.get("readTime") ?? "5 min";
  const lang     = searchParams.get("lang")     ?? "en";
  const date     = searchParams.get("date")     ?? "";

  const accent   = CATEGORY_COLORS[category] ?? "#0A7CFF";
  const lines    = wrap(title, 32);
  const fontSize = lines[0]?.length > 28 ? 52 : 62;

  // Y positions for up to 3 lines
  const lineY = [200, 200 + fontSize * 1.15, 200 + fontSize * 2.3];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#050507" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="85%" cy="80%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#050507" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#050507"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>

  <!-- Grid lines -->
  ${Array.from({length:22},(_,i)=>`<line x1="${i*55}" y1="0" x2="${i*55}" y2="630" stroke="${accent}" stroke-opacity="0.04"/>`).join("")}
  ${Array.from({length:12},(_,i)=>`<line x1="0" y1="${i*55}" x2="1200" y2="${i*55}" stroke="${accent}" stroke-opacity="0.04"/>`).join("")}

  <!-- Top accent bar -->
  <defs>
    <linearGradient id="topbar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#050507"/>
      <stop offset="40%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#050507"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="5" fill="url(#topbar)"/>

  <!-- Logo box -->
  <rect x="64" y="52" width="44" height="44" rx="11" fill="${accent}"/>
  <text x="86" y="83" font-family="sans-serif" font-size="26" font-weight="900" fill="white" text-anchor="middle">R</text>

  <!-- Logo text -->
  <text x="120" y="80" font-family="sans-serif" font-size="20" font-weight="800" fill="white">Rivas</text>
  <text x="168" y="80" font-family="sans-serif" font-size="20" font-weight="800" fill="${accent}">Technologies</text>

  <!-- Category pill -->
  <rect x="64" y="138" width="${category.length * 8 + 32}" height="32" rx="16" fill="${accent}18" stroke="${accent}" stroke-opacity="0.4" stroke-width="1"/>
  <text x="${64 + (category.length * 8 + 32) / 2}" y="159" font-family="sans-serif" font-size="13" font-weight="700" fill="${accent}" text-anchor="middle" letter-spacing="2">${category.toUpperCase()}</text>

  <!-- Divider line -->
  <rect x="64" y="183" width="36" height="3" rx="2" fill="${accent}"/>

  <!-- Title lines -->
  ${lines.map((line, i) => `<text x="64" y="${lineY[i]}" font-family="sans-serif" font-size="${fontSize}" font-weight="900" fill="white" letter-spacing="-1">${line.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</text>`).join("\n  ")}

  <!-- Meta pills -->
  <rect x="64" y="${lineY[lines.length - 1] + 50}" width="130" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="129" y="${lineY[lines.length - 1] + 72}" font-family="sans-serif" font-size="14" fill="rgba(255,255,255,0.55)" text-anchor="middle">📖 ${readTime} ${lang === "es" ? "lectura" : "read"}</text>

  ${date ? `<rect x="208" y="${lineY[lines.length - 1] + 50}" width="130" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="273" y="${lineY[lines.length - 1] + 72}" font-family="sans-serif" font-size="14" fill="rgba(255,255,255,0.55)" text-anchor="middle">${date}</text>` : ""}

  <!-- Footer -->
  <line x1="64" y1="595" x2="1136" y2="595" stroke="rgba(255,255,255,0.07)"/>
  <text x="64" y="618" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.3)">rivastechnologies.com/blog</text>
  <text x="1136" y="618" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.3)" text-anchor="end">@rivastechnologies</text>

  <!-- Bottom accent -->
  <defs>
    <linearGradient id="botbar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#050507"/>
      <stop offset="50%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#050507"/>
    </linearGradient>
  </defs>
  <rect y="626" width="1200" height="4" fill="url(#botbar)"/>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type":  "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
