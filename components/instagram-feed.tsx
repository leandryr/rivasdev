"use client";

import { useEffect, useState } from "react";
import { Instagram, ExternalLink, Play } from "lucide-react";

interface IgPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

export function InstagramFeed() {
  const [posts, setPosts]     = useState<IgPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then(r => r.json())
      .then(d => {
        if (d?.data?.length) setPosts(d.data.slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-12 lg:py-16 px-6 lg:px-10 border-t border-border/20">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Instagram className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-foreground font-semibold text-lg tracking-tight">Latest from Instagram</h2>
            <p className="text-muted-foreground text-xs font-mono mt-0.5">@rivastechnologies</p>
          </div>
        </div>
        <a href="https://instagram.com/rivastechnologies" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300">
          View all <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [1,2,3,4].map(i => (
              <div key={i}
                className="w-full rounded-xl bg-card/40 animate-pulse border border-border/20"
                style={{ paddingBottom: "125%" }}
              />
            ))
          : posts.map(post => {
              const rawSrc = post.media_type === "VIDEO"
                ? (post.thumbnail_url ?? post.media_url)
                : post.media_url;
              const src = `/api/instagram-img?url=${encodeURIComponent(rawSrc)}`;
              return (
                <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer"
                  className="group block relative rounded-xl overflow-hidden border border-border/30 hover:border-primary/40 transition-colors duration-300"
                  style={{ paddingBottom: "125%" }}>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={post.caption?.slice(0, 60) ?? "Instagram post"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={e  => (e.currentTarget.style.transform = "scale(1)")}
                  />

                  {post.media_type === "VIDEO" && (
                    <div style={{ position:"absolute", top:8, right:8,
                      width:24, height:24, borderRadius:"50%",
                      background:"rgba(0,0,0,0.6)",
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Play size={12} color="white" fill="white" />
                    </div>
                  )}

                  {/* Caption on hover */}
                  <div style={{
                    position:"absolute", inset:0,
                    background:"rgba(0,0,0,0)",
                    transition:"background 0.3s",
                    display:"flex", alignItems:"flex-end", padding:12,
                  }}
                    className="group-hover:bg-black/50">
                    <p style={{
                      color:"white", fontSize:10, lineHeight:1.4,
                      opacity:0, transition:"opacity 0.3s",
                      display:"-webkit-box", WebkitLineClamp:3,
                      WebkitBoxOrient:"vertical", overflow:"hidden",
                    }}
                      className="group-hover:opacity-100">
                      {post.caption?.slice(0, 100)}{(post.caption?.length ?? 0) > 100 ? "…" : ""}
                    </p>
                  </div>
                </a>
              );
            })
        }
      </div>
    </section>
  );
}
