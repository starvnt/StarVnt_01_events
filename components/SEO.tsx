
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
  jsonLd
}) => {
  
  useEffect(() => {
    // 1. Update Title
    document.title = title;

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

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    
    // Open Graph / Social
    setOgMeta('og:title', title);
    setOgMeta('og:description', description);
    setOgMeta('og:image', image);
    setOgMeta('og:url', canonical);
    setOgMeta('og:type', type);
    setOgMeta('og:locale', 'en_IN');
    setOgMeta('og:site_name', 'StarVnt Entertainment');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    // 3. SUPER SEO SCHEMA GENERATION
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
            "description": "India’s #1 AI-Powered Event Production Ecosystem.",
            "foundingDate": "2026-01-01",
            "founders": [
                { "@type": "Person", "name": "StarVnt Founder" }
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
            "name": "StarVnt Entertainment",
            "image": image,
            "priceRange": "₹₹₹",
            "telephone": "+91-9000000000",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kolkata",
                "addressRegion": "WB",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 22.5726,
                "longitude": 88.3639
            },
            "areaServed": ["Kolkata", "Mumbai", "Delhi", "Bangalore", "Dubai"],
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
            }
        };
    } else if (schemaType === 'Service') {
        schemaData = {
            ...schemaData,
            "@type": "Service",
            "serviceType": "Event Planning",
            "provider": {
                "@type": "LocalBusiness",
                "name": "StarVnt Entertainment"
            },
            "areaServed": {
                "@type": "Country",
                "name": "India"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Event Services",
                "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding Planning" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Events" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Aura+ AI Planning" } }
                ]
            }
        };
    }

    // Merge custom JSON-LD if provided
    if (jsonLd) {
        schemaData = { ...schemaData, ...jsonLd };
    }

    // Inject Script
    let script = document.querySelector('#starvnt-schema');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('id', 'starvnt-schema');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

  }, [title, description, keywords, canonical, image, type, location, schemaType, jsonLd]);

  return null;
};
