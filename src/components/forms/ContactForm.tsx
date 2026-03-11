'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { FormDisclaimer } from '@/components/legal/FormDisclaimer';
import { trackLeadSubmitted } from '@/lib/analytics/events';
import { FORM_SUCCESS_MESSAGE } from '@/lib/site';

const SERVICE_OPTIONS = [
  { value: 'medicare-plans', label: 'Medicare Plans' },
  { value: 'health-insurance', label: 'Health Insurance' },
  { value: 'life-insurance', label: 'Life Insurance' },
  { value: 'annuities', label: 'Annuities' },
  { value: 'estate-planning', label: 'Estate Planning' },
  { value: 'general', label: 'General Inquiry' },
];

interface FormFields {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  prefillService?: string;
  source?: string;
}

export function ContactForm({
  prefillService = '',
  source = 'contact_page',
}: ContactFormProps): React.ReactElement {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
    service_interest: prefillService,
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!fields.name.trim() || fields.name.trim().length < 2) {
      next.name = 'Please enter your name.';
    }
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!fields.message.trim() || fields.message.trim().length < 10) {
      next.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setServerError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          source,
          page_url: window.location.href,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setServerError(data.error ?? 'Something went wrong. Please call us directly.');
        setStatus('error');
        return;
      }

      trackLeadSubmitted({
        source,
        page_url: window.location.href,
        service_interest: fields.service_interest || undefined,
      });
      setStatus('success');
    } catch {
      setServerError('Something went wrong. Please call us directly.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[var(--success-light)] border border-success p-6 text-center">
        <p className="font-semibold text-success text-base">{FORM_SUCCESS_MESSAGE}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Full Name"
        name="name"
        required
        value={fields.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        required
        value={fields.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="Optional"
        value={fields.phone}
        onChange={handleChange}
      />
      <Select
        label="Service Interest"
        name="service_interest"
        options={SERVICE_OPTIONS}
        value={fields.service_interest}
        onChange={handleChange}
      />
      <Textarea
        label="Message"
        name="message"
        required
        rows={4}
        placeholder="Tell us how we can help..."
        value={fields.message}
        onChange={handleChange}
        error={errors.message}
      />
      {serverError && (
        <p className="text-sm text-[var(--error)] font-medium">{serverError}</p>
      )}
      <FormDisclaimer />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
