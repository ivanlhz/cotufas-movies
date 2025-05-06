import { signal, computed } from "@preact/signals-react";
import { LocalStorageFavoritesRepository } from "@/core/movies/infrastructure/LocalStorageFavoritesRepository";
import { ToggleFavorite } from "@/core/movies/application/ToggleFavorite";

const favoritesRepository = new LocalStorageFavoritesRepository();
const toggleFavoriteUseCase = new ToggleFavorite(favoritesRepository);

export const favoritesIds = signal<string[]>(toggleFavoriteUseCase.getFavorites());

export const toggleFavorite = (movieId: string) => {
  toggleFavoriteUseCase.execute(movieId);
  const newFavorites = toggleFavoriteUseCase.getFavorites();
  favoritesIds.value = [...newFavorites];
  
  return favoritesIds.value.includes(movieId);
};

export const isFavorite = (movieId: string) => computed(() => favoritesIds.value.includes(movieId));