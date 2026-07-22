/*
# Create applications table for Lone Star Innovation Forum

## Summary
Creates the `applications` table to store entrepreneur pitch competition submissions.
This is a public (no-auth) form — anyone with the anon key can INSERT a new application.
No SELECT is granted to anon so submissions remain private to admins.

## New Tables
### applications
- id (uuid, primary key, auto-generated)
- created_at (timestamptz, auto-set)

#### Section 1 – Contact & General Information
- first_name (text, required)
- last_name (text, required)
- email (text, required)
- phone (text)
- linkedin_url (text)
- city (text)
- state (text)

#### Section 2 – Company Information
- company_name (text, required)
- company_website (text)
- industry (text)
- year_founded (integer)
- state_of_incorporation (text)
- num_employees (text — range like "1-5", "6-10", etc.)

#### Section 3 – Business Strategy & Stage
- business_stage (text — Pre-idea / Pre-revenue / Early Revenue / Growth)
- elevator_pitch (text)
- problem_solved (text)
- target_market (text)
- competitive_advantage (text)

#### Section 4 – Traction & Financials
- revenue_stage (text — Pre-revenue / Revenue Generating)
- monthly_revenue_amount (numeric)
- total_funding_raised (numeric)
- funding_sought (numeric)

#### Section 5 – Event Participation & Goals
- participation_goals (text)
- how_heard (text)
- company_logo_url (text)
- pitch_deck_url (text)

#### Section 6 – Demographics & Consent
- gender (text)
- ethnicity (text)
- veteran_status (text)
- data_consent (boolean)
- info_accurate (boolean)
- understands_disqualification (boolean)
- declaration_agreed (boolean, required)

## Security
- RLS enabled on `applications`.
- INSERT policy for anon + authenticated (public form submission).
- No SELECT policy for anon — submissions are private to service-role admins.
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),

  -- Section 1: Contact
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  linkedin_url text,
  city text,
  state text,

  -- Section 2: Company
  company_name text NOT NULL,
  company_website text,
  industry text,
  year_founded integer,
  state_of_incorporation text,
  num_employees text,

  -- Section 3: Business Strategy
  business_stage text,
  elevator_pitch text,
  problem_solved text,
  target_market text,
  competitive_advantage text,

  -- Section 4: Traction & Financials
  revenue_stage text,
  monthly_revenue_amount numeric,
  total_funding_raised numeric,
  funding_sought numeric,

  -- Section 5: Event Participation
  participation_goals text,
  how_heard text,
  company_logo_url text,
  pitch_deck_url text,

  -- Section 6: Demographics & Consent
  gender text,
  ethnicity text,
  veteran_status text,
  data_consent boolean DEFAULT false,
  info_accurate boolean DEFAULT false,
  understands_disqualification boolean DEFAULT false,
  declaration_agreed boolean DEFAULT false
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_applications" ON applications;
CREATE POLICY "anon_insert_applications" ON applications FOR INSERT
TO anon, authenticated WITH CHECK (true);
