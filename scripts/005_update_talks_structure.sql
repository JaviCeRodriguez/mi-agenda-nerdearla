-- Eliminar columnas attendees y level, convertir speaker_name a array, agregar url_site
ALTER TABLE talks 
DROP COLUMN IF EXISTS attendees,
DROP COLUMN IF EXISTS level;

-- Agregar columna temporal para speakers como array
ALTER TABLE talks ADD COLUMN speakers_temp TEXT[];

-- Migrar datos de speaker_name a speakers array
UPDATE talks SET speakers_temp = ARRAY[speaker_name] WHERE speaker_name IS NOT NULL;

-- Eliminar columna speaker_name y renombrar speakers_temp
ALTER TABLE talks DROP COLUMN speaker_name;
ALTER TABLE talks RENAME COLUMN speakers_temp TO speakers;

-- Agregar columna url_site
ALTER TABLE talks ADD COLUMN url_site TEXT DEFAULT NULL;

-- Hacer speakers NOT NULL
ALTER TABLE talks ALTER COLUMN speakers SET NOT NULL;
