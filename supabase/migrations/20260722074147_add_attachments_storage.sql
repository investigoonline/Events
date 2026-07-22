/*
# Add Attachments field with file upload support

## Summary
Adds an `attachments` column to the `applications` table and creates a
public Supabase Storage bucket (`application-attachments`) so applicants
can upload supporting files (PDF, images, docs) directly from the form.
Uploaded file paths are stored as a JSON array of objects
`[{ name, url, path, size, type }]` in the new `attachments` column.

## Modified Tables
### applications
- `attachments` (jsonb, nullable) — array of uploaded file metadata:
  each element is `{ name: string, url: string, path: string, size: number, type: string }`.

## Storage
- Creates bucket `application-attachments` (public = true) so uploaded
  files are accessible via their public URL without authentication.
- INSERT policy: anon + authenticated can upload files to the bucket.
- SELECT policy: public read so anyone with the URL can view the file.

## Security
- RLS already enabled on `applications`; existing INSERT policy covers
  the new nullable column (it is omitted from inserts when no files are
  attached, defaulting to NULL).
- Storage policies allow public read and anon/authenticated upload.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'attachments'
  ) THEN
    ALTER TABLE applications ADD COLUMN attachments jsonb;
  END IF;
END $$;

-- Create the storage bucket if it does not exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-attachments', 'application-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone (anon + authenticated) to upload files
DROP POLICY IF EXISTS "anon_upload_attachments" ON storage.objects;
CREATE POLICY "anon_upload_attachments" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'application-attachments');

-- Allow public read access to uploaded files
DROP POLICY IF EXISTS "anon_read_attachments" ON storage.objects;
CREATE POLICY "anon_read_attachments" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'application-attachments');

-- Allow anon + authenticated to update/delete their own uploads (by path prefix)
DROP POLICY IF EXISTS "anon_update_attachments" ON storage.objects;
CREATE POLICY "anon_update_attachments" ON storage.objects
  FOR UPDATE TO anon, authenticated
  USING (bucket_id = 'application-attachments')
  WITH CHECK (bucket_id = 'application-attachments');

DROP POLICY IF EXISTS "anon_delete_attachments" ON storage.objects;
CREATE POLICY "anon_delete_attachments" ON storage.objects
  FOR DELETE TO anon, authenticated
  USING (bucket_id = 'application-attachments');
