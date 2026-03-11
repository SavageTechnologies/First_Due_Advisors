export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  service_interest: string | null;
  message: string | null;
  source: string | null;
  page_url: string | null;
  tcpa_consent: boolean;
  tcpa_version: string;
  status: LeadStatus;
  notes: string | null;
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at'>;
