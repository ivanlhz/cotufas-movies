// Barrel export para el dominio de películas
export * from "./domain/Movie";
export * from "./domain/MovieRepository";
export * from "./domain/favoritesRepository";
export * from "./application/GetMovies";
export * from "./application/GetMovieById";
export * from "./application/ToggleFavorite";
export * from "./infrastructure/ApiMovieRepository";
export * from "./infrastructure/LocalStorageFavoritesRepository";
export * from "./infrastructure/movieMapper";
