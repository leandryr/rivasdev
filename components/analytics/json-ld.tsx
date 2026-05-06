export function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://rivastechnologies.com/#organization",
    name: "Rivas Technologies LLC",
    legalName: "Rivas Technologies LLC",
    url: "https://rivastechnologies.com",
    logo: "https://rivastechnologies.com/logos/logo.png",
    foundingDate: "2021",
    founders: [{
      "@type": "Person",
      name: "Leandry R Rivas P",
      jobTitle: "Founder & CEO",
      email: "leandry@rivastechnologies.com",
      url: "https://rivastechnologies.com/about",
    }],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gainesville",
      addressRegion: "GA",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-404-839-4292",
      contactType: "customer service",
      email: "contact@rivastechnologies.com",
      availableLanguage: ["English", "Spanish"],
    },
    sameAs: [
      "https://www.instagram.com/rivastechnologies",
      "https://www.linkedin.com/company/rivas-technologies-llc/",
      "https://x.com/leandryrp",
      "https://www.facebook.com/profile.php?id=61575844187685",
      "https://www.tiktok.com/@rivastechnologies",
    ],
    description:
      "Enterprise software engineering partner for entrepreneurs and growing businesses. Web apps, automation, AI, security & cloud infrastructure.",
    areaServed: ["United States", "Latin America"],
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "Business Automation",
      "Cloud Infrastructure",
      "Security Auditing",
      "AI Integration",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://rivastechnologies.com/#website",
    url: "https://rivastechnologies.com",
    name: "Rivas Technologies LLC",
    description: "Enterprise software engineering for entrepreneurs",
    publisher: { "@id": "https://rivastechnologies.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://rivastechnologies.com/?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SoftwareApplication"],
    "@id": "https://rivastechnologies.com/#localbusiness",
    name: "Rivas Technologies LLC",
    image: "https://rivastechnologies.com/logos/logo.png",
    url: "https://rivastechnologies.com",
    telephone: "+1-404-839-4292",
    email: "contact@rivastechnologies.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gainesville",
      addressLocality: "Gainesville",
      addressRegion: "GA",
      postalCode: "30501",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 34.2979, longitude: -83.8241 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Bank Transfer",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "2",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rivas Technologies LLC",
    url: "https://rivastechnologies.com",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development", description: "Full-stack web applications with React, Next.js and Laravel" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Automation", description: "CRM, billing and workflow automations" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Development", description: "iOS and Android apps with React Native" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Auditing", description: "Forensic-grade security reviews and hardening" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Infrastructure", description: "AWS, GCP, Kubernetes, Docker deployments" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration", description: "Custom AI workflows and integrations for business" } },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }} />
    </>
  );
}
