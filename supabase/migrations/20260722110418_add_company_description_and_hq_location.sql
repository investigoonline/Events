/*
# Add company_description and headquarters_location to applications

## Summary
Extends the applications table for the updated Company Information section.

## Modified Tables
### applications
- Added: company_description (text) — 3-4 sentence company overview
- Added: headquarters_location (text) — selected from predefined location options
- Added: date_founded (text) — date the company was founded (replaces integer year_founded; year_founded kept for backward compat)

## Security
No RLS changes. Existing INSERT policy covers new columns.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'company_description'
  ) THEN
    ALTER TABLE applications ADD COLUMN company_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'headquarters_location'
  ) THEN
    ALTER TABLE applications ADD COLUMN headquarters_location text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'date_founded'
  ) THEN
    ALTER TABLE applications ADD COLUMN date_founded text;
  END IF;
END $$;
