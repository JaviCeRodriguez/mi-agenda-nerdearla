-- Función para obtener el número de usuarios interesados en una charla
CREATE OR REPLACE FUNCTION get_talk_interested_count(talk_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM user_saved_talks
    WHERE talk_id = talk_uuid
  );
END;
$$ LANGUAGE plpgsql;

-- Función para obtener todas las charlas con su conteo de interesados
CREATE OR REPLACE FUNCTION get_talks_with_interest_count()
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  speakers TEXT[],
  day TEXT,
  time_start TEXT,
  time_end TEXT,
  room TEXT,
  track TEXT,
  url_site TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ,
  interested_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.title,
    t.description,
    t.speakers,
    t.day,
    t.time_start,
    t.time_end,
    t.room,
    t.track,
    t.url_site,
    t.metadata,
    t.created_at,
    COALESCE(get_talk_interested_count(t.id), 0) as interested_count
  FROM talks t
  ORDER BY t.day, t.time_start;
END;
$$ LANGUAGE plpgsql;
