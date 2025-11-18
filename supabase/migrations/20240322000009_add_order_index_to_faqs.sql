-- Add order_index column to faqs table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'faqs' 
        AND column_name = 'order_index'
    ) THEN
        ALTER TABLE faqs ADD COLUMN order_index INTEGER DEFAULT 0;
        
        -- Initialize order_index for existing FAQs based on created_at within each category
        WITH ranked_faqs AS (
            SELECT 
                id,
                ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY created_at ASC) - 1 AS new_order
            FROM faqs
        )
        UPDATE faqs
        SET order_index = ranked_faqs.new_order
        FROM ranked_faqs
        WHERE faqs.id = ranked_faqs.id;
    END IF;
END $$;

-- Create index for faster ordering
CREATE INDEX IF NOT EXISTS faqs_order_index_idx ON faqs(category_id, order_index);

