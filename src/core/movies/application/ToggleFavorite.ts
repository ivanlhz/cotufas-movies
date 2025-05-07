import { FavoritesRepository } from "../domain/FavoritesRepository";

export class ToggleFavorite {
  constructor(private repository: FavoritesRepository) {}

  execute(movieId: string): string[] {
    return this.repository.toggleFavorite(movieId);
  }

  isFavorite(movieId: string): boolean {
    return this.repository.isFavorite(movieId);
  }

  getFavorites(): string[] {
    return this.repository.getFavorites();
  }
}
