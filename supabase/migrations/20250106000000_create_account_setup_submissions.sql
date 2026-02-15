-- Create account_setup_submissions table
CREATE TABLE IF NOT EXISTS public.account_setup_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    form_url_path TEXT NOT NULL,
    form_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster lookups by form URL path
CREATE INDEX IF NOT EXISTS account_setup_submissions_url_path_idx ON public.account_setup_submissions(form_url_path);

-- Create index for faster lookups by created_at
CREATE INDEX IF NOT EXISTS account_setup_submissions_created_at_idx ON public.account_setup_submissions(created_at DESC);

-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_account_setup_submissions
    BEFORE UPDATE ON public.account_setup_submissions
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- Disable RLS (Row Level Security) for now - adjust based on your security needs
ALTER TABLE public.account_setup_submissions DISABLE ROW LEVEL SECURITY;



