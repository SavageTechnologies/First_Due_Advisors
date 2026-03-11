import type { Faq } from '@/types/faq';

export interface WhySectionItem {
  icon_label: string;
  heading: string;
  body: string;
}

export interface WhySection {
  heading: string;
  items: WhySectionItem[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  excerpt: string | null;
  body_intro: string | null;
  body_detail: string | null;
  why_section: WhySection | null;
  faqs: Faq[] | null;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  is_published: boolean;
  sort_order: number;
  updated_at: string;
}

export type ServiceInsert = Omit<Service, 'id' | 'updated_at'>;
