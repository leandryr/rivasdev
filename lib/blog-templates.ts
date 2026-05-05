export interface PostTemplate {
  slug:        string;
  title:       string;
  description: string;
  category:    string;
  tags:        string[];
  readTime:    string;
  lang:        "en" | "es";
  content:     string;
}

export const TEMPLATES: PostTemplate[] = [
  // ── English posts ──────────────────────────────────────────────────────────
  {
    slug: "what-is-horizontal-scaling",
    title: "What Is Horizontal Scaling and Why Your Business Needs It",
    description: "A plain-English explanation of horizontal scaling, load balancing, and why the architecture you choose today determines whether your product survives success.",
    category: "Architecture", tags: ["Scaling","Cloud","Infrastructure"], readTime: "5 min", lang: "en",
    content: `<h2>The problem with vertical scaling</h2>
<p>Most early-stage applications are built on a single server. It's cheaper, simpler, and fast to get started. The problem appears when traffic grows: you upgrade the server (vertical scaling), then upgrade again, until you hit a ceiling — or a bill you can't pay.</p>
<h2>What is horizontal scaling?</h2>
<p>Horizontal scaling means adding more servers instead of making one server bigger. Behind a <strong>load balancer</strong>, your application runs on 2, 5, or 50 identical servers. Traffic is distributed automatically. If one server crashes, the others pick up the slack.</p>
<h2>The key benefits</h2>
<ul><li><strong>No ceiling:</strong> Add capacity as fast as demand grows.</li><li><strong>High availability:</strong> One failure doesn't take your product down.</li><li><strong>Cost efficiency:</strong> Scale down during low traffic, scale up during launches.</li></ul>
<h2>What it requires in your codebase</h2>
<p>Horizontal scaling requires stateless applications — no session data stored on the server itself. Use Redis for sessions, S3 for files, and a managed database like PostgreSQL. At Rivas Technologies, every system we build is architected for horizontal scale from day one.</p>
<h2>The bottom line</h2>
<p>If your product is successful, traffic will spike. The question is whether your architecture handles it gracefully or crashes under pressure. We build for the second scenario before it becomes the first.</p>`,
  },
  {
    slug: "nextjs-app-router-explained",
    title: "Next.js App Router Explained for Non-Technical Founders",
    description: "Why the App Router matters for your business, what server components actually do, and how it changes the way we build fast, SEO-friendly products.",
    category: "Web Development", tags: ["Next.js","React","SEO"], readTime: "6 min", lang: "en",
    content: `<h2>The old way vs. the new way</h2>
<p>For years, web applications made a hard choice: either render everything on the server (slow for interactions) or render everything on the client (bad for SEO). Next.js App Router changes this equation entirely.</p>
<h2>Server Components: the game changer</h2>
<p>Server Components render on the server and ship zero JavaScript to the browser. That means faster load times, better SEO, and less bandwidth — without sacrificing dynamic behavior for parts that need it.</p>
<h2>What this means for your product</h2>
<p><strong>SEO:</strong> Google can crawl and index your content immediately — no JavaScript required to see it. <strong>Speed:</strong> Users see content faster because the HTML is pre-rendered. <strong>Cost:</strong> Less JavaScript = smaller bundles = faster CDN delivery.</p>
<h2>When do we use Client Components?</h2>
<p>Anything that requires interactivity — forms, dropdowns, animations, real-time updates — stays as a Client Component. The rest is server-rendered. This hybrid model is the best of both worlds.</p>
<h2>Why we build exclusively with App Router</h2>
<p>Every product we ship at Rivas Technologies uses the Next.js App Router. It's not a trend preference — it's the technically superior choice for SEO performance, developer productivity, and long-term maintainability.</p>`,
  },
  {
    slug: "api-security-fundamentals",
    title: "API Security: The Fundamentals Every Developer Must Know",
    description: "Authentication, rate limiting, input validation and the OWASP API top 10 — from a digital forensics specialist turned full-stack engineer.",
    category: "Security", tags: ["Security","API","OWASP"], readTime: "8 min", lang: "en",
    content: `<h2>Why APIs are the new attack surface</h2>
<p>In 2026, most breaches don't target the frontend — they target exposed APIs. An API endpoint with poor authentication is a direct line to your database, your users' data, and your business logic.</p>
<h2>Authentication first</h2>
<p>Every API endpoint should require authentication unless it's explicitly public. Use JWT with short expiration (15 minutes), refresh tokens stored in httpOnly cookies, and never expose sensitive operations without re-authentication.</p>
<h2>Rate limiting is not optional</h2>
<p>Without rate limiting, any endpoint can be abused. Brute-force attacks on login, enumeration attacks on IDs, and DDoS through compute-intensive operations all require rate limiting to mitigate.</p>
<h2>Validate everything at the boundary</h2>
<p>Never trust input. Validate types, lengths, formats, and allowed values for every parameter — on the server, not just the client. SQL injection, XSS, and command injection all exploit missing validation.</p>
<h2>The OWASP API Top 10 you need to know</h2>
<ul><li>Broken Object Level Authorization (BOLA)</li><li>Broken Authentication</li><li>Excessive Data Exposure</li><li>Lack of Resources & Rate Limiting</li><li>Security Misconfiguration</li></ul>
<h2>From forensics to engineering</h2>
<p>Having investigated cybercrime cases as a detective, I've seen what API vulnerabilities lead to in the real world. We apply that investigative lens to every system we audit and build at Rivas Technologies.</p>`,
  },
  {
    slug: "docker-kubernetes-for-business",
    title: "Docker & Kubernetes: What They Are and Why They Matter for Your Business",
    description: "No technical jargon. A clear explanation of containerization, why it eliminates 'works on my machine' problems, and how it affects your hosting costs.",
    category: "Infrastructure", tags: ["Docker","Kubernetes","DevOps"], readTime: "6 min", lang: "en",
    content: `<h2>The problem containers solve</h2>
<p>Developers write code that works on their laptop. Then it breaks in production. This "works on my machine" problem costs businesses millions in debugging time and delayed launches. Containers solve it permanently.</p>
<h2>What is Docker?</h2>
<p>Docker packages your application with everything it needs to run — code, runtime, libraries, configuration — into a single unit called a container. That container runs identically on any machine, any cloud provider, any environment.</p>
<h2>What is Kubernetes?</h2>
<p>Kubernetes (K8s) is the system that manages many Docker containers at scale. It handles: automatic restart of failed containers, scaling up or down based on traffic, rolling deployments with zero downtime, and load balancing between instances.</p>
<h2>What this means for your business</h2>
<ul><li><strong>Reliability:</strong> Automatic failover means your product stays up even when individual servers fail.</li><li><strong>Cost control:</strong> Scale to zero at night, scale up during business hours.</li><li><strong>Deployments without downtime:</strong> Update your product while users are actively using it.</li></ul>
<h2>Do you need Kubernetes today?</h2>
<p>Probably not at the start. We recommend Docker for all projects from day one, and introduce Kubernetes when traffic or complexity justifies it. The key is building your application to be container-ready so the transition is seamless when you need it.</p>`,
  },
  {
    slug: "postgresql-vs-mongodb-when-to-choose",
    title: "PostgreSQL vs MongoDB: How to Choose the Right Database",
    description: "The relational vs. document debate settled with real-world examples. Which one fits your product, and what the migration cost is if you choose wrong.",
    category: "Engineering", tags: ["PostgreSQL","MongoDB","Database"], readTime: "7 min", lang: "en",
    content: `<h2>The wrong question most founders ask</h2>
<p>Most teams choose a database based on what they know, what's trendy, or what the tutorial used. The right question is: what does my data actually look like, and how will I query it?</p>
<h2>When to use PostgreSQL</h2>
<p>PostgreSQL excels when your data has clear relationships — users have orders, orders have products, products have categories. ACID compliance ensures data consistency. Complex queries with JOINs are performant. It's the right choice for: e-commerce, SaaS platforms, financial systems, and any application where data integrity is critical.</p>
<h2>When to use MongoDB</h2>
<p>MongoDB handles unstructured or highly variable data well — content that changes shape, JSON-heavy APIs, rapidly iterating schemas. It's ideal for: content management, real-time analytics, catalog systems where fields vary widely per record.</p>
<h2>The migration cost of getting it wrong</h2>
<p>We've inherited systems that chose MongoDB for relational data and spent months migrating to PostgreSQL. The cost is real: schema redesign, data migration scripts, application layer rewrites, and regression testing. Choose based on your actual data model, not on enthusiasm.</p>
<h2>Our recommendation</h2>
<p>Default to PostgreSQL. It handles most use cases well and its query capabilities grow with your needs. Add MongoDB or Redis for specific use cases — never as your primary database without clear justification.</p>`,
  },

  // ── Spanish posts ──────────────────────────────────────────────────────────
  {
    slug: "que-es-una-api-y-por-que-tu-negocio-la-necesita",
    title: "¿Qué es una API y por qué tu negocio la necesita?",
    description: "Explicación sin tecnicismos de qué hace una API, por qué conectan tus herramientas digitales y cómo una API bien diseñada puede automatizar tu operación entera.",
    category: "Automatización", tags: ["API","Integración","Negocios"], readTime: "5 min", lang: "es",
    content: `<h2>La metáfora que lo explica todo</h2>
<p>Imagina que tienes un restaurante. La API es el mesero: recibe pedidos de los clientes (otras aplicaciones), los lleva a la cocina (tu sistema), y regresa con la respuesta. Sin el mesero, la cocina y el cliente no pueden comunicarse.</p>
<h2>¿Qué hace una API en la práctica?</h2>
<p>Cuando pagas con tu tarjeta en línea, una API conecta tu banco con la tienda. Cuando un cliente llena un formulario y recibe un correo automático, una API está en el medio. Cuando tu CRM se actualiza solo cuando alguien agenda una cita, es una API haciendo el trabajo.</p>
<h2>Por qué tu negocio necesita APIs</h2>
<ul><li><strong>Automatización:</strong> Elimina el trabajo manual entre sistemas que no se comunican.</li><li><strong>Escalabilidad:</strong> Una API bien diseñada puede manejar 1 o 1,000,000 de solicitudes sin cambiar el código.</li><li><strong>Integraciones:</strong> Conecta tu tienda, tu CRM, tu sistema de pagos y tu contabilidad en un solo flujo.</li></ul>
<h2>El costo de no tenerlas</h2>
<p>Negocios sin APIs sufren procesos manuales, datos duplicados, errores humanos y equipos que pierden horas en tareas que debería hacer software. Es el problema más costoso que nadie ve — hasta que lo calculamos: suele ser 15-30 horas semanales por persona.</p>
<h2>¿Cómo empezamos?</h2>
<p>En Rivas Technologies hacemos un mapeo de tus flujos actuales, identificamos qué se puede automatizar con APIs, y lo construimos. El ROI típico: recuperas la inversión en los primeros 90 días.</p>`,
  },
  {
    slug: "por-que-tu-web-tarda-en-cargar",
    title: "Por qué tu web tarda en cargar (y cómo arreglarlo hoy)",
    description: "Las causas técnicas detrás de los sitios web lentos explicadas para emprendedores. Cada segundo extra te cuesta el 7% de tus conversiones.",
    category: "Rendimiento", tags: ["Performance","SEO","Velocidad"], readTime: "6 min", lang: "es",
    content: `<h2>El número que debes conocer</h2>
<p>Cada segundo adicional que tarda tu web en cargar reduce tus conversiones un <strong>7%</strong>. Si tu sitio tarda 5 segundos y el de tu competidor tarda 1 segundo, ellos están convirtiendo un 28% más de la audiencia que comparten contigo. Cada día.</p>
<h2>Las causas más comunes</h2>
<h3>1. Imágenes sin optimizar</h3>
<p>Una foto de tu iPhone de 8MB enviada directamente al navegador. Es el error más común y el más fácil de solucionar: convierte a WebP, redimensiona al tamaño máximo que se muestra, y comprime. Impacto inmediato: 60-80% de reducción en tiempo de carga.</p>
<h3>2. Hosting compartido</h3>
<p>El hosting de $3/mes comparte un servidor entre cientos de sitios. Cuando otro sitio en ese servidor tiene tráfico pico, el tuyo sufre. La solución: Vercel, Railway, o un VPS dedicado.</p>
<h3>3. WordPress con 40 plugins</h3>
<p>Cada plugin agrega JavaScript y CSS que el navegador debe descargar y procesar. 40 plugins = 40 razones para que tu web sea lenta. La solución real a menudo es migrar a una arquitectura moderna.</p>
<h3>4. Sin CDN</h3>
<p>Si tu servidor está en Nueva York y tu cliente está en Buenos Aires, cada recurso viaja 8,000 km. Un CDN sirve el contenido desde el servidor más cercano al usuario.</p>
<h2>¿Cómo medir tu situación actual?</h2>
<p>Ve ahora a <strong>pagespeed.web.dev</strong>, pega tu URL, y mira tu puntaje. Menos de 70 en móvil es urgente. Menos de 50 es crítico. Contáctanos y hacemos la auditoría completa sin costo.</p>`,
  },
  {
    slug: "automatiza-tu-crm-guia-practica",
    title: "Automatiza tu CRM: guía práctica para emprendedores",
    description: "Cómo conectar tu CRM con tus formularios, correos, WhatsApp y reportes para eliminar el trabajo manual y no perder ningún lead.",
    category: "Automatización", tags: ["CRM","Automatización","Ventas"], readTime: "7 min", lang: "es",
    content: `<h2>El problema del CRM manual</h2>
<p>Un lead llega por WhatsApp. Lo agregas manualmente al CRM. Olvidas marcarlo como contactado. La semana siguiente no recuerdas en qué etapa está. Pierdes el negocio. Esto ocurre decenas de veces por mes en la mayoría de los negocios pequeños.</p>
<h2>Lo que puede automatizarse</h2>
<ul><li><strong>Captura de leads:</strong> Formulario de tu web → CRM automáticamente.</li><li><strong>Seguimiento:</strong> Si no hay actividad en 3 días → correo automático o tarea asignada.</li><li><strong>Pipeline:</strong> Cuando cambia el estado de un deal → notificación al responsable.</li><li><strong>Reportes:</strong> Cada lunes a las 8am → resumen de leads de la semana anterior en tu correo.</li></ul>
<h2>Las integraciones más valiosas</h2>
<p><strong>Formularios → CRM:</strong> Todo lead que llena un formulario en tu web aparece instantáneamente en tu CRM con todos sus datos. Cero trabajo manual.</p>
<p><strong>CRM → WhatsApp/Email:</strong> Secuencias de follow-up automáticas. El lead recibe un mensaje 1 hora después de registrarse, otro al día 3, otro al día 7.</p>
<p><strong>Pagos → CRM:</strong> Cuando un cliente paga, su estado cambia automáticamente a "cliente activo" y se activa el onboarding.</p>
<h2>El ROI real</h2>
<p>Un cliente nuestro recuperó 22 horas semanales de trabajo manual después de automatizar su CRM. A $25/hora, eso es $2,200/mes en productividad recuperada — por un proyecto de automatización que costó $4,000. Recuperó la inversión en 2 meses.</p>`,
  },
  {
    slug: "ia-para-emprendedores-casos-reales",
    title: "IA para emprendedores: casos de uso reales (sin exageración)",
    description: "No el hype. Los casos de uso de Inteligencia Artificial que realmente funcionan para negocios pequeños y medianos hoy, con resultados medibles.",
    category: "IA & Automatización", tags: ["IA","Automatización","Negocios"], readTime: "8 min", lang: "es",
    content: `<h2>El problema con cómo se habla de IA</h2>
<p>El 90% del contenido sobre IA habla de lo que <em>podría pasar</em> en el futuro. Nosotros trabajamos con lo que funciona hoy, para negocios reales, con resultados medibles.</p>
<h2>Caso 1: Atención al cliente automatizada</h2>
<p>Un e-commerce con 200+ preguntas diarias repetidas implementó un chatbot con IA entrenado en sus preguntas frecuentes. Resultado: 73% de consultas resueltas sin intervención humana. El equipo de soporte se enfocó en casos complejos. Tiempo de respuesta promedio: de 4 horas a 30 segundos.</p>
<h2>Caso 2: Generación de descripciones de productos</h2>
<p>Una tienda de ropa con 800 productos sin descripciones. IA + plantillas de marca = 800 descripciones únicas, optimizadas para SEO, en 2 horas. Costo: $40 en API. Costo alternativo de hacerlo manualmente: $3,200.</p>
<h2>Caso 3: Clasificación de leads</h2>
<p>Un estudio contable recibía 50 consultas semanales de calidad muy variable. Implementamos clasificación automática por IA: alto/medio/bajo potencial basado en el mensaje inicial. El equipo de ventas ahora atiende primero los leads de alto potencial. Conversión aumentó 34%.</p>
<h2>Lo que la IA NO puede hacer (todavía)</h2>
<p>Tomar decisiones estratégicas. Manejar situaciones completamente nuevas. Construir relaciones humanas. Reemplazar el juicio experto en contextos complejos. La IA amplifica capacidades humanas — no las reemplaza.</p>
<h2>¿Por dónde empezar?</h2>
<p>Identifica la tarea más repetitiva de tu operación. Si requiere procesar texto, clasificar, responder preguntas frecuentes o generar contenido estructurado — hay una solución de IA para eso hoy.</p>`,
  },
  {
    slug: "seguridad-web-checklist-2026",
    title: "Seguridad web: el checklist que todo fundador debe revisar en 2026",
    description: "Las vulnerabilidades más comunes en aplicaciones web y cómo cerrarlas. Basado en experiencia forense real como exdetective de informática criminal.",
    category: "Seguridad", tags: ["Seguridad","OWASP","Web"], readTime: "9 min", lang: "es",
    content: `<h2>Por qué la seguridad importa desde el día 1</h2>
<p>En mi tiempo como Detective Agregado de Informática Forense en la CICPC, investigué docenas de casos donde sistemas vulnerables costaron a empresas desde datos de clientes hasta su operación completa. El patrón era siempre el mismo: la seguridad fue una idea para después.</p>
<h2>Las 5 vulnerabilidades que encontramos en casi todo cliente</h2>
<h3>1. Contraseñas débiles sin 2FA</h3>
<p>El 80% de los accesos no autorizados ocurren por credenciales comprometidas. Implementa autenticación de dos factores en todos los sistemas críticos. Sin excepción.</p>
<h3>2. Formularios sin validación server-side</h3>
<p>Validar solo en el cliente (JavaScript) no protege nada — cualquiera puede omitir esa validación. Todo input debe validarse en el servidor antes de procesarse.</p>
<h3>3. APIs sin autenticación o con autenticación débil</h3>
<p>APIs expuestas sin tokens de autenticación robustos son puertas abiertas. Usa JWT con expiración corta, refresh tokens seguros, y rate limiting en todos los endpoints.</p>
<h3>4. Dependencias desactualizadas</h3>
<p>Cada librería desactualizada es una vulnerabilidad conocida esperando ser explotada. Automatiza la revisión de dependencias con herramientas como Dependabot.</p>
<h3>5. Sin logs de auditoría</h3>
<p>Sin logs, un incidente de seguridad es imposible de investigar. Registra: quién accedió, qué hizo, desde dónde, y cuándo. Es tu evidencia si algo ocurre.</p>
<h2>Cómo hacer una auditoría básica hoy</h2>
<p>Usa OWASP ZAP (gratuito) para hacer un scan básico de tu aplicación. Te dará una lista de vulnerabilidades ordenadas por severidad. Contáctanos para una auditoría completa con plan de remediación.</p>`,
  },
];

export function getNextTemplate(existingSlugs: string[]): PostTemplate | null {
  const available = TEMPLATES.filter(t => !existingSlugs.includes(t.slug));
  if (available.length === 0) return null;
  // Alternate EN/ES and vary categories
  return available[Math.floor(Math.random() * Math.min(available.length, 5))];
}
