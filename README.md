# Mi Agenda Nerdearla

Una aplicación web moderna para explorar y gestionar las charlas de Nerdearla 2025, la conferencia tech más grande de Latinoamérica.

## 🚀 Características

### Filtrado Inteligente

- **Filtro por día**: Navega entre los días de la conferencia
- **Filtro por tracks**: Filtra por categorías como Development, Data Science, Security, UX, Management, etc.
- **Filtros combinados**: Combina múltiples criterios para encontrar charlas específicas
- **URLs compartibles**: Los filtros se reflejan en la URL para fácil compartir

### Interfaz Visual

- **Colores por track**: Cada categoría tiene su color distintivo basado en la leyenda oficial
- **Estados interactivos**: Colores que cambian según selección y hover
- **Diseño responsivo**: Optimizado para desktop y móvil
- **Transiciones suaves**: Animaciones fluidas para mejor experiencia

### Gestión de Charlas

- **Vista de tarjetas**: Información clara de cada charla con horario, sala y speakers
- **Enlaces externos**: Acceso directo a la página oficial de cada charla
- **Contador dinámico**: Muestra cuántas charlas coinciden con los filtros activos

## 🛠️ Tecnologías

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Estilos utilitarios y componentes personalizados
- **Supabase**: Base de datos y autenticación
- **shadcn/ui**: Componentes accesibles y personalizables
- **Lucide React**: Iconografía moderna

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal con metadata SEO
│   ├── page.tsx           # Página principal
│   └── auth/              # Rutas de autenticación
├── components/            # Componentes React
│   ├── filter-bar.tsx     # Barra de filtros con URL params
│   ├── talks-list.tsx     # Lista de charlas con filtrado
│   ├── talk-card.tsx      # Tarjeta individual de charla
│   └── ui/                # Componentes base reutilizables
├── lib/                   # Utilidades y configuración
│   ├── utils.ts           # Funciones compartidas y constantes
│   ├── url-params.ts      # Manejo de parámetros URL
│   ├── talks.ts           # Funciones de base de datos
│   └── supabase/          # Configuración de Supabase
└── public/                # Assets estáticos
```

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Construir para producción
pnpm build

# Ejecutar en producción
pnpm start
```

## 🎯 Objetivo

Mi Agenda Nerdearla facilita la exploración y planificación de charlas para asistentes a la conferencia, proporcionando una interfaz intuitiva y visualmente atractiva para descubrir contenido relevante según sus intereses y disponibilidad.
