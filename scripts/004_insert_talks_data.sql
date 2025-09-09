-- Insert mock talks data
INSERT INTO talks (id, title, description, speaker_name, time_slot, room, track, level, day, attendees, metadata) VALUES
('1', 'Microservicios con Node.js: Arquitectura escalable para el futuro', 'Aprende a diseñar y implementar una arquitectura de microservicios robusta usando Node.js, Docker y Kubernetes. Cubriremos patrones de comunicación, manejo de errores y estrategias de deployment.', 'María González', '10:00 - 10:45', 'Sala Principal', 'Development', 'Intermedio', 'martes-23', 150, '{}'),

('2', 'Machine Learning en producción: De Jupyter a la nube', 'Descubre cómo llevar tus modelos de ML desde el notebook hasta producción. Hablaremos de MLOps, monitoreo de modelos y deployment automatizado.', 'Carlos Rodríguez', '11:00 - 11:45', 'Auditorio B', 'Data Science', 'Avanzado', 'martes-23', 120, '{}'),

('3', 'Seguridad en APIs REST: Mejores prácticas y herramientas', 'Una guía completa sobre cómo proteger tus APIs. Cubriremos autenticación, autorización, rate limiting y las vulnerabilidades más comunes.', 'Ana Martínez', '14:00 - 14:45', 'Sala C', 'Security', 'Intermedio', 'martes-23', 95, '{}'),

('4', 'React Server Components: El futuro del desarrollo web', 'Explora las nuevas capacidades de React Server Components y cómo están cambiando la forma en que construimos aplicaciones web modernas.', 'Diego López', '15:00 - 15:45', 'Sala Principal', 'Development', 'Intermedio', 'martes-23', 180, '{}'),

('5', 'DevOps con Kubernetes: Orquestación de contenedores a escala', 'Aprende a gestionar aplicaciones containerizadas con Kubernetes. Desde conceptos básicos hasta estrategias avanzadas de deployment y scaling.', 'Roberto Silva', '16:00 - 16:45', 'Auditorio A', 'DevOps', 'Avanzado', 'martes-23', 110, '{}'),

('6', 'UX Research: Cómo entender realmente a tus usuarios', 'Metodologías y herramientas para realizar investigación de usuarios efectiva. Desde entrevistas hasta testing de usabilidad.', 'Laura Fernández', '17:00 - 17:45', 'Sala D', 'UX/UI', 'Principiante', 'martes-23', 85, '{}')

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  speaker_name = EXCLUDED.speaker_name,
  time_slot = EXCLUDED.time_slot,
  room = EXCLUDED.room,
  track = EXCLUDED.track,
  level = EXCLUDED.level,
  day = EXCLUDED.day,
  attendees = EXCLUDED.attendees,
  updated_at = NOW();
