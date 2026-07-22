/*
# Add new financials fields to applications

## Summary
Replaces old traction/financials fields with new ones for the updated Section 4.

## Modified Tables
### applications
- Added: has_paying_clients (text) — Yes/No
- Added: total_employees (integer) — Founders + full-time employees
- Added: monthly_recurring_revenue (numeric) — MRR in USD

## Security
No RLS changes. Existing INSERT policy covers new columns.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'has_paying_clients') THEN
    ALTER TABLE applications ADD COLUMN has_paying_clients text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'total_employees') THEN
    ALTER TABLE applications ADD COLUMN total_employees integer;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'monthly_recurring_revenue') THEN
    ALTER TABLE applications ADD COLUMN monthly_recurring_revenue numeric(14,2);
  END IF;
END $$;
