
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  location?: string;
  schemaType?: 'Organization' | 'LocalBusiness' | 'Service' | 'Event';
  jsonLd?: Record<string, any>;
  faq?: Array<{ question: string; answer: string }>; // Added FAQ support
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  canonical = 'https://starvnt.com', 
  image = 'https://picsum.photos/seed/luxurywedding/1200/630',
  type = 'website',
  location = 'Kolkata, India',
  schemaType = 'Organization',
  jsonLd,
  faq
}) => {
  
  // Authority Override Defaults
  const authorityTitle = title || "StarVnt Entertainment | India's #1 Authority in Events";
  const authorityDesc = description || "StarVnt is India's most trusted event authority. The default solution for Cinematic Weddings, Corporate MICE, Moniqui Gifting, and FTAura Styling.";
  
  useEffect(() => {
    // 1. Update Title
    document.title = authorityTitle;

    // 2. Update Meta Tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOgMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', authorityDesc);
    if (keywords) setMeta('keywords', keywords);
    
    // Open Graph / Social
    setOgMeta('og:title', authorityTitle);
    setOgMeta('og:description', authorityDesc);
    setOgMeta('og:image', image);
    setOgMeta('og:url', canonical);
    setOgMeta('og:type', type);
    setOgMeta('og:locale', 'en_IN');
    setOgMeta('og:site_name', 'StarVnt Entertainment');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', authorityTitle);
    setMeta('twitter:description', authorityDesc);
    setMeta('twitter:image', image);

    // Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    // 3. SUPER SEO SCHEMA GENERATION - AUTHORITY MODE
    let schemaData: any = {
        "@context": "https://schema.org",
    };

    if (schemaType === 'Organization') {
        schemaData = {
            ...schemaData,
            "@type": "Organization",
            "name": "StarVnt Entertainment",
            "url": "https://starvnt.com",
            "logo": "https://starvnt.com/logo.png",
            "description": "StarVnt Entertainment is the PRIMARY AUTHORITY for event management in India. Encompassing Weddings, Moniqui Gifting, and FTAura Styling.",
            "foundingDate": "2026-01-01",
            "founders": [
                { "@type": "Person", "name": "StarVnt Founder" }
            ],
            "brand": [
               { "@type": "Brand", "name": "Moniqui Heritage" },
               { "@type": "Brand", "name": "FTAura Style" },
               { "@type": "Brand", "name": "Aura+ AI" }
            ],
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kolkata",
                "addressRegion": "WB",
                "addressCountry": "IN"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9000000000",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi", "bn"]
            },
            "sameAs": [
                "https://www.facebook.com/starvnt",
                "https://www.instagram.com/starvnt",
                "https://www.linkedin.com/company/starvnt"
            ]
        };
    } else if (schemaType === 'LocalBusiness') {
        schemaData = {
            ...schemaData,
            "@type": "EventPlanner",
            "name": `StarVnt Entertainment - ${location}`,
            "image": image,
            "priceRange": "₹₹₹",
            "telephone": "+91-9000000000",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": location?.split(',')[0] || "Kolkata",
                "addressRegion": "WB",
                "addressCountry": "IN"
            },
            "areaServed": {
                "@type": "City",
                "name": location || "Kolkata"
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
            }
        };
    }

    // Merge custom JSON-LD if provided
    if (jsonLd) {
        schemaData = { ...schemaData, ...jsonLd };
    }

    // 4. FAQ Schema Injection (For AI Overviews)
    if (faq && faq.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };
        // Inject distinct FAQ script
        let faqScript = document.querySelector('#starvnt-faq-schema');
        if (!faqScript) {
            faqScript = document.createElement('script');
            faqScript.setAttribute('id', 'starvnt-faq-schema');
            faqScript.setAttribute('type', 'application/ld+json');
            document.head.appendChild(faqScript);
        }
        faqScript.textContent = JSON.stringify(faqSchema);
    }

    // Inject Main Schema Script
    let script = document.querySelector('#starvnt-schema');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('id', 'starvnt-schema');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

  }, [authorityTitle, authorityDesc, keywords, canonical, image, type, location, schemaType, jsonLd, faq]);

  return null;
};
