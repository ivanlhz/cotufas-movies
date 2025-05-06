# Movie Explorer App

## Objetivo

Construir una pequeña aplicación web en React que consuma una API y permita explorar una lista de películas. Queremos que trates este mini proyecto como si lo fueses a poner en producción. 

## Requisitos

El único requisito es el siguiente: de usarse alguna librería para gestión de estado, cosa totalmente opcional, por favor usar `@preact/signals-react`

## Instrucciones

Listado de películas:

- Muestra el título, imagen y resumen de cada show.
- Paginación o scroll infinito (mínimo 20 elementos visibles).

Detalle:

- Al hacer clic en una película, muestra una vista de detalle con más información.

Favoritos:

- El usuario puede marcar películas como favoritas (almacenado en localStorage).

Usa esta API pública de ejemplo `GET https://api.tvmaze.com/shows`.

Incluye un README explicando brevemente qué harías diferente con más tiempo.

## Entrega

Sube tu código a un repo de GitHub. Si es privado trendrás que darnos acceso (usuarios ograu y lonamiaec de github)

---

## Notas del desarrollador

### Estructura del proyecto (DDD + Clean Architecture + Atomic Design)

```bash
src/
│
├─ app/                        # Capa de aplicación (React Router, providers, entrypoints)
│   ├─ routes/                 # Definición de rutas y loaders (React Router)
│   └─ App.tsx                 # Root de la app, layout general, providers
│
├─ core/                       # Dominios de negocio (DDD + Clean Architecture)
│   └─ movies/                 # Dominio de películas
│       ├─ application/        # Casos de uso, servicios, lógica de aplicación (ej: GetMovies, ToggleFavorite)
│       ├─ domain/             # Entidades, ValueObjects, interfaces de repositorio (ej: Movie.ts, MovieRepository.ts)
│       ├─ infrastructure/     # Implementaciones técnicas (API, localStorage, etc)
│       └─ index.ts            # Barrel export del dominio
│
├─ ui/                         # Componentes siguiendo Atomic Design
│   ├─ atoms/                  # Elementos básicos (Button, Image, Text, etc)
│   ├─ molecules/              # Combinaciones simples de átomos (MovieCard, SearchBar)
│   ├─ organisms/              # Secciones completas (MovieList, MovieDetail)
│   ├─ templates/              # Estructura de página (PageLayout, ListPage)
│   └─ pages/                  # Vistas de página (HomePage, MovieDetailPage)
│
├─ shared/                     # Utilidades, hooks, helpers, constantes, estilos globales
│   ├─ hooks/
│   ├─ utils/
│   └─ config/
│
├─ state/                      # Stores y lógica de estado global (signals, context)
│   └─ movies.ts               # Ejemplo: store de películas y favoritos
│
├─ tests/                      # Tests de integración y funcionales (Vitest + Testing Library)
│
├─ assets/                     # Imágenes, logos, fuentes, etc.
│
├─ index.css                   # Estilos globales
├─ main.tsx                    # Entry point de React/Vite
├─ vite-env.d.ts               # Tipos de Vite
├─ setupTests.ts               # Configuración global de tests
│
└─ App.test.tsx                # Test principal de la App
```

- **app/**: Configuración de la app, rutas y providers globales.
- **core/**: Lógica de negocio pura, separada en subcarpetas por dominio. Cada dominio tiene application (casos de uso), domain (entidades e interfaces), infrastructure (implementaciones técnicas).
- **ui/**: Componentes organizados por Atomic Design. Facilita la reutilización y el testeo.
- **shared/**: Código reutilizable y transversal (hooks, utilidades, constantes).
- **state/**: Gestión de estado global con @preact/signals-react, separado de la lógica de dominio.
- **tests/**: Tests de integración y funcionales.
- **assets/**: Recursos estáticos.
- **main.tsx**: Arranque de la app.

Esta estructura facilita el mantenimiento, escalabilidad y testeo de la aplicación siguiendo buenas prácticas de arquitectura y diseño.
