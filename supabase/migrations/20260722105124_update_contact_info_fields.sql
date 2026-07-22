/*
# Update Contact Info fields for applications table

## Summary
Updates the Section 1 (Contact & General Information) columns to match the ICOCMN
application form. Removes linkedin_url, city, and state; adds title_position and
phone_country_code; makes phone NOT NULL (mandatory).

## Modified Tables
### applications
- Removed columns (data-safe — kept in DB, just unused by the form):
  - linkedin_url (no longer collected)
  - city (no longer collected)
  - state (no longer collected)
  Note: These columns are NOT dropped to preserve existing row data.
- Added columns:
  - title_position (text, NOT NULL) — applicant's title or position
  - phone_country_code (text, NOT NULL) — selected country dialing code, e.g. "+1"
- Modified columns:
  - phone (text, NOT NULL) — now mandatory business phone number

## Security
- No RLS changes. Existing INSERT policy for anon + authenticated still covers new columns.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'title_position'
  ) THEN
    ALTER TABLE applications ADD COLUMN title_position text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'phone_country_code'
  ) THEN
    ALTER TABLE applications ADD COLUMN phone_country_code text;
  END IF;
END $$;

-- Make phone NOT NULL (safe: existing rows have phone values or we set a default first)
UPDATE applications SET phone = '' WHERE phone IS NULL;
ALTER TABLE applications ALTER COLUMN phone SET NOT NULL;

-- Make title_position NOT NULL
UPDATE applications SET title_position = '' WHERE title_position IS NULL;
ALTER TABLE applications ALTER COLUMN title_position SET NOT NULL;

-- Make phone_country_code NOT NULL
UPDATE applications SET phone_country_code = '+1' WHERE phone_country_code IS NULL;
ALTER TABLE applications ALTER COLUMN phone_country_code SET NOT NULL;
