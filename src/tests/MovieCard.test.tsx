import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './utils/test-utils';
import * as favoritesModule from '@/state/favorites';
import { Movie } from '@/core/movies';
import MovieCard from '@/ui/molecules/MovieCard';

// Mock para el módulo de navegación
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock para el módulo de favoritos
vi.mock('@/state/favorites', () => ({
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
}));

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: '1',
    name: 'Test Movie',
    summary: '<p>Test summary</p>',
    image: { original: 'test-image.jpg', medium: 'test-image-medium.jpg' },
    rating: { average: 8.5 },
    genres: ['Drama', 'Action'],
    premiered: '2023-01-01',
    officialSite: 'https://example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Configurar el mock para isFavorite
    vi.mocked(favoritesModule.isFavorite).mockReturnValue({
      value: false
    } as any);
  });

  it('debe renderizar correctamente la información de la película', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    
    // Verificar que se muestra la información correcta
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('debe llamar a toggleFavorite cuando se hace clic en el botón de favorito', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    
    // Encontrar el botón de favorito y hacer clic
    const favoriteButton = screen.getByRole('button', { name: /agregar a favoritos/i });
    fireEvent.click(favoriteButton);
    
    // Verificar que se llama a toggleFavorite con el ID correcto
    expect(favoritesModule.toggleFavorite).toHaveBeenCalledWith('1');
  });

  it('debe mostrar el ícono de favorito lleno cuando la película es favorita', () => {
    // Configurar el mock para indicar que la película es favorita
    vi.mocked(favoritesModule.isFavorite).mockReturnValue({
      value: true
    } as any);
    
    renderWithProviders(<MovieCard movie={mockMovie} />);
    
    // Verificar que el botón tiene el texto correcto
    const favoriteButton = screen.getByRole('button', { name: /quitar de favoritos/i });
    expect(favoriteButton).toBeInTheDocument();
  });
});
