import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import MovieDetail from '@/ui/pages/MovieDetail';
import { renderWithProviders } from './utils/test-utils';
import * as favoritesModule from '@/state/favorites';
import * as ReactQuery from '@tanstack/react-query';

let mockNavigation: ReturnType<typeof vi.fn>;

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn().mockImplementation(() => ({
      isLoading: false,
      error: null,
      data: {
        id: '1',
        name: 'Test Movie',
        summary: '<p>Test summary</p>',
        image: { original: 'test-image.jpg' },
        rating: { average: 8.5 },
        genres: ['Drama', 'Action'],
        premiered: '2023',
        officialSite: 'https://example.com',
      }
    }))
  };
});

// Mock para React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  mockNavigation = vi.fn();
  return {
    ...actual,
    useParams: () => ({ movieId: '1' }),
    useNavigate: () => mockNavigation,
  };
});

// Mock para el módulo de favoritos
vi.mock('@/state/favorites', () => ({
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
}));

describe('MovieDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(favoritesModule.isFavorite).mockReturnValue({
      value: false
    } as any);
  });

  it('debe renderizar correctamente los detalles de la película', () => {
    renderWithProviders(<MovieDetail />);
    
    // Verificar que se muestra la información correcta
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('(2023)')).toBeInTheDocument();
    expect(screen.getByText('8.5 / 10')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Sinopsis')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('debe mostrar el botón para volver a la lista', () => {
    mockNavigation = vi.fn();
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useParams: () => ({ movieId: '1' }),
        useNavigate: () => mockNavigation,
      };
    });
    
    renderWithProviders(<MovieDetail />);
    
    const backButton = screen.getByRole('button', { name: /volver a la lista/i });
    expect(backButton).toBeInTheDocument();
  });

  it('debe llamar a toggleFavorite cuando se hace clic en el botón de favorito', () => {
    renderWithProviders(<MovieDetail />);
    
    const favoriteButton = screen.getByRole('button', { name: /agregar a favoritos/i });
    fireEvent.click(favoriteButton);
    
    expect(favoritesModule.toggleFavorite).toHaveBeenCalledWith('1');
  });

  it('debe mostrar mensaje de película no encontrada cuando no hay datos', () => {    
    const spy = vi.spyOn(ReactQuery, 'useQuery').mockImplementation(() => ({
      isLoading: false,
      isError: false,
      error: null,
      data: null,
      isSuccess: true,
      isFetching: false,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      refetch: async () => ({ isSuccess: true, data: null }),
      status: 'success',
      fetchStatus: 'idle'
    } as ReactQuery.UseQueryResult))
    renderWithProviders(<MovieDetail />);
    
    expect(screen.getByText('Película no encontrada')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /volver a la lista/i })).toBeInTheDocument();
    spy.mockRestore()
  });
});
