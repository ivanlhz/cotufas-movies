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
│   └─ App.tsx                 # Root de la app, layout general, providers
│   └─ routes.tsx              # Rutas de la app
│
├─ core/                       # Lógica de negocio y dominio
│   └─ movies/ 
│     ├─ __tests__/            # Pruebas de películas
│     ├─ domain/               # Dominio de películas (servicios, entidades, API, etc)
│     ├─ application/          # Aplicación de películas (casos de uso, etc)
│     └─ infrastructure/       # Infraestructura de películas (persistencia, etc)
│
├─ ui/                         # Componentes siguiendo Atomic Design
│   ├─ atoms/                  # Elementos básicos (FavoriteHeart, MovieImage, RatingBadge, GenreBadge, ErrorIcon, BrandTitle)
│   ├─ molecules/              # Combinaciones simples de átomos (MovieCard, EmptyState, NotFoundMessage)
│   ├─ organisms/              # Secciones completas (MovieList, Header, ErrorFallback)
│   ├─ templates/              # Estructura de página (Layout)
│   └─ pages/                  # Vistas de página (Home, MovieDetail, NotFound)
│
├─ state/                      # Stores y lógica de estado global (signals, context)
│   └─ favorites.ts            # Ejemplo: store de favoritos
│
├─ tests/                      # Pruebas de integración de componentes
│
├─ assets/                     # Imágenes, logos, fuentes, etc.
│
├─ index.css                   # Estilos globales
├─ main.tsx                    # Entry point de React/Vite
└─ ...
```

- **ui/atoms/**: Elementos visuales básicos y reutilizables.
- **ui/molecules/**: Combinaciones de átomos reutilizables (tarjetas, estados vacíos, mensajes).
- **ui/organisms/**: Secciones completas de interfaz (listas, cabeceras, fallback de error).
- **ui/templates/**: Estructura de página (Layout general).
- **ui/pages/**: Vistas de página completas.
- **state/**: Gestión de estado global (favoritos, filtros).
- **core/**: Lógica de dominio y casos de uso.

Esta estructura facilita el mantenimiento, escalabilidad y testeo de la aplicación siguiendo buenas prácticas de arquitectura y diseño.

---

## Próximos pasos sugeridos

### 1. Skeletons (componentes de carga)
Implementa componentes skeleton en las listas y detalles de películas para mejorar la experiencia de usuario mientras carga la información. Puedes crear átomos como `SkeletonBox` y moléculas como `MovieCardSkeleton`, y usarlos en el estado de carga de `MovieList` y `MovieDetail`.

### 2. Transiciones suaves entre secciones
Utiliza animaciones CSS (por ejemplo, con Tailwind o Framer Motion) para animar la entrada y salida de componentes y secciones. Puedes aplicar transiciones a la navegación entre páginas, aparición de modales, o cambios de estado en los favoritos.

### 3. Paginación de películas (20 en 20)
La API de TVMaze devuelve los resultados paginados de 250 en 250 (`/shows?page=N`). El ejercicio requiere paginar de 20 en 20. Para lograrlo:
- Implementa una lógica que descargue y almacene localmente bloques de 250 películas (una página de la API).
- Divide ese bloque en páginas de 20 elementos para la UI.
- Cuando el usuario navegue más allá del bloque actual, solicita la siguiente página de la API y sigue paginando localmente de 20 en 20.
- Es recomendable crear un **contexto** para la paginación o usar **signals** (de `@preact/signals-react`) para manejar el estado de la página actual, el bloque de películas y la navegación.
- El custom hook (`usePaginatedMovies`) debe consumir ese contexto/signals para exponer la API de paginación y el estado necesario a los componentes.

**Ejemplo de paginación local:**
```ts
// page: número de página de la UI (1,2,3...)
const apiPage = Math.floor((page - 1) * 20 / 250);
const start = ((page - 1) * 20) % 250;
const moviesBlock = getMoviesBlockFromApi(apiPage); // descarga o cachea el bloque de 250
const moviesForPage = moviesBlock.slice(start, start + 20);
```

---

## Mejoras futuras
- Añadir tests de integración para la paginación y favoritos.
- Internacionalización (i18n).
- Mejorar la gestión de errores y estados vacíos.
