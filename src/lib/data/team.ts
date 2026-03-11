import type { TeamMember } from '@/types/team';
import {
  AUTHOR_NAME,
  AUTHOR_TITLE,
  AUTHOR_CREDENTIAL,
  AUTHOR_BIO,
  LICENSED_STATES,
} from '@/lib/site';

export const teamMembers: TeamMember[] = [
  {
    name: AUTHOR_NAME,
    title: AUTHOR_TITLE,
    credential: AUTHOR_CREDENTIAL,
    bio: AUTHOR_BIO,
    photo_url: '/images/brandon-grimes.jpg',
    license_states: LICENSED_STATES.split(',').map((s) => s.trim()),
    sort_order: 1,
  },
];
