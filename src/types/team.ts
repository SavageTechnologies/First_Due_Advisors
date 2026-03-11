/**
 * TeamMember — static type only.
 * No DB table. Data lives in lib/data/team.ts.
 */
export interface TeamMember {
  name: string;
  title: string;
  credential: string;
  bio: string;
  photo_url: string | null;
  license_states: string[];
  sort_order: number;
}
