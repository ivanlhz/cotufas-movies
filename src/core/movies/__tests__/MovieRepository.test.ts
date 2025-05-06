import { describe, it, expect } from 'vitest';
import { Movie } from '../domain/Movie';
import { MovieRepository } from '../domain/MovieRepository';

// Fake repository para pruebas
class FakeMovieRepository implements MovieRepository {
  constructor(private movies: Movie[]) {}

  async getAll(): Promise<Movie[]> {
    return this.movies;
  }

  async getById(id: number): Promise<Movie | null> {
    return this.movies.find(m => m.id === id) ?? null;
  }
}

describe('MovieRepository', () => {
  const movies: Movie[] = [
    {
      id: 1,
      name: 'Test Movie',
      image: { medium: 'img1.jpg', original: 'img1-big.jpg' },
      summary: 'A test movie',
      genres: ['Drama'],
      premiered: '2020-01-01',
      rating: { average: 7 },
      officialSite: 'https://example.com',
    },
    {
      id: 2,
      name: 'Another Movie',
      image: null,
      summary: 'Another summary',
      genres: ['Comedy'],
      premiered: '2021-01-01',
      rating: { average: null },
      officialSite: undefined,
    },
  ];

  const repo = new FakeMovieRepository(movies);

  it('getAll devuelve todas las películas', async () => {
    const result = await repo.getAll();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Test Movie');
  });

  it('getById devuelve la película correcta si existe', async () => {
    const movie = await repo.getById(1);
    expect(movie).not.toBeNull();
    expect(movie?.name).toBe('Test Movie');
  });

  it('getById devuelve null si no existe', async () => {
    const movie = await repo.getById(999);
    expect(movie).toBeNull();
  });
});
