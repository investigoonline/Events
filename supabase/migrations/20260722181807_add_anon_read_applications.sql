-- Allow public read access to applications for the Reports view
CREATE POLICY "anon_read_applications"
  ON public.applications FOR SELECT
  TO anon, authenticated USING (true);