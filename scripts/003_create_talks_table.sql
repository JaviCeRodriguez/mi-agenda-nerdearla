-- Create talks table with JSON column for future extensibility
CREATE TABLE IF NOT EXISTS talks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  speaker_name TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  room TEXT NOT NULL,
  track TEXT NOT NULL,
  level TEXT NOT NULL,
  day TEXT NOT NULL,
  attendees INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_talks_day ON talks(day);
CREATE INDEX IF NOT EXISTS idx_talks_track ON talks(track);
CREATE INDEX IF NOT EXISTS idx_talks_level ON talks(level);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_talks_updated_at 
    BEFORE UPDATE ON talks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
