export interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  service_slug: string | null;
  body: string;
  rating: number;
  is_published: boolean;
  sort_order: number;
}

export type TestimonialInsert = Omit<Testimonial, 'id'>;
