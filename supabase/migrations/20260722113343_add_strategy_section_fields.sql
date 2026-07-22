/*
# Add strategy section fields to applications

## Summary
Replaces the old business strategy fields with new ones for the updated Section 3.

## Modified Tables
### applications
- Added: founding_team_full_time (text) — Yes/No/Unsure
- Added: scalable_tech_enabled (text) — Yes/No/Unsure
- Added: social_business_venture (text) — Yes/No/Unsure
- Added: current_development_stage (text) — development stage selection
- Added: top_competitors (text) — list of top 3 competitors
- Added: competitive_differentiation (text) — what differentiates from competitors

## Security
No RLS changes. Existing INSERT policy covers new columns.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'founding_team_full_time') THEN
    ALTER TABLE applications ADD COLUMN founding_team_full_time text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'scalable_tech_enabled') THEN
    ALTER TABLE applications ADD COLUMN scalable_tech_enabled text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'social_business_venture') THEN
    ALTER TABLE applications ADD COLUMN social_business_venture text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'current_development_stage') THEN
    ALTER TABLE applications ADD COLUMN current_development_stage text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'top_competitors') THEN
    ALTER TABLE applications ADD COLUMN top_competitors text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'competitive_differentiation') THEN
    ALTER TABLE applications ADD COLUMN competitive_differentiation text;
  END IF;
END $$;
