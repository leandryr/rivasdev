import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt         = "Rivas Technologies LLC — Engineering That Scales";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const iconBuffer = readFileSync(join(process.cwd(), "public/icono/LLC.png"));
  const iconBase64 = `data:image/png;base64,${iconBuffer.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          background: "#050507",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background glows */}
        <div style={{ position:"absolute", top:-200, left:-100, width:700, height:700, borderRadius:350, background:"rgba(10,124,255,0.18)", display:"flex" }} />
        <div style={{ position:"absolute", bottom:-150, right:-100, width:600, height:600, borderRadius:300, background:"rgba(139,92,246,0.12)", display:"flex" }} />
        <div style={{ position:"absolute", top:200, right:100, width:400, height:400, borderRadius:200, background:"rgba(10,124,255,0.08)", display:"flex" }} />

        {/* Grid */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(10,124,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,124,255,0.05) 1px, transparent 1px)",
          backgroundSize:"60px 60px",
          display:"flex",
        }} />

        {/* Top accent */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:"linear-gradient(90deg,#050507,#0A7CFF,#8B5CF6,#050507)", display:"flex" }} />

        {/* Content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 80px" }}>

          {/* Logo row */}
          <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:40 }}>
            <div style={{ width:64, height:64, borderRadius:16, overflow:"hidden", display:"flex" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconBase64} alt="LLC" width={64} height={64} style={{ objectFit:"contain" }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              <div style={{ display:"flex", flexDirection:"row" }}>
                <div style={{ color:"#FFFFFF", fontSize:36, fontWeight:900, letterSpacing:-1 }}>Rivas</div>
                <div style={{ color:"#0A7CFF",  fontSize:36, fontWeight:900, letterSpacing:-1 }}>Technologies</div>
              </div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:14, letterSpacing:3, fontWeight:500 }}>LLC · GAINESVILLE, GA · EST. 2021</div>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ color:"#FFFFFF", fontSize:72, fontWeight:900, lineHeight:1.05, letterSpacing:-3, maxWidth:900 }}>
            Engineering
          </div>
          <div style={{ display:"flex", flexDirection:"row", gap:16, alignItems:"baseline" }}>
            <div style={{ color:"#0A7CFF", fontSize:72, fontWeight:900, lineHeight:1.05, letterSpacing:-3 }}>
              That Scales.
            </div>
          </div>

          {/* Services strip */}
          <div style={{ display:"flex", flexDirection:"row", gap:12, marginTop:36 }}>
            {["Web Apps","Automation","AI","Security","Cloud","Mobile"].map((s, i) => (
              <div key={i} style={{
                display:"flex", padding:"8px 18px", borderRadius:999,
                background:"rgba(10,124,255,0.12)",
                border:"1px solid rgba(10,124,255,0.35)",
              }}>
                <div style={{ color:"rgba(10,124,255,0.9)", fontSize:14, fontWeight:600 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side decoration */}
        <div style={{
          position:"absolute", right:80, top:"50%",
          display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8,
          transform:"translateY(-50%)",
        }}>
          {[
            { val:"US + LATAM", label:"Presence" },
            { val:"24h",       label:"Response" },
            { val:"2021",      label:"Founded" },
          ].map((s, i) => (
            <div key={i} style={{
              display:"flex", flexDirection:"column", alignItems:"flex-end",
              padding:"16px 24px", borderRadius:14,
              background:"rgba(10,124,255,0.08)",
              border:"1px solid rgba(10,124,255,0.2)",
              minWidth:140,
            }}>
              <div style={{ color:"#0A7CFF", fontSize:28, fontWeight:900, lineHeight:1 }}>{s.val}</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:12, letterSpacing:2, marginTop:4 }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 80px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ color:"rgba(255,255,255,0.35)", fontSize:16 }}>rivastechnologies.com</div>
          <div style={{ color:"rgba(255,255,255,0.35)", fontSize:16 }}>contact@rivastechnologies.com</div>
        </div>

        {/* Bottom accent */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:4, background:"linear-gradient(90deg,#050507,#0A7CFF,#050507)", display:"flex" }} />
      </div>
    ),
    { width:1200, height:630 }
  );
}
