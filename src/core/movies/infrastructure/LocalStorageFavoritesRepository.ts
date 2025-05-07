import { FavoritesRepository } from "../domain/FavoritesRepository";

export class LocalStorageFavoritesRepository implements FavoritesRepository {
  private readonly storageKey = 'favoriteMovies';

  getFavorites(): string[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  toggleFavorite(movieId: string): string[] {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(movieId);
    
    if (index === -1) {
      favorites.push(movieId);
    } else {
      favorites.splice(index, 1);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    return favorites;
  }

  isFavorite(movieId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(movieId);
  }
}
