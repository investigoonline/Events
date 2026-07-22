/*
# Add signature, date, and signatory name to applications

## Summary
Extends the `applications` table with three fields required for the
applicant declaration at the end of the Demographics & Consent section.

## Modified Tables
### applications
- `signatory_name` (text) — full printed name of the person signing
- `signed_date` (date) — date the declaration was signed
- `signature_data_url` (text) — base64-encoded PNG of the drawn signature

## Notes
- All three columns are nullable so existing rows are unaffected.
- No RLS changes needed; existing INSERT policy already covers new columns.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'signatory_name'
  ) THEN
    ALTER TABLE applications ADD COLUMN signatory_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'signed_date'
  ) THEN
    ALTER TABLE applications ADD COLUMN signed_date date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'signature_data_url'
  ) THEN
    ALTER TABLE applications ADD COLUMN signature_data_url text;
  END IF;
END $$;
