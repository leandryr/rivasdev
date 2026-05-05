import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const CATEGORY_STYLES: Record<string, { accent: string; secondary: string }> = {
  "Architecture":       { accent: "#F59E0B", secondary: "#EF4444" },
  "Web Development":    { accent: "#0A7CFF", secondary: "#8B5CF6" },
  "Security":           { accent: "#EF4444", secondary: "#F59E0B" },
  "Infrastructure":     { accent: "#8B5CF6", secondary: "#06B6D4" },
  "Engineering":        { accent: "#06B6D4", secondary: "#0A7CFF" },
  "Automatización":     { accent: "#10B981", secondary: "#0A7CFF" },
  "Rendimiento":        { accent: "#0A7CFF", secondary: "#10B981" },
  "IA & Automatización":{ accent: "#8B5CF6", secondary: "#06B6D4" },
  "Seguridad":          { accent: "#EF4444", secondary: "#F59E0B" },
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title    = searchParams.get("title")    ?? "Engineering Insights";
  const category = searchParams.get("category") ?? "Engineering";
  const readTime = searchParams.get("readTime") ?? "5 min";
  const lang     = searchParams.get("lang")     ?? "en";
  const date     = searchParams.get("date")     ?? new Date().toISOString().split("T")[0];

  const style    = CATEGORY_STYLES[category] ?? { accent: "#0A7CFF", secondary: "#8B5CF6" };
  const { accent, secondary } = style;
  const BG = "#050507";

  const shortTitle = title.length > 60 ? title.slice(0, 57) + "..." : title;

  return new ImageResponse(
    (
      <div style={{ width:1200, height:630, background:BG, display:"flex", flexDirection:"column", position:"relative", fontFamily:"sans-serif" }}>
        {/* Glows */}
        <div style={{ position:"absolute", top:-200, left:-100, width:600, height:600, borderRadius:300, background:`${accent}18`, display:"flex" }} />
        <div style={{ position:"absolute", bottom:-150, right:-100, width:500, height:500, borderRadius:250, background:`${secondary}12`, display:"flex" }} />
        {/* Grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${accent}08 1px,transparent 1px),linear-gradient(90deg,${accent}08 1px,transparent 1px)`, backgroundSize:"55px 55px", display:"flex" }} />
        {/* Top bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:`linear-gradient(90deg,${BG},${accent},${secondary},${BG})`, display:"flex" }} />

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"44px 64px 0" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:11, background:accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ color:"#fff", fontSize:26, fontWeight:900, display:"flex" }}>R</div>
            </div>
            <div style={{ display:"flex", flexDirection:"row" }}>
              <div style={{ color:"#fff", fontSize:20, fontWeight:800 }}>Rivas</div>
              <div style={{ color:accent, fontSize:20, fontWeight:800 }}>Technologies</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <div style={{ display:"flex", padding:"7px 18px", borderRadius:999, background:`${accent}18`, border:`1px solid ${accent}40` }}>
              <div style={{ color:accent, fontSize:13, fontWeight:700, letterSpacing:2 }}>
                {lang === "es" ? "BLOG" : "BLOG"} · {category.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px 64px", gap:28 }}>
          {/* Category line */}
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:36, height:3, background:accent, display:"flex" }} />
            <div style={{ color:accent, fontSize:14, fontWeight:700, letterSpacing:3 }}>{category.toUpperCase()}</div>
          </div>
          {/* Title */}
          <div style={{ color:"#FFFFFF", fontSize: shortTitle.length > 45 ? 56 : 68, fontWeight:900, lineHeight:1.06, letterSpacing:-2, maxWidth:980 }}>
            {shortTitle}
          </div>
          {/* Meta row */}
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <div style={{ display:"flex", padding:"9px 20px", borderRadius:999, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ color:"rgba(255,255,255,0.55)", fontSize:14 }}>📖 {readTime} {lang === "es" ? "de lectura" : "read"}</div>
            </div>
            <div style={{ display:"flex", padding:"9px 20px", borderRadius:999, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ color:"rgba(255,255,255,0.55)", fontSize:14 }}>{date}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"20px 64px 44px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ color:"rgba(255,255,255,0.3)", fontSize:17 }}>rivastechnologies.com/blog</div>
          <div style={{ color:"rgba(255,255,255,0.3)", fontSize:17 }}>@rivastechnologies</div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${BG},${accent},${BG})`, display:"flex" }} />
      </div>
    ),
    { width:1200, height:630 }
  );
}
