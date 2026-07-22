/*
# Update founder demographics fields

## Summary
Replaces single-select gender/ethnicity/veteran fields with a multi-select
founder descriptions question and a founders count question.

## Modified Tables
### applications
- Added: founder_descriptions (text[]) — select all that apply
- Added: founders_count (text) — 1,2,3,4,5 or more
- Removed: gender (text)
- Removed: ethnicity (text)
- Removed: veteran_status (text)

## Security
No RLS changes. Existing INSERT policy covers new columns.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'founder_descriptions') THEN
    ALTER TABLE applications ADD COLUMN founder_descriptions text[];
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'founders_count') THEN
    ALTER TABLE applications ADD COLUMN founders_count text;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'gender') THEN
    ALTER TABLE applications DROP COLUMN gender;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'ethnicity') THEN
    ALTER TABLE applications DROP COLUMN ethnicity;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'veteran_status') THEN
    ALTER TABLE applications DROP COLUMN veteran_status;
  END IF;
END $$;
