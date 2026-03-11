# First Due Advisors — Site Transfer & Ownership Guide

Version: 1.0
Last updated: March 2026

This document is written for Brandon Grimes and any future developer who needs to work on this site. Read it before touching anything. Every step is actionable.

---

## Overview

This site is built with modern, professional tools that are standard across the industry. Here is what each one does and why it was chosen:

**Next.js 14** — The framework that powers the site. It handles routing, page rendering, and builds the files that get deployed to Vercel. Think of it as the engine.

**TypeScript** — The programming language used throughout the codebase. It is JavaScript with strict type checking, which means many errors get caught before the site is ever deployed.

**Tailwind CSS** — The styling system. Instead of separate CSS files, styles are written directly in the component code using utility classes. It keeps everything in one place and produces small, fast stylesheets.

**Supabase** — The database. It stores three things: leads submitted through the contact form, service page content, and testimonials. Brandon can view and edit all of this through the Supabase dashboard without touching any code.

**Resend** — The email delivery service. When someone submits the contact form, Resend sends two emails: one to Brandon with the lead details, and one to the visitor confirming their submission.

**Upstash Redis** — Rate limiting. It prevents someone from submitting the contact form hundreds of times in a row. This protects the database and the email inbox.

**Vercel** — The hosting platform. The site lives here. Every time code is pushed to the GitHub repository, Vercel automatically rebuilds and redeploys the site. It also manages the custom domain and SSL certificate.

---

## Accounts You Need

Set these up before you can run or deploy the site. All of them have free tiers that cover this site's usage.

### Supabase
- **What it does:** Stores leads, service content, and testimonials
- **Sign up:** supabase.com
- **Plan needed:** Free tier is sufficient
- **Where to find credentials:**
  - Go to your Supabase project
  - Settings > API
  - Copy: Project URL (`NEXT_PUBLIC_SUPABASE_URL`), anon public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`), and service_role key (`SUPABASE_SERVICE_ROLE_KEY`)
  - Keep the service_role key secret — it has full database access

### Vercel
- **What it does:** Hosts the site and handles deployments
- **Sign up:** vercel.com
- **Plan needed:** Free Hobby tier is sufficient
- **Where to find credentials:** No API keys needed locally — you link it to your GitHub repo through the Vercel dashboard

### Resend
- **What it does:** Sends lead notification and confirmation emails
- **Sign up:** resend.com
- **Plan needed:** Free tier (100 emails/day) is sufficient for most use
- **Where to find credentials:**
  - Resend dashboard > API Keys > Create API Key
  - Copy the key to `RESEND_API_KEY`
  - You must also verify your domain (firstdueadvisors.com) — see the Resend section below

### Upstash Redis
- **What it does:** Rate limits the contact form to prevent spam
- **Sign up:** upstash.com
- **Plan needed:** Free tier is sufficient
- **Where to find credentials:**
  - Upstash Console > Create Database (choose Redis)
  - Click your database > REST API tab
  - Copy: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN

### Google Analytics 4
- **What it does:** Tracks site traffic and visitor behavior
- **Sign up:** analytics.google.com
- **Plan needed:** Free
- **Where to find credentials:**
  - GA4 > Admin > Data Streams > select your web stream
  - Copy the Measurement ID (starts with G-)
  - This goes in `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

## Setting Up a Fresh Environment

Follow these steps in order. Do not skip ahead.

### 1. Clone the repository

```bash
git clone https://github.com/[your-repo-url]/firstdueadvisors.git
cd firstdueadvisors
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in every value. Here is what each variable is and where to find it:

| Variable | What it is | Where to find it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live domain | `https://firstdueadvisors.com` |
| `NEXT_PUBLIC_SUPPORT_PHONE` | Brandon's phone number | Brandon provides |
| `NEXT_PUBLIC_SUPPORT_PHONE_HREF` | Phone in tel: format | `tel:+1XXXXXXXXXX` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Brandon's email | Brandon provides |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | City, State | Brandon provides |
| `NEXT_PUBLIC_LICENSED_STATES` | States where licensed | Brandon provides |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key | Supabase > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key | Supabase > Settings > API |
| `RESEND_API_KEY` | Resend API key | Resend dashboard > API Keys |
| `RESEND_LEAD_NOTIFY_EMAIL` | Where leads get emailed | Brandon's email address |
| `UPSTASH_REDIS_REST_URL` | Upstash database URL | Upstash Console > REST API |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash auth token | Upstash Console > REST API |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | GA4 > Admin > Data Streams |

### 3. Run the Supabase migration

This creates all three database tables and seeds the service content. You only need to do this once per Supabase project.

**Option A — SQL Editor (recommended):**
1. Open your Supabase project
2. Go to SQL Editor in the left sidebar
3. Click New Query
4. Open `docs/supabase-migration.sql` from this repo
5. Paste the entire contents into the editor
6. Click Run

**Option B — Supabase CLI:**
```bash
supabase db push --db-url postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres < docs/supabase-migration.sql
```

After running, go to Supabase > Table Editor and confirm you see three tables: `leads`, `services`, and `testimonials`. The services table should have 5 rows.

### 4. Install dependencies

```bash
npm install
```

### 5. Run locally

```bash
npm run dev
```

Open your browser to `http://localhost:3000`. The site should load with full styling.

### 6. Verify the contact form

Go to `http://localhost:3000/contact`, fill out the form, and submit it. Then:
- Check your Supabase dashboard > Table Editor > leads — you should see a new row
- Check your email inbox at `RESEND_LEAD_NOTIFY_EMAIL` — you should receive a notification
- Check the email address you used in the form — you should receive a confirmation

If any of these fail, double-check the relevant environment variables.

---

## Deploying to Vercel

### 1. Create a new Vercel project

1. Go to vercel.com and sign in
2. Click Add New > Project
3. Import your GitHub repository
4. Leave the framework preset as Next.js
5. Do not deploy yet — add env vars first (next step)

### 2. Add environment variables

In your Vercel project settings:
1. Go to Settings > Environment Variables
2. Add every variable from your `.env.local` file
3. Make sure each variable is set for Production, Preview, and Development environments
4. The `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` should be marked as sensitive

### 3. Deploy

Click Deploy. Vercel will build the site and give you a preview URL ending in `.vercel.app`. Test it before connecting the custom domain.

### 4. Connect the custom domain

1. Vercel project > Settings > Domains
2. Add `firstdueadvisors.com` and `www.firstdueadvisors.com`
3. Vercel will show you DNS records to add at your domain registrar
4. Add those records and wait for propagation (typically under 30 minutes)

### 5. Verify SSL

Once DNS propagates, Vercel provisions an SSL certificate automatically. Visit `https://firstdueadvisors.com` and confirm the padlock is present.

### 6. Test the live contact form

Submit the contact form on the live site and confirm the lead appears in Supabase and emails arrive correctly.

---

## Setting Up Resend

Email delivery will not work until your domain is verified in Resend.

### 1. Add and verify your domain

1. Resend dashboard > Domains > Add Domain
2. Enter `firstdueadvisors.com`
3. Resend will give you DNS records to add at your registrar (typically TXT and MX records)
4. Add those records at your domain registrar
5. Return to Resend and click Verify — this may take a few minutes to propagate

### 2. Set your API key in Vercel

If you have not already done this, add `RESEND_API_KEY` in your Vercel environment variables and redeploy.

### 3. Test

Submit the contact form on the live site. Brandon should receive a notification email, and the submitter should receive a confirmation. If emails are not arriving, go to Resend > Logs to see what happened.

---

## Managing Your Site Content (No Code Required)

Everything content-related is managed through the Supabase dashboard. You do not need a developer for any of this.

### Viewing leads from the contact form

1. Go to supabase.com and open your project
2. Click Table Editor in the left sidebar
3. Click the `leads` table
4. Every form submission appears here with the name, email, phone, service interest, message, and timestamp

### Editing service page content

1. Table Editor > `services` table
2. Click the row for the service you want to edit
3. You can update any of these fields:
   - `title` — the headline of the service page
   - `tagline` — the one-line description under the title
   - `excerpt` — the short summary shown on the homepage service cards
   - `body_intro` — the first body section of the service page
   - `body_detail` — the second body section
   - `why_section` — the three-column "why us" section (JSON — edit carefully)
   - `faqs` — the FAQ accordion (JSON — edit carefully)
   - `meta_title` — what appears in the browser tab and search results
   - `meta_description` — the description shown in Google search results
4. Click Save when done
5. The change will appear on the live site after Vercel's next revalidation (up to 1 hour), or immediately if you trigger a redeployment

### Adding real testimonials

1. Table Editor > `testimonials` table
2. The three placeholder rows have `is_published` set to `false` — they will not appear on the site
3. To add a real testimonial: click Insert > Insert Row and fill in:
   - `name` — the client's first name and last initial (e.g., "Maria T.")
   - `location` — city and state (e.g., "Nashville, TN")
   - `service_slug` — which service this review is about (e.g., `medicare-plans`)
   - `body` — the testimonial text
   - `rating` — 5 (or lower if appropriate)
   - `is_published` — set to `true` to make it visible on the site
   - `sort_order` — controls the display order (lower numbers appear first)

### Toggling testimonials on or off

1. Table Editor > `testimonials`
2. Find the testimonial
3. Click the `is_published` cell and toggle it between true and false
4. Save — the change takes effect on the next page load

### Changing service sort order

1. Table Editor > `services`
2. Update the `sort_order` column for each service
3. Lower numbers appear first on the homepage services grid

---

## Updating Your Phone Number or Email

Brandon's phone number and email address are stored as environment variables in Vercel, not hardcoded in the site. This makes them easy to update without touching the code.

1. Go to your Vercel project
2. Settings > Environment Variables
3. Find the variable you want to update:
   - Phone number: `NEXT_PUBLIC_SUPPORT_PHONE` and `NEXT_PUBLIC_SUPPORT_PHONE_HREF`
   - Email: `NEXT_PUBLIC_SUPPORT_EMAIL`
4. Click the variable, update the value, and save
5. Go to Deployments and click the three-dot menu on the latest deployment > Redeploy
6. The updated information will be live within about 2 minutes

Note: changes to environment variables require a redeployment to take effect. One click in the Vercel dashboard.

---

## Transferring to a New Developer

If you ever hand this site to another developer, give them all of the following:

- **GitHub repository access** — add them as a collaborator in GitHub Settings > Collaborators
- **Vercel environment variables** — go to Vercel > Settings > Environment Variables and share all values securely (use a password manager or secure note, never plain email)
- **Supabase project access** — Supabase > Project Settings > Team > Invite member, or share the project URL and service role key
- **Resend API key** — from Resend dashboard > API Keys
- **Upstash Redis credentials** — from Upstash Console > your database > REST API tab
- **This document** — tell them to read it first before making any changes

---

## Troubleshooting

### Contact form submissions are not arriving

1. Check that `RESEND_API_KEY` is set correctly in Vercel environment variables
2. Go to resend.com > Domains and confirm `firstdueadvisors.com` shows as Verified
3. Go to Resend > Logs — you will see whether emails are being sent and whether they are failing
4. If the domain is not verified, add the DNS records Resend requires and wait for propagation

### Site is not showing updated content after a Supabase change

Service page content and testimonials are cached for up to 1 hour. To force an immediate update, go to Vercel > Deployments > Redeploy.

### Supabase connection errors in production

1. Go to Vercel > Settings > Environment Variables
2. Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
3. Make sure there are no extra spaces or line breaks in the values
4. Redeploy after any changes to environment variables

### Rate limit errors during development or testing

If you see rate limit errors when testing the contact form locally:
1. Go to upstash.com > your Redis database
2. Click Data Browser > flush the database to reset all rate limit counters
3. Do not flush the production database while real users are on the site

### Fonts not loading (site looks unstyled)

This only happens when Next.js cannot reach Google Fonts during a build (network issue or cold start). The fix is to delete the `.next` folder and restart the dev server:

```bash
rm -rf .next
npm run dev
```

On Vercel, this never happens in production because Vercel has reliable internet access during builds.

### next build fails with TypeScript errors

Run `npm run typecheck` to see the specific errors. The codebase uses strict TypeScript — no `any` types, no missing return types. Fix the errors before deploying.

---

*First Due Advisors — docs/TRANSFER.md*
*Created at project launch. Keep this file up to date if the stack changes.*
