import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Home from '@/ui/pages/Home';
import { renderWithProviders } from './utils/test-utils';
import * as favoriteFilterModule from '@/state/useFavoriteFilter';
import { Signal } from '@preact/signals-react';
import { Movie } from '@/core/movies';

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn().mockReturnValue({
      isLoading: false,
      error: null,
      data: [
        {
          id: '1',
          name: 'Movie 1',
          summary: '<p>Summary 1</p>',
          image: { original: 'image1.jpg' },
          rating: { average: 8.5 },
          genres: ['Drama'],
          premiered: '2023-01-01',
          officialSite: 'https://example.com',
        },
        {
          id: '2',
          name: 'Movie 2',
          summary: '<p>Summary 2</p>',
          image: { original: 'image2.jpg' },
          rating: { average: 9.0 },
          genres: ['Action'],
          premiered: '2023-02-01',
          officialSite: 'https://example.com',
        },
      ]
    })
  };
});

// Mock para el componente MovieList
vi.mock('@/ui/organisms/MovieList', () => ({
  default: ({ movies }: { movies: Movie[] }) => (
    <div data-testid="movie-list">
      {movies.map(movie => (
        <div key={movie.id} data-testid={`movie-item-${movie.id}`}>{movie.name}</div>
      ))}
    </div>
  ),
}));

// Mock para el hook useFavoriteFilter
vi.mock('@/state/useFavoriteFilter', () => ({
  useFavoriteFilter: vi.fn(),
}));

describe('Home', () => {
  const mockFilteredMovies = {
    value: [
      {
        id: '1',
        name: 'Movie 1',
        summary: '<p>Summary 1</p>',
        image: { original: 'image1.jpg' },
        rating: { average: 8.5 },
        genres: ['Drama'],
        premiered: '2023-01-01',
        officialSite: 'https://example.com',
      }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configurar el mock para useFavoriteFilter
    vi.mocked(favoriteFilterModule.useFavoriteFilter).mockReturnValue({
      showOnlyFavorites: { value: false } as Signal<boolean>,
      toggleShowOnlyFavorites: vi.fn(),
      filteredMovies: { value: [] } as Signal<[]>
    });
  });

  it('debe renderizar correctamente el título de la aplicación', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText('CotufaMovies')).toBeInTheDocument();
  });

  it('debe mostrar el botón para filtrar favoritos', () => {
    renderWithProviders(<Home />);
    
    const filterButton = screen.getByRole('button', { name: /solo favoritas/i });
    expect(filterButton).toBeInTheDocument();
  });

  it('debe llamar a toggleShowOnlyFavorites cuando se hace clic en el botón de filtro', () => {
    const mockToggleShowOnlyFavorites = vi.fn();
    
    vi.mocked(favoriteFilterModule.useFavoriteFilter).mockReturnValue({
      showOnlyFavorites: { value: false } as Signal<boolean>,
      toggleShowOnlyFavorites: mockToggleShowOnlyFavorites,
      filteredMovies: { value: [] } as Signal<[]>
    });
    
    renderWithProviders(<Home />);
    
    const filterButton = screen.getByRole('button', { name: /solo favoritas/i });
    fireEvent.click(filterButton);
    
    expect(mockToggleShowOnlyFavorites).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar todas las películas cuando showOnlyFavorites es false', () => {
    vi.mocked(favoriteFilterModule.useFavoriteFilter).mockReturnValue({
      showOnlyFavorites: { value: false } as Signal<boolean>,
      toggleShowOnlyFavorites: vi.fn(),
      filteredMovies: { value: [] } as Signal<[]>
    });
    
    renderWithProviders(<Home />);
    
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    expect(screen.getByTestId('movie-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-item-2')).toBeInTheDocument();
  });

  it('debe mostrar solo películas favoritas cuando showOnlyFavorites es true', () => {
    vi.mocked(favoriteFilterModule.useFavoriteFilter).mockReturnValue({
      showOnlyFavorites: { value: true } as Signal<boolean>,
      toggleShowOnlyFavorites: vi.fn(),
      filteredMovies: mockFilteredMovies as Signal<Movie[]>,
    });
    
    renderWithProviders(<Home />);
    
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    expect(screen.getByTestId('movie-item-1')).toBeInTheDocument();
    expect(screen.queryByTestId('movie-item-2')).not.toBeInTheDocument();
  });

  it('debe mostrar mensaje cuando no hay favoritos y showOnlyFavorites es true', () => {
    vi.mocked(favoriteFilterModule.useFavoriteFilter).mockReturnValue({
      showOnlyFavorites: { value: true } as Signal<boolean>,
      toggleShowOnlyFavorites: vi.fn(),
      filteredMovies: { value: [] } as Signal<[]>
    });
    
    renderWithProviders(<Home />);
    
    expect(screen.getByText('No tienes películas favoritas')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver todas las películas/i })).toBeInTheDocument();
  });
});
