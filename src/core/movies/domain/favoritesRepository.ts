export interface FavoritesRepository {
    getFavorites(): string[];
    toggleFavorite(movieId: string): string[];
    isFavorite(movieId: string): boolean;
}