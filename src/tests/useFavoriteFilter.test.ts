import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFavoriteFilter } from '@/state/useFavoriteFilter';
import { renderHook, act } from '@testing-library/react';
import * as favoritesModule from '@/state/favorites';
import { Movie } from '@/core/movies';
import { Signal } from '@preact/signals-react';

// Mock para el módulo de favoritos
vi.mock('@/state/favorites', () => ({
  isFavorite: vi.fn()
}));

describe('useFavoriteFilter', () => {
  const mockMovies: Movie[] = [
    {
      id: '1',
      name: 'Movie 1',
      summary: '<p>Summary 1</p>',
      image: { original: 'image1.jpg', medium:  'image1-medium.jpg'},
      rating: { average: 8.5 },
      genres: ['Drama'],
      premiered: '2023-01-01',
      officialSite: 'https://example.com',
    },
    {
      id: '2',
      name: 'Movie 2',
      summary: '<p>Summary 2</p>',
      image: { original: 'image2.jpg', medium:  'image2-medium.jpg' },
      rating: { average: 9.0 },
      genres: ['Action'],
      premiered: '2023-02-01',
      officialSite: 'https://example.com',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configurar el mock para isFavorite
    vi.mocked(favoritesModule.isFavorite).mockImplementation((id) => ({
      value: id === '1' // Solo el ID 1 es favorito
    } as Signal<boolean>));
  });

  it('debe inicializar showOnlyFavorites como false', () => {
    const { result } = renderHook(() => useFavoriteFilter(mockMovies));
    
    expect(result.current.showOnlyFavorites.value).toBe(false);
  });

  it('debe cambiar showOnlyFavorites cuando se llama a toggleShowOnlyFavorites', () => {
    const { result } = renderHook(() => useFavoriteFilter(mockMovies));
    
    // Inicialmente es false
    expect(result.current.showOnlyFavorites.value).toBe(false);
    
    act(() => {
      result.current.toggleShowOnlyFavorites();
    });
    
    expect(result.current.showOnlyFavorites.value).toBe(true);
    
    act(() => {
      result.current.toggleShowOnlyFavorites();
    });
    
    expect(result.current.showOnlyFavorites.value).toBe(false);
  });

  it('debe devolver todas las películas cuando showOnlyFavorites es false', () => {
    const { result } = renderHook(() => useFavoriteFilter(mockMovies));
    
    // showOnlyFavorites es false por defecto
    expect(result.current.filteredMovies.value).toEqual(mockMovies);
    expect(result.current.filteredMovies.value.length).toBe(2);
  });

  it('debe filtrar las películas cuando showOnlyFavorites es true', () => {
    const { result } = renderHook(() => useFavoriteFilter(mockMovies));
    
    // Cambiar showOnlyFavorites a true
    act(() => {
      result.current.toggleShowOnlyFavorites();
    });
    
    // Debe mostrar solo las películas favoritas (solo la película con ID 1)
    expect(result.current.filteredMovies.value.length).toBe(1);
    expect(result.current.filteredMovies.value[0].id).toBe('1');
  });
});
