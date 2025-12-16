import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'events' | 'entertainment' | 'media' | 'gifting' | 'beauty';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum EventType {
  WEDDING = 'Wedding',
  CORPORATE = 'Corporate',
  BIRTHDAY = 'Birthday',
  CONCERT = 'Concert'
}

export interface BudgetData {
  name: string;
  value: number;
}

export interface SavedEvent {
  id: string;
  name: string;
  eventType: EventType;
  budget: number;
  createdAt: string;
  status: 'Draft' | 'Booked';
}

export interface BookingSubmission {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  event_date: string;
  venue_name: string;
  venue_address: string;
  guest_count: number;
  event_type: string;
  amount_paid: number;
  booking_id: string;
}

// Search & Content Types
export type SearchCategory = 'Service' | 'Insight';

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  image: string;
  link?: string;
  icon?: React.ReactNode; // For services that have icons
  date?: string; // For blogs
  readTime?: string; // For blogs
}