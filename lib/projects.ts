export interface Project {
  id: string;
  title: string;
  type: string;
  year: string;
  role: string;
  tech: string[];
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string[];
  liveUrl: string;
  githubUrl: string;
  contactUrl: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Auth & Identity Platform",
    type: "SaaS Product",
    year: "2025",
    role: "Full-Stack Engineer",
    tech: ["React", "Node.js", "JWT", "Redis", "Docker"],
    image: "/projects/log.png",
    summary: "Production-grade authentication system with multi-factor auth, SSO integration, and enterprise-level session management.",
    challenge: "Legacy auth system had critical security gaps and couldn't scale beyond 10k concurrent users.",
    solution: "Architected a stateless JWT-based auth layer backed by Redis for session caching, with TOTP-based MFA and OAuth 2.0 SSO support.",
    impact: ["Zero security incidents post-launch", "Scales to 500k+ concurrent sessions", "SOC 2 audit ready"],
    liveUrl: "https://my.klamapp.com",
    githubUrl: "#",
    contactUrl: "mailto:contact@rivastechnologies.com",
    color: "from-violet-500/30",
  },
];
