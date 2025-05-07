import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MovieList from '@/ui/organisms/MovieList';
import { renderWithProviders } from './utils/test-utils';
import { Movie } from '@/core/movies';

// Mock para el componente MovieCard
vi.mock('@/ui/organisms/MovieCard', () => ({
  default: ({ movie }: { movie: any }) => (
    <div data-testid={`movie-card-${movie.id}`}>{movie.name}</div>
  ),
}));

describe('MovieList', () => {
  const mockMovies:Movie[] = [
    {
      id: '1',
      name: 'Movie 1',
      summary: '<p>Summary 1</p>',
      image: { original: 'image1.jpg', medium: 'image1medium.jpg'},
      rating: { average: 8.5 },
      genres: ['Drama'],
      premiered: '2023-01-01',
      officialSite: 'https://example.com',
    },
    {
      id: '2',
      name: 'Movie 2',
      summary: '<p>Summary 2</p>',
      image: { original: 'image2.jpg', medium: 'image2medium.jpg'},
      rating: { average: 9.0 },
      genres: ['Action'],
      premiered: '2023-02-01',
      officialSite: 'https://example.com',
    },
  ];

  it('debe renderizar una lista de películas', () => {
    renderWithProviders(<MovieList movies={mockMovies} />);
    
    // Verificar que se renderizan todas las películas
    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('debe renderizar un grid con la clase correcta', () => {
    const { container } = renderWithProviders(<MovieList movies={mockMovies} />);
    
    // Verificar que el grid tiene las clases correctas
    const gridElement = container.firstChild;
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('grid-cols-1');
    expect(gridElement).toHaveClass('sm:grid-cols-2');
    expect(gridElement).toHaveClass('lg:grid-cols-3');
    expect(gridElement).toHaveClass('gap-6');
  });

  it('debe renderizar correctamente cuando no hay películas', () => {
    renderWithProviders(<MovieList movies={[]} />);
    
    // Verificar que no hay elementos de película
    const { container } = renderWithProviders(<MovieList movies={[]} />);
    const gridElement = container.firstChild;
    expect(gridElement?.childNodes.length).toBe(0);
  });
});
