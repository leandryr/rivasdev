import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt         = "Rivas Technologies LLC";
export const size        = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  const iconBuffer = readFileSync(join(process.cwd(), "public/icono/LLC.png"));
  const iconBase64 = `data:image/png;base64,${iconBuffer.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width:1200, height:600, background:"#050507", display:"flex", flexDirection:"column", position:"relative", fontFamily:"sans-serif" }}>
        <div style={{ position:"absolute", top:-150, left:-100, width:600, height:600, borderRadius:300, background:"rgba(10,124,255,0.18)", display:"flex" }} />
        <div style={{ position:"absolute", bottom:-100, right:-80, width:500, height:500, borderRadius:250, background:"rgba(139,92,246,0.12)", display:"flex" }} />
        <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:"linear-gradient(90deg,#050507,#0A7CFF,#8B5CF6,#050507)", display:"flex" }} />

        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 80px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28 }}>
            <div style={{ width:52, height:52, borderRadius:13, overflow:"hidden", display:"flex" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconBase64} alt="LLC" width={52} height={52} style={{ objectFit:"contain" }} />
            </div>
            <div style={{ display:"flex" }}>
              <div style={{ color:"#FFFFFF", fontSize:28, fontWeight:900 }}>Rivas</div>
              <div style={{ color:"#0A7CFF",  fontSize:28, fontWeight:900 }}>Technologies LLC</div>
            </div>
          </div>
          <div style={{ color:"#FFFFFF", fontSize:62, fontWeight:900, lineHeight:1.05, letterSpacing:-2, maxWidth:800 }}>
            Engineering That Scales.
          </div>
          <div style={{ color:"rgba(255,255,255,0.55)", fontSize:22, marginTop:20, maxWidth:700, lineHeight:1.5 }}>
            Enterprise software engineering for entrepreneurs — web apps, automation, AI & cloud.
          </div>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", padding:"18px 80px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ color:"rgba(255,255,255,0.35)", fontSize:15 }}>rivastechnologies.com</div>
          <div style={{ color:"rgba(255,255,255,0.35)", fontSize:15 }}>Gainesville, GA · EST. 2021</div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:4, background:"linear-gradient(90deg,#050507,#0A7CFF,#050507)", display:"flex" }} />
      </div>
    ),
    { width:1200, height:600 }
  );
}
