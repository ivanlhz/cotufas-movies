export interface FavoriteRepository {
    getFavorites(): string[];
    toggleFavorite(movieId: string): string[];
    isFavorite(movieId: string): boolean;
}