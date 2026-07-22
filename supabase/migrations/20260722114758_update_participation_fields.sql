/*
# Add demo availability field, remove logo/pitch URL columns

## Summary
Adds `available_for_demo` for the October 17th demo commitment question.
Removes `company_logo_url` and `pitch_deck_url` (no longer collected).

## Modified Tables
### applications
- Added: available_for_demo (text) — Yes/No
- Removed: company_logo_url (text)
- Removed: pitch_deck_url (text)

## Security
No RLS changes. Existing INSERT policy covers new column.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'available_for_demo') THEN
    ALTER TABLE applications ADD COLUMN available_for_demo text;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'company_logo_url') THEN
    ALTER TABLE applications DROP COLUMN company_logo_url;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'pitch_deck_url') THEN
    ALTER TABLE applications DROP COLUMN pitch_deck_url;
  END IF;
END $$;
