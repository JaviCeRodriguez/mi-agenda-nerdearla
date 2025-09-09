-- Actualizar datos existentes para usar múltiples speakers y eliminar attendees/level
UPDATE talks SET 
  speakers = CASE 
    WHEN title = 'Introducción a React Server Components' THEN ARRAY['María García', 'Miguel Ángel Torres']
    WHEN title = 'El futuro de JavaScript: ES2024 y más allá' THEN ARRAY['Carlos Rodríguez']
    WHEN title = 'Construyendo APIs escalables con Node.js' THEN ARRAY['Ana Martínez']
    WHEN title = 'CSS Grid vs Flexbox: Cuándo usar cada uno' THEN ARRAY['Luis Fernández']
    WHEN title = 'Testing en React: Mejores prácticas' THEN ARRAY['Sofia López']
    WHEN title = 'GraphQL: Revolucionando las APIs' THEN ARRAY['Diego Morales']
    WHEN title = 'Microservicios con Docker y Kubernetes' THEN ARRAY['Carmen Ruiz']
    WHEN title = 'Optimización de performance en aplicaciones web' THEN ARRAY['Roberto Silva', 'Miguel Ángel Torres']
    WHEN title = 'Introducción a Machine Learning con Python' THEN ARRAY['Elena Vargas']
    WHEN title = 'Desarrollo móvil con React Native' THEN ARRAY['Andrés Castro']
    WHEN title = 'Seguridad en aplicaciones web modernas' THEN ARRAY['Patricia Herrera']
    WHEN title = 'DevOps: Automatización y CI/CD' THEN ARRAY['Miguel Ángel Torres']
    ELSE ARRAY['Speaker TBD']
  END;
