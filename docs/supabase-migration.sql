-- ============================================================
-- First Due Advisors — Supabase Migration Script
-- Run this once on a fresh Supabase project.
-- Version: 1.0
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- TABLE: leads
-- All lead data. No public access — service role only.
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       TIMESTAMPTZ DEFAULT now() NOT NULL,
  name             TEXT NOT NULL,
  phone            TEXT,
  email            TEXT,
  service_interest TEXT,
  message          TEXT,
  source           TEXT,
  page_url         TEXT,
  tcpa_consent     BOOLEAN NOT NULL DEFAULT true,
  tcpa_version     TEXT NOT NULL,
  status           TEXT DEFAULT 'new',
  notes            TEXT
);

-- ────────────────────────────────────────────────────────────
-- TABLE: services
-- Service page content — DB-driven.
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS services (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  tagline          TEXT,
  excerpt          TEXT,
  body_intro       TEXT,
  body_detail      TEXT,
  why_section      JSONB,
  faqs             JSONB,
  meta_title       TEXT,
  meta_description TEXT,
  og_title         TEXT,
  is_published     BOOLEAN DEFAULT true,
  sort_order       INT DEFAULT 0,
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: testimonials
-- Client testimonials — toggled via is_published.
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS testimonials (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  location     TEXT,
  service_slug TEXT,
  body         TEXT NOT NULL,
  rating       INT DEFAULT 5,
  is_published BOOLEAN DEFAULT true,
  sort_order   INT DEFAULT 0
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_services_slug        ON services (slug);
CREATE INDEX IF NOT EXISTS idx_services_published   ON services (is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_slug    ON testimonials (service_slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_pub     ON testimonials (is_published);
CREATE INDEX IF NOT EXISTS idx_leads_created_at     ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status         ON leads (status);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE services     ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- leads: NO public access. Service role only (via admin client in API routes).
-- No SELECT, INSERT, UPDATE, or DELETE policy for public role.

-- services: Public can SELECT published records only.
CREATE POLICY "Public can read published services"
  ON services FOR SELECT
  TO anon
  USING (is_published = true);

-- testimonials: Public can SELECT published records only.
CREATE POLICY "Public can read published testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (is_published = true);


-- ============================================================
-- SEED DATA — SERVICES
-- ============================================================

INSERT INTO services (slug, title, tagline, excerpt, body_intro, body_detail, why_section, faqs, meta_title, meta_description, og_title, is_published, sort_order) VALUES

-- ── 1. Medicare Plans ──────────────────────────────────────
(
  'medicare-plans',
  'Medicare Plans',
  'Straightforward guidance on Medicare — from someone who takes the time to explain it.',
  'Medicare can feel overwhelming, but it does not have to be. First Due Advisors helps you understand your options and choose a plan that fits your health needs and your budget. There is no pressure, no jargon, and no obligation.',
  'Medicare is federal health insurance that covers Americans 65 and older, as well as some younger individuals with qualifying disabilities. When you first become eligible, the number of choices you face can feel like a lot to take in at once. Original Medicare, Medicare Advantage, Part D drug plans, Medigap supplements — each one works differently, and the decision you make at enrollment can affect your coverage and your costs for years.

At First Due Advisors, we take time to explain your options in plain language. We are not captive agents for any single carrier. We work with multiple insurance companies, which means we can shop the market on your behalf and show you plans that actually fit your situation — not just whatever plan a single company is pushing this season.

Whether you are turning 65 and enrolling for the first time, reviewing your existing coverage during the Annual Enrollment Period, or dealing with a life change that affects your coverage, we are here to help you make a well-informed decision.',
  'Medicare is not one-size-fits-all. The right plan depends on your doctors, your prescriptions, how much you travel, your budget, and how you prefer to receive care. Original Medicare gives you broad access to providers nationwide but comes with cost-sharing and no cap on out-of-pocket expenses. Medicare Advantage plans often include dental, vision, and hearing coverage, and many have low premiums — but they typically require you to use a network of providers. A Medigap supplement fills the gaps in Original Medicare and gives you predictable costs, but it comes with a monthly premium.

We will walk you through each option, run side-by-side comparisons, and help you think through the trade-offs that matter for your life specifically. When you are ready to enroll, we handle the paperwork. After you are enrolled, we remain available to answer questions, help you during the Annual Enrollment Period each fall, and review your coverage if your circumstances change.

Our job is to make sure you are not paying for coverage you do not need, and that you are not caught off guard by costs your plan does not cover. That is the standard we hold ourselves to.',
  '{"heading": "Why First Due Advisors for Medicare Plans", "items": [{"icon_label": "22 Years", "heading": "Experience You Can Trust", "body": "With over two decades in the insurance industry, Brandon has helped hundreds of people navigate Medicare enrollment. He knows the plans, the carriers, and the questions to ask that most people do not think to raise."}, {"icon_label": "First Responders", "heading": "Advisors Who Serve", "body": "Every agent at First Due Advisors comes from a first responder background. We are trained to stay calm, think clearly, and put the people we serve first — especially when the stakes feel high."}, {"icon_label": "Independent", "heading": "No Single Carrier Loyalty", "body": "We are not tied to any one insurance company. We compare plans across multiple carriers so you see your real options and can choose what works best for you, not what is best for our commission."}]}'::jsonb,
  '[{"question": "When should I sign up for Medicare?", "answer": "Most people become eligible at 65. Your Initial Enrollment Period is a 7-month window that starts 3 months before your 65th birthday month, includes your birthday month, and extends 3 months after. Enrolling during this window helps you avoid late enrollment penalties. If you are still working and covered by employer insurance, the timing rules are different — we can help you figure out the right move."}, {"question": "What is the difference between Medicare Advantage and Original Medicare?", "answer": "Original Medicare (Parts A and B) is the federal program that covers hospital stays and outpatient care. Medicare Advantage (Part C) is offered by private insurance companies approved by Medicare. Advantage plans must cover everything Original Medicare covers, and many include extras like dental, vision, and prescription drugs. The main trade-off is that Advantage plans typically use provider networks, while Original Medicare lets you see any doctor who accepts Medicare nationwide."}, {"question": "Do I need a Medigap supplement plan?", "answer": "That depends on your financial situation and your risk tolerance. Original Medicare has no out-of-pocket maximum, so a serious illness could mean significant costs. A Medigap supplement fills those gaps and gives you predictable expenses. Whether it makes sense for you depends on your health, your budget, and what other coverage you have. We will help you run the numbers and make the call that fits your life."}, {"question": "What does Medicare not cover?", "answer": "Original Medicare does not cover most dental care, vision exams and eyeglasses, hearing aids, or long-term custodial care. Some Medicare Advantage plans do include dental, vision, and hearing benefits. If those gaps matter to you, we factor them into our plan comparison."}, {"question": "Can I change my Medicare plan after I enroll?", "answer": "Yes. The Annual Enrollment Period runs October 15 through December 7 each year. During this window you can switch between Original Medicare and Medicare Advantage, change your Advantage plan, or adjust your Part D drug coverage. Changes take effect January 1. We contact our clients each fall to review their plans and flag anything worth revisiting."}]'::jsonb,
  'Medicare Plans | First Due Advisors',
  'Get clear, unbiased guidance on Medicare plans from a firefighter-owned brokerage with 22 years of experience. We compare Medicare Advantage, Medigap, and Part D options across multiple carriers.',
  'Medicare Plans — Straightforward Guidance, No Pressure',
  true,
  1
),

-- ── 2. Health Insurance ────────────────────────────────────
(
  'health-insurance',
  'Individual & Group Health Insurance',
  'Health coverage that fits your life, not just your employer''s open enrollment window.',
  'Whether you are self-employed, between jobs, or looking for better coverage than your employer offers, First Due Advisors helps individuals and small business owners find health insurance plans that actually work. We compare options across multiple carriers and help you understand the full cost of coverage — not just the monthly premium.',
  'Health insurance is one of the most important financial decisions you make each year. A low premium can look great until you actually need to use the plan and discover the deductible is four thousand dollars. A high premium might be worth it if you have regular prescriptions or a family that sees doctors often. The math is different for everyone.

First Due Advisors helps individuals, families, and small business owners sort through their health insurance options and choose coverage that makes sense for their real lives. We work with multiple carriers and can compare plans across the Marketplace, off-exchange individual plans, and small group options for businesses with two or more employees.

We do not make decisions for you. We give you the information you need to make a well-informed choice, and we stay available to answer questions throughout the year — not just at open enrollment.',
  'For individuals and families, we start by understanding what matters most to you: keeping a specific doctor, managing a prescription, minimizing your out-of-pocket risk, or keeping your monthly cost as low as possible. From there we compare plans that fit those priorities. We explain deductibles, copays, coinsurance, out-of-pocket maximums, and network types in plain terms — because a plan you do not understand is a plan that will surprise you.

For small business owners, health benefits can make a real difference in your ability to attract and keep good employees. We help you evaluate group health plans, understand your contribution options, and find coverage that works within your budget. We can also help you explore Health Reimbursement Arrangements if a traditional group plan is not the right fit for your business.

Life changes — a job change, a marriage, a new child, a move to a new state. We help our clients review their coverage when circumstances shift, not just once a year. When you work with First Due Advisors, you are not starting over from scratch every enrollment season.',
  '{"heading": "Why First Due Advisors for Health Insurance", "items": [{"icon_label": "22 Years", "heading": "Experience Across the Market", "body": "Brandon has spent over two decades helping individuals and business owners find health coverage that actually works. He knows which plans hold up when you need them and which ones look good on paper only."}, {"icon_label": "First Responders", "heading": "Straight Talk, No Sales Pressure", "body": "First responders do not sugarcoat things. We tell you what a plan covers, what it does not, and what it will likely cost you over the course of a year. Then we let you make the call."}, {"icon_label": "Independent", "heading": "Multiple Carriers, Real Choices", "body": "We compare plans across multiple insurance companies. You see real options side by side, not just the one plan a captive agent is authorized to sell."}]}'::jsonb,
  '[{"question": "What is the difference between a PPO and an HMO?", "answer": "A PPO (Preferred Provider Organization) gives you flexibility to see any doctor, in-network or out-of-network, without a referral. Out-of-network care costs more, but the option is there. An HMO (Health Maintenance Organization) requires you to use a network of providers and typically requires a referral from a primary care doctor before you see a specialist. HMOs usually have lower premiums but less flexibility. The right choice depends on your doctors, your health needs, and how much flexibility matters to you."}, {"question": "Can I get health insurance outside of open enrollment?", "answer": "Yes, in certain situations. If you experience a qualifying life event — losing job-based coverage, getting married, having a child, or moving to a new coverage area — you are eligible for a Special Enrollment Period. Outside of these events, you can typically only enroll during the annual Open Enrollment Period, which runs November 1 through January 15 for Marketplace plans in most states."}, {"question": "What does a health insurance deductible mean?", "answer": "Your deductible is the amount you pay out of pocket for covered health services before your insurance starts sharing the cost. For example, if your deductible is $2,000, you pay the first $2,000 of covered care each year yourself. After that, your plan''s coinsurance or copays kick in. Not all services are subject to the deductible — preventive care is typically covered before you meet it."}, {"question": "Are there health insurance options for self-employed people?", "answer": "Yes. Self-employed individuals can shop for coverage through the Marketplace and may qualify for premium tax credits based on their projected income. Off-exchange individual plans are another option. If you have no employees, you cannot enroll in a small group plan, but there are individual options that provide solid coverage. We help self-employed clients find the right fit and make sure they are not leaving tax credits on the table."}, {"question": "What is an out-of-pocket maximum?", "answer": "The out-of-pocket maximum is the most you will pay for covered health care services in a plan year. Once you hit that number, your insurance pays 100% of covered costs for the rest of the year. It is one of the most important numbers to look at when comparing plans because it caps your financial exposure in a serious medical situation."}]'::jsonb,
  'Individual & Group Health Insurance | First Due Advisors',
  'Compare individual, family, and small group health insurance plans with guidance from a firefighter-owned independent brokerage. No pressure, no jargon — just honest help finding coverage that works.',
  'Health Insurance — Coverage That Fits Your Life',
  true,
  2
),

-- ── 3. Life Insurance ──────────────────────────────────────
(
  'life-insurance',
  'Life Insurance',
  'The right life insurance policy protects the people who depend on you — and gives you peace of mind.',
  'Life insurance is not about planning for death. It is about making sure the people who depend on you are taken care of if the unexpected happens. First Due Advisors helps individuals and families find the right coverage amount and policy type without the confusion or pressure that often comes with the process.',
  'Nobody likes thinking about life insurance. It forces you to confront something most of us would rather not think about. But the people who have it — or whose families have it when they need it — are always glad they made the decision.

Life insurance exists to replace your income, cover your debts, fund your children''s education, or simply make sure your family is not facing financial hardship on top of grief. The question is not whether you need it. The question is how much you need, what kind makes sense for your situation, and how to get it without paying more than necessary.

First Due Advisors helps individuals, couples, and families work through those questions. We are licensed to sell life insurance across multiple carriers, which means we can shop for competitive rates on your behalf and help you compare policies without a sales pitch attached.',
  'Term life insurance is the most straightforward option for most people. You choose a coverage amount and a term length — typically 10, 20, or 30 years — and pay a fixed premium. If you die during the term, your beneficiaries receive the death benefit. If you outlive the term, the coverage ends. Term life is affordable, easy to understand, and well-suited to covering a specific financial obligation like a mortgage or raising children to adulthood.

Permanent life insurance — whole life and universal life — stays in force for your entire lifetime and builds cash value over time. It costs more than term coverage, but it can serve a different purpose: estate planning, covering final expenses, or leaving a legacy. Whether permanent coverage makes sense for you depends on your goals and your financial picture.

We start every life insurance conversation by asking about your situation: your income, your dependents, your debts, your long-term goals. From there we help you figure out how much coverage you actually need, compare policies that meet that need, and walk you through the application process. We do not have a preferred product to push. Our job is to find what fits.',
  '{"heading": "Why First Due Advisors for Life Insurance", "items": [{"icon_label": "22 Years", "heading": "Two Decades of Policy Knowledge", "body": "Brandon has helped hundreds of families choose life insurance coverage that actually does what it is supposed to do. He knows the carriers, the underwriting process, and how to find competitive rates for your health profile."}, {"icon_label": "First Responders", "heading": "We Understand What Is at Stake", "body": "First responders spend their careers protecting other people. That mindset does not switch off. When we help a family choose life insurance, we take it personally — because we know what it means to have someone depending on you."}, {"icon_label": "Independent", "heading": "Shop Across Multiple Carriers", "body": "We are not locked into one company''s products. We compare life insurance rates and policy features across multiple carriers so you get the coverage you need at a price that makes sense."}]}'::jsonb,
  '[{"question": "How much life insurance do I need?", "answer": "A common starting point is 10 to 12 times your annual income, but the right number depends on your specific situation. You should factor in your income, your debts (mortgage, car loans, student loans), your dependents, childcare and education costs, and any final expenses. We walk through this calculation with every client because a generic number is often wrong in both directions."}, {"question": "What is the difference between term and whole life insurance?", "answer": "Term life insurance covers you for a specific period — typically 10, 20, or 30 years — and pays a death benefit only if you die during that term. It is the most affordable option and suits most people with straightforward income-replacement needs. Whole life insurance is permanent coverage that builds cash value over time. It costs significantly more but remains in force for your entire life and can serve estate planning or legacy goals."}, {"question": "Will a health condition prevent me from getting life insurance?", "answer": "Not necessarily. Many health conditions are insurable — they may affect your premium rate rather than your eligibility. Some carriers specialize in certain health profiles. The underwriting process involves a medical questionnaire and sometimes a paramedical exam. We know which carriers tend to be more favorable for certain conditions and can help you navigate the application in a way that gives you the best shot at a fair rate."}, {"question": "When is the best time to buy life insurance?", "answer": "The best time is when you have people depending on your income — a spouse, children, or a business partner. The second-best answer is as soon as possible, because premiums are based largely on your age and health at the time of application. A policy you buy at 35 costs considerably less than the same coverage bought at 45. Waiting rarely works in your favor."}, {"question": "What happens if I outlive my term life insurance policy?", "answer": "The coverage simply ends. You stop paying premiums, and there is no payout. Some policies include a return-of-premium rider that refunds your premiums if you outlive the term, but this adds to the cost. At the end of a term, many people choose to convert to a permanent policy (if the option is available), purchase a new term policy, or let the coverage lapse if their dependents are grown and their obligations are settled."}]'::jsonb,
  'Life Insurance | First Due Advisors',
  'Get honest guidance on term and permanent life insurance from a firefighter-owned brokerage. We compare policies across multiple carriers to find coverage that fits your family and your budget.',
  'Life Insurance — Protect the People Who Depend on You',
  true,
  3
),

-- ── 4. Annuities ───────────────────────────────────────────
(
  'annuities',
  'Annuities',
  'A steady income in retirement — without guessing what the market will do.',
  'Annuities are insurance products that can provide a guaranteed stream of income in retirement. They are not right for everyone, but for people who want predictability and protection from outliving their savings, they deserve a serious look. First Due Advisors helps you understand how annuities work and whether they belong in your retirement plan.',
  'One of the biggest financial fears people carry into retirement is running out of money. Social Security helps, but for most people it does not cover everything. A pension covers it for some — but fewer and fewer workers have them. Annuities exist to fill that gap. At their core, an annuity is a contract with an insurance company: you provide a lump sum or a series of payments, and in return, the insurer agrees to pay you an income — either for a set period or for the rest of your life.

The concept is straightforward. The products themselves can be more complex. There are fixed annuities, fixed indexed annuities, variable annuities, immediate annuities, and deferred annuities — each with different features, fee structures, and risk profiles. Understanding the differences is essential before you commit.

At First Due Advisors, we explain annuities without the hype. Some annuities are excellent tools for the right client. Some are sold to people who would be better served by something else. We help you figure out which category you are in.',
  'A fixed annuity pays a guaranteed interest rate for a set period — similar to a CD but issued by an insurance company. A fixed indexed annuity links your growth potential to a market index like the S&P 500, with a floor that protects your principal from losses. A variable annuity gives you market participation but also carries market risk. An immediate annuity converts a lump sum into an income stream that starts right away. A deferred annuity accumulates value over time and then converts to income at a future date.

Annuities can also include riders — optional features like guaranteed lifetime withdrawal benefits or death benefits for your heirs. Riders add cost, so it is worth understanding exactly what you are buying and whether you actually need it.

We take the time to walk through how any annuity we discuss actually works: the interest crediting method, the surrender period, the fees, the income options, and how it fits alongside your other retirement income sources. If an annuity is the right tool for your situation, we will show you why. If it is not, we will tell you that too.',
  '{"heading": "Why First Due Advisors for Annuities", "items": [{"icon_label": "22 Years", "heading": "Deep Product Knowledge", "body": "Annuities are complex products, and bad advice in this space can be costly. Brandon has spent over two decades working with annuities and knows how to evaluate them honestly — including when to recommend against one."}, {"icon_label": "First Responders", "heading": "Ethics Above Commission", "body": "Annuities can carry significant commissions, which creates pressure to sell them broadly. At First Due Advisors, we recommend annuities only when they genuinely serve the client. That is not a talking point. It is how we were trained to operate."}, {"icon_label": "Independent", "heading": "Multiple Carriers, Competitive Products", "body": "We work with multiple annuity providers and can compare products across the market. That means you are seeing competitive options, not just whatever one company is currently offering."}]}'::jsonb,
  '[{"question": "What is an annuity and how does it work?", "answer": "An annuity is a contract between you and an insurance company. You pay a premium — either as a lump sum or in installments — and the insurer agrees to pay you an income stream, either starting immediately or at a future date. Annuities are designed to provide a predictable income in retirement and to protect against the risk of outliving your savings."}, {"question": "What is the difference between a fixed and a variable annuity?", "answer": "A fixed annuity pays a guaranteed interest rate for a specified period. Your principal is protected and your return is predictable. A variable annuity allows you to invest your premium in sub-accounts similar to mutual funds. Your returns depend on market performance, which means higher potential growth but also the possibility of losses. Fixed indexed annuities sit between the two — they offer growth linked to a market index with a floor that protects your principal."}, {"question": "Are annuities safe?", "answer": "Fixed and fixed indexed annuities protect your principal from market losses, which makes them conservative instruments. Your money is backed by the financial strength of the issuing insurance company, not the FDIC. Variable annuities carry market risk and your account value can decline. It is important to understand exactly which type of annuity you are considering and what risks, if any, it carries."}, {"question": "What is a surrender period?", "answer": "Most annuities include a surrender period — typically 5 to 10 years — during which you will pay a penalty if you withdraw more than the allowed amount. The surrender charge usually declines each year until it reaches zero. Understanding the surrender schedule is essential before you purchase, especially if you may need access to that money before the period ends."}, {"question": "Is an annuity right for me?", "answer": "That depends on your age, your other retirement income sources, your risk tolerance, and how much guaranteed income matters to you. Annuities work well for people who want income they cannot outlive, have already maximized other tax-advantaged accounts, and have money they do not need immediate access to. They are not the right tool for everyone. We will give you an honest assessment based on your specific situation."}]'::jsonb,
  'Annuities | First Due Advisors',
  'Understand fixed, indexed, and immediate annuities with guidance from a licensed professional with 22 years of experience. First Due Advisors helps you determine if an annuity fits your retirement plan.',
  'Annuities — Guaranteed Income in Retirement',
  true,
  4
),

-- ── 5. Estate Planning ─────────────────────────────────────
(
  'estate-planning',
  'Estate Planning',
  'Protect your assets and your family with an estate plan built around your wishes.',
  'Estate planning is not just for the wealthy. It is for anyone who has people they care about and assets they have worked to build. First Due Advisors helps clients think through the insurance components of estate planning — protecting what you have built and making sure it passes to the right people in the right way.',
  'Most people think estate planning is about writing a will, and while that is part of it, there is much more to consider. Who will make medical decisions for you if you cannot make them yourself? What happens to your business? How do your life insurance beneficiary designations interact with your will? Does your family know where everything is?

These questions do not resolve themselves. Left unaddressed, they become problems for your family to sort out during what is already a difficult time. Estate planning is the process of answering them on your own terms, while you have the clarity and the time to do it right.

At First Due Advisors, we focus on the insurance side of estate planning: the policies and products that fund an estate plan, protect an estate from unnecessary taxes, and provide liquidity when your family needs it most. We work in coordination with estate planning attorneys and financial advisors to make sure the insurance components align with your broader plan.',
  'Life insurance plays a central role in most estate plans. It can replace income for a surviving spouse, pay estate taxes without forcing the sale of assets, fund a buy-sell agreement between business partners, or provide an inheritance for heirs when most of your assets are illiquid. The right policy type and coverage amount depends on your goals, your estate''s size, and how your other assets are structured.

Annuities can also play a role in estate planning by creating guaranteed income that reduces the pressure on your other assets, or by using beneficiary designations to transfer wealth outside of probate. Long-term care insurance is another piece of the puzzle — the cost of extended care can drain an estate quickly, and planning ahead gives you more options.

We start every estate planning conversation by asking about your goals, your family, and what you already have in place. We then help you identify the gaps and the tools that address them. We coordinate with your attorney and financial advisor so everyone is working from the same picture. If you do not have an attorney, we can point you toward qualified professionals in your area.',
  '{"heading": "Why First Due Advisors for Estate Planning", "items": [{"icon_label": "22 Years", "heading": "Experience With Complex Situations", "body": "Brandon has worked with clients across a range of estate planning situations — blended families, business owners, retirees with significant assets, and people just starting to think about it for the first time. He knows how to ask the right questions."}, {"icon_label": "First Responders", "heading": "A Team You Can Trust With Sensitive Topics", "body": "Estate planning conversations require trust. First responders are trained to handle sensitive situations with care and discretion. That is the standard we bring to every client conversation."}, {"icon_label": "Independent", "heading": "Coordinated With Your Broader Plan", "body": "We do not work in a silo. We coordinate with your estate planning attorney and financial advisor to make sure the insurance components of your plan are aligned with everything else."}]}'::jsonb,
  '[{"question": "Do I need an estate plan if I am not wealthy?", "answer": "Yes. Estate planning is about making sure your assets go where you want them to go, that someone has legal authority to make decisions for you if you are incapacitated, and that your family is not left navigating legal and financial complexity during a difficult time. These concerns apply to most adults, regardless of net worth. Life insurance, beneficiary designations, and a basic will are starting points that anyone can put in place."}, {"question": "How does life insurance fit into an estate plan?", "answer": "Life insurance can serve several roles in an estate plan. It can provide immediate liquidity to pay estate taxes or debts without forcing the sale of other assets. It can fund a buy-sell agreement for business owners. It can equalize inheritances among heirs when some assets cannot be divided easily. It can also provide income replacement for a surviving spouse. The right application depends on your goals and your estate''s structure."}, {"question": "What is a beneficiary designation and why does it matter?", "answer": "A beneficiary designation is the instruction on a financial account or insurance policy that says who receives the money when you die. Beneficiary designations override your will — which means a policy payable to an ex-spouse will go to that person regardless of what your will says. Keeping your designations current and aligned with your overall estate plan is one of the most important and most overlooked parts of the process."}, {"question": "What happens if I die without a will?", "answer": "If you die without a will, your state''s intestacy laws determine how your assets are distributed. The result may not match your wishes. Your estate will go through probate, which is a public legal process that takes time and costs money. For people with minor children, dying without a will also means a court decides who raises them. A basic estate plan that includes a will, powers of attorney, and correct beneficiary designations avoids most of these outcomes."}, {"question": "What is long-term care insurance and should I consider it?", "answer": "Long-term care insurance covers the cost of extended care services — in-home care, assisted living, or a nursing facility — that are not covered by health insurance or Medicare. The median annual cost of a private nursing home room exceeds $90,000 in most states and continues to rise. Long-term care insurance is worth considering if protecting your retirement assets from these costs is a priority. The younger and healthier you are when you apply, the lower your premiums will be."}]'::jsonb,
  'Estate Planning | First Due Advisors',
  'Protect your assets and your family with thoughtful estate planning guidance from a licensed insurance professional with 22 years of experience. First Due Advisors covers the insurance side of your estate plan.',
  'Estate Planning — Protect What You Have Built',
  true,
  5
);


-- ============================================================
-- SEED DATA — TESTIMONIALS (placeholder, is_published: false)
-- Brandon replaces these with real testimonials via Supabase dashboard.
-- ============================================================

INSERT INTO testimonials (name, location, service_slug, body, rating, is_published, sort_order) VALUES
(
  '[PLACEHOLDER NAME]',
  '[PLACEHOLDER City, State]',
  'medicare-plans',
  '[PLACEHOLDER] Brandon walked me through every Medicare option available in my area and helped me choose a plan that saved me money without sacrificing the coverage I needed. I felt like I was talking to someone who genuinely had my best interest in mind.',
  5,
  false,
  1
),
(
  '[PLACEHOLDER NAME]',
  '[PLACEHOLDER City, State]',
  'life-insurance',
  '[PLACEHOLDER] I had been putting off getting life insurance for years. Brandon made the whole process simple and stress-free. He found us solid coverage at a price that fit our budget, and he explained everything in terms we could actually understand.',
  5,
  false,
  2
),
(
  '[PLACEHOLDER NAME]',
  '[PLACEHOLDER City, State]',
  'health-insurance',
  '[PLACEHOLDER] As a self-employed contractor, finding good health insurance on my own was overwhelming. First Due Advisors compared options across multiple carriers and helped me find a plan that actually made sense for my situation. I would not go back to doing it alone.',
  5,
  false,
  3
);
