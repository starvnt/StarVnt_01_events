
import React from 'react';
import { Camera, Music, Gift, Sparkles, Gem, BookOpen } from 'lucide-react';
import { SearchableItem } from '../types';

export const SERVICES: SearchableItem[] = [
  {
    id: 'svc-1',
    title: "Cinematic Weddings",
    description: "From Haldi to Reception, we treat your wedding like a Bollywood production. Complete with drone cinematography and live direction.",
    category: 'Service',
    image: "https://picsum.photos/seed/wedding123/600/400",
    icon: <Sparkles className="w-8 h-8 text-gold-500" />
  },
  {
    id: 'svc-2',
    title: "Corporate MICE",
    description: "Award nights, conferences, and launches executed with military precision. Tech-first engagement for global delegates.",
    category: 'Service',
    image: "https://picsum.photos/seed/corp55/600/400",
    icon: <Gem className="w-8 h-8 text-gold-500" />
  },
  {
    id: 'svc-3',
    title: "Moniqui Heritage",
    description: "Luxury Shantiniketan leather bags and premium gifting solutions for VIPs and wedding return gifts.",
    category: 'Service',
    image: "https://picsum.photos/seed/leather/600/400",
    icon: <Gift className="w-8 h-8 text-gold-500" />
  },
  {
    id: 'svc-4',
    title: "FTAura Style",
    description: "Complete styling, grooming, and fashion consultation for the stars of the event. Lookbooks curated by AI.",
    category: 'Service',
    image: "https://picsum.photos/seed/fashion/600/400",
    icon: <Camera className="w-8 h-8 text-gold-500" />
  },
  {
    id: 'svc-5',
    title: "StarVnt Music",
    description: "Book top DJs, Bands, and Celebrity performers instantly. From EDM nights to Classical soirees.",
    category: 'Service',
    image: "https://picsum.photos/seed/dj/600/400",
    icon: <Music className="w-8 h-8 text-gold-500" />
  }
];

export const BLOG_POSTS: SearchableItem[] = [
  {
    id: 'blog-1',
    title: "Top 10 Royal Wedding Venues in Kolkata (2026 Edition)",
    description: "Discover the hidden heritage palaces and modern luxury banquets that define the new era of Bengali weddings.",
    category: 'Insight',
    image: "https://picsum.photos/seed/kolkata/600/400",
    date: "Oct 12, 2025",
    readTime: "5 min read"
  },
  {
    id: 'blog-2',
    title: "Why AI is the Future of Event Budgeting",
    description: "How StarVnt's Aura+ algorithm saves you 20% on unnecessary costs while maximizing production value.",
    category: 'Insight',
    image: "https://picsum.photos/seed/tech/600/400",
    date: "Nov 01, 2025",
    readTime: "3 min read"
  },
  {
    id: 'blog-3',
    title: "Sustainable Luxury: The Moniqui Story",
    description: "Reviving Shantiniketan leather craft for the global luxury market. A story of heritage and ethical fashion.",
    category: 'Insight',
    image: "https://picsum.photos/seed/craft/600/400",
    date: "Sep 15, 2025",
    readTime: "6 min read"
  },
  {
    id: 'blog-4',
    title: "The Rise of 'Cinematic' Corporate Events",
    description: "Moving away from boring PowerPoint presentations to immersive, story-driven corporate experiences.",
    category: 'Insight',
    image: "https://picsum.photos/seed/mic/600/400",
    date: "Dec 10, 2025",
    readTime: "4 min read"
  }
];

export const ALL_CONTENT = [...SERVICES, ...BLOG_POSTS];
